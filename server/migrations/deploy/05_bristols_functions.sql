-- Deploy bristol:05_bristols_functions to pg

BEGIN;

-- Function to add multiple users as viewers of a bristol
CREATE OR REPLACE FUNCTION bristol.add_viewers (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'user_id')::UUID;
		uids jsonb = ($1::jsonb->>'viewers_id')::jsonb;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		uid UUID;
		pid UUID;
		auth BOOL;
   		ism BOOL;
	BEGIN
    -- Check if user is authorized to give other users a role
		SELECT *
		FROM bristol.is_bristol_editor(
			jsonb_build_object(
				'user_id', eid,
				'bristol_id', bid
			)
		) INTO auth;
		
    -- If not, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user is not authorized';
		END IF;
		
    -- Get the bristol's highest parent 
		SELECT *
		FROM get_highest_parent(bid)
		INTO pid;
		
    -- Loop through the array of users to give viewer role to
		FOR uid IN (
			SELECT *
			FROM jsonb_array_elements_text(uids)
		) LOOP
      SELECT *
      FROM bristol.is_bristol_member(jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      ) INTO ism;

      -- If user already a member, update existing row
      IF ism IS TRUE THEN
        UPDATE bristol.role
        SET type = 'viewer'
        WHERE user_id = uid
        AND bristol_id = bid;
      -- If not a member, create new rows
      ELSE
        -- Insert the bristol at the end of his stack
        INSERT INTO bristol.root_position(bristol_id, user_id, position)
        (
          SELECT pid, uid, COUNT(bristol_id)
          FROM bristol.root_position
          WHERE user_id = uid
        );
      
        -- Add his new role
        INSERT INTO bristol.role (bristol_id, user_id, type)
        VALUES (pid, uid, 'viewer');
      END IF;	
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

-- Function to add multiple users as editors of a bristol
CREATE OR REPLACE FUNCTION bristol.add_editors (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'user_id')::UUID;
		uids jsonb = ($1::jsonb->>'editors_id')::jsonb;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		uid UUID;
		pid UUID;
		auth BOOL;
    ism BOOL;
	BEGIN
    -- Check if user is authorized to give other users a role
		SELECT *
		FROM bristol.is_bristol_editor(
			jsonb_build_object(
				'user_id', eid,
				'bristol_id', bid
			)
		) INTO auth;
		
    -- If not, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user is not authorized';
		END IF;
		
    -- Get the bristol's highest parent 
		SELECT *
		FROM get_highest_parent(bid)
		INTO pid;
		
    -- Loop through the array of users to give user role to
		FOR uid IN (
			SELECT *
			FROM jsonb_array_elements_text(uids)
		) LOOP
      SELECT *
      FROM bristol.is_bristol_member(jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      ) INTO ism;

      -- If user already a member, update existing row
      IF ism IS TRUE THEN
        UPDATE bristol.role
        SET type = 'editor'
        WHERE user_id = uid
        AND bristol_id = bid;
      -- If not a member, create new rows
      ELSE
        -- Insert the bristol at the end of his stack
        INSERT INTO bristol.root_position(bristol_id, user_id, position)
        (
          SELECT pid, uid, COUNT(bristol_id)
          FROM bristol.root_position
          WHERE user_id = uid
        );
      
        -- Add his new role
        INSERT INTO bristol.role (bristol_id, user_id, type)
        VALUES (pid, uid, 'editor');
      END IF;		
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

COMMIT;