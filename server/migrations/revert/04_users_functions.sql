-- Revert bristol:04_users_info_function from pg

BEGIN;

DROP FUNCTION bristol.get_users_bristols;
DROP FUNCTION bristol.delete_user;
DROP FUNCTION bristol.patch_user_password;
DROP FUNCTION bristol.patch_user_email;
DROP FUNCTION bristol.patch_user_info;
DROP FUNCTION bristol.get_user_auth;
DROP FUNCTION bristol.get_user;
DROP VIEW bristol.all_users;

COMMIT;
