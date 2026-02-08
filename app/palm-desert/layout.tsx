'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarDays, Users, ShoppingCart, DollarSign, CloudSun, UtensilsCrossed, Camera } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { TripUserProvider, useTripUser } from '../../lib/user-context';
import CouplePicker from './components/couple-picker';
import '../palm-desert.css';

const navItems = [
  { href: '/palm-desert', label: 'Home', icon: LayoutDashboard },
  { href: '/palm-desert/activities', label: 'Schedule', icon: CalendarDays },
  { href: '/palm-desert/group', label: 'Group', icon: Users },
  { href: '/palm-desert/grocery', label: 'Grocery', icon: ShoppingCart },
  { href: '/palm-desert/expenses', label: 'Expenses', icon: DollarSign },
  { href: '/palm-desert/dinners', label: 'Dinners', icon: UtensilsCrossed },
  { href: '/palm-desert/photos', label: 'Photos', icon: Camera },
  { href: '/palm-desert/weather', label: 'Weather', icon: CloudSun },
];

function AuthHeader() {
  const { tripUser } = useTripUser();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="pd-btn pd-btn-secondary" style={{ fontSize: 13, padding: '6px 12px' }}>
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {tripUser && (
          <span style={{ fontSize: 13, color: 'var(--pd-text2)', marginRight: 4 }}>
            {tripUser.name}
          </span>
        )}
        <UserButton afterSignOutUrl="/palm-desert" />
      </SignedIn>
    </div>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { needsCoupleSelection, loading } = useTripUser();

  if (needsCoupleSelection && !loading) {
    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <title>Palm Desert Getaway 🌴</title>
        </head>
        <body className="pd-body">
          <main className="pd-main">
            <div className="pd-content">
              <CouplePicker />
            </div>
          </main>
        </body>
      </html>
    );
  }

  return <LayoutInner>{children}</LayoutInner>;
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/palm-desert' ? pathname === '/palm-desert' : pathname?.startsWith(href);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>Palm Desert Getaway 🌴</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌴</text></svg>" />
      </head>
      <body className="pd-body">
        {/* Desktop sidebar */}
        <nav className="pd-sidebar">
          <div className="pd-sidebar-header">
            <span className="pd-palm">🌴</span>
            <div>
              <div className="pd-sidebar-title">Palm Desert</div>
              <div className="pd-sidebar-sub">Feb 8-12, 2026</div>
            </div>
          </div>
          <div style={{ padding: '0 16px 12px' }}>
            <AuthHeader />
          </div>
          <div className="pd-sidebar-nav">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`pd-sidebar-link ${isActive(href) ? 'active' : ''}`}>
                <Icon size={20} />
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="pd-main">
          {/* Mobile header with auth */}
          <div className="pd-mobile-header">
            <span style={{ fontSize: 20 }}>🌴</span>
            <AuthHeader />
          </div>
          <div className="pd-content">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="pd-bottom-nav">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`pd-bottom-link ${isActive(href) ? 'active' : ''}`}>
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </body>
    </html>
  );
}

export default function PalmDesertLayout({ children }: { children: React.ReactNode }) {
  return (
    <TripUserProvider>
      <LayoutContent>{children}</LayoutContent>
    </TripUserProvider>
  );
}
