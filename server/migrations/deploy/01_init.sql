-- Deploy bristol:01_init to pg

BEGIN;

CREATE SCHEMA bristol;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Email domain checking if value has email format
CREATE DOMAIN EMAIL AS TEXT CHECK (
  value ~* '^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$'
);

CREATE TYPE ROLE_TYPE AS ENUM ('editor', 'viewer');

CREATE TABLE bristol."user" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email EMAIL UNIQUE NOT NULL,
  picture_url TEXT
);

CREATE TABLE bristol.password (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hash TEXT NOT NULL,
  user_id UUID REFERENCES bristol."user" (id)
);

CREATE TABLE bristol.bristol (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  position INT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  parent_id UUID DEFAULT NULL REFERENCES bristol.bristol (id)
);

CREATE TABLE bristol.role (
  bristol_id UUID NOT NULL REFERENCES bristol.bristol (id),
  user_id UUID NOT NULL REFERENCES bristol."user" (id),
  type ROLE_TYPE NOT NULL,
  CONSTRAINT bristol_pk PRIMARY KEY (bristol_id, user_id)
);

CREATE TABLE bristol.root_position (
  bristol_id UUID NOT NULL REFERENCES bristol.bristol (id),
  user_id UUID NOT NULL REFERENCES bristol."user" (id),
  position INT NOT NULL,
  CONSTRAINT root_position_pk PRIMARY KEY (bristol_id, user_id)
);

COMMIT;
