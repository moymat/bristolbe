-- Revert bristol:02_add_functions from pg

BEGIN;

DROP FUNCTION bristol.create_user;
DROP FUNCTION bristol.create_bristol;

COMMIT;
