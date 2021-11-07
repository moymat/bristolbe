-- Revert bristol:05_bristols_functions from pg

BEGIN;

DROP FUNCTION bristol.bristol_pre_move;
DROP FUNCTION bristol.get_bristols_roles;
DROP FUNCTION bristol.patch_bristol;
DROP FUNCTION bristol.get_bristol;
DROP FUNCTION bristol.is_bristol_member;

COMMIT;
