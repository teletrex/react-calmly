/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import Widget from "../widget/Widget";
import ChartWidget from "../widget/ChartWidget";
import ComboChart from '../charts/ComboChart';
import {useFormat, DATE_FORMAT} from '../format';

const SalesByWeekWidget = props => {

  const numberData = () =>
   [
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
    ];

  const dateData = () => [
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
    ];

  const multipleData = () => [
      {
        x: '2022-06-14',
        line1: 5900,
        bar1: 6500,
        line2: 4554,
        bar2: 4566,
        id: 1,
      },
      {
        x: '2022-06-15',
        line1: 5700,
        bar1: 8000,
        line2: 4586,
        bar2: 5667,
        id: 2,
      },
      {
        x: '2022-06-16',
        line1: 6000,
        bar1: 6500,
        line2: 5674,
        bar2: 5674,
        id: 3,
      },
      {
        x: '2022-06-17',
        line1: 5500,
        bar1: 3800,
        line2: 4756,
        bar2: 3546,
        id: 4,
      },
      {
        x: '2022-06-18',
        line1: 4300,
        bar1: 6300,
        line2: 5768,
        bar2: 3384,
        id: 5,
      },
      {
        x: '2022-06-19',
        line1: 4200,
        bar1: 7100,
        line2: 3546,
        bar2: 3546,
        id: 6,
      },
      {
        x: '2022-06-20',
        line1: 4100,
        bar1: 1200,
        line2: 4567,
        bar2: 4889,
        id: 7,
      },
    ];

  const baseProps = data => ({
    width:  100,
    height: 250,
    data:dateData(),
    xAxis: true,
    yAxis: true,
    yAxisTickCount: 5,
    xAxisTickCount: 5,
    showLoadingIndicator: false
  });

  const metricsProps = () => ({
    metricsConfig: {
      items: [
        { id: "1", name: 'Average time on page', checked: false },
        { id: "2", name: 'Metric 2', checked: true },
        { id: "3", name: 'Metric 3', checked: false },
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



  return (
    <ChartWidget {...props}>
      <ComboChart
        {...baseProps(dateData())}
        barLabel={'Sales'}
        barSize={48}
        chartMargin={{
          bottom: 70,
        }}


        lineLabel={ 'Volume'}
        title={''}
        tooltipFormatter={(value, name) => {
          const names = {
            yLine: 'Submitted Deals',
            yBar: 'Optimized Deals',
          };
          return [value, names[name]];
        }}
       // tooltipLabelFormatter={label => formatDate(label, DATE_FORMAT.DATE)}
        xAxisLabel={'Date'}
        xAxisLabelOffset="50"
        xAxisTick={<CustomTick />}
        yAxisLabel={'Net sales ($)'}
        yAxisTickFormatter={value => (value > 1000 ? `${value / 1000}k` : value)}
      />
    </ChartWidget>

  )
}

export default SalesByWeekWidget;
