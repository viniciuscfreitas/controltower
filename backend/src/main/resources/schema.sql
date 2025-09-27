-- Table creation script for ControlTower service
-- Using PostgreSQL standard

CREATE TABLE feature_flags (
    id          BIGSERIAL PRIMARY KEY,  -- BIGSERIAL is an auto-incrementable BIGINT, ideal for primary keys.
    name        VARCHAR(100) NOT NULL UNIQUE, -- The flag key name, must be unique. Ex: "new-checkout-beta".
    is_active   BOOLEAN NOT NULL DEFAULT FALSE, -- The flag state, default to off (safer).
    description VARCHAR(255), -- An optional description to explain what the flag controls.
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Timestamp with timezone for record creation.
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()  -- Timestamp with timezone for last update.
);

-- Optional, but good practice: create a function to automatically update 'updated_at'.
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON feature_flags
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
