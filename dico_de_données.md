# USER

| Name        | Type  | Specificities                          | Description        | Comments                                                               |
| ----------- | ----- | -------------------------------------- | ------------------ | ---------------------------------------------------------------------- |
| id          | UUID  | DEFAULT generate_uuid_v4() PRIMARY KEY | user's id          |                                                                        |
| first_name  | TEXT  | NOT NULL                               | user's first name  |                                                                        |
| last_name   | TEXT  | NOT NULL                               | user's last name   |                                                                        |
| email       | EMAIL | NOT NULL                               | user's last name   | new EMAIL domain created as TEXT, value is checked with an email regex |
| picture_url | TEXT  | NOT NULL                               | user's picture url |                                                                        |

# PASSWORD

| Name    | Type | Specificities                          | Description                               | Comments |
| ------- | ---- | -------------------------------------- | ----------------------------------------- | -------- |
| id      | UUID | DEFAULT generate_uuid_v4() PRIMARY KEY | password's id                             |          |
| hash    | TEXT | NOT NULL                               | hash of the user's password               |          |
| user_id | UUID | NOT NULL REFERENCES user(id)           | user's id to whom the password belongs to |          |

# BRISTOL

| Name              | Type        | Specificities                          | Description                                                   | Comments |
| ----------------- | ----------- | -------------------------------------- | ------------------------------------------------------------- | -------- |
| id                | UUID        | DEFAULT generate_uuid_v4() PRIMARY KEY | bristol's id                                                  |          |
| title             | TEXT        | NOT NULL                               | title of the bristol                                          |          |
| content           | TEXT        |                                        | content if the bristol                                        |          |
| position          | INT         | NOT NULL DEFAULT 0                     | bristol's position in parent                                  |          |
| created_at        | TIMESTAMPTZ | NOT NULL DEFAULT NOW()                 | bristol's date of creation                                    |          |
| highest_parent_id | UUID        | REFERENCES bristol(id) DEFAULT NULL    | bristol's highest parent (null if the bristol is the highest) |          |

# ROLE

| Name       | Type       | Specificities                     | Description        | Comments                                                                   |
| ---------- | ---------- | --------------------------------- | ------------------ | -------------------------------------------------------------------------- |
| bristol_id | UUID       | NOT NULL REFERENCES bristol(id)   | bristol's id       |                                                                            |
| user_id    | UUID       | NOT NULL REFERENCES user(id)      | user's id          |                                                                            |
| type       | ROLE_TYPE  | NOT NULL                          | password's id      | new ROLE_TYPE domain created as ENUM, value is either "editor" or "viewer" |
| CONSTRAINT | birstol_pk | PRIMARY KEY (bristol_id, user_id) | role's primary key | ensure that a user can only have one role for a bristol                    |
