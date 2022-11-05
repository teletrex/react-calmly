/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import Legend from './Legend';

jest.mock('../../../badge/BadgeIcon', () => ({
  GenericStatusIconShape: 'svg',
}));

const items = [
  {
    className: '__icon-line',
    value: 'some legend text',
  },
  {
    className: '__icon-alert',
    value: 'other legend text',
  },
];

describe('MultiChart Legend', () => {
  test('component renders', () => {
    const { container } = render(<Legend items={items} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders null if items is empty', () => {
    const { container } = render(<Legend />);

    expect(container.firstChild).toBe(null);
  });
});
