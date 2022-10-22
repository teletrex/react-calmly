/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, {useState} from 'react';
import { Provider } from 'react-redux';

import {
  seriesLegendLabels,
  timeSeriesData
} from '../charts/multiline-chart/MultiLineChart.story';


import {
  Tab,
  Tabs,
  Button,
  OverflowMenu,
  OverflowMenuItem,
  ToastNotification,
} from '@carbon/react';

import SideBarTemplate from '../side-bar-template';
import FullPageTemplate from '../full-page-template';
import ValueIndicator from '../value-indicator';
import {useFormat, DATE_FORMAT} from '../format';
import {ScrollContainerScrollTypes} from '../scroll-container'


import  { useTranslation} from '../../translation'
import {
  Edit,
  Maximize,
  Download,
  Calendar,
  Filter,
  Share,
  ChartBar,
  Information,
  ChevronRight,
  Add,
  RestaurantFine,
  Export
} from "@carbon/icons-react";

import Widget from "./Widget";
import WidgetContent from "./components/WidgetContent";
import WidgetChartWrapper from "./components/WidgetChartWrapper";
import SimpleValueWidget from "../widget-library/SimpleValueWidget";
import ChartWidget from "./ChartWidget";

import MagicWidgetGrid from "./MagicWidgetGrid";
import MultiLineChart from "../charts/multiline-chart";
import CheckboxIndicator from '../checkbox-indicator';
import {ElevenDropDown} from "../../index";
import DateInputEditor from "../magic-table/editors/DateInputEditor";
import ComboButton from "../combo-button/ComboButton";
import WidgetPropertySheet from "./WidgetPropertySheet";

import {action,select} from '@storybook/addon-actions';
import PerformanceValueWidget from "../widget-library/PerformanceValueWidget";
import store from '../../store';

import ExampleHeader from "../example-header/ExampleHeader";



const showActions = true;  //  controlled for read only, editable.

const MockContent = ({ text }) => (
  <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      border: '1px solid silver',
    }}
  >
    {text || 'Content goes here'}
  </div>
);

const defaultProps = data => ({
  data,
  yAxisDataKey: text('Y-Axis dataKey', 'y'),
  xAxisDataKey: text('X-Axis dataKey', 'x'),
  tooltipLabelFormatter: () => 'Unique users',
  tooltipFormatter: value => [value, null],
});

// eslint-disable-next-line
const CustomTick = ({ x, y, _stroke, payload }) => {
  const { formatDate } = useFormat();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        className="recharts-cartesian-axis-tick-value"
        dy={16}
        fill="#666"
        textAnchor="end"
        transform="rotate(-45)"
        x={0}
        y={0}
      >
        <tspan>{formatDate(payload.value, DATE_FORMAT.DATE)}</tspan>
      </text>
    </g>
  );
};


/* Provide the tacticDataLegendMap with the keys matching the key in the elasticity data and the value as the translated visibile text.
* The first entry in the tacticDataLegendMap will be plotted as a line.
* The rest will be plotted as points in library standard graph colors. */
/*
export const seriesLegendLabels =
  {
    "gas":"Gas",
    "food":"Food",
    "durables":"Durables",
    "nondurables":"Non-Durables"
  }
*/
const seriesToYAxis =
  {
    "gas":"left",
    "food":"left",
    "durables":"right",
    "nondurables":"right",
  }


const seriesStroke =
  {
    "gas":2,
    "food":2,
    "durables":4,
    "nondurables":0
  }

const yAxisLabels =
  {
    "right":"Price ($)",
    "left":"Units",
  }
const numberData = () => object('data', timeSeriesData);


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
      {vehicles.map(vehicle => <CheckboxIndicator label={vehicle.name} checked={vehicle.checked}/>)}
    </div>
}]

const overflowMenuDescription = "More actions";
const demoOverflowMenu  =
  <OverflowMenu
    ariaLabel={overflowMenuDescription}
    flipped
    iconDescription={overflowMenuDescription}
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

export default {
  title: 'Dashboard/MagicWidgetGrid',
  component: MagicWidgetGrid,
}

