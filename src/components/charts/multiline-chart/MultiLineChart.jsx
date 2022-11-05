/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useRef, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Dot,
  ReferenceArea
} from 'recharts';


import {Button} from "@carbon/react";
import Legend from '../components/Legend';
import ChartTitle from '../components/ChartTitle';
import { buildClass } from '../components/className';
import ClickTooltip from "../components/ClickTooltip";
import ReferenceLineDot from "../components/ReferenceLineDot";

const MultiLineChart = ({
  title,
  data,
  chartMargin,
  height,
  width,
// hover tooltip
  tooltip,
// clicking the dot tooltip
  clickDotTooltip,
  onDotClicked,
  timeSeries, // if true, treat x-axis as a timeline
  // labels  Array of labels ["Promotion","On Ad", etc. ]
  // {[ "promotion": "Promotion","on-ad":"On Ad", etc.]
  seriesLegendLabels,
  seriesToYAxisMap,
  seriesStroke,
  yAxisLeftLabel,
  // To show a right y axis, set the yAxisRightLabel
  yAxisRightLabel,
  showAxisLine,
  showHorizontalGrid,
  showVerticalGrid,
  verticalReferenceLines
  // [{dataKey:  }, ...]
  // then in the data, add the { dataKey: <any value> to the
  // data point with the x value where you want the reference line


}) => {
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  const legendStyles = {};

  const [showClickTooltip, setShowClickTooltip] =useState(false);
  const [clickTooltipPosition, setClickTooltipPosition] =useState(false);
  // zoom factor 5

  const [refAreaLeft, setRefAreaLeft] = useState();
  const [refAreaRight, setRefAreaRight] = useState();
  const [viewData, setViewData] = useState();
  const [left,setLeft] = useState("dataMin");
  const [right,setRight] = useState("dataMax");
  const [ top,setTop] = useState("dataMax+1");
  const [ bottom, setBottom] = useState("dataMin-1");
  const [ top2, setTop2] = useState("dataMax+20");
  const [ bottom2, setBottom2] = useState("dataMin-20");
  const [animation, setAnimation]= useState(true);
  const [zoomedIn, setZoomedIn] = useState(false);

  const getAxisYDomain = (from, to, ref, offset) => {
    let dataIndexFrom = 0;
    let dataIndexTo = 0;

    while (viewData[dataIndexFrom].x != from) {
      dataIndexFrom++;
    }
    while (viewData[dataIndexTo].x != to) {
      dataIndexTo++;
    }

    const refData = viewData.slice(dataIndexFrom - 1, dataIndexTo);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach(d => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  useEffect( () => {
    if (timeSeries === true) {
      console.log("Chart in timeSeries mode, pass dates in mm/dd/yyyy for x");
      const newData = data.map(point => {
        return ({...point, x: Number.parseFloat(Date.parse(point.x))})
      })
      setViewData(newData)
    }
    else {
      setViewData(data);
    }
  },[data,timeSeries] );


  Object.entries(seriesLegendLabels).map (([key,value],index ) => {
    legendStyles[key] = {className: '__icon-legend-' + (index+1), value: value};
  });

  const legendItems = Object.entries(seriesLegendLabels).map ( ([key,value],index) => ({ className: '__icon-legend-'+(index+1), value:value}));

  const defaultTooltipFormatter = (value,dataKeyName,payload) => {
    if (timeSeries===true && dataKeyName === "x")
      value = new Date(value).toLocaleDateString();
    return [value, seriesLegendLabels[dataKeyName]];
  };

  const zoom = () => {
 //   let { refAreaLeft, refAreaRight, data } = this.state;

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

    console.log(refAreaRight,refAreaLeft);
    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "left", 20);
    const [bottom2, top2] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      "right",
      50
    );

    setRefAreaRight("");
    setRefAreaLeft("");
    setViewData(viewData.slice());

    setLeft(refAreaLeft);
    setRight(refAreaRight);

    setBottom(bottom);
    setTop(top);
    setBottom2(bottom2);
    setTop2(top2);
    setZoomedIn(true);
  }

  const zoomOut = () => {
    setViewData(viewData.slice());
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
    setTop( "dataMax+1");
    setTop2( "dataMax+50");
    setBottom( "dataMin");
    setZoomedIn(false);

  }


/* referenceline.    add the referenceline to the data and then add the line with the reference line data key

 */

  /* Object Example of event called for tooltips and onDotClicked(event,visible)
  Most useful data is probably is payload.x and dataKey to determine the data point
    for which to provide data for the clickDotTooltip.

     {
        className: "cds--eleven-chart__chart-line__icon-legend-1",
        cx: 622.8999999999999,
        cy: 74.54000000000002,
        dataKey: "gas",
        fill: "#3182bd",
        index: 6,
        onClick: function(event),
        payload: {
           durables: 3.2,
           food: 5,
           gas: 82,
           nondurables: 4.5,
           x: "06/07/2021"
         },
         r: 5,
         stroke: "#fff",
         strokeWidth: 2,
         value: 82
      }
*/


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



  return (
    <div className={buildClass()} style={{ width, height, userSelect:"none"}}  ref={chartRef}>
      {title && <ChartTitle>{title}</ChartTitle>}
      <div style={{display:"grid",gridTemplateColumns:"auto 20%", alignItems:"baseline"}}>
        <Legend items={legendItems} />
        <Button kind={"tertiary"} disabled={!zoomedIn}  size={"sm"} onClick={zoomOut}>Reset Zoom</Button>
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
              allowDataOverflow={true}  // makes domain truncate, dear god, the only documentation is stack overflow
              type={"number"}
              dataKey={"x"}
              tickMargin={20}  // push numbers away from axis
              tickSize={10}  // also push numbers away from axis, size of line if tickLine is true
              angle={-45}  // slant them
              tickFormatter={value =>  timeSeries ? new Date(value).toLocaleDateString():value}
              tickLine={false}
              domain={[left,right]}
            />
            <YAxis
              yAxisId={"left"}
              tickFormatter={thing => thing}
              axisLine={showAxisLine}
              tickSize={0}
              orientation={"left"}
              label={{ value:yAxisLeftLabel, angle: -90, position: 'insideLeft' }}
            >{yAxisLeftLabel}</YAxis>
            { yAxisRightLabel &&
            <YAxis
              yAxisId={"right"}
              tickFormatter={thing => thing}
              axisLine={showAxisLine}
              tickSize={0}
              orientation={"right"}
              label={{ value:yAxisRightLabel, angle: -90, position: 'insideRight' }}
            >{yAxisRightLabel}</YAxis>

            }
            <Tooltip
              ref={tooltipRef}
              content={(showClickTooltip && clickDotTooltip &&
              <ClickTooltip onCloseRequest={() => setShowClickTooltip(false)}>
                {clickDotTooltip}
              </ClickTooltip>
                )|| tooltip }
              active={ showClickTooltip}

              formatter={defaultTooltipFormatter}
              labelStyle={{padding:0}}
              separator=": "
              position={
                (!showClickTooltip && null)
                ||
                (clickDotTooltip && showClickTooltip && clickTooltipPosition )
              }
              />
            <CartesianGrid horizontal={showHorizontalGrid} vertical={showVerticalGrid}/>

            { Object.keys(seriesLegendLabels).map( key =>

              <Line
                key={key}
                yAxisId = {(yAxisRightLabel && seriesToYAxisMap[key])||"left" }
                className={buildClass('__chart-line') +legendStyles[key].className}
                dataKey={key}
                strokeWidth={(seriesStroke && (typeof seriesStroke[key] !== "undefined")) ?
                  seriesStroke[key] :2 }
                //activeDot is the dot when hovered over.
                activeDot={
                  <Dot
                    className={buildClass('__chart-line') + legendStyles[key].className}
                    r={5}
                    onClick={(event)=>handleClickedTooltip(event,true)}
                  />
                }
                //dot is the dot in default state
                dot={
                  <Dot
                    className={ buildClass('__chart-line') + legendStyles[key].className}
                  />
                }
                type="monotone"
              />)
            }
            { verticalReferenceLines && verticalReferenceLines.map(verticalReferenceLine => (

              <Line
                    key={verticalReferenceLine.dataKey}
                    yAxisId={"left"}
                    className={buildClass('__chart-reference-line')}
                    dataKey={verticalReferenceLine.dataKey}
                    strokeWidth={0}
                //we use this dot to make the vertical reference line as
                //a workaround for the bug where reference line fails when
                //two axes are shown.
                    dot={
                      <ReferenceLineDot
                        key={verticalReferenceLine.dataKey}
                      />
                    }
                    activeDot={null}
                    type="monotone"
              />
            ))
            }
            {refAreaLeft && refAreaRight ? (
              <ReferenceArea
                yAxisId="left"
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
};

MultiLineChart.propTypes = {
  /** data **/
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
  /** height **/
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  seriesLegendLabels : PropTypes.object,
  seriesToYAxisMap: PropTypes.object,
  yAxisLeftLeft : PropTypes.string,
  yAxisRightLabel : PropTypes.string,
  showAxisLine : PropTypes.bool,
  showHorizontalGrid : PropTypes.bool,
  showVerticalGrid: PropTypes.bool,
  seriesStroke:PropTypes.arrayOf(PropTypes.object),
  seriesDotShape:PropTypes.arrayOf(PropTypes.object),
  verticalReferenceLines: PropTypes.arrayOf(PropTypes.object)
};

MultiLineChart.defaultProps = {
  data: undefined,
  height: '100%',
  title: undefined,
  width: '100%',
  seriesLegendLabels : undefined,
  yAxisLeftLeft : null,
  yAxisRightLabel : null,
  showAxisLine: false,
  showHorizontalGrid: true,
  showVerticalGrid: false,
  seriesToYAxisMap:null,
  seriesStroke:null,
  seriesDotShape:null,
  verticalReferenceLines: null
};

export default MultiLineChart;
