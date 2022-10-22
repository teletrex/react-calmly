/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useState} from 'react';


import ClickTooltip from './ClickTooltip';
import ValueIndicator from '../../value-indicator';
import AnalyticalCard from '../../analytical-card'
import CheckboxIndicator from '../../checkbox-indicator'
import settings from '../../../settings';

export default {
  title: 'Components/ClickTooltip',
  component: ClickTooltip
}

const {prefix} = settings;
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

const secondaryDataALternate = [ { label:"Vehicles","value":"2"}];
const secondaryData = [{
  label:"Vehicles",
  format:"tight",
  value:

  <div className={"four-column"}>
    {vehicles.map(vehicle => <CheckboxIndicator key={vehicle.name} label={vehicle.name} checked={vehicle.checked}/>)}
  </div>
}]

export const Default = () => {

  const [currentPage, setCurrentPage]=  useState(1);
  let totalPages = 10;

  const handleNextPage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const nextPage = currentPage % totalPages +1;
    setCurrentPage(nextPage);
  }
  const handlePreviousPage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const previousPage = Math.max(currentPage - 1, 1);
    setCurrentPage(previousPage);
  }

  return (
    <div class={`${prefix}--chart`}>
      <ClickTooltip>
        <AnalyticalCard
          onNextPage = {handleNextPage}
          onPreviousPage = {handlePreviousPage}
          totalPages={10}
          currentPage={currentPage}
          valueIndicator={<ValueIndicator mainValue={0.5} title={"Lift %"}/>}
          linkLabel={"This object Name is really long test  and is super long text"}
          linkUrl={"https://louisroehrs.com"}
          primaryData={promotionData}
          secondaryData={secondaryData}
        />
      </ClickTooltip>
    </div>);
}

