/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { DomElement } from '../../utils/DomUtils';

import WidgetTitle from './WidgetTitle';

jest.mock('../../utils/DomUtils', () => ({
  DomElement: jest.fn(() => ({
    isTruncatedHorizontal: () => false,
  })),
}));

const mockTruncated = value => {
  DomElement.mockImplementation(() => ({
    isTruncatedHorizontal: () => value,
  }));
};

describe('WidgetTitle', () => {
  beforeEach(() => mockTruncated(false));

  it('Does not have title by default', () => {
    const { queryByTitle } = render(<WidgetTitle title="the title" />);
    expect(queryByTitle('the title')).toBeNull();
  });
  describe('on mouseOver', () => {
    it('Does not have title attribute when not truncated', () => {
      const { getByText, queryByTitle } = render(<WidgetTitle title="the title" />);

      fireEvent.mouseOver(getByText('the title'));

      expect(queryByTitle('the title')).toBeNull();
    });
    it('Does have title attribute when truncated', () => {
      mockTruncated(true);
      const { getByText, getByTitle } = render(<WidgetTitle title="the title" />);

      fireEvent.mouseOver(getByText('the title'));

      expect(getByTitle('the title')).toBeInTheDocument();
    });
  });
});
