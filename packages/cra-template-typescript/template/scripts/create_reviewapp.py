#!/usr/bin/env python3
import os
import boto3
from utils import get_cloudfront_by_s3_bucket, gen_bucket_policy, create_cname, replace_line_in_file, prepend_sg1_to_url, get_module_name, create_bucket_name, update_okta_app, has_already_commented_on_pr

s3_client = boto3.resource('s3')
bucket_name = create_bucket_name()
review_app_url = 'https://' + bucket_name + '.development.shipt.com'


# Setup AWS
# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html
s3_client.Bucket(bucket_name).create()
cloudfront = get_cloudfront_by_s3_bucket(bucket_name)
s3_client.BucketPolicy(bucket_name).put(Policy=gen_bucket_policy(bucket_name))
create_cname(bucket_name, cloudfront)

# Update Okta
update_okta_app(review_app_url)

home_folder = os.path.expanduser('~')
admin_env_path = os.path.join(home_folder, 'sg1-admin/.env.development')
module_temp_env_path = os.path.join(home_folder, 'project/.env.txt')
package_json_path = os.path.join(home_folder, 'project/package.json')
module_name = get_module_name(package_json_path)

# set env vars for circleci
with open(module_temp_env_path, 'a') as envfile:
    envfile.write('\nDEPLOYMENT_S3_BUCKET=' + bucket_name)
    envfile.write('\nCLOUDFRONT_DISTRIBUTION=' + cloudfront['Id'] + '\n')
    envfile.write('\nREVIEW_APP_URL=' + review_app_url + '\n')
    envfile.write('\nMODULE_NAME=' + module_name + '\n')

replace_line_in_file(
    admin_env_path,
    'REACT_APP_LOCALHOSTS',
    'REACT_APP_LOCALHOSTS=\'["https://' + bucket_name + '.development.shipt.com/modules"]\''
)
