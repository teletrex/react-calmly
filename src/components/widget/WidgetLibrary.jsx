/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React,{useState, useEffect} from 'react';

import {
  Form,
} from '@carbon/react';

import Text from '../text';
import {Add} from "@carbon/icons-react";

import Widget from "./Widget";
import { WidgetPropTypes, WidgetDefaultProps } from './prop-types';
import SearchDropDown from "../search-drop-down";
import FlexBox from "../../containers/FlexBox";

// cheating for now or we have a standard set of image assets

import pieChartImage from '../../assets/icons/PieChart.png';
import barChartWeirdImage from '../../assets/icons/BarChartWeird.png';
import lineChartImage from '../../assets/icons/LineChart.png';
import ringChartImage from '../../assets/icons/RingChart.png';
import sankeyChartImage from '../../assets/icons/SankeyChart.png';
import campaignSuccessImage from '../../assets/icons/CampaignSuccessChart.png';

const images = {
  "pieChartImage":pieChartImage,
  "barChartWeirdImage":barChartWeirdImage,
  "lineChartImage":lineChartImage,
  "ringChartImage":ringChartImage,
  "sankeyChartImage": sankeyChartImage,
  "campaignSuccessImage": campaignSuccessImage
}


const WidgetLibrary = props => {
  const {
    widgets,
    loading,
    className,
    slim,
    footer,
    onSearchChange,
    onAddSelectedWidget
  } = props;

  const [widgetLibraryCards,setWidgetLibraryCards] = useState([]);

  useEffect(() => {
    const renderWidgets = Object.entries(widgets)
      .filter(([key, widgetDef]) => widgetDef.showInLibrary)
      .map( ([key, widgetDef]) =>
        <Widget
          key={key}
          title={widgetDef.title}
          height={500}
          footerRightActions=
            {[{
              actionKey: "addwidget",
              onClick: () => onAddSelectedWidget({...widgetDef, definitionId:key}),
              renderIcon: <Add size={24} />,
              kind: "link",
              text:"Add Widget",
              iconDescription: "Add Widget",
            }]}
        >
          <FlexBox
            justifyContent={"flex-start"}
            columnGap={"30px"}
          >
            <img
              width={100}
              height={100}
              src={images[widgetDef.icon]}/>
            <Text>{widgetDef.description}</Text>
          </FlexBox>
        </Widget>

    );
    setWidgetLibraryCards(renderWidgets);

    },[widgets]
  )
  const shouldShowEmptyState = widgets ||  loading;

  if (!widgets || !widgetLibraryCards || widgetLibraryCards.length === 0 ) return (<div>No Widgets</div>);

  return (
    // design shows Widgets as focusable
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions
    <Widget
      metadata={<SearchDropDown />}
      title={"Widget Library"}
      noBorder
      fancyTitle
    >
      <Form>
        <FlexBox
          flexDirection="column"
          rowGap="10px"
          >
        {widgetLibraryCards}
        </FlexBox>
      </Form>
      <FlexBox flexDirection={"column"} rowGap={"40px"}><div/><div/></FlexBox>
    </Widget>
  );
};

WidgetLibrary.propTypes = WidgetPropTypes;
WidgetLibrary.defaultProps = WidgetDefaultProps;

export default WidgetLibrary;
