/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, {useState, useEffect, useCallback, useRef} from 'react';
import MagicTable from './MagicTable';
import {mydata, myconfig, myconfigAsNumerics, mydataAsNumerics, myRowDependentMenus, infiniteScrollData} from './smalltable';
import {myTreeGridData , myTreeGridConfig, myTreeGridMenus} from './treetable';

import useTableFormatters from "./useTableFormatters";
import { select, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { OverflowMenu ,OverflowMenuItem} from '@carbon/react';
import { SORT_STATES } from '../sorting';
import { useCollator, COLLATION_TYPE  } from '../sorting/use-collator';

import { useTranslation } from '../../translation';

import classNames from 'classnames';
import  settings  from '../../settings';

import {
  Checkmark,
  Renew,
  Settings,
  Export

} from '@carbon/icons-react';
import i18n from "i18next";
import ComboButton from '../combo-button/ComboButton';
import ValidationMessages from '../validation-messages';

import mdx from "./MagicTable.mdx";

const {prefix} = settings;

export default {
  title: 'Table/MagicTable',
  component: MagicTable,
  parameters: {
    docs: { page: mdx }, // Need to add this param to show the mdx docs
  }
//  decorator: withPropsOf(MagicTable),
//  parameters: {
//    docs: {page: mdx}, // Need to add this param to show the mdx docs
//  }

}

/* These are needed, put your translations in your app resource/translations/files to be passed to
   the grid. */

i18n.init({
  resources: {
    en: {
      translation: {
        "search": "Search...",
        "export": "Export",
//        "toolbar.{{totalSelected}}.item.selected": "{{ totalSelected }} item selected",
//        "toolbar.{{totalSelected}}.items.selected": "{{ totalSelected }} items selected",
        'hello {{name}}': 'Global Instance {{ name }}',
        "column.range.filter.equals": "Equal To",
        "column.range.filter.not.equal.to": "Not Equal To",
        "column.range.filter.greater.than": "Greater Than",
        "column.range.filter.less.than": "Less Than",
        "review.approve": "Approve",
        "eleven.dropdown.selection.current": "Current Page",
        "eleven.dropdown.selection.upto1000": "All items - Up to 1000",
        "eleven.dropdown.selection.inFilter": "All items - In Filter",
      },
    },
  },
  lng: 'en',
});
/* code here to support storybook */
const { SORT } = COLLATION_TYPE;

const getNextSortType = sortType => {
  if (sortType === SORT_STATES.NONE) {
    return SORT_STATES.ASC;
  }
  if (sortType === SORT_STATES.ASC) {
    return SORT_STATES.DESC;
  }
  return SORT_STATES.NONE;
};

const pleaseWait = false;

const useSortColumn = (
  sortField = '',
  sortDirection = SORT_STATES.NONE,
  defaultSortDirection = SORT_STATES.NONE
) => {
  const sortOrderDefault = useRef(defaultSortDirection);
  const [sortColumn, setSortColumn] = useState(sortField);
  const [sortOrder, setSortOrder] = useState(sortDirection || defaultSortDirection);

  const adjustSortChange = useCallback(
    column => {
      let nextSortOrder;
      if (column !== sortColumn) {
        setSortColumn(column);
        if (sortOrderDefault.current === SORT_STATES.NONE) {
          nextSortOrder = getNextSortType(sortOrderDefault.current);
        } else {
          nextSortOrder = sortOrderDefault.current;
        }
      } else {
        nextSortOrder = getNextSortType(sortOrder);
      }
      setSortOrder(nextSortOrder);
      return nextSortOrder;
    },
    [sortColumn, sortOrder]
  );

  return {
    sortColumn,
    sortOrder,
    setSortColumn: adjustSortChange,
  };
}

/* end of storybook specific code */
/* Empty States*/
const states = [
  'initial-state-full',
  'initial-state-simple',
  'no-result-state-full',
  'no-result-state-simple',
  'actionable-state-full',
  'actionable-state-simple',
  '404-state-deprecated',
  '401-state',
  '403-state',
  '404-state',
  '500-state',
  '503-state',
];

const emptyStatesProps = () => ({
  title: text('(emptyStateType) Title (title)', `Title`),
  titleHidden: boolean('(emptyStateType) Hide Title (titleHidden)', false),
  textHidden: boolean('(emptyStateType) Hide Text (textHidden)', false),
  buttonHidden: boolean('(emptyStateType) Hide Button (buttonHidden )', false),
  buttonTitle: text('(emptyStateType) Button Title (buttonTitle)', 'Add New Strategy'),
  text: text('(emptyStateType) Text (text)', 'No comments'),
  onClick: action('(emptyStateType) Button onClick Handler (onClick)'),
  state: select('(emptyStateType) State (state)', states, '404-state'),
  stateImage: boolean('(emptyStateType) Custom image (stateImage)', false),
});


let menus = {
  "dropdownTest":
    {
      items: [
        { label: "1",
          value: 1
        },
        {
          label: "2 here",
          value: 2
        },
        {
          label: "3 really long stuff here the best stuff all the stuff everyone says its the best stuff no one else has this much stuff",
          value: 3
        },
        {
          label: "4 PRICE EVERYTING IS CAPITALIZED BECAUSE RETAILERS USED IBM SINCE DAY ONE AND IBM DID NOT MUCH CARE FOR LOWERCASE CHARACTERS",
          value: 4
        },
        {
          label: "5 AS THEY ONLY SERVED TO CONFUSE THE HELL OUT OF PEOPLE, EVEN DOS WAS UPPERCASE AND WINDOWS FAKED IT FOREVER CAUSING FILE RENAMING HELL",
          value: 5
        },
        {
          label: "6 stuff here",
          value: 6
        },
        {
          label: "7 stuff here",
          value: 7
        },
        {
          label: "8 stuff here",
          value: 8
        },
        {
          label: "9 stuff here",
          value: 9
        }
      ]
    },
  "comboDropdownTest" : { items:[]},
  "rowDependentDropdown" : myRowDependentMenus.rowDependentDropdown
}

mydata.rows.map( (row,index) =>
  menus.comboDropdownTest.items.push(
    {
      label: row.comboDropdownTest,
      value: row.comboDropdownTest
    }
  )
);


const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
  console.log("onChange: " + JSON.stringify({
    column: column,
    rowId: rowId,
    row: row,
    selectedValue: selectedValue,
    initialValue: initialValue,
    format: format
  }));
}

const handleOnBlur = (event, column, rowId, row, selectedValue, initialValue, format) => {
  console.log("onBlur: " + JSON.stringify({
    column: column,
    rowId: rowId,
    row: row,
    selectedValue: selectedValue,
    initialValue: initialValue,
    format: format
  }));
}

const handleOnLinkClick = (evt, column, rowId, row, inputValue, initialValue, format) => {
  evt.preventDefault();
  console.log("onLinkClick: " + JSON.stringify({
    column: column,
    rowId: rowId,
    row: row,
    inputValue: inputValue,
    initialValue: initialValue,
    format: format
  }))
  return false;
}

const events = {
  onCellBlur: handleOnBlur,
  onCellChange: handleOnChange,
  onLinkClick: handleOnLinkClick
};

const config = useTableFormatters(events).getConfig(myconfig);

const dataWithSubRows = mydata.rows.map((row) => ({ ...row, subRows: [...mydata.rows.slice(0,100)]}));

