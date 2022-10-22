/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';
import i18n from 'i18next';

import { translationResources } from '../../i18n';

import useTranslation from './useTranslation';
import TranslationProvider from './TranslationProvider';

const TestComponent = ({ name }) => {
  const { t } = useTranslation();
  return <span>{t('hello {{name}}', { name })}</span>;
};

const TestComponentReal = () => {
  const { t } = useTranslation();
  return <span>{t('Cancel')}</span>;
};

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

describe('TranslationProvider', () => {
  it('Provides the i18next instance used by useTranslation', () => {
    const { getByText } = render(
      <TranslationProvider resources={resources}>
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('Sets language', () => {
    const { getByText } = render(
      <TranslationProvider lang="fr" resources={resources}>
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('Bonjour World')).toBeInTheDocument();
  });

  it('Sets namespace', () => {
    const { getByText } = render(
      <TranslationProvider namespace="otherNs" resources={resources}>
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('other - Hello World')).toBeInTheDocument();
  });

  it('Reacts to language change', () => {
    const { getByText, rerender } = render(
      <TranslationProvider resources={resources}>
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('Hello World')).toBeInTheDocument();

    rerender(
      <TranslationProvider lang="fr" resources={resources}>
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('Bonjour World')).toBeInTheDocument();
  });

  it('inherits language from parent provider', () => {
    const customResources = {
      fr: {
        translation: {
          'hello {{name}}': 'Alternative {{ name }}',
        },
      },
    };

    const { getByText } = render(
      <TranslationProvider lang="fr" resources={resources}>
        <TestComponent name="World" />
        <TranslationProvider resources={customResources}>
          <TestComponent name="World" />
        </TranslationProvider>
      </TranslationProvider>
    );

    expect(getByText('Bonjour World')).toBeInTheDocument();
    expect(getByText('Alternative World')).toBeInTheDocument();
  });

  it('can have nested different namespace', () => {
    const { getByText } = render(
      <TranslationProvider lang="fr" resources={resources}>
        <TestComponent name="World" />
        <TranslationProvider namespace="otherNs" resources={resources}>
          <TestComponent name="World" />
        </TranslationProvider>
      </TranslationProvider>
    );

    expect(getByText('Bonjour World')).toBeInTheDocument();
    expect(getByText('other - Bonjour World')).toBeInTheDocument();
  });

  it('Accepts custom i18n translation', () => {
    const i18nInstance = i18n.createInstance();
    i18nInstance.init({
      resources: {
        en: {
          translation: {
            'hello {{name}}': 'Custom Instance {{ name }}',
          },
        },
      },
      lng: 'en',
    });

    const { getByText } = render(
      <TranslationProvider i18n={i18nInstance} lang="en">
        <TestComponent name="World" />
      </TranslationProvider>
    );

    expect(getByText('Custom Instance World')).toBeInTheDocument();
  });
});

describe('Real translation resources', () => {
  test.each([
    [undefined, 'Cancel'],
    ['en', 'Cancel'],
    ['de', 'Abbrechen'],
    ['es', 'Cancelar'],
    ['it', 'Annulla'],
    ['fr', 'Annuler'],
    ['ja', 'キャンセル'],
    ['ko', '취소'],
    ['pt_BR', 'Cancelar'],
  ])('Correctly translates using "%s" lang key', (key, result) => {
    const { getByText } = render(
      <TranslationProvider lang={key} resources={translationResources}>
        <TestComponentReal />
      </TranslationProvider>
    );

    expect(getByText(result)).toBeInTheDocument();
  });
});
