-- Migration: 002_seed_palm_desert
-- Seed data for Palm Desert Getaway trip
-- Run with: psql $POSTGRES_URL -f migrations/002_seed_palm_desert.sql

-- Create users (guests)
INSERT INTO users (id, name, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Dave Glaser', 'glaser.dave@gmail.com'),
  ('11111111-1111-1111-1111-111111111112', 'Denise Glaser', 'denise.glaser@me.com'),
  ('22222222-2222-2222-2222-222222222221', 'Mike Moody', NULL),
  ('22222222-2222-2222-2222-222222222222', 'Jana Moody', NULL),
  ('33333333-3333-3333-3333-333333333331', 'Chris Moody', NULL),
  ('33333333-3333-3333-3333-333333333332', 'Sarah Ahn Moody', NULL),
  ('44444444-4444-4444-4444-444444444441', 'Chris Russell', NULL),
  ('44444444-4444-4444-4444-444444444442', 'Sharon Doviet', NULL)
ON CONFLICT (id) DO NOTHING;

-- Create Palm Desert trip
INSERT INTO trips (id, name, location, start_date, end_date, property_name, property_url, property_details, pin_code, lat, lng) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
   'Palm Desert Getaway', 
   'Palm Desert, CA', 
   '2026-02-08', 
   '2026-02-12',
   'Villa Bella',
   'https://www.vrbo.com/2744508',
   '{"vrbo": "#2744508", "bedrooms": 6, "bathrooms": 4, "sqft": 4575, "amenities": ["Pool", "Hot Tub", "Gym", "Game Room"]}',
   '2026',
   33.7225,
   -116.3767)
ON CONFLICT (id) DO NOTHING;

-- Link users to trip as members
INSERT INTO trip_members (trip_id, user_id, role, couple_partner_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'host', '11111111-1111-1111-1111-111111111112'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111112', 'guest', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222221', 'guest', '22222222-2222-2222-2222-222222222222'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'guest', '22222222-2222-2222-2222-222222222221'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333331', 'guest', '33333333-3333-3333-3333-333333333332'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333332', 'guest', '33333333-3333-3333-3333-333333333331'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444441', 'guest', '44444444-4444-4444-4444-444444444442'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444442', 'guest', '44444444-4444-4444-4444-444444444441')
ON CONFLICT DO NOTHING;

-- Events: Super Bowl
INSERT INTO events (trip_id, title, description, date, time, location, emoji, category) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Super Bowl LX', 'Seahawks vs Patriots - Kickoff 6:30 PM ET / 3:30 PM PT', '2026-02-08', '15:30', 'Villa Bella', '🏈', 'activity');

-- Events: Golf rounds
INSERT INTO events (trip_id, title, description, date, time, location, map_url, website_url, emoji, category) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mountain View', 'Desert Willow Golf Resort', '2026-02-09', '08:15', 'Desert Willow Golf Resort', 'https://maps.apple.com/?q=Desert+Willow+Golf+Resort+Palm+Desert', 'https://www.desertwillow.com', '⛳', 'golf'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PGA West Pete Dye', 'PGA West', '2026-02-10', '08:42', 'PGA West', 'https://maps.apple.com/?q=PGA+West+La+Quinta', 'https://www.pgawest.com', '⛳', 'golf'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Fire Cliff', 'Desert Willow Golf Resort', '2026-02-11', '13:50', 'Desert Willow Golf Resort', 'https://maps.apple.com/?q=Desert+Willow+Golf+Resort+Palm+Desert', 'https://www.desertwillow.com', '⛳', 'golf');

-- Packing templates (shared defaults)
INSERT INTO packing_templates (trip_id, category, item) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Golf', 'Golf clubs'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Golf', 'Golf shoes'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Golf', 'Golf glove'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Golf', 'Tees & ball markers'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Golf', 'Range finder'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Golf', 'Golf hat/visor'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Clothing', 'Golf polos (3-4)'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Clothing', 'Golf shorts/pants'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Clothing', 'Casual dinner outfits'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Clothing', 'Swimsuit'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Clothing', 'Sunglasses'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Clothing', 'Light jacket'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tech', 'Phone charger'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tech', 'Camera'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tech', 'Headphones'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Toiletries', 'Sunscreen SPF 50+'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Toiletries', 'Medications'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Toiletries', 'Lip balm w/ SPF'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Documents', 'ID/License'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Documents', 'Credit cards'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Documents', 'Flight confirmation');

-- Grocery items
INSERT INTO grocery_items (trip_id, section, item) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dairy', 'Eggs x2'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dairy', 'Plain yogurt'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dairy', 'Greek yogurt Siggi''s'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dairy', 'Half-and-half'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dairy', 'Cream cheese x2'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dairy', 'Milk'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bakery', 'Cinnamon raisin bagels'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bakery', 'Granola'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bakery', 'GF crackers'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Produce', 'Blueberries'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Produce', 'Grapes'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Produce', 'Pineapple'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Produce', 'Bananas'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Produce', 'Avocados'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Produce', 'Salad fixings'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Drinks', 'Coffee'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Drinks', 'Stevia'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Drinks', 'Pineapple juice'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Snacks', 'Doritos'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Snacks', 'Double Stuff Oreos'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Snacks', 'Cookie dough ice cream');

-- Done
SELECT 'Migration 002_seed_palm_desert complete' as status;
SELECT 
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM trips) as trips,
  (SELECT COUNT(*) FROM trip_members) as members,
  (SELECT COUNT(*) FROM events) as events,
  (SELECT COUNT(*) FROM packing_templates) as packing_templates,
  (SELECT COUNT(*) FROM grocery_items) as grocery_items;
