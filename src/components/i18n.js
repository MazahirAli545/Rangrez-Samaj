import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import LanguageDetector from 'i18next-react-native-language-detector';

import en from '../Language/EN_Translation.json';
import hi from '../Language/Hi_Translation.json';

i18n
  //   .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      hi: {translation: hi},
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
