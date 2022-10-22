/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { renderWithContext } from '../../../utils/testHelpers';

import NumberValue from './NumberValue';

const initialValue = 7;
const expectedValue = initialValue.toString();

const defaultProps = {
  id: 'TestNumberRuleElement',
  onValueChange: jest.fn(),
};

describe('NumberValue', () => {
  beforeEach(() => {
    defaultProps.onValueChange.mockReset();
  });

  it('should render correctly', () => {
    const { container } = render(<NumberValue {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container, getByDisplayValue } = render(
      <NumberValue {...defaultProps} value={initialValue} />
    );
    expect(container).toMatchSnapshot();
    expect(getByDisplayValue(expectedValue)).toBeInTheDocument();
  });

  it('should render correctly for read-only', () => {
    const { container, getByText } = renderWithContext(
      <NumberValue {...defaultProps} value={initialValue} />,
      { isReadOnly: true }
    );
    expect(container).toMatchSnapshot();
    expect(getByText(expectedValue)).toBeInTheDocument();
  });

  it('should set the rule value when a number is provided', () => {
    const { getByPlaceholderText } = render(<NumberValue {...defaultProps} />);

    const numberInput = getByPlaceholderText('Enter value');

    fireEvent.change(numberInput, { target: { value: initialValue } });
    fireEvent.blur(numberInput);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith(initialValue);
  });

  it('should not update the rule if the value was not changed', () => {
    const { getByPlaceholderText } = render(<NumberValue {...defaultProps} value={initialValue} />);

    const numberInput = getByPlaceholderText('Enter value');

    fireEvent.blur(numberInput);

    expect(defaultProps.onValueChange).toHaveBeenCalledTimes(0);
  });
});
