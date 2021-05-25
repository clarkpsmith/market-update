
\echo 'Delete and recreate market_update db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE market_update;
CREATE DATABASE market_update;
\connect market_update

\i user-schema.sql

\echo 'Delete and recreate market_update_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE market_update_test;
CREATE DATABASE market_update_test;
\connect market_update_test

\i user-schema.sql
