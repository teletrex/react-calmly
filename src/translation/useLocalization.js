/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { useContext } from 'react';

import TranslationContext from './TranslationContext';

export default () => {
  const { lang: language, locale, timeZone } = useContext(TranslationContext);
  const shortLocale = locale.slice(0, 2);
  return {
    language,
    locale,
    timeZone,
    shortLocale,
  };
};
