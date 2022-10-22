/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { renderWithContext } from '../../../utils/testHelpers';

import TextValue from './TextValue';

const initialValue = 'abc';

const defaultProps = {
  id: 'TestStringRuleElement',
  onValueChange: jest.fn(),
};

describe('TextValue', () => {
  beforeEach(() => {
    defaultProps.onValueChange.mockReset();
  });

  it('should render correctly', () => {
    const { container } = render(<TextValue {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container, getByDisplayValue } = render(
      <TextValue {...defaultProps} value={initialValue} />
    );
    expect(container).toMatchSnapshot();
    expect(getByDisplayValue(initialValue)).toBeInTheDocument();
  });

  it('should render correctly for read-only', () => {
    const { container, getByText } = renderWithContext(
      <TextValue {...defaultProps} value={initialValue} />,
      { isReadOnly: true }
    );
    expect(container).toMatchSnapshot();
    expect(getByText(initialValue)).toBeInTheDocument();
  });

  it('should set the rule value when a value is entered', () => {
    const { getByPlaceholderText } = render(<TextValue {...defaultProps} />);
    const textInput = getByPlaceholderText('Enter value');

    fireEvent.change(textInput, { target: { value: initialValue } });
    fireEvent.blur(textInput);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith(initialValue);
  });

  it('should not update the rule if the value was not changed', () => {
    const { getByPlaceholderText } = render(<TextValue {...defaultProps} value={initialValue} />);
    const textInput = getByPlaceholderText('Enter value');

    fireEvent.blur(textInput);

    expect(defaultProps.onValueChange).toHaveBeenCalledTimes(0);
  });
});
