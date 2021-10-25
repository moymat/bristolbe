-- Deploy bristol:02_add_functions to pg

BEGIN;

-- Function to create add a user and his/her password into the db
CREATE OR REPLACE FUNCTION bristol.create_user (jsonb) RETURNS UUID
AS $$
	DECLARE
		uid UUID;
	BEGIN
    -- Create new user
		WITH created_user AS (
			INSERT INTO bristol."user" (first_name, last_name, email, picture_url)
			VALUES (
				$1::jsonb->>'first_name',
				$1::jsonb->>'last_name',
				$1::jsonb->>'email',
				$1::jsonb->>'picture_url'
			)
			RETURNING id
		)
    
    -- Add new user id into function variable
		SELECT id FROM created_user INTO uid;

    -- Create password row for user
		INSERT INTO bristol.password (hash, user_id)
		VALUES ($1::jsonb->>'hash', uid);

    -- Return new user id
		RETURN uid;
	END;
$$ LANGUAGE plpgsql;

COMMIT;
