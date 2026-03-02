import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const POPUP_KEY = 'languagePopupShown';

const LanguagePopup = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(POPUP_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(POPUP_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 font-bodoni">
          {t.schedule.languagePopupTitle}
        </h2>
        <p className="text-gray-700 font-poppins leading-relaxed mb-6">
          {t.schedule.languagePopupText}
        </p>
        <button
          onClick={handleClose}
          className="w-full bg-wedding-accent hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors font-poppins"
        >
          {t.schedule.languagePopupClose}
        </button>
      </div>
    </div>
  );
};

export default LanguagePopup;
