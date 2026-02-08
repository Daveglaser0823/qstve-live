-- Migration: 001_initial_schema
-- qstve.com Trip Portal Database Schema
-- Run with: psql $POSTGRES_URL -f migrations/001_initial_schema.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  avatar_url TEXT,
  clerk_id VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_name VARCHAR(200),
  property_url TEXT,
  property_details JSONB,
  pin_code VARCHAR(10),
  lat DECIMAL(10, 7),
  lng DECIMAL(10, 7),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trip members (many-to-many)
CREATE TABLE IF NOT EXISTS trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'guest',
  couple_partner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);

-- Packing items (per-person)
CREATE TABLE IF NOT EXISTS packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  item VARCHAR(200) NOT NULL,
  packed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Packing templates (shared defaults)
CREATE TABLE IF NOT EXISTS packing_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  item VARCHAR(200) NOT NULL
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  paid_by_user_id UUID REFERENCES users(id),
  description VARCHAR(300) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50),
  split_type VARCHAR(20) DEFAULT 'equal',
  date DATE NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Expense splits
CREATE TABLE IF NOT EXISTS expense_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id UUID REFERENCES expenses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE
);

-- Dinner reservations
CREATE TABLE IF NOT EXISTS dinners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  restaurant_name VARCHAR(200) NOT NULL,
  date DATE NOT NULL,
  time TIME,
  reservation_name VARCHAR(100),
  confirmation_code VARCHAR(50),
  party_size INT,
  notes TEXT,
  map_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Photos
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  uploaded_by_user_id UUID REFERENCES users(id),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  day_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Grocery items (shared list)
CREATE TABLE IF NOT EXISTS grocery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  section VARCHAR(50) NOT NULL,
  item VARCHAR(200) NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  checked_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events / Itinerary
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  end_time TIME,
  location VARCHAR(200),
  map_url TEXT,
  website_url TEXT,
  emoji VARCHAR(10),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_packing_items_trip_user ON packing_items(trip_id, user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip ON expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_grocery_items_trip ON grocery_items(trip_id);
CREATE INDEX IF NOT EXISTS idx_events_trip_date ON events(trip_id, date);
CREATE INDEX IF NOT EXISTS idx_photos_trip ON photos(trip_id);

-- Done
SELECT 'Migration 001_initial_schema complete' as status;
