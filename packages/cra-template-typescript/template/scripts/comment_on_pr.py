#!/usr/bin/env python3
from utils import add_pr_comment_with_app_url, has_already_commented_on_pr

if not has_already_commented_on_pr():
    add_pr_comment_with_app_url()
else:
    print('Already commented on PR')

