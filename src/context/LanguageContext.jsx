import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default language is 'bn' (Bangla) as explicitly requested by user
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('brslsl_lang') || 'bn';
    } catch {
      return 'bn';
    }
  });

  const setLanguage = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('brslsl_lang', newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      console.warn('Could not persist language:', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(lang === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Translation helper: looks up by key, supports nested keys like 'nav.home'
  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const dict = translations[lang] || translations.bn;
    const parts = key.split('.');
    let curr = dict;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && p in curr) {
        curr = curr[p];
      } else {
        // Fallback to Bangla or English or provided fallback
        const altDict = translations[lang === 'bn' ? 'en' : 'bn'];
        let altCurr = altDict;
        for (const ap of parts) {
          if (altCurr && typeof altCurr === 'object' && ap in altCurr) {
            altCurr = altCurr[ap];
          } else {
            altCurr = undefined;
            break;
          }
        }
        return altCurr !== undefined ? altCurr : fallback || key;
      }
    }
    return curr !== undefined ? curr : fallback || key;
  };

  const isBn = lang === 'bn';

  return (
    <LanguageContext.Provider value={{ lang, isBn, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}