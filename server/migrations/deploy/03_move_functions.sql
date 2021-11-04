-- Deploy bristol:03_move_functions to pg

BEGIN;

-- Function to get the root bristol from a child bristol
CREATE OR REPLACE FUNCTION bristol.get_highest_parent (UUID) RETURNS UUID
AS $$
	DECLARE
		hid UUID;
	BEGIN
		-- Create a recursive table from the bottom to the root
		WITH RECURSIVE highest AS (
			SELECT id, parent_id
			FROM bristol.bristol
			WHERE id = $1
			UNION (
				SELECT b.id, b.parent_id
				FROM bristol.bristol b
				INNER JOIN highest h
				ON h.parent_id = b.id
			)
		)
		
		-- Insert root id into function variable
		SELECT id FROM highest
		WHERE parent_id IS NULL
		INTO hid;
		
		RETURN hid;
	END;
$$ LANGUAGE plpgsql;

-- Function to check if user is an editor of a bristol
CREATE OR REPLACE FUNCTION bristol.is_bristol_editor (jsonb) RETURNS BOOL
AS $$
	DECLARE
		result BOOL;
	BEGIN
		WITH bristol_editor AS (
		SELECT user_id
			FROM bristol.role
			WHERE bristol_id = ANY (
				SELECT *
				FROM bristol.get_highest_parent (($1::jsonb->>'bristol_id')::UUID)
			)
		AND user_id = ($1::jsonb->>'user_id')::UUID
		AND type = 'editor'
		)
				
		SELECT COUNT(user_id)::INT::BOOL
		FROM bristol_editor
		INTO result;
		
		RETURN result;		
	END;
$$ LANGUAGE plpgsql;

-- Function to get the root bristol from a child bristol
CREATE OR REPLACE FUNCTION bristol.get_highest_parent (UUID) RETURNS UUID
AS $$
	DECLARE
		hid UUID;
	BEGIN
		-- Create a recursive table from the bottom to the root
		WITH RECURSIVE highest AS (
			SELECT id, parent_id
			FROM bristol.bristol
			WHERE id = $1
			UNION (
				SELECT b.id, b.parent_id
				FROM bristol.bristol b
				INNER JOIN highest h
				ON h.parent_id = b.id
			)
		)
		
		-- Insert root id into function variable
		SELECT id FROM highest
		WHERE parent_id IS NULL
		INTO hid;
		
		RETURN hid;
	END;
$$ LANGUAGE plpgsql;

-- Function to check if user is an editor of a bristol
CREATE OR REPLACE FUNCTION bristol.is_bristol_editor (jsonb) RETURNS BOOL
AS $$
	DECLARE
		result BOOL;
	BEGIN
		WITH bristol_editor AS (
		SELECT user_id
			FROM bristol.role
			WHERE bristol_id = ANY (
				SELECT *
				FROM bristol.get_highest_parent (($1::jsonb->>'bristol_id')::UUID)
			)
		AND user_id = ($1::jsonb->>'user_id')::UUID
		AND type = 'editor'
		)
				
		SELECT COUNT(user_id)::INT::BOOL
		FROM bristol_editor
		INTO result;
		
		RETURN result;		
	END;
$$ LANGUAGE plpgsql;

