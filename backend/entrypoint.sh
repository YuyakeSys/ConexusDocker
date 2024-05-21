#!/bin/bash
###
 # @Author: Zhouyang Meng
 # @Date: 2024-05-20 15:00:39
 # @LastEditTime: 2024-05-20 15:35:55
 # @Description: 
 # 
 # Copyright (c) 2024 by YuyakeSys, All Rights Reserved. 
### 
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Ensure the database is ready
bundle exec rails db:migrate RAILS_ENV=development

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"