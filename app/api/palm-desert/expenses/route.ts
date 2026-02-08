import { NextRequest, NextResponse } from 'next/server';
import { getDb, TRIP_ID } from '../../../../lib/db';

export async function GET() {
  const sql = getDb();

  const expenses = await sql`
    SELECT e.*, c.person1, c.person2
    FROM expenses e
    JOIN couples c ON c.id = e.paid_by_couple_id
    WHERE e.trip_id = ${TRIP_ID}
    ORDER BY e.date DESC, e.created_at DESC
  `;

  const couples = await sql`SELECT * FROM couples WHERE trip_id = ${TRIP_ID} ORDER BY id`;

  // Calculate balances
  const totalSpent = expenses.reduce((s: number, e: any) => s + parseFloat(e.amount), 0);
  const perCouple = couples.length > 0 ? totalSpent / couples.length : 0;

  const balances: Record<number, number> = {};
  for (const c of couples) {
    const paid = expenses
      .filter((e: any) => e.paid_by_couple_id === c.id)
      .reduce((s: number, e: any) => s + parseFloat(e.amount), 0);
    balances[c.id] = paid - perCouple;
  }

  // Settlements
  const settlements: { from: number; to: number; amount: number }[] = [];
  const debtors = couples.filter((c: any) => (balances[c.id] || 0) < -0.01).map((c: any) => ({ ...c, bal: balances[c.id] }));
  const creditors = couples.filter((c: any) => (balances[c.id] || 0) > 0.01).map((c: any) => ({ ...c, bal: balances[c.id] }));
  debtors.sort((a: any, b: any) => a.bal - b.bal);
  creditors.sort((a: any, b: any) => b.bal - a.bal);

  let di = 0, ci = 0;
  while (di < debtors.length && ci < creditors.length) {
    const amount = Math.min(-debtors[di].bal, creditors[ci].bal);
    if (amount > 0.01) settlements.push({ from: debtors[di].id, to: creditors[ci].id, amount: Math.round(amount * 100) / 100 });
    debtors[di].bal += amount;
    creditors[ci].bal -= amount;
    if (Math.abs(debtors[di].bal) < 0.01) di++;
    if (Math.abs(creditors[ci].bal) < 0.01) ci++;
  }

  return NextResponse.json({ expenses, couples, balances, settlements });
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const { paid_by_couple_id, description, amount, category, date } = await req.json();

  const [expense] = await sql`
    INSERT INTO expenses (trip_id, paid_by_couple_id, description, amount, category, date, split_type)
    VALUES (${TRIP_ID}, ${paid_by_couple_id}, ${description}, ${amount}, ${category || 'general'}, ${date}, 'equal')
    RETURNING *
  `;

  return NextResponse.json(expense);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM expenses WHERE id = ${id} AND trip_id = ${TRIP_ID}`;
  return NextResponse.json({ ok: true });
}
