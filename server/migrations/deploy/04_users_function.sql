-- Deploy bristol:04_users_info_function to pg

BEGIN;

CREATE OR REPLACE VIEW bristol.all_users AS (
  SELECT id, first_name, last_name, picture_url
  FROM bristol."user"
);

CREATE OR REPLACE FUNCTION bristol.get_user (jsonb) RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  picture_url TEXT,
  email EMAIL
) AS $$
  BEGIN
    RETURN QUERY
    SELECT u.id, u.first_name, u.last_name, u.picture_url, u.email
    FROM bristol."user" u
    WHERE u.id = ($1::jsonb->>'id')::UUID;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION bristol.get_user_auth (jsonb) RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  picture_url TEXT,
  email EMAIL,
  hash TEXT
) AS $$
  DECLARE
    uid UUID;
    uml EMAIL;
  BEGIN
    SELECT
      ($1::jsonb->>'id')::UUID,
      ($1::jsonb->>'email')::EMAIL
    INTO uid, uml;

    IF uid IS NOT NULL THEN
      RETURN QUERY
      SELECT u.id, u.first_name, u.last_name, u.picture_url, u.email, p.hash
      FROM bristol."user" u
      JOIN bristol.password p ON user_id = u.id
      WHERE u.id = uid;
    ELSE
      RETURN QUERY
      SELECT u.id, u.first_name, u.last_name, u.picture_url, u.email, p.hash
      FROM bristol."user" u
      JOIN bristol.password p ON user_id = u.id
      WHERE u.email = uml;
    END IF;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION bristol.patch_user (jsonb) RETURNS VOID
AS $$
	BEGIN
		UPDATE bristol."user"
		SET
			first_name = $1::jsonb->>'first_name',
			last_name = $1::jsonb->>'last_name',
			email = ($1::jsonb->>'email')::EMAIL
		WHERE id = ($1::jsonb->>'id')::UUID;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION bristol.delete_user (UUID) RETURNS VOID
AS $$
	BEGIN
		DELETE FROM bristol.password
		WHERE user_id = $1;
		
		DELETE FROM bristol.role
		WHERE user_id = $1;
		
		DELETE FROM bristol.root_position
		WHERE user_id = $1;
	
		DELETE FROM bristol."user"
		WHERE id = $1;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION bristol.get_users_bristols (UUID) RETURNS TABLE (
	id UUID,
	title TEXT,
	content TEXT,
	"position" INT,
	created_at TIMESTAMPTZ,
	parent_id UUID
) AS $$
	WITH RECURSIVE children AS (
		SELECT a.id, a.title, a.content, a.position, a.created_at, a.parent_id
		FROM bristol.bristol a
		WHERE a.parent_id = ANY(
			SELECT r.bristol_id
			FROM bristol.role r
			WHERE r.user_id = $1
		)
		UNION (
			SELECT b.id, b.title, b.content, b.position, b.created_at, b.parent_id
			FROM bristol.bristol b
			INNER JOIN children c
			ON c.parent_id = b.id
		)
	)
	SELECT *
	FROM children d
	ORDER BY id DESC;
$$ LANGUAGE sql;

COMMIT;