/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PERIODS } from '../../constants';
import { WITHIN_OPERATORS } from '../../constants/operators';
import { renderWithContext } from '../../../utils/testHelpers';

import Within from './Within';

const initialPeriod = PERIODS[2];
const initialValue = {
  period: initialPeriod.value,
  value: 7,
};

const defaultProps = {
  id: 'TestWithinElement',
  onValueChange: jest.fn(),
};

describe('Within', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should render correctly', () => {
    const { container } = render(<Within {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<Within {...defaultProps} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<Within {...defaultProps} value={initialValue} />, {
      isReadOnly: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a value is changed and input field is blurred', async () => {
    const { getByPlaceholderText } = render(<Within {...defaultProps} value={initialValue} />);
    const numberInput = getByPlaceholderText('Enter value');
    const newValue = 5;

    fireEvent.change(numberInput, { target: { value: newValue } });
    await waitFor(() => expect(defaultProps.onValueChange).toHaveBeenCalledTimes(0));

    fireEvent.blur(numberInput);
    await waitFor(() =>
      expect(defaultProps.onValueChange).toHaveBeenCalledWith({
        period: initialValue.period,
        value: newValue,
      })
    );
  });

  it('should set the rule value when a period is changed', () => {
    const { getByRole, getByText } = render(<Within {...defaultProps} value={initialValue} />);
    const newPeriod = PERIODS[1];

    // open the period dropdown:
    const periodDropdown = getByRole('listbox');
    const periodDropdownButton = within(periodDropdown).getByRole('button');
    userEvent.click(periodDropdownButton);

    // select a new period:
    const newPeriodItem = getByText(newPeriod.label);
    userEvent.click(newPeriodItem);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith({
      period: newPeriod.value,
      value: initialValue.value,
    });
  });

  it('should reset validation on operator change', async () => {
    const props = {
      ...defaultProps,
      operator: WITHIN_OPERATORS[0],
      value: { ...initialValue, value: 0 },
    };
    const { findByText, getByPlaceholderText, rerender } = render(<Within {...props} />);

    fireEvent.blur(getByPlaceholderText('Enter value')); // trigger validation
    const validationMessage = await findByText('Value must be greater than or equal', {
      exact: false,
    });

    expect(validationMessage).toBeInTheDocument();

    rerender(<Within {...props} operator={WITHIN_OPERATORS[1]} />);
    expect(validationMessage).not.toBeInTheDocument();
  });

  it('should not update the rule if the number value was not changed', async () => {
    const { getByPlaceholderText } = render(<Within {...defaultProps} value={initialValue} />);
    const numberInput = getByPlaceholderText('Enter value');

    fireEvent.blur(numberInput);
    await waitFor(() => expect(defaultProps.onValueChange).toHaveBeenCalledTimes(0));
  });
});
