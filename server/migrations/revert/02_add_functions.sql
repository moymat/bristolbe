-- Revert bristol:02_add_functions from pg

BEGIN;

DROP FUNCTION create_user;
DROP FUNCTION create_bristol;
DROP FUNCTION last_root_position;

COMMIT;
