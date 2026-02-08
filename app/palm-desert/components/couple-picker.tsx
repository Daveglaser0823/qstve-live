'use client';

import { useEffect, useState } from 'react';
import { useTripUser } from '../../../lib/user-context';
import { Users } from 'lucide-react';

export default function CouplePicker() {
  const { selectCouple } = useTripUser();
  const [couples, setCouples] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/palm-desert/trip')
      .then(r => r.json())
      .then(d => setCouples(d.couples || []));
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <div className="pd-card" style={{ textAlign: 'center' }}>
        <Users size={48} color="var(--pd-gold)" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Which couple are you?</h2>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginBottom: 24 }}>
          Select your couple to link your account
        </p>
        <div className="pd-space-y-sm">
          {couples.map((c: any) => (
            <button
              key={c.id}
              onClick={() => selectCouple(c.id)}
              className="pd-card pd-card-hover"
              style={{
                width: '100%',
                padding: 16,
                cursor: 'pointer',
                border: '1px solid var(--pd-border)',
                background: 'var(--pd-surface2)',
                borderRadius: 12,
                textAlign: 'left',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--pd-text)',
              }}
            >
              {c.person1} & {c.person2}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
