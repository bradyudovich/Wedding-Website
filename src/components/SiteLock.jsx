import React, { useState, useEffect } from 'react';
import { useSiteLock } from '../context/SiteLockContext';

const PASSWORD = '2027';

const SiteLock = () => {
  const { unlocked, unlock, lock } = useSiteLock();
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Prevent body scroll and viewport-shift reveals while locked
  useEffect(() => {
    document.body.style.overflow = unlocked ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [unlocked]);

  const handleUnlock = () => {
    if (password === PASSWORD) {
      unlock();
      setShowPrompt(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    lock();
  };

  const handlePromptKeyDown = (e) => {
    if (e.key === 'Enter') handleUnlock();
    if (e.key === 'Escape') {
      setShowPrompt(false);
      setPassword('');
      setError(false);
    }
  };

  return (
    <>
      {/* Lock overlay – always kept in the DOM; transitions opacity so there is
          no abrupt flash when unlocking on mobile. The main content is kept
          invisible (via SiteLockContext + App.jsx) until unlock is confirmed,
          ensuring nothing is ever visible behind this overlay. */}
      <div
        className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center transition-opacity duration-150 ${
          unlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site locked"
        aria-hidden={unlocked}
      >
        <div className="flex items-center justify-center w-full h-full p-4">
          <img
            src={`${import.meta.env.BASE_URL}save-the-date.jpg`}
            alt="Save the Date"
            className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
            style={{ maxHeight: '90vh' }}
          />
        </div>

        {/* Use absolute (not fixed) so the prompt stays inside the overlay's
            stacking context and cannot appear outside the lock screen */}
        <div className="absolute bottom-4 left-4">
          {!showPrompt ? (
            <button
              onClick={() => setShowPrompt(true)}
              className="text-[9px] text-black/[0.075] hover:text-black/[0.15] transition-colors"
              aria-label="Open unlock prompt"
            >
              unlock
            </button>
          ) : (
            <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-2 flex flex-col gap-1 w-36">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                onKeyDown={handlePromptKeyDown}
                placeholder="Enter password"
                autoFocus
                className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-wedding-accent"
              />
              {error && (
                <p className="text-red-500 text-[10px]">Incorrect password</p>
              )}
              <div className="flex gap-1">
                <button
                  onClick={handleUnlock}
                  className="flex-1 bg-wedding-accent hover:bg-gray-300 text-gray-800 text-[10px] py-0.5 px-2 rounded transition-colors"
                >
                  Unlock
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    setPassword('');
                    setError(false);
                  }}
                  className="text-gray-400 hover:text-gray-700 text-[10px] py-0.5 px-1 transition-colors"
                  aria-label="Cancel"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Re-lock button – only visible once the site is unlocked */}
      {unlocked && (
        <div className="fixed bottom-4 left-4 z-[200]">
          <button
            onClick={handleLock}
            className="text-xs text-gray-400 hover:text-gray-600 opacity-10 hover:opacity-25 transition-opacity"
            aria-label="Re-lock site"
          >
            Lock
          </button>
        </div>
      )}
    </>
  );
};

export default SiteLock;
