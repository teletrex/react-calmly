/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { IS_OPERATORS, IS_ONE_OF_OPERATORS, RANGE_OPERATORS } from '../constants/operators';
import { renderWithContext } from '../../utils/testHelpers';

import NumberRule from './NumberRule';

const defaultInitialOperator = IS_OPERATORS[0];
const defaultInitialValue = 7;

describe('NumberRule', () => {
  const onValueChange = jest.fn();
  let defaultProps;

  beforeEach(() => {
    onValueChange.mockReset();

    defaultProps = {
      operator: defaultInitialOperator,
      value: defaultInitialValue,
      id: 'TestNumberRuleElement',
      onValueChange,
    };
  });

  it('should render correctly', () => {
    const { container } = render(<NumberRule {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<NumberRule {...defaultProps} />, { isReadOnly: true });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only and oneOfValues operator', () => {
    const props = {
      ...defaultProps,
      operator: IS_ONE_OF_OPERATORS[0],
      value: [1, 2],
    };

    const { container } = renderWithContext(<NumberRule {...props} />, { isReadOnly: true });
    expect(container).toMatchSnapshot();
  });

  it('should properly render the one of values component', () => {
    const initialValue = [3, 9];
    const props = {
      ...defaultProps,
      operator: IS_ONE_OF_OPERATORS[0],
      value: initialValue,
    };
    const { getByPlaceholderText, getByText } = render(<NumberRule {...props} />);

    expect(getByText(initialValue[0].toString())).toBeInTheDocument();
    expect(getByText(initialValue[1].toString())).toBeInTheDocument();
    expect(getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('should properly render the range component', () => {
    const initialValue = [3, 9];
    const props = {
      ...defaultProps,
      operator: RANGE_OPERATORS[0],
      value: initialValue,
    };
    const { getByDisplayValue } = render(<NumberRule {...props} />);

    expect(getByDisplayValue(initialValue[0].toString())).toBeInTheDocument();
    expect(getByDisplayValue(initialValue[1].toString())).toBeInTheDocument();
  });

  it('should not render any values if the provided operator is empty', () => {
    const props = {
      ...defaultProps,
      operator: null,
    };
    const { container } = render(<NumberRule {...props} />);

    expect(container.innerHTML).toBe('');
  });
});
