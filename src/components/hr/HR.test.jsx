/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import  settings from '../../settings';

import HR from '.';

const { prefix } = settings;

describe('HR', () => {
  test('verify if class applied correctly', () => {
    const wrapper = mount(<HR />);
    expect(wrapper.find('div').hasClass(`${prefix}--hr`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<HR className="new_class" />);
    expect(wrapper.find('div').hasClass(`new_class`)).toBeTruthy();
  });
});
