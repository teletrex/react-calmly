/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { renderWithContext } from '../../../utils/testHelpers';

import RangeValues from './RangeValues';

const initialValues = [3, 7];
const expectedValues = initialValues.map(String);

const props = {
  id: 'TestNumberRuleElement',
  onValueChange: jest.fn(),
};

describe('RangeValues', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should render correctly', () => {
    const { container } = render(<RangeValues {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container, getByDisplayValue } = render(
      <RangeValues {...props} value={initialValues} />
    );
    expect(container).toMatchSnapshot();
    expect(getByDisplayValue(expectedValues[0])).toBeInTheDocument();
    expect(getByDisplayValue(expectedValues[1])).toBeInTheDocument();
  });

  it('should render correctly for read-only', () => {
    const { container, getByText } = renderWithContext(
      <RangeValues {...props} value={initialValues} />,
      { isReadOnly: true }
    );
    expect(container).toMatchSnapshot();
    expect(getByText(expectedValues[0])).toBeInTheDocument();
    expect(getByText(expectedValues[1])).toBeInTheDocument();
  });

  it('should properly set the rule value when range values are entered and input fields are blurred', async () => {
    const { getAllByPlaceholderText } = render(<RangeValues {...props} />);
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[0], { target: { value: initialValues[0] } });
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));
    fireEvent.blur(numberInputs[0]);
    await waitFor(() =>
      expect(props.onValueChange).toHaveBeenCalledWith([initialValues[0], undefined])
    );

    props.onValueChange.mockReset();

    fireEvent.change(numberInputs[1], { target: { value: initialValues[1] } });
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));
    fireEvent.blur(numberInputs[1]);
    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledWith(initialValues));
  });

  it('should display an error when the first value entered is greater than the second', async () => {
    const { findByText, getAllByPlaceholderText } = render(
      <RangeValues {...props} value={initialValues} />
    );
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[0], { target: { value: initialValues[1] + 1 } });
    fireEvent.blur(numberInputs[0]);

    const errorMessage = await findByText('The first value must be smaller than the second.');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should display an error when the second value entered is smaller than the first', async () => {
    const { findByText, getAllByPlaceholderText } = render(
      <RangeValues {...props} value={initialValues} />
    );
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[1], { target: { value: initialValues[0] - 1 } });
    fireEvent.blur(numberInputs[1]);

    const errorMessage = await findByText('The second value must be greater than the first.');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should not update the rule if the values were not changed', async () => {
    const { getAllByPlaceholderText } = render(<RangeValues {...props} value={initialValues} />);
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.blur(numberInputs[0]);
    fireEvent.blur(numberInputs[1]);

    await waitFor(() => expect(props.onValueChange).toHaveBeenCalledTimes(0));
  });
});
