/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { CONJUNCTION_AND } from '../../constants';

import RuleOperand from './RuleOperand';

describe('RuleOperand', () => {
  const defaultRule = {
    id: '1',
    key: 'AGE',
    conjunction: CONJUNCTION_AND.id,
    data: {},
    level: 1,
  };

  it('should render correctly', () => {
    const props = { rule: defaultRule };

    const { container } = render(<RuleOperand {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should allow to reselect criteria', () => {
    const props = { rule: defaultRule };

    const { getByText } = render(<RuleOperand {...props} />);

    expect(getByText('Select criteria')).toBeInTheDocument();
  });

  it('should not render ungroup button', () => {
    const props = { rule: { ...defaultRule }, isOnlyElement: true };

    const { queryByLabelText } = render(<RuleOperand {...props} />);

    expect(queryByLabelText('Remove bracket')).not.toBeInTheDocument();
  });

  it('should render ungroup button', () => {
    const props = { rule: { ...defaultRule, level: 2 }, isOnlyElement: true };

    const { getByLabelText } = render(<RuleOperand {...props} />);

    expect(getByLabelText('Remove bracket')).toBeInTheDocument();
  });
});
