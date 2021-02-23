#!/usr/bin/env python3
import os
from utils import create_bucket_name

bucket_name = create_bucket_name()
review_app_url = 'https://' + bucket_name + '.development.shipt.com'

home_folder = os.path.expanduser('~')
temp_file = os.path.join(home_folder, 'project/.reviewapp.txt')
with open(temp_file, 'a') as envfile:
    envfile.write(review_app_url)