export const Default = () => {
  const {t} = useTranslation();

  const { sortColumn, sortOrder, setSortColumn } = useSortColumn(sortingFieldID, sortingDir);
  const [dataRows, setDataRows] = useState(mydata.rows);
  const [sort, setSort] = useState( []); // array of strings column:ASC|DESC|NONE
  const [sortingFieldID, setSortingFieldID] = useState();
  const [sortingDir, setSortingDir] = useState("NONE");
  const [selectedRows, setSelectedRows] = useState(mydata.rows.slice(0,2));
  const [myMenus, setMyMenus] = useState(menus);
  const [searchText, setSearchText] = useState("");


  const handleSearch = (value) => {
    setSearchText(value);
  }

  useEffect(() => {
    console.log('searchText', searchText);
  }, [searchText]);

  // need to use localMenus because myMenus loses its mind but is needed to be a property for components
  let localMenus = menus;

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
    if (column ===  "comboDropdownTest") {
      let updatedItems = localMenus.comboDropdownTest.items;
      updatedItems= updatedItems.filter(item => item.label !== selectedValue);
      if (selectedValue != null && (updatedItems.length === localMenus.comboDropdownTest.items.length)) {
        let theseMenus = localMenus;
        theseMenus = {
          ...theseMenus,
          comboDropdownTest: {
            items: [
              {label: selectedValue, value: selectedValue},
              ...updatedItems,
            ]
          }
        }
        localMenus = theseMenus;
        setMyMenus(theseMenus);
        console.log(theseMenus);
      }
    }
  }

  useEffect(() => {
    console.log('MyMenus', myMenus);
  }, [myMenus]);

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfig);

  const [alteredConfig, setAlteredConfig] = useState(config);

  const changeColumnsOrder = headers => {
    const reorderedHeaders = [];
    headers.forEach(header => {
      reorderedHeaders.push(alteredConfig.find(conf => conf.id === header.id));
    });

    setAlteredConfig(reorderedHeaders);
  };

  const handleSortChange = useCallback(
    column => {
      const sortDirection = setSortColumn(column);

      // Fetch the sorted data from back end. Dispatch action on response to update your data state.
      // useTableService.fetchSortedDataApi();
      // This next line mocks the query for storybook, do the sort on the backend!
      setDataRows(dataRows.sort( (a,b)=> ( (
        sortDirection === "ASC" && a[column]> b[column]) ||
        sortDirection === "DESC" && a[column]< b[column])
      ));

      setSortingDir(sortDirection);
      setSortingFieldID(column);
      setSort([column+":"+sortDirection]);
    },
    [setSortColumn,setSortingDir,setSortingFieldID, setSort]
  );

  const handleSelectionTypeChange = useCallback(
    (selectionType) => {
      console.log('Option value', selectionType);
    }
    , []
  )

  const handleRowSelectionChange = useCallback(
    rows => setSelectedRows(rows)
    ,[]
  );

  // just a test on repropagating values to checkboxes and dates, we use the approve button
  // to test.

  const onApproveClick = useCallback(
    (event, selectedRows, selectionType) => {
      setDataRows( dataRows.map( row => ({
      ...row,
        productSelected:false,
        priceEffectiveDate: "Aug 7,2021"

      })))
    }
    , [] );

  return (
    <><br/><br/>
      <MagicTable
        t={t}
        config={alteredConfig || config}
        menus={myMenus}
        dataRows={dataRows}
        totalItems={mydata.rows.length}
        page={1}
        pageSize={10}
        pageSizes={[10, 20, 30]}
        onPageChange={()=>{}}
        selectedRows={selectedRows}
        onSelectionChange={handleRowSelectionChange}
        onSelectionTypeChange={handleSelectionTypeChange}
        height={500}
        onSearch={handleSearch}
        onSearchChange={handleSearch}
        searchText={searchText}
        onHeaderRowSelectorClick={alert}
        batchActions={[
          // ...props.actions,
          //!hasBeenApproved(selectedRows) &&
          {
            key: 'approve',
            text: t('review.approve'),
            id: 'approve',
            renderIcon: <Checkmark size={16} />, //isApproving ? Renew16 : Checkmark16, // Action icon
            disabled: false,
            onClick: (event, selectedRows, selectionType) => {
              onApproveClick(event, selectedRows, selectionType);
            }
          }
        ]}
        actions={[
//            ...props.actions, // will inject filter action in the future
          // {
          //   key: 'filter',
          //   'aria-label': 'Show filters', // Set button aria label
          //   renderIcon: SettingsAdjust16, // Action icon
          //   className: `my-custom-classname`, // custom classname
          //   iconDescription: 'Show filters', // tooltip text
          //   tooltipPosition: 'left', // tooltip position
          //   notificationFlag: true, // show notification badge
          // },
          // The following is a handy sort indicator for debugging.
          // {
          //  id: 'sort',
          //  key: 'sort',
          //  text: sortingFieldID +":"+sortingDir
          // },
          // The following is a small refreshing indicator that shows on sorting since we don't
          // activate the grid skeleton to keep our position in the grid.
          {
            id: 'pleaseWait',
            key: 'wait',
            renderIcon: pleaseWait ? <Renew size={16} /> : null,
            iconDescription: pleaseWait ? t('sorting') : null,
            disabled: pleaseWait ? false : true,
          },
          {
            id: 'reviewtablesettings',
            key: 'settings',
            iconDescription: t('settings'),
            renderIcon: <Settings size={16} />,
            onClick: () => {} // setShowReportConfigDialog(true)
          },
          {
            id: 'reviewExport',
            key: 'export',
            iconDescription: "exporting",   // isExporting ? t('exporting') : null,
            renderIcon: true || isExporting ? <Renew size={16} /> : <Export size={16} />,
            text: t('export'), // Giving a text will produce a full size button
            disabled: false && isExporting,
            onClick: ()=>{} //isExporting ? undefined : debounce(exportButtonClicked, 1000, { leading: true, trailing: false }) ,
            // onClick: setExportDialogOpened,
          }
        ]}

        customActions={
          <>
            <ComboButton
              key={"productupdate"}
              flipped
              onClick={action('Default Button::onClick',{depth:-1})}
            >
              <OverflowMenuItem itemText="Upload Products" onClick={action('Item2::onClick', { depth: -1 })}/>
              <OverflowMenuItem itemText="Enter Items" onClick={action('Item3::onClick', { depth: -1 })} />
            </ComboButton>
          </>
        }
        draggableColumns={boolean('Drag and Drop Column Ordering (draggableColumns)', true)}
        onDragAndDropDone={changeColumnsOrder}
        allColumnsSortable={boolean('Enable sorting on all columns (allColumnsSortable)', false)}
        onSort={handleSortChange}
        sortingDir={sortingDir}
        sortingFieldID={sortingFieldID}
        searchPlaceholderText={t('search')}
        renderRowDrawer={(row) => "This is a drawer for row " + row.id + ".  Drawers have access to the row data. They are not rendered until opened. You can put whatever you want in here, another grid, pictures of your vacation, a mini dashboard for this row. Go nuts. Height will adjust.  Just make sure there are still rows visible above and below when this is open. "}
        hasSelection={boolean('Has selection (hasSelection)', true)}
        hasSelectionType={boolean('Has selection type (hasSelectionType)', false)}
        hasPagination={boolean('Has pagination (hasPagination)', false)}
        hasRowDrawers={boolean('Can display row drawers (hasRowDrawers)', false)}
        freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
        //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
        isLoading={boolean('Show loading indicator (isLoading)', false)}
        //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
        resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
        hideBatchActionToolbar={boolean( 'Hide the batch action toolbar (hideBatchActionToolbar', false)}
        twoLinesPerRow={boolean('Two lines per row (twoLinesPerRow)', false)}
        enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', true)}
        emptyStateType={emptyStatesProps()}
        immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', true)}
      /> </>);

}

