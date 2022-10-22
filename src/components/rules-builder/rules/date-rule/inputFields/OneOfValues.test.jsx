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

import OneOfValues from './OneOfValues';

const initialDate = '11/11/2020';
const initialValue = [getDayTimestamp(initialDate)];

const props = {
  id: 'TestDateRuleElement',
  onValueChange: jest.fn(),
};

describe('OneOfValues', () => {
  it('should render correctly', () => {
    const { container } = render(<OneOfValues {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    datePickerErrorWrapper(() => {
      const { container } = render(<OneOfValues {...props} value={initialValue} />);
      expect(container).toMatchSnapshot();
    });
  });

  it('should render correctly for read-only', () => {
    // add a second value to test read-only conditions for colon and comma:
    const initialValues = initialValue.concat([getDayTimestamp('12/12/2020')]);
    const { container } = renderWithContext(<OneOfValues {...props} value={initialValues} />, {
      isReadOnly: true,
    });

    expect(container).toMatchSnapshot();
  });

  it('should set the rule value when a date is entered to date picker', () => {
    datePickerErrorWrapper(() => {
      const { getByPlaceholderText } = render(<OneOfValues {...props} />);

      const datePickerInput = getByPlaceholderText('MM/DD/YYYY');

      fireEvent.change(datePickerInput, { target: { value: initialDate } });
      fireEvent.blur(datePickerInput);

      expect(props.onValueChange).toHaveBeenCalledWith(initialValue);
    });
  });

  it('should correctly remove an existing value', () => {
    datePickerErrorWrapper(() => {
      const { getByTitle } = render(<OneOfValues {...props} value={initialValue} />);
      const removeButton = getByTitle('Remove');

      fireEvent.click(removeButton);

      expect(removeButton).not.toBeInTheDocument();
    });
  });
});
