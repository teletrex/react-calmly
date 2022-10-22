/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import settings from '../../settings';

import FocusLock, { MoveFocusInside } from 'react-focus-lock';
import mergeRefs from '@carbon/react/es/tools/mergeRefs';
import { composeEventHandlers } from '@carbon/react/es/tools/events';


import isFunction from 'lodash/isFunction';

import { OverflowMenu, Tag, Search } from '@carbon/react';

import { optionsPropTypes } from './prop-types';
import { defaultClassName } from './constants';
import { Footer, SearchIcon, Options } from './components';

const {prefix} = settings;

const ColumnFilter = ({
  t,
  title,
  subtitle,
  showTags,
  searchFieldPlaceholder,
  onApply,  // passed the array of options
  onReset,  // passed the array of options as cleared
  onEnter,  // can be used for a backend data fetch function passed the current search string and the current options selection. (options, searchString)
  visibleOptionsLimit,
  singleSelection,
  overflowMenuProps,
  options: optionsFromProps,  // array of filter options
}) => {

  if (optionsFromProps == null) return ("No options provided.");

  const [appliedOptions, setAppliedOptions] = useState(optionsFromProps);   // option selection since the last apply click
  const [initialOptions,setInitialOptions] = useState(optionsFromProps);    // preset options when opening the filter
  const [options, setOptions] = useState(optionsFromProps);                 // current user selection
  const [optionsToShow,setOptionsToShow] = useState([]);
  const [optionsToShowCount, setOptionsToShowCount] = useState(visibleOptionsLimit);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isApplyDisabled, setIsApplyDisabled] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [tags, setTags]= useState([]);

  const distinct = (arrayOfOptions) => {
    let uniqueValueMap = {}
    if (arrayOfOptions.constructor === Array) {
      arrayOfOptions.map(option => uniqueValueMap[option.value] = option);
      const uniques = Object.entries(uniqueValueMap).map(entry => entry[1] )
      return uniques
    }
    else return [];
  }

  useEffect(() => {
    if (optionsFromProps.constructor === Array) {
      const optionsWithoutWildcard =  distinct(optionsFromProps);
      setOptions(optionsWithoutWildcard);
      setAppliedOptions(optionsWithoutWildcard);
      setInitialOptions(optionsWithoutWildcard);
    }
  }, [optionsFromProps]);

  const onSearchInput = useCallback(e => {
    setSearchInputValue(e.target.value);
  }, []);

  const onShowMoreClick = useCallback(() => {
    setOptionsToShowCount(prevState => prevState + 100);
  }, []);

  const onOptionToggle = useCallback(
    value => {
      setOptions(prevState => {
        return prevState.map(it => {
          if (it.value === value) {
            return { ...it, checked: !it.checked };
          }
          if (singleSelection) {
            return { ...it, checked: false };
          }
          return it;
        });
      });
    },
    [singleSelection]
  );

  const onRemoveTag = useCallback(value => {
    setOptions(prevState => {
      return prevState.map(it => (it.value === value ? { ...it, checked: false } : it));
    });
  }, []);

  const onOpenOverflow = useCallback(() => {
    setOpen(true);
  }, []);

  const onCloseOverflow = useCallback(() => {
    if (isFunction(overflowMenuProps.onClose)) {
      overflowMenuProps.onClose();
    }
    setOptions(appliedOptions);
    setOptionsToShowCount(visibleOptionsLimit);
    setSearchInputValue('');
    setOpen(false);
  }, [appliedOptions, overflowMenuProps, visibleOptionsLimit]);

  const handleReset = useCallback(() => {
    const clearedOptions = initialOptions.map(option => ({ ...option, checked:false}));
    setOptions(clearedOptions);
    setAppliedOptions(clearedOptions);
    onReset(clearedOptions);
    setOpen(false);
  }, [initialOptions, onReset]);


  const handleEnter = useCallback(text => {
    if (text.length>0 ) {
      if (onEnter){
        onEnter(options,text);
      }
      const updatedOption = options.filter(
        option =>
          option &&
          option.text &&
          (option.text.toLowerCase() === text.toLowerCase())
      );

      let updatedOptions=[];
      if (updatedOption.length > 0) {
        updatedOptions = [
          {...updatedOption[0], checked: true},
          ...options.filter(
            option => option.text.toLowerCase() !== text.toLowerCase()
          )
        ]
      }

      else {  // entered is not in list
        updatedOptions = [
          { text:text, value:text, checked:true, wildcard:true},
          ...options.filter(
            option => option.text.toLowerCase() !== text.toLowerCase()
          )
        ]
      }

      updatedOptions = distinct(updatedOptions);
      setOptions(updatedOptions);
      setAppliedOptions(updatedOptions);
      setTags(updatedOptions);

    }
  }, [options]);

  const handleApply = useCallback( () => {
    if (searchInputValue.length > 0) {
      let optionsSelectedByWildcard = options.map( option =>
      {
        if (
          (option.text.toLowerCase() === searchInputValue.toLowerCase()) &&
          option.value !== null)  // don't match the (blank) option
        {
           option.checked = true;  // really should not check boxes for the user when they can't see it.
        }
        return option;
      })

      optionsSelectedByWildcard
        .push({text:searchInputValue,value:searchInputValue,checked:true, wildcard:true})

      optionsSelectedByWildcard = distinct(optionsSelectedByWildcard)
      onApply( optionsSelectedByWildcard)
      setAppliedOptions( optionsSelectedByWildcard)

    } else {
      const noDuplicates = distinct(options);
      onApply(noDuplicates);
      setAppliedOptions(noDuplicates);
    }

    setOpen(false);
  },[searchInputValue,options]);

  const isFiltersApplied = () =>
    (appliedOptions != null) && appliedOptions.some(it => it.checked);

  useEffect( () => {
    setIsApplyDisabled((
      (
      !!appliedOptions
      &&
      !!options
      &&
      options.length>0
      )
      &&
      options.every((it, index) => it.checked === appliedOptions[index].checked)
      &&
      searchInputValue.length===0
      )
    );
  },[appliedOptions,options,searchInputValue]);

  /*
  useEffect(() => {
    setIsResetDisabled(  (!!initialOptions && !!options && options.length>0 && options.length === initialOptions.length) && initialOptions.every(
      (it, index) => it.checked === options[index].checked));
    } ,[initialOptions, options] );
*/

  useEffect( () => {
    setIsResetDisabled( (!!options && options.length>0 && !options.some(it => it.checked)))
  })

  useEffect( () => {
    setTags(showTags ? options.filter(it => it.checked) : null);
  },[options,showTags])

  useEffect(() => {
    const value = searchInputValue.trim();
    if (!value) {
      setOptionsToShow(options);
      return;
    }

    const optionsFoundBySearch = options.filter(it => {
        if (it && it.text && it.text.toLowerCase)
          return it.text.toLowerCase().includes(value.toLowerCase()) && it.value !== null;
        else return false
      }
    )
    setOptionsToShow(optionsFoundBySearch);
  }, [options, searchInputValue]);

  const overflowButtonRef = useRef();

  const { ref, onClick, onClose, flipped, className, ...rest } = overflowMenuProps;


  return (
    <div
      className={classNames(defaultClassName, {
        [`${defaultClassName}--applied`]: isFiltersApplied(),
      })}
    >
      <OverflowMenu
        ref={mergeRefs(ref, overflowButtonRef)}
        className={classNames(className, `${defaultClassName}__trigger`)}
        enableBoxShadowFix
        flipped={flipped}
        onClick={composeEventHandlers([onOpenOverflow, onClick])}
        onClose={onCloseOverflow}
        open={open}
        renderIcon={SearchIcon}
        {...rest}
      >
        <FocusLock crossFrame={false} disabled={!open} shards={[overflowButtonRef]}>
            <div className={`${defaultClassName}__content`}>
              <div className={`${defaultClassName}__title`}>{ typeof title == "undefined" ?  t('Filter'):title}</div>
              <div className={`${defaultClassName}__subtitle`}>{typeof subtitle == "undefined" ? t('Filter'):subtitle}</div>

              {(tags && tags.length ) ? (
                <div className={`${defaultClassName}__tags`}>
                  {tags.map(it => (

                    <Tag
                      key={`tag ${it.text}`}
                      buttonTitle={`Remove ${it.text}`}
                      filter
                      onClick={() => onRemoveTag(it.value)}
                      type={it.wildcard ? "blue":"rc-gray"}
                    >
                      {it.text}
                    </Tag>
                    )
                    )
                  }
                </div>
              ) : null}
              { (options.length > visibleOptionsLimit || true) &&  // wildcard search so always show search
              (
              <MoveFocusInside>

                <Search
                    t={t}
                    className={`${defaultClassName}__search`}
                    onChange={onSearchInput}
                    placeHolderText={searchFieldPlaceholder || t('Find filters')}
                    handleSelect={handleEnter}
                    size="small"
                    small
                    autoComplete="off"
                    value={searchInputValue}
                  />
              </MoveFocusInside>

              )}
              <Options
                t={t}
                onOptionToggle={onOptionToggle}
                onShowMoreClick={onShowMoreClick}
                options={optionsToShow.filter(option => !option.wildcard).slice(0,optionsToShowCount)}
                shouldDisplayShowMoreButton={optionsToShow.length > optionsToShowCount}
              />
            </div>
            <Footer
              t={t}
              isApplyDisabled={isApplyDisabled}
              isResetDisabled={isResetDisabled}
              onApplyClick={handleApply}
              onResetClick={handleReset}
            />
        </FocusLock>
      </OverflowMenu>
    </div>
  );
};

