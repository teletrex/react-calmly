/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import settings  from '../../../settings';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import classNames from 'classnames';

import ChartMetrics, {
  chartMetricsDefaultPropTypes,
  chartMetricsPropTypes,
} from '../chart-metrics/ChartMetrics';
import CustomLegend from '../components/CustomLegend';
//import { ReactComponentPropType } from '../../../components/eleven/utils/prop-types';
import {Loading} from '@carbon/react';
import { defaultTooltipProps } from '../components/defaultTooltipProps';
import CustomTooltip from '../components/CustomTooltip';
import CustomEmptyState from '../components/CustomEmptyState';
import { prepareDataForDisplay } from '../components/common-functions';
import {
  defaultTooltipLabelFormatter,
  defaultTooltipValueFormatter,
} from '../components/defaultTooltipFormatters';

import ColumnChartTooltip from './ColumnChartTooltip';
import EllipsisAxisTick from './EllipsisAxisTick';
import { adjustCursorPosition, axisTypes } from './utilities';

const { prefix } = settings;
const defaultYAxisLabelAngle = 0;
const defaultXAxisLabelAngleHorizontal = -45;
const defaultXAxisLabelAngleVertical = 0;

const layoutProps = {
  horizontal: {
    xAxisDefaultProps: {
      angle: defaultXAxisLabelAngleHorizontal,
      textAnchor: 'end',
      dataKey: 'name',
      type: 'category',
    },
    yAxisDefaultProps: {
      angle: defaultYAxisLabelAngle,
      textAnchor: 'end',
      type: 'number',
    },
  },
  vertical: {
    xAxisDefaultProps: {
      angle: defaultXAxisLabelAngleVertical,
      textAnchor: 'middle',
      type: 'number',
    },
    yAxisDefaultProps: {
      angle: defaultYAxisLabelAngle,
      dataKey: 'name',
      textAnchor: 'end',
      type: 'category',
    },
  },
};

