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

import SingleDatePicker from './SingleDatePicker';

const initialDate = '12/12/2020';
const initialValue = getDayTimestamp(initialDate);

const props = {
  id: 'TestSingleDatepickerElement',
  onValueChange: jest.fn(),
};

describe('SingleDatePicker', () => {
  it('should render correctly', () => {
    const { container } = render(<SingleDatePicker {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<SingleDatePicker {...props} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<SingleDatePicker {...props} value={initialValue} />, {
      isReadOnly: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a date is entered to date picker', () => {
    datePickerErrorWrapper(() => {
      const { getByPlaceholderText } = render(<SingleDatePicker {...props} />);

      const datePickerInput = getByPlaceholderText('MM/DD/YYYY');

      fireEvent.change(datePickerInput, { target: { value: initialDate } });
      fireEvent.blur(datePickerInput);

      expect(props.onValueChange).toHaveBeenCalledWith(initialValue);
    });
  });
});
