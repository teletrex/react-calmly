/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { getDayTimestamp } from '../../helpers';
import { datePickerErrorWrapper, renderWithContext } from '../../../utils/testHelpers';

import RangeDatePicker from './RangeDatePicker';

const initialDates = ['12/12/2020', '12/15/2020'];
const initialValues = initialDates.map(date => getDayTimestamp(date));

const props = {
  id: 'TestRangeDatepickerElement',
  onValueChange: jest.fn(),
};

describe('RangeDate Picker', () => {
  it('should render correctly', () => {
    const { container } = render(<RangeDatePicker {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<RangeDatePicker {...props} value={initialValues} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<RangeDatePicker {...props} value={initialValues} />, {
      isReadOnly: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a date is entered to date picker', () => {
    datePickerErrorWrapper(() => {
      const { getAllByPlaceholderText } = render(<RangeDatePicker {...props} />);
      const datePickerInputs = getAllByPlaceholderText('MM/DD/YYYY');

      fireEvent.change(datePickerInputs[0], { target: { value: initialDates[0] } });
      fireEvent.blur(datePickerInputs[0]);
      fireEvent.change(datePickerInputs[1], { target: { value: initialDates[1] } });
      fireEvent.blur(datePickerInputs[1]);

      expect(props.onValueChange).toHaveBeenCalledWith(initialValues);
    });
  });
});
