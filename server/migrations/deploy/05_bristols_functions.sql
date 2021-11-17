
-- Deploy bristol:05_bristols_functions to pg

BEGIN;

-- Function to check if user can read bristol
CREATE OR REPLACE FUNCTION is_bristol_member (jsonb) RETURNS BOOL
AS $$
	DECLARE
    bid UUID = ($1::jsonb->>'bristol_id')::UUID;
    uid UUID = ($1::jsonb->>'user_id')::UUID;
		auth BOOL;
	BEGIN
		SELECT COUNT(role.bristol_id)::INT::BOOL
		FROM role
		WHERE bristol_id = ANY (
			SELECT get_highest_parent
			FROM get_highest_parent(bid)
		)
		AND user_id = uid
		INTO auth;
		
		RETURN auth;
	END;
$$ LANGUAGE plpgsql;

-- Function to retrieve a bristol's info
CREATE OR REPLACE FUNCTION get_bristol (jsonb) RETURNS TABLE (
	id UUID,
	title TEXT,
	content TEXT,
	created_at TIMESTAMPTZ,
	role ROLE_TYPE
) AS $$
	DECLARE
		uid UUID = ($1::jsonb->>'user_id')::UUID;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		auth BOOL = FALSE;
	BEGIN
    -- Check if user have a role on the bristol's highest parent
		SELECT *
		FROM is_bristol_member(
		  jsonb_build_object(
			'user_id', uid,
			'bristol_id', bid
		  )
		)
		INTO auth;
		
    -- If no role, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user not authorized';
		END IF;
		
		RETURN QUERY
		WITH user_role AS (
			SELECT type
			FROM role
			WHERE role.user_id = uid
			AND role.bristol_id = ANY (
				SELECT *
				FROM get_highest_parent(bid)
			)
		)
    	-- Else, return the bristol
		SELECT bristol.id, bristol.title, bristol.content, bristol.created_at, user_role.type as role
		FROM bristol, user_role
		WHERE bristol.id = bid;
	END;	
$$ LANGUAGE plpgsql;

-- Function to patch a bristol
CREATE OR REPLACE FUNCTION patch_bristol (jsonb) RETURNS VOID
AS $$
	DECLARE
    bid UUID = ($1::jsonb->>'bristol_id')::UUID;
    uid UUID = ($1::jsonb->>'user_id')::UUID;
    ttl TEXT = ($1::jsonb->>'title');
    cnt TEXT = ($1::jsonb->>'content');
		auth BOOL;
	BEGIN
		SELECT *
    FROM is_bristol_member(
      jsonb_build_object(
        'user_id', uid,
        'bristol_id', bid
      )
    )
		INTO auth;
		
    IF auth IS NOT TRUE THEN
      RAISE EXCEPTION 'user not authorized';
    END IF;

    UPDATE bristol
    SET title = ttl, content = cnt
    WHERE id = bid;
	END;
$$ LANGUAGE plpgsql;

-- Function to retrieve all role assigned to a bristol
CREATE OR REPLACE FUNCTION get_bristols_roles (jsonb) RETURNS TABLE (
	id UUID,
	role ROLE_TYPE,
	first_name TEXT,
	last_name TEXT
) AS $$
	DECLARE
		uid UUID = ($1::jsonb->>'user_id')::UUID;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		auth BOOL;
	BEGIN
		SELECT *
		FROM is_bristol_member(
		  jsonb_build_object(
			'user_id', uid,
			'bristol_id', bid
		  )
		)
		INTO auth;
		
		IF auth IS NOT TRUE THEN
		  RAISE EXCEPTION 'user not authorized';
		END IF;
			
		RETURN QUERY
		SELECT role.user_id AS id, role.type as role, "user".first_name, "user".last_name
		FROM role
		JOIN "user" ON role.user_id = "user".id
		WHERE bristol_id = ANY (
			SELECT *
			FROM get_highest_parent(bid)
		)
		AND role.user_id <> uid
		ORDER BY role;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION bristol_pre_move (jsonb) RETURNS TABLE (
	id UUID,
	role ROLE_TYPE,
	first_name TEXT,
	last_name TEXT,
	"position" INT,
	parent_id UUID
) AS $$
	DECLARE	
		uid UUID = ($1::jsonb->>'user_id')::UUID;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		pos INT;
		pid UUID;
	BEGIN
		SELECT bristol.position, bristol.parent_id
		FROM bristol
		WHERE bristol.id = bid
		INTO pos, pid;
		
		IF pos IS NULL THEN
			SELECT root_position.position
			FROM root_position
			WHERE root_position.bristol_id = bid
			AND root_position.user_id = uid
			INTO pos;
		END IF;
	
		RETURN QUERY
		SELECT r.id, r.role, r.first_name, r.last_name, pos as position, pid as parent_id
		FROM get_bristols_roles($1) r
		ORDER BY role;
	END;
$$ LANGUAGE plpgsql;

COMMIT;