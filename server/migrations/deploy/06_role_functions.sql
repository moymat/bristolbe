-- Deploy bristol:06_role_functions to pg

BEGIN;

-- Function to add multiple users as viewers of a bristol
CREATE OR REPLACE FUNCTION bristol.add_viewers (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'editor_id')::UUID;
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
      FROM bristol.is_member(jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      ) INTO ism;

      IF ism IS TRUE THEN
        -- If user already a member, update
        UPDATE bristol.role
        SET type = 'viewer'
        WHERE user_id = uid
        AND bristol_id = bid;
      ELSE
        -- If not already a member, insert
        -- Insert the bristol to their root
        INSERT INTO bristol.root_position(bristol_id, user_id, position)
        (
          SELECT pid, uid, COUNT(bristol_id)
          FROM bristol.root_position
          WHERE user_id = uid
        );
      
        -- Add their role
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
		eid UUID = ($1::jsonb->>'editor_id')::UUID;
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
      FROM bristol.is_member(jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      ) INTO ism;

      IF ism IS TRUE THEN
        -- If user already a member, update
        UPDATE bristol.role
        SET type = 'editor'
        WHERE user_id = uid
        AND bristol_id = bid;
      ELSE
        -- If not already a member, insert
        -- Insert the bristol to their root
        INSERT INTO bristol.root_position(bristol_id, user_id, position)
        (
          SELECT pid, uid, COUNT(bristol_id)
          FROM bristol.root_position
          WHERE user_id = uid
        );
      
        -- Add their role
        INSERT INTO bristol.role (bristol_id, user_id, type)
        VALUES (pid, uid, 'editor');
      END IF;		
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

-- Function to delete multiple roles for a bristol
CREATE OR REPLACE FUNCTION bristol.delete_roles (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'user_id')::UUID;
		uids jsonb = ($1::jsonb->>'delete_id')::jsonb;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		uid UUID;
		hpid UUID;
		auth BOOL;
    ism BOOL;
	BEGIN
    -- Check if user is authorized to delete a user's role
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
		INTO hpid;
		
    -- Loop through the array of users to remove the role from
		FOR uid IN (
			SELECT (jsonb_array_elements_text(uids))::UUID
		) LOOP
		  SELECT *
		  FROM bristol.is_bristol_member(jsonb_build_object(
			  'user_id', uid,
			  'bristol_id', bid
			)
		  ) INTO ism;

		  -- If user is a member, delete existing row
		  IF ism IS TRUE THEN
			DELETE
			FROM bristol.role
			WHERE user_id = uid
			AND bristol_id = bid;
		  END IF;		
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

COMMIT;
