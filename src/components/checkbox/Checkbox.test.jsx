/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('it renders', () => {
    const component = mount(<Checkbox />);
    expect(component.find(Checkbox)).toHaveLength(1);
  });
});
