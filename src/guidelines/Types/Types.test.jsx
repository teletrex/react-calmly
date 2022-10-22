/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';

import Types from './Types';

const props = {
  variable: '$code-01',
  body: 'This is for inline code snippets and smaller code elements',
  textStyle: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '.32px',
  },
};

describe('Types', () => {
  test('should create types', () => {
    const wrapper = mount(<Types {...props} />);
    expect(wrapper.find(Types)).toHaveLength(1);
  });
  test('should show body text', () => {
    const wrapper = mount(<Types {...props} />);
    expect(
      wrapper
        .find('p')
        .text()
        .includes('This is for inline code snippets and smaller code elements')
    ).toBe(true);
  });
  test('should show variable name', () => {
    const wrapper = mount(<Types {...props} />);
    expect(
      wrapper
        .find('span')
        .text()
        .includes('$code-01')
    ).toBe(true);
  });
});
