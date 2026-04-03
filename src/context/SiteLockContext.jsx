import React, { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'siteUnlocked';

const SiteLockContext = createContext({ unlocked: false, unlock: () => {}, lock: () => {} });

export const useSiteLock = () => useContext(SiteLockContext);

export const SiteLockProvider = ({ children }) => {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const unlock = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setUnlocked(true);
  };

  const lock = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setUnlocked(false);
  };

  return (
    <SiteLockContext.Provider value={{ unlocked, unlock, lock }}>
      {children}
    </SiteLockContext.Provider>
  );
};
