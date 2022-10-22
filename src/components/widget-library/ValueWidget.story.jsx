/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleValueWidget from "./SimpleValueWidget";
import ValueWidget from "./ValueWidget";
import PerformanceValueWidget from "./PerformanceValueWidget";
import {Edit} from '@carbon/icons-react';
import {OverflowMenu, OverflowMenuItem} from "@carbon/react";
import {action} from "@storybook/addon-actions";

const bodyShort02 = {
  fontSize: '1rem',
  lineHeight: '1.375rem',
  fontWeight: '400',
  letterSpacing: '0px',
  marginBottom: '1rem',
};

const defaultWidgetActions = [{
  actionKey: "edit",
//  onClick: () => { setOpenSideBar(!openSideBar); setWhichSideBar("right"); setSelectedWidgetId("e")},
  renderIcon: <Edit size={24} />,
  type: "secondary",
  iconDescription: "Edit",
  tooltipPosition:"bottom"
}]

const current = 24;
const prev = 22;

const demoOverflowMenu  =
  <OverflowMenu
    ariaLabel={"more cowbell"}
    flipped
    iconDescription={"more cowbell"}
    onClick={action('widgetId[actions-and-menu][overflowMenu]::onClick', { depth: 1 })}
    onClose={action('widgetId[actions-and-menu][overflowMenu]::onClose')}
    onOpen={action('widgetId[actions-and-menu][overflowMenu]::onOpen')}
  >
    <OverflowMenuItem
      itemText="Option 1"
      onClick={action('widgetId[actions-and-menu][overflowMenu][option-1]::onClick', {
        depth: -1,
      })}
    />
    <OverflowMenuItem
      itemText="Option 2"
      onClick={action('widgetId[actions-and-menu][overflowMenu][option-2]::onClick', {
        depth: -1,
      })}
    />
  </OverflowMenu>;

storiesOf('Components/ValueWidgets', module).add('Value Widget', () => (

    <ValueWidget
      title={"Title"}
//      actions={defaultWidgetActions}
      overflowMenu={demoOverflowMenu}
    >
      {<div>22</div>}
    </ValueWidget>
  )
).add('Empty state of ValueWidget', () => (
  <ValueWidget
  title={"Empty Value Widget"}/>

))
  .add('PerformanceValueWidget', () => (
    <PerformanceValueWidget
      valueText={'$24 Million'}
      title={"Total Sales"}
      values={
        [
          {valueText:"$2 Million",change :  current - prev, description:"vs last year" },
          {valueText:"$250K",change : -1, description:"against plan" },
        ]}>

    </PerformanceValueWidget>
  ))
  .add('PerformanceValueWidget loading', () => (
    <PerformanceValueWidget
      loading={true}
      valueText={'$24 Million'}
      title={"Total Sales"}
      values={
        [
          {valueText:"$2 Million",change :  current - prev, description:"vs last year" },
          {valueText:"$250K",change : -1, description:"against plan" },
        ]}>

    </PerformanceValueWidget>
  ))
.add('SimpleValueWidget', () => (
  <SimpleValueWidget
  title={"Simple Value Widget"}
  valueText={"22"}
  actions = {[]


  }
  />

));
