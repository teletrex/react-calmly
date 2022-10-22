/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChartMetrics from './ChartMetrics';

const items = [
  { id: 'checkbox-1', name: 'Metric 1', checked: false },
  { id: 'checkbox-2', name: 'Metric 2', checked: true },
  { id: 'checkbox-3', name: 'Metric 3', checked: false },
];

const props = {
  items,
  onChange: jest.fn(),
  limit: 2,
  placeholder: 'Select metrics',
};

describe('ChartMetrics', () => {
  test('Renders correctly', () => {
    const { container } = render(<ChartMetrics {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Uses correct metrics name', () => {
    const { getByText } = render(<ChartMetrics {...props} />);

    userEvent.click(getByText('Select metrics'));

    expect(getByText('Metric 1')).not.toBeFalsy();
    expect(getByText('Metric 2')).not.toBeFalsy();
    expect(getByText('Metric 3')).not.toBeFalsy();
  });

  test('Sets the width if prop is passed', () => {
    const { getByTestId } = render(<ChartMetrics {...props} width={600} />);
    expect(getByTestId('chart-metrics')).toHaveStyle('maxWidth: 600px');
  });

  test('Toggles values correctly when limit 1', () => {
    const { getByText } = render(<ChartMetrics {...props} limit={1} />);

    userEvent.click(getByText('Metric 2'));

    userEvent.click(getByText('Metric 1'));

    expect(props.onChange).toHaveBeenCalledTimes(1);

    expect(props.onChange).toHaveBeenCalledWith({ id: 'checkbox-1', name: 'Metric 1' });

    props.onChange.mockReset();
  });

  test('Toggles values correctly', () => {
    const { getByText } = render(<ChartMetrics {...props} />);

    userEvent.click(getByText('Select metrics'));

    userEvent.click(getByText('Metric 1'));
    userEvent.click(getByText('Metric 2'));
    userEvent.click(getByText('Metric 3'));

    expect(props.onChange).toHaveBeenCalledTimes(3);

    const {
      mock: { calls },
    } = props.onChange;
    const lastCall = calls.pop();

    expect(lastCall).toEqual([
      [
        { id: 'checkbox-1', name: 'Metric 1' },
        { id: 'checkbox-3', name: 'Metric 3' },
      ],
    ]);
  });
});
