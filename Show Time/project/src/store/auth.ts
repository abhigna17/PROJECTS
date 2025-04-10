import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  fullName: string;
  email: string;
  pin: string;
}

interface AuthState {
  user: User | null;
  bookingHistory: any[];
  login: (user: User) => void;
  logout: () => void;
  addBooking: (booking: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      bookingHistory: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addBooking: (booking) => set((state) => ({
        bookingHistory: [...state.bookingHistory, booking]
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);