export const WidgetDashboard = ({ showActions, ...props }) => {
  const {formatDate} = useFormat();
  const layouts = {
    lg: [
      {i: 'a', x: 0, y: 0, w: 2, h: 1},
      {i: 'b', x: 2, y: 0, w: 2, h: 1},
      {i: 'c', x: 4, y: 0, w: 2, h: 1},
      {i: 'd', x: 6, y: 0, w: 2, h: 1},
      {i: 'e', x: 0, y: 4, w: 4, h: 1},
      {i: 'f', x: 0, y: 1, w: 8, h: 2},
      {i: 'g', x: 0, y: 2, w: 4, h: 2},
      {i: 'h', x: 4, y: 1, w: 4, h: 2}
    ],
    md: [
      {i: 'a', x: 0, y: 0, w: 1, h: 1},
      {i: 'b', x: 1, y: 0, w: 1, h: 1},
      {i: 'c', x: 0, y: 1, w: 1, h: 1},
      {i: 'd', x: 1, y: 1, w: 1, h: 1},
      {i: 'e', x: 2, y: 4, w: 4, h: 2},
      {i: 'f', x: 2, y: 2, w: 4, h: 2},
      {i: 'g', x: 0, y: 2, w: 4, h: 2},
      {i: 'h', x: 4, y: 2, w: 2, h: 2},
    ],
  };

//  const { date } = dateRangeModalProps();
  const onDragStart = (event) => {
    console.log("onDragStart")
  }
  const onDrag = (event) => {
    console.log("onDrag")
  }


  const someProps = {onDrag: onDrag, onDragStart: onDragStart};


  //      {...omit(fullPageTemplateProps(), 'ButtonBarWithIcons')}
  // actionBar={renderActionBar('ButtonBarWithIcons')}
  return (<div>

            <br/>
          <MagicWidgetGrid layouts={layouts} {...props} {...someProps} minWidth={1}>
            <Widget widgetId="a">
              <ValueIndicator mainValue={2444233} title={"Sales"} mainPostfix={""} tagPostfix={"%"} tagValue={25}/>
            </Widget>
            <Widget widgetId="b">
              <ValueIndicator mainValue={544233} title={"GM"} mainPostfix={""} tagPostfix={"%"} tagValue={15}/>
            </Widget>
            <Widget widgetId="c">
              <ValueIndicator mainValue={944233} title={"Units"} mainPostfix={""} tagPostfix={"%"} tagValue={5}/>
            </Widget>
            <Widget widgetId="d">
              <ValueIndicator mainValue={5} title={"GM %"} mainPostfix={""} tagPostfix={"%"} tagValue={25}/>
            </Widget>
            <ChartWidget
              title="Sales rate - very long title to check truncation"
              widgetId="e"
              {...(showActions ? getActionsProps({widgetId: 'e'}) : {})}
            >

              Could not find sales data
            </ChartWidget>

            <Widget
              horizontalScrollType={ScrollContainerScrollTypes.hidden}
              title="Promotion Dashboard"
              verticalScrollType={ScrollContainerScrollTypes.hidden}
              widgetId="f"
              {...(showActions ? getActionsProps({widgetId: 'f'}) : {})}
            >
              <WidgetContent overflowHidden>
                <Tabs>
                  <Tab label="Tab 1">
                    <WidgetChartWrapper>
                      <MultiLineChart
                        width="100%"
                        height="100%"
                        timeSeries={true}
                        data={timeSeriesData}
                        title="Product History"
                        height={300}
                        seriesLegendLabels={seriesLegendLabels}
                      />

                    </WidgetChartWrapper>
                  </Tab>
                  <Tab label="Tab 2">
                    <MockContent text="Content tab 2"/>
                  </Tab>
                  <Tab label="Tab 3">
                    <MockContent text="Content tab 3"/>
                  </Tab>
                  <Tab label="Tab 4">
                    <MockContent text="Content tab 4"/>
                  </Tab>
                </Tabs>
              </WidgetContent>
            </Widget>
            <ChartWidget
              widgetId="g"
              {...(showActions ? getActionsProps({widgetId: 'g', actions: false}) : {})}
            >
              <MultiLineChart
                width="100%"
                timeSeries={true}
                data={timeSeriesData}
                title="Product History"
                height={300}
                seriesLegendLabels={seriesLegendLabels}
              />
            </ChartWidget>
            <ChartWidget title="Widget H"
                         widgetId="h">
              <MultiLineChart
                width="100%"
                height="100%"
                timeSeries={true}
                data={timeSeriesData}
                title="Product History"
                height={300}
                seriesLegendLabels={seriesLegendLabels}
              />

            </ChartWidget>

          </MagicWidgetGrid>
    </div>
  );
}

