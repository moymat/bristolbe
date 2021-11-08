-- Revert bristol:06_role_functions from pg

BEGIN;

DROP FUNCTION delete_roles;
DROP FUNCTION add_editors;
DROP FUNCTION add_viewers;

COMMIT;
