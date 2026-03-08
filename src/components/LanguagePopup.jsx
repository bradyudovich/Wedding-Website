import React, { useState } from 'react';
import { translations } from '../translations';

const LanguagePopup = () => {
  const en = translations.en.schedule;
  const es = translations.es.schedule;
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="grid grid-cols-2 divide-x divide-gray-200 gap-0 mb-6">
          {/* English */}
          <div className="pr-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-bodoni">
              {en.languagePopupTitle}
            </h2>
            <p className="text-gray-700 font-poppins leading-relaxed text-sm">
              {en.languagePopupText}
            </p>
          </div>
          {/* Spanish */}
          <div className="pl-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-bodoni">
              {es.languagePopupTitle}
            </h2>
            <p className="text-gray-700 font-poppins leading-relaxed text-sm">
              {es.languagePopupText}
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="w-full bg-wedding-accent hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors font-poppins"
        >
          {en.languagePopupClose} / {es.languagePopupClose}
        </button>
      </div>
    </div>
  );
};

export default LanguagePopup;
