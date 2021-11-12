-- Revert bristol:07_delete_bristols from pg

BEGIN;

DROP FUNCTION delete_bristols;
DROP FUNCTION get_bristol_with_children;

COMMIT;
