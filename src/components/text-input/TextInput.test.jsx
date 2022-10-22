/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import TextInput from './TextInput';

describe('TextInput', () => {
  test('it renders', () => {
    const component = mount(<TextInput />);
    expect(component.find(TextInput)).toHaveLength(1);
  });
});