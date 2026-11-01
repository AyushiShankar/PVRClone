
#!/bin/sh
set -eu

until pg_isready -h postgres -U pvr -d pvr; do
  sleep 1
done

if ! psql -h postgres -U pvr -d pvr \
  -tAc "SELECT 1 FROM pg_database WHERE datname='pvr_auth'" \
  | grep -qx 1; then
  psql -v ON_ERROR_STOP=1 -h postgres -U pvr -d pvr \
    -c "CREATE DATABASE pvr_auth"
fi

if ! psql -h postgres -U pvr -d pvr \
  -tAc "SELECT 1 FROM pg_database WHERE datname='pvr_movies'" \
  | grep -qx 1; then
  psql -v ON_ERROR_STOP=1 -h postgres -U pvr -d pvr \
    -c "CREATE DATABASE pvr_movies"
fi

echo "Database initialization completed successfully"
