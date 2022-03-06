import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en_US from './locales/en-US';
import global from './locales/global';

class MyLanguageDetector extends LanguageDetector {
  detect(detectionOrder) {
    super.detect(detectionOrder); // normally take this value and determine the language from that
    return 'en-US'; // but always use en-US for now
  }
}

i18next
  .use(MyLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'global',
    resources: {
      'en-US': en_US,
      global,
    },

    nonExplicitSupportedLngs: true,
    skipOnVariables: false,
    interpolation: { escapeValue: false },
  });