class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
    this.barChartRef = React.createRef();
    this.tooltipRef = React.createRef();
    this.isPortrait = props.width <= props.portraitBreak;
  }

  state = {
    hiddenEntries: [],
    isTooltipVisible: false,
    legendCollapsed: false,
    currentTooltip: null,
  };

  get hasMultipleKeys() {
    const { dataKeys } = this.props;
    return Array.isArray(dataKeys);
  }

  onLegendCollapse = () => {
    this.setState(({ legendCollapsed }) => ({
      legendCollapsed: !legendCollapsed,
    }));
  };

  showToolTip = () => {
    this.setState({ isTooltipVisible: true });
  };

  hideToolTip = () => {
    this.setState({ isTooltipVisible: false });
  };

  renderTooltip = props => {
    const { data } = this.props;
    return <ColumnChartTooltip data={data} {...props} />;
  };

  renderLabel = () => {
    const { labelColor, labelFontSize, yAxisTitle } = this.props;

    return (
      <text
        fill={labelColor}
        fontSize={labelFontSize}
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(-90, 0, 150)"
        x={5}
        y={180}
      >
        {yAxisTitle}
      </text>
    );
  };

  renderCustomLegend = isChartEmpty => {
    const {
      props: {
        data,
        metricsConfig,
        width,
        selectAllEntriesAfterAllWereDeselected,
        legendContent,
        dataKeys,
      },
      state: { hiddenEntries, legendCollapsed },
    } = this;
    const legendData = this.hasMultipleKeys
      ? dataKeys.map(({ label, color }) => ({
          color,
          name: label,
        }))
      : data;
    const withMetrics = !!metricsConfig?.items?.length;

    const handleLegendChange = hiddenData => this.setState({ hiddenEntries: hiddenData });

    const handleMetricChange = metric => {
      const { onChange } = metricsConfig;
      onChange(metric);
      this.setState({ hiddenEntries: [] });
    };

    return (
      <div
        className={classNames({
          [`${prefix}--column-chart__legend`]: !this.isPortrait && isChartEmpty,
        })}
        style={{ maxWidth: width }}
      >
        {withMetrics && !this.isPortrait && (
          <ChartMetrics {...metricsConfig} onChange={handleMetricChange} />
        )}
        {legendContent || (
          <CustomLegend
            collapsable={this.isPortrait}
            collapsed={legendCollapsed}
            data={legendData}
            onChange={handleLegendChange}
            onCollapse={this.onLegendCollapse}
            selectAllEntriesAfterAllWereDeselected={selectAllEntriesAfterAllWereDeselected}
            unselectedEntries={hiddenEntries}
            withMetrics={withMetrics}
          />
        )}
      </div>
    );
  };

  onMouseMove = (d, id, e) => {
    const { barChartRef, tooltipRef } = this;
    adjustCursorPosition(e, barChartRef.current.container, tooltipRef.current.wrapperNode);
  };

  render() {
    const {
      props: {
        aspect,
        barSize,
        comparingGroupKey,
        data,
        dataKey,
        dataKeys,
        gridLayout,
        height,
        labelColor,
        labelFontSize,
        labelOffSet,
        layout,
        legendColor,
        legendContent,
        legendFontSize,
        margin,
        maxHeight,
        maximizerSettings,
        metricsConfig,
        minHeight,
        minWidth,
        showLoadingIndicator,
        title,
        tooltipContent,
        tooltipLabelFormatter,
        tooltipValueFormatter,
        width,
        xAxis,
        xAxisProps,
        xAxisTickCount,
        xAxisTitle,
        xAxisTickFormatter,
        yAxis,
        yAxisProps,
        yAxisTickCount,
        yAxisTickFormatter,
        yAxisTickMaxLines,
      },
      state: { hiddenEntries, isTooltipVisible, currentTooltip },
      barChartRef,
      tooltipRef,
      onMouseMove,
    } = this;

    const { visibleData, isChartEmpty } = prepareDataForDisplay(data, hiddenEntries);

    const { xAxisDefaultProps, yAxisDefaultProps } = layoutProps[layout];

    const calculatedHeight = maximizerSettings?.isMaximized ? maxHeight : height;

    const className = classNames(`${prefix}--column-chart`, {
      [`${prefix}--column-chart--maximized`]: maximizerSettings?.isMaximized,
      [`${prefix}--column-chart--minimized`]: !maximizerSettings?.isMaximized,
      [`${prefix}--column-chart-portrait`]: this.isPortrait,
    });

    const noDataClassName = classNames({ [`${prefix}--no-data`]: isChartEmpty });

    return (
      <div className={className} data-testid="column-chart">
        {showLoadingIndicator ? (
          <Loading alignCenter withOverlay={false} />
        ) : (
          <>
            <div className={`${prefix}--column-chart__header`}>
              <h3 className={`${prefix}--column-chart__title`}>{title}</h3>
              {maximizerSettings && (
                <div className={`${prefix}--column-chart__maximizer`}>
                  {maximizerSettings.button}
                </div>
              )}
            </div>
            {this.isPortrait && !!metricsConfig?.items?.length && (
              <ChartMetrics {...metricsConfig} width={width} />
            )}

            <div className={`${prefix}--chart-wrapper`}>
              {isChartEmpty ? (
                <>
                  <CustomEmptyState height={calculatedHeight} />
                  {this.renderCustomLegend(isChartEmpty)}
                </>
              ) : (
                <ResponsiveContainer
                  aspect={aspect}
                  className={noDataClassName}
                  height={calculatedHeight}
                  maxHeight={maxHeight}
                  minHeight={minHeight}
                  minWidth={minWidth}
                  width="100%"
                >
                  <BarChart
                    ref={barChartRef}
                    data={visibleData}
                    height={calculatedHeight}
                    layout={layout}
                    margin={margin}
                    width={width}
                  >
                    {isTooltipVisible ? (
                      <Tooltip
                        {...defaultTooltipProps}
                        ref={tooltipRef}
                        content={
                          tooltipContent || <CustomTooltip active activeDataKey={currentTooltip} />
                        }
                        formatter={tooltipValueFormatter}
                        isAnimationActive={false}
                        labelFormatter={tooltipLabelFormatter}
                        offset={null}
                      />
                    ) : null}
                    <CartesianGrid
                      horizontal={gridLayout.horizontal}
                      vertical={gridLayout.vertical}
                    />
                    {xAxis && (
                      <XAxis
                        {...xAxisDefaultProps}
                        {...xAxisProps}
                        tick={
                          <EllipsisAxisTick
                            axis={axisTypes.x}
                            fill={legendColor}
                            fontSize={legendFontSize}
                            labelAngle={xAxisProps?.angle || xAxisDefaultProps.angle}
                            maxLines={1}
                            textAnchor={xAxisProps?.textAnchor || xAxisDefaultProps.textAnchor}
                            tickFormatter={xAxisTickFormatter}
                          />
                        }
                        tickCount={xAxisTickCount}
                      >
                        <Label
                          fill={labelColor}
                          fontSize={labelFontSize}
                          fontWeight="bold"
                          offset={labelOffSet}
                          position="bottom"
                          value={xAxisTitle}
                        />
                      </XAxis>
                    )}
                    {yAxis && (
                      <YAxis
                        {...yAxisDefaultProps}
                        {...yAxisProps}
                        tick={
                          <EllipsisAxisTick
                            axis={axisTypes.y}
                            fill={legendColor}
                            fontSize={legendFontSize}
                            labelAngle={yAxisProps?.angle || yAxisDefaultProps.angle}
                            maxLines={yAxisTickMaxLines}
                            textAnchor={yAxisProps?.textAnchor || yAxisDefaultProps.textAnchor}
                            tickFormatter={yAxisTickFormatter}
                          />
                        }
                        tickCount={yAxisTickCount}
                      >
                        <Label content={this.renderLabel} />
                      </YAxis>
                    )}
                    {this.hasMultipleKeys ? (
                      dataKeys
                        .filter(({ label }) => !hiddenEntries.includes(label))
                        .map(({ dataKey, color }) => (
                          <Bar
                            key={dataKey}
                            barSize={barSize}
                            dataKey={dataKey}
                            fill={color}
                            isAnimationActive={false}
                            onBlur={this.hideToolTip}
                            onFocus={this.showToolTip}
                            onMouseMove={onMouseMove}
                            onMouseOut={this.hideToolTip}
                            onMouseOver={() => {
                              this.setState({ isTooltipVisible: true, currentTooltip: dataKey });
                            }}
                            stackId="A"
                          />
                        ))
                    ) : (
                      <Bar
                        barSize={barSize}
                        dataKey={dataKey}
                        isAnimationActive={false}
                        onBlur={this.hideToolTip}
                        onFocus={this.showToolTip}
                        onMouseMove={onMouseMove}
                        onMouseOut={this.hideToolTip}
                        onMouseOver={() => {
                          this.setState({ isTooltipVisible: true, currentTooltip: dataKey });
                        }}
                      >
                        {visibleData.map(({ color, id }) => {
                          return <Cell key={`cell-${id}`} fill={color} />;
                        })}
                      </Bar>
                    )}
                    {comparingGroupKey && (
                      <Bar
                        barSize={barSize}
                        dataKey={comparingGroupKey}
                        isAnimationActive={false}
                        onBlur={this.hideToolTip}
                        onFocus={this.showToolTip}
                        onMouseMove={onMouseMove}
                        onMouseOut={this.hideToolTip}
                        onMouseOver={() => {
                          this.setState({
                            isTooltipVisible: true,
                            currentTooltip: comparingGroupKey,
                          });
                        }}
                      >
                        {visibleData.map(({ colorB, id }) => {
                          return <Cell key={`cell-${id}-B`} fill={colorB} />;
                        })}
                      </Bar>
                    )}

                    {!this.isPortrait && (
                      <Legend
                        align="right"
                        content={() => this.renderCustomLegend(isChartEmpty)}
                        layout="vertical"
                        legendContent={legendContent}
                        verticalAlign="top"
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            {!isChartEmpty && this.isPortrait && this.renderCustomLegend(isChartEmpty)}
          </>
        )}
      </div>
    );
  }
}

ColumnChart.defaultProps = {
  aspect: 0,
  barSize: null,
  comparingGroupKey: '',
  data: [],
  dataKey: 'value',
  dataKeys: null,
  gridLayout: {
    horizontal: true,
    vertical: false,
  },
  height: 370,
  labelColor: '#000000',
  labelFontSize: 14,
  labelOffSet: 30,
  layout: 'horizontal',
  legendColor: '#000000',
  legendContent: null,
  legendFontSize: 12,
  margin: { right: 0, bottom: 50, left: 15 },
  maxHeight: 470,
  maximizerSettings: null,
  metricsConfig: chartMetricsDefaultPropTypes,
  minHeight: 50,
  minWidth: 200,
  portraitBreak: 672,
  selectAllEntriesAfterAllWereDeselected: true,
  showLoadingIndicator: false,
  title: '',
  tooltipContent: null,
  tooltipLabelFormatter: defaultTooltipLabelFormatter,
  tooltipValueFormatter: defaultTooltipValueFormatter,
  width: 850,
  xAxis: true,
  xAxisProps: {},
  xAxisTickFormatter: undefined,
  xAxisTitle: '',
  yAxis: true,
  yAxisProps: {},
  yAxisTickFormatter: undefined,
  yAxisTickMaxLines: 2,
  yAxisTitle: '',
};

ColumnChart.propTypes = {
  aspect: PropTypes.number,
  barSize: PropTypes.number,
  comparingGroupKey: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dataKey: PropTypes.string,
  dataKeys: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      dataKey: PropTypes.string,
    })
  ),
  gridLayout: PropTypes.shape({
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
  }),
  height: PropTypes.number,
  labelColor: PropTypes.string,
  labelFontSize: PropTypes.number,
  labelOffSet: PropTypes.number,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  legendColor: PropTypes.string,
  legendContent: PropTypes.node,
  legendFontSize: PropTypes.number,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
  maxHeight: PropTypes.number,
  maximizerSettings: PropTypes.shape({
//    button: ReactComponentPropType,
    isMaximized: PropTypes.bool,
  }),
  metricsConfig: PropTypes.shape(chartMetricsPropTypes),
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  portraitBreak: PropTypes.number,
  selectAllEntriesAfterAllWereDeselected: PropTypes.bool,
  showLoadingIndicator: PropTypes.bool,
  title: PropTypes.string,
  tooltipContent: PropTypes.node,
  tooltipLabelFormatter: PropTypes.func,
  tooltipValueFormatter: PropTypes.func,
  width: PropTypes.number,
  xAxis: PropTypes.bool,
  xAxisProps: PropTypes.shape({}),
  // eslint-disable-next-line react/require-default-props
  xAxisTickCount: PropTypes.number,
  xAxisTickFormatter: PropTypes.func,
  xAxisTitle: PropTypes.string,
  yAxis: PropTypes.bool,
  yAxisProps: PropTypes.shape({}),
  // eslint-disable-next-line react/require-default-props
  yAxisTickCount: PropTypes.number,
  yAxisTickFormatter: PropTypes.func,
  yAxisTickMaxLines: PropTypes.number,
  yAxisTitle: PropTypes.string,
};

export default ColumnChart;
