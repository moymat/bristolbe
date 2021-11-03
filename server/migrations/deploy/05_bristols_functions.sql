-- Deploy bristol:05_bristols_functions to pg

BEGIN;

-- Function to check if user can read bristol
CREATE OR REPLACE FUNCTION bristol.is_bristol_member (uid UUID, bid UUID) RETURNS BOOL
AS $$
	DECLARE
		auth BOOL;
	BEGIN
		SELECT COUNT(role.bristol_id)::INT::BOOL
		FROM bristol.role
		WHERE bristol_id = ANY (
			SELECT get_highest_parent
			FROM bristol.get_highest_parent(bid)
		)
		AND user_id = uid
		INTO auth;
		
		RETURN auth;
	END;
$$ LANGUAGE plpgsql;

-- Function to retrieve a bristol's info
CREATE OR REPLACE FUNCTION bristol.get_bristol (jsonb) RETURNS TABLE (
	id UUID,
	title TEXT,
	content TEXT,
	created_at TIMESTAMPTZ
) AS $$
	DECLARE
		uid UUID = ($1::jsonb->>'user_id')::UUID;
		bid UUID = ($1::jsonb->>'bristol_id')::UUID;
		auth BOOL = FALSE;
	BEGIN
    -- Check if user have a role on the bristol's highest parent
		SELECT *
    FROM bristol.is_bristol_member(uid, bid)
		INTO auth;
		
    -- If no role, error
		IF auth IS NOT TRUE THEN
			RAISE EXCEPTION 'user not authorized';
		END IF;
		
    -- Else, return the bristol
		RETURN QUERY
		SELECT bristol.id, bristol.title, bristol.content, bristol.created_at
		FROM bristol.bristol
		WHERE bristol.id = bid;
	END;	
$$ LANGUAGE plpgsql;

COMMIT;
