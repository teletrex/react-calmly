/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';

import { mockScroll } from '../utils/test-helpers/html-element-mocks';

import { ScrollContainer, ScrollContainerScrollTypes } from '.';

describe('ScrollContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('has no tabIndex if has no scroll', () => {
    mockScroll({ horizontal: false, vertical: false });

    const { getByTestId } = render(
      <ScrollContainer
        horizontalScrollType={ScrollContainerScrollTypes.auto}
        verticalScrollType={ScrollContainerScrollTypes.auto}
      />
    );
    expect(getByTestId('scroll-container').getAttribute('tabIndex')).toBe(null);
  });

  it('has no tabIndex if has vertical scroll', () => {
    mockScroll({ horizontal: false, vertical: true });

    const { getByTestId } = render(
      <ScrollContainer
        horizontalScrollType={ScrollContainerScrollTypes.auto}
        verticalScrollType={ScrollContainerScrollTypes.auto}
      />
    );
    expect(getByTestId('scroll-container').getAttribute('tabIndex')).toBe('0');
  });
  it('has no tabIndex if has horizontal scroll', () => {
    mockScroll({ horizontal: true, vertical: false });

    const { getByTestId } = render(
      <ScrollContainer
        horizontalScrollType={ScrollContainerScrollTypes.auto}
        verticalScrollType={ScrollContainerScrollTypes.auto}
      />
    );
    expect(getByTestId('scroll-container').getAttribute('tabIndex')).toBe('0');
  });
  it('has no tabIndex if has scroll', () => {
    mockScroll({ horizontal: true, vertical: true });

    const { getByTestId } = render(
      <ScrollContainer
        horizontalScrollType={ScrollContainerScrollTypes.auto}
        verticalScrollType={ScrollContainerScrollTypes.auto}
      />
    );
    expect(getByTestId('scroll-container').getAttribute('tabIndex')).toBe('0');
  });
});
