/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, {useState, useCallback, useEffect} from 'react';
import classNames from 'classnames';

import {
  Form,
  FormGroup,
  TextInput,
  Select,
  SelectItem,
  TextArea,

  Accordion,
  AccordionItem,
  TileGroup,
  RadioTile,
  Toggle,
} from '@carbon/react';

import AddTags from '../add-tags';
import DataSelectionRuleBuilder from '../data-selection/DataSelectionRuleBuilder';

import { widgetClassBuilder } from './utils';
import {
  widgetHeaderHasContent,
  WidgetFooter
} from './components';

import { WidgetPropTypes, WidgetDefaultProps } from './prop-types';
import { usePreventMouseDownPropagation } from './usePreventMouseDownPropagation';
import ElevenDropDown from "../hover-better-dropdown/HoverBetterDropDown";
import FlexBox from "../../containers/FlexBox";

const WidgetPropertySheet = props => {
  const {
    widgetConfiguration,
    onPropertySheetChange,
    onNameChange,
  } = props;

// Tag support
  const [widgetTags, setWidgetTags] = useState([]);
  const [widgetProperties, setWidgetProperties] = useState(widgetConfiguration);

  useEffect(()=> {
    setWidgetProperties(widgetConfiguration);
  },[widgetConfiguration]);

  const handleWidgetNameChange = (event) => {
    const myWidgetProperties =
      {
        ...widgetProperties,
        title: event.target.value()
      }
    setWidgetProperties(myWidgetProperties)
    onPropertySheetChange(myWidgetProperties)
  };

  // called with a {property: value} object from the inputs onChange usually
  const handleInputChange = useCallback((propAndValue) => {
    const myWidgetProperties =
      {
        ...widgetProperties,
        ...propAndValue
      };
    setWidgetProperties(myWidgetProperties);
    onPropertySheetChange(myWidgetProperties);
  });

  const beatMe = (propAndValue) => {
    alert(JSON.stringify(propAndValue));
  }
  if (!widgetConfiguration ) return (<div>No Widget Found</div>);

  const dataSelectionRules = widgetProperties.dataSelection;
  const handleRulesChange = useCallback( () =>
    (rules) => handleInputChange({dataSelection :{...rules}})
    ,[handleInputChange]
  );

    return (
    // design shows Widgets as focusable
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions

    <div style={{display:"flex", flexDirection:"column", rowGap:"10px",paddingTop:"10px"}}>
      <Form>
        <Accordion isUppercase={false}>

          <AccordionItem
            title={"Properties"}>
            <div   style={{display:"flex", flexDirection:"column", rowGap:"15px"}}>

            <TextInput
              value={widgetProperties.title}
              id={"widget-name"}
              labelText={"Widget Name"}
              onChange={event => handleInputChange({ title: event.target.value})}
            />
              <ElevenDropDown
                items={
                  [
                    {
                      label: "Collaborations",
                      value: "Collaborations"
                    },
                    {
                      label: "Engagements",
                      value: "Engagements"
                    },
                    {
                      label: "Promotions",
                      value: "Promotions"
                    },
                    {
                      label: "Pricing Plans",
                      value: "Pricing Plans"
                    },
                    {
                      label: "Anomalies",
                      valuee: "Anomalies",
                    }
                  ]
                }

                id="select-1"
                titleText="Data Objects"
                selectedItem={
                  typeof widgetProperties.datasource === "object" ?
                    { label: widgetProperties.datasource.value,
                      value:  widgetProperties.datasource.value} :
                    {label:"Please select a data object type",value:"null"}
                }
                onChange={selectedItem => handleInputChange({datasource: selectedItem.selectedItem})}
                // onChange={selectedItem => handleInputChange({datasource: selectedItem.selectedItem.value})}
              />
              <ElevenDropDown
                items={
                  [
                    {
                      label: "Collaboration",
                      value: "Collaboration"
                    },
                    {
                      label: "Engage",
                      value: "Engage"
                    },
                    {
                      label: "Pricing",
                      value: "Pricing"
                    },
                    {
                      label: "Promotions",
                      value: "Promotions"
                    },
                    {
                      label: "Tealeaf",
                      value: "Tealeaf"
                    }
                  ]
                }

                id="application"
                titleText="Application"
                selectedItem={
                  typeof widgetProperties.application === "object" ?
                    { label: widgetProperties.application.value,
                      value:  widgetProperties.application.value} :
                    {label:"Please select a source application",value:"null"}
                }
                onChange={selectedItem => handleInputChange({application: selectedItem.selectedItem})}
              />
              {/*              <div>TITLE{widgetProperties.title}</div>
              <div>DESC{widgetProperties.description}</div>
              <div>RULES{JSON.stringify(widgetProperties.dataSelection)}</div>
              <div>SOURCE {widgetProperties.datasource && widgetProperties.datasource.value}</div>
              */}
            <TextArea
              key={"description"}
              carbonTextAreaProps= {{   // TODO:   REWRITE DECIBEL!!!    WHAT THE HELL IS THIS INCONSISTENT UNDOCED CRAP!
                labelText: 'Description',
                placeholder: 'Placeholder text',
                id: 'test5',
                cols: 50,
                rows: 4,
                value : widgetProperties.description,
                onChange:event => handleInputChange({ description: event.target.value})
              }}

              showCharCounter={true}
              maxChars= {100}/>


            <AddTags
              id="widgetTags"
              onAddTag={tags => handleInputChange({tags:tags})}
              onDeleteTag={tags => handleInputChange({tags:tags})}
              //          suggestions={suggestions}
              tagExistsError="Tag Exists"
              tags={widgetProperties.tags || []}
            />
              <ElevenDropDown
                items={
                  [
                    {
                      label: "Data Visualizations & Analytics",
                      value: "Data Visualizations & Analytics"
                    },
                    {
                      label: "IFrame",
                      value: "IFrame"
                    },
                    {
                      label: "Navigation",
                      value: "Navigation"
                    },
                    {
                      label: "PartnerAPI",
                      value: "PartnerAPI"
                    }
                  ]
                }

                id="widgetType"
                titleText="Widget Type"
                selectedItem={
                  typeof widgetProperties.widgetType === "object" ?
                    { label: widgetProperties.widgetType.value,
                      value:  widgetProperties.widgetType.value} :
                    {label:"Please select a widget type",value:"null"}
                }
                onChange={selectedItem => handleInputChange({widgetType: selectedItem.selectedItem})}
              />

            </div>
          </AccordionItem>
          <AccordionItem title={"Capabilities"}>
            <div   style={{display:"flex", flexDirection:"column", rowGap:"15px"}}>
            <TileGroup
              defaultSelected={widgetProperties.visualizationChartType} //"default-selected"
              legend="Visualization Options"
              name="visualization-options"
              onChange={value => handleInputChange({visualizationChartType:value})}
            >
              <RadioTile id="tile-1" name="Pie" value="pie">
                Pie
              </RadioTile>
              <RadioTile id="tile-2" name="Bar" value="default-selected">
                Bar
              </RadioTile>
              <RadioTile id="tile-3" name="Line" value="line">
                Line
              </RadioTile>
              <RadioTile id="tile-4" name="Grid" value="grid">
                Grid
              </RadioTile>
            </TileGroup>


              <Toggle
                toggled={widgetProperties.isSharable}
                onChange={event => handleInputChange({isSharable:event.target.checked})}
                size={"sm"}
                labelText={"Widget capabilities"}
                labelA={"Allow others to share this widget within your organization"}
                labelB={"Allow others to share this widget within your organization"}
              />

              <Toggle
                toggled={widgetProperties.isExportable}
                onChange={event => handleInputChange({isExportable:event.target.checked})}
                size={"sm"}
                labelA={"Allow exporting data from this widget into an Excel file"}
                labelB={"Allow exporting data from this widget into an Excel file"}
              />

              <Toggle
                toggled={widgetProperties.isPrintable}
                onChange={event => handleInputChange({isPrintable:event.target.checked})}
                size={"sm"}
                labelA={"Allowing printing of this widget"}
                labelB={"Allowing printing of this widget"}
              />

              <Toggle
                toggled={widgetProperties.isCalculationVisible}
                onChange={event => handleInputChange({isCalculationVisible:event.target.checked})}

                size={"sm"}
                labelA={"Show users how this widget is calculated"}
                labelB={"Show users how this widget is calculated"}
              />

              <Toggle
                toggled={widgetProperties.isPinnable}
                onChange={event => handleInputChange({isPinnable:event.target.checked})}

                size={"sm"}
                labelA={"Allow this widget to be pinned as a favorite"}
                labelB={"Allow this widget to be pinned as a favorite"}
              />

            </div>

          </AccordionItem>
          <AccordionItem title={"Data selection"}>
            <div  style={{display:"flex", flexDirection:"column", rowGap:"15px"}}>
              <DataSelectionRuleBuilder
//                onRulesChange= { beatMe}
                onRulesChange={handleRulesChange}
                value = {dataSelectionRules} // ? dataSelectionRules : {"conjunction":"AND","data":[{"criteriaKey":"","data":{"operator":"","value":""}}]}}
//                value = {{"conjunction":{"conjunction":"AND"},"data":[{"criteriaKey":"CUSTOMERS","data":{"operator":"IS","value":"AHOLD"}}]}}
              />
            </div>
          </AccordionItem>
          <AccordionItem title={"Automation"}>
            <FlexBox flexDirection={"column"} gridGap={"20px"}>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </FlexBox>
          </AccordionItem>
        </Accordion>
        <FlexBox flexDirection={"column"} gridGap={"20px"}>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </FlexBox>

      </Form>
    </div>
  );
};

WidgetPropertySheet.propTypes = WidgetPropTypes;
WidgetPropertySheet.defaultProps = WidgetDefaultProps;

export default WidgetPropertySheet;
