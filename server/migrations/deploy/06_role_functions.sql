-- Deploy bristol:05_bristols_functions to pg

BEGIN;

-- Function to add multiple users as viewers of a bristol
CREATE OR REPLACE FUNCTION add_viewers (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'user_id')::UUID;
		uids jsonb = ($1::jsonb->>'viewers_id')::jsonb;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		uid UUID;
		hpid UUID;
		auth BOOL;
   		ism BOOL;
	BEGIN
    -- Check if user is authorized to give other users a role
		SELECT *
		FROM is_bristol_editor(
			jsonb_build_object(
				'user_id', eid,
				'bristol_id', bid
			)
		) INTO auth;
		
    -- If not, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user is not authorized';
		END IF;
		
    -- Loop through the array of users to give viewer role to
		FOR uid IN (
			SELECT *
			FROM jsonb_array_elements_text(uids)
		) LOOP
      SELECT *
      FROM is_bristol_member(jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      ) INTO ism;

      -- If user already a member, update existing row
      IF ism IS TRUE THEN
        UPDATE role
        SET type = 'viewer'
        WHERE user_id = uid
        AND bristol_id = bid;
      -- If not a member, create new rows
      ELSE		
        -- Get the bristol's highest parent 
        SELECT *
        FROM get_highest_parent(bid)
        INTO hpid;

        -- Insert the bristol at the end of his stack
        INSERT INTO root_position(bristol_id, user_id, position)
        (
          SELECT hpid, uid, COUNT(bristol_id)
          FROM root_position
          WHERE user_id = uid
        );
      
        -- Add his new role
        INSERT INTO role (bristol_id, user_id, type)
        VALUES (hpid, uid, 'viewer');
      END IF;	
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

-- Function to add multiple users as editors of a bristol
CREATE OR REPLACE FUNCTION add_editors (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'user_id')::UUID;
		uids jsonb = ($1::jsonb->>'editors_id')::jsonb;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		uid UUID;
		hpid UUID;
		auth BOOL;
    ism BOOL;
	BEGIN
    -- Check if user is authorized to give other users a role
		SELECT *
		FROM is_bristol_editor(
			jsonb_build_object(
				'user_id', eid,
				'bristol_id', bid
			)
		) INTO auth;
		
    -- If not, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user is not authorized';
		END IF;
		
    -- Loop through the array of users to give user role to
		FOR uid IN (
			SELECT *
			FROM jsonb_array_elements_text(uids)
		) LOOP
      SELECT *
      FROM is_bristol_member(jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      ) INTO ism;

      -- If user already a member, update existing row
      IF ism IS TRUE THEN
        UPDATE role
        SET type = 'editor'
        WHERE user_id = uid
        AND bristol_id = bid;
      -- If not a member, create new rows
      ELSE
		        -- Get the bristol's highest parent 
        SELECT *
        FROM get_highest_parent(bid)
        INTO hpid;

        -- Insert the bristol at the end of his stack
        INSERT INTO root_position(bristol_id, user_id, position)
        (
          SELECT hpid, uid, COUNT(bristol_id)
          FROM root_position
          WHERE user_id = uid
        );
      
        -- Add his new role
        INSERT INTO role (bristol_id, user_id, type)
        VALUES (hpid, uid, 'editor');
      END IF;		
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

-- Function to delete multiple roles for a bristol
CREATE OR REPLACE FUNCTION delete_roles (jsonb) RETURNS VOID
AS $$
	DECLARE
		eid UUID = ($1::jsonb->>'user_id')::UUID;
		uids jsonb = ($1::jsonb->>'deleted_id')::jsonb;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		uid UUID;
		hpid UUID;
		auth BOOL;
    ism BOOL;
	BEGIN
    -- Check if user is authorized to delete a user's role
		SELECT *
		FROM is_bristol_editor(
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
		  FROM is_bristol_member(jsonb_build_object(
			  'user_id', uid,
			  'bristol_id', bid
			)
		  ) INTO ism;

		  -- If user is a member, delete existing row
		  IF ism IS TRUE THEN
				DELETE
				FROM role
				WHERE role.user_id = uid
				AND role.bristol_id = bid;

				DELETE
				FROM root_position rp
				WHERE rp.user_id = uid
				AND rp.bristol_id = bid;
		  END IF;		
		END LOOP;	
	END;
$$ LANGUAGE plpgsql;

COMMIT;