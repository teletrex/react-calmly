/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FocusLock, { MoveFocusInside } from 'react-focus-lock';
import mergeRefs from '@carbon/react/es/tools/mergeRefs';
import { composeEventHandlers } from '@carbon/react/es/tools/events';
import isFunction from 'lodash/isFunction';

import { OverflowMenu, Tag, Search, Dropdown, TextInput } from '@carbon/react';

import { defaultClassName } from './constants';
import { Footer, SearchIcon, Options } from './components';
import TextInputEditor from '../magic-table/editors/TextInputEditor';

/* options [{ value:null,comparator:null}] */
/* options [{ value:2.0,comparator:{item:"Equal To", id:"="}}] */

const ColumnRangeFilter = ({
  t,
  title,
  subtitle,
  onApply,
  onReset,
  overflowMenuProps,
  valuePlaceholder,
  format,
  options: optionsFromProps,
}) => {

  const valueClassName = " rightalign";
  const NUMERIC_REGEXP = /^[-]{0,1}[\d]{0,6}[\.]{0,1}[\d]{0,4}$/g;
  const CURRENCY_REGEXP = /^[$|€|£]{0,1}[-]{0,1}[\d]{0,6}[\.]{0,1}[\d]{0,4}$/g;

  const [appliedOptions, setAppliedOptions] = useState(optionsFromProps );
  const [initialOptions] = useState(optionsFromProps );
  const [options, setOptions] = useState(optionsFromProps );
  const [open, setOpen] = useState(false);
  const [comparator, setComparator] = useState(optionsFromProps && optionsFromProps.length>0 && optionsFromProps[0].comparator);
  const [value, setValue] = useState(optionsFromProps && optionsFromProps.length>0 && optionsFromProps[0].value);
  const [isApplyDisabled, setIsApplyDisabled] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);

  useEffect( () => {
    setAppliedOptions(optionsFromProps);
    setOptions(optionsFromProps);
    if (!!optionsFromProps && optionsFromProps.length >0) {
      setValue(optionsFromProps[0].value);
      setComparator(optionsFromProps[0].comparator);
    } else {
      setValue(null);
      setComparator(null);
    }
  },[optionsFromProps]);

  useEffect( () => {
    setIsApplyDisabled(
      (options && options.length>0 && (isNaN(options[0].value) || options[0].value ==='' ||options[0].value === null || options[0].comparator.id === null ))
      ||
      (options  && appliedOptions && options.length === appliedOptions.length && appliedOptions.every(
        (it, index) => ((it.value === options[index].value) && (it.comparator === options[index].comparator))))

    )}, [options,appliedOptions]
  );

  useEffect(() => {
    const disableReset = true;
    setIsResetDisabled(
        !!options && options.length>0 && !!initialOptions && initialOptions.every(
        (it, index) => ((it.value === options[index].value) && (it.comparator === options[index].comparator))
        ))
    }, [options,initialOptions]
  );

  const isFiltersApplied = appliedOptions && appliedOptions.some(it => it.value !== null);

  const onOpenOverflow = useCallback(() => {
    setOpen(true);
  }, []);

  const onCloseOverflow = useCallback(() => {
    if (isFunction(overflowMenuProps.onClose)) {
      overflowMenuProps.onClose();
    }
    setOptions(appliedOptions);
    setOpen(false);
  }, [appliedOptions, overflowMenuProps]);

  const handleReset = useCallback(() => {
    setOptions([]);
    setAppliedOptions([]);
    onReset([]);
    setOpen(false);
  }, [ onReset]);

  const handleApply = useCallback(() => {
    onApply(options);
    setAppliedOptions(options);
    setOpen(false);
  }, [onApply, options]);


  const handleComparatorChange = (comparisonSelection) => {
    setComparator(comparisonSelection.selectedItem);
    const currentValue = options ? (options.length>0 ? options[0].value: null): null ;
    setOptions([{comparator:comparisonSelection.selectedItem, value:currentValue}]);
  }

  const handleValueChange = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.match(CURRENCY_REGEXP)!=null || inputValue.match(NUMERIC_REGEXP)!=null) {
      setValue(inputValue);
      const currentComparator = options && options.length>0 ? options[0].comparator: { text:null,id:null};
      setOptions([{comparator:currentComparator, value:inputValue}]);
    }
  };

  const handleValueBlur = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.match(CURRENCY_REGEXP)!=null || inputValue.match(NUMERIC_REGEXP)!=null) {
      setValue(inputValue);
    }
  };

  const overflowButtonRef = useRef();

  const { ref, onClick, onClose, flipped, ...rest } = overflowMenuProps;

  return (
    <div
      className={classNames(defaultClassName, {
        [`${defaultClassName}--applied`]: isFiltersApplied,
      })}
    >
      <OverflowMenu
        ref={mergeRefs(ref, overflowButtonRef)}
        className={classNames(`${defaultClassName}__trigger`)}
        enableBoxShadowFix
        flipped={flipped}
        onClick={composeEventHandlers([onOpenOverflow, onClick])}
        onClose={onCloseOverflow}
        open={open}
        renderIcon={SearchIcon}
        {...rest}
      >
        <FocusLock crossFrame={false} disabled={!open} shards={[overflowButtonRef]}>
          <MoveFocusInside className={`${defaultClassName}__wrapper`}>
            <div className={`${defaultClassName}__content`}>
              <div className={`${defaultClassName}__title`}>{typeof title === "undefined" ?  t('Filter'): title}</div>
              <div className={`${defaultClassName}__subtitle`}>{typeof subtitle === "undefined" ?  t('Show rows with values'):subtitle}</div>
              <Dropdown  items={[  // Note: the ids are meant to be SQL friendly
                {text:t("column.range.filter.equals","Equal To"),id:"="},
                {text:t("column.range.filter.not.equal.to","Not Equal To"),id:"<>"},
                {text:t("column.range.filter.less.than","Less Than"),id:"<"},
                {text:t("column.range.filter.greater.than","Greater Than"), id:">"}
              ]}
                        itemToString={item => (item ? item.text : '')}
                        selectedItem={comparator}
                        onChange = {handleComparatorChange}
                        id ={"combo-range-filter-dropdown"}
              />
              <br/>
              <TextInputEditor
                id={"columnRangeFilter-1"}
                placeHolder={valuePlaceholder}
                initialValue= {value}
                onCellChange= {handleValueChange}
                format={"number"}
                column={"dummyColumn"}
                row={{id:1}}
                onCellBlur={handleValueBlur}
              />
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </div>
            <Footer
              t={t}
              isApplyDisabled={isApplyDisabled}
              isResetDisabled={isResetDisabled}
              onApplyClick={handleApply}
              onResetClick={handleReset}
            />
          </MoveFocusInside>
        </FocusLock>
      </OverflowMenu>
    </div>
  );
};

ColumnRangeFilter.propTypes = {
  /**
   * Function called on "Apply" button's click
   */
  onApply: PropTypes.func.isRequired,

  /**
   * Function called on "Reset" button's click
   */
  onReset: PropTypes.func.isRequired,

  /**
   * Props for OverflowMenu component
   */
  overflowMenuProps: PropTypes.shape(OverflowMenu.propTypes),

  /**
   * Placeholder text for the value field
   */
  valueFieldPlaceholder: PropTypes.string,

  /**
   * Subtitle text
   */
  subtitle: PropTypes.string,

  /**
   * Title text
   */
  title: PropTypes.string,

};

ColumnRangeFilter.defaultProps = {
  overflowMenuProps: {},
  valueFieldPlaceholder: undefined,
  subtitle: undefined,
  title: undefined,

};

export default React.memo(ColumnRangeFilter);
