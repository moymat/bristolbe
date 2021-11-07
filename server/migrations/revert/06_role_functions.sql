-- Revert bristol:06_role_functions from pg

BEGIN;

DROP FUNCTION bristol.delete_roles;
DROP FUNCTION bristol.add_editors;
DROP FUNCTION bristol.add_viewers;

COMMIT;
