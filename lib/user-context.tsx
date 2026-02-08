'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

interface TripUser {
  id: number;
  clerk_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  couple_id: number | null;
  trip_id: number | null;
  role: string;
}

interface UserContextType {
  tripUser: TripUser | null;
  loading: boolean;
  needsCoupleSelection: boolean;
  selectCouple: (coupleId: number) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  tripUser: null,
  loading: true,
  needsCoupleSelection: false,
  selectCouple: async () => {},
});

export function useTripUser() {
  return useContext(UserContext);
}

export function TripUserProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const [tripUser, setTripUser] = useState<TripUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsCoupleSelection, setNeedsCoupleSelection] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setTripUser(null);
      setLoading(false);
      return;
    }

    // Try to link/fetch user
    fetch('/api/palm-desert/auth/link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || null,
        phone: user.primaryPhoneNumber?.phoneNumber || null,
        name: user.fullName || user.firstName || 'Unknown',
        avatarUrl: user.imageUrl || null,
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.needsCoupleSelection) {
          setNeedsCoupleSelection(true);
          setTripUser(data.user);
        } else {
          setTripUser(data.user);
          setNeedsCoupleSelection(false);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, isLoaded]);

  const selectCouple = async (coupleId: number) => {
    if (!user) return;
    const res = await fetch('/api/palm-desert/auth/link', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clerkId: user.id, coupleId }),
    });
    const data = await res.json();
    setTripUser(data.user);
    setNeedsCoupleSelection(false);
  };

  return (
    <UserContext.Provider value={{ tripUser, loading, needsCoupleSelection, selectCouple }}>
      {children}
    </UserContext.Provider>
  );
}
