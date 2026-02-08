import { NextRequest, NextResponse } from 'next/server';
import { getDb, TRIP_ID } from '../../../../lib/db';

export async function GET() {
  const sql = getDb();
  const items = await sql`
    SELECT g.*, u.name as checked_by_name
    FROM grocery_items g
    LEFT JOIN users u ON u.id = g.checked_by_user_id
    WHERE g.trip_id = ${TRIP_ID}
    ORDER BY g.section, g.item
  `;
  return NextResponse.json(items);
}

export async function PATCH(req: NextRequest) {
  const sql = getDb();
  const { id, checked, userId } = await req.json();
  await sql`UPDATE grocery_items SET checked = ${checked ? 1 : 0}, checked_by_user_id = ${checked ? (userId || null) : null} WHERE id = ${id} AND trip_id = ${TRIP_ID}`;
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const { section, item } = await req.json();
  const [row] = await sql`
    INSERT INTO grocery_items (trip_id, section, item) VALUES (${TRIP_ID}, ${section}, ${item})
    RETURNING *
  `;
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM grocery_items WHERE id = ${id} AND trip_id = ${TRIP_ID}`;
  return NextResponse.json({ ok: true });
}
