/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';

import ColumnChartTooltip from './ColumnChartTooltip';

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

describe('ColumnChartTooltip', () => {
  test('verify if created', () => {
    const { container } = render(<ColumnChartTooltip data={data} label="2017 Q4" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('returns null if label does not match on data', () => {
    const { container } = render(<ColumnChartTooltip data={data} />);
    expect(container.childElementCount).toBe(0);
  });

  test('Uses correct data name and value', () => {
    const { getByText } = render(<ColumnChartTooltip data={data} label="2017 Q3" />);
    expect(getByText('87')).not.toBeFalsy();
    expect(getByText('2017 Q3')).not.toBeFalsy();
  });
});
