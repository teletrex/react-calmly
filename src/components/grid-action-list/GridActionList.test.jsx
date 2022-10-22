/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import GridActionList from './GridActionList';

describe('GridActionList', () => {
  test('it renders', () => {
    const component = mount(<GridActionList />);
    expect(component.find(GridActionList)).toHaveLength(1);
  });
});