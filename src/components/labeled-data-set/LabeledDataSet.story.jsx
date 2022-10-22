/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';


import LabeledDataSet from './index';
import CheckboxIndicator from "../checkbox-indicator";

export default {
  title: 'Components/LabeledDataSet',
  component: LabeledDataSet
}

const promotionData = [
  { label: "Time Frame",
    value: "08/08/2021-08/20/2021",
    format: "string"
  },
  { label: "Promotion Name",
    value:"My wonderful promotion",
    format: "string" },
  { label: "Category",
    value:"Fruit Loops",
    format: "string" },
  { label: "Category Division Store Aisle Rack",
    value:"S10",
    format: "string" },
  { label: "Total Units",
    value:150000,
    format: "number" },
  { label: "Forecasted Units",
    value:60000,
    format: "number" },
  { label: "Base Units",
    value:4000,
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
  value:
    <div className={"four-column"}>
      {vehicles.map(vehicle => <CheckboxIndicator label={vehicle.name} checked={vehicle.checked}/>)}
    </div>
}]

export const Default = () => <div style={{"width":"500px","font-size":".8rem","line-height":"1.2rem"}}><LabeledDataSet
  data={promotionData}
/></div>
