import { NextResponse } from 'next/server';
import { getDb, TRIP_ID } from '../../../../lib/db';

export async function GET() {
  const sql = getDb();

  const [trip] = await sql`SELECT * FROM trips WHERE id = ${TRIP_ID}`;
  if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });

  const couples = await sql`SELECT * FROM couples WHERE trip_id = ${TRIP_ID} ORDER BY id`;

  const events = await sql`SELECT * FROM events WHERE trip_id = ${TRIP_ID} ORDER BY date, time`;

  const golfRounds = await sql`SELECT * FROM golf_rounds WHERE trip_id = ${TRIP_ID} ORDER BY date, time`;

  const flights = await sql`
    SELECT f.*, c.person1, c.person2
    FROM flights f
    JOIN couples c ON c.id = f.couple_id
    WHERE c.trip_id = ${TRIP_ID}
    ORDER BY c.id, f.direction
  `;

  // Parse property_details if it's a string
  if (typeof trip.property_details === 'string') {
    try { trip.property_details = JSON.parse(trip.property_details); } catch {}
  }

  // Parse flight segments
  for (const f of flights) {
    if (typeof f.segments === 'string') {
      try { f.segments = JSON.parse(f.segments); } catch { f.segments = []; }
    }
  }

  // Parse golf round details
  for (const g of golfRounds) {
    if (typeof g.details === 'string') {
      try { g.details = JSON.parse(g.details); } catch {}
    }
  }

  return NextResponse.json({ trip, couples, events, flights, golfRounds });
}
