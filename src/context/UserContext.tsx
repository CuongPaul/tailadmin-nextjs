'use client';

import React, { createContext, useState } from 'react';

import { User } from '@/types';

interface AppContextType {
  user: null | User;
  setUser: (value: null | User) => void;
}

export const UserContext = createContext<AppContextType>({
  user: null,
  setUser: () => null
});

interface Props {
  children: React.ReactNode;
}

export default function UserContextProvider({ children }: Readonly<Props>) {
  const [user, setUser] = useState<null | User>(null);

  return <UserContext.Provider value={{
    user,
    setUser
  }}>{children}</UserContext.Provider>;
}