-- Function to move a bristol in the tree
CREATE OR REPLACE FUNCTION bristol.move_bristol (jsonb) RETURNS VOID
AS $$
  DECLARE
    uid UUID = ($1::jsonb->>'user_id')::UUID;
    bid UUID = ($1::jsonb->>'bristol_id')::UUID;
    npid UUID = ($1::jsonb->>'parent_id')::UUID;
    npos INT = ($1::jsonb->>'position')::INT;
    is_editor_start BOOL;
    is_editor_end BOOL;
    cpid UUID;
    cpos INT;
  BEGIN
    -- Store current parent_id (UUID or NULL)
    SELECT parent_id
    FROM bristol.bristol
    WHERE id = bid
    INTO cpid;

   -- Store current position
    IF cpid IS NULL THEN
      SELECT position
      FROM bristol.root_position
      WHERE bristol_id = bid
      AND user_id = uid
      INTO cpos;
    ELSE
      SELECT position
      FROM bristol.bristol
      WHERE id = bid
      INTO cpos;
    END IF;

    -- If cpid & npid = null, bristol moved inside root
    IF cpid IS NULL AND npid IS NULL THEN
      PERFORM move_inside_root(
        jsonb_build_object(
          'cpos', cpos,
          'npos', npos,
          'uid', uid,
          'bid', bid
        )
      );
    ELSE
      -- Is user editor of the bristol
      SELECT *
      FROM bristol.is_bristol_editor (
        jsonb_build_object(
          'user_id', uid,
          'bristol_id', bid
        )
      )
      INTO is_editor_start;

      -- Is user editor of the target bristol (true if null - root)
      IF npid IS NOT NULL THEN
        SELECT *
        FROM bristol.is_bristol_editor (
          jsonb_build_object(
            'user_id', uid,
            'bristol_id', npid
          )
        )
        INTO is_editor_end;
      ELSE
        SELECT TRUE INTO is_editor_end;
      END IF;

      -- If user is not editor of current or target, error
      IF is_editor_start IS NOT TRUE
      OR is_editor_end IS NOT TRUE THEN
        RAISE EXCEPTION 'user doesn''t have permission';
      END IF;

      -- If cpid = npid, bristol moved inside the same bristol
      IF cpid = npid THEN
        PERFORM move_inside_bristol(
          jsonb_build_object(
            'cpos', cpos,
            'npos', npos,
            'pid', cpid,
            'bid', bid
          )
        );
      -- If cpid = null, bristol moved from root to bristol
      ELSIF cpid IS NULL THEN
        PERFORM move_from_root(
          jsonb_build_object(
            'cpos', cpos,
            'npos', npos,
            'npid', npid,
            'bid', bid,
            'uid', uid
          )
        );
      -- If npid = null, bristol moved from bristol to root
      ELSIF npid IS NULL THEN
        PERFORM move_to_root(
          jsonb_build_object(
            'cpos', cpos,
            'npos', npos,
            'cpid', cpid,
            'bid', bid,
            'uid', uid
          )
        );
    -- IF npid and cpid != null, bristol moved in another bristol
      ELSIF npid IS NOT NULL AND cpid IS NOT NULL THEN
        PERFORM move_between_bristols(
          jsonb_build_object(
          'cpos', cpos,
          'npos', npos,
          'cpid', cpid,
          'npid', npid,
          'bid', bid
        )
      );
      -- If none of the above, it must be an error
      ELSE
        RAISE EXCEPTION 'bad request';
      END IF;
    END IF;
  END;
$$ LANGUAGE plpgsql;

-- Function to handle shift inside root
CREATE OR REPLACE FUNCTION bristol.move_inside_root (jsonb) RETURNS VOID
AS $$
  DECLARE
    npos INT = ($1::jsonb->>'npos')::INT;
    cpos INT = ($1::jsonb->>'cpos')::INT;
    mpos INT;
    uid UUID = ($1::jsonb->>'uid')::UUID;
    bid UUID = ($1::jsonb->>'bid')::UUID;
    up BOOL DEFAULT FALSE;
  BEGIN
    -- Check if there is a shift
    IF npos = cpos THEN
      RAISE EXCEPTION 'positions are the same';
    END IF;

    -- Retrieve the max available position
    SELECT COUNT(bristol_id)
    FROM bristol.root_position
    WHERE user_id = uid
    INTO mpos;
    
    -- If new position > max position, change new position
    IF npos > mpos THEN
      npos = mpos;
    END IF;

    -- Is the bristol shifted up or down
    SELECT npos::INT > cpos::INT INTO up;

    IF up IS TRUE THEN
    -- If up, increase every following bristol's position by 1
      UPDATE bristol.root_position
      SET position = position - 1
      WHERE user_id = uid
      AND position > cpos
      AND position <= npos;
    ELSE
    -- If down, decrease every following bristol's position by 1
      UPDATE bristol.root_position
      SET position = position + 1
      WHERE user_id = uid
      AND position >= npos
      AND position < cpos;
    END IF;

    -- Change the bristol's position
    UPDATE bristol.root_position
    SET position = npos
    WHERE user_id = uid
    AND bristol_id = bid;
  END;
