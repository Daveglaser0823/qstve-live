'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Plus, Trash2, ArrowRight, Receipt } from 'lucide-react';
import { useTripUser } from '../../../lib/user-context';

const categories = [
  { value: 'groceries', label: '🛒 Groceries' },
  { value: 'dining', label: '🍽️ Dining' },
  { value: 'golf', label: '⛳ Golf' },
  { value: 'transport', label: '🚗 Transport' },
  { value: 'entertainment', label: '🎉 Entertainment' },
  { value: 'general', label: '📦 General' },
];

export default function Expenses() {
  const { tripUser } = useTripUser();
  const [data, setData] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ paid_by_couple_id: '', description: '', amount: '', category: 'general', date: new Date().toISOString().split('T')[0] });

  const load = () => fetch('/api/palm-desert/expenses').then(r => r.json()).then(setData);
  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (data?.couples?.length && !form.paid_by_couple_id) {
      // Auto-fill with logged-in user's couple, or first couple
      const defaultCouple = tripUser?.couple_id
        ? data.couples.find((c: any) => c.id === tripUser.couple_id)
        : data.couples[0];
      if (defaultCouple) setForm(f => ({ ...f, paid_by_couple_id: defaultCouple.id }));
    }
  }, [data, tripUser]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/palm-desert/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paid_by_couple_id: parseInt(form.paid_by_couple_id as any), description: form.description, amount: parseFloat(form.amount), category: form.category, date: form.date }),
    });
    setForm(f => ({ ...f, description: '', amount: '' }));
    setShowForm(false);
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/palm-desert/expenses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  if (!data) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading...</div>;

  const { expenses, couples, balances, settlements } = data;
  const totalSpent = expenses.reduce((s: number, e: any) => s + parseFloat(e.amount), 0);
  const coupleName = (id: string) => couples.find((c: any) => c.id === id)?.name || 'Unknown';

  return (
    <div className="pd-space-y">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <DollarSign size={28} color="var(--pd-gold)" /> Expenses
          </h1>
          <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>Track spending & settle up</p>
        </div>
        <button className="pd-btn pd-btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> Add
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="pd-card pd-space-y">
          <h3 style={{ fontWeight: 600 }}>New Expense</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="pd-label">Description</label>
              <input className="pd-input" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What?" />
            </div>
            <div>
              <label className="pd-label">Amount ($)</label>
              <input className="pd-input" type="number" step="0.01" required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" />
            </div>
            <div>
              <label className="pd-label">Paid By</label>
              <select className="pd-input" value={form.paid_by_couple_id} onChange={e => setForm({ ...form, paid_by_couple_id: e.target.value })}>
                {couples.map((c: any) => <option key={c.id} value={c.id}>{c.person1} & {c.person2}</option>)}
              </select>
            </div>
            <div>
              <label className="pd-label">Category</label>
              <select className="pd-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="pd-label">Date</label>
              <input className="pd-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="pd-btn pd-btn-primary">Add Expense</button>
            <button type="button" className="pd-btn pd-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {/* Summary */}
      <div className="pd-grid-4">
        <div className="pd-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--pd-gold)' }}>${totalSpent.toFixed(2)}</div>
          <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>Total Spent</div>
        </div>
        <div className="pd-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{expenses.length}</div>
          <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>Expenses</div>
        </div>
        <div className="pd-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>${(totalSpent / (couples.length || 1)).toFixed(2)}</div>
          <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>Per Couple</div>
        </div>
        <div className="pd-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>${(totalSpent / ((couples.length || 1) * 2)).toFixed(2)}</div>
          <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>Per Person</div>
        </div>
      </div>

      {/* Balances */}
      {couples.length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>💰 Balances</h2>
          <div className="pd-space-y-sm">
            {couples.map((c: any) => {
              const bal = balances[c.id] || 0;
              return (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--pd-surface2)', borderRadius: 10, padding: 12 }}>
                  <span style={{ fontWeight: 500 }}>{c.name}</span>
                  <span style={{ fontWeight: 600, color: bal > 0.01 ? 'var(--pd-green)' : bal < -0.01 ? 'var(--pd-red)' : 'var(--pd-text3)' }}>
                    {bal > 0.01 ? '+' : ''}{Math.abs(bal) > 0.01 ? `$${bal.toFixed(2)}` : '$0.00'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Settlements */}
      {settlements.length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>🤝 Settlement Plan</h2>
          <div className="pd-space-y-sm">
            {settlements.map((s: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--pd-surface2)', borderRadius: 10, padding: 12 }}>
                <span style={{ fontWeight: 500, color: 'var(--pd-red)' }}>{coupleName(s.from)}</span>
                <ArrowRight size={16} color="var(--pd-text3)" />
                <span style={{ fontWeight: 500, color: 'var(--pd-green)' }}>{coupleName(s.to)}</span>
                <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--pd-gold)' }}>${s.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense List */}
      <div className="pd-card">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Receipt size={20} /> All Expenses
        </h2>
        {expenses.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 32 }}>No expenses yet!</p>
        ) : (
          <div className="pd-space-y-sm">
            {expenses.map((exp: any) => (
              <div key={exp.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--pd-surface2)', borderRadius: 10, padding: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{exp.description}</div>
                  <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>
                    Paid by {exp.person1} & {exp.person2} · {exp.date}{exp.category && ` · ${exp.category}`}
                  </div>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--pd-gold)' }}>${parseFloat(exp.amount).toFixed(2)}</span>
                <button onClick={() => del(exp.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--pd-text3)', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
