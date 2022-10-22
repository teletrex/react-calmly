/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import find from 'lodash/find';
import userEvent from '@testing-library/user-event';

import { VALUES } from '../constants';
import { renderWithContext } from '../../utils/testHelpers';

import TimeframeSelector from './TimeframeSelector';
import { TIMEFRAME_OPERATORS } from './constants';

const timeframeData = {
  operator: 'EXACTLY',
  value: {
    value: 7,
    period: 'DAYS',
    whenRelation: 'AWAY',
  },
};
const timeframeOnChange = jest.fn();

const operatorTestCases = [
  ['input-field-range-date-picker', 'BETWEEN', [1640991600000, 1643410800000]],
  ['input-field-single-date-picker', 'AFTER', 1640991600000],
  ['input-field-when-relation', 'MORE_THAN', timeframeData.value],
  ['input-field-within', 'WITHIN_THE_LAST', { period: 'WEEKS', value: 3 }],
];

const defaultProps = {
  id: 'TestTimeframeSelectorElement',
  timeframe: {
    onChange: timeframeOnChange,
    data: timeframeData,
  },
};

describe('TimeframeSelector', () => {
  beforeEach(() => {
    timeframeOnChange.mockReset();
  });

  it('should render correctly', () => {
    const { container } = render(<TimeframeSelector {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<TimeframeSelector {...defaultProps} />, {
      isReadOnly: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the timeframe value when a value is changed and input field is blurred', async () => {
    const { getByPlaceholderText } = render(<TimeframeSelector {...defaultProps} />);
    const dayInput = getByPlaceholderText('Enter value');

    fireEvent.change(dayInput, { target: { value: 9 } });
    await waitFor(() => expect(defaultProps.timeframe.onChange).toHaveBeenCalledTimes(0));

    fireEvent.blur(dayInput);

    const expectedValue = {
      ...defaultProps.timeframe.data,
      value: {
        ...defaultProps.timeframe.data.value,
        value: 9,
      },
    };

    await waitFor(() =>
      expect(defaultProps.timeframe.onChange).toHaveBeenCalledWith(expectedValue)
    );
  });

  it('should set the timeframe value when a timeframe operator is changed', () => {
    const { getAllByRole, getByText } = render(<TimeframeSelector {...defaultProps} />);
    const newOperator = find(TIMEFRAME_OPERATORS, { value: 'AT_ANY_TIME' });

    // expand the operator dropdown:
    const [operatorDropdown] = getAllByRole('listbox');
    const operatorDropdownButton = within(operatorDropdown).getByRole('button');
    userEvent.click(operatorDropdownButton);

    // select a new operator:
    const newOperatorItem = getByText(newOperator.label);
    userEvent.click(newOperatorItem);

    const expectedValue = {
      operator: newOperator.value,
      value: VALUES.BLANK,
    };

    expect(defaultProps.timeframe.onChange).toHaveBeenCalledWith(expectedValue);
  });

  test.each(operatorTestCases)(
    'should render a proper component when %p operator is selected',
    (testId, operatorValue, value) => {
      const props = {
        ...defaultProps,
        timeframe: {
          ...defaultProps.timeframe,
          data: {
            value,
            operator: operatorValue,
          },
        },
      };

      const { getByTestId } = render(<TimeframeSelector {...props} />);
      expect(getByTestId(testId)).toBeInTheDocument();
    }
  );
});