export const SimplestExample = () => {
  const {t} = useTranslation();


  const [dataRows, setDataRows] = useState(mydata.rows);

  const [myMenus, setMyMenus] = useState(menus);
  // need to use localMenus because myMenus loses its mind but is needed to be a property for components
  let localMenus = menus;

  const onlyUnique = (value, index, self) => { return (self.indexOf(value) === index)};

  const tableFilters = [
    {
      headerKey: 'upc',
      id: 'name',
      hasSingleSelect: false,
//      filterOptions: generateArrayOfOptions(5),
      // This example only provides options from the first 1000 rows of data loaded.
      filterOptions: dataRows.map(row => (row.upc)).filter(onlyUnique).map(row => ({ checked: true, text: row, value:row}))
    },
    { // This example demonstrates providing options from a select distinct list of options which may include options outside
      // the first 1000 rows loaded.
      headerKey: 'locationName',
      id: 'locationName',
      hasSingleSelect: false,
      filterOptions: [
        { checked: false, text: 'CRYSTAL CITY', value: 'CRYSTAL CITY'},
        { checked: false, text: 'CC06 ALAMEDA/ROBERTS', value: 'CC06 ALAMEDA/ROBERTS'},
        { checked: false, text: 'CC18 SPID/WALDRON', value: 'CC18 SPID/WALDRON'},
        { checked: false, text: 'FALFURRIAS', value: 'FALFURRIAS'},
        { checked: false, text: 'MATHIS', value: 'MATHIS'},
        { checked: false, text: 'KENEDY', value: 'KENEDY'},
        { checked: false, text: 'CC12 WEBER/HOLLY', value: 'CC12 WEBER/HOLLY'},
        { checked: false, text: 'SINTON', value: 'SINTON'},
        { checked: false, text: 'MOUNTAIN VIEW', value: 'MOUNTAIN VIEW'},
        { checked: false, text: 'WAWONA', value: 'WAWONA'},
        { checked: false, text: 'BIG OAK FLAT', value: 'BIG OAK FLAT'}
      ]
    },
  ];

  const [columnFilters, setColumnFilters] = useState(tableFilters);

  const handleColumnFilterApply = (filterApplied) => {
    setColumnFilters([
      ...columnFilters.filter(column => column.headerKey !== filterApplied.column),
      {
        ...columnFilters.filter(column => column.headerKey === filterApplied.column)[0],
        filterOptions:  filterApplied.filterSelection,
      }
    ]);
    alert("Request to apply column filter : " +  JSON.stringify(filterApplied))
  };

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
    if (column ===  "comboDropdownTest") {
      let updatedItems = localMenus.comboDropdownTest.items;
      updatedItems= updatedItems.filter(item => item.label !== selectedValue);
      if (selectedValue != null && (updatedItems.length === localMenus.comboDropdownTest.items.length)) {
        let theseMenus = localMenus;
        theseMenus = {
          ...theseMenus,
          comboDropdownTest: {
            items: [
              {label: selectedValue, value: selectedValue},
              ...updatedItems,
            ]
          }
        }
        localMenus = theseMenus;
        setMyMenus(theseMenus);
        console.log(theseMenus);
      }
    }
  }

  useEffect(() => {
    console.log('MyMenus', myMenus);
  }, [myMenus]);

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfig);

  const [alteredConfig, setAlteredConfig] = useState(config);


  return (
    <><br/><br/>
      <MagicTable
        t={(a,b) => b}
        config={alteredConfig || config}
        menus={myMenus}   // needed if there are dropdowns in the grid as determined by the config
        dataRows={dataRows}
        totalItems={mydata.rows.length}
      /> </>);

}




