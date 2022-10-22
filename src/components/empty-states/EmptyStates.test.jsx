/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import EmptyStates from './EmptyStates';

describe('EmptyStates', () => {
  test('it renders', () => {
    const component = mount(<EmptyStates />);
    expect(component.find(EmptyStates)).toHaveLength(1);
  });
});