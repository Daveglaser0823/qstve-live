'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';
import { useTripUser } from '../../../lib/user-context';

interface GroceryItem {
  id: string;
  section: string;
  item: string;
  checked: boolean;
  checked_by_name?: string;
}

const sectionEmojis: Record<string, string> = {
  Dairy: '🥛', Bakery: '🍞', Produce: '🥬', Deli: '🥩', Drinks: '☕',
  Snacks: '🍿', Meat: '🥩', Frozen: '🧊', Condiments: '🧂', Household: '🧹', Other: '📦',
};
const sectionOrder = ['Produce', 'Dairy', 'Bakery', 'Deli', 'Meat', 'Drinks', 'Snacks', 'Frozen', 'Condiments', 'Household', 'Other'];

export default function Grocery() {
  const { tripUser } = useTripUser();
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newSection, setNewSection] = useState('Other');

  const load = () => fetch('/api/palm-desert/grocery').then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const toggle = async (id: string, checked: boolean) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked } : i));
    await fetch('/api/palm-desert/grocery', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, checked, userId: tripUser?.id || null }),
    });
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    await fetch('/api/palm-desert/grocery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: newSection, item: newItem }),
    });
    setNewItem('');
    setShowAdd(false);
    load();
  };

  const deleteItem = async (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    await fetch('/api/palm-desert/grocery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  const sections = [...new Set(items.map(i => i.section))].sort((a, b) => {
    const ai = sectionOrder.indexOf(a);
    const bi = sectionOrder.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const total = items.length;
  const checked = items.filter(i => i.checked).length;
  const progress = total ? Math.round((checked / total) * 100) : 0;

  return (
    <div className="pd-space-y">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShoppingCart size={28} color="var(--pd-gold)" /> Grocery List
          </h1>
          <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>Shopping checklist by section</p>
        </div>
        <button className="pd-btn pd-btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={16} /> Add
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addItem} className="pd-card" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="pd-input" value={newSection} onChange={e => setNewSection(e.target.value)}
                  style={{ width: 'auto', minWidth: 120 }}>
            {sectionOrder.map(s => <option key={s} value={s}>{sectionEmojis[s]} {s}</option>)}
          </select>
          <input className="pd-input" value={newItem} onChange={e => setNewItem(e.target.value)}
                 placeholder="Item name..." style={{ flex: 1, minWidth: 150 }} autoFocus />
          <button type="submit" className="pd-btn pd-btn-primary">Add</button>
        </form>
      )}

      {/* Progress */}
      {total > 0 && (
        <div className="pd-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: 'var(--pd-text2)' }}>Shopping Progress</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--pd-gold)' }}>{checked}/{total}</span>
          </div>
          <div className="pd-progress-bar">
            <div className="pd-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          {progress === 100 && (
            <p style={{ textAlign: 'center', color: 'var(--pd-green)', marginTop: 8, fontSize: 14 }}>✅ All done!</p>
          )}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 32 }}>Loading...</div>
      ) : (
        sections.map(section => {
          const sectionItems = items.filter(i => i.section === section);
          const sc = sectionItems.filter(i => i.checked).length;
          return (
            <div key={section} className="pd-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {sectionEmojis[section] || '📦'} {section}
                </h2>
                <span style={{ fontSize: 12, color: 'var(--pd-text3)' }}>{sc}/{sectionItems.length}</span>
              </div>
              <div className="pd-space-y-sm">
                {sectionItems.map(item => (
                  <label key={item.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 8,
                    cursor: 'pointer', opacity: item.checked ? 0.5 : 1,
                  }}>
                    <input type="checkbox" className="pd-checkbox" checked={item.checked}
                           onChange={e => toggle(item.id, e.target.checked)} />
                    <span style={{ flex: 1 }}>
                      <span style={{ textDecoration: item.checked ? 'line-through' : 'none',
                                     color: item.checked ? 'var(--pd-text3)' : 'var(--pd-text)' }}>
                        {item.item}
                      </span>
                      {item.checked && item.checked_by_name && (
                        <span style={{ fontSize: 11, color: 'var(--pd-text3)', marginLeft: 8 }}>
                          ✓ {item.checked_by_name}
                        </span>
                      )}
                    </span>
                    <button onClick={(e) => { e.preventDefault(); deleteItem(item.id); }}
                            style={{ background: 'none', border: 'none', color: 'var(--pd-text3)', cursor: 'pointer', padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