$$ LANGUAGE plpgsql;

-- Function to handle shift inside the same bristol
CREATE OR REPLACE FUNCTION bristol.move_inside_bristol (jsonb) RETURNS VOID
AS $$
  DECLARE
    npos INT = ($1::jsonb->>'npos')::INT;
    cpos INT = ($1::jsonb->>'cpos')::INT;
    mpos INT;
    pid UUID = ($1::jsonb->>'pid')::UUID;
    bid UUID = ($1::jsonb->>'bid')::UUID;
    up BOOL DEFAULT FALSE;
  BEGIN
    -- Check if there is a shift
    IF npos = cpos THEN
      RAISE EXCEPTION 'positions are the same';
    END IF;

    -- Retrieve the max available position
    SELECT COUNT(id)
    FROM bristol.bristol
    WHERE parent_id = pid
    INTO mpos;
    
    -- If new position > max position, change new position
    IF npos > mpos THEN
      npos = mpos;
    END IF;

    -- Is the bristol shifted up or down
    SELECT npos::INT > cpos::INT INTO up;

    IF up IS TRUE THEN
      -- If up, increase every following bristol's position by 1
      UPDATE bristol.bristol
      SET position = position - 1
      WHERE parent_id = pid
      AND position > cpos
      AND position <= npos;
    ELSE
      -- If down, decrease every following bristol's position by 1
      UPDATE bristol.bristol
      SET position = position + 1
      WHERE parent_id = pid
      AND position >= npos
      AND position < cpos;
    END IF;

    -- Change the bristol's position
    UPDATE bristol.bristol
    SET position = npos
    WHERE id = bid;
  END;
$$ LANGUAGE plpgsql;

-- Function to handle shift from root to bristol
CREATE OR REPLACE FUNCTION bristol.move_from_root (jsonb) RETURNS VOID
AS $$
  DECLARE
    npos INT = ($1::jsonb->>'npos')::INT;
    cpos INT = ($1::jsonb->>'cpos')::INT;
    mpos INT;
    npid UUID = ($1::jsonb->>'npid')::UUID;
    bid UUID = ($1::jsonb->>'bid')::UUID;
    uid UUID = ($1::jsonb->>'uid')::UUID;
  BEGIN
    -- Retrieve the max available position
    SELECT COUNT(id)
    FROM bristol.bristol
    WHERE parent_id = npid
    INTO mpos;
    
    -- If new position > max position, change new position
    IF npos > mpos THEN
      npos = mpos;
    END IF;
    
    -- Move back every following root bristols from each user by 1
    UPDATE bristol.root_position
    SET position = position - 1
    WHERE position > cpos
    AND user_id = ANY (
      SELECT user_id
      FROM bristol.root_position
      WHERE bristol_id = bid
    );

    -- Remove every rows relative to the bristol
    DELETE FROM bristol.root_position
    WHERE bristol_id = bid;

    DELETE FROM bristol.role
    WHERE bristol_id = bid;
    
    -- Shift each new right siblings by 1
    UPDATE bristol.bristol
    SET position = position + 1
    WHERE bristol.id = ANY (
      SELECT id
      FROM bristol.bristol
      WHERE parent_id = npid
      AND position >= npos
    );

    -- Set the new bristol position and parent
    UPDATE bristol.bristol
    SET position = npos, parent_id = npid
    WHERE id = bid;
  END;
$$ LANGUAGE plpgsql;

