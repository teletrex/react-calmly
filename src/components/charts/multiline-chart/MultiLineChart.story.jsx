/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React,{useState} from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';

import ValueIndicator from '../../value-indicator';

import {DATE_FORMAT, useFormat} from '../../format';
import AnalyticalCard from '../../analytical-card';

import MultiLineChart from '.';
import CheckboxIndicator from '../../checkbox-indicator';

/* Provide the tacticDataLegendMap with the keys matching the key in the elasticity data and the value as the translated visibile text.
* The first entry in the tacticDataLegendMap will be plotted as a line.
* The rest will be plotted as points in standard graph colors. */

export const seriesLegendLabels =
  {
    "gas":"Gas",
    "food":"Food",
    "durables":"Durables",
    "nondurables":"Non-Durables"
  }

export const seriesToYAxis =
  {
    "gas":"left",
    "food":"left",
    "durables":"right",
    "nondurables":"right",
  }


export const seriesStroke =
  {
    "gas":2,
    "food":2,
    "durables":4,
    "nondurables":0
  }

export const yAxisLabels =
  {
    "right":"Price ($)",
    "left":"Units",
  }

export const numberDataDefault = [
  {
    x: 0,
    yLine: 10,
    yDashed: 15,
    bounds: [7, 18],
  },
  {
    x: 1,
    yLine: 13,
    yDashed: 20,
    bounds: [10, 25],
  },
  {
    x: 2,
    yLine: 6,
    yDashed: 10,
    bounds: [4, 12],
  },
  {
    x: 3,
    yLine: 8,
    yDashed: 11,
    bounds: [5, 13],
  },
  {
    x: 4,
    yLine: 3,
    yLineIsAlert: true,
    yDashed: 10,
    bounds: [9, 16],
  },
  {
    x: 5,
    yLine: 20,
    yDashed: 15,
    bounds: [12, 24],
  },
  {
    x: 6,
    yLine: 24,
    yDashed: 20,
    bounds: [17, 27],
  },
  {
    x: 7,
    yLine: 15,
    yDashed: 19,
    bounds: [11, 22],
  },
  {
    x: 8,
    yLine: 4,
    yDashed: 7,
    bounds: [0, 10],
  },
];

