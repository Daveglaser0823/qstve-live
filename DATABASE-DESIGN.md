# qstve.com Database Design
## Vercel Postgres (Neon)

### Overview
Serverless PostgreSQL database for trip portal with real-time sync between guests.

---

## Schema

### Users / Guests
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Trips
```sql
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_name VARCHAR(200),
  property_url TEXT,
  property_details JSONB,
  pin_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Trip Members (many-to-many)
```sql
CREATE TABLE trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'guest', -- 'host', 'guest'
  couple_partner_id UUID REFERENCES users(id), -- link to partner
  UNIQUE(trip_id, user_id)
);
```

### Packing Items (per-person)
```sql
CREATE TABLE packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  item VARCHAR(200) NOT NULL,
  packed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Shared Packing Templates
```sql
CREATE TABLE packing_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  item VARCHAR(200) NOT NULL,
  is_default BOOLEAN DEFAULT TRUE
);
```

### Expenses
```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  paid_by_user_id UUID REFERENCES users(id),
  description VARCHAR(300) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50),
  split_type VARCHAR(20) DEFAULT 'equal', -- 'equal', 'custom', 'couples'
  date DATE NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Expense Splits
```sql
CREATE TABLE expense_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id UUID REFERENCES expenses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE
);
```

### Dinner Reservations
```sql
CREATE TABLE dinners (
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
```

### Photos
```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  uploaded_by_user_id UUID REFERENCES users(id),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  day_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Grocery Items (shared list)
```sql
CREATE TABLE grocery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  section VARCHAR(50) NOT NULL,
  item VARCHAR(200) NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  checked_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Events / Itinerary
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location VARCHAR(200),
  map_url TEXT,
  website_url TEXT,
  emoji VARCHAR(10),
  category VARCHAR(50), -- 'golf', 'dinner', 'activity', 'flight'
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints (Next.js API Routes)

### Auth
- `POST /api/auth/login` - PIN-based or email login
- `GET /api/auth/me` - Current user

### Trips
- `GET /api/trips` - List user's trips
- `GET /api/trips/[id]` - Get trip details
- `POST /api/trips` - Create trip
- `PUT /api/trips/[id]` - Update trip

### Packing
- `GET /api/trips/[id]/packing` - Get user's packing list
- `POST /api/trips/[id]/packing` - Add item
- `PUT /api/trips/[id]/packing/[itemId]` - Toggle packed
- `DELETE /api/trips/[id]/packing/[itemId]` - Remove item

### Expenses
- `GET /api/trips/[id]/expenses` - List expenses with splits
- `POST /api/trips/[id]/expenses` - Add expense
- `GET /api/trips/[id]/expenses/summary` - Who owes whom

### Groceries
- `GET /api/trips/[id]/groceries` - Get grocery list
- `PUT /api/trips/[id]/groceries/[itemId]` - Toggle checked

### Photos
- `GET /api/trips/[id]/photos` - List photos
- `POST /api/trips/[id]/photos` - Upload photo (use Vercel Blob)

---

## Implementation Plan

### Phase 1: Database Setup
1. Create Vercel Postgres database
2. Run migrations
3. Seed with Palm Desert trip data

### Phase 2: Auth & Users
1. Simple PIN auth (existing)
2. Add user identification (name selection)
3. Avatar upload via Vercel Blob

### Phase 3: Features
1. Per-person packing lists
2. Expense tracking with splits
3. Dinner reservations
4. Photo gallery

### Phase 4: Real-time
1. Polling for updates (simple)
2. Or: Add Supabase Realtime layer if needed

---

## Authentication (Clerk)

Using Clerk for managed auth:
- Email/password
- Google OAuth
- Apple OAuth
- Pre-built UI components

### Clerk Integration
```typescript
// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
export default clerkMiddleware();

// Get user in API routes
import { auth } from '@clerk/nextjs/server';
const { userId } = auth();
```

### User Sync
On first login, sync Clerk user to our `users` table:
```sql
INSERT INTO users (id, name, email, avatar_url, clerk_id)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (clerk_id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar_url = EXCLUDED.avatar_url;
```

---

## Environment Variables Needed
```
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Vercel Postgres
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Vercel Blob (photos)
BLOB_READ_WRITE_TOKEN=
```
