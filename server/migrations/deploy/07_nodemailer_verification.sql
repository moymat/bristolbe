-- Deploy bristol:07_nodemailer_verification to pg

BEGIN;

CREATE TABLE bristol.account_validation (  
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(4) NOT NULL,
  user_id UUID UNIQUE NOT NULL REFERENCES bristol."user"(id)
);

COMMIT;