export const WithColumnFilters = () => {
  const {t} = useTranslation();

  const { sortColumn, sortOrder, setSortColumn } = useSortColumn(sortingFieldID, sortingDir);
  const [dataRows, setDataRows] = useState(mydata.rows);
  const [sort, setSort] = useState( []); // array of strings column:ASC|DESC|NONE
  const [sortingFieldID, setSortingFieldID] = useState();
  const [sortingDir, setSortingDir] = useState("NONE");
  const [selectedRows, setSelectedRows] = useState(mydata.rows.slice(0,2));




  const [myMenus, setMyMenus] = useState(menus);
  // need to use localMenus because myMenus loses its mind but is needed to be a property for components
  let localMenus = menus;

  const onlyUnique = (value, index, self) => { return (self.indexOf(value) === index)};

  const tableFilters = [
    {
      headerKey: 'upc',
      id: 'name',
      hasSingleSelect: false,
//      filterOptions: generateArrayOfOptions(5),
      // This example only provides options from the first 1000 rows of data loaded.
      filterOptions: dataRows.map(row => (row.upc)).filter(onlyUnique).map(row => ({ checked: true, text: row, value:row}))
    },
    { // This example demonstrates providing options from a select distinct list of options which may include options outside
      // the first 1000 rows loaded.
      headerKey: 'locationName',
      id: 'locationName',
      hasSingleSelect: false,
      filterOptions: [
        { checked: false, text: 'CRYSTAL CITY', value: 'CRYSTAL CITY'},
        { checked: false, text: 'CC06 ALAMEDA/ROBERTS', value: 'CC06 ALAMEDA/ROBERTS'},
        { checked: false, text: 'CC18 SPID/WALDRON', value: 'CC18 SPID/WALDRON'},
        { checked: false, text: 'FALFURRIAS', value: 'FALFURRIAS'},
        { checked: false, text: 'MATHIS', value: 'MATHIS'},
        { checked: false, text: 'KENEDY', value: 'KENEDY'},
        { checked: false, text: 'CC12 WEBER/HOLLY', value: 'CC12 WEBER/HOLLY'},
        { checked: false, text: 'SINTON', value: 'SINTON'},
        { checked: false, text: 'MOUNTAIN VIEW', value: 'MOUNTAIN VIEW'},
        { checked: false, text: 'WAWONA', value: 'WAWONA'},
        { checked: false, text: 'BIG OAK FLAT', value: 'BIG OAK FLAT'}
      ]
    },
  ];

  const [columnFilters, setColumnFilters] = useState(tableFilters);

  const handleColumnFilterApply = (filterApplied) => {
    setColumnFilters([
      ...columnFilters.filter(column => column.headerKey !== filterApplied.column),
      {
        ...columnFilters.filter(column => column.headerKey === filterApplied.column)[0],
        filterOptions:  filterApplied.filterSelection,
      }
    ]);
    alert("Request to apply column filter : " +  JSON.stringify(filterApplied))
  };

  const handleColumnFilterReset = (filterApplied) => {
    setColumnFilters([
      ...columnFilters.filter(column => column.headerKey !== filterApplied.column),
      {
        ...columnFilters.filter(column => column.headerKey === filterApplied.column)[0],
        filterOptions:  filterApplied.filterSelection,
      }
    ]);

    alert("Request to reset column filter : " + JSON.stringify(filterApplied))
  };

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
    if (column ===  "comboDropdownTest") {
      let updatedItems = localMenus.comboDropdownTest.items;
      updatedItems= updatedItems.filter(item => item.label !== selectedValue);
      if (selectedValue != null && (updatedItems.length === localMenus.comboDropdownTest.items.length)) {
        let theseMenus = localMenus;
        theseMenus = {
          ...theseMenus,
          comboDropdownTest: {
            items: [
              {label: selectedValue, value: selectedValue},
              ...updatedItems,
            ]
          }
        }
        localMenus = theseMenus;
        setMyMenus(theseMenus);
        console.log(theseMenus);
      }
    }
  }

  useEffect(() => {
    console.log('MyMenus', myMenus);
  }, [myMenus]);

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfig);

  const [alteredConfig, setAlteredConfig] = useState(config);

  const changeColumnsOrder = headers => {
    const reorderedHeaders = [];
    headers.forEach(header => {
      reorderedHeaders.push(alteredConfig.find(conf => conf.id === header.id));
    });

    setAlteredConfig(reorderedHeaders);
  };

  const handleSortChange = useCallback(
    column => {
      const sortDirection = setSortColumn(column);

      // Fetch the sorted data from back end. Dispatch action on response to update your data state.
      // useTableService.fetchSortedDataApi();
      // This next line mocks the query for storybook, do the sort on the backend!
      setDataRows(dataRows.sort( (a,b)=> ( (
          sortDirection === "ASC" && a[column]> b[column]) ||
        sortDirection === "DESC" && a[column]< b[column])
      ));

      setSortingDir(sortDirection);
      setSortingFieldID(column);
      setSort([column+":"+sortDirection]);
    },
    [setSortColumn,setSortingDir,setSortingFieldID, setSort]
  );

  const handleRowSelectionChange = useCallback(
    rows => setSelectedRows(rows)
    ,[]
  );

  return (
    <><br/><br/>
      <MagicTable
        t={t}
        config={alteredConfig || config}
        menus={myMenus}
        dataRows={dataRows}
        totalItems={mydata.rows.length}
        columnFilters = {columnFilters}
        hasColumnFilters={true}
        onColumnFilterApply = {handleColumnFilterApply}
        onColumnFilterReset = {handleColumnFilterReset}
        page={1}
        pageSize={10}
        pageSizes={[10, 20, 30]}
        onPageChange={()=>{}}
        selectedRows={selectedRows}
        onSelectionChange={handleRowSelectionChange}
        onSelectionTypeChange={()=>{}}
        height={500}
        dateFormat={"M d, Y"}
        batchActions={[
          // ...props.actions,
          //!hasBeenApproved(selectedRows) &&
          {
            key: 'approve',
            text: t('review.approve'),
            id: 'approve',
            renderIcon: <Checkmark size={16} />, //isApproving ? Renew16 : Checkmark16, // Action icon
            disabled: false,
            onClick: (evt, selectedRows) => {
              onApproveClick(evt, selectedRows);
            }
          }
        ]}
        actions={[
//            ...props.actions, // will inject filter action in the future
          // {
          //   key: 'filter',
          //   'aria-label': 'Show filters', // Set button aria label
          //   renderIcon: SettingsAdjust16, // Action icon
          //   className: `my-custom-classname`, // custom classname
          //   iconDescription: 'Show filters', // tooltip text
          //   tooltipPosition: 'left', // tooltip position
          //   notificationFlag: true, // show notification badge
          // },
          // The following is a handy sort indicator for debugging.
          // {
          //  id: 'sort',
          //  key: 'sort',
          //  text: sortingFieldID +":"+sortingDir
          // },
          // The following is a small refreshing indicator that shows on sorting since we don't
          // activate the grid skeleton to keep our position in the grid.
          {
            id: 'pleaseWait',
            key: 'wait',
            renderIcon: pleaseWait ? <Renew size={16} /> : null,
            iconDescription: pleaseWait ? t('sorting') : null,
            disabled: pleaseWait ? false : true,
          },
          {
            id: 'reviewtablesettings',
            key: 'settings',
            iconDescription: t('settings'),
            renderIcon: <Settings size={16} />,
            onClick: () => {} // setShowReportConfigDialog(true)
          },
          {
            id: 'reviewExport',
            key: 'export',
            iconDescription: "exporting",   // isExporting ? t('exporting') : null,
            renderIcon:  false && isExporting ? <Renew size={16} /> : <Export size={16} />,
            text: t('export'), // Giving a text will produce a full size button
            disabled: false && isExporting,
            onClick: ()=>{} //isExporting ? undefined : debounce(exportButtonClicked, 1000, { leading: true, trailing: false }) ,
            // onClick: setExportDialogOpened,
          }
        ]}

        customActions={
          <>
            <ComboButton
              key={"productupdate"}
              flipped
              onClick={action('Default Button::onClick',{depth:-1})}
            >
              <OverflowMenuItem itemText="Upload Products" onClick={action('Item2::onClick', { depth: -1 })}/>
              <OverflowMenuItem itemText="Enter Items" onClick={action('Item3::onClick', { depth: -1 })} />
            </ComboButton>
          </>
        }
        draggableColumns={boolean('Drag and Drop Column Ordering (draggableColumns)', true)}
        onDragAndDropDone={changeColumnsOrder}
        allColumnsSortable={boolean('Enable sorting on all columns (allColumnsSortable)', true)}
        onSort={handleSortChange}
        sortingDir={sortingDir}
        sortingFieldID={sortingFieldID}
        searchPlaceholderText={t('search')}
        renderRowDrawer={(row) => "This is a drawer for row " + row.id + ".  Drawers have access to the row data. They are not rendered until opened. You can put whatever you want in here, another grid, pictures of your vacation, a mini dashboard for this row. Go nuts. Height will adjust.  Just make sure there are still rows visible above and below when this is open. "}
        hasSelection={boolean('Has selection (hasSelection)', true)}
        hasSelectionType={boolean('Has selection type (hasSelectionType)', false)}
        hasPagination={boolean('Has pagination (hasPagination)', false)}
        hasRowDrawers={boolean('Can display row drawers (hasRowDrawers)', false)}
        freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
        //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
        isLoading={boolean('Show loading indicator (isLoading)', false)}
        //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
        resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', true)}
        hideBatchActionToolbar={boolean( 'Hide the batch action toolbar (hideBatchActionToolbar', false)}
        twoLinesPerRow={boolean('Two lines per row (twoLinesPerRow)', false)}
        enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', false)}
        emptyStateType={emptyStatesProps()}
        immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}
      /> </>);

}



