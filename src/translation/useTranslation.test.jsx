/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';
import i18n from 'i18next';

import useTranslation from './useTranslation';

const TestComponent = ({ name }) => {
  const { t } = useTranslation();

  return <span>{t('hello {{name}}', { name })}</span>;
};

describe('useTranslation', () => {
  it('works without TranslationProvider using global i18n instance', () => {
    i18n.init({
      resources: {
        en: {
          translation: {
            'hello {{name}}': 'Global Instance {{ name }}',
          },
        },
      },
      lng: 'en',
    });
    const { getByText } = render(<TestComponent name="World" />);

    expect(getByText('Global Instance World')).toBeInTheDocument();
  });
});
