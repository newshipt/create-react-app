#!/bin/bash
aws s3 sync ~/sg1-admin/build s3://${DEPLOYMENT_S3_BUCKET} --exclude ./build/service-worker.js --exclude ./build/index.html
aws s3 cp ~/sg1-admin/build/service-worker.js s3://${DEPLOYMENT_S3_BUCKET} --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript
aws s3 cp ~/sg1-admin/build/index.html s3://${DEPLOYMENT_S3_BUCKET} --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html
aws s3 sync ./build s3://${DEPLOYMENT_S3_BUCKET}/modules/${MODULE_NAME} --exclude ./build/manifest.json
aws s3 cp ./build/manifest.json s3://${DEPLOYMENT_S3_BUCKET}/modules/manifest.json --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/json
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --paths "/*"
