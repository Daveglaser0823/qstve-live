'use client';

import { useEffect, useState } from 'react';
import { Users, Plane, Crown, ExternalLink } from 'lucide-react';

const ICAO: Record<string, string> = { DL: 'DAL', AA: 'AAL', UA: 'UAL', WN: 'SWA', AS: 'ASA', B6: 'JBU' };
function flightAwareUrl(flight: string) {
  const m = flight?.match(/^([A-Z]{2})(\d+)$/);
  return m ? `https://flightaware.com/live/flight/${ICAO[m[1]] || m[1]}${m[2]}` : null;
}

export default function Group() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/palm-desert/trip').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading...</div>;

  const { couples = [], flights = [] } = data;

  return (
    <div className="pd-space-y">
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={28} color="var(--pd-gold)" /> Our Group
        </h1>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>
          {couples.length} couples · {couples.length * 2} travelers
        </p>
      </div>

      <div className="pd-space-y">
        {couples.map((c: any, i: number) => {
          const cf = flights.filter((f: any) => f.couple_id === c.id);
          const outbound = cf.find((f: any) => f.direction === 'outbound');
          const isHost = i === 0; // First couple is host

          return (
            <div key={i} className="pd-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--pd-gold), var(--pd-gold2))', fontSize: 20, fontWeight: 700, color: 'white',
                }}>
                  {c.person1[0]}{c.person2[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {c.person1} & {c.person2}
                    {isHost && <Crown size={14} color="var(--pd-gold)" />}
                  </div>
                  {isHost && <span style={{ fontSize: 12, color: 'var(--pd-gold)' }}>Trip Host</span>}
                </div>
              </div>

              {outbound && outbound.segments.length > 0 && (
                <div style={{ background: 'var(--pd-surface2)', borderRadius: 10, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Plane size={14} color="var(--pd-text3)" />
                    <span style={{ fontSize: 12, color: 'var(--pd-text3)' }}>{outbound.airline}</span>
                    {outbound.confirmation && (
                      <span className="pd-badge" style={{ background: 'rgba(212,168,67,0.2)', color: 'var(--pd-gold)', fontFamily: 'monospace', marginLeft: 'auto' }}>
                        {outbound.confirmation}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13 }}>
                    {outbound.segments.map((s: any) => s.from).join(' → ')} → {outbound.segments[outbound.segments.length - 1]?.to}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                    {outbound.segments.filter((s: any) => s.flight).map((s: any, j: number) => {
                      const url = flightAwareUrl(s.flight);
                      return url ? (
                        <a key={j} href={url} target="_blank" rel="noopener noreferrer"
                           style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                          <ExternalLink size={10} /> {s.flight}
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
