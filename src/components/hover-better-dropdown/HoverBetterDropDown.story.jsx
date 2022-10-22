/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


// TODO: refactor into Dropdown itself.

import React, { useState } from 'react';
import HoverBetterDropDown from './HoverBetterDropDown';


export default {
  title: 'Components/HoverBetterDropDown',
  component: HoverBetterDropDown
}

const menuItems = [
  {
    value: 0,
    label: 'All',
  },
  {
    title:true,
    label:'All-inclusive',
    disabled:true
  },
  {
    value: 1,
    label: 'Federal',
  },
  {
    title:true,
    label:'State',
    disabled:true
  },
  {
    value: 2,
    label: 'Local',
  },
];


export const Default = () => {
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const handleSelectionChange = (e) => {
    console.log("Data changed to " + e);
    setSelectedItem(e.selectedItem);
  }

  return (
    <HoverBetterDropDown
      ariaLabel="Dropdown"
      id="dataChangeDropdown"
      invalidText={'Valid Value'}
      titleText={
        "Aggregation"
      }
      items={menuItems}
      selectedItem={selectedItem }
      light
      onChange={(selectedItem) => {
        handleSelectionChange(selectedItem);
      }}
      type="inline"
    />)
}

export const CustomItemRenderer = () => {

  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const handleSelectionChange = (e) => {
    console.log("Data changed to " + e);
    setSelectedItem(e.selectedItem);
  }

  return (
    <HoverBetterDropDown
      ariaLabel="Dropdown"
      id="dataChangeDropdown"
      invalidText={'Valid Value'}
      titleText={"Aggregation"}
      // label={getDataChangesLabel()}
      items={menuItems}
      itemToElement={(item) => <div>{(typeof item.title != "undefined" ? "😻":"") + item.labelNoHover}</div>}
      selectedItem={selectedItem }
      light
      onChange={(e) => {
        handleSelectionChange(e);
      }}
      type="inline"
    />)
}

