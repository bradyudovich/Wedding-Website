import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const FAQ = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t.q1, answer: t.a1 },
    { question: t.q4, answer: t.a4, link: { to: '/schedule#schedule-section', label: language === 'en' ? 'View Schedule →' : 'Ver Programa →' } },
    { question: t.qLongCelebration, answer: t.aLongCelebration },
    { question: t.qKids, answer: t.aKids },
    { question: t.qTransport, answer: t.aTransport, link: { to: '/schedule#schedule-section', label: language === 'en' ? 'View Schedule →' : 'Ver Programa →' } },
    { question: t.qUSCelebration, answer: t.aUSCelebration },
    { question: t.q7, answer: t.a7, link: { to: '/registry#registry-details', label: language === 'en' ? 'View Registry →' : 'Ver Regalos →' } },
  ];

  return (
    <div className="min-h-screen py-10 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-12 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-off-white rounded-2xl shadow-md border border-wedding-accent overflow-hidden">
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
                    <div className="px-6 pb-6">
                      <p className="text-onyx leading-relaxed md:text-justify">
                        {faq.answer}
                      </p>
                      {faq.link && (
                        <Link
                          to={faq.link.to}
                          className="inline-block mt-3 text-sm font-medium text-burnished-copper underline hover:text-burnished-copper-hover font-poppins"
                        >
                          {faq.link.label}
                        </Link>
                      )}
                    </div>
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
