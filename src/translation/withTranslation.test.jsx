/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';
import i18n from 'i18next';

import withTranslation from './withTranslation';
import TranslationProvider from './TranslationProvider';

const TestComponent = withTranslation()(({ name, t }) => {
  return <span>{t('hello {{name}}', { name })}</span>;
});

const resources = {
  en: {
    translation: {
      'hello {{name}}': 'Hello {{ name }}',
    },
    otherNs: {
      'hello {{name}}': 'other - Hello {{ name }}',
    },
  },
  fr: {
    translation: {
      'hello {{name}}': 'Bonjour {{ name }}',
    },
    otherNs: {
      'hello {{name}}': 'other - Bonjour {{ name }}',
    },
  },
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

  it('uses TranslationProvider', () => {
    const { getByText } = render(
      <TranslationProvider lang="fr" resources={resources}>
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('Bonjour World')).toBeInTheDocument();
  });
});
