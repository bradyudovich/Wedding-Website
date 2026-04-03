import React, { useState } from 'react';

const STORAGE_KEY = 'siteUnlocked';
const PASSWORD = '2027';

const SiteLock = () => {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (password === PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
      setUnlocked(true);
      setShowPrompt(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setUnlocked(false);
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
      {/* Lock overlay – always kept in the DOM so no site content ever flashes
          through during React re-renders; hidden via display:none when unlocked */}
      <div
        className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center${unlocked ? ' hidden' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site locked"
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
              className="text-xs text-black/30 hover:text-black/60 transition-colors"
              aria-label="Open unlock prompt"
            >
              unlock
            </button>
          ) : (
            <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 flex flex-col gap-2 w-56">
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
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-wedding-accent"
              />
              {error && (
                <p className="text-red-500 text-xs">Incorrect password</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleUnlock}
                  className="flex-1 bg-wedding-accent hover:bg-gray-300 text-gray-800 text-sm py-1 px-3 rounded transition-colors"
                >
                  Unlock
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    setPassword('');
                    setError(false);
                  }}
                  className="text-gray-400 hover:text-gray-700 text-sm py-1 px-2 transition-colors"
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
            className="text-xs text-gray-400 hover:text-gray-600 opacity-40 hover:opacity-100 transition-opacity"
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
