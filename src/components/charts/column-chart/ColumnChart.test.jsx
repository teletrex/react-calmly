/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { number } from '@storybook/addon-knobs/dist';

import ColumnChart from './ColumnChart';

const chartProps = overrides => ({
  data: [
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
  ],
  aspect: 1,
  labelColor: '#13173D',
  labelFontSize: 14,
  legendColor: '#13173D',
  legendFontSize: 11,
  title: 'Bar chart title',
  xAxisTitle: 'Quarter',
  yAxisTitle: 'No. of transaction [k]',
  ...overrides,
});

const comparisonProps = {
  ...chartProps(),
  comparingGroupKey: 'valueB',
  data: [
    { name: '2016 Q1', value: 98, valueB: 25, color: '#29ab87', colorB: '#f45d20' },
    { name: '2016 Q2', value: 96, valueB: 50, color: '#0292d4', colorB: '#f45d20' },
    { name: '2016 Q3', value: 94, valueB: 30, color: '#d846bf', colorB: '#f45d20' },
    { name: '2016 Q4', value: 93, valueB: 45, color: '#f45d20', colorB: '#f45d20' },
    { name: '2017 Q1', value: 90, valueB: 70, color: '#f3ba00', colorB: '#f45d20' },
    { name: '2017 Q2', value: 88, valueB: 91, color: '#ff465a', colorB: '#f45d20' },
    { name: '2017 Q3', value: 87, valueB: 44, color: '#FF8C7B', colorB: '#f45d20' },
    { name: '2017 Q4', value: 86, valueB: 89, color: '#29ab87', colorB: '#f45d20' },
    { name: '2018 Q1', value: 84, valueB: 73, color: '#0292d4', colorB: '#f45d20' },
    { name: '2018 Q2', value: 80, valueB: 52, color: '#d846bf', colorB: '#f45d20' },
    { name: '2018 Q3', value: 77, valueB: 46, color: '#f45d20', colorB: '#f45d20' },
    { name: '2018 Q4', value: 75, valueB: 38, color: '#f3ba00', colorB: '#f45d20' },
    { name: '2019 Q1', value: 74, valueB: 25, color: '#ff465a', colorB: '#f45d20' },
    { name: '2019 Q2', value: 72, valueB: 22, color: '#FF8C7B', colorB: '#f45d20' },
  ],
};

const stackedChartProps = {
  ...chartProps(),
  data: [
    { name: '2016 Q1', valueA: 98, valueB: 0, valueC: 0, id: 1 },
    { name: '2016 Q2', valueA: 96, valueB: 25, valueC: 0, id: 2 },
    { name: '2016 Q3', valueA: 94, valueB: 0, valueC: 23, id: 3 },
    { name: '2016 Q4', valueA: 68, valueB: 0, valueC: 45, id: 4 },
    { name: '2017 Q1', valueA: 56, valueB: 67, valueC: 54, id: 5 },
    { name: '2017 Q2', valueA: 45, valueB: 78, valueC: 0, id: 6 },
    { name: '2017 Q3', valueA: 34, valueB: 89, valueC: 0, id: 7 },
    { name: '2017 Q4', valueA: 0, valueB: 99, valueC: 45, id: 8 },
  ],
  dataKeys: [
    { color: '#29ab87', dataKey: 'valueA', label: 'Value A' },
    { color: '#0292d4', dataKey: 'valueB', label: 'Value B' },
    { color: '#d846bf', dataKey: 'valueC', label: 'Value C' },
  ],
  dataKey: null,
};

const metricsProps = {
  metricsConfig: {
    items: [
      { id: '1', name: 'Average time on page', checked: false },
      { id: '2', name: 'Metric 2', checked: true },
      { id: '3', name: 'Metric 3', checked: false },
    ],
    onChange: () => {},
    limit: number('Selected metrics limit', 1),
  },
};