export const AllRowsPreselected = ()  => {
  const {t} = useTranslation();

  const { sortColumn, sortOrder, setSortColumn } = useSortColumn(sortingFieldID, sortingDir);
  const [dataRows, setDataRows] = useState(mydata.rows);
  const [sort, setSort] = useState( []); // array of strings column:ASC|DESC|NONE
  const [sortingFieldID, setSortingFieldID] = useState();
  const [sortingDir, setSortingDir] = useState("NONE");
  const [selectedRows, setSelectedRows] = useState(mydata.rows.slice(0,2));




  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
  }

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfig);

  const [alteredConfig, setAlteredConfig] = useState(null);

  const changeColumnsOrder = headers => {
    const reorderedHeaders = [];
    headers.forEach(header => {
      reorderedHeaders.push(config.find(conf => conf.id === header.id));
    });

    setAlteredConfig(reorderedHeaders);
  };

  const handleSortChange = useCallback(
    column => {
      const sortDirection = setSortColumn(column);

      // Fetch the sorted data from back end. Dispatch action on response to update your data state.
      // useTableService.fetchSortedDataApi();
      // This next line mocks the query for storybook, do the sort on the backend!
      setDataRows(dataRows.sort( (a,b)=> ( (
        sortDirection === "ASC" && a[column]> b[column]) ||
        sortDirection === "DESC" && a[column]< b[column])
      ));

      setSortingDir(sortDirection);
      setSortingFieldID(column);
      setSort([column+":"+sortDirection]);
    },
    [setSortColumn,setSortingDir,setSortingFieldID, setSort]
  );

  const handleRowSelectionChange = useCallback(
    rows => setSelectedRows(rows)
    ,[]
  );

  return (
    <MagicTable
      t={t}
      config={alteredConfig || config}
      menus={menus}
      dataRows={dataRows}
      totalItems={mydata.rows.length}
      page={1}
      pageSize={10}
      pageSizes={[10, 20, 30]}
      onPageChange={()=>{}}
      selectedRows={dataRows}
      onSelectionChange={handleRowSelectionChange}
      onSelectionTypeChange={()=>{}}
      twoLinesPerRow={boolean('Two lines per row (twoLinesPerRow)', true)}
      batchActions={[
        // ...props.actions,
        //!hasBeenApproved(selectedRows) &&
        {
          key: 'approve',
          text: t('review.approve'),
          id: 'approve',
          renderIcon: <Checkmark size={16}/>, //isApproving ? Renew16 : Checkmark16, // Action icon
          disabled: false,
          onClick: (evt, selectedRows) => {
            onApproveClick(evt, selectedRows);
          }
        }
      ]}
      actions={[
//            ...props.actions, // will inject filter action in the future
        // {
        //   key: 'filter',
        //   'aria-label': 'Show filters', // Set button aria label
        //   renderIcon: SettingsAdjust16, // Action icon
        //   className: `my-custom-classname`, // custom classname
        //   iconDescription: 'Show filters', // tooltip text
        //   tooltipPosition: 'left', // tooltip position
        //   notificationFlag: true, // show notification badge
        // },
        // The following is a handy sort indicator for debugging.
        // {
        //  id: 'sort',
        //  key: 'sort',
        //  text: sortingFieldID +":"+sortingDir
        // },
        // The following is a small refreshing indicator that shows on sorting since we don't
        // activate the grid skeleton to keep our position in the grid.
        {
          id: 'pleaseWait',
          key: 'wait',
          renderIcon: pleaseWait ? <Renew size={16} /> : null,
          iconDescription: pleaseWait ? t('sorting') : null,
          disabled: pleaseWait ? false : true,
        },
        {
          id: 'reviewtablesettings',
          key: 'settings',
          iconDescription: t('settings'),
          renderIcon: <Settings size={16} />,
          onClick: () => {} // setShowReportConfigDialog(true)
        },
        {
          id: 'reviewExport',
          key: 'export',
          iconDescription: "exporting",   // isExporting ? t('exporting') : null,
          renderIcon: true || isExporting ? <Renew size={16} /> : <Export size={16} />,
          text: t('export'), // Giving a text will produce a full size button
          disabled: false && isExporting,
          onClick: ()=>{} //isExporting ? undefined : debounce(exportButtonClicked, 1000, { leading: true, trailing: false }) ,
          // onClick: setExportDialogOpened,
        },
      ]}

      draggableColumns={boolean('Drag and Drop Column Ordering (draggableColumns)', true)}
      onDragAndDropDone={changeColumnsOrder}
      allColumnsSortable={boolean('Enable sorting on all columns (allColumnsSortable)', false)}
      onSort={handleSortChange}
      sortingDir={sortingDir}
      sortingFieldID={sortingFieldID}
      searchPlaceholderText={t('search')}
      renderRowDrawer={(row) => "This is a drawer for row " + row.id + ".  Drawers have access to the row data. They are not rendered until opened. You can put whatever you want in here, another grid, pictures of your vacation, a mini dashboard for this row. Go nuts. Height will adjust.  Just make sure there are still rows visible above and below when this is open. "}
      hasSelection={boolean('Has selection (hasSelection)', true)}
      hasSelectionType={boolean('Has selection type (hasSelectionType)', false)}
      hasPagination={boolean('Has pagination (hasPagination)', false)}
      hasRowDrawers={boolean('Can display row drawers (hasRowDrawers)', false)}
      freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
      //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
      isLoading={boolean('Show loading indicator (isLoading)', false)}
      //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
      resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
      enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', false)}
      emptyStateType={emptyStatesProps()}
      immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}
    /> );

}

export const WithRowDrawers = () => {
  const {t} = useTranslation();




  const renderOverFlowMenu = useCallback((currentRow) => {
    const onOpen = () => {
      //setCurrentInline(currentRow);
    }
    const onClose = () => {
      // setCurrentInline({});
    }
    return (
      <div className={classNames(`${prefix}--row-actions-cell`, `${prefix}--row-actions-cell-editable`)}>
        <OverflowMenu flipped
                      onOpen={() => {
                        onOpen();
                      }}
                      onClose={() => {
                        onClose();
                      }}>

          <OverflowMenuItem
            id={currentRow.id}
            itemText={currentRow.disabled ||  'View/Edit'}
            onClick={() => history.push("strategy/" + currentRow.id)}/>
          <OverflowMenuItem
            id={currentRow.id}
            itemText={currentRow.disabled ||  'Delete'}
            onClick={() => history.push("strategy/" + currentRow.id)}/>
        </OverflowMenu>
      </div>
    )
  })

  return (<MagicTable
    t={t}
    config={config.slice(0, 5)}
    dataRows={dataWithSubRows}
    totalItems={dataWithSubRows.length}
    pageSizes={[10, 20, 30]}
    page={1}
    pageSize={10}
    menus={menus}
    height={600}
    selectedRows={[]}
    hasRowDrawers={true}
    allColumnsSortable={true}
    rowDrawerHeight={200}
    hasSelection={boolean('Has selection (hasSelection)', false)}
    hasPagination={boolean('Has pagination (hasPagination)', false)}
    freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
    //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
    isLoading={boolean('Show loading indicator (isLoading)', false)}
    //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}

    resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
    renderRowDrawer={(row) => row.id > 6076 &&
      <MagicTable
        t={t}
        resizeToContent={true}
        height={200}
        config={config.slice(5, 13)}
        menus={menus}
        dataRows={row.subRows.slice(0, Math.floor(Math.random()*8))}
        totalItems={row.subRows.length}
        pageSizes={[10, 20, 30]}
        selectedRows={[]}
        freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
        //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
        isLoading={boolean('Show loading indicator (isLoading)', false)}
        //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
      />
    }
    renderRowActions={renderOverFlowMenu}
    enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', false)}
    emptyStateType={emptyStatesProps()}
    immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}

  />);
}



