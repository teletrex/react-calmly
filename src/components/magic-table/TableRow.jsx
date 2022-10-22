/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import RowDrawerOpener from "./RowDrawerOpener";
import RowSelector from "./RowSelector";

import {ChevronUp, ChevronDown} from "@carbon/icons-react";

const TableRow= ({
  row,
  dataRows,
  getIsRowDisabled,
  menus,
  gridConfig,
  index,
  hasSelection,
  rowSelected,

  handleRowSelected,

  twoLinesPerRow,

  hasRowDrawers,
  rowDrawerOpenMap,
  renderRowDrawer,
  handleDrawerOpenerClick,
  renderRowActions,
  rowDrawerHeight,
  totalColumns,

  isTreeGrid,
  level,
  startWithTreeOpen,
  indentTreeGridSelection,

  size,
  validateRow,
  warnRow,
  children

                }) => {
  const [treeOpen, setTreeOpen]  = useState(startWithTreeOpen);

  const [invalidColumns, setInvalidColumns] = useState([]);
  const [warnColumns, setWarnColumns] = useState([]);
  const [indeterminateSelection, setIndeterminateSelection] = useState(false);

  const handleTreeOpen = () =>
    setTreeOpen(!treeOpen);

  useEffect( () => {
    validateRow && dataRows && dataRows.length > 0  && setInvalidColumns( validateRow(row))
    warnRow && dataRows && dataRows.length > 0  && setWarnColumns( warnRow(row))
  }, [row]);

  const isThisRowDisabled = (row) => {
    if (typeof getIsRowDisabled === 'function') {
      return getIsRowDisabled(row)|| !!row.disabled;
    }
    return !!row.disabled;
  };

  /*
  // subRows for the treegrid
  const getSubRows = ((row,result) => {
    if (typeof row.subRows !== 'undefined') {
      row.subRows.map(subRow => getSubRows(subRow,result));
    }
    result.push(row);
    return result;
  })

  // hold on this, not working yet.
  useEffect( () => {
    let allSubRowsChecked = true;
    let allSubRowsNotChecked = true;
    if (typeof row.subRows !== "undefined") {
      getSubRows(row, []).flat().map(row => {
        if (selectedRowMap[row.id] === false) {
          allSubRowsChecked = false;
        } else {
          allSubRowsNotChecked = false;
        }
      })
    }
    setIndeterminateSelection(!allSubRowsNotChecked && !allSubRowsChecked);
  },[selectedRowMap,row]);
*/
  const _style = {position:"absolute", top:(index+1)*45+"px"}
  return (
    <>
    <tr key={"row::"+row.id} className={"main " + (rowSelected ? "selected" : "")}  disabled={isThisRowDisabled(row)}>
      { hasRowDrawers &&
      <td key={"_drawer::" + row.id}
          className={"row-drawer-opener-column"}>
        {dataRows && dataRows.length > 0 && (renderRowDrawer(row) !== false) &&
        <RowDrawerOpener
          id={"_open::" + row.id}
          value={rowDrawerOpenMap[row.id] || false}
          row={row}
          column={"_drawer"}
          onChange={handleDrawerOpenerClick}
        />
        }
      </td>
      }
      {hasSelection && !indentTreeGridSelection &&
      <td
        key={"_selected::" + row.id}
        className={"checkbox"}
        valign={"middle"}
      >
        <RowSelector
          labelText={""}
          value={rowSelected}
          size={size}
          row={row}
          column={"_selected"}
          isIndeterminate={indeterminateSelection}
          onChange={handleRowSelected}
          id={row.id}
          disabled={isThisRowDisabled(row)}
        />
      </td>

      }

      {gridConfig.map((column, index) => (
        <td
          key={column.id + "::" + row.id}
          className={
            invalidColumns.includes(column.id)
              ?
              "invalid"
              :
              warnColumns.includes(column.id)
                ?
                "warn"
                :
                ""
          }
        >
          {
            isTreeGrid && index === 0 &&
            <div className={"treegrid-twisty-field"}>
              <span style={{"marginLeft": (level * 22) + "px"}}
                    onClick={handleTreeOpen}>
                {(row.subRows && (row.subRows.length > 0) && (
                    (treeOpen && <ChevronDown size={20} fill={"grey"}/>) ||
                    (!treeOpen && <ChevronUp size={20} fill={"grey"}/>)
                  )
                ) || <ChevronDown size={20} fill={"none"}/>
                }
              </span>

              {isTreeGrid && hasSelection && indentTreeGridSelection && index === 0 &&
              <div style={{
                "width": "20px",
                "display": "grid",
                "justifyItems": "end",
                "marginRight": "5px"
              }}>
                <div style={{"width": "20px"}}>
                  <RowSelector
                    labelText={""}
                    value={rowSelected}
                    size={size}
                    row={row}
                    column={"_selected"}
                    isIndeterminate={indeterminateSelection}
                    onChange={handleRowSelected}
                    id={row.id}
                    disabled={isThisRowDisabled(row)}
                  />
                </div>
              </div>
              }

              {
                twoLinesPerRow
                && (
                  <div className={"twolines"}>
                    {column.renderCol(row, (menus && menus[column.id]) || {})}
                  </div>
                )
                ||
                column.renderCol(row, (menus && menus[column.id]) || {})
              }
              </div>
          }

          {isTreeGrid && index > 0 && column.renderCol(row, (menus && menus[column.id]) || {})}

          {
            !isTreeGrid &&

            (
              twoLinesPerRow
              && (
                <div className={"twolines"}>
                  {column.renderCol(row, (menus && menus[column.id]) || {})}
                </div>
              )
              ||
              column.renderCol(row, (menus && menus[column.id]) || {})
            )
          }
        </td>
      ))
      }

      {renderRowActions &&
      <td key={"_actions::" + row.id }
      >{renderRowActions(row)}</td>
      }
    </tr>
      {hasRowDrawers &&
      <tr key={"row_drawer::"+row.id} className={"tr-row-drawer"}>
        {hasRowDrawers && <td/>}
        {hasSelection && <td/> }
        <td colSpan={totalColumns + (( typeof renderRowActions !== "undefined") ? 1 : 0 )} className={"td-row-drawer" }>
          <div className={"row-drawer " + (rowDrawerOpenMap[row.id] &&  "row-drawer-open")}
               style = {(rowDrawerOpenMap[row.id] &&  "row-drawer-open" && !!rowDrawerHeight) ? {maxHeight: rowDrawerHeight + "px"} : {}}
          >
            {rowDrawerOpenMap[row.id] && renderRowDrawer(row)}
          </div>
        </td>
      </tr>
      }
      {
        isTreeGrid && treeOpen && children
      }
    </>
  );
};

export default React.memo(TableRow);
/*
GridRow.propTypes = {
  row: PropTypes.object.isRequired,
  dataRows: PropTypes.array.isRequired,
  gridConfig: PropTypes.object.isRequired,
  hasSelection: PropTypes.bool,
  selectedRowMap :PropTypes.object,
  handleRowSelected: PropTypes.func,
  hasRowDrawers: PropTypes.bool,
  rowDrawerOpenMap: PropTypes.object,
  handleDrawerOpenerClick: PropTypes.func,
  renderRowActions: PropTypes.func,
}
*/

