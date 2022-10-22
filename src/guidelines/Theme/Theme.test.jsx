/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount, shallow } from 'enzyme';

import Theme from './Theme';

const props = {
  red: {
    colorVariable: 'red-color',
    colorCode: '#FF0000',
  },
};

describe('Theme', () => {
  test('should create theme', () => {
    const wrapper = mount(<Theme {...props.red} />);
    expect(wrapper.find(Theme)).toHaveLength(1);
  });
  test('should show red color variable', () => {
    const wrapper = shallow(<Theme {...props.red} />);
    expect(wrapper.text().includes('red-color')).toBe(true);
  });
  test('should show red color code', () => {
    const wrapper = shallow(<Theme {...props.red} />);
    expect(wrapper.text().includes('#FF0000')).toBe(true);
  });
});
