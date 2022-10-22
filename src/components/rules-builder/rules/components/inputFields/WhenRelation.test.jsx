/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EXACT_OPERATORS } from '../../constants/operators';
import { PERIODS, WHEN_RELATIONS } from '../../constants';
import { renderWithContext } from '../../../utils/testHelpers';

import WhenRelation from './WhenRelation';

const initialPeriod = PERIODS[2];
const initialWhenRelation = WHEN_RELATIONS[1];
const initialValue = {
  period: initialPeriod.value,
  whenRelation: initialWhenRelation.value,
  value: 7,
};

const defaultProps = {
  id: 'TestWhenRelationElement',
  onValueChange: jest.fn(),
};

describe('WhenRelation', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should render correctly', () => {
    const { container } = render(<WhenRelation {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<WhenRelation {...defaultProps} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(
      <WhenRelation {...defaultProps} value={initialValue} />,
      { isReadOnly: true }
    );
    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a value is changed and input field is blurred', async () => {
    const { getByPlaceholderText } = render(
      <WhenRelation {...defaultProps} value={initialValue} />
    );
    const numberInput = getByPlaceholderText('Enter value');
    const newValue = 5;

    fireEvent.change(numberInput, { target: { value: newValue } });
    await waitFor(() => expect(defaultProps.onValueChange).toHaveBeenCalledTimes(0));

    fireEvent.blur(numberInput);
    await waitFor(() =>
      expect(defaultProps.onValueChange).toHaveBeenCalledWith({
        period: initialValue.period,
        whenRelation: initialValue.whenRelation,
        value: newValue,
      })
    );
  });

  it('should set the rule value when a period is changed', () => {
    const { getAllByRole, getByText } = render(
      <WhenRelation {...defaultProps} value={initialValue} />
    );
    const newPeriod = PERIODS[1];

    // open the period dropdown:
    const [periodDropdown] = getAllByRole('listbox');
    const periodDropdownButton = within(periodDropdown).getByRole('button');
    userEvent.click(periodDropdownButton);

    // select a new period:
    const newPeriodItem = getByText(newPeriod.label);
    userEvent.click(newPeriodItem);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith({
      period: newPeriod.value,
      whenRelation: initialValue.whenRelation,
      value: initialValue.value,
    });
  });

  it('should set the rule value when a "when relation" is changed', () => {
    const { getAllByRole, getByText } = render(
      <WhenRelation {...defaultProps} value={initialValue} />
    );
    const newWhenRelation = WHEN_RELATIONS[0];

    // open the when relation dropdown:
    const [, whenRelationDropdown] = getAllByRole('listbox');
    const whenRelationDropdownButton = within(whenRelationDropdown).getByRole('button');
    userEvent.click(whenRelationDropdownButton);

    // select a new period:
    const newWhenRelationItem = getByText(newWhenRelation.label);
    userEvent.click(newWhenRelationItem);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith({
      period: initialValue.period,
      whenRelation: newWhenRelation.value,
      value: initialValue.value,
    });
  });

  it('should reset validation on operator change', async () => {
    const props = {
      ...defaultProps,
      value: { ...initialValue, value: 0 },
      operator: EXACT_OPERATORS[0],
    };
    const { findByText, getByPlaceholderText, rerender } = render(<WhenRelation {...props} />);

    fireEvent.blur(getByPlaceholderText('Enter value')); // trigger validation
    const validationMessage = await findByText('Value must be greater than or equal', {
      exact: false,
    });

    expect(validationMessage).toBeInTheDocument();

    rerender(<WhenRelation {...props} operator={EXACT_OPERATORS[1]} />);
    expect(validationMessage).not.toBeInTheDocument();
  });

  it('should not update the rule if the number value was not changed', async () => {
    const { getByPlaceholderText } = render(
      <WhenRelation {...defaultProps} value={initialValue} />
    );
    const numberInput = getByPlaceholderText('Enter value');

    fireEvent.blur(numberInput);
    await waitFor(() => expect(defaultProps.onValueChange).toHaveBeenCalledTimes(0));
  });
});
