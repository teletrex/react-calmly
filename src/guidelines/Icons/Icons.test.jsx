/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import * as ReactIcons from '@carbon/icons-react';

import Icons from './Icons';

const props = {
  element: ReactIcons.Add32,
  iconName: 'Add',
  iconVariable: 'Add',
};

describe('Icons', () => {
  test('should create icons', () => {
    const wrapper = mount(<Icons {...props} />);
    expect(wrapper.find(Icons)).toHaveLength(1);
  });
  test('should show icon name', () => {
    const wrapper = mount(<Icons {...props} />);
    expect(
      wrapper
        .find('.bx--icon-name_label')
        .text()
        .includes('Add')
    ).toBe(true);
  });
  test('should show icon variable', () => {
    const wrapper = mount(<Icons {...props} />);
    expect(
      wrapper
        .find('.bx--icon-variable > span')
        .text()
        .includes('Add')
    ).toBe(true);
  });
});
