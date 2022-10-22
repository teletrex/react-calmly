/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import FlexibleColumnHeader from '../magic-table/flexible-column-header';

import {DataTable,
        Checkbox,
        ContentSwitcher,
        Switch,
        TextInput,
        } from '@carbon/react';

import {useFormat} from '../format';

const TableConfigurator = ({
  t,
  reportName,
  aggregationLevel,
  gridDefinition,
  userGridPreferences,
  onUserGridPreferencesChanged,
  ...otherProps
}) => {

//  const {t} = useTranslation();
//  const t = (str) => str;

  const END_ORDER = 100000;  // some number way bigger than number of columns but less that Number.MAX_SAFE_INTEGER because order for new columns needs to be maintained.

  const getReportGridConfigData = (gridDefinition, userGridPreferences) => {
    if (typeof userGridPreferences == "undefined" || userGridPreferences == null || typeof userGridPreferences.columnPreferences == "undefined")   // no prefs show default config
      return gridDefinition
        .columns
        .filter(column => column.id !== "id" && !column.hiddenFromConfigurator)
        .map((column, index) =>
        ({
          key: column.id,
          id: index,
          order: index + 1,
          visible: column.defaultVisible   || column.alwaysVisible,
          alwaysVisible: column.alwaysVisible,
          width: column.defaultWidth || 200,
          columnname: column.title + " " + ( typeof column.subTitle == "undefined" ? "":column.subTitle)
        })
      ).sort((a,b) => (a.order - b.order));
    else {
      let newColumns = [];  // new columns add to the grid def since last userreportpref save.
      let gridColumn = null;
      let preffedColumns = gridDefinition.columns.filter(col=>!col.hiddenFromConfigurator).map((column, index) => {
        const userPrefColumn = userGridPreferences.columnPreferences.find(prefColumn => column.id === prefColumn.id);

        return ({
            key: column.id,
            id: userPrefColumn ? userPrefColumn.order - 1 : END_ORDER + index,
            order: userPrefColumn ? userPrefColumn.order : END_ORDER + index,
            visible: userPrefColumn ? userPrefColumn.visible || column.alwaysVisible : column.defaultVisible || column.alwaysVisible,
            alwaysVisible: column.alwaysVisible,
            width: userPrefColumn ? userPrefColumn.width : column.defaultWidth,
//            columnname: column.title + " " + ( typeof column.subTitle == "undefined" ? "":column.subTitle)
            columnname: <FlexibleColumnHeader header={column}/>
          })
      }).sort((a, b) => (a.order - b.order))
        .map ((column,index) =>
        {
          column.id = index;
          column.order = index + 1;
          return column;
        });

      return preffedColumns;
    }
  }

  const [columnData, setColumnData] = useState(getReportGridConfigData(gridDefinition,userGridPreferences));
  const isLoading = false;

  const {formatNumber} = useFormat();

  // create the updated user prefs to save for this grid.
  const getUpdatedUserGridPreference = updatedColumnData => {
    var updatedUserGridPreferences = {};
    Object.assign(updatedUserGridPreferences, userGridPreferences);
    updatedUserGridPreferences.columnPreferences = updatedColumnData.map(column => ({
        "id": column.key,
        "order": column.order,
        "visible": column.visible || column.alwaysVisible,
        "width": column.width,
        "alwaysVisible" : column.alwaysVisible
      })
    )
    return updatedUserGridPreferences;
  }

  // {row,column}
  const splitCellId = (tableId) => {
    return {
      rowId: tableId.split(":")[1],
      column: tableId.split(":")[0]
    }
  }

  const cellId = (rowId,column) => {
    return rowId + ":" + column
  }

  const updateOrderingOfAllRows = (editedRowId, oldOrder, newOrder) => {    //   rowId: integer,  order : { oldValue: 1, newValue:2}
    // now, we need to set the order value for each row,
    // and watch react relayout the grid geturator table.
    // what will be really cool is when you click apply and watch the grid in the background reorder, but the dialog will go away.
    // So: two cases.
    // 1:new order is higher than previous order,
    // 2:new order is lower than previous order.
    // 3:same, who cares, do nothing. so two cases.

    // rowId is 0 based index
    // order is 1 based

    if (oldOrder === newOrder) return ;  // Case 3.

    const sortedOrder = [].concat(columnData);
    let rowIndex = -1;
    let updatedOrderFields = null;
    if (newOrder > oldOrder) { // Case 1
      updatedOrderFields = sortedOrder.map( row => {
        rowIndex++;
        var x =
          (row.id === editedRowId) ? Object.assign(row, {order: newOrder }) :
            (row.order < oldOrder) ? row :
              (row.order > newOrder) ? row: Object.assign(row, {order: rowIndex})
        return (x)
      })
    }
    else { //  (oldOrder> newOrder)
      updatedOrderFields = sortedOrder.map( row => {
        rowIndex++;
        var x =
          (row.id === editedRowId) ? Object.assign(row, {order: newOrder}) :
            (row.order < newOrder) ? row :
              (row.order > oldOrder) ? row: Object.assign(row, {order: row.order + 1})
        return (x)
      })
    }
    return updatedOrderFields.sort((a,b) => a.order - b.order);
  }

  const handleVisibilityChanged = (rowId, visible) => {
    const newData = columnData.map(row => ( row.id === rowId) ? Object.assign(row, {visible: visible}) : row);
    setColumnData(newData);
  }

  useEffect(() => {
    onUserGridPreferencesChanged(getUpdatedUserGridPreference(columnData));
    if (( /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)))
    {
      document.activeElement.scrollIntoView({block:"center"})
    }
  }, [columnData]);

  const tableDefinition =
        [
          {
            id: "order",
            headerKey: "order",
            title: "Order",
            isSortable: false,
            dataType: "number",
            renderHeader : () => (t("eleven.gridconfig.order","Order")),
            renderCol : item => {

              const [editingCell, setEditingCell] = useState(false);
              const [editingValue, setEditingValue] = useState(item["order"]);
              const previousOrder = item["order"];

              const handleOrderClick = useCallback((event) => {
                event.target.select();
              },[]);

              const handleOrderFocus = useCallback((event) => {
                event.target.select();
              }, []);

              const handleOrderBlur = (event) => {
                const newOrder = parseInt(event.target.value, 10)
                if (newOrder !== previousOrder) {
                  if (newOrder > 0 && newOrder <= columnData.length) {
                    const editedRowId = parseInt(splitCellId(event.target.id).rowId, 10);
                    // Component refactor todo: pass in a cellChangedHandler with this in it. Call with cellId, newValue, oldValue
                    setColumnData(updateOrderingOfAllRows(editedRowId, previousOrder, newOrder));
                  }
                }
                setEditingCell(false);
              }

              const handleOrderChange = (event) => {
                setEditingCell(true);
                const value= event.target.value;
                const newOrder = parseInt(value,10);
                if (!isNaN(newOrder))
                  if (newOrder > 0 && newOrder <= columnData.length) {
                    setEditingValue(newOrder);
                  }
              }

              return(
                <TextInput
                  disabled={false}
                  onMouseUp={e=>e.preventDefault()}
                  onClick={handleOrderClick}
                  onFocus={handleOrderFocus}
                  onChange={handleOrderChange}
                  onBlur={handleOrderBlur}
                  id={"order:" + item["id"]}
                  className="orderinput"
                  hideLabel
                  value={ editingCell ? editingValue:formatNumber(item["order"])}
              />)},
            isEditable: true,
          },
          {
            id: "visible",
            headerKey: "visible",
            title: "Visible",
            isSortable: false,
            dataType: "boolean",
            renderHeader : () => (t("eleven.gridconfig.visible","Visible")),
            renderCol : item => {
              const handleChanged = (checked) => {
                handleVisibilityChanged(item.id,checked);
              }
              return (
              <Checkbox
                id={"visible:" + item["id"]}
                tabIndex={-1}
                onChange={handleChanged}
                checked={item["visible"]  || item.alwaysVisible}
                disabled = {!!item.alwaysVisible }
                hideLabel />
            )},
            isEditable: true,
          },
          {
            id: "columnname",
            headerKey: "columnname",
            title: "Column name",
            isSortable: false,
            dataType: "string",
            renderHeader : () => (t("eleven.gridconfig.columnname","Column Name")),
            renderCol : item => ( item["columnname"]),
          },
          {
            id: "width",
            headerKey: "width",
            title: "Width",
            isSortable: false,
            dataType: "number",
            renderHeader : () => (t("eleven.gridconfig.width","Column Width")),
            renderCol : item => ( item["width"]),
          },
        ];
