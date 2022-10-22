/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';

import withLocalization from './withLocalization';
import TranslationProvider from './TranslationProvider';

const TestComponent = ({ language, locale, timeZone }) => {
  return (
    <>
      <span>{language}</span>
      <span>{locale}</span>
      <span>{timeZone}</span>
    </>
  );
};

const TestComponentWithLocalization = withLocalization()(TestComponent);

describe('withLocalization', () => {
  it('injects language, locale and timeZone into component', () => {
    const { getByText } = render(
      <TranslationProvider lang="fr" locale="fr-FR" timeZone="Europe/Paris">
        <TestComponentWithLocalization />
      </TranslationProvider>
    );

    expect(getByText('fr')).toBeInTheDocument();
    expect(getByText('fr-FR')).toBeInTheDocument();
    expect(getByText('Europe/Paris')).toBeInTheDocument();
  });
});