export const dateDataDefault = [
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


export const timeSeriesData = [
  { x:"06/01/2021",
    gas: 2,
    food : 2,
    durables: 3.4,
    nondurables: 5.5
  },
  { x:"06/02/2021",
    gas: 2,
    food : 2,
    durables: 3.4,
    nondurables: 5.5
  },
  { x:"06/03/2021",
    gas: 2,
    food : 2,
    durables: 30.4,
    nondurables: 5.5
  },
  { x:"06/04/2021",
    gas: 2,
    food : 2,
    durables: 3.4,
    nondurables: 50.5
  },
  { x:"06/05/2021",
    gas: 2,
    food : 4,
    durables: 3.4,
    nondurables: 5.5
  },
  { x:"06/06/2021",
    gas: 2,
    food : 62,
    durables: 3.4,
    nondurables: 5.5
  },
  { x:"06/07/2021",
    gas: 82,
    food : 5,
    durables: 3.2,
    nondurables: 4.5
  },
  { x:"06/08/2021",
    gas: 2.3,
    food : 2,
    durables: 3.4,
    nondurables: 5.5
  },
  { x:"06/09/2021",
    gas: 2.5,
    food : 2,
    durables: 3,
    nondurables: 5.5,
    todayLine: 100
  },
  { x:"06/10/2021",
    gas: 40,
    food : 60,
    durables: 80,
    nondurables: 100

  },{ x:"08/25/2021",
    gas: 40,
    food : 60,
    durables: 80,
    nondurables: 100,
  },
];


const numberData = () => object('data', timeSeriesData);

const defaultProps = data => ({
  width: text('Chart width', '100%'),
  height: text('Chart height', '100%'),
  data,
});
/*
<ul class="recharts-tooltip-item-list" style="padding: 0px; margin: 0px;"><li class="recharts-tooltip-item" style="display: block; padding-top: 4px; padding-bottom: 4px; color: rgb(49, 130, 189);"><span class="recharts-tooltip-item-name">Gas</span><span class="recharts-tooltip-item-separator">: </span><span class="recharts-tooltip-item-value">2</span><span class="recharts-tooltip-item-unit"></span></li><li class="recharts-tooltip-item" style="display: block; padding-top: 4px; padding-bottom: 4px; color: rgb(49, 130, 189);"><span class="recharts-tooltip-item-name">Food</span><span class="recharts-tooltip-item-separator">: </span><span class="recharts-tooltip-item-value">62</span><span class="recharts-tooltip-item-unit"></span></li><li class="recharts-tooltip-item" style="display: block; padding-top: 4px; padding-bottom: 4px; color: rgb(49, 130, 189);"><span class="recharts-tooltip-item-name">Durables</span><span class="recharts-tooltip-item-separator">: </span><span class="recharts-tooltip-item-value">3.4</span><span class="recharts-tooltip-item-unit"></span></li><li class="recharts-tooltip-item" style="display: block; padding-top: 4px; padding-bottom: 4px; color: rgb(49, 130, 189);"><span class="recharts-tooltip-item-name">Non-Durables</span><span class="recharts-tooltip-item-separator">: </span><span class="recharts-tooltip-item-value">5.5</span><span class="recharts-tooltip-item-unit"></span></li></ul>
<li class="recharts-tooltip-item" style="display: block; padding-top: 4px; padding-bottom: 4px; color: rgb(49, 130, 189);"><span class="recharts-tooltip-item-name">Gas</span><span class="recharts-tooltip-item-separator">: </span><span class="recharts-tooltip-item-value">2</span><span class="recharts-tooltip-item-unit"></span></li>
<span class="recharts-tooltip-item-name">Gas</span>
<span class="recharts-tooltip-item-separator">: </span>
<span class="recharts-tooltip-item-value">2</span>
<span class="recharts-tooltip-item-unit"></span>
<li class="recharts-tooltip-item" style="display: block; padding-top: 4px; padding-bottom: 4px; color: rgb(49, 130, 189);"><span class="recharts-tooltip-item-name">Gas</span><span class="recharts-tooltip-item-separator">: </span><span class="recharts-tooltip-item-value">2</span><span class="recharts-tooltip-item-unit"></span></li>
 */

const promotionName = "My Promotion";

/* You can make any tooltip you want, this is an example tooltip */


const promotionData = [
  { label: "Time Frame",
    value: "08/08/2021-08/20/2021",
    format: "string"
  },
  { label: "Total Units",
    value:50000,
    format: "number" },
  { label: "Forecasted Units",
    value:60000,
    format: "number" },
  { label: "Base Units",
    value:40000,
    format: "number" }
];

const vehicles = [
  {"name":"Ad",
    "checked":true},
  {"name":"Signage",
    "checked":true},
  {"name":"Display",
    "checked":false},
  {"name":"Other",
    "checked":false}
];

const secondaryDataOff = [ { label:"Vehicles","value":"2"}];
const secondaryData = [{
  label:"Vehicles",
  format:"tight",
  value:
    <div className={"four-column"}>
      {vehicles.map(vehicle => <CheckboxIndicator key={vehicle.name} label={vehicle.name} checked={vehicle.checked}/>)}
    </div>
}]

const ClickDotTooltip = (
  {
    active,
    payload,
    label
  }
) => {
  const [boxClicked, setBoxClicked] = useState(false);
  const handleClickDotTooltipClick = (event) => {
    console.log(event.target);
    setBoxClicked(true);
  }

  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip">
        <div className={"two-column"}>
          <span>{seriesLegendLabels[payload[0].dataKey]} : {payload[0].value}</span>
          <span>{seriesLegendLabels[payload[1].dataKey]} : {payload[1].value}</span>
        </div>
        <div onClick={handleClickDotTooltipClick}>My Promotion (click me)</div>
        { boxClicked && <div>OW!!! You clicked my promotion.</div>}
      </div>
    )
  }
  return null;
}

const ProductHistoryTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip">
        <div className={"two-column"}>
          <div>
            <p className="recharts-tooltip-label">{promotionName}</p>
            <br/>

            <ul className={"recharts-tooltip-item-list"}>
              <li className={"recharts-tooltip-item"}>
                <span>{"06/14/2019 - 06/20/2019"}</span>
              </li>
              <li className={"recharts-tooltip-item"}>
                <span>{seriesLegendLabels[payload[0].dataKey]} : {payload[0].value}</span>
              </li>
              <li className={"recharts-tooltip-item"}>
                <span>{seriesLegendLabels[payload[1].dataKey]} : {payload[1].value}</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="recharts-tooltip-label">ROI Target</p>
            <br/>
            <br/>
            <p className="recharts-indicator"> {Math.floor(((payload[1].value / payload[0].value) * 100)) + "%"}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


  storiesOf('Charts/MultiLineChart', module)
    .add('Default', () => (
      <MultiLineChart
        width="100%"
        height="100%"
        timeSeries={true}
        data={timeSeriesData}
        title="Product History"
        height={300}
        seriesLegendLabels={seriesLegendLabels}
      />
    ))
    .add('Custom ToolTip', () => (
      <MultiLineChart
        timeSeries={true}
        width="100%"
        data={timeSeriesData}
        title="Product History With Custom Tooltip"
        height={300}
        tooltip={(props) => <ProductHistoryTooltip active={true} {...props}/>}
        seriesLegendLabels={seriesLegendLabels}
      />
    ))


    .add('With ClickDotToolTip using AnalyticalCard', () => {

        const [xPoint, setXpoint] = useState(-1);

        const analyticalDotClicked = (event, visible) => {
          // update all the analytical card values for the data point clicked based on the event passed in.
          console.log(event);
          setXpoint(event.payload.x);
        }

        return (
          <MultiLineChart
            width="100%"
            height="100%"
            timeSeries={true}
            data={timeSeriesData}
            title="Product History With Custom Tooltip"
            height={500}
            tooltip={(props) => <ProductHistoryTooltip {...props}/>}
            clickDotTooltip={
              <AnalyticalCard
                totalPages={10}
                currentPage={1}
                valueIndicator={<ValueIndicator mainValue={0.5} title={"Lift %"}/>}
                linkLabel={"Promotion at " + xPoint}
                linkUrl={"https://networkdebuglfr.z20.web.core.windows.net"}
                primaryData={promotionData}
                secondaryData={secondaryData}
              />}
            seriesLegendLabels={seriesLegendLabels}
            onDotClicked={analyticalDotClicked}
          />
        )
      }
    )

    .add('With Dual Y-Axis', () => {

        const [xPoint, setXpoint] = useState(-1);

        const analyticalDotClicked = (event, visible) => {
          // update all the analytical card values for the data point clicked based on the event passed in.
          console.log(event);
          setXpoint(event.payload.x);
        }

        return (
          <MultiLineChart
            width="100%"
            height="100%"
            data={timeSeriesData}
            timeSeries={true}
            title="Product History With Custom Tooltip"
            height={500}
            tooltip={(props) => <ProductHistoryTooltip {...props}/>}
            clickDotTooltip={
              <AnalyticalCard
                totalPages={10}
                currentPage={1}
                valueIndicator={<ValueIndicator mainValue={0.5} title={"Lift %"}/>}
                linkLabel={"Promotion at " + xPoint}
                linkUrl={"https://networkdebuglfr.z20.web.core.windows.net"}
                primaryData={promotionData}
                secondaryData={secondaryData}
              />}
            seriesLegendLabels={seriesLegendLabels}
            seriesToYAxisMap={seriesToYAxis}
            seriesStroke={seriesStroke}
            yAxisLeftLabel = {yAxisLabels.left}
            yAxisRightLabel = {yAxisLabels.right}
            showAxisLine={true}
            onDotClicked={analyticalDotClicked}
            showHorizontalGrid={false}
            showVerticalGrid={false}
          />
        )
      })
    .add('With Vertical Reference Lines', () => {

        const [xPoint, setXpoint] = useState(-1);

        const analyticalDotClicked = (event, visible) => {
          // update all the analytical card values for the data point clicked based on the event passed in.
          console.log(event);
          setXpoint(event.payload.x);
        }

        return (
          <MultiLineChart
            width="100%"
            height="100%"
            timeSeries={true}
            data={timeSeriesData}
            title="Product History With Custom Tooltip"
            height={500}
            tooltip={(props) => <ProductHistoryTooltip {...props}/>}
            clickDotTooltip={
              <AnalyticalCard
                totalPages={10}
                currentPage={1}
                valueIndicator={<ValueIndicator mainValue={0.5} title={"Lift %"}/>}
                linkLabel={"Promotion at " + xPoint}
                linkUrl={"https://networkdebuglfr.z20.web.core.windows.net"}
                primaryData={promotionData}
                secondaryData={secondaryData}
              />}
            seriesLegendLabels={seriesLegendLabels}
            seriesToYAxisMap={seriesToYAxis}
            seriesStroke={seriesStroke}
            yAxisLeftLabel = {yAxisLabels.left}
            yAxisRightLabel = {yAxisLabels.right}
            showAxisLine={true}
            onDotClicked={analyticalDotClicked}
            showHorizontalGrid={false}
            showVerticalGrid={false}
            verticalReferenceLines={[{dataKey:"todayLine"}]}
          />
        )
      }
    );