export const TreeGrid = () => {
  const {t} = useTranslation();
  const [treeGridMenus, setTreeGridMenus] = useState(myTreeGridMenus);
  const [selectedRows,setSelectedRows] = useState([]);





  const handleSelectionClick = (rows) => {
    setSelectedRows(rows);
  }

  const simulateGrabbingMenuData = () => {
    /* go fetch the data, dispatch an action to set your menu state */
    setTreeGridMenus(
      {

        lgc: {
          items:
            [
              {
                label: "Mountain View",
                value: 1
              },
              {
                label: "Shanghai",
                value: 2
              },
              {
                label: "Pune",
                value: 3
              },
              {
                label: "Denver",
                value: 4
              },
              {
                label: "Boston and the Greater Surrounding Area",
                value: 5
              },
              {
                label: "Hotlanta",
                value: 6
              },
              {
                label: "Durango",
                value: 7
              },
              {
                label: "Telluride",
                value: 8
              },
              {
                label: "Loveland",
                value: 9
              },
              {
                label: "Georgetown",
                value:10
              },
              {
                label:"Silverton",
                value:11
              },
              {
                label:"Cripple Creek",
                value:12
              }
            ]
        }
      }
    );
  }

  const handleOnClickToPreloadMenus = (event, column, rowId, row, selectedValue, initialValue, format) => {
    simulateGrabbingMenuData();
  }


  const [dataRows, setDataRows] = useState(myTreeGridData.rows);

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));

    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
  }

  const moreEvents = {...events, onCellClick: handleOnClickToPreloadMenus, onCellChange:handleOnChange};

  const myTreeGridConfigFilledIn = useTableFormatters(moreEvents).getConfig(myTreeGridConfig);

  return (
    <MagicTable
      t={t}
      config={myTreeGridConfigFilledIn}
      dataRows={dataRows}
      totalItems={myTreeGridData.rows.length}
      pageSizes={[10, 20, 30]}
      menus={treeGridMenus}
      height={600}
      selectedRows={selectedRows}
      hasRowDrawers={false}
      isTreeGrid={true}
      treeGridChildrenKey={"subRows"}
      rowDrawerHeight={200}
      hasSelection={boolean('Has selection (hasSelection)', true)}
      onSelectionChange={handleSelectionClick}
      hasSelectionType={boolean('Has selection type (hasSelectionType)', false)}
      onSelectionTypeChange={()=>{}}
      hasPagination={boolean('Has pagination (hasPagination)', false)}
      freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
      //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
      isLoading={boolean('Show loading indicator (isLoading)', false)}
      //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
      resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
      renderRowDrawer={(row) => "row drawer"}
      startWithTreeOpen={false}
    />)
}
export const TreeGridStartWithRowsOpen = () => {
  const {t} = useTranslation();
  const [treeGridMenus, setTreeGridMenus] = useState(myTreeGridMenus);
  const [selectedRows,setSelectedRows] = useState([]);





  const handleSelectionClick = (rows) => {
    setSelectedRows(rows);
  }

  const simulateGrabbingMenuData = () => {
    /* go fetch the data, dispatch an action to set your menu state */
    setTreeGridMenus(
      {

        lgc: {
          items:
            [
              {
                label: "Mountain View",
                value: 1
              },
              {
                label: "Shanghai",
                value: 2
              },
              {
                label: "Pune",
                value: 3
              },
              {
                label: "Denver",
                value: 4
              },
              {
                label: "Boston and the Greater Surrounding Area",
                value: 5
              },
              {
                label: "Hotlanta",
                value: 6
              },
              {
                label: "Durango",
                value: 7
              },
              {
                label: "Telluride",
                value: 8
              },
              {
                label: "Loveland",
                value: 9
              },
              {
                label: "Georgetown",
                value: 10
              },
              {
                label: "Silverton",
                value: 11
              },
              {
                label: "Cripple Creek",
                value: 12
              }
            ]
        }
      }
    );
  }

  const handleOnClickToPreloadMenus = (event, column, rowId, row, selectedValue, initialValue, format) => {
    simulateGrabbingMenuData();
  }


  const [dataRows, setDataRows] = useState(myTreeGridData.rows);

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));

    let updatedRows = dataRows.map(row => row.id === rowId ? {...row, [column]: selectedValue} : row);
    setDataRows(updatedRows);
  }

  const moreEvents = {...events, onCellClick: handleOnClickToPreloadMenus, onCellChange: handleOnChange};

  const myTreeGridConfigFilledIn = useTableFormatters(moreEvents).getConfig(myTreeGridConfig);

  const renderOverFlowMenu = useCallback((currentRow) => {
    const onOpen = () => {
      //setCurrentInline(currentRow);
    }
    const onClose = () => {
      // setCurrentInline({});
    }
    return (
      <div className={classNames(`${prefix}--row-actions-cell`, `${prefix}--row-actions-cell-editable`)}>
        <OverflowMenu flipped
                      onOpen={() => {
                        onOpen();
                      }}
                      onClose={() => {
                        onClose();
                      }}>

          <OverflowMenuItem
            id={currentRow.id}
            itemText={currentRow.disabled ||  'View/Edit'}
            onClick={() => history.push("strategy/" + currentRow.id)}/>
          <OverflowMenuItem
            id={currentRow.id}
            itemText={currentRow.disabled ||  'Delete'}
            onClick={() => history.push("strategy/" + currentRow.id)}/>
        </OverflowMenu>
      </div>
    )
  })
  return (
    <MagicTable
      t={t}
      config={myTreeGridConfigFilledIn}
      dataRows={dataRows}
      totalItems={myTreeGridData.rows.length}
      pageSizes={[10, 20, 30]}
      menus={treeGridMenus}
      height={600}
      selectedRows={selectedRows}
      onSelectionChange={handleSelectionClick}
      onSelectionTypeChange={()=>{}}
      indentTreeGridSelection={true}
      hasRowDrawers={false}
      isTreeGrid={true}
      treeGridChildrenKey={"subRows"}
      rowDrawerHeight={200}
      hasSelection={boolean('Has selection (hasSelection)', true)}
      hasSelectionType={boolean('Has selection type (hasSelectionType)', false)}
      hasPagination={boolean('Has pagination (hasPagination)', false)}
      freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
      //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
      isLoading={boolean('Show loading indicator (isLoading)', false)}
      //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
      resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
      renderRowDrawer={(row) => "row drawer"}
      startWithTreeOpen={true}
      renderRowActions={renderOverFlowMenu}
      enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', false)}
      emptyStateType={emptyStatesProps()}
      immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}
    />
  )
}

export const TreeGridWithValidation = () => {
  const {t} = useTranslation();
  const [treeGridMenus, setTreeGridMenus] = useState(myTreeGridMenus);

  const simulateGrabbingMenuData = () => {
    /* go fetch the data, dispatch an action to set your menu state */
    setTreeGridMenus(
      {

        lgc: {
          items:
            [
              {
                label: "Mountain View",
                value: 1
              },
              {
                label: "Shanghai",
                value: 2
              },
              {
                label: "Pune",
                value: 3
              },
              {
                label: "Denver",
                value: 4
              },
              {
                label: "Boston and the Greater Surrounding Area",
                value: 5
              },
              {
                label: "Hotlanta",
                value: 6
              },
              {
                label: "Durango",
                value: 7
              },
              {
                label: "Telluride",
                value: 8
              },
              {
                label: "Loveland",
                value: 9
              },
              {
                label: "Georgetown",
                value: 10
              },
              {
                label: "Silverton",
                value: 11
              },
              {
                label: "Cripple Creek",
                value: 12
              }
            ]
        }
      }
    );
  }

  const handleOnClickToPreloadMenus = (event, column, rowId, row, selectedValue, initialValue, format) => {
    simulateGrabbingMenuData();
  }


  const [dataRows, setDataRows] = useState(myTreeGridData.rows);
  const [validationErrors, setValidationErrors] = useState([])

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));

    let updatedRows = dataRows.map(row => row.id === rowId ? {...row, [column]: selectedValue} : row);
    setDataRows(updatedRows);
  }

  const onValidateRow = (row) => {
    const invalidColumns=[];
    if (new Date(row.enddate) < new Date(row.startdate)) {
      invalidColumns.push("startdate");
      invalidColumns.push("enddate");
    }
// do it any way so we can see the invalid state.
    invalidColumns.push("startdate");
    invalidColumns.push("enddate");
    invalidColumns.push("id"); // error overrides warning.
    setValidationErrors(["Please set the enddate to be after the start date.","ID error for some reason"])

    return invalidColumns;
  }

  const onWarnRow = (row) => {
    const invalidColumns=[];
// we can see the invalid  state overriding the warn state for "id" and the warn state for "rowType"
    invalidColumns.push("id");  // will be overridden by error in the previous function.
    invalidColumns.push("rowType");
    setValidationErrors(["Please set the enddate to be after the start date.","ID error for some reason, invalid overrides a warning state","Warning: ID and rowType may need attention."])

    return invalidColumns;
  }

  const moreEvents = {...events, onCellClick: handleOnClickToPreloadMenus, onCellChange: handleOnChange};

  const myTreeGridConfigFilledIn = useTableFormatters(moreEvents).getConfig(myTreeGridConfig);

  const renderOverFlowMenu = useCallback((currentRow) => {
    const onOpen = () => {
      //setCurrentInline(currentRow);
    }
    const onClose = () => {
      // setCurrentInline({});
    }
    return (
      <div className={classNames(`${prefix}--row-actions-cell`, `${prefix}--row-actions-cell-editable`)}>
        <OverflowMenu flipped
                      onOpen={() => {
                        onOpen();
                      }}
                      onClose={() => {
                        onClose();
                      }}>

          <OverflowMenuItem
            id={currentRow.id}
            itemText={currentRow.disabled ||  'View/Edit'}
            onClick={() => history.push("strategy/" + currentRow.id)}/>
          <OverflowMenuItem
            id={currentRow.id}
            itemText={currentRow.disabled ||  'Delete'}
            onClick={() => history.push("strategy/" + currentRow.id)}/>
        </OverflowMenu>
      </div>
    )
  })
  return (
    <>
      <ValidationMessages validationSuggestions={validationErrors}/>
    <MagicTable
      t={t}
      config={myTreeGridConfigFilledIn}
      dataRows={dataRows}
      totalItems={myTreeGridData.rows.length}
      pageSizes={[10, 20, 30]}
      menus={treeGridMenus}
      height={600}
      selectedRows={[]}
      hasRowDrawers={false}
      isTreeGrid={true}
      treeGridChildrenKey={"subRows"}
      rowDrawerHeight={200}
      hasSelection={boolean('Has selection (hasSelection)', true)}
      hasPagination={boolean('Has pagination (hasPagination)', false)}
      freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
      //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
      isLoading={boolean('Show loading indicator (isLoading)', false)}
      //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
      resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
      renderRowDrawer={(row) => "row drawer"}
      startWithTreeOpen={true}
      renderRowActions={renderOverFlowMenu}
      validateRow={onValidateRow}
      warnRow={onWarnRow}
      enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', false)}
      emptyStateType={emptyStatesProps()}
      immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}
    />
      </>
  )
}



