/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import {MultiSelectComboBox} from './MultiSelectComboBox';
import {boolean} from "@storybook/addon-knobs";

export default {
  title: 'Components/MultiSelectComboBox',
  component: MultiSelectComboBox
}

const menuItems = [
  {text:"Mountain View",
    value:41,
    group:"USA"},
  {text:"Pleasanton",
    value:42,
    group:"USA"},
  {text:"Shanghai",
    value:43,
    group:"China"}
  ]


const moreMenuItems = [
  {text:"Pune",
    value:44,
    group:"India"},
  {text:"Moscow",
    value:45,
    group:"Russia"},
  {text:"Beijing",
    value:46,
    group:"China"},
  {text:"Oslo",
    value:47,
    group:"Norway"},
  {text:"Stockholm",
    value:48,
    group:"Sweden"},
  {text:"Helsinki",
    value:49,
    group:"Finland"}
];

const handleAskForMore = () => moreMenuItems

const handleOnChange = (allOptions,updatedOptions, clickedOption) => {
  console.log(`MultiSelectComboBox: allOptions: ${JSON.stringify(allOptions)}\n` +
                                `updatedOptions: ${JSON.stringify(updatedOptions)}\n` +
                                `clickedOption: ${JSON.stringify(clickedOption)}\n`);
};

export const Default = () => <MultiSelectComboBox onChange={handleOnChange}
                                                  id={"unique id"}
                                                  filterText={"filterText"}
                                                  items={menuItems}
                                                  onAskForMore={()=> handleAskForMore}
                                                  optionLimit={5}
                                                  optionLimitStep={5}
                                                  searchPlaceholderText={'Select Cities'}
                                                  returnOnlyChangedItems={false}
                                                  hideTheCheckboxes={boolean('Hide checkboxes (hideTheCheckboxes)',true)}
                                                  disabled={boolean('Is disabled (disabled)', false)}
                                                  itemsGrouped={boolean('Items grouped (itemsGrouped)',false)}
/>;



export const WithoutSearch = () => <MultiSelectComboBox onChange={handleOnChange}
                                                  id={"unique id"}
                                                  filterText={"filterText"}
                                                  items={menuItems}
                                                  onAskForMore={()=> handleAskForMore}
                                                  optionLimit={5}
                                                  optionLimitStep={5}
                                                  searchPlaceholderText={'Select Cities'}
                                                  returnOnlyChangedItems={false}
                                                  hideTheCheckboxes={boolean('Hide checkboxes (hideTheCheckboxes)',true)}
                                                  disabled={boolean('Is disabled (disabled)', false)}
                                                  itemsGrouped={boolean('Items grouped (itemsGrouped)',false)}
/>;





