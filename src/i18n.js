/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import i18n from 'i18next';
// This file and translation/useTranslation.js are the only two places allowed to import react-i18next
// All other files should use src/components/translation instead
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next';

import en from './resources/translation/en.json';
import fr from './resources/translation/fr.json';
import de from './resources/translation/de.json';
import es from './resources/translation/es.json';
import it from './resources/translation/it.json';
import ja from './resources/translation/ja.json';
import ko from './resources/translation/ko.json';
import ptBR from './resources/translation/pt_BR.json';

export const translationResources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
  pt_BR: {
    translation: ptBR,
  },
};

/**
 * Applies necessary plugins to given instance
 * @deprecated Use TranslationProvider to configure translations
 */
export const configureI18Next = (i18NextInstance = i18n) => {
  return i18NextInstance.use(initReactI18next);
};

/**
 * Applies necessary plugins and resources to given instance for use with react-calmly and initializes it with default configuration.
 * @deprecated Use TranslationProvider to configure translations for react-calmly
 */
export const initI18Next = (options = {}, i18NextInstance = i18n, callback) => {
  return configureI18Next(i18NextInstance).init(
    {
      resources: translationResources,
      lng: 'en',
      keySeparator: false,
      nsSeparator: false,
      interpolation: {
        escapeValue: false,
      },
      ...options,
    },
    callback
  );
};
