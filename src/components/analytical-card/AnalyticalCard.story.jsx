/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';


import AnalyticalCard from './index';
import CheckboxIndicator from '../checkbox-indicator';
import ValueIndicator from '../value-indicator';

export default {
  title: 'Components/AnalyticalCard',
  component: AnalyticalCard
}

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
    value:140000,
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

const secondaryData = [{
  label:"Vehicles",
  format:"tight",
  value:
    <div className={"four-column"}>
      {vehicles.map(vehicle => <CheckboxIndicator key={vehicle.name} label={vehicle.name} checked={vehicle.checked}/>)}
    </div>
}]
/*
.vehicle-value {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
*/

export const Default = () =>
  <AnalyticalCard
    primaryData={promotionData}
    secondaryData={secondaryData}
    totalPages={10}
    currentPage={2}
    valueIndicator={<ValueIndicator mainValue={0.5} title={"Lift %"}/>}
    linkLabel={"Promotion Name is really long test "}
    linkUrl={"https://networkdebuglfr.z20.web.core.windows.net"}
 />
