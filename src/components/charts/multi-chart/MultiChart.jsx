/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Dot,
  Label,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomEmptyState from '../components/CustomEmptyState';
import { multichartAbsolutePosTooltipProps } from '../components/defaultTooltipProps';

import { ActiveDashedDotWithAlert, ActiveLineDotWithAlert, InactiveDot } from './components/Dot';
import Legend from './components/Legend';
import { buildClass } from '../components/className';

export const defaultTooltipFormatter = (value, name) => {
  let finalName = `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
  let finalValue = value;
  if (finalName.charAt(0) === 'Y') {
    finalName = finalName.substr(1);
  }
  if (isArray(finalValue)) {
    finalValue = finalValue.join(' ~ ');
  }
  return [finalValue, finalName];
};

const MultiChart = ({
  title,
  data,
  chartMargin,
  height,
  width,
  onClick,
  onAnomalyClick,

  // tooltip
  tooltipFormatter,
  tooltipLabelFormatter,

  // cartesian grid props
  showVerticalGrid,
  showHorizontalGrid,

  // labels
  lineLabel,
  dashedLabel,
  boundsLabel,
  alertLabel,

  // axis props
  interval,
  xAxisDataKey,
  xAxisLabel,
  xAxisLabelOffset,
  xAxisTick,
  xAxisTickCount,
  xAxisTickFormatter,

  yAxisAreaDataKey,
  yAxisDashedDataKey,
  yAxisLineDataKey,
  yAxisLabel,
  yAxisLabelOffset,
  yAxisTick,
  yAxisTickCount,
  yAxisTickFormatter,
}) => {
  const tooltipRef = useRef(null);

  const isChartEmpty = data && data
    .map(point => [point.bounds[0], point.bounds[1], point.yDashed, point.yLine])
    .every(line => line.every(val => val === 0));

  const legendItems = [
    {
      className: '__icon-line',
      value: lineLabel,
    },
    {
      className: '__icon-alert',
      value: alertLabel,
    },
    {
      className: '__icon-dashed',
      value: dashedLabel,
    },
    {
      className: '__icon-bounds',
      value: boundsLabel,
    },
  ].filter(item => !!item.value);

  const UNSELECTED = null;
  const [activeLinePointIndex, setActiveLinePointIndex] = useState(UNSELECTED);

  // The following Dot render functions rely on state/props and are passed to
  // the Recharts <Line> component. This, combined with rendering issues of Recharts
  // children components, makes it nearly impossible to test.
  const lineInactiveDot = props => {
    return <InactiveDot {...props} activeLinePointIndex={activeLinePointIndex} />;
  };

  const lineActiveDot = props => {
    const handleDotSelection = ({ index }) => {
      setActiveLinePointIndex(activeLinePointIndex === index ? UNSELECTED : index); // toggle selection
      onAnomalyClick(props);
    };
    return <ActiveLineDotWithAlert {...props} onClick={handleDotSelection} />;
  };

  return (
    <div className={buildClass()} style={{ width, height }}>
      {title && <div className={buildClass('__header')}>{title}</div>}
      <Legend items={legendItems} />
      <div className={buildClass('__chart')}>
        {isChartEmpty ? (
          <CustomEmptyState height={height} width={width} />
        ) : (
          <ResponsiveContainer>
            <ComposedChart
              data={data}
              margin={{
                left: yAxisLabel && 20,
                top: 20,
                bottom: 30,
                right: 20,
                ...chartMargin,
              }}
              onClick={onClick}
            >
              <YAxis
                axisLine={false}
                tick={
                  yAxisTick || {
                    dx: -10,
                  }
                }
                tickCount={yAxisTickCount}
                tickFormatter={yAxisTickFormatter}
                tickLine={{
                  strokeWidth: 1,
                  width: 100,
                }}
                tickSize={5}
              >
                {yAxisLabel && (
                  <Label
                    angle={-90}
                    offset={yAxisLabelOffset}
                    position="left"
                    style={{
                      textAnchor: 'middle',
                    }}
                    value={yAxisLabel}
                  />
                )}
              </YAxis>
              <XAxis
                axisLine={false}
                dataKey={xAxisDataKey}
                interval={interval}
                scale="point"
                tick={xAxisTick}
                tickCount={xAxisTickCount}
                tickFormatter={xAxisTickFormatter}
                tickLine={false}
              >
                {xAxisLabel && (
                  <Label
                    offset={xAxisLabelOffset}
                    position="bottom"
                    style={{
                      textAnchor: 'middle',
                    }}
                    value={xAxisLabel}
                  />
                )}
              </XAxis>
              <Tooltip
                ref={tooltipRef}
                {...multichartAbsolutePosTooltipProps}
                formatter={tooltipFormatter}
                labelFormatter={tooltipLabelFormatter}
                labelStyle={{
                  padding: 0,
                }}
                separator=": "
              />
              <CartesianGrid horizontal={showHorizontalGrid} vertical={showVerticalGrid} />
              <Area
                activeDot={<Dot className={buildClass('__chart-area__dot')} />}
                dataKey={yAxisAreaDataKey}
                type="linear"
              />
              <Line
                activeDot={ActiveDashedDotWithAlert}
                className={buildClass('__chart-dashed')}
                dataKey={yAxisDashedDataKey}
                dot={false}
                strokeDasharray="5 5"
                strokeWidth="2"
                type="linear"
              />
              <Line
                activeDot={lineActiveDot}
                className={buildClass('__chart-line')}
                dataKey={yAxisLineDataKey}
                dot={lineInactiveDot}
                strokeWidth="2"
                type="linear"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

MultiChart.propTypes = {
  alertLabel: PropTypes.string,
  boundsLabel: PropTypes.string,
  chartMargin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  dashedLabel: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      bounds: PropTypes.arrayOf(PropTypes.number).isRequired,
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      yDashed: PropTypes.number.isRequired,
      yDashedIsAlert: PropTypes.bool,
      yLine: PropTypes.number.isRequired,
      yLineIsAlert: PropTypes.bool,
    })
  ).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineLabel: PropTypes.string,
  onAnomalyClick: PropTypes.func,
  onClick: PropTypes.func,
  showHorizontalGrid: PropTypes.bool,
  showVerticalGrid: PropTypes.bool,
  title: PropTypes.string,
  tooltipFormatter: PropTypes.func,
  tooltipLabelFormatter: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xAxisDataKey: PropTypes.string,
  xAxisLabel: PropTypes.string,
  xAxisLabelOffset: PropTypes.string,
  xAxisTick: PropTypes.node,
  xAxisTickCount: PropTypes.number,
  xAxisTickFormatter: PropTypes.func,
  yAxisAreaDataKey: PropTypes.string,
  yAxisDashedDataKey: PropTypes.string,
  yAxisLabel: PropTypes.string,
  yAxisLabelOffset: PropTypes.string,
  yAxisLineDataKey: PropTypes.string,
  yAxisTick: PropTypes.node,
  yAxisTickCount: PropTypes.number,
  yAxisTickFormatter: PropTypes.func,
};

MultiChart.defaultProps = {
  alertLabel: undefined,
  boundsLabel: undefined,
  chartMargin: {},
  dashedLabel: undefined,
  height: '100vh',
  interval: 'preserveEnd',
  lineLabel: undefined,
  onAnomalyClick: noop,
  onClick: noop,
  showHorizontalGrid: true,
  showVerticalGrid: false,
  title: undefined,
  tooltipFormatter: defaultTooltipFormatter,
  tooltipLabelFormatter: undefined,
  width: '100%',
  xAxisDataKey: 'x',
  xAxisLabel: undefined,
  xAxisLabelOffset: undefined,
  xAxisTick: undefined,
  xAxisTickCount: 7,
  xAxisTickFormatter: undefined,
  yAxisAreaDataKey: 'bounds',
  yAxisDashedDataKey: 'yDashed',
  yAxisLabel: undefined,
  yAxisLabelOffset: undefined,
  yAxisLineDataKey: 'yLine',
  yAxisTick: undefined,
  yAxisTickCount: undefined,
  yAxisTickFormatter: undefined,
};

export default MultiChart;
