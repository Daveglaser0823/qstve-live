'use client';

import { useEffect, useState } from 'react';
import { UtensilsCrossed, Plus, Trash2, MapPin, Clock, Users, User, Hash, StickyNote, ExternalLink, Globe } from 'lucide-react';

export default function Dinners() {
  const [dinners, setDinners] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ restaurant: '', date: '', time: '18:00', party_size: '8', notes: '', booked_by: '', confirmation: '' });
  const [loading, setLoading] = useState(true);

  const load = () => fetch('/api/palm-desert/dinners').then(r => r.json()).then(d => { setDinners(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/palm-desert/dinners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, party_size: parseInt(form.party_size) }),
    });
    setForm({ restaurant: '', date: '', time: '18:00', party_size: '8', notes: '', booked_by: '', confirmation: '' });
    setShowForm(false);
    load();
  };

  const del = async (id: number) => {
    if (!confirm('Delete this reservation?')) return;
    await fetch('/api/palm-desert/dinners', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const formatDate = (d: string) => {
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const mapsUrl = (restaurant: string) =>
    `https://www.google.com/maps/search/${encodeURIComponent(restaurant + ' Palm Desert CA')}`;

  if (loading) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading...</div>;

  return (
    <div className="pd-space-y">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <UtensilsCrossed size={28} color="var(--pd-gold)" /> Dinner Reservations
          </h1>
          <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>Where we&apos;re eating</p>
        </div>
        <button className="pd-btn pd-btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> Add
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="pd-card pd-space-y">
          <h3 style={{ fontWeight: 600 }}>New Reservation</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="pd-label">Restaurant</label>
              <input className="pd-input" required value={form.restaurant} onChange={e => setForm({ ...form, restaurant: e.target.value })} placeholder="Restaurant name" />
            </div>
            <div>
              <label className="pd-label">Date</label>
              <input className="pd-input" type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="pd-label">Time</label>
              <input className="pd-input" type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            </div>
            <div>
              <label className="pd-label">Party Size</label>
              <input className="pd-input" type="number" min="1" value={form.party_size} onChange={e => setForm({ ...form, party_size: e.target.value })} />
            </div>
            <div>
              <label className="pd-label">Booked By</label>
              <input className="pd-input" value={form.booked_by} onChange={e => setForm({ ...form, booked_by: e.target.value })} placeholder="Who booked?" />
            </div>
            <div>
              <label className="pd-label">Confirmation #</label>
              <input className="pd-input" value={form.confirmation} onChange={e => setForm({ ...form, confirmation: e.target.value })} placeholder="Optional" />
            </div>
            <div>
              <label className="pd-label">Notes</label>
              <input className="pd-input" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="pd-btn pd-btn-primary">Add Reservation</button>
            <button type="button" className="pd-btn pd-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {dinners.length === 0 ? (
        <div className="pd-card" style={{ textAlign: 'center', padding: 48 }}>
          <UtensilsCrossed size={48} color="var(--pd-text3)" style={{ marginBottom: 16 }} />
          <p style={{ color: 'var(--pd-text3)', fontSize: 16 }}>No dinner reservations yet. Add one!</p>
        </div>
      ) : (
        <div className="pd-space-y">
          {dinners.map((d: any) => (
            <div key={d.id} className="pd-card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <a href={mapsUrl(d.restaurant)} target="_blank" rel="noopener noreferrer"
                     style={{ fontSize: 18, fontWeight: 600, color: 'var(--pd-gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {d.restaurant} <MapPin size={14} />
                  </a>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8, fontSize: 14, color: 'var(--pd-text2)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={14} /> {formatDate(d.date)} at {formatTime(d.time)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Users size={14} /> Party of {d.party_size}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 4, fontSize: 13, color: 'var(--pd-text3)' }}>
                    {d.booked_by && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <User size={13} /> {d.booked_by}
                      </span>
                    )}
                    {d.confirmation && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Hash size={13} /> {d.confirmation}
                      </span>
                    )}
                    {d.notes && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <StickyNote size={13} /> {d.notes}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                    {d.website_url && (
                      <a href={d.website_url} target="_blank" rel="noopener noreferrer"
                         style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                        <Globe size={13} /> Website
                      </a>
                    )}
                    {d.maps_url ? (
                      <a href={d.maps_url} target="_blank" rel="noopener noreferrer"
                         style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                        <MapPin size={13} /> Apple Maps
                      </a>
                    ) : (
                      <a href={mapsUrl(d.restaurant)} target="_blank" rel="noopener noreferrer"
                         style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                        <MapPin size={13} /> Google Maps
                      </a>
                    )}
                  </div>
                </div>
                <button onClick={() => del(d.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--pd-text3)', cursor: 'pointer', padding: 4 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
