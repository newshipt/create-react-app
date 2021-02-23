#!/usr/bin/env python3
from datetime import datetime
import os
import re
import sys
import json
import boto3
import requests
import fileinput
from github import Github

route53_client = boto3.client('route53')
cf_client = boto3.client('cloudfront')
s3_client = boto3.resource('s3')
okta_access_key = os.environ['OKTA_ACCESS_KEY']
okta_app_id = os.environ['OKTA_APP_ID']
cf_oai_id = os.environ['CLOUDFRONT_OAI_ID']


def create_cname(bucket_name, cloudfront):
    route53_client.change_resource_record_sets(
        HostedZoneId=os.environ['AWS_HOSTED_ZONE_ID'],
        ChangeBatch={
            'Comment': bucket_name,
            'Changes': [
                {
                    'Action': 'UPSERT',
                    'ResourceRecordSet': {
                        'Name': bucket_name + '.development.shipt.com',
                        'Type': 'CNAME',
                        'TTL': 60,
                        'ResourceRecords': [{
                            'Value': cloudfront['DomainName']
                        }]
                    }
                },
            ]
        }
    )


def remove_cname(bucket_name, cloudfront):
    route53_client.change_resource_record_sets(
        HostedZoneId=os.environ['AWS_HOSTED_ZONE_ID'],
        ChangeBatch={
            'Comment': bucket_name,
            'Changes': [
                {
                    'Action': 'DELETE',
                    'ResourceRecordSet': {
                        'Name': bucket_name + '.development.shipt.com',
                        'Type': 'CNAME',
                        'TTL': 60,
                        'ResourceRecords': [{
                            'Value': cloudfront['DomainName']
                        }]
                    }
                },
            ]
        }
    )


def gen_bucket_policy(bucket_name):
    return json.dumps({
        'Version': '2012-10-17',
        'Id': 'PolicyForCloudFrontPrivateContent',
        'Statement': [
            {
                'Effect': 'Allow',
                'Principal': {
                    'AWS': 'arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ' + cf_oai_id
                },
                'Action': [
                    's3:GetObject',
                    's3:PutObject'
                ],
                'Resource': 'arn:aws:s3:::' + bucket_name + '/*'
            },
            {
                'Sid': '',
                'Effect': 'Allow',
                'Principal': {
                    'AWS': 'arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ' + cf_oai_id
                },
                'Action': 's3:ListBucket',
                'Resource': 'arn:aws:s3:::' + bucket_name
            }
        ]
    })


def get_cloudfront_by_s3_bucket(bucket_name, is_enabled=True):
    now = datetime.now()
    cloudfront = None
    is_checking = True
    next_marker = ''
    dist_config = {
        'CallerReference': now.strftime('%Y%m%d%H%M%S'),
        'Aliases': {
            'Quantity': 1,
            'Items': [bucket_name + '.development.shipt.com']
        },
        'DefaultRootObject': 'index.html',
        'Origins': {
            'Quantity': 1,
            'Items': [
                {
                    'Id': bucket_name,
                    'DomainName': bucket_name + '.s3.amazonaws.com',
                    'S3OriginConfig': {
                        'OriginAccessIdentity': 'origin-access-identity/cloudfront/' + cf_oai_id
                    }
                },
            ]
        },
        'DefaultCacheBehavior': {
            'TargetOriginId': bucket_name,
            'ForwardedValues': {
                'QueryString': False,
                'Cookies': {
                    'Forward': 'none',
                }
            },
            'TrustedSigners': {
                'Enabled': False,
                'Quantity': 0
            },
            'ViewerProtocolPolicy': 'redirect-to-https',
            'MinTTL': 0
        },
        'CustomErrorResponses': {
            'Quantity': 1,
            'Items': [
                {
                    'ErrorCode': 404,
                    'ResponsePagePath': '/index.html',
                    'ResponseCode': '200',
                    'ErrorCachingMinTTL': 300
                },
            ]
        },
        'Comment': bucket_name,
        'PriceClass': 'PriceClass_100',
        'Enabled': is_enabled,
        'ViewerCertificate': {
            'ACMCertificateArn': os.environ['AWS_ACM_CERT_ARN'],
            'SSLSupportMethod': 'sni-only',
            'MinimumProtocolVersion': 'TLSv1.2_2018'
        },
        'Restrictions': {
            'GeoRestriction': {
                'RestrictionType': 'whitelist',
                'Quantity': 1,
                'Items': ['US']
            }
        }
    }
    # check if exists
    while is_checking:
        resp = cf_client.list_distributions(
            Marker=next_marker,
            MaxItems='10'
        )
        for dist in resp['DistributionList']['Items']:
            for origin in dist['Origins']['Items']:
                if origin['Id'] == bucket_name:
                    cloudfront = dist
                    is_checking = False

        if resp['DistributionList']['IsTruncated']:
            next_marker = resp['DistributionList']['NextMarker']
        else:
            is_checking = False

    if cloudfront:
        cf_res = cf_client.get_distribution_config(Id=cloudfront['Id'])
        if not cf_res['DistributionConfig']['Enabled']:
            cf_res['DistributionConfig']['Enabled'] = is_enabled
            cf_client.update_distribution(
                DistributionConfig=cf_res['DistributionConfig'],
                Id=cloudfront['Id'],
                IfMatch=cf_res['ETag']
            )
    else:
        # otherwise create cloudfront distro
        cf_res = cf_client.create_distribution(DistributionConfig=dist_config)
        cloudfront = cf_res['Distribution']

    return cloudfront