ColumnFilter.propTypes = {
  /**
   * Function called on "Apply" button's click
   */
  onApply: PropTypes.func.isRequired,

  /**
   * Function called on "Reset" button's click
   */
  onReset: PropTypes.func.isRequired,

  /**
   * Filter options to be displayed
   */
  options: optionsPropTypes.isRequired,

  /**
   * Props for OverflowMenu component
   */
  overflowMenuProps: PropTypes.shape(OverflowMenu.propTypes),

  /**
   * Placeholder text for the search field
   */
  searchFieldPlaceholder: PropTypes.string,

  /**
   * `true` if selected filters tags are displayed
   */
  showTags: PropTypes.bool,

  /**
   * `true` if only one item can be selected at a time
   */
  singleSelection: PropTypes.bool,

  /**
   * Subtitle text
   */
  subtitle: PropTypes.string,

  /**
   * Title text
   */
  title: PropTypes.string,

  /**
   * Number of items after which "show more" button will be displayed
   */
  visibleOptionsLimit: PropTypes.number,
};

ColumnFilter.defaultProps = {
  overflowMenuProps: {},
  searchFieldPlaceholder: undefined,
  showTags: true,
  singleSelection: false,
  subtitle: undefined,
  title: undefined,
  visibleOptionsLimit: 10,
};

export default React.memo(ColumnFilter);
