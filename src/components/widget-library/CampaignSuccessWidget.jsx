/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import ChartWidget from '../widget/ChartWidget';
import { DATE_FORMAT} from '../format';

import {useFormat }from '../format';

import MultiChart from '../charts/multi-chart';


// eslint-disable-next-line
export const CustomTick = ({ x, y, _stroke, payload }) => {
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

export const multiDateData = [
  {
    x: '2019-06-14',
    yLine: 19,
    yDashed: 22,
    bounds: [14, 30],
  },
  {
    x: '2019-06-15',
    yLine: 21,
    yDashed: 20,
    bounds: [14, 29],
  },
  {
    x: '2019-06-16',
    yLine: 32,
    yDashed: 30,
    bounds: [15, 41],
  },
  {
    x: '2019-06-17',
    yLine: 33,
    yDashed: 30,
    bounds: [16, 41],
  },
  {
    x: '2019-06-18',
    yLine: 36,
    yDashed: 29,
    bounds: [16, 42],
  },
  {
    x: '2019-06-19',
    yLine: 30,
    yDashed: 32,
    bounds: [14, 39],
  },
  {
    x: '2019-06-20',
    yLine: 28,
    yDashed: 30,
    bounds: [15, 38],
  },
  {
    x: '2019-06-21',
    yLine: 24,
    yDashed: 28,
    bounds: [15, 37],
  },
  {
    x: '2019-06-22',
    yLine: 24,
    yDashed: 23,
    bounds: [14, 35],
  },
  {
    x: '2019-06-23',
    yLine: 27,
    yDashed: 24,
    bounds: [16, 37],
  },
  {
    x: '2019-06-24',
    yLine: 7,
    yLineIsAlert: true,
    yDashed: 25,
    bounds: [17, 40],
  },
  {
    x: '2019-06-25',
    yLine: 31,
    yDashed: 30,
    bounds: [20, 41],
  },
  {
    x: '2019-06-26',
    yLine: 34,
    yDashed: 32,
    bounds: [22, 42],
  },
  {
    x: '2019-06-27',
    yLine: 37,
    yDashed: 38,
    bounds: [25, 47],
  },
  {
    x: '2019-06-28',
    yLine: 35,
    yDashed: 37,
    bounds: [27, 50],
  },
  {
    x: '2019-06-29',
    yLine: 38,
    yDashed: 40,
    bounds: [29, 55],
  },
  {
    x: '2019-06-30',
    yLine: 40,
    yDashed: 38,
    bounds: [30, 55],
  },
  {
    x: '2019-07-01',
    yLine: 40,
    yDashed: 40,
    bounds: [30, 51],
  },
  {
    x: '2019-07-02',
    yLine: 57,
    yLineIsAlert: true,
    yDashed: 42,
    bounds: [32, 50],
  },
];


const tooltipFormatter = (value, name, entry) => {
  let finalName = name;
  let finalValue = value;
  switch (name) {
    case 'yLine':
      finalName = entry.payload.yLineIsAlert ? 'Anomaly' : 'Actual';
      break;
    case 'yDashed':
      finalName = 'Expected';
      break;
    case 'bounds':
      finalName = 'Bounds';
      break;
    default:
      break;
  }
  if (Array.isArray( value)) {
    finalValue = value.join(' ~ ');
  }
  return [finalValue, finalName];
};


const CampaignSuccessWidget = props => {
  const { formatDate } = useFormat();
  const myTooltipFormatter = (value, name, entry) => {
    let finalName = name;
    let finalValue = value;
    switch (name) {
    case 'yLine':
      finalName = entry.payload.yLineIsAlert ? 'Anomaly' : 'Actual';
      break;
    case 'yDashed':
      finalName = 'Expected';
      break;
    case 'bounds':
      finalName = 'Bounds';
      break;
    default:
      break;
  }
  if (Array.isArray( value)) {
    finalValue = value.join(' ~ ');
  }
  return [finalValue, finalName];
};


  return (
    <ChartWidget {...props}>
      <MultiChart
        alertLabel="Anomaly"
        boundsLabel="Bounds"
        chartMargin={{
          bottom: 70,
          left: -16,
        }}
        dashedLabel="Expected"
        data={multiDateData}
        height={280}
        lineLabel="Actual"
        tooltipFormatter={myTooltipFormatter}
        tooltipLabelFormatter={date => formatDate(date, DATE_FORMAT.DATE)}
        width="100%"
        xAxisLabel={"Date"}
        xAxisLabelOffset="50"
        xAxisTick={<CustomTick />}
        yAxisTickFormatter={value => `${value}%`}
      />
    </ChartWidget>

  )
}

export default CampaignSuccessWidget;
