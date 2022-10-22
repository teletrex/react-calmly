/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useCallback, useState, useEffect, useRef } from 'react';
import settings from '../../settings.js';
import PropTypes, {arrayOf} from 'prop-types';

import {CaretDown,CaretUp } from '@carbon/icons-react';
import {
  Loading,
  InlineLoading,

  TableBatchActions,
  TableToolbarAction
} from '@carbon/react';

import TableToolbarSearchDropdown from './components/TableToolbarSearchDropdown';
import EmptyStates from '../empty-states';
import TablePagination from '../table-pagination/TablePagination';
import HeaderRowSelector from './HeaderRowSelector';
import RowTree from './RowTree';
import TableRow from './TableRow';
import FlexibleColumnHeader from './flexible-column-header';

import ColumnFilter from '../column-filter';
import ColumnRangeFilter from '../column-filter/ColumnRangeFilter';
import ColumnDateRangeFilter from '../column-filter/ColumnDateRangeFilter'
import ElevenDropDown from '../hover-better-dropdown/HoverBetterDropDown';

import throttle from "lodash/throttle";

const {prefix} = settings;


const MagicTable = (
  {
    id,
    t,
    className,
    config,
    height,
    dataRows,

    getIsRowDisabled,

    hasSelection,
    onSelectionChange,  // called with all rows currently selected.
    hasSelectionType,
    onSelectionTypeChange,
    onHeaderRowSelectorClick, // Called with event.target.checked when the HeaderRowSelector checkbox is clicked.
    selectedRows,     // currently selected rows.  Selected rows are managed by consuming component.
    allColumnsSortable,  // setting isSortable on a column will enable sorting on that column.
    // allColumnsSortable overrides that setting to make all Columns sortable.
    onSort,
    sortingDir,
    sortingFieldID,
    isLoading,
    resizeToWindow,
    resizableColumns,
    onResizeColumns,
    doResize,
    batchActions,
    onBatchAction,
    actions,
    onAction,
    customActions,
    actionToolbar,
    size,
    title,
    scrollableRows,  // always true.
    hasPagination,
    onPageChange,

    searchPlaceholderText,
    onSearchChange,
    onSearch,
    searchText,

    freezeFirstDataColumn,

    renderRowActions,

    renderRowDrawer,
    rowDrawerHeight,
    hasRowDrawers,
    twoLinesPerRow,
    resizeToContent,
    headerCheckboxId,

    isTreeGrid,
    startWithTreeOpen,
    indentTreeGridSelection,
    menus,
    draggableColumns,
    onDragAndDropDone,
    hideBatchActionToolbar,

    validateRow,
    warnRow,

    hasColumnFilters,
    columnFilters,
    onColumnFilterApply,
    onColumnFilterReset,

    dateFormat,
    enableEmptyStates,
    emptyStateType,
    loadMoreData,
    hasMoreData,
    infiniteScrollLoading,
    isAnyFilterApplied,
    enableInfiniteScroll,
    customInfiniteScrollData,

    immobilizeFirstColumn,
    ...otherProps
  }
) => {


  const handleActionClick = // useCallback(
    (key, event) => {
      const args = [key];
      if (selectedRows) {
        args.push(selectedRows);
      }
      onAction(...args, event);
    }
//    }, [onAction, selectedRows]
//  );

  useEffect( () => {
      if (!!selectedRows) {
        let uniqueSelectedRows = {};
        selectedRows.map(row => {
          uniqueSelectedRows[row.id] = true;
        })
        setSelectedRowMap(uniqueSelectedRows);
      } else {
        setSelectedRowMap(new Map());
      }
    },[selectedRows, hasSelection]
  );

  const [selectedRowMap, setSelectedRowMap] = useState({});  // map. key is rowid (id), value is boolean for is selected.
  const [totalSelectableRows, setTotalSelectableRows] = useState(0);
  const [gridConfig, setGridConfig] = useState(config);
  const [gridHeight, setGridHeight] = useState(height);
  const [gridTop, setGridTop] = useState(200);
  const [rowDrawerOpenMap, setRowDrawerOpenMap] = useState(new Map);
  const [showLoading, setShowLoading] = useState(isLoading);
  const [totalColumns, setTotalColumns] = useState(config.length + (hasSelection && 1) + ( hasRowDrawers && 1));
  const [gridColumnFilters, setGridColumnFilters] = useState ([]);
  const [clearSelection, batchActionInProgress] = [-1, 0];
  const [selectionType, setSelectionType] = useState(clearSelection);
  const [infiniteScrollPageNumber, setInfiniteScrollPageNumber] = useState(1);

  let gridSelectionOptions = [
    {
      title: selectionType === 1,
      value: 1,
      label: t('eleven.dropdown.selection.current'),
    },
    {
      title: selectionType === 2,
      value: 2,
      label: t('eleven.dropdown.selection.upto1000'),
    },
    // {
    //   title: selectionType === 2,
    //   value: 2,
    //   label: t('eleven.dropdown.selection.inFilter'),
    // }
  ];

  const scrollRef = useRef();

  const handleBatchActionClick = useCallback(
    (event, action, selectedRows) => {
      onBatchAction && onBatchAction(event, action, selectedRows, selectionType);
      setSelectionType(batchActionInProgress);
    },
    [onBatchAction, selectionType]
  );

  const handleSearch = useCallback(
    value => {
      onSearch(value.replace(/[\r\n]+/g, "").trim())
    },[onSearch]  );

  const handleSearchChange = useCallback(
    value => {
      onSearchChange(value.replace(/[\r\n]+/g,"").trim())
    } ,[onSearchChange] );

  const onlyUnique = (value, index, self) => { return (self.indexOf(value) === index)};
  const nonBlank = (value => !((value == null) || (value.trim() !== "" )));
  const blankOption = { checked: false, text:t('(blank)'), value:null};

  const rowToOption = rowValue => ({
    checked: false,
    text: rowValue,
    value: rowValue
  })

  const menuToOption = menu => ({
    checked: false,
    text: menu.label,
    value: menu.value
  })

  const onScroll = () => {
    let tableEl = scrollRef.current
    if (
      tableEl.scrollTop + 5 + tableEl.clientHeight >= tableEl.scrollHeight &&
      hasMoreData &&
      !isAnyFilterApplied
    ) {
      if(!infiniteScrollLoading)
        setInfiniteScrollPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }

  useEffect(() => {
    if(customInfiniteScrollData && customInfiniteScrollData.pageNumber > 0) {
      setInfiniteScrollPageNumber(customInfiniteScrollData.pageNumber);
    }
  }, [customInfiniteScrollData]);

  useEffect(() => {
    if (enableInfiniteScroll && infiniteScrollPageNumber > 1 && infiniteScrollPageNumber !== customInfiniteScrollData.pageNumber) {
      loadMoreData(infiniteScrollPageNumber, sortingDir, sortingFieldID);
    }
  }, [infiniteScrollPageNumber]);

  useEffect( () => {
    setTotalSelectableRows(!!dataRows ? dataRows.map( row => getSubRows(row,[])).flat().length:-1);
  },[dataRows, selectedRows]
  );

  useEffect( () => {
    const mergedColumnFilters = [];

    if (hasColumnFilters && gridConfig.length > 0) {
      gridConfig.map(column => {
        // ColumnFilters will use grid menus for column filter options if others are not provided.
        // Provide your own column filter options if you wish to preset them.
        // Boolean filters auto-generated.  Yes, No. Based on format checkbox or checkmark.
        // For numeric values, set filterType to 'range'.
        // For sets, provide the list of options.


        let columnFilter;
        const columnFilterArray = (columnFilters && columnFilters.filter(columnFilter => columnFilter.headerKey === column.id));

        if (!!columnFilterArray && columnFilterArray.length > 0) {    // use column filter information passed in for this column
          columnFilter = columnFilterArray[0];

          if (column.filterType === "range") {
            mergedColumnFilters.push(columnFilter);
          } else if (column.format === "checkbox" || column.format === "checkmark") {
            mergedColumnFilters.push(columnFilter);
          }
          else if (column.format.startsWith("tag")) {
            mergedColumnFilters.push(columnFilter);
          }
          else {  // column filter is an incoming list of selections from the app.
            let columnFilterWithBlank = {
              ...columnFilter,
              filterOptions: [
                ...columnFilter
                  .filterOptions
                  .filter(column => column.value !== null)
              ]
            }

            if (
              column.alwaysShowBlankFilterOption
              ||
              columnFilter
                .filterOptions
                .filter(column => column.value === null)
                .length > 0) {
              columnFilterWithBlank.filterOptions.unshift(blankOption);
            }
            mergedColumnFilters.push(columnFilterWithBlank);
          }
          console.log("using passed in column filter for " + column.id);

        } else
        {
          if (column.editorType && column.editorType.toLowerCase().includes("dropdown") &&
            (menus && menus[column.id] && menus[column.id].items)) {
            console.log("generating column filter for " + column.id);   // here we generate the column filter options from the data
            let newFilterOptions = [ ...(menus && menus[column.id] && menus[column.id].items && menus[column.id].items.map(menuToOption))];
            if (
              column.alwaysShowBlankFilterOption
              ||
              newFilterOptions
                .filter(column => column.value === null)
                .length > 0) {
              newFilterOptions.filterOptions.unshift(blankOption);
            }

            mergedColumnFilters.push(
              {
                headerKey: column.id,
                id: column.id,
                hasSingleSelect: false,
                filterType: "default",
                columnFormat: column.format,
                searchPlaceholderText: t("Search"),
                filterOptions: newFilterOptions
              })
          } else if (column.filterType === "range") {
            // { condition: "greaterThan", "lessThan","equals"
            //   value: number}
            console.log("generating range column filter for " + column.id);
            mergedColumnFilters.push(
              {
                headerKey: column.id,
                id: column.id,
                filterType: "range",
                filterOptions: []
              }
            );
          } else {  // otherwise use available data from the loaded grid data
            switch (column.format) {
              case "string" :
//                console.log(column.id + "column filter string");
//                console.log(dataRows.map(row => row[column.id]).filter(onlyUnique).filter(nonBlank).map(rowToOption));
                console.log("generating column filter for " + column.id);
                mergedColumnFilters.push(
                  {
                    headerKey: column.id,
                    id: column.id,
                    hasSingleSelect: false,
                    filterType: "default",
                    columnFormat: column.format,
                    searchPlaceholderText: t("Search"),
                    filterOptions: !!dataRows ? dataRows.map(row => row[column.id]).filter(onlyUnique).filter(nonBlank).map(rowToOption) : []
                  });
                break;
              case "checkmark":
              case "checkbox" :
                console.log("generating column filter for " + column.id);
                mergedColumnFilters.push(
                  {
                    headerKey: column.id,
                    id: column.id,
                    hasSingleSelect: false,
                    filterType: "default",
                    columnFormat: column.format,
                    searchPlaceholderText: t("Search"),
                    filterOptions: [
                      {checked: false, text: t("Yes"), value: true},
                      {checked: false, text: t("No"), value: false}
                    ]
                  });
                break;
              case "datebox" :
                console.log("generating column filter for " + column.id);
                mergedColumnFilters.push(
                  {
                    headerKey: column.id,
                    id: column.id,
                    filterType: "date",
                    columnFormat: column.format,
                    filterOptions: []
                  });
                break;
              default:
                console.log("no column filter for " + column.id);
            }
          }
        }

//      console.log("merged" + mergedColumnFilters)
        setGridColumnFilters(mergedColumnFilters);

      })
    }
  }, [menus,dataRows,gridConfig,columnFilters])

  /*
   Developer tools.
    const [debug, setDebug] = useState("debug window");

    useEffect (()=> {
      setDebug(JSON.stringify(selectedRows));
    }, [selectedRows]);
  */

  useEffect ( () => {
    setShowLoading(isLoading || false);
  }, [dataRows,isLoading]);

  useEffect(() => {
    setGridConfig(config)
  }, [config]);


  const handleSelectionTypeChange = ({ selectedItem }) => {
    if (selectionType !== selectedItem.value) {
      setSelectionType(selectedItem.value);
      handleHeaderRowSelectorClick();
    } else {
      setSelectionType(clearSelection);
    }
  }

  /* Drawers */
  const handleHeaderDrawerRowOpenerClick = (event) => {
    if (rowDrawerOpenMap.size > 0) { /* close all */
      setRowDrawerOpenMap(new Map);
    } else if ( rowDrawerOpenMap.size === 0 && dataRows.length > 0) { /* open all */
      let rowMap = new Map;
      dataRows.map( row => getSubRows(row),[]).flat().map(row => rowMap[row.id] = true);
      setRowDrawerOpenMap(rowMap);
    }
  }

  const handleDrawerOpenerClick = useCallback((event, clickedRow,column, value) => {
    setRowDrawerOpenMap(
      {
        ...rowDrawerOpenMap,
        [clickedRow.id]: value
      }
    )
  }, [rowDrawerOpenMap]);

  /* Row Selection */

  const handleHeaderRowSelectorClick = (event) => {
    if (selectedRows.length > 0) { /* clear all */
      onSelectionChange && onSelectionChange([]);
      setSelectionType(clearSelection);
      onHeaderRowSelectorClick && onHeaderRowSelectorClick(false);
    } else if (selectedRows.length === 0 && dataRows.length > 0) { /* set all */
      onSelectionChange && onSelectionChange(dataRows.map(row => getSubRows(row,[])).flat());
      onHeaderRowSelectorClick && onHeaderRowSelectorClick(true);
    }  else {
      onSelectionChange && onSelectionChange([]);
      onHeaderRowSelectorClick && onHeaderRowSelectorClick(false);
    }
  }

  // subRows for the treegrid
  const getSubRows = (row,result) => {
    if (typeof row.subRows !== 'undefined') {
      row.subRows.map(subRow => getSubRows(subRow,result));
    }
    result.push(row);
    return result;
  };

  const handleRowSelected = useCallback( (event, clickedRow) => {
    let rows;
    if (event.target.checked) {
      rows = [
        ...selectedRows.filter(row => row.id !== clickedRow.id),
        ...getSubRows(clickedRow,[])
      ];
    } else {
      const rowIdsToRemove = getSubRows(clickedRow, []).map(row=>row.id);  // uncheck these rows.
      rows = selectedRows.filter(row => !rowIdsToRemove.includes(row.id));
   }
    onSelectionChange && onSelectionChange(rows);
  }, [selectedRows,onSelectionChange]);

  const handleCancelBatchAction = (event) => {
    setSelectedRowMap(new Map);
    setSelectionType(clearSelection);
    onSelectionChange && onSelectionChange([]);
  }

  const shouldShowBatchActions = () => {
    return hasSelection && selectedRows.length > 0 && !hideBatchActionToolbar
  }

  // hasSelection

  const modifierClasses = () => {
    let modifiers = "";
    if (hasSelection && freezeFirstDataColumn) {
      modifiers = " magictable-frozen-first-data-column-with-has-selection ";
    } else if (freezeFirstDataColumn || hasSelection) {
      modifiers = " magictable-frozen-first-data-column "
    }
    if (renderRowActions) {
      modifiers += " magictable-freeze-row-actions "
    }
    return modifiers;
  }

  /* draggable column resize */

  let resizeColumnStartWidth, resizeDragStartX, resizeColumn, resizeColumnIndex, resizeHandle;

  const handleColumnResizeMouseDown = (e, column) => {
    e.stopPropagation();
    e.preventDefault();
    resizeColumnStartWidth = column.defaultWidth;
    resizeDragStartX = e.pageX;
    resizeColumn = column;
    resizeHandle = e.target;
    resizeHandle.classList.add("magictable-focus");
    resizeColumnIndex = gridConfig.findIndex(configColumn => configColumn.id === resizeColumn.id);
    document.addEventListener("mousemove", handleColumnResizeMouseMove);
    document.addEventListener("mouseup", handleColumnResizeMouseUp);
  }

  const handleColumnResizeMouseMove = (e) => {
    const newWidth = Math.min(Math.max(resizeColumnStartWidth + e.pageX - resizeDragStartX, 50), 500);
    setGridConfig(
      [
        ...gridConfig.slice(0, resizeColumnIndex),
        {
          ...gridConfig[resizeColumnIndex],
          defaultWidth: newWidth
        },
        ...gridConfig.slice(resizeColumnIndex + 1)
      ]
    )
  }

  const handleColumnResizeMouseUp = (e, column) => {
    e.preventDefault();
    e.stopPropagation();
    resizeHandle.classList.remove("magictable-focus")
    document.removeEventListener("mousemove", handleColumnResizeMouseMove);
    document.removeEventListener("mouseup", handleColumnResizeMouseUp);
    const newWidth = Math.min(Math.max(resizeColumnStartWidth + e.pageX - resizeDragStartX, 50), 500);
    setGridConfig(
      [
        ...gridConfig.slice(0, resizeColumnIndex),
        {
          ...gridConfig[resizeColumnIndex],
          defaultWidth: newWidth
        },
        ...gridConfig.slice(resizeColumnIndex + 1)
      ]
    )
    let configCopy = Array.from(gridConfig);
    configCopy[resizeColumnIndex]["defaultWidth"] = newWidth;
    let columnWidthMap = {};
    configCopy.map(column => columnWidthMap[column.id]= column.defaultWidth);
    onResizeColumns(columnWidthMap);
  }
    /* draggable column headers */

  let
    tableHeaders,
    columnBeingReorderedLocal,
    columnOrderHandle,
    columnOrderDragDeltaX,
    columnOrderStartX,
    columnDroppables;

  const [columnBeingReordered,setColumnBeingReordered] = useState();

  const columnMoverRef = useRef();

  const handleColumnMoveMouseDown = (e, column) => {
    e.stopPropagation();
    e.preventDefault();

    if (column.dragLock) return;
    if ((immobilizeFirstColumn && column.order > 1) || !immobilizeFirstColumn) {

      setColumnBeingReordered(column);
      columnBeingReorderedLocal = column;
      columnOrderHandle = e.target;
      if (!columnOrderHandle) return;


      while ( columnOrderHandle.tagName !== "TH") {
        columnOrderHandle = columnOrderHandle.offsetParent;
      }
      columnOrderDragDeltaX = e.pageX - columnOrderHandle.offsetLeft - scrollRef.current.scrollLeft;
      columnOrderStartX = e.pageX + scrollRef.current.scrollLeft;

      tableHeaders = columnOrderHandle.parentElement.children;
      columnDroppables = [];

      [...tableHeaders]
        .filter(header => header.id !== "_selected" && header.id !== "_drawer")
        .map((header, index) => {
          columnDroppables.push(
            {
              id: header.id,
              element: header,
              left: header.offsetLeft,
              width: header.offsetWidth
            })
        });

      document.addEventListener("mousemove", handleColumnMoveMouseMove);
      document.addEventListener("mouseup", handleColumnMoveMouseUp);
    }
  }


  const handleColumnMoveMouseMove = (e, column) => {
    e.stopPropagation();
    e.preventDefault();

    let leftX = (e.pageX-columnOrderDragDeltaX-scrollRef.current.scrollLeft) ;
    columnMoverRef.current.style.left = leftX+"px";
    columnMoverRef.current.style.width = columnOrderHandle.offsetWidth +"px";
    columnMoverRef.current.style.top = columnOrderHandle.offsetTop +"px";
    columnMoverRef.current.style.height = columnOrderHandle.offsetHeight +"px";
    let mouseX = e.pageX+scrollRef.current.scrollLeft;

    var parentOffsetLeft = columnMoverRef.current.parentNode.getBoundingClientRect().left;
    let columnHover = columnDroppables.filter(column => (mouseX >= (column.left + parentOffsetLeft)) && ((column.left + parentOffsetLeft + column.width) > mouseX))[0];


    columnDroppables.map( (header,index) => {
      if (
        columnHover
        &&
        header.id === columnHover.id
        &&  ((immobilizeFirstColumn && index !== 0) || !immobilizeFirstColumn))
        header.element.className = "dropzone"
      else
        header.element.className = null
      });
  }

  const handleColumnMoveMouseUp = (e, column) => {
    e.stopPropagation();
    e.preventDefault();
    document.removeEventListener("mousemove", handleColumnMoveMouseMove);
    document.removeEventListener("mouseup", handleColumnMoveMouseUp);

    let leftX = (e.pageX - columnOrderDragDeltaX - scrollRef.current.scrollLeft) ;
    columnMoverRef.current.style.left = leftX+"px";
    columnMoverRef.current.style.width = columnOrderHandle.offsetWidth +"px";
    columnMoverRef.current.style.top = columnOrderHandle.offsetTop +"px";
    columnMoverRef.current.style.height = columnOrderHandle.offsetHeight +"px";
    let mouseX = e.pageX+scrollRef.current.scrollLeft;

    var parentOffsetLeft = columnMoverRef.current.parentNode.getBoundingClientRect().left;
    let columnHover = columnDroppables.filter(column => (mouseX >= (column.left + parentOffsetLeft)) && ((column.left + parentOffsetLeft + column.width) > mouseX))[0];

    let droppedColumnIndex;

    columnDroppables.map( (header, index) => {
      header.element.className = null;
      if (columnHover && header.id === columnHover.id) {
        droppedColumnIndex = index;
      }
    });

    console.log("---------------------->"+droppedColumnIndex);

    if ( (!!droppedColumnIndex &&  (immobilizeFirstColumn && droppedColumnIndex !== 0) || !immobilizeFirstColumn )) {
      let newGridConfig;
      if (mouseX > columnOrderStartX)
        // plop dragged column before/after dropzone column depending on drag direction
      {
        newGridConfig = [
          ...gridConfig.slice(0, droppedColumnIndex + 1).filter(header => header.id !== columnBeingReorderedLocal.id),
          columnBeingReorderedLocal,
          ...gridConfig.slice(droppedColumnIndex + 1)
        ]
      } else {
        newGridConfig = [
          ...gridConfig.slice(0, droppedColumnIndex),
          columnBeingReorderedLocal,
          ...gridConfig.slice(droppedColumnIndex).filter(header => header.id !== columnBeingReorderedLocal.id)
        ]
      }

//      setGridConfig(newGridConfig);  Remove as this is a controlled component and having this generates > 1000 errors.

      (onDragAndDropDone && onDragAndDropDone(newGridConfig, columnBeingReorderedLocal));
      columnHover.className= null;

    }

    columnOrderHandle.classList.remove("magictable-column-move");
    columnMoverRef.current.style.width = 0;
    columnMoverRef.current.style.top = "-100px";
    columnMoverRef.current.style.height = "-100px";

  }

  const handleColumnSortClick = (column) => {
    setShowLoading(isLoading);
    (onSort && onSort(column))
  }

  const PaginationHeight = 51;
  const resizeGridByWindowResize = () => {
    resizeGrid();
  }

  const resizeGrid = () => {
    if (resizeToWindow) {
      let newHeight = document.body.offsetHeight - document.getElementsByClassName("magictable-scroller").item(0).getBoundingClientRect().top;
      if (document.body.getElementsByClassName("bx--pagination").length > 0) {
        newHeight = newHeight - document.body.getElementsByClassName("bx--pagination").item(0).offsetHeight;
        setGridHeight(newHeight);
      } else {
        setGridHeight(newHeight - PaginationHeight); // height of pagination widget
      }
    } else if (resizeToContent) {  // resize to content
      let newHeight = 40 + dataRows.length*35 + 16;
      if (hasPagination ) {
        newHeight += PaginationHeight;
      }
      setGridHeight(Math.min(newHeight,height));
    }
  }

  useEffect(() => {
    resizeGrid();
  }, [ dataRows, gridTop, doResize]);

  useEffect(() => {
    resizeGrid();
    window.addEventListener("resize", resizeGrid);
    return () => {
      document.body.removeEventListener("resize", () => resizeGrid());
    };
  }, []);

  /* colspan for drawers */
  useEffect( () => {
    let totalColumns = 0;
    totalColumns += gridConfig.length;
    setTotalColumns(totalColumns)
  },[gridConfig,hasRowDrawers, hasSelection]);

  useEffect(()=>{
    onSelectionTypeChange && onSelectionTypeChange(selectionType);
  },[selectionType]);

  return (
      <div id={id} className={className} className={"magictable-wrapper"}>
        {false   && hasRowDrawers && isTreeGrid  &&<>magictable: Only hasRowDrawers or isTreeGrid can be true, not both.</>}
        {false   && showLoading &&
        <Loading className="magictable-loading-indicator" alignCenter={true} withOverlay={true} />}
        { (hasSelection || onSearchChange || onSearch || actions || batchActions) &&
        <div style={{height: "40px"}}>
          {(
            (!hasSelection) ||
            (hasSelection && !selectedRows.length > 0)) &&
          <div className={"magictable-toolbar"}>
            <div className={"magictable-toolbar-left"}>
              {(typeof actionToolbar !== "undefined") && <div>{actionToolbar}</div>}
              {((typeof onSearchChange === "function") || (typeof onSearch === "function")) && true ||
              <TableToolbarSearchDropdown
                className={"magictable-toolbarsearch"}
                size={"small"}
                kind={"secondary"}
                dropdownMaxHeight={"0px"}
                withBorderBottom={"true"}
                onSearchChange={onSearchChange}
                placeHolderText={searchPlaceholderText}
                onSearch={onSearch}
                value={searchText || ''}
                size={"md"}
              />
              }
            </div>
            <div className={"magictable-toolbar-right"}>
              {(typeof actions !== "undefined") && actions.map(action =>
                <TableToolbarAction
                  {...action}
                  actionKey={action.key}
                  size="small"
                  onAction={handleActionClick}
                  tabIndex={shouldShowBatchActions() ? -1 : 0}
                />
              )}
              {(typeof customActions !== "undefined") && customActions}
            </div>
          </div>
          }
          {hasSelection && batchActions  &&
          <div className={"magictable-batchactionbar"}>
            <TableBatchActions
              className={`${prefix}--configurable-table-toolbar--batch-actions`}
              onCancel={handleCancelBatchAction}
              shouldShowBatchActions={shouldShowBatchActions()}
              size="small"
              totalSelected={selectedRows.length}   // TODO:
              t={t}
              {...otherProps}
            >
              {!showLoading &&
              batchActions.map(action => (
                <TableToolbarAction
                  {...action}
                  actionKey={action.key}
                  onClick={(...args)=>action.onClick(...args,selectionType)}
                  selectedRows={selectedRows}
                  size="small"
                  kind="primary"
                  onAction={handleBatchActionClick}
                  tabIndex={shouldShowBatchActions() ?0 : 1}
                />
              ))}
            </TableBatchActions>

          </div>}

        </div>
        }

        <div ref={scrollRef}
             className={"magictable-scroller"}
             style={{height: gridHeight + "px"}}
             onScroll={throttle(onScroll, 400)}>
          <table className={"magictable" + modifierClasses()}>
            <thead>
            <tr>
              { hasRowDrawers &&
              <th key="_drawer"
                  id="_drawer"
                  className={"header-row-drawer-opener-column"}>
                {dataRows && dataRows.length > 0 && false &&
                <HeaderRowSelector
                  id={"header_row_drawer"}
                  value={rowDrawerOpenMap.length === totalSelectableRows && dataRows.length > 0} //dataRows.length
                  isIndeterminate={rowDrawerOpenMap.length > 0 && rowDrawerOpenMap.length < totalSelectableRows} //dataRows.length
                  onClick={handleHeaderDrawerRowOpenerClick}/>
                }
              </th>
              }
              {hasSelection && !indentTreeGridSelection &&
              <th key="_selected"
                  id="_selected"
                  className={"headerrowselector"+`${(hasSelectionType && onSelectionTypeChange) ? '-options' : ''}`}>
              {dataRows && dataRows.length > 0 &&
                  <>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <HeaderRowSelector
                        id={headerCheckboxId || "header_row_selector"}
                        value={selectedRows.length === totalSelectableRows && dataRows.length > 0} //dataRows.length
                        isIndeterminate={selectedRows.length > 0 && selectedRows.length < totalSelectableRows} //dataRows.length
                        onClick={handleHeaderRowSelectorClick}
                      />
                      {/* debugging tool:                <div>{selectedRows.length}/{totalSelectableRows}</div> */}
                    {
                      (hasSelectionType && onSelectionTypeChange) &&
                      <ElevenDropDown
                        ariaLabel="Dropdown"
                        id="dataChangeDropdown"
                        invalidText={t('valid.value')}
                        titleText={''}
                        selectedItem={''}
                        onChange={(e) => { handleSelectionTypeChange(e) }}
                        type="inline"
                        items={gridSelectionOptions} />
                      }
                    </div>
                  </>
                }
              </th>
              }
              {
                (gridConfig.map((column,index) => (
                  <th
                    id={column.id}
                    key={column.id}
                    style={{width: column.defaultWidth + "px"}}
                  ><div style={{
                    "display":"flex",
                    "flexFlow":"row nowrap",
                    "justifyContent":"flex-end",
                    "justifyItems":"left"
                  }}>
                    { dataRows && dataRows.length > 0 && indentTreeGridSelection && hasSelection && index===0 &&
                    <div style={{"width":"40px"}}><HeaderRowSelector id={headerCheckboxId || "header_row_selector"}
                                                                     value={selectedRows.length === totalSelectableRows && dataRows.length > 0} //dataRows.length
                                                                     isIndeterminate={selectedRows.length > 0 && selectedRows.length < totalSelectableRows} //dataRows.length
                                                                     onClick={handleHeaderRowSelectorClick}
                    /></div>
                    }

                    <div className={"magictable-column-header"}
                         onClick={(allColumnsSortable || column.isSortable)  ? (() => handleColumnSortClick(column.id)) : null}
                         onMouseDown={ draggableColumns && (e => handleColumnMoveMouseDown(e, column))}
                    >{(column.renderHeader && column.renderHeader(column))|| column.title  }
                    </div>
                    {(allColumnsSortable || column.isSortable)
                    && (sortingFieldID === column.id)
                    && (
                      ((sortingDir === "ASC") &&
                        <div className={"magictable-column-sorter"}>
                          <CaretUp size={32}
                            onClick={(allColumnsSortable || column.isSortable)  ? (() => handleColumnSortClick(column.id)) : null}
                          />
                        </div>)
                      ||
                      ((sortingDir === "DESC") &&
                        <div className={"magictable-column-sorter"}>
                          <CaretDown  size={32}
                            onClick={(allColumnsSortable || column.isSortable)  ? (() => handleColumnSortClick(column.id)) : null}
                          />
                        </div>)
                    )
                    }

                    {
                      hasColumnFilters &&
                      column.filterType === 'default' &&
                      gridColumnFilters &&
                      (gridColumnFilters.filter(gridColumnFilter => gridColumnFilter.headerKey === column.id).length> 0)   &&
                      <ColumnFilter
                        t={t}
                        onApply={(filterSelection) => onColumnFilterApply && onColumnFilterApply({column:column.id, format: column.format, filterSelection: filterSelection})}
                        onReset={(filterSelection) => onColumnFilterReset && onColumnFilterReset({column:column.id, format: column.format, filterSelection: filterSelection})}
                        options={gridColumnFilters.filter(gridColumnFilter => gridColumnFilter.headerKey === column.id)[0].filterOptions}
                        searchFieldPlaceholder={t("Search")}
                        visibleOptionsLimit={5}
                        overflowMenuProps={{onClick:(e)=> {e.stopPropagation()}, flipped: (index > gridConfig.length - 2)}}
                        title={''}
                        subtitle={''}
                      />
                    }
                    {
                      hasColumnFilters &&
                      column.filterType === 'range' &&
                      gridColumnFilters &&
                      <ColumnRangeFilter
                        t={t}
                        onApply={(filterSelection) => onColumnFilterApply && onColumnFilterApply({column:column.id, format: column.format, filterSelection: filterSelection})}
                        onReset={(filterSelection) => onColumnFilterReset && onColumnFilterReset({column:column.id, format: column.format, filterSelection: filterSelection})}
                        options={
                          (gridColumnFilters.filter(gridColumnFilter => gridColumnFilter.headerKey === column.id).length> 0) ?
                            gridColumnFilters.filter(gridColumnFilter => gridColumnFilter.headerKey === column.id)[0].filterOptions :
                            null
                        }
                        valuePlaceholder = {t("Enter Value")}
                        searchFieldPlaceholder={t("Search")}
                        overflowMenuProps={{flipped: (index > gridConfig.length -2)? true: false}}
                        format={column.format}
                        title={''}
                        //subtitle={''}
                      />
                    }
                    {
                      hasColumnFilters &&
                      column.filterType === 'date' &&
                      gridColumnFilters &&
                      <ColumnDateRangeFilter
                        t={t}
                        onApply={(filterSelection) => onColumnFilterApply && onColumnFilterApply({column:column.id, format: column.format, filterSelection: filterSelection})}
                        onReset={(filterSelection) => onColumnFilterReset && onColumnFilterReset({column:column.id, format: column.format, filterSelection: filterSelection})}
                        options={
                          (gridColumnFilters.filter(gridColumnFilter => gridColumnFilter.headerKey === column.id).length> 0) ?
                            gridColumnFilters.filter(gridColumnFilter => gridColumnFilter.headerKey === column.id)[0].filterOptions :
                            null
                        }
                        overflowMenuProps={{flipped: (index > gridConfig.length -2)? true: false}}
                        format={column.format}
                        dateFormat={dateFormat || 'M d,Y'}
                        title={''}
                        subtitle={''}
                      />
                    }
                    {resizableColumns && <div className={"resize-control"}
                                              onMouseDown={(e) => handleColumnResizeMouseDown(e, column)}
                    />
                    }
                  </div>
                  </th>
                )))}

              {renderRowActions &&
              <th key={"_actions"}/>
              }
            </tr>
            </thead>
            <tbody className={twoLinesPerRow ? "two-lines":""}>
            {!showLoading && isTreeGrid &&
            <RowTree
              dataRows={dataRows}
              getIsRowDisabled={getIsRowDisabled}
              indentTreeGridSelection={indentTreeGridSelection}
              gridConfig={gridConfig}
              menus={menus}
              hasSelection={hasSelection}
              selectedRowMap={selectedRowMap}
              hasRowDrawers={hasRowDrawers}
              renderRowActions={renderRowActions}
              handleDrawerOpenerClick={handleDrawerOpenerClick}
              handleRowSelected={handleRowSelected}
              rowDrawerOpenMap={rowDrawerOpenMap}
              renderRowDrawer={renderRowDrawer}
              rowDrawerHeight={rowDrawerHeight}
              totalColumns={totalColumns}
              startWithTreeOpen={startWithTreeOpen}
              validateRow={validateRow}
              warnRow={warnRow}
              size={size}
            />
            }
            { !isTreeGrid && !showLoading && dataRows && dataRows.map((row,index) => (
              <TableRow
                key={index}
                dataRows={dataRows}
                row={row}
                index={index}
                getIsRowDisabled={getIsRowDisabled}
                menus={menus}
                gridConfig={gridConfig}
                twoLinesPerRow = {twoLinesPerRow}
                hasSelection={hasSelection}
                rowSelected={selectedRowMap[row.id]}
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
              />)
            )}
                {
                  enableEmptyStates && emptyStateType != null && dataRows.length == 0 &&
                    <>
                      <div className='magictable-empty-states'>
                        <EmptyStates
                          buttonTitle={emptyStateType.buttonTitle || 'Add'}
                          buttonHidden={emptyStateType.buttonHidden || false}
                          className="Some class"
                          onClick={emptyStateType.onClick || function noRefCheck(){}}
                          pageClassName=""
                          state={emptyStateType.state || 'initial-state-simple'}
                          stateImage={emptyStateType.image || null}
                          text={emptyStateType.text || ''}
                          textHidden={emptyStateType.textHidden || false}
                          title={emptyStateType.title || ''}
                          titleHidden={emptyStateType.titleHidden || false}
                        />
                      </div>
                    </>
                }
            </tbody>
          </table>
          {enableInfiniteScroll && <InlineLoading style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            description={infiniteScrollLoading || isLoading ? 'Loading data...' : !hasMoreData ? 'No More Records Found' : ''}
            status={infiniteScrollLoading ? 'active' : ''}
          />}
          <div className="magictable-horizontal-scrollbar-area"/>
          <div ref={columnMoverRef} className={"magictable-column-mover"}>
            {columnBeingReordered &&
            <FlexibleColumnHeader
              header={columnBeingReordered}
            />
            }
          </div>
        </div>
        {!enableInfiniteScroll && dataRows && hasPagination &&
        <TablePagination
          {...otherProps}
          onChange={onPageChange}
        />
        }
      </div>

  )
}

export default React.memo(MagicTable);

MagicTable.propTypes = {
  className: PropTypes.string,
  config: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.number,
  dataRows: PropTypes.arrayOf(PropTypes.object),
  getIsRowDisabled: PropTypes.func,
  draggableColumns: PropTypes.bool,
  onDragAndDropDone: PropTypes.func,
  enableEmptyStates: PropTypes.bool,
  emptyStateType: PropTypes.object,
  hasSelection : PropTypes.bool,
  /** called with all rows currently selected. */
  onSelectionChange: PropTypes.func,
  hasSelectionType: PropTypes.bool,
  onSelectionTypeChange: PropTypes.func,
  /** called when option selected from ElevenDropdown which returns option value*/
  /** currently selected rows.  Selected rows are managed by consuming component. */
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  /** setting isSortable on a column will enable sorting on that column.
   allColumnsSortable overrides that setting to make all Columns sortable. */
  allColumnsSortable: PropTypes.bool,
  /** called with the column id  (string) of the clicked column  */
  onSort: PropTypes.func,
  /** Pass in the current sort direction.  "ASC", "DESC", "NONE" */
  sortingDir:PropTypes.string,
  /** Pass in the id of the current column being sorted (string), if any */
  sortingFieldID:PropTypes.string,
  /** Set to true to display spinning wheel, false when data loaded */
  isLoading: PropTypes.bool,
  /** Set to true to have grid resize to the page bottom, false if not */
  resizeToWindow: PropTypes.bool ,
  /** Set to true to enable resizeable columns */
  resizableColumns: PropTypes.bool,
  /** called with a map of all column ids and widths  when column resized. */
  onResizeColumns: PropTypes.func,
  /** change the value to have the grid resize to fit to the page, i.e. hide or show a summary
   * above the grid.  Usually use a number and just increment it. */
  doResize: PropTypes.number,
  /** Actions to show when rows are selected, use with hasSelection and selectedRows. See configurableToolbar. */
  batchActions: PropTypes.array,
  /** Actions to show such as settings and export. See configurableToolbar*/
  actions: PropTypes.array,
  /** Action toolbar, use to put in aggregation menus, etc to the left of the search bar */
  actionToolbar: PropTypes.object,
  /** Vertical size of the rows, unsupported */
  size:PropTypes.oneOf(["SMALL","COMPACT"]),
  /** Title of the grid */
  title: PropTypes.string,
  /** Set to true to enable scrolling of rows while freezing headers and pagination in place. */
  scrollableRows: PropTypes.bool,
  /** Set to true to show pagination at the bottom of the grid */
  hasPagination: PropTypes.bool,
  /** Current page of the data, starts with 1 */
  page: PropTypes.number,
  /** number of primary rows to display per page. Does not count subrows or nested rows */
  pageSize: PropTypes.number,
  /** Array of page sizes to show in pagination drop down menu. */
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  /** Called on page change with page number, use for offset and limit query */
  onPageChange: PropTypes.func,
  /** Called with search string when search area changes.  */
  onSearchChange: PropTypes.func,
  /** Called with search string when enter key typed.  */
  onSearch: PropTypes.func,
  /** Freeze the first column of data whilst scrolling horizontally if true */
  freezeFirstDataColumn: PropTypes.bool,
  /** Put in 'Search...' or language equivalent */
  searchPlaceholderText: PropTypes.string,
  /** Function that returns a OverflowMenu.
   * Set of menus that show to the right of each row behind three dots, use for editing or viewing
   * the row in a detail form or page.
   */
  renderRowActions: PropTypes.func,
  /** Set to true to enable drawers of data to be opened below each row. Set renderRowDrawer callback with JSX contents. */
  hasRowDrawers: PropTypes.bool,
  /** Function called with the row's data to render contents of a row drawer. Return JSX immediately or after lazy-loading. */
  renderRowDrawer: PropTypes.func,
  /** Height of the row drawer */
  rowDrawerHeight: PropTypes.number,
  /** Resize the grid to contain the number of rows, but no greater than height pixels.
   *  Useful for grids in row drawers.  Height of grid in row drawer should be same or less than the height of the
   *  containing row drawer.
   */
  resizeToContent: PropTypes.bool,
  /** Set to enable tree grid functionality.
   * Set the subRows property of the row with the subrow data.
   * Go nuts! Infinite hierarchy until things fail to look good or perform.
   * Really, don't go more than three rows deep for user sanity.
   */

  isTreeGrid: PropTypes.bool,
  /** Data for inline dropdown menu editors in cells.
   *  Pass in the menu selections for each column or column|row.id in the menus object
   *  menus = [{ '<columnname> : {
   *               'items' : [ {label: 'label',
   *                           value: 12},
   *                            .....
   *                         ],
   *               'menusByRow' :{ <rowid>: { items: [
   *                            {label: 'label',
   *                           value: 12},
   *                            .....
   *                           ],
   *                           'multiselect' : true,
   *                          'searchable' : true,
   *                          },
   *               'multiselect' : true,
   *               'searchable' : true,
   *            },
   *          ...
   *            {
   *           }
   *          ]
   *
   *
   *  */
  indentTreeGridSelection: PropTypes.bool,
  menus: PropTypes.object
}


MagicTable.defaultProps = {
  hideBatchActionToolbar: false,
  resizeToContent: false,
  columnFilters: null,
  indentTreeGridSelection:false,
}
