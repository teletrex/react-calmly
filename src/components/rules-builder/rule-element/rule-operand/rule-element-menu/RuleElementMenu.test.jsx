/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { mount } from 'enzyme';
import noop from 'lodash/noop';

import RuleElementMenu from './RuleElementMenu';

describe('RuleElementMenu', () => {
  test('should render correctly', () => {
    const props = {
      onDuplicate: noop,
      onMoveDown: noop,
      onMoveUp: noop,
    };

    const component = mount(<RuleElementMenu {...props} />);
    expect(component.find(RuleElementMenu)).toHaveLength(1);
  });
});
