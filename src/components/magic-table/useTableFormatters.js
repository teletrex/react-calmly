/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useMemo} from "react";

import FlexibleColumnHeader from "./flexible-column-header";
import TextInputEditor from "./editors/TextInputEditor";
import DateInputEditor  from "./editors/DateInputEditor";
import CheckboxEditor from "./editors/CheckboxEditor";
import ComboSelectEditor from "./editors/ComboSelectEditor";
import TextCell from "./cells/TextCell";
import NumberCell from "./cells/NumberCell";
import PercentCell from "./cells/PercentCell";
import CurrencyCell from "./cells/CurrencyCell";
import BiLevelPercentileIndicator from '../bi-level-percentile-indicator';
import PercentileIndicator from '../percentile-indicator';
import OpportunityCell from "./cells/OpportunityCell";
import TagCell from "./cells/TagCell"
import CheckmarkCell from "./cells/CheckmarkCell";

import {Checkbox, Link} from "@carbon/react";


/* preferenceParams
    reportName:
    aggregationLevel:
*/

const useTableFormatters = (events, locale, currency) => {

  /* Pass in the following handlers to events
  {onCellChange, onCellBlur, onCellClick, onEnterKey, onLinkClick, getInitialValue }

  The event handlers on* will call with the following parameters.

  (event, column, row.id, row, inputValue, initialValue, format)
  */


  /* This is the place to add new formatters for icons for status indicators, etc.     */
  /* Note that javascript has a nice Intl.NumberFormat package, no need to add others */

  const getConfig = (config) => {
    const {onCellChange, onCellBlur, onCellClick, onEnterKey, onLinkClick, getInitialValue } = ( events || {});
    return config.map(header => {

      let formatter, rawFormatter;

      if (header.format)
        if (header.format.indexOf("set.") > -1 && header.format.indexOf("tag.") > -1)   // sets are localized strings
          formatter = item => <TagCell  value={item[header.id]}/>;
        else if (header.format.indexOf("set.") > -1)
          formatter = item => <TextCell  value={item[header.id]}/>;
        else switch (header.format) {
            case "number":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'decimal',minimumFractionDigits:0,maximumFractionDigits:2});
              formatter = item =>
                <NumberCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "number3d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'decimal',minimumFractionDigits:3,maximumFractionDigits:3});
              formatter = item =>
                <NumberCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "number2d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'decimal',minimumFractionDigits:2,maximumFractionDigits:2});
              formatter = item =>
                <NumberCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "number1d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1});
              formatter = item =>
                <NumberCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "number0d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'decimal',minimumFractionDigits:0,maximumFractionDigits:0});
              formatter = item =>
                <NumberCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "numberround":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'decimal',maximumFractionDigits:1});
              formatter = item =>
                <NumberCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "percent":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'percent',minimumFractionDigits:1,maximumFractionDigits:1});
              formatter = item =>
                <PercentCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "percent0d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'percent',minimumFractionDigits:0,maximumFractionDigits:0});
              formatter = item =>
                <PercentCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "percent1d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'percent',minimumFractionDigits:1,maximumFractionDigits:1});
              formatter = item =>
                <PercentCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "percent2d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2});
              formatter = item =>
                <PercentCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "percent3d":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'percent',minimumFractionDigits:3,maximumFractionDigits:3});
              formatter = item =>
                <PercentCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "percentround":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'percent'});
              formatter = item =>
                <PercentCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "currency":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'currency', currency:currency||'USD',minimumFractionDigits:2});
              formatter = item =>
                <CurrencyCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;

            case "currencyround":
              rawFormatter = Intl.NumberFormat(locale || 'en-US',{style:'currency', currency:currency||'USD',maximumFractionDigits:0,minimumFractionDigits:0});
              formatter = item =>
                <CurrencyCell
                  value={item[header.id]}
                  rawFormatter={rawFormatter}
                />;
              break;
            case "checkbox":
              formatter = item => <Checkbox hideLabel labelText="" checked={item[header.value]===1 || item[header.value]}/>;
              break;
            case "string":
            case "date":
            case "datetime":
            case "predefined":
              formatter = item => <TextCell value={item[header.id]}/>;
              break;
            case "bilevelpercentile":
              formatter = item => <OpportunityCell value={item[header.id]}><BiLevelPercentileIndicator
                value={item[header.id]}/></OpportunityCell>;
              break;
            case "percentile":
              formatter = item => <OpportunityCell value={item[header.id]}><PercentileIndicator
                value={item[header.id]}/></OpportunityCell>;
              break;
            case "progress":
              formatter = item => <PercentileIndicator progress={true} bucketPointWidth={1} value={item[header.id]}/>;
              break;
            case "link":
              formatter = item => <Link href="#" onClick={(evt) => {
                onLinkClick(evt, header.id, item.id, item, item[header.id], item[header.id], header.format)
              }} type="default">{item[header.id]}</Link>;
              break;
            case "tag":
              formatter = item => <TagCell value={item[header.id]}/>;
              break;
            case "checkmark":
              formatter = item => <CheckmarkCell value={item[header.id]}/>;
              break;
            default:
              formatter = item => <TextCell value={item[header.id]}/>
          }
      else {
        formatter = item => <TextCell  value={item[header.id]}/>
      }

      let configuredHeader = {
        ...header,
        renderHeader: () => (<FlexibleColumnHeader header={header} />),
        renderCol: formatter,
        isSortable: header.sortable,
      }

      if (header.editorType) {
        let editor ;
        switch (header.editorType) {
          case "currency" :
          case "number" :
          case "wholecurrency" :
          case "wholenumber" :
            editor = item => <TextInputEditor onEnterKey={onEnterKey}
                                              onCellChange={onCellChange}
                                              onCellBlur={onCellBlur}
                                              editorType={header.editorType}
                                              disabled={item.disabled}
                                              id={header.id + "::" + item.id}
                                              column={header.id}
                                              row={item}
                                              format={header.format}
                                              hideLabel
                                              initialValue={item[header.id]}
                                              />;
            break;
          case "string" :
            editor = item => <TextInputEditor onEnterKey={onEnterKey}
                                              onCellChange={onCellChange}
                                              onCellBlur={onCellBlur}
                                              editorType={header.editorType}
                                              disabled={item.disabled}
                                              id={header.id + "::" + item.id}
                                              column={header.id}
                                              row={item}
                                              format={header.format}
                                              hideLabel
                                              initialValue={item[header.id]}/>;
            break;
          case "checkbox" :
            editor = item => <CheckboxEditor onCellChange={onCellChange}
                                             onCellBlur={onCellBlur}
                                             editorType={header.editorType}
                                             row={item}
                                             id={header.id +"::"+item.id}
                                             column={header.id}
                                             format={header.format}
                                             disabled={item.disabled}
                                             className="story-text-input"
                                             hidelabel
                                             initialValue={getInitialValue  && getInitialValue(header.id, item) || item[header.id]}/>;
            break;
          case "ddddatebox" :
            //TODO put this back in datebox!
            editor = item => item[header.id];
            break;
          case "datebox":
            editor = item => <DateInputEditor onCellChange={onCellChange}
                                              onCellBlur={onCellBlur}
                                              editorType={header.editorType}
                                              disabled={item.disabled}
                                              readOnly={header.readOnly}
                                              id={header.id + "::" + item.id}
                                              column={header.id}
                                              row={item}
                                              initialValue={item[header.id]}
                                              {...header.editorProps}
            />;
            break;
          case "dropdown":
            editor = (item,menus) => <ComboSelectEditor onCellChange={onCellChange}
                                                        onCellBlur={onCellBlur}
                                                        onCellClick={onCellClick}
                                                        editorType={header.editorType}
                                                        disabled={item.disabled}
                                                        id={header.id + "::" + item.id}
                                                        key={header.id + "::" + item.id}
                                                        column={header.id}
                                                        row={item}
                                                        format={header.format}
              // get the menus for that row if available, if not, get the menus for that column
                                                        menuItems={menus}
                                                        initialValue={item[header.id]}
                                                        nullable={false}
            />
            break;
          case "dropdownNullable":
            editor = (item,menus) => <ComboSelectEditor onCellChange={onCellChange}
                                                        onCellBlur={onCellBlur}
                                                        onCellClick={onCellClick}
                                                        editorType={header.editorType}
                                                        disabled={item.disabled}

                                                        id={header.id + "::" + item.id}
                                                        column={header.id}
                                                        row={item}
                                                        format={header.format}
              // get the menus for that row if available, if not, get the menus for that column
                                                        menuItems={ menus }
                                                        initialValue={item[header.id]}
                                                        nullable={true}
            />
            break;
          case "comboDropdown":
            editor = (item,menus) => <ComboSelectEditor onCellChange={onCellChange} onCellBlur={onCellBlur}
                                                        onCellClick={onCellClick}
                                                        editorType={header.editorType}
                                                        disabled={item.disabled}
                                                        id={header.id + "::" + item.id} column={header.id} row={item}
                                                        format={header.format}
              // get the menus for that row if available, if not, get the menus for that column
                                                        menuItems={ menus }
                                                        initialValue={item[header.id]}
                                                        nullable={false}
                                                        allowTypeIn={true}
            />
            break;
          case "comboDropdownNullable":
            editor = (item,menus) => <ComboSelectEditor onCellChange={onCellChange}
                                                        onCellBlur={onCellBlur}
                                                        onCellClick={onCellClick}
                                                        editorType={header.editorType}
                                                        disabled={item.disabled}
                                                        id={header.id + "::" + item.id} column={header.id} row={item}
                                                        format={header.format}
              // get the menus for that row if available, if not, get the menus for that column
                                                        menuItems={ menus }
                                                        initialValue={item[header.id]}
                                                        nullable={true}
                                                        allowTypeIn={true}
            />
            break;
          default:
            editor = item => <TextInputEditor onEnterKey={onEnterKey}
                                              onCellChange={onCellChange}
                                              onCellBlur={onCellBlur}
                                              editorType={header.editorType}
                                              disabled={item.disabled}
                                              id={header.id + "::" + item.id}
                                              column={header.id}
                                              row={item}
                                              format={header.format}
                                              hideLabel
                                              initialValue={item[header.id]}/>;

            break;
        }

        configuredHeader = {
          ...configuredHeader,
          renderCol: editor,
          isEditable: true
        }
      }
      return configuredHeader
    })
  }

  const getTableConfig = (gridAggregationDefinition, userReportPreference, extraConfig) => {
    let tableConfig = getConfig(gridAggregationDefinition.columns);
    if (typeof extraConfig  != "undefined") {
      tableConfig = extraConfig(tableConfig);
    }
    let preferredTableConfig = tableConfig;
    let workingTableConfig = null;
    if (userReportPreference && userReportPreference.columnPreferences && userReportPreference.columnPreferences.length>0) {
      workingTableConfig = tableConfig.map(column => {
        const thisColumnPref = userReportPreference.columnPreferences.find(columnPref => columnPref.id === column.id);
        if (thisColumnPref) {
          return Object.assign(column, {order: thisColumnPref.order, visible: thisColumnPref.visible, alwaysVisible:thisColumnPref.alwaysVisible,  defaultWidth: thisColumnPref.width})
        }
        return column;
      })
    } // else apply the default configuration.
    else {
      workingTableConfig = tableConfig.map ( (column, index) => {
        return Object.assign(column, {order: index, visible: column.defaultVisible, alwaysVisible: column.alwaysVisible,  width: column.defaultWidth});
      })
    }
    preferredTableConfig = workingTableConfig.filter(column => column.visible).sort((a,b) => a.order - b.order);
    return preferredTableConfig;
  }

  const getColumnWidths = (userReportPreference, gridAggregationDefinition) => {
    const columnWidths = {};
    if (userReportPreference && userReportPreference.columnPreferences) {
      userReportPreference.columnPreferences.map((columnPreference) =>
        columnWidths[columnPreference.id] = columnPreference.width || 200
      )
      return columnWidths;

    } else if (gridAggregationDefinition && gridAggregationDefinition.columns) {
      gridAggregationDefinition.columns.map((column) => {
        let columnWidth = 200;
        if (column.defaultWidth) columnWidth = column.defaultWidth
        columnWidths[column.id] = columnWidth;
      });
      return columnWidths;
    } else {
      return { }
    }
  };

  return {
    getTableConfig: getTableConfig,
    getConfig: getConfig,
    getColumnWidths: getColumnWidths,
  };
};

export default useTableFormatters;
