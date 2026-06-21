#!/usr/bin/env bash
set -euo pipefail

mkdir -p database
touch database/database.sqlite

php artisan config:clear
php artisan cache:clear
php artisan migrate --force

php -S 0.0.0.0:${PORT:-10000} -t public
