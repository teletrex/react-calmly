/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import ToolbarAction from './ToolbarAction';

describe('ToolbarAction', () => {
  test('it renders', () => {
    const component = mount(<ToolbarAction />);
    expect(component.find(ToolbarAction)).toHaveLength(1);
  });
});