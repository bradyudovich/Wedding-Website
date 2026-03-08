import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfx5AVkAgdBjFCfGELmYfRlCHaAZT67t5P6kQHG2XAjlnyJOw/formResponse';

const ENTRY = {
  name: 'entry.1846776137',
  attending: 'entry.64569225',
  email: 'entry.1699470811',
  dietary: 'entry.93889644',
  notes: 'entry.623154607',
};

const RSVP = () => {
  const { language } = useLanguage();
  const t = (translations[language] || translations['en']).rsvp;

  const [fields, setFields] = useState({
    name: '',
    attending: '',
    email: '',
    dietary: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const next = {};
    if (!fields.name.trim()) next.name = t.nameRequired;
    if (!fields.attending) next.attending = t.attendingRequired;
    if (!fields.email.trim()) next.email = t.emailEmpty;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = t.emailInvalid;
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');

    const body = new URLSearchParams({
      [ENTRY.name]: fields.name,
      [ENTRY.attending]: fields.attending,
      [ENTRY.email]: fields.email,
      [ENTRY.dietary]: fields.dietary,
      [ENTRY.notes]: fields.notes,
    });

    try {
      // Google Forms requires no-cors mode from the browser. This means we cannot
      // read the response status, so we optimistically show success on any network
      // completion and rely on Google's own server-side validation.
      await fetch(FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-wedding-bg py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">💐</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3 font-bodoni">{t.successTitle}</h2>
          <p className="text-gray-600 font-poppins text-lg leading-relaxed">{t.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center font-bodoni">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 font-poppins mb-8 text-lg leading-relaxed">
          {t.intro}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="rsvp-name"
              className="block text-sm font-semibold text-gray-700 mb-1 font-poppins"
            >
              {t.nameLabel} <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="rsvp-name"
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={handleChange}
              placeholder={t.namePlaceholder}
              aria-required="true"
              aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
              className={`w-full border rounded-lg px-4 py-2.5 font-poppins text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p id="rsvp-name-error" role="alert" className="mt-1 text-sm text-red-600 font-poppins">
                {errors.name}
              </p>
            )}
          </div>

          {/* Attending */}
          <div>
            <label
              htmlFor="rsvp-attending"
              className="block text-sm font-semibold text-gray-700 mb-1 font-poppins"
            >
              {t.attendingLabel} <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <select
              id="rsvp-attending"
              name="attending"
              value={fields.attending}
              onChange={handleChange}
              aria-required="true"
              aria-describedby={errors.attending ? 'rsvp-attending-error' : undefined}
              className={`w-full border rounded-lg px-4 py-2.5 font-poppins text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${
                errors.attending ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="" disabled>
                {t.attendingPlaceholder}
              </option>
              <option value="Yes">{t.attendingYes}</option>
              <option value="No">{t.attendingNo}</option>
            </select>
            {errors.attending && (
              <p id="rsvp-attending-error" role="alert" className="mt-1 text-sm text-red-600 font-poppins">
                {errors.attending}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="rsvp-email"
              className="block text-sm font-semibold text-gray-700 mb-1 font-poppins"
            >
              {t.emailLabel} <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="rsvp-email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              placeholder={t.emailPlaceholder}
              aria-required="true"
              aria-describedby={errors.email ? 'rsvp-email-error' : undefined}
              className={`w-full border rounded-lg px-4 py-2.5 font-poppins text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p id="rsvp-email-error" role="alert" className="mt-1 text-sm text-red-600 font-poppins">
                {errors.email}
              </p>
            )}
          </div>

          {/* Dietary restrictions */}
          <div>
            <label
              htmlFor="rsvp-dietary"
              className="block text-sm font-semibold text-gray-700 mb-1 font-poppins"
            >
              {t.dietaryLabel}
            </label>
            <input
              id="rsvp-dietary"
              name="dietary"
              type="text"
              value={fields.dietary}
              onChange={handleChange}
              placeholder={t.dietaryPlaceholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-poppins text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="rsvp-notes"
              className="block text-sm font-semibold text-gray-700 mb-1 font-poppins"
            >
              {t.notesLabel}
            </label>
            <textarea
              id="rsvp-notes"
              name="notes"
              rows={4}
              value={fields.notes}
              onChange={handleChange}
              placeholder={t.notesPlaceholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-poppins text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition resize-y"
            />
          </div>

          {status === 'error' && (
            <p role="alert" className="text-sm text-red-600 font-poppins text-center">
              {t.errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-wedding-accent hover:bg-gray-300 disabled:opacity-60 text-gray-800 font-semibold font-poppins py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            {status === 'submitting' ? t.submitting : t.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RSVP;

