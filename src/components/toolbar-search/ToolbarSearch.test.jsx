/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import ToolbarSearch from './ToolbarSearch';

describe('ToolbarSearch', () => {
  test('it renders', () => {
    const component = mount(<ToolbarSearch />);
    expect(component.find(ToolbarSearch)).toHaveLength(1);
  });
});