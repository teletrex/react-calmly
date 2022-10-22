/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CustomLegend from './CustomLegend';

const data = [
  { name: '2016 Q1', value: 98, color: '#29ab87' },
  { name: '2016 Q2', value: 96, color: '#0292d4' },
  { name: '2016 Q3', value: 94, color: '#d846bf' },
  { name: '2016 Q4', value: 93, color: '#f45d20' },
  { name: '2017 Q1', value: 90, color: '#f3ba00' },
  { name: '2017 Q2', value: 88, color: '#ff465a' },
  { name: '2017 Q3', value: 87, color: '#FF8C7B' },
  { name: '2017 Q4', value: 86, color: '#29ab87' },
  { name: '2018 Q1', value: 84, color: '#0292d4' },
  { name: '2018 Q2', value: 80, color: '#d846bf' },
  { name: '2018 Q3', value: 77, color: '#f45d20' },
  { name: '2018 Q4', value: 75, color: '#f3ba00' },
  { name: '2019 Q1', value: 74, color: '#ff465a' },
  { name: '2019 Q2', value: 72, color: '#FF8C7B' },
];

describe('CustomLegend', () => {
  test('verify if created', () => {
    const { container } = render(<CustomLegend data={data} onChange={() => {}} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Uses correct data name', () => {
    const { getByText } = render(<CustomLegend data={data} onChange={() => {}} />);
    expect(getByText('2017 Q3')).not.toBeFalsy();
  });

  test('Adds the right class if `withMetrics` is true', () => {
    const { getByTestId } = render(<CustomLegend data={data} onChange={() => {}} withMetrics />);
    expect(getByTestId('recharts__legend')).toHaveClass('bx--recharts__legend-with-metrics');
  });

  test('Adds the right class if `collapsed` is true', () => {
    const { getByTestId } = render(<CustomLegend collapsed data={data} onChange={() => {}} />);
    expect(getByTestId('recharts__legend')).toHaveClass('bx--recharts__legend-collapsed');
  });

  test('Adds the right class if title is collapsable', () => {
    const { getByTestId } = render(<CustomLegend collapsable data={data} onChange={() => {}} />);
    expect(getByTestId('legend-title')).toHaveClass('bx--recharts__legend_title-collapsable');
  });

  test('verify if values are toggled correctly', () => {
    const props = { onChange: jest.fn(), data };

    const container = render(<CustomLegend {...props} />);

    fireEvent.click(container.getByTestId(`checkbox-2016 Q1`));
    fireEvent.click(container.getByTestId(`checkbox-2016 Q2`));
    fireEvent.click(container.getByTestId(`checkbox-2016 Q2`));

    expect(props.onChange).toHaveBeenCalledTimes(3);

    const {
      mock: { calls },
    } = props.onChange;

    const lastCall = calls.pop();

    expect(lastCall).toEqual([['2016 Q1']]);
  });

  test('calls onCollapse if title is clicked', () => {
    const props = { onCollapse: jest.fn(), data, onChange: () => {}, collapsable: true };
    const container = render(<CustomLegend {...props} />);

    fireEvent.click(container.getByTestId('legend-title'));
    expect(props.onCollapse).toHaveBeenCalledTimes(1);
  });

  test('should select all entries if `selectAllEntriesAfterAllUnselected` is true and all entries unselected', () => {
    const props = { onChange: jest.fn(), data, selectAllEntriesAfterAllWereDeselected: true };

    const container = render(<CustomLegend {...props} />);

    const checkboxes = container.getAllByTestId(/checkbox/);

    checkboxes.forEach(checkbox => fireEvent.click(checkbox)); // uncheck all checboxes

    expect(props.onChange).toHaveBeenCalledTimes(14);

    const {
      mock: { calls },
    } = props.onChange;

    const lastCall = calls.pop();

    expect(lastCall).toEqual([[]]);
  });
});
