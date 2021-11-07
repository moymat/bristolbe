-- Revert bristol:03_move_functions from pg

BEGIN;

DROP FUNCTION bristol.move_inside_root;
DROP FUNCTION bristol.move_inside_bristol;
DROP FUNCTION bristol.move_from_root;
DROP FUNCTION bristol.move_to_root;
DROP FUNCTION bristol.move_between_bristols;
DROP FUNCTION bristol.move_bristol;
DROP FUNCTION bristol.is_bristol_editor;
DROP FUNCTION bristol.get_highest_parent;

COMMIT;
