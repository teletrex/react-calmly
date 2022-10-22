/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import Text from './Text';

describe('Text', () => {
  test('it renders', () => {
    const component = mount(<Text />);
    expect(component.find(Text)).toHaveLength(1);
  });
});