/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, object, text } from '@storybook/addon-knobs';

import {
  defaultTooltipLabelFormatter,
  defaultTooltipValueFormatter,
} from '../components/defaultTooltipFormatters';

import ColumnChart from '.';

const TRUNCATE_DATA = [
  {
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    value: 98,
    valueB: 30,
    color: '#29ab87',
    colorB: '#f45d20',
    id: 1,
  },
  {
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    value: 96,
    valueB: 25,
    color: '#0292d4',
    colorB: '#f45d20',
    id: 2,
  },
  {
    name: 'Lorem ipsumdolorsitamet, consectetur adipiscing elit',
    value: 94,
    valueB: 66,
    color: '#d846bf',
    colorB: '#f45d20',
    id: 3,
  },
];

const METRICS_GROUP = 'metrics';
const LEGEND_GROUP = 'legend';

const chartProps = overrides => ({
  data: object('data', [
    {
      name: text('legend name (1): ', '2016 Q1', LEGEND_GROUP),
      value: 98,
      valueB: 30,
      color: '#29ab87',
      colorB: '#f45d20',
      id: 1,
    },
    {
      name: text('legend name (2): ', '2016 Q2', LEGEND_GROUP),
      value: 96,
      valueB: 25,
      color: '#0292d4',
      colorB: '#f45d20',
      id: 2,
    },
    {
      name: text('legend name (3): ', '2016 Q3', LEGEND_GROUP),
      value: 94,
      valueB: 66,
      color: '#d846bf',
      colorB: '#f45d20',
      id: 3,
    },
  ]),
  showLoadingIndicator: boolean('Show loading indicator (simulate chart loading)', false),
  labelColor: '#13173D',
  labelFontSize: 14,
  legendColor: '#13173D',
  legendFontSize: 11,
  title: 'Bar chart title',
  xAxis: boolean('show X axis', true),
  yAxis: boolean('show Y axis', true),
  yAxisTitle: text('y-axis title', 'No. of transaction [k]'),
  xAxisTitle: text('x-axis title', 'Quarter'),
  yAxisTickCount: number('y-axis ticks number', 5),
  xAxisTickCount: number('x-axis ticks number', 5),
  yAxisTickMaxLines: number('y-axis single tick lines liimt', 2),
  xAxisProps: object('x-axis props', { height: 100 }),
  yAxisProps: object('y-axis props', { width: 140 }),
  tooltipLabelFormatter: (name, entry) =>
    entry?.payload?.name || defaultTooltipLabelFormatter(name),
  tooltipValueFormatter: (value, valueLabel, entry) =>
    entry?.payload?.value || defaultTooltipValueFormatter(value, valueLabel),
  ...overrides,
});

const stackChartProps = () => ({
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
});

const metricsProps = () => ({
  metricsConfig: {
    label: text('label', '', METRICS_GROUP),
    helperText: text('Multiselect helper text [for limit > 1]', '', METRICS_GROUP),
    placeholder: text('Multiselect text [for limit > 1]', '', METRICS_GROUP),
    items: [
      {
        id: 1,
        name: text('metrics label(1): ', 'Average time on page', METRICS_GROUP),
        checked: false,
      },
      { id: 2, name: text('metrics label(2): ', 'Metric 2', METRICS_GROUP), checked: true },
      { id: 3, name: text('metrics label(3): ', 'Metric 3', METRICS_GROUP), checked: false },
    ],
    limit: number('Selected metrics limit', 1, { min: 0 }, METRICS_GROUP),
    onChange: () => {},
  },
});

const gridLayoutProps = () => ({
  gridLayout: {
    horizontal: boolean('Horizontal grid layout', true),
    vertical: boolean('Vertical grid layout', false),
  },
});

storiesOf('WIP/ColumnChart', module)
  .add('horizontal', () => <ColumnChart {...chartProps()} {...gridLayoutProps()} />)
  .add('horizontal with xAxis labels truncation', () => (
    <ColumnChart
      layout="horizontal"
      {...chartProps({ data: TRUNCATE_DATA })}
      {...gridLayoutProps()}
    />
  ))
  .add('horizontal with xAxis formatted labels truncation', () => (
    <ColumnChart
      layout="horizontal"
      {...chartProps({ data: TRUNCATE_DATA })}
      {...gridLayoutProps()}
      xAxisTickFormatter={value => `$${value.toString().repeat(10)}$`}
    />
  ))
  .add('vertical', () => <ColumnChart layout="vertical" {...chartProps()} {...gridLayoutProps()} />)
  .add('vertical with yAxis labels truncation', () => (
    <ColumnChart
      layout="vertical"
      {...chartProps({ data: TRUNCATE_DATA })}
      {...gridLayoutProps()}
    />
  ))
  .add('vertical with yAxis formated labels truncation', () => (
    <ColumnChart
      layout="vertical"
      {...chartProps({ data: TRUNCATE_DATA })}
      {...gridLayoutProps()}
      yAxisTickFormatter={value => `$${value.repeat(10)}$`}
    />
  ))
  .add('with metrics', () => <ColumnChart {...chartProps()} {...metricsProps()} />)
  .add('empty data with metrics', () => (
    <ColumnChart
      {...chartProps({
        data: [
          {
            name: text('legend name (1): ', '2016 Q1', LEGEND_GROUP),
            value: 0,
            valueB: 0,
            color: '#29ab87',
            colorB: '#f45d20',
            id: 1,
          },
        ],
      })}
      {...metricsProps()}
    />
  ))
  .add('portrait', () => <ColumnChart {...chartProps()} width={600} />)
  .add('portrait with metrics', () => (
    <ColumnChart {...chartProps()} width={600} {...metricsProps()} />
  ))
  .add('with comparison', () => (
    <ColumnChart
      {...chartProps()}
      {...metricsProps()}
      comparingGroupKey="valueB"
      tooltipLabelFormatter={(name, entry) =>
        defaultTooltipLabelFormatter(`${entry?.payload?.name} ${name}`)
      }
    />
  ))
  .add('horizontal with comparison', () => (
    <ColumnChart
      layout="vertical"
      {...chartProps()}
      comparingGroupKey="valueB"
      {...gridLayoutProps()}
      tooltipLabelFormatter={(name, entry) =>
        defaultTooltipLabelFormatter(`${entry?.payload?.name} ${name}`)
      }
    />
  ))
  .add('with stacks', () => (
    <ColumnChart
      {...stackChartProps()}
      tooltipLabelFormatter={(name, entry) =>
        defaultTooltipLabelFormatter(`${entry?.payload?.name} ${name}`)
      }
      tooltipValueFormatter={value => value}
    />
  ))
  .add('with y axis formatter', () => (
    <ColumnChart
      {...stackChartProps()}
      tooltipValueFormatter={value => value}
      yAxisTickFormatter={value => value + 2345667790815762365152612}
      yAxisTitle="Expenses [$]"
    />
  ));