export const WidgetDashboardInTheShell = ({ showActions, ...props }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [whichSideBar, setWhichSideBar] = useState("right");
  const [selectedWidgetId, setSelectedWidgetId] = useState(<div />);
  const [workspace, setWorkspace] = useState("overview");

  const {t} = useTranslation();

  const {formatDate} = useFormat();

  const summaryLayouts = {
    lg: [
      {i: 'a', x: 0, y: 0, w: 2, h: 1},
      {i: 'b', x: 2, y: 0, w: 2, h: 1},
      {i: 'c', x: 4, y: 0, w: 2, h: 1},
      {i: 'd', x: 6, y: 0, w: 2, h: 1},
    ],
    md: [
      {i: 'a', x: 0, y: 0, w: 1, h: 1},
      {i: 'b', x: 2, y: 0, w: 1, h: 1},
      {i: 'c', x: 0, y: 1, w: 1, h: 1},
      {i: 'd', x: 2, y: 1, w: 1, h: 1}
    ]
  };

  const layouts = {
    lg: [
      {i: 'a', x: 2, y: 0, w: 2, h: 1},
      {i: 'b', x: 4, y: 0, w: 2, h: 1},
      {i: 'c', x: 6, y: 0, w: 2, h: 1},
      {i: 'd', x: 8, y: 0, w: 2, h: 1},
      {i: 'e', x: 0, y: 4, w: 8, h: 2},
      {i: 'f', x: 2, y: 1, w: 6, h: 2},
      {i: 'g', x: 0, y: 2, w: 4, h: 2},
      {i: 'h', x: 4, y: 1, w: 4, h: 2},
      {i: 'notification', x:0, y:0,w:2,h:10},
      {i: 'summary', x:2,y:0,h:2,w:6}
    ],
    md: [
      {i: 'a', x: 0, y: 0, w: 1, h: 1},
      {i: 'b', x: 2, y: 0, w: 1, h: 1},
      {i: 'c', x: 0, y: 1, w: 1, h: 1},
      {i: 'd', x: 2, y: 1, w: 1, h: 1},
      {i: 'e', x: 4, y: 4, w: 4, h: 2},
      {i: 'f', x: 4, y: 2, w: 4, h: 2},
      {i: 'g', x: 2, y: 2, w: 4, h: 2},
      {i: 'h', x: 6, y: 2, w: 2, h: 2},
      {i: 'notification', x:0, y:0,w:2,h:8},
      {i: 'summary', x:0,y:0,h:4,w:4}
    ],
  };

//  const { date } = dateRangeModalProps();
  const onDragStart = (event) => {
    console.log("onDragStart")
  }
  const onDrag = (event) => {
    console.log("onDrag")
  }

  showActions = true;

  const valueWidgetActions = [

    {
      actionKey: "edit",
      onClick: () => alert("edit clicked"),
      renderIcon: <Edit size={24} />,
      iconDescription: "Edit"
    }
  ];

  const defaultFooterLeftActions = [

    {
      actionKey: "share",
      onClick: () => alert("share clicked"),
      renderIcon: <Share size={24} />,
      iconDescription: "Share",
    },
    {
      actionKey: "datainfo",
      onClick: () => alert("datainfo clicked"),
      renderIcon: <Information size={24} />,
      iconDescription: "Data Source",
    },
    {
      actionKey: "display as",
      onClick: () => alert("display as clicked"),
      renderIcon: <ChartBar size={24} />,
      iconDescription: "Change Visualization",
    }
  ];

  const defaultFooterRightActions = [

    {
      actionKey: "gotopage",
      onClick: () => alert("goto page clicked"),
      renderIcon: <ChevronRight size={24} />,
      kind: "link",
      text:"Go to Page",
      iconDescription: "Go To Page",
    },
  ];


  const loadMoreAction = [

    {
      actionKey: "loadmore",
      onClick: () => alert("load more clicked"),
      kind: "link",
      text:"Load more",
      iconDescription: "Go To Page",
    },
  ];

  const widgetDefinitions = {
    e: {
      actions: [
        {
          actionKey: "export",
          onClick: () => alert("export clicked"),
          renderIcon: <Download size={24} />,
          type: "secondary",
          iconDescription: "Export",
          tooltipPosition:"bottom"
        },
        {
          actionKey: "edit",
          onClick: () => { setOpenSideBar(!openSideBar); setWhichSideBar("right"); setSelectedWidgetId("e")},
          renderIcon: <Edit size={24} />,
          type: "secondary",
          iconDescription: "Edit",
          tooltipPosition:"bottom"
        },
        {
          actionKey: "full-screen",
          onClick: () => alert("full screen clicked"),
          renderIcon: <Maximize size={24} />,
          type: "secondary",
          iconDescription: "Full Screen",
          tooltipPosition:"bottom"
        },

      ],
    },
    notifications: {
      actions: [
        {
          actionKey: "calendar",
          onClick: () => alert("calendar clicked"),
          renderIcon: <Calendar size={24} />,
          type: "secondary",
          iconDescription: "Date Range",
          tooltipPosition:"bottom"
        },
        {
          actionKey: "filter",
          onClick: () => alert("filter clicked"),
          renderIcon: <Filter size={24} />,
          type: "secondary",
          iconDescription: "Filter",
          tooltipPosition:"bottom"
        }

      ],
    }

  }

  const notificationColors = {
    blue: {bg : "#E8f2fa", fg: "#3478c3" },
    red: {bg :"#f7e7e8", fg:"#bf2722" },
    green: {bg :"#edf4f4", fg:"#52958d" },
    orange: {bg :"#fef4ec", fg:"#ee9247" },
  }

  const mockNotifications = [
    {
      subTitle:"Alisha Barrett is requesting access to Autonomous Promotions",
      title:"Access request",
      kind:"info",
      date: "May 19",
      actionText:"Manage Users",
      notificationId : "1231-2133-1233-1222",
      action: () => {setWorkspace("usermgmt","/users/4123")}, // TODO: what is the right way to define actions.
      importance:1
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"error",
      date: "May 15",
      actionText:"Resolve",
      importance:2
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"error",
      date: "May 22",
      actionText:"Don't Panic",
      importance:3
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"info",
      date: "May 29",
      actionText:"Dismiss",
      importance:4
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"info",
      date: "May 9",
      actionText:"Dismiss",
      importance:5
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"error",
      date: "May 15",
      actionText:"Resolve",
      importance:6
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"warning",
      date: "May 18",
      actionText:"Resolve",
      importance:7
    },
    {
      title:"Notification Title",
      subTitle:"Description text.",
      kind:"success",
      date: "May 22",
      actionText:"Resolve",
      importance:8
    }
  ];

  const current = 22;
  const previous = 20;

  const execSummaryWidgetData =
    [
      {
        widgetId: "a",
        widgetType : 'PerformanceValueWidget',
        title : "Total Sales",
        value :'$24 Million',
        values :  [
          {valueText: "$2 Million", change: current - previous, description: "vs last year"},
          {valueText: "$250K", change: -1, description: "against plan"}
        ],
      },
      {
        widgetId: "b",
        widgetType : 'PerformanceValueWidget',
        title : "Total Gross Margin",
        value :'$13.6 Million',
        values :  [
          {valueText: "$2.2 Million", change: current - previous, description: "vs last year"},
          {valueText: "$198K", change: -1, description: "against plan"}
        ],
      },
      {
        widgetId: "c",
        widgetType: "SimpleValueWidget",
        widgetView: "number",
        title : "Promotion Effectiveness",
        value :'88%',
      },
      {
        widgetId: "d",
        widgetType: "SimpleValueWidget",
        widgetView: "gauge",
        title : "Campaign Success",
        value :61,
      },

    ]

  const getNotifications = () => {
    return mockNotifications.map(note => ({...note, color: notificationColors[note.color]}))
  }


  const getActionsProps = widgetObject =>  {
    if (
      widgetDefinitions[widgetObject.widgetId]
      &&
      widgetDefinitions[widgetObject.widgetId].actions) {
      return ({
        actions: widgetDefinitions[widgetObject.widgetId].actions,
      });
    } else {
      return {};
    }
  }

  const storageOfToolbar =  <div className={"three-column grid-gap-20"}>
    <ElevenDropDown
      selectedItem = {{"label":"Product","value":"hi"}}
      label={"Location"}
      items={[{"label":"Product","value":"hi"},{"label":"there","value":"there"}]}
    />

    <ElevenDropDown
      selectedItem = {{"label":"Location","value":"hi"}}
      label={"Location"}
      items={[{"label":"Location","value":"hi"},{"label":"there","value":"there"}]}
    />

    <DateInputEditor small compact
    />
  </div>


  const someProps = {onDrag: onDrag, onDragStart: onDragStart};

//  debugger;

  //      {...omit(fullPageTemplateProps(), 'ButtonBarWithIcons')}
  // actionBar={renderActionBar('ButtonBarWithIcons')}
  return (

    <Provider store={store}>
      <div className="cds-ui-shell">
        <div
          className="navigation cds-ui-shell__navigation"
          style={{height:"50px" }}
        >
          <ExampleHeader t={t} style={{"color":"white",backgroundColor:"#353963"}}>DemandTec Unity Logo </ExampleHeader>
        </div>
        <div className="cds-ui-shell__content" >

          <SideBarTemplate
            size={"wide"}
            place={whichSideBar }
            show={openSideBar}
            showExpander={false}
            sideBarHeader={"Widget Name"}
            sideBarFooter={<><Button kind={"secondary"}>Cancel</Button><Button>Apply</Button></>}
            marginlessPanel={true} overlay={true}
            sideBarBody={<WidgetPropertySheet widgetId={selectedWidgetId}/>}
            onCloseCallback={()=>setOpenSideBar(false)}
          >
            {
              workspace === "usermgmt"
              &&
              <FullPageTemplate header={<h4>user management</h4>}>
              </FullPageTemplate>
            }
            { workspace === "overview" &&
            <FullPageTemplate
              header={<h4>Welcome, Louis Roehrs</h4>}
              actionBar={
                <div className={"flex-right v-align-center"}>
                  <Button kind={"tertiary"} renderIcon={<Add size={24} />} small>Add Widget</Button>
                  <div style={{paddingLeft:"10px",paddingRight:"10px"}}></div>
                  <Button tooltipAlignment={"bottom"} iconDescription={"Late Night, Order DoorDash."} hasIconOnly kind={"ghost"} small renderIcon={<RestaurantFine size={24} />} />
                  <Button tooltipAlignment={"bottom"} iconDescription={"Share"} hasIconOnly kind={"ghost"} small renderIcon={<Share size={24} />} />
                  <Button tooltipAlignment={"bottom"} iconDescription={"Set Date Range"} hasIconOnly kind={"ghost"} small renderIcon={<Calendar size={24} />} />
                  <Button tooltipAlignment={"bottom"} iconDescription={"Filter"} hasIconOnly kind={"ghost"} small renderIcon={<Filter size={24} />} />
                  <Button tooltipAlignment={"bottom"} iconDescription={"Export"} hasIconOnly kind={"ghost"} small renderIcon={<Export size={24} />} />
                  {demoOverflowMenu}

                </div>
              }
            >

              <MagicWidgetGrid
                layouts={layouts}
                {...props}
                {...someProps}
                minWidth={1}
              >

                <Widget
                  widgetId ="summary"
                  title = "Executive Summary"
                  slim={false}
                  footer={true}
                  {...(showActions ? getActionsProps({widgetId: 'notifications'}) : {})}
                  footerLeftActions={ defaultFooterLeftActions}
                  footerRightActions={ defaultFooterRightActions}
                >

                  <WidgetContent>
                    <MagicWidgetGrid
                      layouts={summaryLayouts}
                      {...props}
                      {...someProps}
                      minWidth={1}
                    >
                      { execSummaryWidgetData.map(instrumentData => {
                          if (instrumentData.widgetType === "PerformanceValueWidget") {
                            return (
                              <PerformanceValueWidget
                                widgetId={instrumentData.widgetId}
                                overflowMenu={demoOverflowMenu}
                                title={instrumentData.title}
                                valueText={instrumentData.value}
                                values={instrumentData.values}
                                actions={valueWidgetActions}
                              />
                            )
                          }
                          if (instrumentData.widgetType === "SimpleValueWidget") {
                            return (
                              <SimpleValueWidget
                                widgetId={instrumentData.widgetId}
                                overflowMenu={demoOverflowMenu}
                                title={instrumentData.title}
                                valueText={instrumentData.value}
                                actions={valueWidgetActions}
                                widgetView={instrumentData.widgetView}
                              />
                            )
                          }
                        }
                      )
                      }
                    </MagicWidgetGrid>
                  </WidgetContent>

                </Widget>

                <Widget
                  widgetId = "notification"
                  title = "Weekly Activity Tracker"
                  slim={true}
                  {...(showActions ? getActionsProps({widgetId: 'notifications'}) : {})}
                  overflowMenu = {demoOverflowMenu}
                  footerCenterActions = {loadMoreAction}
                  metadata = {
                    <ElevenDropDown
                      items={[
                        {label:"Most recent",value:0},
                        {label:"Most severe",value:1},
                        {label:"Group by application", value:2}
                      ]}
                      selectedItem={
                        {label:"Most recent",value:0}
                      }
                      type={"secondary"}
                    />}

                >
                  <div style={{display:"grid",gridGap:4}} >
                    { mockNotifications.map (note => (

                      <ToastNotification
                        style={{width:"100%"}}
                        lowContrast={true}
                        caption={note.date}
                        key={note.title} // make note.id
                        title={note.title}
                        subtitle={note.subTitle}
                        kind={note.kind}
                      >
                        {note.actionText && <Button small kind="ghost" onClick={note.action} >{note.actionText}</Button> }
                      </ToastNotification>
                    ))
                    }
                  </div>
                  <br/>
                </Widget>
                {/*
            <Widget widgetId="a">
              <ValueIndicator mainValue={2444233} title={"Sales"} mainPostfix={""} tagPostfix={"%"} tagValue={25}/>
            </Widget>

            <Widget widgetId="b">
              <ValueIndicator mainValue={544233} title={"GM"} mainPostfix={""} tagPostfix={"%"} tagValue={15}/>
            </Widget>
            <Widget widgetId="c">
              <ValueIndicator mainValue={944233} title={"Units"} mainPostfix={""} tagPostfix={"%"} tagValue={5}/>
            </Widget>
            <Widget widgetId="d">
              <ValueIndicator mainValue={5} title={"GM %"} mainPostfix={""} tagPostfix={"%"} tagValue={25}/>
            </Widget>
            */}
                <ChartWidget
                  title="Sales rate - very long title to check truncation"
                  widgetId="e"
                  slim={true}
                  {...(showActions ? getActionsProps({widgetId: 'e'}) : {})}
                  overflowMenu = {demoOverflowMenu}
                  footerLeftActions={defaultFooterLeftActions}
                  footerRightActions={ defaultFooterRightActions}
                >
                  Could not find sales data
                </ChartWidget>

                <Widget
                  horizontalScrollType={ScrollContainerScrollTypes.hidden}
                  title="Promotion Dashboard"
                  slim={true}
                  verticalScrollType={ScrollContainerScrollTypes.hidden}
                  widgetId="f"
                  {...(showActions ? getActionsProps({widgetId: 'e'}) : {})}
                  footerLeftActions={defaultFooterLeftActions}
                  footerRightActions={ defaultFooterRightActions}
                >
                  <WidgetContent overflowHidden>
                    <Tabs>
                      <Tab label="Tab 1">
                        <WidgetChartWrapper>
                          <MultiLineChart
                            width="100%"
                            height="100%"
                            timeSeries={true}
                            data={timeSeriesData}
                            title="Product History"
                            height={300}
                            seriesLegendLabels={seriesLegendLabels}
                          />

                        </WidgetChartWrapper>
                      </Tab>
                      <Tab label="Tab 2">
                        <MockContent text="Content tab 2"/>
                      </Tab>
                      <Tab label="Tab 3">
                        <MockContent text="Content tab 3"/>
                      </Tab>
                      <Tab label="Tab 4">
                        <MockContent text="Content tab 4"/>
                      </Tab>
                    </Tabs>
                  </WidgetContent>
                </Widget>

                <Widget
                  title={"Product History"}
                  slim={true}
                  widgetId="g"
                  {...(showActions ? getActionsProps({widgetId: 'e', actions: false}) : {})}
                  footerLeftActions={defaultFooterLeftActions}
                  footerRightActions={ defaultFooterRightActions}
                >
                  <MultiLineChart
                    width="100%"
                    height="100%"
                    timeSeries={true}
                    data={timeSeriesData}
                    //title="Product History"
                    slim = {true}
                    height={300}
                    seriesLegendLabels={seriesLegendLabels}
                  />
                </Widget>
                <Widget title="Widget H"
                        widgetId="h"
                        slim={true}
                        {...(showActions ? getActionsProps({widgetId: 'e', actions: false}) : {})}
                        footerLeft={defaultFooterLeftActions}
                        footerRightActions={ defaultFooterRightActions}
                >
                  <MultiLineChart
                    width="100%"
                    height="100%"
                    timeSeries={true}
                    data={timeSeriesData}
                    title="Product History"
                    height={300}
                    seriesLegendLabels={seriesLegendLabels}
                  />

                </Widget>

              </MagicWidgetGrid>
              <br/><br/><br/>
            </FullPageTemplate>
            }
          </SideBarTemplate>
        </div>
      </div>
    </Provider>
  );
}

WidgetDashboardInTheShell.story = {
  parameters: {
    info: {
      disable:true
    }
  }
}



