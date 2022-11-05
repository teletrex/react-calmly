/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { object, text, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { DATE_FORMAT, useFormat } from '../../format';

import ComboChart from '.';

const numberData = () =>
  object('data', [
    {
      x: 0,
      yLine: 10,
      yBar: 5,
      id: 1,
    },
    {
      x: 1,
      yLine: 16,
      yBar: 15,
      id: 2,
    },
    {
      x: 2,
      yLine: 7,
      yBar: 10,
      id: 3,
    },
    {
      x: 3,
      yLine: 20,
      yBar: 12,
      id: 4,
    },
    {
      x: 4,
      yLine: 13,
      yBar: 19,
      id: 5,
    },
  ]);

const dateData = () =>
  object('data', [
    {
      x: '2019-06-14',
      yLine: 5900,
      yBar: 6500,
      id: 1,
    },
    {
      x: '2019-06-15',
      yLine: 5700,
      yBar: 8000,
      id: 2,
    },
    {
      x: '2019-06-16',
      yLine: 6000,
      yBar: 6500,
      id: 3,
    },
    {
      x: '2019-06-17',
      yLine: 5500,
      yBar: 3800,
      id: 4,
    },
    {
      x: '2019-06-18',
      yLine: 4300,
      yBar: 6300,
      id: 5,
    },
    {
      x: '2019-06-19',
      yLine: 4200,
      yBar: 7100,
      id: 6,
    },
    {
      x: '2019-06-20',
      yLine: 4100,
      yBar: 1200,
      id: 7,
    },
  ]);

const multipleData = () =>
  object('data', [
    {
      x: '2019-06-14',
      line1: 5900,
      bar1: 6500,
      line2: 4554,
      bar2: 4566,
      id: 1,
    },
    {
      x: '2019-06-15',
      line1: 5700,
      bar1: 8000,
      line2: 4586,
      bar2: 5667,
      id: 2,
    },
    {
      x: '2019-06-16',
      line1: 6000,
      bar1: 6500,
      line2: 5674,
      bar2: 5674,
      id: 3,
    },
    {
      x: '2019-06-17',
      line1: 5500,
      bar1: 3800,
      line2: 4756,
      bar2: 3546,
      id: 4,
    },
    {
      x: '2019-06-18',
      line1: 4300,
      bar1: 6300,
      line2: 5768,
      bar2: 3384,
      id: 5,
    },
    {
      x: '2019-06-19',
      line1: 4200,
      bar1: 7100,
      line2: 3546,
      bar2: 3546,
      id: 6,
    },
    {
      x: '2019-06-20',
      line1: 4100,
      bar1: 1200,
      line2: 4567,
      bar2: 4889,
      id: 7,
    },
  ]);

const baseProps = data => ({
  width: number('width', '100%'),
  height: number('height', 400),
  data,
  xAxis: boolean('show X axis', true),
  yAxis: boolean('show Y axis', true),
  yAxisTickCount: number('y-axis ticks number', 5),
  xAxisTickCount: number('x-axis ticks number', 5),
  showLoadingIndicator: boolean('Show loading indicator (simulate chart loading)', false),
});

const metricsProps = () => ({
  metricsConfig: {
    items: [
      { id: 1, name: 'Average time on page', checked: false },
      { id: 2, name: 'Metric 2', checked: true },
      { id: 3, name: 'Metric 3', checked: false },
    ],
    onChange: () => {},
    limit: 2,
  },
});

// eslint-disable-next-line
const CustomTick = ({ x, y, _stroke, payload }) => {
  const { formatDate } = useFormat();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        className="recharts-cartesian-axis-tick-value"
        dy={16}
        fill="#666"
        textAnchor="end"
        transform="rotate(-45)"
        x={0}
        y={0}
      >
        <tspan>{formatDate(payload.value, DATE_FORMAT.DATE)}</tspan>
      </text>
    </g>
  );
};

const ComboChartWithDates = () => {
  const { formatDate } = useFormat();
  return (
    <ComboChart
      {...baseProps(dateData())}
      barLabel={text('bar label', 'Unique users Y')}
      barSize={48}
      chartMargin={{
        bottom: 70,
      }}
      lineLabel={text('line label', 'Unique users X')}
      title={text('title', 'Combo Chart lorem ipsum')}
      tooltipFormatter={(value, name) => {
        const names = {
          yLine: 'Unique users X',
          yBar: 'Unique users Y',
        };
        return [value, names[name]];
      }}
      tooltipLabelFormatter={label => formatDate(label, DATE_FORMAT.DATE)}
      xAxisLabel={text('x-Axis title', 'Date')}
      xAxisLabelOffset="50"
      xAxisTick={<CustomTick />}
      yAxisLabel={text('y-Axis title', 'Page views')}
      yAxisTickFormatter={value => (value > 1000 ? `${value / 1000}k` : value)}
    />
  );
};

const MultipleComboChartWithDates = extraProps => {
  const { formatDate } = useFormat();
  return (
    <ComboChart
      {...baseProps(multipleData())}
      barLabel={text('bar label', 'Unique users Y')}
      barSize={48}
      chartMargin={{
        bottom: 70,
      }}
      dotFill={false}
      lineLabel={text('line label', 'Unique users X')}
      title={text('title', 'Combo Chart lorem ipsum')}
      tooltipFormatter={(value, name) => {
        const names = {
          line1: 'Page 1 X',
          bar1: 'Page 1 Y',
          line2: 'Page 2 X2',
          bar2: 'Page 2 Y2',
        };
        return [value, names[name]];
      }}
      tooltipLabelFormatter={label => formatDate(label, DATE_FORMAT.DATE)}
      withLegend
      xAxisLabel={text('X-Axis label', 'Date')}
      xAxisLabelOffset="50"
      xAxisTick={<CustomTick />}
      yAxisDataKeys={[
        {
          name: 'Page 1',
          lineKey: 'line1',
          barKey: 'bar1',
          lineColor: '#29ab87',
          barColor: '#29ab87',
          id: 1,
        },
        {
          name: 'Page 2',
          lineKey: 'line2',
          barKey: 'bar2',
          lineColor: '#0292d4',
          barColor: '#0292d4',
          id: 2,
        },
      ]}
      yAxisLabel={text('Y-Axis label', 'Page views')}
      yAxisRightLabel="Unique visitors"
      yAxisTickFormatter={value => (value > 1000 ? `${value / 1000}k` : value)}
      {...extraProps}
    />
  );
};

storiesOf('WIP/Combo Chart', module)
  .add('default', () => <ComboChart {...baseProps(numberData())} />)
  .add('with title', () => (
    <ComboChart {...baseProps(numberData())} title={text('title', 'Combo Chart lorem ipsum')} />
  ))
  .add('with dates', () => <ComboChartWithDates />)
  .add('multiple with legend', () => <MultipleComboChartWithDates />)
  .add('with metrics', () => <MultipleComboChartWithDates {...metricsProps()} />)
  .add('portrait', () => <MultipleComboChartWithDates width={600} />)
  .add('portrait with metrics', () => (
    <MultipleComboChartWithDates {...metricsProps()} width={600} />
  ));
