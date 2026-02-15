import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const FAQ = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;

  const faqs = [
    { question: t.q1, answer: t.a1 },
    { question: t.q2, answer: t.a2 },
    { question: t.q3, answer: t.a3 },
    { question: t.q4, answer: t.a4 },
    { question: t.q5, answer: t.a5 },
    { question: t.q6, answer: t.a6 },
    { question: t.q7, answer: t.a7 },
    { question: t.q8, answer: t.a8 },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-bodoni">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
