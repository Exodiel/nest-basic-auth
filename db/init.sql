-- CREATE DATABASE IF NOT EXISTS nestjs
SELECT 'CREATE DATABASE nestjs'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nestjs')\gexec