export const WithNumericDataAsNumbers = () => {
  const {t} = useTranslation();

  const { sortColumn, sortOrder, setSortColumn } = useSortColumn(sortingFieldID, sortingDir);
  const [dataRows, setDataRows] = useState(mydataAsNumerics.rows);
  const [sort, setSort] = useState( []); // array of strings column:ASC|DESC|NONE
  const [sortingFieldID, setSortingFieldID] = useState();
  const [sortingDir, setSortingDir] = useState("NONE");
  const [selectedRows, setSelectedRows] = useState(mydata.rows.slice(0,2));





  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
  }

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfigAsNumerics);

  const [alteredConfig, setAlteredConfig] = useState(null);

  const changeColumnsOrder = headers => {
    const reorderedHeaders = [];
    headers.forEach(header => {
      reorderedHeaders.push(config.find(conf => conf.id === header.id));
    });

    setAlteredConfig(reorderedHeaders);
  };

  const handleSortChange = useCallback(
    column => {
      const sortDirection = setSortColumn(column);

      // Fetch the sorted data from back end. Dispatch action on response to update your data state.
      // useTableService.fetchSortedDataApi();
      // This next line mocks the query for storybook, do the sort on the backend!
      setDataRows(dataRows.sort( (a,b)=> ( (
        sortDirection === "ASC" && a[column]> b[column]) ||
        sortDirection === "DESC" && a[column]< b[column])
      ));

      setSortingDir(sortDirection);
      setSortingFieldID(column);
      setSort([column+":"+sortDirection]);
    },
    [setSortColumn,setSortingDir,setSortingFieldID, setSort]
  );

  const handleRowSelectionChange = useCallback(
    rows => setSelectedRows(rows)
    ,[]
  );

  return (
    <MagicTable
      t={t}
      config={alteredConfig || config}
      menus={menus}
      dataRows={dataRows}
      totalItems={dataRows.length}
      page={1}
      pageSize={10}
      pageSizes={[10, 20, 30]}
      onPageChange={()=>{}}
      selectedRows={selectedRows}
      onSelectionChange={handleRowSelectionChange}
      draggableColumns={boolean('Drag and Drop Column Ordering (draggableColumns)', true)}
      onDragAndDropDone={changeColumnsOrder}
      searchPlaceholderText={t("search")}
      allColumnsSortable={boolean('Enable sorting on all columns (allColumnsSortable)', false)}
      onSort={handleSortChange}
      sortingDir={sortingDir}
      sortingFieldID={sortingFieldID}
      renderRowDrawer={(row) => "This is a drawer for row " + row.id + ".  Drawers have access to the row data. They are not rendered until opened. You can put whatever you want in here, another grid, pictures of your vacation, a mini dashboard for this row. Go nuts. Height will adjust.  Just make sure there are still rows visible above and below when this is open. "}
      hasSelection={boolean('Has selection (hasSelection)', true)}
      hasPagination={boolean('Has pagination (hasPagination)', false)}
      hasRowDrawers={boolean('Can display row drawers (hasRowDrawers)', false)}
      freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
      //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
      isLoading={boolean('Show loading indicator (isLoading)', false)}
      //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
      resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
      enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', false)}
      emptyStateType={emptyStatesProps()}
      immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}
    /> );
}

export const WithEmptyStates = () => {
  const {t} = useTranslation();

  const { sortColumn, sortOrder, setSortColumn } = useSortColumn(sortingFieldID, sortingDir);
  const [dataRows, setDataRows] = useState(mydataAsNumerics.rows);
  const [sort, setSort] = useState( []); // array of strings column:ASC|DESC|NONE
  const [sortingFieldID, setSortingFieldID] = useState();
  const [sortingDir, setSortingDir] = useState("NONE");
  const [selectedRows, setSelectedRows] = useState(mydata.rows.slice(0,2));





  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
  }

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfigAsNumerics);

  const [alteredConfig, setAlteredConfig] = useState(null);

  const changeColumnsOrder = headers => {
    const reorderedHeaders = [];
    headers.forEach(header => {
      reorderedHeaders.push(config.find(conf => conf.id === header.id));
    });

    setAlteredConfig(reorderedHeaders);
  };

  const handleSortChange = useCallback(
    column => {
      const sortDirection = setSortColumn(column);

      // Fetch the sorted data from back end. Dispatch action on response to update your data state.
      // useTableService.fetchSortedDataApi();
      // This next line mocks the query for storybook, do the sort on the backend!
      setDataRows(dataRows.sort( (a,b)=> ( (
        sortDirection === "ASC" && a[column]> b[column]) ||
        sortDirection === "DESC" && a[column]< b[column])
      ));

      setSortingDir(sortDirection);
      setSortingFieldID(column);
      setSort([column+":"+sortDirection]);
    },
    [setSortColumn,setSortingDir,setSortingFieldID, setSort]
  );

  const handleRowSelectionChange = useCallback(
    rows => setSelectedRows(rows)
    ,[]
  );

  return (
    <MagicTable
      t={t}
      config={alteredConfig || config}
      menus={menus}
      dataRows={[]}
      totalItems={dataRows.length}
      page={1}
      pageSize={10}
      pageSizes={[10, 20, 30]}
      onPageChange={()=>{}}
      selectedRows={selectedRows}
      onSelectionChange={handleRowSelectionChange}
      enableEmptyStates={boolean('Show information when grid has no data. a.k.a. empty state (enableEmptyStates)', true)}
      emptyStateType={emptyStatesProps()}
      immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}
    /> );
}

