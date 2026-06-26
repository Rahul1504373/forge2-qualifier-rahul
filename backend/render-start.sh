#!/usr/bin/env bash
set -euo pipefail

export DB_CONNECTION="${DB_CONNECTION:-sqlite}"
export DB_DATABASE="${DB_DATABASE:-/tmp/forge2-database.sqlite}"

mkdir -p "$(dirname "$DB_DATABASE")"
touch "$DB_DATABASE"
chmod 666 "$DB_DATABASE" || true
chmod -R ug+rw storage bootstrap/cache database || true

if [ -z "${APP_KEY:-}" ]; then
	export APP_KEY="base64:$(php -r 'echo base64_encode(random_bytes(32));')"
fi

php artisan config:clear
php artisan cache:clear || true
php artisan route:clear || true

# Run migrations with retry to handle transient startup races.
max_attempts=5
attempt=1
until php artisan migrate --force --no-interaction; do
	if [ "$attempt" -ge "$max_attempts" ]; then
		echo "Migration failed after ${max_attempts} attempts; refusing to start web server." >&2
		exit 1
	fi

	echo "Migration attempt ${attempt} failed; retrying..." >&2
	attempt=$((attempt + 1))
	sleep 2
done

php -S 0.0.0.0:${PORT:-10000} -t public
