import { NextRequest, NextResponse } from 'next/server';
import { getDb, TRIP_ID } from '../../../../../lib/db';

export async function POST(req: NextRequest) {
  const sql = getDb();
  const { clerkId, email, phone, name, avatarUrl } = await req.json();

  if (!clerkId) return NextResponse.json({ error: 'Missing clerkId' }, { status: 400 });

  // 1. Check if already linked
  const [existing] = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId} LIMIT 1`;
  if (existing) {
    // Update email if changed
    if (email && email !== existing.email) {
      await sql`UPDATE users SET email = ${email} WHERE id = ${existing.id}`;
    }
    return NextResponse.json({ user: existing });
  }

  // 2. Try to match by phone
  if (phone) {
    const normalized = phone.replace(/\D/g, '');
    const [phoneMatch] = await sql`
      SELECT * FROM users WHERE replace(phone, '+', '') = ${normalized} AND trip_id = ${TRIP_ID} LIMIT 1
    `;
    if (phoneMatch) {
      await sql`UPDATE users SET clerk_id = ${clerkId}, email = COALESCE(${email}, email) WHERE id = ${phoneMatch.id}`;
      const [updated] = await sql`SELECT * FROM users WHERE id = ${phoneMatch.id}`;
      return NextResponse.json({ user: updated });
    }
  }

  // 3. Try to match by email
  if (email) {
    const [emailMatch] = await sql`
      SELECT * FROM users WHERE email = ${email} AND trip_id = ${TRIP_ID} LIMIT 1
    `;
    if (emailMatch) {
      await sql`UPDATE users SET clerk_id = ${clerkId} WHERE id = ${emailMatch.id}`;
      const [updated] = await sql`SELECT * FROM users WHERE id = ${emailMatch.id}`;
      return NextResponse.json({ user: updated });
    }
  }

  // 4. No match - create new user without couple, flag for selection
  const [newUser] = await sql`
    INSERT INTO users (clerk_id, name, email, phone, trip_id)
    VALUES (${clerkId}, ${name}, ${email}, ${phone}, ${TRIP_ID})
    RETURNING *
  `;
  return NextResponse.json({ user: newUser, needsCoupleSelection: true });
}

export async function PUT(req: NextRequest) {
  const sql = getDb();
  const { clerkId, coupleId } = await req.json();

  await sql`UPDATE users SET couple_id = ${coupleId} WHERE clerk_id = ${clerkId}`;
  const [updated] = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId}`;
  return NextResponse.json({ user: updated });
}
