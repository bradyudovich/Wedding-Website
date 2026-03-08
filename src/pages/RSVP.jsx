import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

// ─── Google Form URLs by language ────────────────────────────────────────────
// To add a new language form:
//   1. Create (or obtain) the Google Form in the target language.
//   2. In Google Forms, click Send → Embed (< >) and copy the src URL.
//   3. Add an entry below using the BCP-47 language code as the key, e.g.:
//      es: 'https://docs.google.com/forms/d/e/SPANISH_FORM_ID/viewform?embedded=true',
//   4. Add the matching `formUnavailable` translation string in translations.js
//      for every language that does NOT yet have a form URL.
const FORM_URLS = {
  en: 'https://docs.google.com/forms/d/e/1FAIpQLSfx5AVkAgdBjFCfGELmYfRlCHaAZT67t5P6kQHG2XAjlnyJOw/viewform?embedded=true',
  // es: 'https://docs.google.com/forms/d/e/SPANISH_FORM_ID/viewform?embedded=true',
  // Add additional language entries here following the same pattern.
};

// Minimum height for the embedded form iframe in pixels.
// Increase this value if the form is taller than the default Google Forms height.
const IFRAME_MIN_HEIGHT = 740;

const RSVP = () => {
  const { language } = useLanguage();
  const t = (translations[language] || translations['en']).rsvp;

  // Resolve the form URL for the current language (undefined if not configured).
  const formUrl = FORM_URLS[language];

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center font-bodoni">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 font-poppins mb-8 text-lg leading-relaxed">
          {t.intro}
        </p>

        {/* Render the embedded Google Form only when a URL is configured for
            the active language. For languages without a dedicated form, a
            friendly message is shown instead (see FORM_URLS above to add one). */}
        {formUrl ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src={formUrl}
              title={t.title}
              width="100%"
              style={{ minHeight: `${IFRAME_MIN_HEIGHT}px`, border: 'none', display: 'block' }}
              loading="lazy"
            >
              {/* Fallback text for browsers that do not support iframes */}
              {t.iframeFallback}
            </iframe>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <p className="text-gray-600 font-poppins text-lg leading-relaxed">
              {t.formUnavailable}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVP;

