'use client';

import { useEffect, useState, useRef } from 'react';
import { Camera, X, Upload, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTripUser } from '../../../lib/user-context';

const tags = [
  { value: 'golf', label: '⛳ Golf' },
  { value: 'dinner', label: '🍽️ Dinner' },
  { value: 'pool', label: '🏊 Pool' },
  { value: 'group', label: '👥 Group' },
  { value: 'scenic', label: '🏜️ Scenic' },
  { value: 'other', label: '📸 Other' },
];

const days = [
  { value: '', label: 'All' },
  { value: '2026-02-08', label: 'Feb 8' },
  { value: '2026-02-09', label: 'Feb 9' },
  { value: '2026-02-10', label: 'Feb 10' },
  { value: '2026-02-11', label: 'Feb 11' },
  { value: '2026-02-12', label: 'Feb 12' },
];

interface Photo {
  id: number;
  filename: string;
  original_name: string;
  caption: string;
  tag: string;
  day_date: string;
  uploaded_by: string;
  photo_url: string;
  created_at: string;
}

export default function Photos() {
  const { tripUser } = useTripUser();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ caption: '', tag: 'other', day_date: '2026-02-08' });

  const load = () => {
    fetch('/api/palm-desert/photos')
      .then(r => r.json())
      .then(d => { setPhotos(d.photos || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = photos.filter(p => {
    if (activeDay && p.day_date !== activeDay) return false;
    if (activeTag && p.tag !== activeTag) return false;
    return true;
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const upload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('photo', file);
    fd.append('caption', form.caption);
    fd.append('tag', form.tag);
    fd.append('day_date', form.day_date);
    fd.append('uploaded_by', tripUser?.name || 'Unknown');
    await fetch('/api/palm-desert/photos', { method: 'POST', body: fd });
    setUploading(false);
    setShowUpload(false);
    setPreview(null);
    setForm({ caption: '', tag: 'other', day_date: '2026-02-08' });
    if (fileRef.current) fileRef.current.value = '';
    load();
  };

  const del = async (id: number) => {
    if (!confirm('Delete this photo?')) return;
    await fetch('/api/palm-desert/photos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const lbPhoto = lightbox !== null ? filtered[lightbox] : null;
  const lbPrev = () => setLightbox(i => i !== null && i > 0 ? i - 1 : i);
  const lbNext = () => setLightbox(i => i !== null && i < filtered.length - 1 ? i + 1 : i);

  // Swipe support for lightbox
  const touchStart = useRef<number>(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 60) lbNext();
    else if (diff < -60) lbPrev();
  };

  if (loading) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading...</div>;

  return (
    <div className="pd-space-y">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Camera size={28} color="var(--pd-gold)" /> Photo Wall
          </h1>
          <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>{photos.length} photos shared</p>
        </div>
        <button className="pd-btn pd-btn-primary" onClick={() => setShowUpload(!showUpload)}>
          <Upload size={16} /> Upload
        </button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div className="pd-card pd-space-y" style={{ border: '2px dashed var(--pd-gold)', background: 'var(--pd-surface2)' }}>
          <h3 style={{ fontWeight: 600 }}>📷 Add Photo</h3>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          {preview ? (
            <div style={{ position: 'relative' }}>
              <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 12 }} />
              <button
                onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} color="white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                width: '100%', padding: '40px 20px', border: '1px dashed var(--pd-text3)', borderRadius: 12,
                background: 'transparent', color: 'var(--pd-text2)', cursor: 'pointer', fontSize: 16,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <Camera size={32} color="var(--pd-gold)" />
              Tap to take photo or choose from library
            </button>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="pd-label">Caption</label>
              <input className="pd-input" placeholder="What's happening?" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} />
            </div>
            <div>
              <label className="pd-label">Tag</label>
              <select className="pd-input" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}>
                {tags.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="pd-label">Day</label>
              <select className="pd-input" value={form.day_date} onChange={e => setForm({ ...form, day_date: e.target.value })}>
                {days.slice(1).map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pd-btn pd-btn-primary" onClick={upload} disabled={!preview || uploading}>
              {uploading ? 'Uploading...' : 'Share Photo'}
            </button>
            <button className="pd-btn pd-btn-secondary" onClick={() => { setShowUpload(false); setPreview(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Day Filter Tabs */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {days.map(d => (
          <button
            key={d.value}
            onClick={() => setActiveDay(d.value)}
            style={{
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontSize: 13, fontWeight: 600,
              background: activeDay === d.value ? 'var(--pd-gold)' : 'var(--pd-surface2)',
              color: activeDay === d.value ? '#1a1a2e' : 'var(--pd-text2)',
            }}
          >
            {d.label}
          </button>
        ))}
        <div style={{ width: 1, background: 'var(--pd-text3)', opacity: 0.3, margin: '4px 2px' }} />
        {tags.map(t => (
          <button
            key={t.value}
            onClick={() => setActiveTag(activeTag === t.value ? '' : t.value)}
            style={{
              padding: '8px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontSize: 13, fontWeight: 600,
              background: activeTag === t.value ? 'var(--pd-gold)' : 'var(--pd-surface2)',
              color: activeTag === t.value ? '#1a1a2e' : 'var(--pd-text2)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {filtered.length === 0 ? (
        <div className="pd-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📷</div>
          <h3 style={{ fontWeight: 600, marginBottom: 8 }}>No photos yet!</h3>
          <p style={{ color: 'var(--pd-text3)', fontSize: 14 }}>Be the first to share a moment from the trip</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 8,
        }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setLightbox(i)}
              style={{
                position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                aspectRatio: '1', background: 'var(--pd-surface2)',
              }}
            >
              <img
                src={p.photo_url}
                alt={p.caption || 'Photo'}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '24px 8px 8px',
              }}>
                {p.caption && <div style={{ fontSize: 12, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>{p.caption}</div>}
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{p.uploaded_by}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lbPhoto && (
        <div
          onClick={() => setLightbox(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
          >
            <X size={28} color="white" />
          </button>

          {/* Nav arrows */}
          {lightbox! > 0 && (
            <button
              onClick={e => { e.stopPropagation(); lbPrev(); }}
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ChevronLeft size={24} color="white" />
            </button>
          )}
          {lightbox! < filtered.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); lbNext(); }}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ChevronRight size={24} color="white" />
            </button>
          )}

          {/* Image */}
          <img
            src={lbPhoto.photo_url}
            alt={lbPhoto.caption || 'Photo'}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', borderRadius: 8 }}
          />

          {/* Info */}
          <div onClick={e => e.stopPropagation()} style={{ textAlign: 'center', marginTop: 16, color: 'white', maxWidth: '90vw' }}>
            {lbPhoto.caption && <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{lbPhoto.caption}</div>}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              📸 {lbPhoto.uploaded_by} · {lbPhoto.day_date} · {tags.find(t => t.value === lbPhoto.tag)?.label || lbPhoto.tag}
            </div>
            <button
              onClick={() => { del(lbPhoto.id); setLightbox(null); }}
              style={{ marginTop: 12, background: 'rgba(255,70,70,0.3)', border: '1px solid rgba(255,70,70,0.5)', borderRadius: 8, padding: '6px 16px', color: '#ff7070', cursor: 'pointer', fontSize: 13 }}
            >
              <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
