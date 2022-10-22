/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */





import React, {useState, useEffect, useCallback, lazy, useMemo} from 'react';

import { Provider,useSelector } from 'react-redux';
import workspaceServices from "../../services/workspaceServices";
import useTranslation from "../../translation/useTranslation";


import {
  Button,
  OverflowMenu,
  OverflowMenuItem
} from '@carbon/react';


import SideBarTemplate from '../side-bar-template';
import FullPageTemplate from '../full-page-template';
import {useFormat} from '../format';

import {
  Calendar,
  Filter,
  Share,
  ChartBar,
  Information,
  ChevronRight,
  Add,
  RestaurantFine,
  Export,
  Download,
  Edit,
  Maximize
} from "@carbon/icons-react";

import MagicWidgetGrid from "./MagicWidgetGrid";
import WidgetPropertySheet from "./WidgetPropertySheet";
import WidgetLibrary from "./WidgetLibrary";
import {action} from '@storybook/addon-actions';
import store from '../../store';
import ExampleHeader from "../example-header/ExampleHeader";
import workspaceDataJson from '../../assets/mockdata/workspaces/workspace-overview-default.js';
import principalDataJson from '../../assets/mockdata/iam/principal.js'
import widgetDefinitions from "../../assets/mockdata/widget-library/widget-definitions.js";
import serviceApi from "../../services/serviceApi";
import workspaceReducer from "../workspace/workspaceSlice";



export default {
  title: 'Dashboard/MagicWidgetGrid',
  component: MagicWidgetGrid,
}

