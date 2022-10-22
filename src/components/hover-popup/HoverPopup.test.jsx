/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import HoverPopup from './HoverPopup';

describe('HoverPopup', () => {
  test('it renders', () => {
    const component = mount(<HoverPopup />);
    expect(component.find(HoverPopup)).toHaveLength(1);
  });
});