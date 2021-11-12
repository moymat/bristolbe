-- Deploy bristol:07_delete_bristols to pg

BEGIN;

-- Function to retrieve a bristol and all its children
CREATE OR REPLACE FUNCTION get_bristol_with_children (UUID) RETURNS TABLE (
	id UUID,
	parent_id UUID
)
AS $$
	BEGIN
		RETURN QUERY
		WITH RECURSIVE children AS (
			SELECT bristol.id, bristol.parent_id
			FROM bristol
			WHERE bristol.id = $1
			UNION (
				SELECT a.id, a.parent_id
				FROM bristol a, children
				WHERE a.parent_id = children.id
			)
		)
		SELECT *
		FROM children;
	END;
$$ LANGUAGE plpgsql;

-- Function to remove a bristol and all its children
CREATE OR REPLACE FUNCTION delete_bristols (jsonb) RETURNS VOID
AS $$
	DECLARE
		uid UUID = ($1::jsonb->>'user_id')::UUID;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		pid UUID;
		mid UUID;
		sid UUID;
		pos INT;
		did UUID;
		auth BOOL;
	BEGIN
    	-- Check if user is authorized to delete the bristol
		SELECT *
		FROM is_bristol_editor(
			jsonb_build_object(
				'user_id', uid,
				'bristol_id', bid
			)
		) INTO auth;
		
    	-- If not, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user is not authorized';
		END IF;
		
		-- Delete all bristol's children
		WHILE (
			SELECT COUNT(a.id) > 1
			FROM get_bristol_with_children(bid) a
		) LOOP
			DELETE
			FROM bristol
			WHERE bristol.id = ANY (
				SELECT b.id
				FROM get_bristol_with_children(bid) b
				WHERE b.id NOT IN (
					SELECT c.parent_id
					FROM get_bristol_with_children(bid) c
					WHERE c.parent_id IS NOT NULL
				)
			);
		END LOOP;
		
		SELECT bristol.parent_id
		FROM bristol
		WHERE bristol.id = bid
		INTO pid;
		
		IF pid IS NULL THEN
			-- If bristol is root
			FOR mid IN (
				SELECT rp.user_id
				FROM root_position rp
				WHERE rp.bristol_id = bid
			) LOOP
				-- Get its position in root for each user
				SELECT rp.position
				FROM root_position rp
				WHERE rp.bristol_id = bid
				AND rp.user_id = mid
				INTO pos;
				
				-- Shift all right siblings of the bristol for this user
				UPDATE root_position
				SET position = position - 1
				WHERE position > pos
				AND user_id = mid;
			END LOOP;
		ELSE
			-- If bristol is in an other bristol				
			SELECT a.position
			FROM bristol a
			WHERE a.id = bid
			INTO pos;
		
			-- Shift all right siblings of the bristol
			FOR sid IN (				
				SELECT b.id
				FROM bristol b
				WHERE b.parent_id = pid
				AND b.position > pos
			) LOOP
				UPDATE bristol
				SET position = position - 1
				WHERE id = sid;
			END LOOP;
		END IF;
		
		-- Remove all rows for the root position
		DELETE FROM root_position
		WHERE bristol_id = bid;
		
		-- Remove all rows for role
		DELETE FROM role
		WHERE bristol_id = bid;
		
		-- Delete the bristol
		DELETE FROM bristol
		WHERE id = bid;
	END;
$$ LANGUAGE plpgsql;

COMMIT;
