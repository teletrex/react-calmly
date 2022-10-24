/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Dot,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine, ReferenceArea,
} from 'recharts';


import Legend from '../components/Legend';
import { buildClass } from '../components/className';
import includes from 'lodash/includes';
import {SecondaryButton} from "@carbon/react";

const LineScatterChart = ({
  title,
  data,
  chartMargin,
  height,
  width,

  // tooltip
  tooltipFormatter,
  tooltip,

  // labels Object of labels
  // {[ "promotion": "Promotion","on-ad":"On Ad", etc.]
  xDiscountName,
  tacticLegendLabels,
  lineColors,
  costReferenceLineValue,
  costReferenceLineLabel,
  legendItemClickHandler,
  onDotClicked
}) => {
  const tooltipRef = useRef(null);

  const referenceLineStrokeColor = "#FFC0CB";
  const [disabledLines, setDisabledLines] = useState([]);
  const [disabledDots, setDisabledDots] = useState([]);
  const [legendItems, setLegendItems] = useState([]);
  const [legendItemsIndex, setLegendItemsIndex] = useState({});
  const [refAreaLeft, setRefAreaLeft] = useState();
  const [refAreaRight, setRefAreaRight] = useState();
  const [viewData, setViewData] = useState();
  const [left,setLeft] = useState(0);
  const [right,setRight] = useState(1);
  const [ top,setTop] = useState("dataMax+1");
  const [ bottom, setBottom] = useState("dataMin-1");
  const [ top2, setTop2] = useState("dataMax+20");
  const [ bottom2, setBottom2] = useState("dataMin-20");
  const [zoomedIn, setZoomedIn] = useState(false);

  const handleClickedTooltip = (event,visible) => {
    onDotClicked && onDotClicked(event,visible);
    const chartBoundingRect = chartRef.current.getBoundingClientRect();
    const tooltipBox  = tooltipRef.current.state;

    const flipY =  event.cy > chartBoundingRect.bottom - tooltipBox.boxHeight*2;
    const flipX =  event.cx > chartBoundingRect.right - tooltipBox.boxWidth-50-10;
    setShowClickTooltip(visible);
    setClickTooltipPosition({
      y: flipY ? (event.cy - tooltipBox.boxHeight - 10 ): event.cy + 10,
      x: flipX ? (event.cx - tooltipBox.boxWidth - 10 ): event.cx + 10 });
  }

  const getAxisYDomain = (from, to,  offset) => {
    let dataIndexFrom = 0;
    let dataIndexTo = 0;

    while (viewData[dataIndexFrom].discount !== from) {
      dataIndexFrom++;
    }
    while (viewData[dataIndexTo].discount !== to) {
      dataIndexTo++;
    }

    const refData = viewData.slice(dataIndexFrom - 1, dataIndexTo);
    let [bottom, top] = [refData[0], refData[0]];
    refData.forEach(d => {
      console.log("d" + d);
      if (d > top) top = d;
      if (d < bottom) bottom = d
    });
    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  useEffect( () => {
    setViewData(data.sort((a,b) => (a.discount-b.discount)));
  },[data] );


  useEffect(() => {
      const myLegendItems = Object.entries(tacticLegendLabels).map(([key, value], index) => ({
        className: '__icon-legend-' + (index + 1),
        value: value,
        key:key,
        active: true,
      })
      );
      setLegendItems(myLegendItems);
      let myLegendItemsIndex = {};

      for (var i =0; i<myLegendItems.length; i++) {
        myLegendItemsIndex[myLegendItems[i].key] = myLegendItems[i];
      }
      setLegendItemsIndex(myLegendItemsIndex);
  }, [tacticLegendLabels]);

  const tooltipLabelFormatter = discount => xDiscountName+ ': ' + Math.floor(discount * 100 )+ '%';


  const TacticDot = ({ payload, index, legendItemsIndex, onDotClicked, ...props }) => {
    if (typeof payload.tactic !== "undefined") {
      return (
        <Dot
          className={buildClass('__chart-area__tactic-dot') + (legendItemsIndex[payload.tactic] && legendItemsIndex[payload.tactic].className)}
          onDotClicked={onDotClicked}
          {...props}
          r={4}
        />
      )
    }
    else return (null);
  }


  const defaultTooltipFormatter = (value, dataKeyName, payload) => {
/*    if (dataKeyName === 'elasticity') name = yElasticityName
    else name = tacticLegendLabels[dataKeyName];
    if (typeof name === 'undefined') return [value, dataKeyName];
    return [value, name];
    */
    return [value,dataKeyName]

  };

  lineColors = lineColors ?? [
    '#29ab87',
    '#0292d4',
    '#d846bf',
    '#f45d20',
    '#f3ba00',
    '#ff465a',
    '#ff8c7b',
  ];


  const onLegendClick = val => {
    if (!includes(disabledLines, val)) {
      setDisabledLines(arr => [...arr, val]);
      legendItems.find(item => item.value === val).active = false;
    } else if (includes(disabledLines, val)) {
      setDisabledLines(arr => arr.filter(item => item !== val));
      legendItems.find(item => item.value === val).active = true;
    }
    const dotsIfAny = data.filter(item => item.tactic === val);
    if (dotsIfAny && dotsIfAny.length > 0) {
      setDisabledDots(arr => [...arr, ...dotsIfAny]);
    } else if (includes(disabledDots, val)) {
      // remove from disabled dots
      setDisabledDots(arr => arr.filter(item => item.tactic !== val));
    }
    // remove objects from data array
    legendItemClickHandler(dotsIfAny, val);
  };

  const zoom = () => {

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaRight("");
      setRefAreaLeft("");
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) {
      setRefAreaLeft(refAreaRight);
      setRefAreaRight(refAreaLeft);
    }

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 20);

    setRefAreaRight("");
    setRefAreaLeft("");
    setViewData(viewData.slice());

    setLeft(refAreaLeft);
    setRight(refAreaRight);

    setBottom(bottom);
    setTop(top);
    setZoomedIn(true);
  }

  const zoomOut = () => {
    setViewData(viewData.slice());
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
    setTop( "dataMax+1");
    setBottom( "dataMin");
    setZoomedIn(false);
  }

  return (
    <div className={buildClass()} style={{ width, height }}>
      {title && <div className={buildClass('__header')}>{title}</div>}
      <div style={{display:"grid",gridTemplateColumns:"auto 20%"}}>
        <Legend items={legendItems} onLegendClick={onLegendClick}/>
        <SecondaryButton disabled={!zoomedIn}  size={"sm"} onClick={zoomOut}>Reset Zoom</SecondaryButton>
      </div>
      <div className={buildClass('__chart')}>
        <ResponsiveContainer>
          <ComposedChart
            data={viewData}
            onMouseDown={e => { setRefAreaLeft( e.activeLabel) } }
            onMouseMove={e => { if (setRefAreaLeft) { setRefAreaRight( e.activeLabel) } }}
            onMouseUp={zoom}

            margin={{
              left: 0,
              top: 20,
              bottom: 30,
              right: 20,
              ...chartMargin,
            }}

          >
            <XAxis
              axisLine={true}
              allowDataOverflow={true}
              domain={[left, right]}
              type={'number'}
              dataKey={'discount'}
              tickMargin={20} // push numbers away from axis
              tickSize={10} // also push numbers away from axis, size of line if tickLine is true
              angle={-45} // slant them
              tickFormatter={thing => Math.floor(thing * 100) + '%'} //show as percentages.
              tickLine={false}
            />
            <YAxis
              tickFormatter={thing => Math.ceil(thing) + 'x'}
              axisLine={false}
              domain={[0,2]}
            />

            <Tooltip
              ref={tooltipRef}
              content={tooltip}
              formatter={defaultTooltipFormatter}
              labelFormatter={tooltipLabelFormatter}
              labelStyle={{
                padding: 0,
              }}
              separator=": "
            />

            <CartesianGrid horizontal vertical={false} />
            {costReferenceLineValue && costReferenceLineValue > 0 && (
              <ReferenceLine
                x={costReferenceLineValue}
                stroke={referenceLineStrokeColor}
                strokeWidth="3"
                label={{
                  position: 'top',
                  value: costReferenceLineLabel,
                }}
              />
            )}

              {legendItems.map((item, i) => {
                return(
                  item.active && <Line
                    id={item.key}
                    key={item.key}
                    stroke={lineColors[i]}
                    className={buildClass('__chart-line')}
                    dataKey={item.key}
                    strokeWidth="2"
                    activeDot={
                      <Dot
                        className={buildClass('__chart-line') + legendItemsIndex[item.key].className}
                        r={0}
                        onClick={(event)=>handleClickedTooltip(event,true)}
                      />
                     }
                    dot={
                      <Dot r={0}
                      className={ buildClass('__chart-line') + legendItemsIndex[item.key].className}
                      />
                    }
                    connectNulls
                    type="monotone"
                  />

              )
              })}
            <Scatter
              dataKey={'yLift'}
              type={'linear'}
              shape={
                <TacticDot
                  legendItemsIndex={legendItemsIndex}
                  onDotClicked={(event) => handleClickedTooltip(event,true)}/>}
            />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

LineScatterChart.propTypes  = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
  ).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xDiscountName: PropTypes.string,
  tacticLegendLabels: PropTypes.arrayOf(PropTypes.shape([PropTypes.string, PropTypes.string])),
};

LineScatterChart.defaultProps = {
  data: undefined,
  height: '100%',
  title: undefined,
  width: '100%',
  xDiscountName: 'Discount',
  tacticLegendLabels: undefined,
};

export default LineScatterChart;
