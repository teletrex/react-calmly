/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useState } from 'react';

import ActionToolbar from '../../action-toolbar';
import FullPageTemplate from '../../full-page-template';
import { H4 } from '../../heading';
import {RadioButton, RadioButtonGroup} from '@carbon/react';

import SideBarTemplate, { SIZE } from '../SideBarTemplate';

const places = {
  Left: 'left',
  Right: 'right',
};

export const LayoutOptions = () => {
  const Example = () => {
    const [sbActionBar, setSbActionBar] = useState(false);
    const [sbFooter, setSbFooter] = useState(true);
    const [sbHeader, setSbHeader] = useState(true);
    const [sbMarginless, setSbMarginless] = useState(false);
    const [sbOverlay, setSbOverlay] = useState(false);
    const [sbShow, setSbShow] = useState(true);
    const [sbSide, setSbSide] = useState(places.Left);
    const [sbSize, setSbSize] = useState(SIZE.TREE_NAV);

    const LayoutActionBar = () => (
      <ActionToolbar>
        <div />
      </ActionToolbar>
    );

    return (
      <div className="layout">
        <SideBarTemplate
          actionBar={sbActionBar ? <LayoutActionBar /> : false}
          marginlessPanel={sbMarginless}
          overlay={sbOverlay}
          place={sbSide}
          show={sbShow}
          showCloseButton={false}
          sideBarBody={<H4>Body</H4>}
          sideBarFooter={sbFooter ? <H4>Footer</H4> : false}
          sideBarHeader={sbHeader ? <H4 className="layout--header">Header</H4> : false}
          size={sbSize}
        >
          <FullPageTemplate className="layout--full-page-template" header="SideBar Layout Options">
            <H4>Show</H4>
            <RadioButtonGroup defaultSelected={1} name="show" onChange={e => setSbShow(!!e)}>
              <RadioButton labelText="True" value={1} />
              <RadioButton labelText="False" value={0} />
            </RadioButtonGroup>
            <H4>Place</H4>
            <RadioButtonGroup name="place" onChange={e => setSbSide(e)} valueSelected={sbSide}>
              <RadioButton labelText="Left" value="left" />
              <RadioButton labelText="Right" value="right" />
            </RadioButtonGroup>
            <H4>Size</H4>
            <RadioButtonGroup name="size" onChange={e => setSbSize(e)} valueSelected={sbSize}>
              <RadioButton labelText="treeNav" value={SIZE.TREE_NAV} />
              <RadioButton labelText="default" value={SIZE.DEFAULT} />
              <RadioButton labelText="wide" value={SIZE.WIDE} />
              <RadioButton labelText="half" value={SIZE.HALF} />
            </RadioButtonGroup>
            <H4>Overlay</H4>
            <RadioButtonGroup defaultSelected={0} name="overlay" onChange={e => setSbOverlay(!!e)}>
              <RadioButton labelText="True" value={1} />
              <RadioButton labelText="False" value={0} />
            </RadioButtonGroup>
            <H4>Marginless</H4>
            <RadioButtonGroup
              defaultSelected={0}
              name="marginless"
              onChange={e => setSbMarginless(!!e)}
            >
              <RadioButton labelText="True" value={1} />
              <RadioButton labelText="False" value={0} />
            </RadioButtonGroup>
            <H4>SideBar Header</H4>
            <RadioButtonGroup defaultSelected={1} name="header" onChange={e => setSbHeader(!!e)}>
              <RadioButton labelText="True" value={1} />
              <RadioButton labelText="False" value={0} />
            </RadioButtonGroup>
            <H4>SideBar Footer</H4>
            <RadioButtonGroup defaultSelected={1} name="footer" onChange={e => setSbFooter(!!e)}>
              <RadioButton labelText="True" value={1} />
              <RadioButton labelText="False" value={0} />
            </RadioButtonGroup>
            <H4>ActionBar</H4>
            <RadioButtonGroup
              defaultSelected={0}
              name="action-bar"
              onChange={e => setSbActionBar(!!e)}
            >
              <RadioButton labelText="True" value={1} />
              <RadioButton labelText="False" value={0} />
            </RadioButtonGroup>
          </FullPageTemplate>
        </SideBarTemplate>
      </div>
    );
  };
  return <Example />;
};