def get_working_dir():
    _scriptPath = os.path.dirname(os.path.realpath(sys.argv[0]))
    return _scriptPath.split('scripts')[0]


def replace_line_in_file(file, search_expression, replace_expression):
    for line in fileinput.input(file, inplace=True):
        if search_expression in line:
            line = replace_expression
        sys.stdout.write(line)


def get_module_name(package_json_path):
    with open(package_json_path) as file:
        data = json.load(file)
        return data['name']


def get_okta_app():
    response = requests.get('https://shipt.okta.com/api/v1/apps/' + okta_app_id, headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'SSWS ' + os.environ['OKTA_ACCESS_KEY'],
    })
    return response.json()


def add_redirect_uri_to_okta_app(okta_app, base_url):
    redirect_uri = base_url + '/login-callback'
    updated_app = okta_app
    if redirect_uri not in updated_app['settings']['oauthClient']['redirect_uris']:
        updated_app['settings']['oauthClient']['redirect_uris'].append(redirect_uri)
    return updated_app


def remove_redirect_uri_from_okta_app(okta_app, base_url):
    redirect_uri = base_url + '/login-callback'
    updated_app = okta_app
    if redirect_uri in updated_app['settings']['oauthClient']['redirect_uris']:
        updated_app['settings']['oauthClient']['redirect_uris'].remove(redirect_uri)
    return updated_app


def update_okta_app(base_url, add_url=True):
    if add_url:
        updated_okta_app = add_redirect_uri_to_okta_app(get_okta_app(), base_url)
    else:
        updated_okta_app = remove_redirect_uri_from_okta_app(get_okta_app(), base_url)
    requests.put(
        'https://shipt.okta.com/api/v1/apps/' + okta_app_id,
        headers={
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'SSWS ' + os.environ['OKTA_ACCESS_KEY'],
        },
        data=(json.dumps(updated_okta_app)),
    )


def remove_cloudfront_distro(bucket_name):
    cloudfront = get_cloudfront_by_s3_bucket(bucket_name)
    cf_client.delete_distribution(Id=cloudfront['Id'], IfMatch=cloudfront['ETag'])


def get_github_pr():
    pr_number = int(os.environ['CIRCLE_PULL_REQUEST'].split('/')[-1])
    g = Github(os.environ['GHI_TOKEN'])
    repo = g.get_repo('shipt/' + os.environ['CIRCLE_PROJECT_REPONAME'])
    return repo.get_pull(pr_number)


def pr_has_been_merged():
    pr = get_github_pr()
    return pr.is_merged()


def remove_s3_bucket(bucket_name):
    bucket = s3_client.Bucket(bucket_name)
    bucket.objects.all().delete()
    bucket.delete()


def prepend_sg1_to_url(url):
    if re.match("sg1-", url) is None:
        return 'sg1-' + url
    else:
        return url


def create_bucket_name():
    pr_number = os.environ['CIRCLE_PULL_REQUEST'].split('/')[-1]
    repo_name = os.environ['CIRCLE_PROJECT_REPONAME']
    return prepend_sg1_to_url(repo_name + '-' + pr_number)


def add_pr_comment_with_app_url():
    pr = get_github_pr()
    review_app_url = sys.argv[1]
    pr.create_issue_comment('Review your app here: ' + review_app_url)


def has_already_commented_on_pr():
    pr = get_github_pr()
    for comment in pr.get_issue_comments():
        print(comment.body)
        if 'Review your app here' in comment.body:
            return True
    return False

