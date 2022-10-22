/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



// import { createTranslationHook } from '@react-calmly/shell-ui'; TODO

import enTranslation from './resources/translation/en.json';
import frTranslation from './resources/translation/fr.json';
import srTranslation from './resources/translation/sr_BA.json';

// always use `createTranslationHook` to create i18n instance for your module/application
// it is hooked to user's settings, so you don't have to handle language change on your own
const { i18n, useTranslation } = createTranslationHook();

// configure your i18n instance accordingly to your needs
// for all options read: https://www.i18next.com/overview/configuration-options
// no need to use `react-i18next` plugin, it's already handled, just use `useTranslation` from this file
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  // add your translations here or if you need, you can load resources from backend,
  // ie. by using https://github.com/i18next/i18next-http-backend plugin
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
    sr: {
      translation: srTranslation,
    }
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default useTranslation;
