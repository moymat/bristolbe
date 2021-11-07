-- Revert bristol:03_move_functions from pg

BEGIN;

DROP FUNCTION FUNCTION bristol.move_inside_root;
DROP FUNCTION FUNCTION bristol.move_inside_bristol;
DROP FUNCTION FUNCTION bristol.move_from_root;
DROP FUNCTION FUNCTION bristol.move_to_root;
DROP FUNCTION FUNCTION bristol.move_between_bristols;
DROP FUNCTION FUNCTION bristol.move_bristol;
DROP FUNCTION FUNCTION bristol.is_bristol_editor;
DROP FUNCTION FUNCTION bristol.get_highest_parent;

COMMIT;
