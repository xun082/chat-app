import { create } from 'zustand';

import { UserResponseTypes } from '@/services';

interface UserState {
  user: UserResponseTypes;
  setUser: (user: UserResponseTypes) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as UserResponseTypes,
  setUser: (user) => set({ user }),
}));
