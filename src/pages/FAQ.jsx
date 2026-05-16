import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const FAQ = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t.q1, answer: t.a1 },
    { question: t.q4, answer: t.a4 },
    { question: t.qKids, answer: t.aKids },
    { question: t.qTransport, answer: t.aTransport },
    { question: t.q7, answer: t.a7 },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-12 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-off-white rounded-lg shadow-md overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <h3 className="text-xl font-semibold text-onyx font-bodoni">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-burnished-copper transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <p className="px-6 pb-6 text-onyx leading-relaxed md:text-justify">
                      {faq.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