// TODO:   maybe move to magic grid.
  return (
    <DataTable
        t={t}
        config={tableDefinition}
        data={columnData}
        description=""
        hasViewModeChange={false}
        hasSelection={false}
        hasFixedLayout={false} // if false, rows don't move horizontally,much nicer
        isExpandable={false}
        isLoading={isLoading}
        renderToolbar= { props =>   // they will ask for this soon...
               (<div>
                 <ContentSwitcher
                     compact={false}
                     onChange={function noRefCheck() {}}
                     selectedIndex={0}
                     >
                     <Switch
                         name="user"
                         onClick={function noRefCheck() {}}
                         onKeyDown={function noRefCheck() {}}
                         selected={false}
                         text="User"
                         />
                       <Switch
                           name="company"
                           onClick={function noRefCheck() {}}
                           onKeyDown={function noRefCheck() {}}
                           selected={false}
                           text="Company"
                           />
                 </ContentSwitcher><div>&nbsp;</div></div>)}
        renderToolbar={props => {}}
        size={"small"}
        title=""
        scrollableRows={true}
        hasPagination={false}
        totalItems={columnData.total}
        {...otherProps}
      />
    );
  }


TableConfigurator.propTypes = {
  t: PropTypes.func.isRequired,
  reportName: PropTypes.string.isRequired,
  aggregationLevel: PropTypes.string.isRequired,
  gridDefinition: PropTypes.object.isRequired,
  userGridPreferences: PropTypes.object,
  onUserGridPreferencesChanged: PropTypes.func.isRequired,
  onUpdateRowsNotReady: PropTypes.func.isRequired,
};

TableConfigurator.defaultProps = {
  className: 'dt-grid-configurator',
  header: '',
};

export default TableConfigurator;
