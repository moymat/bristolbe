-- Revert bristol:04_users_info_function from pg

BEGIN;

DROP FUNCTION get_users_bristols;
DROP FUNCTION delete_user;
DROP FUNCTION patch_user_password;
DROP FUNCTION patch_user_email;
DROP FUNCTION patch_user_info;
DROP FUNCTION get_user_auth;
DROP FUNCTION get_user;
DROP VIEW all_users;

COMMIT;
