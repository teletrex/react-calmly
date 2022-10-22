/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React,{useState} from 'react';
import PropTypes from 'prop-types';
import TableRow from "./TableRow";

const RowTree = (
  {
    level,
    row,
    config,
    menus,

    dataRows,
    gridConfig,
    hasSelection,
    selectedRowMap,
    handleRowSelected,

    hasRowDrawers,
    rowDrawerOpenMap,
    renderRowDrawer,
    handleDrawerOpenerClick,
    renderRowActions,
    rowDrawerHeight,
    totalColumns,
    startWithTreeOpen,
    indentTreeGridSelection,
    validateRow,
    warnRow,

    size
    }) => {


  return (
    /* render a row and it's children */
    <>
      {dataRows && dataRows.map(row =>
        <TableRow
          key={row.id}
          dataRows={dataRows}
          row={row}

          gridConfig={gridConfig}
          menus={menus}

          renderRowActions={renderRowActions}

          hasSelection={hasSelection}
          rowSelected={selectedRowMap[row.id]}

          hasRowDrawers={hasRowDrawers}
          handleDrawerOpenerClick={handleDrawerOpenerClick}
          handleRowSelected={handleRowSelected}
          rowDrawerOpenMap={rowDrawerOpenMap}
          renderRowDrawer={renderRowDrawer}
          rowDrawerHeight={rowDrawerHeight}

          indentTreeGridSelection={indentTreeGridSelection}

          totalColumns={totalColumns}

          size={size}

          isTreeGrid={true}
          level={level}
          startWithTreeOpen={startWithTreeOpen}
          validateRow={validateRow}
          warnRow={warnRow}
        >
          <RowTree
            key={row.id}
            level={level + 1}

            dataRows={row.subRows}
            gridConfig={gridConfig}
            menus={menus}

            hasSelection={hasSelection}
            selectedRowMap={selectedRowMap}
            indentTreeGridSelection={indentTreeGridSelection}

            hasRowDrawers={hasRowDrawers}
            renderRowActions={renderRowActions}
            handleDrawerOpenerClick={handleDrawerOpenerClick}
            handleRowSelected={handleRowSelected}
            rowDrawerOpenMap={rowDrawerOpenMap}
            renderRowDrawer={renderRowDrawer}
            rowDrawerHeight={rowDrawerHeight}
            totalColumns={totalColumns}
            validateRow={validateRow}
            warnRow={warnRow}

            size={size}

            startWithTreeOpen={startWithTreeOpen}

          />
        </TableRow>
      )
      }
    </>

  );
};

export default RowTree;

RowTree.defaultProps = {
  level: 0
}
