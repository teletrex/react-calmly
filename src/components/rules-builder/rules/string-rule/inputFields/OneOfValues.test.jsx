/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { IS_ONE_OF_OPERATORS } from '../../constants/operators';
import { renderWithContext } from '../../../utils/testHelpers';

import OneOfValues from './OneOfValues';

const initialValue = ['abc'];

const defaultProps = {
  id: 'TestStringRuleElement',
  onValueChange: jest.fn(),
};

describe('OneOfValues', () => {
  it('should render correctly', () => {
    const { container } = render(<OneOfValues {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container, getByText } = render(<OneOfValues {...defaultProps} value={initialValue} />);
    expect(container).toMatchSnapshot();
    expect(getByText(initialValue[0])).toBeInTheDocument();
  });

  it('should render correctly for read-only', () => {
    const { container, getByText } = renderWithContext(
      <OneOfValues {...defaultProps} value={initialValue} />,
      { isReadOnly: true }
    );
    expect(container).toMatchSnapshot();
    expect(getByText(initialValue[0])).toBeInTheDocument();
  });

  it('should set the rule value when a value is added', () => {
    const { getByPlaceholderText, getByText } = render(<OneOfValues {...defaultProps} />);
    const textInput = getByPlaceholderText('Enter value');
    const addButton = getByText('Add');

    fireEvent.change(textInput, { target: { value: initialValue[0] } });
    fireEvent.click(addButton);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith(initialValue);
  });

  it('should only add the unique values', () => {
    const { getByPlaceholderText, getByText } = render(<OneOfValues {...defaultProps} />);
    const textInput = getByPlaceholderText('Enter value');
    const addButton = getByText('Add');

    fireEvent.change(textInput, { target: { value: initialValue[0] } });
    fireEvent.click(addButton);
    fireEvent.change(textInput, { target: { value: initialValue[0] } });
    fireEvent.click(addButton);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith(initialValue);
    expect(defaultProps.onValueChange).not.toHaveBeenCalledWith([initialValue[0], initialValue[0]]);
  });

  it('should correctly remove an existing value', () => {
    const { getByTitle } = render(<OneOfValues {...defaultProps} value={initialValue} />);
    const removeButton = getByTitle('Remove');

    fireEvent.click(removeButton);

    expect(removeButton).not.toBeInTheDocument();
  });

  it('should reset validation on operator change', async () => {
    const props = {
      ...defaultProps,
      operator: IS_ONE_OF_OPERATORS[0],
      value: initialValue,
    };
    const { findByText, getByPlaceholderText, rerender } = render(<OneOfValues {...props} />);

    const numberInput = getByPlaceholderText('Enter value');
    fireEvent.change(numberInput, { target: { value: initialValue[0] } });
    fireEvent.blur(numberInput); // trigger validation
    const validationMessage = await findByText('This value already exists');

    expect(validationMessage).toBeInTheDocument();

    rerender(<OneOfValues {...props} operator={IS_ONE_OF_OPERATORS[1]} />);
    expect(validationMessage).not.toBeInTheDocument();
  });
});
