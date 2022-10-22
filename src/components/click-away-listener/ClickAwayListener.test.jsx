/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import ClickAwayListener from './ClickAwayListener';

describe('ClickAwayListener', () => {
  test('it renders', () => {
    const component = mount(<ClickAwayListener />);
    expect(component.find(ClickAwayListener)).toHaveLength(1);
  });
});