describe('ColumnChart', () => {
  let wrapper;

  test('verify if created', () => {
    wrapper = mount(<ColumnChart {...chartProps()} />);
    expect(wrapper.find(ColumnChart)).toHaveLength(1);
    wrapper.unmount();
  });

  test('verify if tooltip visibility is triggered', () => {
    wrapper = mount(<ColumnChart {...chartProps()} />);

    wrapper
      .find('.recharts-bar-rectangle')
      .first()
      .simulate('mouseover');

    expect(wrapper.find('.recharts-tooltip-wrapper')).toHaveLength(1);

    wrapper
      .find('.recharts-bar-rectangle')
      .first()
      .simulate('mouseout');

    expect(wrapper.find('.recharts-tooltip-wrapper')).toHaveLength(0);
    wrapper.unmount();
  });

  test('Adds the right class if width is lower than portrait break', () => {
    const { getByTestId } = render(<ColumnChart {...chartProps()} width={600} />);
    expect(getByTestId('column-chart')).toHaveClass('bx--column-chart-portrait');
  });

  test('Should display legend by default if no data were provided', () => {
    const chartPropsEmptyData = { ...chartProps, data: [] };
    const { queryByText } = render(<ColumnChart {...chartPropsEmptyData} width={600} />);
    expect(queryByText('Legend')).toBeInTheDocument();
  });

  test('Sets proper textAnchor for XAxis tick vertical layout', () => {
    const { getAllByText } = render(
      <ColumnChart
        {...chartProps({ data: [{ name: '2016 Q1', value: 98, color: '#29ab87' }] })}
        layout="vertical"
      />
    );
    expect(getAllByText('2016 Q1')[0].closest('text')).toHaveAttribute('text-anchor', 'end');
  });

  describe('should render custom legend content when it is passed as legendContent prop', () => {
    const customLegendContent = <div className="custom-legend-content">custom legend</div>;
    const customLegendSelector = '.custom-legend-content';
    const chartPropsEmptyData = { ...chartProps(), data: [] };

    test('when width is higher than portrait break and there is data passed to the chart', () => {
      const { container } = render(
        <ColumnChart
          {...chartProps()}
          legendContent={customLegendContent}
          portraitBreak={600}
          width={1000}
        />
      );
      expect(container.querySelector(customLegendSelector)).toBeInTheDocument();
    });

    test('when width is lower than portrait break and there is data passed to the chart', () => {
      const { container } = render(
        <ColumnChart
          {...chartProps()}
          legendContent={customLegendContent}
          portraitBreak={1000}
          width={600}
        />
      );
      expect(container.querySelector(customLegendSelector)).toBeInTheDocument();
    });

    test('when width is equal to portrait break and there is data passed to the chart', () => {
      const { container } = render(
        <ColumnChart
          {...chartProps()}
          legendContent={customLegendContent}
          portraitBreak={600}
          width={600}
        />
      );
      expect(container.querySelector(customLegendSelector)).toBeInTheDocument();
    });

    test('when width is higher than portrait break and there is no data passed to the chart', () => {
      const { container } = render(
        <ColumnChart
          {...chartPropsEmptyData}
          legendContent={customLegendContent}
          portraitBreak={600}
          width={1000}
        />
      );
      expect(container.querySelector(customLegendSelector)).toBeInTheDocument();
    });

    test('when width is lower than portrait break and there is no data passed to the chart', () => {
      const { container } = render(
        <ColumnChart
          {...chartPropsEmptyData}
          legendContent={customLegendContent}
          portraitBreak={1000}
          width={600}
        />
      );
      expect(container.querySelector(customLegendSelector)).toBeInTheDocument();
    });

    test('when width is equal to portrait break and there is no data passed to the chart', () => {
      const { container } = render(
        <ColumnChart
          {...chartPropsEmptyData}
          legendContent={customLegendContent}
          portraitBreak={600}
          width={600}
        />
      );
      expect(container.querySelector(customLegendSelector)).toBeInTheDocument();
    });
  });

  test('should render stacks when dataKeys prop was provided', () => {
    const columnChart = render(<ColumnChart {...stackedChartProps} />);
    const barSelector = '.recharts-bar';

    expect(columnChart.container.querySelectorAll(barSelector)).toHaveLength(3);
    const checkboxA = columnChart.getByLabelText('Value A');

    fireEvent.click(checkboxA);
    expect(columnChart.container.querySelectorAll(barSelector)).toHaveLength(2);
  });

  test('should render original data bar before comparison data bar in comparison mode', () => {
    const columnChart = render(<ColumnChart {...comparisonProps} />);

    const firstBar = columnChart.container
      .querySelectorAll('.recharts-layer.recharts-bar-rectangles')[0]
      .querySelectorAll('path')[0];
    const secondBar = columnChart.container
      .querySelectorAll('.recharts-layer.recharts-bar-rectangles')[1]
      .querySelectorAll('path')[0];

    expect(firstBar).toHaveAttribute('fill', '#29ab87');
    expect(secondBar).toHaveAttribute('fill', '#f45d20');
  });

  test('should render chart with metrics', () => {
    const { getByTestId } = render(<ColumnChart {...chartProps()} {...metricsProps} />);

    expect(getByTestId('chart-metrics')).toBeInTheDocument();
    expect(getByTestId('recharts__legend')).toBeInTheDocument();
  });

  test('should render metrics and legend when no data', () => {
    const { getByTestId, queryByTestId } = render(
      <ColumnChart {...chartProps({ data: [] })} {...metricsProps} />
    );

    expect(getByTestId('chart-metrics')).toBeInTheDocument();
    expect(queryByTestId('recharts__legend')).toBeInTheDocument();
  });
});
