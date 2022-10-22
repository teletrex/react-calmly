/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../../settings';
import classNames from 'classnames';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';

import { useTranslation } from '../../../translation';
import SearchDropDown from '../../search-drop-down/SearchDropDown';
import {
  SearchElement,
  SearchElementContent,
  SearchGroup,
  SearchHeader,
} from '../../search-drop-down';
import { useTimeout } from '../../../utils/hooks';

import useToolbarSearchState, { useToolbarSearchStatePropTypes } from './useToolbarSearchState';

const { prefix } = settings;

const SHOW_DROPDOWN_CHAR_AMOUNT = 2;

const trimOrEmpty = (srcString = '') => {
  return (srcString || '').trim();
};

const ToolbarSearch = ({
  children,
  className = '',
  onDropDownOpenChange,
  onSearch,
  onSearchChange,
  onSearchInputChange,
  onSearchSelect,
  placeHolderText,
  portalBindRef,
  searchChangeDelay,
  searchTextValue,
  showDropdownOnInputFocus,
  value,
  withSearchStringSuggestion,
  ...other
}) => {
  const { t } = useTranslation();

  const { value: searchText, setValue: setSearchText } = useToolbarSearchState({
    value,
    searchTextValue,
  });
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const handleSearchChange = useCallback(
    (inputString = '') => {
      onSearchChange(inputString);
    },
    [onSearchChange]
  );

  const [pendingSearchChange, clearPendingSearchChange] = useTimeout(
    handleSearchChange,
    searchChangeDelay
  );

  const shouldShowDropdown = useCallback(params => {
    const { triggerEvent, inputString = '', value = '' } = params;
    const valueToCheck =
      triggerEvent.type === 'change'
        ? trimOrEmpty(inputString)
        : triggerEvent.type === 'focus'
        ? trimOrEmpty(value)
        : '';

    return (
      SearchDropDown.shouldShowDropdownDefault(params) &&
      trimOrEmpty(valueToCheck).length >= SHOW_DROPDOWN_CHAR_AMOUNT
    );
  }, []);

  const placeholderTextOrDefault = useMemo(() => {
    return placeHolderText || t('search');
  }, [placeHolderText, t]);

  // search input change
  const handleInputChange = useCallback(
    e => {
      if (e && e.target) {
        const inputString = e.target.value || '';
        setSearchText(inputString);
        onSearchInputChange(inputString);
        pendingSearchChange(inputString);
      }
    },
    [onSearchInputChange, pendingSearchChange, setSearchText]
  );

  // magnifying glass icon button click, and/or search input commit by Enter
  const handleSearchSelect = useCallback(
    inputString => {
      clearPendingSearchChange();
      const stringToSearch = trimOrEmpty(inputString);

      if (stringToSearch) {
        onSearch(stringToSearch);
      }
    },
    [clearPendingSearchChange, onSearch]
  );

  // on dropDown item click and/or commit by Enter (if clickable)
  const handleDropDownItemSuggested = useCallback(
    props => {
      onSearchSelect(props);
    },
    [onSearchSelect]
  );

  const handleDropDownOpen = useCallback(
    isOpen => {
      setDropDownOpen(isOpen);
      onDropDownOpenChange(isOpen);
    },
    [onDropDownOpenChange]
  );

  const suggestionsRenderProps = { searchText, isDropDownOpen };

  return (
    <SearchDropDown
      {...other}
      className={classNames(`${prefix}--table-toolbar-search`, className)}
      handleSelect={handleSearchSelect}
      onChange={handleInputChange}
      onDropDownOpenChange={handleDropDownOpen}
      placeHolderText={placeholderTextOrDefault}
      selectedElementCallback={handleDropDownItemSuggested}
      shouldShowDropdown={shouldShowDropdown}
      showDropdownOnInputFocus={showDropdownOnInputFocus}
      value={searchText}
      withPortal
    >
      {withSearchStringSuggestion && searchText ? (
        <SearchGroup>
          <SearchHeader>{t('SEARCH TEXT FOR')}</SearchHeader>
          <SearchElement clickable searchStringSuggestion>
            <SearchElementContent>{searchText}</SearchElementContent>
          </SearchElement>
        </SearchGroup>
      ) : null}
      {useCallback(() => {
        if (isFunction(children)) {
          return children(suggestionsRenderProps);
        }
        return children;
      }, [children, suggestionsRenderProps])()}
    </SearchDropDown>
  );
};

ToolbarSearch.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  onDropDownOpenChange: PropTypes.func,
  onSearch: PropTypes.func, // user wants to search by non-empty current search string (i.e. via "magnifying glass" button and/or hit Enter)
  onSearchChange: PropTypes.func, // string value of search input has changed (delayed by searchChangeDelay)
  onSearchInputChange: PropTypes.func, // string value of search input has changed
  onSearchSelect: PropTypes.func, // suggested prompt item selected
  // eslint-disable-next-line react/require-default-props
  placeHolderText: PropTypes.string,
  portalBindRef: PropTypes.instanceOf(Element),
  searchChangeDelay: PropTypes.number,
  showDropdownOnInputFocus: PropTypes.bool,
  withSearchStringSuggestion: PropTypes.bool,
  ...useToolbarSearchStatePropTypes,
};

ToolbarSearch.defaultProps = {
  className: '',
  onDropDownOpenChange: noop,
  onSearch: noop,
  onSearchChange: noop,
  onSearchInputChange: noop,
  onSearchSelect: noop,
  portalBindRef: null,
  searchChangeDelay: 800,
  showDropdownOnInputFocus: true,
  withSearchStringSuggestion: true,
};

export default ToolbarSearch;
