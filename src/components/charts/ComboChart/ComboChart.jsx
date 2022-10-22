/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import settings from '../../../settings';
import classNames from 'classnames';
import {
  YAxis,
  XAxis,
  Line,
  Bar,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Label,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ZoomIn, ZoomOut, OverflowMenuVertical } from '@carbon/icons-react';
// TODO:   Why are combocharts so complex?  simplify!

import CustomLegend from '../components/CustomLegend';
import CustomEmptyState from '../components/CustomEmptyState';
import {Loading} from '@carbon/react';
import ChartMetrics, {
  chartMetricsPropTypes,
  chartMetricsDefaultPropTypes,
} from '../chart-metrics/ChartMetrics';
import { adjustCursorPosition } from '../column-chart/utilities';

import LegendIcon from './LegendIcon';

const { prefix } = settings;
const buildClass = (sufix = '') => `${prefix}--combo-chart${sufix}`;
const legendWidth = 200;

export const defaultTooltipFormatter = (value, name) => {
  let finalName = `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
  if (finalName.charAt(0) === 'Y') {
    finalName = finalName.substr(1);
  }
  return [value, finalName];
};

const ComboChart = ({
  // chart props
  data,
  dotFill,
  chartMargin,
  height,
  title,
  width,
  withLegend,
  barSize,
  strokeWidth,
  showLoadingIndicator,

  // legend props
  barLabel,
  lineLabel,
  metricsConfig,
  portraitBreak,
  selectAllEntriesAfterAllWereDeselected,

  // grid props
  showHorizontalGrid,
  showVerticalGrid,

  // tooltip props
  tooltipFormatter,
  tooltipLabelFormatter,

  // y-axis props
  yAxis,
  yAxisDataKeys,
  yAxisLabel,
  yAxisLabelOffset,
  yAxisRightLabel,
  yAxisRightLabelOffset,
  yAxisTick,
  yAxisTickCount,
  yAxisTickFormatter,

  // x-axis props
  xAxis,
  xAxisDataKey,
  xAxisLabel,
  xAxisLabelOffset,
  xAxisTick,
  xAxisTickCount,
  xAxisTickFormatter,
}) => {
  const [hiddenEntries, setHiddenEntries] = useState([]);
  const [legendCollapsed, setLegendCollapsed] = useState(false);
  const isPortrait = width <= portraitBreak;

  const tooltipRef = useRef(null);
  const chartRef = useRef(null);

  const legendItems = [
    {
      className: '__icon-bar',
      value: barLabel,
      isSquare: true,
    },
    {
      className: '__icon-line',
      value: lineLabel,
    },
  ].filter(item => !!item.value);

  const filterDataForDisplay = (entryNamesToSkip, inputData) => {
    let outputData = { ...inputData };
    outputData = inputData.filter(entry => !entryNamesToSkip.includes(entry.name));
    return outputData;
  };

  const shouldNotDisplayValues = (dataElement, visibleElements) => {
    const visibleKeys = visibleElements.flatMap(entry => [entry.lineKey, entry.barKey]);
    return visibleKeys.every(key =>
      dataElement.every(point => point.hasOwnProperty(key) && point[key] === 0)
    );
  };

  const visibleData = filterDataForDisplay(hiddenEntries, yAxisDataKeys);
  const isChartEmpty = shouldNotDisplayValues(data, visibleData);

  const renderLegend = () => {
    const handleLegendChange = hiddenData => setHiddenEntries(hiddenData);

    const handleMetricChange = metric => {
      const { onChange } = metricsConfig;
      onChange(metric);
      setHiddenEntries([]);
    };

    const withMetrics = !isPortrait && !!metricsConfig?.items?.length;

    const legendData = yAxisDataKeys.map(({ name, lineColor, barColor, id }) => ({
      name,
      color: lineColor || barColor,
      id,
    }));

    return (
      <div
        className={classNames({
          [buildClass('__custom-legend')]: isChartEmpty && !isPortrait,
        })}
        style={{ maxWidth: width }}
      >
        {(withMetrics && <ChartMetrics {...metricsConfig} onChange={handleMetricChange} />) || null}
        <CustomLegend
          collapsable={isPortrait}
          collapsed={legendCollapsed}
          data={legendData}
          onChange={handleLegendChange}
          onCollapse={() => setLegendCollapsed(collapsed => !collapsed)}
          selectAllEntriesAfterAllWereDeselected={selectAllEntriesAfterAllWereDeselected}
          unselectedEntries={hiddenEntries}
          withMetrics={withMetrics}
        />
      </div>
    );
  };

  const className = classNames(buildClass(), {
    [buildClass('-portrait')]: isPortrait,
  });

  const onMouseMove = useCallback((d, id, e) => {
    adjustCursorPosition(e, chartRef.current.container, tooltipRef.current.wrapperNode);
  }, []);

  const lines = [];
  const bars = [];
  visibleData.forEach(({ barKey, barColor, lineKey, lineColor, id }) => {
    bars.push(
      <Bar
        key={`cell-${id}`}
        barSize={barSize}
        dataKey={barKey}
        fill={barColor}
        maxBarSize={100}
        onMouseMove={onMouseMove}
      />
    );
    lines.push(
      <Line
        key={`line-${id}`}
        activeDot={false}
        dataKey={lineKey}
        dot={{
          r: 4,
        }}
        fill={dotFill ? lineColor : '#ffffff'}
        stroke={lineColor}
        strokeWidth={strokeWidth}
        type="linear"
      />
    );
  });

  const rightLabelOffset =
    !withLegend || isPortrait
      ? width - yAxisRightLabelOffset
      : width - yAxisRightLabelOffset - legendWidth;

  return (
    <div className={className} data-testid="combo-chart">
      {showLoadingIndicator ? (
        <Loading alignCenter withOverlay={false} />
      ) : (
        <>
          {!!title && <div className={buildClass('__header')}>{title}</div>}

          {!!legendItems.length && !withLegend && (
            <div className={buildClass('__legend')}>
              {legendItems.map(item => (
                <div key={item.className} className={buildClass('__legend__item')}>
                  <LegendIcon
                    className={classNames(
                      buildClass('__legend__icon'),
                      buildClass(`__legend__icon${item.className}`)
                    )}
                    item={item}
                    size={8}
                  />
                  {item.value}
                </div>
              ))}
            </div>
          )}
          <div className={buildClass('__controls')}>
            <ZoomIn size={16} />
            <ZoomOut size={16} />
            <OverflowMenuVertical size={16} />
          </div>
          <div className={buildClass('__chart')}>
            {isPortrait && !!metricsConfig?.items?.length && (
              <ChartMetrics {...metricsConfig} width={width} />
            )}
            {isChartEmpty ? (
              <>
                <CustomEmptyState height={height} />
                {withLegend && !isPortrait && renderLegend()}
              </>
            ) : (
              <ResponsiveContainer height={height} width="100%">
                <ComposedChart
                  ref={chartRef}
                  data={data}
                  margin={{
                    left: yAxisLabel && 20,
                    top: 20,
                    bottom: xAxisLabel && 30,
                    right: 20,
                    ...chartMargin,
                  }}
                >
                  <CartesianGrid horizontal={showHorizontalGrid} vertical={showVerticalGrid} />
                  {yAxis && (
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
                      {!!yAxisLabel && (
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
                      {!!yAxisRightLabel && (
                        <Label
                          angle={90}
                          offset={rightLabelOffset}
                          position="right"
                          style={{
                            textAnchor: 'middle',
                          }}
                          value={yAxisRightLabel}
                        />
                      )}
                    </YAxis>
                  )}
                  {xAxis && (
                    <XAxis
                      axisLine={false}
                      dataKey={xAxisDataKey}
                      tick={xAxisTick}
                      tickCount={xAxisTickCount}
                      tickFormatter={xAxisTickFormatter}
                      tickLine={false}
                    >
                      {!!xAxisLabel && (
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
                  )}
                  <Tooltip
                    ref={tooltipRef}
                    formatter={tooltipFormatter}
                    isAnimationActive={false}
                    itemStyle={{
                      padding: 0,
                    }}
                    labelFormatter={tooltipLabelFormatter}
                    labelStyle={{
                      padding: 0,
                    }}
                    offset={null}
                    wrapperStyle={{
                      padding: 0,
                    }}
                  />
                  {bars}
                  {lines}
                  {withLegend && !isPortrait && (
                    <Legend
                      align="right"
                      content={renderLegend}
                      layout="vertical"
                      verticalAlign="top"
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
          {isPortrait && renderLegend()}
        </>
      )}
    </div>
  );
};

ComboChart.propTypes = {
  barLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  barSize: PropTypes.number,
  chartMargin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dotFill: PropTypes.bool,
  height: PropTypes.number.isRequired,
  lineLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  metricsConfig: PropTypes.shape(chartMetricsPropTypes),
  portraitBreak: PropTypes.number,
  selectAllEntriesAfterAllWereDeselected: PropTypes.bool,
  showHorizontalGrid: PropTypes.bool,
  showLoadingIndicator: PropTypes.bool,
  showVerticalGrid: PropTypes.bool,
  strokeWidth: PropTypes.number,
  title: PropTypes.string,
  tooltipFormatter: PropTypes.func,
  tooltipLabelFormatter: PropTypes.func,
  width: PropTypes.number.isRequired,
  withLegend: PropTypes.bool,
  xAxis: PropTypes.bool,
  xAxisDataKey: PropTypes.string,
  xAxisLabel: PropTypes.string,
  xAxisLabelOffset: PropTypes.string,
  xAxisTick: PropTypes.node,
  xAxisTickCount: PropTypes.number,
  xAxisTickFormatter: PropTypes.func,
  yAxis: PropTypes.bool,
  yAxisDataKeys: PropTypes.arrayOf(
    PropTypes.shape({
      barColor: PropTypes.string,
      barKey: PropTypes.string,
      lineColor: PropTypes.string,
      lineKey: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  yAxisLabel: PropTypes.string,
  yAxisLabelOffset: PropTypes.string,
  yAxisRightLabel: PropTypes.string,
  yAxisRightLabelOffset: PropTypes.number,
  yAxisTick: PropTypes.node,
  yAxisTickCount: PropTypes.number,
  yAxisTickFormatter: PropTypes.func,
};

ComboChart.defaultProps = {
  barLabel: undefined,
  barSize: 80,
  chartMargin: {},
  data: [],
  dotFill: true,
  lineLabel: undefined,
  metricsConfig: chartMetricsDefaultPropTypes,
  portraitBreak: 672,
  selectAllEntriesAfterAllWereDeselected: true,
  showHorizontalGrid: true,
  showLoadingIndicator: false,
  showVerticalGrid: false,
  strokeWidth: 2,
  title: '',
  tooltipFormatter: defaultTooltipFormatter,
  tooltipLabelFormatter: undefined,
  withLegend: false,
  xAxis: true,
  xAxisDataKey: 'x',
  xAxisLabel: undefined,
  xAxisLabelOffset: undefined,
  xAxisTick: undefined,
  xAxisTickCount: 7,
  xAxisTickFormatter: undefined,
  yAxis: true,
  yAxisDataKeys: [
    {
      name: 'sample',
      lineKey: 'yLine',
      barKey: 'yBar',
      barColor: '#29ab87',
      lineColor: '#33ccff',
      id: 1,
    },
  ],
  yAxisLabel: undefined,
  yAxisLabelOffset: undefined,
  yAxisRightLabel: null,
  yAxisRightLabelOffset: 85,
  yAxisTick: undefined,
  yAxisTickCount: undefined,
  yAxisTickFormatter: undefined,
};

export default ComboChart;
