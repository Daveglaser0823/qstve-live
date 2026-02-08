'use client';

import { useEffect, useState } from 'react';
import { Calendar, Plane, Clock, MapPin } from 'lucide-react';

function formatDay(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function FlightAwareLink({ flight }: { flight: string }) {
  if (!flight || flight === 'TBD') return <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--pd-gold)' }}>{flight}</span>;
  const codes: Record<string, string> = { DL: 'DAL', AA: 'AAL', UA: 'UAL', WN: 'SWA' };
  const m = flight.match(/^([A-Z]{2})(\d+)$/);
  const url = m ? `https://flightaware.com/live/flight/${codes[m[1]] || m[1]}${m[2]}` : '#';
  return <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--pd-gold)', textDecoration: 'none' }}>{flight}</a>;
}

export default function Itinerary() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/palm-desert/trip').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading...</div>;

  const { trip, couples, events, flights } = data;
  const golfEvents = (events || []).filter((e: any) => e.category === 'golf');
  const specialEvents = (events || []).filter((e: any) => e.category !== 'golf');

  // Group flights by couple
  const flightsByCouple = (couples || []).map((c: any) => {
    const cf = (flights || []).filter((f: any) => f.couple_id === c.id);
    const outbound = cf.find((f: any) => f.direction === 'outbound');
    const ret = cf.find((f: any) => f.direction === 'return');
    return {
      couple: `${c.person1} & ${c.person2}`,
      airline: outbound?.airline || ret?.airline || 'TBD',
      confirmation: outbound?.confirmation || ret?.confirmation,
      outbound: outbound?.segments || [],
      returnFlight: ret?.segments || [],
      returnNote: ret?.notes,
    };
  });

  // Build timeline
  const start = new Date(trip.start_date + 'T00:00:00');
  const end = new Date(trip.end_date + 'T00:00:00');
  const timeline: { date: string; label: string; items: { time: string; title: string; desc: string }[] }[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    const ds = cur.toISOString().split('T')[0];
    const items: { time: string; title: string; desc: string }[] = [];
    if (ds === trip.start_date) items.push({ time: 'Morning', title: '✈️ Travel Day', desc: 'Arrival' });
    if (ds === trip.end_date) items.push({ time: 'Morning', title: 'Check-out', desc: 'Depart' });
    for (const e of events.filter((e: any) => e.date === ds)) {
      items.push({ time: e.time || '', title: `${e.emoji || ''} ${e.title}`, desc: e.description || e.location || '' });
    }
    if (items.length) timeline.push({ date: ds, label: formatDay(ds), items });
    cur.setDate(cur.getDate() + 1);
  }

  return (
    <div className="pd-space-y">
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={28} color="var(--pd-gold)" /> Itinerary
        </h1>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>Flights, golf & daily schedule</p>
      </div>

      {/* Timeline */}
      {timeline.length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>📅 Daily Timeline</h2>
          <div className="pd-space-y">
            {timeline.map(day => (
              <div key={day.date}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, var(--pd-gold), var(--pd-gold2))' }} />
                  <h3 style={{ fontWeight: 600, color: 'var(--pd-gold)' }}>{day.label}</h3>
                </div>
                <div style={{ marginLeft: 20, borderLeft: '2px solid var(--pd-border)', paddingLeft: 16 }} className="pd-space-y-sm">
                  {day.items.map((item, i) => (
                    <div key={i} style={{ background: 'var(--pd-surface2)', borderRadius: 10, padding: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Clock size={12} color="var(--pd-text3)" />
                        <span style={{ fontSize: 12, color: 'var(--pd-text3)' }}>{item.time}</span>
                      </div>
                      <div style={{ fontWeight: 500 }}>{item.title}</div>
                      {item.desc && <div style={{ fontSize: 13, color: 'var(--pd-text2)' }}>{item.desc}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flights */}
      {flightsByCouple.length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plane size={20} color="var(--pd-gold)" /> Flights
          </h2>
          <div className="pd-space-y">
            {flightsByCouple.map((f: any, i: number) => (
              <div key={i} style={{ border: '1px solid var(--pd-border)', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 12, gap: 8 }}>
                  <h3 style={{ fontWeight: 600 }}>{f.couple}</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className="pd-badge" style={{ background: 'var(--pd-surface2)' }}>{f.airline}</span>
                    {f.confirmation && (
                      <span className="pd-badge" style={{ background: 'rgba(212,168,67,0.2)', color: 'var(--pd-gold)', fontFamily: 'monospace' }}>{f.confirmation}</span>
                    )}
                  </div>
                </div>
                {f.outbound.length > 0 ? (
                  <div className="pd-space-y-sm">
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--pd-text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                        ✈️ Outbound · {formatDay(trip.start_date)}
                      </div>
                      {f.outbound.map((seg: any, j: number) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--pd-surface2)', borderRadius: 8, padding: '8px 12px', marginBottom: 4, fontSize: 14 }}>
                          <FlightAwareLink flight={seg.flight} />
                          <span style={{ color: 'var(--pd-text2)' }}>{seg.from} → {seg.to}</span>
                          {seg.depart && <span style={{ marginLeft: 'auto', fontSize: 12 }}>{seg.depart}</span>}
                          {seg.arrive && <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--pd-green)' }}>arr {seg.arrive}</span>}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--pd-text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                        🔙 Return {f.returnNote ? `· ${f.returnNote}` : `· ${formatDay(trip.end_date)}`}
                      </div>
                      {f.returnFlight.map((seg: any, j: number) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--pd-surface2)', borderRadius: 8, padding: '8px 12px', marginBottom: 4, fontSize: 14 }}>
                          <FlightAwareLink flight={seg.flight} />
                          <span style={{ color: 'var(--pd-text2)' }}>{seg.from} → {seg.to}</span>
                          {seg.depart && <span style={{ marginLeft: 'auto', fontSize: 12 }}>{seg.depart}</span>}
                          {seg.arrive && <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--pd-green)' }}>arr {seg.arrive}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: 'var(--pd-text3)', fontStyle: 'italic' }}>{f.returnNote || 'No flight details yet'}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Golf */}
      {golfEvents.length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⛳ Golf Schedule</h2>
          <div className="pd-space-y-sm">
            {golfEvents.map((e: any, i: number) => (
              <a key={i} href={e.website_url || '#'} target="_blank" rel="noopener noreferrer"
                 style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--pd-surface2)', borderRadius: 12, padding: 16, textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: 28 }}>🏌️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--pd-gold)' }}>{e.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--pd-text2)' }}>
                    {formatDay(e.date)} · {e.time}
                  </div>
                </div>
                {e.description && (
                  <span className="pd-badge" style={{ background: 'rgba(74,222,128,0.2)', color: 'var(--pd-green)' }}>{e.description}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Special Events */}
      {specialEvents.length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🎉 Events</h2>
          <div className="pd-space-y-sm">
            {specialEvents.map((e: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--pd-surface2)', borderRadius: 12, padding: 16 }}>
                <span style={{ fontSize: 28 }}>{e.emoji || '🎉'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{e.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--pd-text2)' }}>{formatDay(e.date)} · {e.time}</div>
                  {e.description && <div style={{ fontSize: 13, color: 'var(--pd-text3)', marginTop: 4 }}>{e.description}</div>}
                </div>
                {e.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--pd-text3)' }}>
                    <MapPin size={12} /> {e.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
