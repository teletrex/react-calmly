/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';

import {mydata, myTacticLegendLabels}  from './exampledata';
import LineScatterChart from './LineScatterChart';


/* Provide the tacticDataLegendMap with the keys matching the key in the elasticity data and the value as the translated visibile text.
* The first entry in the tacticDataLegendMap will be plotted as a line.
* The rest will be plotted as points in standard graph colors. */


/* Example tooltip, create your own and pass in as tooltip to the chart. */
const ProductElasticityTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip">
        <div className="two-column">
          <div>
            <p className="recharts-tooltip-label">{payload[0].payload.promotionName}</p>
            <br />
            <div>{"test" + JSON.stringify(payload)}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


export const tacticLegendLabels =
   {
     "elasticity":"Elasticity",
     "promotion":"Promotion",
     "on-ad":"On Ad",
     "on-display":"On Display",
     "on-ad-and-display":"On Ad and Display"
  }

export const elasticityData = [
  {
    discount: 0,
    elasticity: 1.0,
    promotionName:"promotion 10"
  },
  {
    discount: 0.1,
    elasticity: 1.11,
    promotionName:"promotion 11"
  },
  { discount:0.12,
    "on-display":3,
    promotionName:"promotion 7"
  },
  {
    discount: 0.2,
    elasticity: 1.2,
    promotionName:"promotion 12"
  },
  { discount:0.21,
    "promotion": 5,
    promotionName:"promotion 2"
  },
  { discount:0.22,
    "on-ad": 2,
    promotionName:"promotion 5"
  },
  { discount:0.43,
    "on-ad": 3,
    promotionName:"promotion 6"
  },
  { discount:0.48,
    "on-display": 6,
    promotionName:"promotion 9"
  },
  { discount:0.5,
    "promotion": 2,
    promotionName:"promotion 1"
  },
  { discount:0.53,
    "on-ad": 1,
    promotionName:"promotion 4"
  },
  { discount:0.7,
    "promotion": 8,
    elasticity: 1.8,
    promotionName:"promotion 3"
  },
  { discount:0.92,
    "on-display": 5,
    promotionName:"promotion 8"
  },
  {
    discount: 0.3,
    elasticity: 1.3,
    promotionName:"promotion 13"
  },
  {
    discount: 0.4,
    elasticity: 1.4,
    promotionName:"promotion 14"
  },
  {
    discount: 0.6,
    elasticity: 1.6,
    promotionName:"promotion 17"
  },
  {
    discount: 0.8,
    elasticity: 2.6,
    promotionName:"promotion 19"
  },
  {
    discount: 0.9,
    elasticity: 4,
    promotionName:"promotion 20"
  },
  {
    discount: 1.0,
    elasticity: 6,
    promotionName:"promotion 21"
  }

].sort( (a,b)=> (a.discount - b.discount));;


storiesOf('Charts/LineScatterChart', module)
  .add('Default', () => (
    <LineScatterChart
      width= "100%"
      height="100%"
      data= {mydata}
      title="Line Scatter Chart"
      height={600}
      xDiscountName={"Discount"}
      tacticLegendLabels={myTacticLegendLabels}
    />
  ))
  .add('With Custom Hover Tooltip', () => (
    <LineScatterChart
      width= "100%"
      height="100%"
      data= {mydata}
      title="Discount Elasticity"
      height={600}
      tooltip={ProductElasticityTooltip}
      xDiscountName={"Discount"}
      tacticLegendLabels={myTacticLegendLabels}
    />
  ))

  .add('With Scatter Point Data', () => (
    <LineScatterChart
      width= "100%"
      height="100%"
      data= {mydata}
      title="Line Scatter Chart"
      height={600}
      xDiscountName={"Discount"}
      tacticLegendLabels={myTacticLegendLabels}
    />
  ))


