-- Revert bristol:05_bristols_functions from pg

BEGIN;

DROP FUNCTION bristol_pre_move;
DROP FUNCTION get_bristols_roles;
DROP FUNCTION patch_bristol;
DROP FUNCTION get_bristol;
DROP FUNCTION is_bristol_member;

COMMIT;
