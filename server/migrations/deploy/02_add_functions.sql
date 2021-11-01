-- Deploy bristol:02_add_functions to pg

BEGIN;

-- Function to create add a user and his/her password into the db
CREATE OR REPLACE FUNCTION bristol.create_user (jsonb) RETURNS TABLE (
	id UUID
)
AS $$
	DECLARE
		uid UUID;
	BEGIN
    -- Create new user
		WITH created_user AS (
			INSERT INTO bristol."user" (first_name, last_name, email)
			VALUES (
				$1::jsonb->>'first_name',
				$1::jsonb->>'last_name',
				$1::jsonb->>'email'
			)
			RETURNING "user".id
		)
    
    -- Add new user id into function variable
		SELECT created_user.id FROM created_user INTO uid;

    -- Create password row for user
		INSERT INTO bristol.password (hash, user_id)
		VALUES ($1::jsonb->>'hash', uid);

    -- Return new user id
		RETURN QUERY
		SELECT uid AS id;
	END;
$$ LANGUAGE plpgsql;

-- Function to create a bristol
CREATE OR REPLACE FUNCTION bristol.create_bristol (jsonb) RETURNS TABLE (
	id UUID
)
AS $$
	DECLARE
		uid UUID = ($1::jsonb->>'user_id')::UUID;
		pos INT;
		bid UUID;
	BEGIN
    -- Insert the new bristol in the table
		WITH created_bristol AS
		(
			INSERT INTO bristol.bristol (title, content)
			VALUES (
				$1::jsonb->>'title',
				$1::jsonb->>'content'
			)
			RETURNING bristol.id
		)
    -- Add new bristol id into function variable
		SELECT created_bristol.id FROM created_bristol INTO bid;
		
    -- Add user as the bristol's editor
		INSERT INTO bristol.role (bristol_id, user_id, type)
		VALUES (bid, uid, 'editor');

		-- Add position into function variable
		SELECT last_root_position
		FROM bristol.last_root_position(jsonb_build_object('user_id', uid))
		INTO pos;
		
    -- Add bristol as root with its position
		INSERT INTO bristol.root_position (bristol_id, user_id, position)
		VALUES (bid, uid, pos);

    -- Return the new bristol id
		RETURN QUERY
		SELECT bid AS id;
	END;
$$ LANGUAGE plpgsql;

-- Find nb of root bristol to determine new bristol position
CREATE OR REPLACE FUNCTION bristol.last_root_position (jsonb) RETURNS INT
AS $$
	DECLARE
		pos INT;
	BEGIN
		SELECT COALESCE(MAX(position) + 1, 0)
		FROM bristol.root_position
		WHERE user_id = ($1::json->>'user_id')::UUID
		INTO pos;

		RETURN pos;
	END;
$$ LANGUAGE plpgsql;

COMMIT;