/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import  settings from '../../../settings';
import { Cell, Label, PieChart, Pie } from 'recharts';

const { prefix } = settings;

const GaugeChart = ({ data, title, dataFormatter, textColor }) => {
  const width = 180;
  const height = width / 2 + 30;
  const pieData = [
    {
      value: 100 - data,
    },
    {
      value: data,
    },
  ];
  const pieProps = {
    startAngle: 0,
    endAngle: 180,
    cx: width / 2,
    cy: width / 2,
  };
  const pieRadius = {
    innerRadius: (width / 2) * 0.8,
    outerRadius: (width / 2) * 0.8,
  };
  const gradientProps = {
    id: 'gradient',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
  };
  const gradientColors = [
    {
      offset: '0%',
      stopColor: '#047970',
    },
    {
      offset: '60%',
      stopColor: '#23deb8',
    },
  ];
  const defaultBowColor = '#e6e7e9';
  const isChartEmpty = data === 0;

  const renderLabel = data => {
    return (
      <text textAnchor="middle" x={width / 2} y={height-20} fill={textColor} >
        {dataFormatter(data)}
      </text>
    );
  };

  return (
    <div className={`${prefix}--gauge-chart-dt`}>
        {isChartEmpty ? (
          <h2>?</h2>
        ) : (
          <PieChart height={height} width={width}>
            <defs>
              <linearGradient {...gradientProps}>
                {gradientColors.map((color, i) => (
                  <stop {...color} key={i} />
                ))}
              </linearGradient>
            </defs>
            <Pie data={pieData} dataKey="value" fill={defaultBowColor} {...pieRadius} {...pieProps}>
              <Cell fill="url(#gradient)" />
              <Label content={renderLabel(data)}  />
            </Pie>
          </PieChart>
        )}
      </div>
  );
};

GaugeChart.defaultProps = {
  data: 0,
  dataFormatter: value => `${value}%`,
  title: '',
};

GaugeChart.propTypes = {
  data: PropTypes.oneOf([...new Array(101)].map((_, i) => i)), // number from range 0 - 100
  dataFormatter: PropTypes.func,
  title: PropTypes.string,
};

export default GaugeChart;
