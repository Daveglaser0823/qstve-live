-- Migration: 003_add_flights
CREATE TABLE IF NOT EXISTS flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  partner_user_id UUID REFERENCES users(id),
  direction VARCHAR(10) NOT NULL CHECK(direction IN ('outbound','return')),
  airline VARCHAR(50),
  segments JSONB,
  confirmation VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_flights_trip ON flights(trip_id);

-- Seed flights for Palm Desert trip
INSERT INTO flights (trip_id, user_id, partner_user_id, direction, airline, segments, confirmation, notes) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111112', 'outbound', 'Delta',
   '[{"flight":"DL1702","from":"SAV","to":"ATL","depart":"6:50 AM"},{"flight":"DL349","from":"ATL","to":"PSP","depart":"10:32 AM","arrive":"12:19 PM PT"}]',
   'G9F7EF', NULL),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111112', 'return', 'Delta',
   '[{"flight":"DL349","from":"PSP","to":"ATL","depart":"12:52 PM"},{"flight":"DL1768","from":"ATL","to":"SAV","arrive":"9:43 PM"}]',
   'G9F7EF', NULL),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'outbound', 'Delta',
   '[{"flight":"TBD","from":"HSV","to":"ATL"},{"flight":"TBD","from":"ATL","to":"PSP","arrive":"12:19 PM PT"}]',
   NULL, NULL),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'return', 'Delta',
   '[{"flight":"TBD","from":"PSP","to":"ATL"},{"flight":"TBD","from":"ATL","to":"HSV"}]',
   NULL, 'Return Mon Feb 16'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333332', 'outbound', 'United',
   '[{"flight":"UA1294","from":"DEN","to":"PSP","arrive":"12:41 PM PT"}]',
   NULL, NULL),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333332', 'return', 'United',
   '[{"flight":"UA1484","from":"PSP","to":"DEN","depart":"11:30 AM"}]',
   NULL, 'Return Thu Feb 12'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444441', '44444444-4444-4444-4444-444444444442', 'outbound', 'TBD',
   '[]', NULL, 'TBD'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444441', '44444444-4444-4444-4444-444444444442', 'return', 'TBD',
   '[]', NULL, 'TBD');

SELECT 'Migration 003_add_flights complete' as status;
