-- Revert bristol:03_move_functions from pg

BEGIN;

DROP FUNCTION move_inside_root;
DROP FUNCTION move_inside_bristol;
DROP FUNCTION move_from_root;
DROP FUNCTION move_to_root;
DROP FUNCTION move_between_bristols;
DROP FUNCTION move_bristol;
DROP FUNCTION is_bristol_editor;
DROP FUNCTION get_highest_parent;

COMMIT;
