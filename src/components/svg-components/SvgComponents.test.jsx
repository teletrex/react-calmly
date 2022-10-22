/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { ContentSvg, ImageProfileSvg, SvgTitleTag } from '.';

describe('SVG Components', () => {
  describe('ContentSvg', () => {
    test('renders correctly', () => {
      const { container } = render(<ContentSvg />);
      expect(container.firstChild.tagName).toBe('svg');
    });
  });
  describe('ImageProfileSvg', () => {
    test('renders correctly', () => {
      const { container } = render(<ImageProfileSvg />);
      expect(container.firstChild.tagName).toBe('svg');
    });
  });
  describe('SvgTitleTag', () => {
    test('should return provided titleValue', () => {
      const { getByText } = render(<SvgTitleTag titleValue="goodTitleValue" />);

      expect(getByText('goodTitleValue')).toBeInTheDocument();
    });
  });
});