export const WithInfiniteScroll = () => {
  const {t} = useTranslation();

  const { sortColumn, sortOrder, setSortColumn } = useSortColumn(sortingFieldID, sortingDir);
  const [dataRows, setDataRows] = useState(infiniteScrollData.rows.slice(0, 15));
  const [gridData, setGridData] = useState(infiniteScrollData);
  const [originalData, setOriginalData] = useState(infiniteScrollData.rows.slice(0, 15));
  const [sort, setSort] = useState( []); // array of strings column:ASC|DESC|NONE
  const [sortingFieldID, setSortingFieldID] = useState();
  const [sortingDir, setSortingDir] = useState("NONE");
  const [selectedRows, setSelectedRows] = useState([]);
  const [myMenus, setMyMenus] = useState(menus);
  const [searchText, setSearchText] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);
  const [customInfinteScrollPageData, setCustomInfiniteScrollPageData] = useState({pageNumber: 0});

  const handleSearch = (value) => {
    setSearchText(value);
  }

  useEffect(() => {
    console.log('searchText', searchText);
  }, [searchText]);

  // need to use localMenus because myMenus loses its mind but is needed to be a property for components
  let localMenus = menus;

  const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
    console.log("onChange: " + JSON.stringify({
      column: column,
      rowId: rowId,
      row: row,
      selectedValue: selectedValue,
      initialValue: initialValue,
      format: format
    }));
    if (selectedValue === "_unselected") selectedValue = null;
    let updatedRows = dataRows.map(row => row.id === rowId ? { ...row, [column] : selectedValue} : row);
    setDataRows(updatedRows);
    if (column ===  "comboDropdownTest") {
      let updatedItems = localMenus.comboDropdownTest.items;
      updatedItems= updatedItems.filter(item => item.label !== selectedValue);
      if (selectedValue != null && (updatedItems.length === localMenus.comboDropdownTest.items.length)) {
        let theseMenus = localMenus;
        theseMenus = {
          ...theseMenus,
          comboDropdownTest: {
            items: [
              {label: selectedValue, value: selectedValue},
              ...updatedItems,
            ]
          }
        }
        localMenus = theseMenus;
        setMyMenus(theseMenus);
        console.log(theseMenus);
      }
    }
  }

  useEffect(() => {
    console.log('MyMenus', myMenus);
  }, [myMenus]);

  const moreEvents = {...events,  onCellChange:handleOnChange};

  const config = useTableFormatters(moreEvents).getConfig(myconfig);

  const [alteredConfig, setAlteredConfig] = useState(config);

  const changeColumnsOrder = headers => {
    const reorderedHeaders = [];
    headers.forEach(header => {
      reorderedHeaders.push(alteredConfig.find(conf => conf.id === header.id));
    });

    setAlteredConfig(reorderedHeaders);
  };

  const useSortRowsByColumn = () => {
    const { compare } = useCollator(SORT);

    return useCallback(
      (rows, column, sortDirection) => {
        if (rows && column && [SORT_STATES.ASC, SORT_STATES.DESC].includes(sortDirection)) {
          return sortDirection === SORT_STATES.ASC
            ? [...rows].sort((rowA, rowB) => compare(rowA[column], rowB[column]))
            : [...rows].sort((rowA, rowB) => compare(rowB[column], rowA[column]));
        }
        return rows;
      },
      [compare],
    );
  };

  const sortRowsByColumn = useSortRowsByColumn();

  const handleSortChange = column => {
    /* const sortDirection = setSortColumn(column);
    setDataRows(sortRowsByColumn(originalData, column, sortDirection)); */
    setCustomInfiniteScrollPageData({...customInfinteScrollPageData, pageNumber: 1});
  };

/*   const handleSortChange = useCallback(
    column => {
      const sortDirection = setSortColumn(column);

      // Fetch the sorted data from back end. Dispatch action on response to update your data state.
      // useTableService.fetchSortedDataApi();
      // This next line mocks the query for storybook, do the sort on the backend!
      setDataRows(dataRows.sort( (a,b)=> ( (
        sortDirection === "ASC" && a[column]> b[column]) ||
        sortDirection === "DESC" && a[column]< b[column])
      ));

      setSortingDir(sortDirection);
      setSortingFieldID(column);
      setSort([column+":"+sortDirection]);
    },
    [setSortColumn,setSortingDir,setSortingFieldID, setSort]
  ); */

  const handleSelectionTypeChange = useCallback(
    (selectionType) => {
      console.log('Option value', selectionType);
    }
    , []
  )

  const handleRowSelectionChange = useCallback(
    rows => setSelectedRows(rows)
    ,[]
  );

  const onApproveClick = useCallback(
    (event, selectedRows, selectionType) => {}
    , [] );

  const loadMoreData = (pageNumber, sortingDir, sortingFieldID) => {
    setInfiniteScrollLoading(true);
    const pageSize = 10;
    const nextSetOfData = gridData.rows.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize);
    const data = [...dataRows, ...nextSetOfData];
    setTimeout(() => {
      setOriginalData(previousData => [...previousData, ...nextSetOfData]);
      setDataRows(previousData => [...previousData, ...nextSetOfData]);
      setHasMore(nextSetOfData.length > 0);
      if (sortingFieldID && sortingFieldID !== '' && sortingDir !== 'NONE') {
        const sortedArr = sortRowsByColumn(data, sortingFieldID, sortingDir);
        setDataRows(sortedArr);
      }
      setInfiniteScrollLoading(false);
    }, 1000);
  };

  return (
    <><br/><br/>
      <MagicTable
        t={t}
        config={alteredConfig || config}
        menus={myMenus}
        dataRows={dataRows}
        totalItems={mydata.rows.length}
        page={1}
        pageSize={10}
        pageSizes={[10, 20, 30]}
        onPageChange={()=>{}}
        selectedRows={selectedRows}
        onSelectionChange={handleRowSelectionChange}
        onSelectionTypeChange={handleSelectionTypeChange}
        height={400}
        onSearch={handleSearch}
        onSearchChange={handleSearch}
        searchText={searchText}
        onHeaderRowSelectorClick={alert}
        batchActions={[
        ]}
        actions={[
        ]}
        draggableColumns={boolean('Drag and Drop Column Ordering (draggableColumns)', true)}
        onDragAndDropDone={changeColumnsOrder}
        allColumnsSortable={boolean('Enable sorting on all columns (allColumnsSortable)', true)}
        onSort={handleSortChange}
        sortingDir={sortingDir}
        sortingFieldID={sortingFieldID}
        searchPlaceholderText={t('search')}
        renderRowDrawer={(row) => "This is a drawer for row " + row.id + ".  Drawers have access to the row data. They are not rendered until opened. You can put whatever you want in here, another grid, pictures of your vacation, a mini dashboard for this row. Go nuts. Height will adjust.  Just make sure there are still rows visible above and below when this is open. "}
        hasSelection={boolean('Has selection (hasSelection)', true)}
        hasSelectionType={boolean('Has selection type (hasSelectionType)', false)}
        hasPagination={boolean('Has pagination (hasPagination)', false)}
        hasRowDrawers={boolean('Can display row drawers (hasRowDrawers)', false)}
        freezeFirstDataColumn={boolean('Freeze first column of data (freezeFirstDataColumn', false)}
        //  height={number('Height in pixels, ignored if resizeToWindow is true (height)',300)}
        isLoading={boolean('Show loading indicator (isLoading)', false)}
        //  resizeToWindow={boolean('Automatically resize to window (resizeToWindow)', false)}
        resizableColumns={boolean('Columns are resizable if true (resizeableColumns)', false)}
        hideBatchActionToolbar={boolean( 'Hide the batch action toolbar (hideBatchActionToolbar', false)}
        twoLinesPerRow={boolean('Two lines per row (twoLinesPerRow)', false)}
        enableEmptyStates={boolean('Enable Empty States(Data Should be empty to see empty state)', true)}
        emptyStateType={emptyStatesProps()}
        immobolizeFirstColumn={boolean('Keep first column the same(immobilizeFirstColumn)', false)}

        loadMoreData={loadMoreData}
        hasMoreData={hasMore}
        infiniteScrollLoading={infiniteScrollLoading}
        customInfiniteScrollData={customInfinteScrollPageData}
        enableInfiniteScroll
      /> </>);

}
