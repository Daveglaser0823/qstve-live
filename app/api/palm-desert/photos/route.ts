import { NextRequest, NextResponse } from 'next/server';
import { getDb, TRIP_ID } from '../../../../lib/db';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'palm-desert');

export async function GET() {
  const sql = getDb();
  const photos = await sql`
    SELECT * FROM photos
    WHERE trip_id = ${TRIP_ID}
    ORDER BY day_date DESC, created_at DESC
  `;
  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  const sql = getDb();

  const formData = await req.formData();
  const file = formData.get('photo') as File | null;
  const caption = (formData.get('caption') as string) || '';
  const tag = (formData.get('tag') as string) || 'other';
  const dayDate = (formData.get('day_date') as string) || '';
  const uploadedBy = (formData.get('uploaded_by') as string) || 'Unknown';

  if (!file) {
    return NextResponse.json({ error: 'No photo provided' }, { status: 400 });
  }

  // Read file bytes and resize/compress
  const bytes = new Uint8Array(await file.arrayBuffer());

  // Generate unique filename
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `${randomUUID()}.${ext}`;
  const photoUrl = `/uploads/palm-desert/${filename}`;

  // Ensure directory exists and write file
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(join(UPLOAD_DIR, filename), bytes);

  // Insert into DB
  await sql`
    INSERT INTO photos (trip_id, filename, original_name, caption, tag, day_date, uploaded_by, photo_url)
    VALUES (${TRIP_ID}, ${filename}, ${file.name}, ${caption}, ${tag}, ${dayDate}, ${uploadedBy}, ${photoUrl})
  `;

  return NextResponse.json({ success: true, photoUrl });
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();

  // Get filename to delete file
  const rows = await sql`SELECT filename FROM photos WHERE id = ${id} AND trip_id = ${TRIP_ID}`;
  if (rows.length > 0) {
    try {
      await unlink(join(UPLOAD_DIR, rows[0].filename));
    } catch {}
    await sql`DELETE FROM photos WHERE id = ${id} AND trip_id = ${TRIP_ID}`;
  }

  return NextResponse.json({ success: true });
}
