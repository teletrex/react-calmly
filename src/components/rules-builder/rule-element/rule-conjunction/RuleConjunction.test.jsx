/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import noop from 'lodash/noop';
import { mount } from 'enzyme';

import { CONJUNCTIONS } from '../../constants';

import RuleConjunction from './RuleConjunction';

describe('RuleConjunction', () => {
  test('should render correctly', () => {
    const props = {
      onConjunctionChange: noop,
      initialConjunction: 'AND',
      rulesLabels: CONJUNCTIONS,
    };

    const component = mount(<RuleConjunction {...props} />);
    expect(component.find(RuleConjunction)).toHaveLength(1);
  });
});
