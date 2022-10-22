/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import moment from 'moment-timezone';

import TranslationContext from './TranslationContext';
import { FALLBACK_LOCALE } from './moment';

const createInstance = (lng, resources, options) => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    resources,
    lng,
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
    ...options,
  });
  return i18nInstance;
};

const TranslationProvider = ({
  lang,
  locale,
  timeZone,
  i18n,
  namespace,
  children,
  resources,
  ...options
}) => {
  const {
    lang: contextLang,
    locale: contextLocale,
    timeZone: contextTimeZone,
    namespace: contextNamespace,
  } = useContext(TranslationContext);

  const langOrContext = lang || contextLang;
  const localeOrContext = locale || contextLocale;
  const timeZoneOrContext = timeZone || contextTimeZone;
  const namespaceOrContext = namespace || contextNamespace;

  const i18nInstance = useRef(i18n || createInstance(langOrContext, resources, options));

  useEffect(() => {
    if (i18nInstance.current.language !== lang) {
      i18nInstance.current.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    moment.locale([localeOrContext, FALLBACK_LOCALE]);
  }, [localeOrContext]);

  return (
    <TranslationContext.Provider
      value={{
        i18n: i18nInstance.current,
        lang: langOrContext,
        locale: localeOrContext,
        timeZone: timeZoneOrContext,
        namespace: namespaceOrContext,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  // eslint-disable-next-line react/require-default-props
  i18n: PropTypes.shape({}),
  // eslint-disable-next-line react/require-default-props
  lang: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  locale: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  namespace: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  // eslint-disable-next-line react/require-default-props
  resources: (props, propName, componentName) => {
    if (props.i18n && props[propName]) {
      throw new Error(
        `${componentName} does not support i18n and resources. Either give an i18n instance and manage resources yourself, or give only the resources.`
      );
    }
  },
  // eslint-disable-next-line react/require-default-props
  timeZone: PropTypes.string,
};

export default TranslationProvider;
