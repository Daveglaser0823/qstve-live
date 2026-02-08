import { NextRequest, NextResponse } from 'next/server';
import { getDb, TRIP_ID } from '../../../../lib/db';

export async function GET() {
  const sql = getDb();
  const dinners = await sql`
    SELECT * FROM dinner_reservations
    WHERE trip_id = ${TRIP_ID}
    ORDER BY date ASC, time ASC
  `;
  return NextResponse.json(dinners);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const { restaurant, date, time, party_size, notes, booked_by, confirmation } = await req.json();
  const [row] = await sql`
    INSERT INTO dinner_reservations (trip_id, restaurant, date, time, party_size, notes, booked_by, confirmation)
    VALUES (${TRIP_ID}, ${restaurant}, ${date}, ${time}, ${party_size || 8}, ${notes || ''}, ${booked_by || ''}, ${confirmation || ''})
    RETURNING *
  `;
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM dinner_reservations WHERE id = ${id} AND trip_id = ${TRIP_ID}`;
  return NextResponse.json({ ok: true });
}
