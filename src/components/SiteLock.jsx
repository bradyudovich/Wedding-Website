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

  if (unlocked) {
    return (
      <div className="fixed bottom-4 left-4 z-[200]">
        <button
          onClick={handleLock}
          className="text-xs text-gray-400 hover:text-gray-600 opacity-40 hover:opacity-100 transition-opacity"
          aria-label="Re-lock site"
        >
          Lock
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Site locked"
    >
      <div className="flex items-center justify-center w-full min-h-full p-4">
        <img
          src={`${import.meta.env.BASE_URL}save-the-date.jpg`}
          alt="Save the Date"
          className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
          style={{ maxHeight: '90vh' }}
        />
      </div>

      <div className="fixed bottom-4 left-4">
        {!showPrompt ? (
          <button
            onClick={() => setShowPrompt(true)}
            className="text-xs text-white/30 hover:text-white/70 transition-colors"
            aria-label="Open unlock prompt"
          >
            unlock
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col gap-2 w-56">
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
  );
};

export default SiteLock;
