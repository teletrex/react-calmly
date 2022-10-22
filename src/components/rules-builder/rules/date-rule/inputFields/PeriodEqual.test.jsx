/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { PERIOD_EQUAL_OPERATORS } from '../../constants/operators';
import { renderWithContext } from '../../../utils/testHelpers';

import PeriodEqual from './PeriodEqual';

const initialValue = 7;
const initialOperator = PERIOD_EQUAL_OPERATORS[2];

const props = {
  id: 'TestDateRuleElement',
  operator: initialOperator,
  onValueChange: jest.fn(),
};

describe('PeriodEqual', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should render correctly', () => {
    const { container } = render(<PeriodEqual {...props} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a month operator', () => {
    const { container } = render(
      <PeriodEqual {...props} operator={PERIOD_EQUAL_OPERATORS[1]} value={1} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a year operator', () => {
    const { container } = render(
      <PeriodEqual {...props} operator={PERIOD_EQUAL_OPERATORS[0]} value={2019} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<PeriodEqual {...props} value={initialValue} />, {
      isReadOnly: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a value is changed and input field is blurred', async () => {
    const { getByPlaceholderText } = render(<PeriodEqual {...props} value={initialValue} />);
    const numberInput = getByPlaceholderText('Enter value');
    const newValue = 5;

    fireEvent.change(numberInput, { target: { value: newValue } });
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));

    fireEvent.blur(numberInput);
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledWith(newValue));
  });

  it('should reset validation on operator change', async () => {
    const { findByText, getByPlaceholderText, rerender } = render(
      <PeriodEqual {...props} value={123456789} />
    );

    fireEvent.blur(getByPlaceholderText('Enter value')); // trigger validation
    const validationMessage = await findByText('Value must be less than or equal to', {
      exact: false,
    });

    expect(validationMessage).toBeInTheDocument();

    rerender(<PeriodEqual {...props} operator={PERIOD_EQUAL_OPERATORS[0]} />);
    expect(validationMessage).not.toBeInTheDocument();
  });

  it('should not update the rule if the value was not changed', async () => {
    const { getByPlaceholderText } = render(<PeriodEqual {...props} value={initialValue} />);
    const numberInput = getByPlaceholderText('Enter value');

    fireEvent.blur(numberInput);
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));
  });
});
