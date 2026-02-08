'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Plane, Clock, MapPin, ExternalLink } from 'lucide-react';

const ICAO: Record<string, string> = { DL: 'DAL', AA: 'AAL', UA: 'UAL', WN: 'SWA', AS: 'ASA', B6: 'JBU', NK: 'NKS', F9: 'FFT' };

function flightAwareUrl(flight: string) {
  const m = flight?.match(/^([A-Z]{2})(\d+)$/);
  return m ? `https://flightaware.com/live/flight/${ICAO[m[1]] || m[1]}${m[2]}` : null;
}

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

interface ScheduleItem {
  date: string;
  time: string;
  title: string;
  category: string;
  emoji: string;
  participants?: string;
  details?: string;
  link?: { url: string; label: string };
}

export default function Activities() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/palm-desert/trip').then(r => r.json()).then(data => {
      const { trip, couples, events, flights, golfRounds } = data;
      const schedule: ScheduleItem[] = [];

      // Events (super bowl, etc.)
      for (const e of (events || [])) {
        schedule.push({
          date: e.date,
          time: e.time || 'TBD',
          title: e.title,
          category: 'event',
          emoji: e.emoji || '🎉',
          details: e.description || e.location,
          link: e.website_url ? { url: e.website_url, label: 'Website' } : undefined,
        });
      }

      // Golf rounds
      for (const g of (golfRounds || [])) {
        const details = typeof g.details === 'object' && g.details ? g.details : {};
        const links: { url: string; label: string }[] = [];
        if (details.url) links.push({ url: details.url, label: '🔗 Course Website' });
        if (details.maps) links.push({ url: details.maps, label: '📍 Apple Maps' });
        schedule.push({
          date: g.date,
          time: g.time || 'TBD',
          title: `⛳ ${g.course}`,
          category: 'golf',
          emoji: '⛳',
          details: details.venue ? `${details.venue}${details.address ? ' - ' + details.address : ''}` : g.details,
          link: links.length > 0 ? links[0] : undefined,
          extraLinks: links.length > 1 ? links.slice(1) : undefined,
        } as any);
      }

      // Flights
      for (const f of (flights || [])) {
        const couple = `${f.person1} & ${f.person2}`;
        const segs = f.segments || [];
        if (segs.length === 0) continue;
        const firstSeg = segs[0];
        const lastSeg = segs[segs.length - 1];
        const flightNums = segs.map((s: any) => s.flight).filter(Boolean).join(', ');
        const faUrl = firstSeg.flight ? flightAwareUrl(firstSeg.flight) : null;

        schedule.push({
          date: f.direction === 'outbound' ? trip.start_date : (f.notes?.match(/Feb (\d+)/) ? `2026-02-${f.notes.match(/Feb (\d+)/)?.[1]?.padStart(2, '0')}` : trip.end_date),
          time: firstSeg.depart || 'TBD',
          title: `${f.direction === 'outbound' ? '✈️ Depart' : '✈️ Return'}: ${firstSeg.from} → ${lastSeg.to}`,
          category: 'flight',
          emoji: '✈️',
          participants: couple,
          details: `${f.airline} ${flightNums}`,
          link: faUrl ? { url: faUrl, label: 'FlightAware' } : undefined,
        });
      }

      schedule.sort((a, b) => {
        const dc = a.date.localeCompare(b.date);
        if (dc !== 0) return dc;
        if (a.time === 'TBD') return 1;
        if (b.time === 'TBD') return -1;
        return a.time.localeCompare(b.time);
      });

      setItems(schedule);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading...</div>;

  // Group by date
  const grouped: Record<string, ScheduleItem[]> = {};
  for (const item of items) {
    (grouped[item.date] ??= []).push(item);
  }

  const categoryColors: Record<string, string> = {
    golf: 'var(--pd-green)', flight: 'var(--pd-blue)', event: 'var(--pd-purple)', dinner: 'var(--pd-gold)',
  };

  return (
    <div className="pd-space-y">
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarDays size={28} color="var(--pd-gold)" /> Schedule
        </h1>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>
          {items.length} activities planned
        </p>
      </div>

      {Object.entries(grouped).map(([date, dayItems]) => (
        <div key={date}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, var(--pd-gold), var(--pd-gold2))' }} />
            <h2 style={{ fontWeight: 600, color: 'var(--pd-gold)', fontSize: 16 }}>{formatDate(date)}</h2>
          </div>
          <div style={{ marginLeft: 20, borderLeft: '2px solid var(--pd-border)', paddingLeft: 16 }} className="pd-space-y-sm">
            {dayItems.map((item, i) => (
              <div key={i} className="pd-card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{item.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600 }}>{item.title}</span>
                      <span className="pd-badge" style={{ background: `${categoryColors[item.category] || 'var(--pd-text3)'}22`, color: categoryColors[item.category] || 'var(--pd-text3)' }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 13, color: 'var(--pd-text3)' }}>
                      <Clock size={12} /> {item.time}
                    </div>
                    {item.participants && (
                      <div style={{ fontSize: 13, color: 'var(--pd-text2)', marginTop: 2 }}>👥 {item.participants}</div>
                    )}
                    {item.details && (
                      <div style={{ fontSize: 13, color: 'var(--pd-text2)', marginTop: 2 }}>{item.details}</div>
                    )}
                    {(item.link || (item as any).extraLinks) && (
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
                        {item.link && (
                          <a href={item.link.url} target="_blank" rel="noopener noreferrer"
                             style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                            <ExternalLink size={12} /> {item.link.label}
                          </a>
                        )}
                        {((item as any).extraLinks || []).map((link: any, li: number) => (
                          <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                             style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                            <ExternalLink size={12} /> {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
