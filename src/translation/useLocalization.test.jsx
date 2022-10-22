/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useLocalization from './useLocalization';
import TranslationProvider from './TranslationProvider';

const getWrapper = props => ({ children }) => {
  return <TranslationProvider {...props}>{children}</TranslationProvider>;
};

describe('useLocalization', () => {
  it('returns language, locale and timeZone', () => {
    const wrapper = getWrapper({
      lang: 'fr',
      locale: 'fr-FR',
      timeZone: 'Europe/Paris',
    });

    const { result } = renderHook(() => useLocalization(), { wrapper });

    expect(result.current).toEqual({
      language: 'fr',
      locale: 'fr-FR',
      shortLocale: 'fr',
      timeZone: 'Europe/Paris',
    });
  });
});
