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
			INSERT INTO bristol."user" (first_name, last_name, email)
			VALUES (
				$1::jsonb->>'first_name',
				$1::jsonb->>'last_name',
				$1::jsonb->>'email'
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

-- Function to create a bristol
CREATE OR REPLACE FUNCTION bristol.create_bristol (jsonb) RETURNS UUID
AS $$
	DECLARE
		bid UUID;
	BEGIN
    -- Insert the new bristol in the table
		WITH created_bristol AS
		(
			INSERT INTO bristol.bristol (title, content, parent_id)
			VALUES (
				$1::jsonb->>'title',
				$1::jsonb->>'content',
				($1::jsonb->>'parent_id')::UUID
			)
			RETURNING id
		)

    -- Add new bristol id into function variable
		SELECT id FROM created_bristol INTO bid;
		
		-- Update bristol with position if one given in argument
		IF ($1::jsonb->>'position')::INT IS NOT NULL
			THEN
				UPDATE bristol.bristol 
				SET position = ($1::jsonb->>'position')::INT
				WHERE id = bid;
		END IF;
		
    -- Add user as the bristol's editor
		INSERT INTO bristol.role (bristol_id, user_id, type)
		VALUES(
			bid,
			($1::jsonb->>'user_id')::UUID,
			'editor'
		);
		
    -- Return the new bristol id
		RETURN bid;
	END;
$$ LANGUAGE plpgsql;

COMMIT;
