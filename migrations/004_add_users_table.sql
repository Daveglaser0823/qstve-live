-- Migration: 004_add_users_table
-- Adds users table for Clerk auth integration

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  couple_id INTEGER REFERENCES couples(id),
  trip_id INTEGER REFERENCES trips(id),
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE grocery_items ADD COLUMN IF NOT EXISTS checked_by_user_id INTEGER REFERENCES users(id);

-- Seed known members
INSERT INTO users (name, phone, couple_id, trip_id) VALUES
  ('Dave Glaser', '+17206161787', 1, 1),
  ('Denise Glaser', '+17206161776', 1, 1),
  ('Mike Moody', '+12566038894', 2, 1),
  ('Jana Moody', '+12565200722', 2, 1),
  ('Chris Moody', '+13035626318', 3, 1),
  ('Sarah Ahn', '+13035626328', 3, 1),
  ('Chris Russell', '+12565293006', 4, 1),
  ('Sharon Doviet', '+12566564248', 4, 1)
ON CONFLICT DO NOTHING;

SELECT 'Migration 004_add_users_table complete' as status;
