import React, { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'siteUnlocked';

const SiteLockContext = createContext({ unlocked: false, unlock: () => {}, lock: () => {} });

export const useSiteLock = () => useContext(SiteLockContext);

export const SiteLockProvider = ({ children }) => {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const unlock = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setUnlocked(true);
  };

  const lock = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    setUnlocked(false);
  };

  return (
    <SiteLockContext.Provider value={{ unlocked, unlock, lock }}>
      {children}
    </SiteLockContext.Provider>
  );
};
