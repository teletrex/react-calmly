/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { object, number } from '@storybook/addon-knobs';

import ComboChart, { defaultTooltipFormatter } from '.';

const props = {
  barsize: 15,
};

const baseProps = data => ({
  title: 'Combo Chart',
  barLabel: 'Bat',
  lineLabel: 'Line',
  yAxisLabel: 'yAxis',
  xAxisLabel: 'xAxis',
  width: number('width', 800),
  height: number('height', 400),
  data,
});

const numberData = () =>
  object('data', [
    {
      x: 0,
      yLine: 10,
      yBar: 5,
    },
    {
      x: 1,
      yLine: 16,
      yBar: 15,
    },
  ]);

const emptyData = () =>
  object('data', [
    {
      x: 0,
      yLine: 0,
      yBar: 0,
    },
    {
      x: 1,
      yLine: 0,
      yBar: 0,
    },
  ]);

describe('Combo chart', () => {
  test('verify if it renders', () => {
    const wrapper = mount(<ComboChart {...baseProps(numberData())} {...props} />);
    expect(wrapper.find(ComboChart)).toHaveLength(1);
  });
  test('Adds the right class if width is lower than portrait break', () => {
    const { getByTestId } = render(
      <ComboChart {...baseProps(numberData())} {...props} width={600} />
    );
    expect(getByTestId('combo-chart')).toHaveClass('bx--combo-chart-portrait');
  });
  test('verify empty state displayed when all line and bar values are zero', () => {
    const { container } = render(<ComboChart {...baseProps(emptyData())} {...props} />);

    const emptyStateElement = container.querySelector('.bx--recharts-empty-state__wrapper');

    expect(emptyStateElement).toBeInTheDocument();
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

    test('Removes first y from name', () => {
      const result = defaultTooltipFormatter(123, 'yabc');

      expect(result[1]).toEqual('abc');
    });
  });
});
