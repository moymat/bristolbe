-- Revert bristol:05_bristols_functions from pg

BEGIN;

DROP FUNCTION bristol.delete_roles;
DROP FUNCTION bristol.add_editors;
DROP FUNCTION bristol.add_viewers;

COMMIT;
