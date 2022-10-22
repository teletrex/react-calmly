/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { mount } from 'enzyme';

import { defaultTooltipFormatter } from '.';
import MultiLineChart from ".";

const numberData = () => [
  {
    x: 0,
    yLine: 10,
    yDashed: 15,
    bounds: [18, 7],
  },
  {
    x: 1,
    yLine: 13,
    yDashed: 20,
    bounds: [25, 10],
  },
  {
    x: 2,
    yLine: 6,
    yDashed: 10,
    bounds: [12, 4],
  },
  {
    x: 3,
    yLine: 8,
    yDashed: 11,
    bounds: [13, 5],
  },
  {
    x: 4,
    yLine: 3,
    yLineIsAlert: true,
    yDashed: 10,
    bounds: [16, 9],
  },
  {
    x: 5,
    yLine: 20,
    yDashed: 15,
    bounds: [24, 12],
  },
  {
    x: 6,
    yLine: 24,
    yDashed: 20,
    bounds: [27, 17],
  },
  {
    x: 7,
    yLine: 15,
    yDashed: 19,
    bounds: [22, 11],
  },
  {
    x: 8,
    yLine: 4,
    yDashed: 7,
    bounds: [10, 0],
  },
];

const defaultProps = data => ({
  width: 900,
  height: 400,
  data,
  xAxisLabel: 'xLabel',
  yAxisLabel: 'yLabel',
});

describe('MultiLineChart', () => {
  test('verify if created', () => {
    const wrapper = mount(<MultiLineChart {...defaultProps(numberData())} />);
    expect(wrapper.find(MultiLineChart)).toHaveLength(1);
  });

  describe('default tooltip formatter', () => {
    test('return value and name', () => {
      const result = defaultTooltipFormatter(123, 'A');

      expect(result).toEqual([123, 'A']);
    });

    test('capitalizes name', () => {
      const result = defaultTooltipFormatter(123, 'abc');

      expect(result[1]).toEqual('Abc');
    });

    test('joins values', () => {
      const [value] = defaultTooltipFormatter([123, 456], 'abc');

      expect(value).toEqual('123 ~ 456');
    });

    test('Removes first y from name', () => {
      const result = defaultTooltipFormatter(123, 'yabc');

      expect(result[1]).toEqual('abc');
    });
  });
});
