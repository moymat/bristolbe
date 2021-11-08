-- Revert bristol:01_init from pg

BEGIN;

DROP SCHEMA public CASCADE;

COMMIT;
