/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { IS_OPERATORS } from '../constants/operators';

import SelectRule from './SelectRule';

const defaultInitialOperator = IS_OPERATORS[0];
const defaultInitialValue = 'OPTION_1';

describe('SelectRule', () => {
  const onValueChange = jest.fn();
  let defaultProps;

  beforeEach(() => {
    onValueChange.mockReset();

    defaultProps = {
      config: {
        options: [
          { label: 'Option 1', value: 'OPTION_1' },
          { label: 'Option 2', value: 'OPTION_2' },
        ],
      },
      id: 'TestSelectRuleElement',
      isReadOnly: false,
      onValueChange,
      operator: defaultInitialOperator,
      value: defaultInitialValue,
    };
  });

  it('should render correctly', () => {
    const { container } = render(<SelectRule {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for multiple select', () => {
    const props = {
      ...defaultProps,
      config: { ...defaultProps.config, isMultiple: true },
      value: [defaultInitialValue],
    };
    const { container } = render(<SelectRule {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should not render any values if the provided operator is empty', () => {
    const props = {
      ...defaultProps,
      operator: null,
    };
    const { container } = render(<SelectRule {...props} />);

    expect(container.innerHTML).toBe('');
  });
});