export const DataDrivenWidgetDashboardInTheShell = ({ showActions, ...props }) => {

  // Shell level
  const [openSideBar, setOpenSideBar] = useState(false);
  const [whichSideBar, setWhichSideBar] = useState("right");
  const [editingWidgetPropertySheet,setEditingWidgetPropertySheet] = useState(null);
  const [sideBarTitleText, setSideBarTitleText] = useState("SideBarTitleText")
  const [sideBarBody, setSideBarBody] = useState(null);
  const [sideBarFooter, setSideBarFooter] = useState(null);
  const [workspaceId, setWorkspaceId] = useState("overview");

  // TODO: change later when workspaceDataJson is loaded from BE
  // Breakout the workspace component so all this will happen inside the Provider.
//  const {workspaceConfiguration} = useSelector(state => state.workspaces.myWorkspaces);

  // this state stays at a app level and feeds a workspace component to be built.
  const [workspaceConfiguration, setWorkspaceConfiguration] = useState(workspaceDataJson) // demo

  // These probably go inside the workspace component
  const [selectedWidgetId, setSelectedWidgetId] = useState("e");
  const [workspace, setWorkspace] = useState("overview");
  const [widgetNodes,setWidgetNodes] = useState([]);

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


  const {t} = useTranslation();

  const {formatDate} = useFormat();

  // get the workspace definitions. Done
  // get the widget definitions  working on it.
  // set up change actions
  // edit widget
  // dupe widget
  // add widget
  //

//  const { date } = dateRangeModalProps();
  const onDragStart = (event) => {
    console.log("onDragStart")
  }
  const onDrag = (event) => {
    console.log("onDrag")
  }

  showActions = true;

  const defaultFooterLeftActions = [

    {
      actionKey: "share",
      onClick: () => alert("share clicked"),
      renderIcon: <Share size={24}/>,
      iconDescription: "Share",
    },
    {
      actionKey: "datainfo",
      click: (widgetId) => {
        const widgetConfiguration = workspaceConfiguration.widgets.find(widget => widget.id ===widgetId);
        alert(JSON.stringify(widgetConfiguration.dataSelection));
      },
      renderIcon: <Information size={24}/>,
      iconDescription: "Data Source",
    },
    {
      actionKey: "display as",
      onClick: () => alert("display as clicked"),
      renderIcon: <ChartBar size={24}/>,
      iconDescription: "Change Visualization",
    }
  ];

  const defaultFooterRightActions = [

    {
      actionKey: "gotopage",
      onClick: () => alert("goto page clicked"),
      renderIcon: <ChevronRight size={24}/>,
      kind: "link",
      text:"Go to Page",
      iconDescription: "Go To Page",
    },
  ];

  const getCurrentWidget = useCallback(() => {
    return widgets;
  } );

  const loadMoreAction = [
    {
      actionKey: "loadmore",
      onClick: () => alert("load more clicked"),
      kind: "link",
      text:"Load more",
      iconDescription: "Go To Page",
    },
  ];

  const doCustomActionClick= (widgetId, params) => {
    const sections = params.split('/');
    setWorkspace(sections[0]);
  }

  const standardWidgetActions = {   // hidden action (thinking how this should work in data defined mode
    customAction: {
      key:"customAction",
      click: (widgetId, params) => {
        console.log("customAction onclick"+widgetId+"!" + JSON.stringify(params))
        doCustomActionClick(widgetId,params);
      },
    },
    export: {
      type: "button",
      key: "export",
      click: () => alert("export clicked"),
      renderIcon: <Download size={24}/>,
      iconDescription: "Export",
      tooltipPosition: "bottom"
    },
    edit: {
      key: "edit",
      type: "button",
      click: (widgetId) => {
        console.log("onclick"+widgetId+"!")
        setOpenSideBar(true);
        setWhichSideBar("right");
        setSelectedWidgetId(widgetId)
        const widgetConfiguration = workspaceConfiguration.widgets.find(widget => widget.id ===widgetId);
        widgetConfiguration.isEditing = true;

        let editingPropertySheet = widgetDefinitions.widgetDefinitions[ widgetConfiguration.definitionId];
        editingPropertySheet.id = widgetId;
        editingPropertySheet = {...editingPropertySheet, ...widgetConfiguration}

        setSideBarTitleText(editingPropertySheet.title);
        setSideBarBody(
          <WidgetPropertySheet
            widgetId={widgetId}
            widgetConfiguration={editingWidgetPropertySheet || editingPropertySheet}  // should be from workspace config

            onPropertySheetChange={propertySheet => {
              editingPropertySheet = {...propertySheet}
              setSideBarTitleText(editingPropertySheet.title);
              setEditingWidgetPropertySheet({...propertySheet});

            }
            }

          />
       )
        setSideBarFooter(
          <>
            <Button kind={"secondary"} onClick={closeSideBar}>Cancel</Button>
            <Button onClick={() => {
              const  myEditingWidgetPropertySheet = {...editingPropertySheet}
              setWorkspaceConfiguration(
                {
                  ...workspaceConfiguration,
                  widgets: [
                    ...workspaceConfiguration.widgets.filter(widget => widget.id !== myEditingWidgetPropertySheet.id),
                    myEditingWidgetPropertySheet
                  ]
                }
              )
              closeSideBar();
              setEditingWidgetPropertySheet(null)
            }
            }
            >Apply</Button>
          </>)
      },

      renderIcon: <Edit size={24}/>,
      iconDescription: "Edit",
      tooltipPosition: "bottom"
    },

    // maximize looked easy, but this will actually take some work and customization of react-grid-layout to
    // work well.
    lock: {
      type: "button",
      key: "lock",
      click: (widgetId) => {
        const widgetConfiguration = workspaceConfiguration.widgets.find(widget => widget.id === widgetId);

        widgetConfiguration.isLocked = true;
        /*  TODO: set the layouts for widgetId to static:true
        setWorkspaceConfiguration(
          {
            ...workspaceConfiguration,
            layouts: [
              ...workspaceConfiguration.widgets.filter(widget => widget.id !== widgetId),
              widgetConfiguration
            ]
          }
        )*/
      },
      //click: () => alert("full screen clicked"),
      renderIcon: <Maximize size={24}/>,
      iconDescription: "Full Screen",
      tooltipPosition: "bottom"
    },

    maximize: {
      type: "button",
      key: "maximize",
      click: (widgetId) => {
        const widgetConfiguration = workspaceConfiguration.widgets.find(widget => widget.id === widgetId);

        widgetConfiguration.isMaximized = false; //disabled.   should toggle.
        setWorkspaceConfiguration(
          {
            ...workspaceConfiguration,
            widgets: [
              ...workspaceConfiguration.widgets.filter(widget => widget.id !== widgetId),
              widgetConfiguration
            ]
          }
        )
      },
      //click: () => alert("full screen clicked"),
      renderIcon: <Maximize size={24}/>,
      iconDescription: "Full Screen",
      tooltipPosition: "bottom"
    },
    filter: {
      type: "button",
      key: "filter",
      click: () => alert("filter clicked"),
      renderIcon: <Filter size={24}/>,
      iconDescription: "Filter",
      tooltipPosition: "bottom"
    },
    calendar: {
      type: "button",
      key: "calendar",
      click: () => alert("calendar clicked"),
      renderIcon: <Calendar size={24}/>,
      iconDescription: "Date Range",
      tooltipPosition: "bottom"
    }
  }

  const actionFactory = (actionName,widgetId) => {
    return action;
  }

  const getActionsProps = widget =>  {
    if (
      widget
      &&
      widget.actions) {

      return (widget.actions.map((actionName) =>
      {
        let action = Object.assign({},standardWidgetActions[actionName]);
        action.onClick = (params) =>  action.click(widget.widgetId,params);
        return action;
      }))
    }
    else {
      return [];
    }
  }

  const someProps = {onDrag: onDrag, onDragStart: onDragStart};

  const importWidget = widgetComponentName =>
    lazy(() => {
      console.log(widgetComponentName)
      return (
      import(`../widget-library/${widgetComponentName}`).catch(() => import(`../widget-library/NullWidget`))
    )});


  // init
//  useEffect( ()=> {
// TODO: BE    workspaceServices(serviceApi).getWorkspace(workspaceId);
//    setWorkspaceConfiguration(workspaceDataJson) // demo
//  },[workspaceDataJson]);


  useEffect( () =>
    async function loadWorkspaces(workspaceId) {
      workspaceServices(serviceApi.work)
    },[workspaceId]
  )


  useEffect(() => {
    async function loadWidgets() {

      // This is the WidgetBuilder.
      // attach all the actions and everything here for each widget.
      const widgetsToShow = workspaceConfiguration.widgets.map(widget => {
        let workspaceWidget = Object.assign({},widgetDefinitions.widgetDefinitions[widget.definitionId],widget);
        workspaceWidget.widgetId = widget.id;
        return workspaceWidget;
        }
      );

      const componentPromises = widgetsToShow.map(async (widget,index) => {
        const DynoWidget = await importWidget(widget.component);
        console.log("widget: " +widget.component);
        console.log("widget: " +JSON.stringify(widget));
        return (
          <DynoWidget
            key={widget.widgetId}
            {...widget }
            dataGrid={{...widget}}
            footerLeftActions={defaultFooterLeftActions}
            footerRightActions={defaultFooterRightActions}
            actions={getActionsProps(widget)}
            overflowMenu={demoOverflowMenu}
          />
        )
      });
      Promise.all(componentPromises).then(setWidgetNodes);
    }

    loadWidgets();
  }, [workspaceConfiguration, widgetDefinitions]);


  const handleAddWidgetToWorkspace = async (widgetDef) => {
    const newWidgetId = 'n'+Math.floor(Math.random()*100000000)
    const widget = Object.assign({},
      {
        ...widgetDef,
        id: newWidgetId,
        key: newWidgetId,
        widgetId: newWidgetId,
      }
    )

    const newWidgetLayout = {i: newWidgetId, x:0,y:11,w:widget.w,h:widget.h,minW:3,minH:2};

    setWorkspaceConfiguration(
      {
        ...workspaceConfiguration,
        widgets : [ ...workspaceConfiguration.widgets, widget],
        layouts : {
          lg: [ ...workspaceConfiguration.layouts.lg, newWidgetLayout],
          md: [ ...workspaceConfiguration.layouts.md, newWidgetLayout]
        }
      }
    )

  }

  const handleLayoutChange = (layoutForThisBreakpoint,layoutKeyedByBreakpoint) => {
   setWorkspaceConfiguration(
     {
       ...workspaceConfiguration,
       layouts : {
         ...layoutKeyedByBreakpoint
       }
     }
   )

  }

  const handleAddWidgetButton = () =>
  {
    setSideBarBody(<WidgetLibrary
      widgets={widgetDefinitions.widgetDefinitions}
      onAddSelectedWidget={handleAddWidgetToWorkspace}
    />);
    setSideBarTitleText(null);
    setSideBarFooter(<><Button kind={"secondary"}>Cancel</Button><Button kind={"primary"} onClick={closeSideBar}>Done</Button></>)
    setOpenSideBar(true);
  }

  const closeSideBar = () => setOpenSideBar(false);

  // DATA DRIVEN
  return (

    <Provider store={store}>
      <div >
        <div
          style={{height:"50px" }}
        >
          <ExampleHeader t={t} style={{"color":"white",backgroundColor:"#353963"}}>DemandTec Unity Logo </ExampleHeader>
        </div>
        <div>

          <SideBarTemplate
            size={"wide"}
            place={whichSideBar }
            show={openSideBar}
            showExpander={false}
            sideBarHeader={sideBarTitleText}
            sideBarFooter={sideBarFooter}
            marginlessPanel={true} overlay={true}
            sideBarBody={sideBarBody}
            onCloseCallback={closeSideBar}
          >
            <FullPageTemplate
              header={<h4>{
                (workspaceConfiguration.template === "overview"
                &&
                "Welcome, "+principalDataJson.firstName)
                || workspaceConfiguration.title}</h4>}
              actionBar={
                <div className={"flex-right v-align-center"}>
                  <Button tooltipPosition={"bottom"} kind={"tertiary"} renderIcon={<Add size={24}/>} size="small" onClick={handleAddWidgetButton}>Add Widget</Button>
                  <div style={{paddingLeft: "10px", paddingRight: "10px"}}/>
                  <Button tooltipPosition={"bottom"} iconDescription={"Late Night, Order DoorDash."} hasIconOnly kind={"ghost"}  size="small" renderIcon={<RestaurantFine  size={24}/>} />
                  <Button tooltipPosition={"bottom"} iconDescription={"Share"} hasIconOnly kind={"ghost"}  size="small" renderIcon={<Share size={24}/>} />
                  <Button tooltipPosition={"bottom"} iconDescription={"Set Date Range"} hasIconOnly kind={"ghost"}  size="small" renderIcon={<Calendar size={24}/>} />
                  <Button tooltipPosition={"bottom"} iconDescription={"Filter"} hasIconOnly kind={"ghost"}  size="small" renderIcon={<Filter size={24}/>} />
                  <Button tooltipPosition={"bottom"} iconDescription={"Export"} hasIconOnly kind={"ghost"}  size="small" renderIcon={<Export size={24}/>} />
                  {demoOverflowMenu}
                </div>
              }
            >
              <React.Suspense fallback={""}>
              <MagicWidgetGrid
                // DATA DRIVEN
                layouts={workspaceConfiguration.layouts}
                {...props}  // widget definitions, configurations and data
                {...someProps}  //drag and drop
                minWidth={1}  // might be set by widget type
                onLayoutChange={handleLayoutChange}
              >{ widgetNodes }</MagicWidgetGrid>
              </React.Suspense>
            </FullPageTemplate>

          </SideBarTemplate>
        </div>
      </div>

    </Provider>

  );
}

DataDrivenWidgetDashboardInTheShell.story = {
  parameters: {
    info: {
      disable:true
    },
    docs: {
      source: {
        // This son of a biscuit eater consumed 2 hours of Googling to find an answer.
        //
        code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554"
      }
    }
  }
}

