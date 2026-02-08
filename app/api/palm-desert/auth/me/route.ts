import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getDb } from '../../../../../lib/db';

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ user: null });

  const sql = getDb();
  const [user] = await sql`SELECT * FROM users WHERE clerk_id = ${userId} LIMIT 1`;
  return NextResponse.json({ user: user || null });
}
