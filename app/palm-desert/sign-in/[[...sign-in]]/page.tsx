'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      padding: 24,
    }}>
      <SignIn
        afterSignInUrl="/palm-desert"
        afterSignUpUrl="/palm-desert"
        appearance={{
          elements: {
            rootBox: { width: '100%', maxWidth: 420 },
            card: {
              background: 'var(--pd-surface)',
              border: '1px solid var(--pd-border)',
              borderRadius: 16,
            },
          },
        }}
      />
    </div>
  );
}