-- Function to handle shift from bristol to root
CREATE OR REPLACE FUNCTION bristol.move_to_root (jsonb) RETURNS VOID
AS $$
  DECLARE
    npos INT = ($1::jsonb->>'npos')::INT;
    cpos INT = ($1::jsonb->>'cpos')::INT;
    mpos INT;
    cpid UUID = ($1::jsonb->>'cpid')::UUID;
    bid UUID = ($1::jsonb->>'bid')::UUID;
    uid UUID = ($1::jsonb->>'uid')::UUID;
	buid UUID;
  BEGIN
    -- Retrieve the max available position
    SELECT COUNT(bristol_id)
    FROM bristol.root_position
    WHERE user_id = uid
    INTO mpos;
    
    -- If new position > max position, change new position
    IF npos > mpos THEN
      npos = mpos;
    END IF;
	
    FOR buid IN
    -- Retrieve all users who are editor of the bristol's highest parent
      SELECT r.user_id
      FROM bristol.root_position r
      JOIN bristol.role ON r.user_id = role.user_id
      WHERE r.user_id <> uid
      AND type = 'editor'
	  AND role.bristol_id = bid
      AND r.bristol_id = (
        SELECT *
        FROM bristol.get_highest_parent(cpid)
      )
	  LOOP
		-- For each user, insert a new row for the bristol at the end of their stack
      INSERT INTO bristol.root_position (bristol_id, user_id, position)
      SELECT bid, buid, pos
      FROM (
        SELECT last_root_position AS pos
        FROM bristol.last_root_position (
          jsonb_build_object('user_id', buid)
        )
      ) positions;

      -- Add each highest parent's editor as editor of the new root bristol
      INSERT INTO bristol.role (bristol_id, user_id, type)
      SELECT bid, buid, 'editor';
    END LOOP;
    
    -- Shift every former right siblings of the bristol by -1
    UPDATE bristol.bristol
    SET position = position - 1
    WHERE bristol.id = ANY (
      SELECT id
      FROM bristol.bristol
      WHERE parent_id = cpid
      AND position > cpos
      AND id <> bid
    );
	
    -- Shift every right root bristols of the user by 1
    UPDATE bristol.root_position
    SET position = position + 1
    WHERE user_id = uid
    AND position >= npos;

    -- Insert a new row for the user moving the bristol with the chosen position
    INSERT INTO bristol.root_position (bristol_id, user_id, position)
    VALUES (bid, uid, npos);
	  
    -- Insert a new row for the user moving the bristol with the role editor
    INSERT INTO bristol.role (bristol_id, user_id, type)
    SELECT bid, uid, 'editor';

    -- Set the bristol as a root bristol
    UPDATE bristol.bristol
    SET position = NULL, parent_id = NULL
    WHERE id = bid;
  END;
$$ LANGUAGE plpgsql;

-- Function to handle shift from a bristol to an other bristol
CREATE OR REPLACE FUNCTION bristol.move_between_bristols(jsonb) RETURNS void
AS $$
  DECLARE
    npos INT = ($1::jsonb->>'npos')::INT;
    cpos INT = ($1::jsonb->>'cpos')::INT;
    mpos INT;
    cpid UUID = ($1::jsonb->>'cpid')::UUID;
	  npid UUID = ($1::jsonb->>'npid')::UUID;
    bid UUID = ($1::jsonb->>'bid')::UUID;
  BEGIN
    -- Retrieve the max available position
    SELECT COUNT(id)
    FROM bristol.bristol
    WHERE parent_id = npid
    INTO mpos;
    
    -- If new position > max position, change new position
    IF npos > mpos THEN
      npos = mpos;
    END IF;
	
    -- Shift every right former sibling bristols by -1
    UPDATE bristol.bristol
    SET position = position - 1
    WHERE parent_id = cpid
    AND position > cpos
    AND id <> bid;
    
    -- Shift every right new sibling bristols by 1
    UPDATE bristol.bristol
    SET position = position + 1
    WHERE parent_id = npid
    AND position >= npos;
	
    -- Change the bristol's position
    UPDATE bristol.bristol
    SET position = npos, parent_id = npid
    WHERE id = bid;
  END;
$$ LANGUAGE plpgsql;

COMMIT;
