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
import { renderWithContext } from '../../../utils/testHelpers';

import WithinRange from './WithinRange';

const initialPeriod = PERIODS[2];
const initialValue = {
  period: initialPeriod.value,
  value: [2, 7],
};

const props = {
  id: 'TestDateRuleElement',
  onValueChange: jest.fn(),
};

describe('WithinRange', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should render correctly', () => {
    const { container } = render(<WithinRange {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<WithinRange {...props} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<WithinRange {...props} value={initialValue} />, {
      isReadOnly: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a value is changed and input field is blurred', async () => {
    const { getAllByPlaceholderText } = render(<WithinRange {...props} value={initialValue} />);
    const newValue = [5, 15];

    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[0], { target: { value: newValue[0] } });
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));

    fireEvent.blur(numberInputs[0]);
    await waitFor(() =>
      expect(props.onValueChange).toHaveBeenCalledWith({
        period: initialValue.period,
        value: [newValue[0], initialValue.value[1]],
      })
    );

    props.onValueChange.mockReset();

    fireEvent.change(numberInputs[1], { target: { value: newValue[1] } });
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));

    fireEvent.blur(numberInputs[1]);
    await waitFor(() =>
      expect(props.onValueChange).toHaveBeenCalledWith({
        period: initialValue.period,
        value: newValue,
      })
    );
  });

  it('should set the rule value when a period is changed', () => {
    const { getByRole, getByText } = render(<WithinRange {...props} value={initialValue} />);
    const newPeriod = PERIODS[1];

    // open the period dropdown:
    const periodDropdown = getByRole('listbox');
    const periodDropdownButton = within(periodDropdown).getByRole('button');
    userEvent.click(periodDropdownButton);

    // select a new period:
    const newPeriodItem = getByText(newPeriod.label);
    userEvent.click(newPeriodItem);

    expect(props.onValueChange).toHaveBeenCalledWith({
      period: newPeriod.value,
      value: initialValue.value,
    });
  });

  it('should display an error when the first value entered is greater than the second', async () => {
    const { getAllByPlaceholderText, findByText } = render(
      <WithinRange {...props} value={initialValue} />
    );
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[0], { target: { value: initialValue.value[1] + 1 } });
    fireEvent.blur(numberInputs[0]);

    const errorMessage = await findByText('The first value must be smaller than the second.');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should display an error when the second value entered is smaller than the first', async () => {
    const { getAllByPlaceholderText, findByText } = render(
      <WithinRange {...props} value={initialValue} />
    );
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[1], { target: { value: initialValue.value[0] - 1 } });
    fireEvent.blur(numberInputs[1]);

    const errorMessage = await findByText('The second value must be greater than the first.');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should not update the rule if the number values were not changed', async () => {
    const { getAllByPlaceholderText } = render(<WithinRange {...props} value={initialValue} />);
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.blur(numberInputs[0]);
    fireEvent.blur(numberInputs[1]);

    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));
  });
});
