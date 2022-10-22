/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';
import {
  Search
} from '@carbon/react';

import CheckboxList from '../magic-table/components/CheckboxList';
import ClickAwayListener from '../click-away-listener';
import { CheckBoxListGroup } from './CheckBoxListGroup';
const { prefix } = settings;
export const MultiSelectComboBox = ({
  t,
  filterText: filterTextFromProps,
  id,
  items,  // { text: String , value: uniqueid, checked: bool, group : string | undefined } required.
  onChange,
  optionLimit,
  optionLimitStep,
  onAskForMore,
  searchPlaceholderText,
  disableSearch,
  singleSelect,
  returnChangedItemsSeparately,
  onlyAddItems,  // clicking rows only adds items, does not delete if true, hidethecheckboxes when you do this.
  hideTheCheckboxes, // handy for when you have tags to do the delete part.
  itemsGrouped, //if items need to be grouped by group attribute
  invalid,
  disabled

}) => {
  const [options, setOptions] = useState(items);
  const [currentOptionLimit, setCurrentOptionLimit] = useState(optionLimit);
  const [filterText, setFilterText] = useState(filterTextFromProps);
  const [open, setOpen] = useState(false);


  useEffect(() => {setOptions(items);}, [items])

  const handleMorePlease = useCallback(
     () => {
       const newLimit = currentOptionLimit + optionLimitStep;
       setCurrentOptionLimit(newLimit);
       if(onAskForMore) {
         onAskForMore(newLimit);
       }
     },
    [optionLimitStep, onAskForMore, currentOptionLimit]
  );

  const createResetOptionsLimitHandler = useCallback(
    id => ({isOpen}) => {
      if (!isOpen && optionLimit !== currentOptionLimit) {
        setCurrentOptionLimit(optionLimit);
      }
    },
    [optionLimit, currentOptionLimit]
  );

  const handleChangeSelection = useCallback (
    (updatedOptions) => {
      (singleSelect===true && setOpen(false));
      if (returnChangedItemsSeparately) {
        const indexedOptions = {};
        options.forEach( option => {indexedOptions[option.value] = option})
        let changedOptions;
        if (onlyAddItems) {
          changedOptions = updatedOptions
            .filter(option => option.checked)
            .filter(option => option.checked != indexedOptions[option.value].checked);
        } else {
          changedOptions = updatedOptions
            .filter(option => option.checked != (indexedOptions[option.value].checked))
        }
        onChange(options, updatedOptions, changedOptions[0]);
      } else {
        onChange(options, updatedOptions);
      }
      if (onlyAddItems)
        setOptions(updatedOptions.map(option => ({...option, checked:false})));
      else
        setOptions(updatedOptions);
  },[options , onChange]);

  const handleSearchChange= useCallback(
    (searchText) => {
      setFilterText(searchText);
      filterOptions(options, searchText);
    },[options,filterText]
  );

  const filterOptions = useCallback(
    (options, filter) => {
      const newOptionsList = options.map(option => {
        const rawText = option.rawText || option.text;
        return {
          ...option,
          invisible: !!filter && !rawText.toLowerCase().includes(filter.toLowerCase()),
        };
      });
      setOptions(newOptionsList);
    },
    [options]
  );

  return (
    <ClickAwayListener onClickAway={e => setOpen(false)}>
      <div className={`${prefix}--multiselect-combobox ` + (hideTheCheckboxes ? `${prefix}--hide-checkbox` :"") }>
        { !disableSearch && ( <Search
          disabled={disabled}
          className={`${prefix}--filter__search ` + (invalid ? `${prefix}--dropdown--invalid` : "")}
          id={id.replaceAll('name','noacme')}
          autoComplete={"off"}
          onClick={ (e) => setOpen(true)}
          labelText={'Filter'}
          onChange={evt => handleSearchChange(evt.target.value)}
          placeHolderText={searchPlaceholderText}
          small
          value={filterText}
          onKeyDown={ (e) => {setOpen(true); if (e.keyCode===13) e.preventDefault()}}
        /> )}
        { disableSearch && (
          <div
            className={`${prefix}--dropdown ${prefix}--list-box` + (disabled ? ` disabled` :"")}
            onClick = { (e)=> !disabled && setOpen(true)}>
            <div className={`${prefix}--list-box__field` }>
              <div className={`${prefix}--list-box__label`}>
                {searchPlaceholderText}
              </div>
            </div>
          </div>
        )}
        {(open && !itemsGrouped &&
          <CheckboxList
            className={`${prefix}--filter__dropdown`}
            hasSingleSelect={false}
            isSelectAllRequired={false}
            limit={currentOptionLimit}
            onChangeSelection={optionsList => {
              handleChangeSelection(optionsList);
            }}
            onPushLimit={handleMorePlease}
            options={options}
          />
        )}
        {(open && itemsGrouped &&
          <CheckBoxListGroup
            options={options}
            onChangeSelection={optionsList => {
              handleChangeSelection(optionsList);
            }} />
        )}
      </div>
    </ClickAwayListener>
  )
}


MultiSelectComboBox.propTypes = {
  filterText: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape(
      {
        text: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
          .isRequired,
        checked: PropTypes.bool,
        group: PropTypes.string
      }
    )
  ).isRequired,
  optionLimit: PropTypes.number,
  optionLimitStep: PropTypes.number,
  onAskForMore: PropTypes.function,
  returnOnlyChangedItems: PropTypes.bool,
  itemsGrouped: PropTypes.bool,
  singleSelect: PropTypes.bool
};

MultiSelectComboBox.defaultProps = {
  filterText: '',
  disableSearch: false,
  id: 'search-filter',
  items: [],
  optionLimit: 10,
  optionLimitStep: 100,
  shouldRenderTags: false,
  withHorizontalLine: false,
  onlyAddItems: false,  // useful for menus where clicking adds tags and checkboxes aren't used.
  hideTheCheckboxes: false,   // hide the checkboxes when using as a menu to only add things.
  itemsGrouped: false,
  singleSelect: false  // if true, close the dropdown after the first selection is clicked
};




