/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { useContext } from 'react';
// This file and i18n.js are the only two places allowed to import react-i18next
// All other files should use src/components/translation instead
// eslint-disable-next-line no-restricted-imports

import { useTranslation as defaultUseTranslation } from 'react-i18next';

import TranslationContext from './TranslationContext';

export default (namespace, options) => {
  const { namespace: contextNamespace, ...contextOptions } = useContext(TranslationContext);
  return defaultUseTranslation(namespace || contextNamespace, {
    ...contextOptions,
    ...options,
  });
};
