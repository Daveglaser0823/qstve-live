'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users, Home, Calendar, DollarSign, ShoppingCart, Plane, MapPin, ChevronRight
} from 'lucide-react';

function getCountdown(targetDate: string) {
  const now = new Date();
  const target = new Date(targetDate + 'T00:00:00');
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    const end = new Date('2026-02-12T23:59:59');
    if (now <= end) return { days: 0, hours: 0, minutes: 0, seconds: 0, isActive: true };
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isActive: false };
  }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isActive: false,
  };
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [countdown, setCountdown] = useState<any>(null);

  useEffect(() => {
    fetch('/api/palm-desert/trip').then(r => r.json()).then(setData);
  }, []);

  useEffect(() => {
    if (!data?.trip) return;
    const tick = () => setCountdown(getCountdown(data.trip.start_date));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [data]);

  if (!data) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: '64px 0' }}>Loading...</div>;

  const { trip, couples, events, flights, golfRounds } = data;
  const details = trip.property_details || {};
  const golfEvents = (events || []).filter((e: any) => e.category === 'golf');
  const nights = Math.round((new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / 86400000);

  const quickLinks = [
    { href: '/palm-desert/activities', icon: Calendar, label: 'Full Schedule', desc: `All activities in chronological order` },
    { href: '/palm-desert/itinerary', icon: Plane, label: 'Flights & Golf', desc: `${(flights||[]).length} flights · ${golfEvents.length} rounds` },
    { href: '/palm-desert/group', icon: Users, label: 'Our Group', desc: `${(couples||[]).length} couples, ${(couples||[]).length * 2} travelers` },
    { href: '/palm-desert/grocery', icon: ShoppingCart, label: 'Grocery List', desc: 'Shopping checklist' },
    { href: '/palm-desert/expenses', icon: DollarSign, label: 'Expenses', desc: 'Track spending & settle up' },
    { href: '/palm-desert/weather', icon: MapPin, label: 'Weather', desc: 'Current conditions & forecast' },
  ];

  return (
    <div className="pd-space-y">
      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌴</span>
          <h1 style={{ fontSize: 28, fontWeight: 800 }} className="pd-gradient-text">{trip.name}</h1>
          <span style={{ fontSize: 36 }}>🌴</span>
        </div>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14 }}>
          {trip.property_name && `${trip.property_name} · `}{trip.location} · Feb {new Date(trip.start_date + 'T12:00:00').getDate()}-{new Date(trip.end_date + 'T12:00:00').getDate()}, 2026
        </p>
      </div>

      {/* Countdown */}
      <div className="pd-card" style={{ textAlign: 'center' }}>
        {countdown?.isActive ? (
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--pd-green)' }}>🌴 Trip is underway! 🌴</div>
        ) : countdown?.days === 0 && !countdown?.isActive ? (
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--pd-text3)' }}>📸 Trip completed!</div>
        ) : countdown ? (
          <>
            <p style={{ fontSize: 12, color: 'var(--pd-text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              Countdown to Palm Desert
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.minutes, label: 'Min' },
                { val: countdown.seconds, label: 'Sec' },
              ].map(({ val, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className="pd-gradient-text" style={{ fontSize: 36, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                    {String(val).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--pd-text3)' }}>{label}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Quick Stats */}
      <div className="pd-grid-4">
        <Link href="/palm-desert/group" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="pd-card pd-card-hover" style={{ textAlign: 'center', padding: 16 }}>
            <Users size={28} color="var(--pd-blue)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, fontSize: 14 }}>{couples.length} Couples</div>
            <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>{couples.length * 2} travelers</div>
          </div>
        </Link>
        <a href={trip.property_url || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="pd-card pd-card-hover" style={{ textAlign: 'center', padding: 16 }}>
            <Home size={28} color="var(--pd-green)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, fontSize: 14 }}>{trip.property_name || trip.location}</div>
            <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>{details.bedrooms}BR / {details.bathrooms}BA</div>
          </div>
        </a>
        <Link href="/palm-desert/activities" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="pd-card pd-card-hover" style={{ textAlign: 'center', padding: 16 }}>
            <Calendar size={28} color="var(--pd-purple)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, fontSize: 14 }}>Feb 8-12</div>
            <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>{nights} nights</div>
          </div>
        </Link>
        <Link href="/palm-desert/expenses" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="pd-card pd-card-hover" style={{ textAlign: 'center', padding: 16 }}>
            <DollarSign size={28} color="var(--pd-gold)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, fontSize: 14 }}>$1,900</div>
            <div style={{ fontSize: 12, color: 'var(--pd-text3)' }}>per couple</div>
          </div>
        </Link>
      </div>

      {/* Property */}
      {details.amenities && (
        <div className="pd-card">
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Home size={20} color="var(--pd-gold)" /> {trip.property_name}
          </h2>
          <div className="pd-grid-4">
            {details.sqft && (
              <div style={{ background: 'var(--pd-surface2)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 24 }}>🏠</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{details.sqft?.toLocaleString()} sqft</div>
              </div>
            )}
            {(details.amenities || []).map((a: string, i: number) => {
              const icons: Record<string, string> = { Pool: '🏊', 'Hot Tub': '♨️', Gym: '💪', 'Game Room': '🎱' };
              return (
                <div key={i} style={{ background: 'var(--pd-surface2)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24 }}>{icons[a] || '✨'}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{a}</div>
                </div>
              );
            })}
          </div>
          {trip.property_url && (
            <a href={trip.property_url} target="_blank" rel="noopener noreferrer"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
              🔗 View on VRBO <ChevronRight size={14} />
            </a>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="pd-space-y-sm">
        {quickLinks.map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="pd-card pd-card-hover" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--pd-gold), var(--pd-gold2))', flexShrink: 0,
              }}>
                <Icon size={24} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--pd-text2)' }}>{desc}</div>
              </div>
              <ChevronRight size={20} color="var(--pd-text3)" />
            </div>
          </Link>
        ))}
      </div>

      {/* Golf Schedule */}
      {(golfRounds || []).length > 0 && (
        <div className="pd-card">
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>⛳ Tee Times</h2>
          <div className="pd-space-y-sm">
            {(golfRounds || []).map((g: any, i: number) => {
              const d = new Date(g.date + 'T12:00:00');
              const info = typeof g.details === 'string' ? (() => { try { return JSON.parse(g.details); } catch { return {}; } })() : (g.details || {});
              return (
                <div key={i} style={{ background: 'var(--pd-surface2)', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }}>⛳</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{g.course}</div>
                      <div style={{ fontSize: 13, color: 'var(--pd-text2)' }}>
                        {d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {g.time}
                      </div>
                      {info.venue && (
                        <div style={{ fontSize: 12, color: 'var(--pd-text3)', marginTop: 2 }}>{info.venue}</div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 10, marginLeft: 40 }}>
                    {info.url && (
                      <a href={info.url} target="_blank" rel="noopener noreferrer"
                         style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                        🔗 Course Website
                      </a>
                    )}
                    {info.maps && (
                      <a href={info.maps} target="_blank" rel="noopener noreferrer"
                         style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--pd-gold)', textDecoration: 'none' }}>
                        📍 Apple Maps
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Explore Links */}
      <div className="pd-card">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>📍 Explore Palm Desert</h2>
        <div className="pd-grid-4">
          {[
            { emoji: '🍽️', label: 'Restaurants', href: '/palm-desert/explore/restaurants' },
            { emoji: '🌵', label: 'Activities', href: '/palm-desert/explore/activities' },
            { emoji: '⛳', label: 'Golf Courses', href: '/palm-desert/explore/golf' },
            { emoji: '🛍️', label: 'Shopping', href: '/palm-desert/explore/shopping' },
            { emoji: '🎶', label: 'Nightlife', href: '/palm-desert/explore/nightlife' },
            { emoji: '🏠', label: 'VRBO Listing', href: trip.property_url, external: true },
          ].filter(l => l.href).map((l: any, i) => (
            l.external ? (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                 style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--pd-surface2)', borderRadius: 10, padding: 12, textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: 20 }}>{l.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{l.label}</span>
              </a>
            ) : (
              <Link key={i} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--pd-surface2)', borderRadius: 10, padding: 12, textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: 20 }}>{l.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{l.label}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
