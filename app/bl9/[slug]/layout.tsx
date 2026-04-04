import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BL9 Event Booklet',
  description: 'BL9 Golf League event booklet',
};

export default function BL9Layout({ children }: { children: React.ReactNode }) {
  return <div className="font-serif antialiased">{children}</div>;
}
