/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FocusLock, { MoveFocusInside } from 'react-focus-lock'
import mergeRefs from '@carbon/react/es/tools/mergeRefs'
import { composeEventHandlers } from '@carbon/react/es/tools/events'

import { OverflowMenu, Dropdown } from '@carbon/react'

import { optionsPropTypes } from './prop-types'
import { defaultClassName } from './constants'
import { Footer, SearchIcon, Options } from './components'
import DateInputEditor from '../magic-table/editors/DateInputEditor'

/* options [{ value:null,comparator:null}] */
/* options [{ value:2.0,comparator:{item:"Equal To", id:"="}}] */

const ColumnDateRangeFilter = ({
  t,
  title,
  subtitle,
  onApply,
  onReset,
  overflowMenuProps,
  valuePlaceholder,
  format,
  dateFormat,
  options: optionsFromProps,
}) => {
  //  const valueClassName = " rightalign";
  //  const NUMERIC_REGEXP = /^[-]{0,1}[\d]{0,6}[\.]{0,1}[\d]{0,4}$/g;
  //  const CURRENCY_REGEXP = /^[$|€|£]{0,1}[-]{0,1}[\d]{0,6}[\.]{0,1}[\d]{0,4}$/g;

  const blankOption = [{ value: null, comparator: { text: null, id: null } }]
  const defaultOption = [
    { value: null, comparator: { text: t('column.range.filter.equals','Equals'), id: '=' } },
  ]

  const startingOptions = () => {
    if (optionsFromProps == null) return defaultOption
    if (optionsFromProps.length === 0) return defaultOption
    else return optionsFromProps
  }

  const myStartingOptions = startingOptions()
  const myComparator = myStartingOptions[0].comparator
  const myValue = myStartingOptions[0].value

  const [appliedOptions, setAppliedOptions] = useState(myStartingOptions)
  const [initialOptions] = useState(myStartingOptions)
  const [options, setOptions] = useState(myStartingOptions)
  const [open, setOpen] = useState(false)
  const [comparator, setComparator] = useState(myComparator)
  const [value, setValue] = useState(myValue)
  const [isApplyDisabled, setApplyDisabled] = useState(false)
  const [isResetDisabled, setResetDisabled] = useState(false)

  useEffect(() => {
    setApplyDisabled(
      appliedOptions &&
        appliedOptions.every(
          (it, index) =>
            it.value === options[index].value && it.comparator === options[index].comparator
        )
    )
  }, [options, appliedOptions])

  useEffect(() => {
    const disableReset = true
    setResetDisabled(
      initialOptions &&
        initialOptions.every(
          (it, index) =>
            it.value === options[index].value && it.comparator === options[index].comparator
        )
    )
  }, [options, initialOptions])

  const isFiltersApplied = appliedOptions && appliedOptions.some((it) => it.value !== null)

  const onOpenOverflow = useCallback(() => {
    console.log('onOpenOverflow')
    setOpen(true)
  }, [])

  const onCloseOverflow = useCallback(() => {
    if (typeof overflowMenuProps.onClose == 'function') {
      overflowMenuProps.onClose()
    }
    setOptions(appliedOptions)
    console.log('onCloseOverflow')
    setOpen(false)
  }, [appliedOptions, overflowMenuProps])

  const handleReset = useCallback(() => {
    setValue('')
    setOptions(initialOptions)
    setAppliedOptions(initialOptions)
    onReset(initialOptions)
  }, [initialOptions, onReset])

  const handleApply = useCallback(() => {
    onApply(options)
    setAppliedOptions(options)
    console.log('handleApply')
    setOpen(false)
  }, [onApply, options])

  const handleComparatorChange = (comparisonSelection) => {
    setComparator(comparisonSelection.selectedItem)
    const currentValue = options[0].value
    setOptions([{ comparator: comparisonSelection.selectedItem, value: currentValue }])
  }

  const handleValueChange = (date) => {
    const inputValue = date
    console.log('Handle Value Change', date)
    //    if (inputValue.match(CURRENCY_REGEXP)!=null || inputValue.match(NUMERIC_REGEXP)!=null) {
    setValue(inputValue)
    const currentComparator = options[0].comparator
    setOptions([{ comparator: currentComparator, value: inputValue }])
    //    }
  }

  const handleValueBlur = (date) => {
    const inputValue = date
    //    if (inputValue.match(CURRENCY_REGEXP)!=null || inputValue.match(NUMERIC_REGEXP)!=null) {
    setValue(inputValue)
    //    }
  }

  const overflowButtonRef = useRef()

  const { ref, onClick, onClose, flipped, ...rest } = overflowMenuProps

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
        onClick={(e) => {
          console.log('========================')
          composeEventHandlers([onOpenOverflow, onClick])
          e.stopPropagation()
        }}
        onClose={onCloseOverflow}
        open={open}
        renderIcon={SearchIcon}
        {...rest}
      >
        <FocusLock crossFrame={false} disabled={!open} shards={[overflowButtonRef]}>
          <MoveFocusInside className={`${defaultClassName}__wrapper`}>
            <div className={`${defaultClassName}__content`}>
              <div className={`${defaultClassName}__title`}>{title || t('Filter')}</div>
              <div className={`${defaultClassName}__subtitle`}>
                {subtitle || t('Show rows with values')}
              </div>
              <Dropdown
                items={[
                  // Note: the ids are meant to be SQL friendly
                  { text: t('column.range.filter.equals','Equals'), id: '=' },
                  { text: t('column.range.filter.not.equal.to','Not equal to'), id: '<>' },
                  { text: t('column.range.filter.less.than','Less than'), id: '<' },
                  { text: t('column.range.filter.greater.than','Greater than'), id: '>' },
                ]}
                itemToString={(item) => (item ? item.text : '')}
                selectedItem={comparator}
                onChange={handleComparatorChange}
                id={'combo-range-filter-dropdown'}
              />
              <br />
              <DateInputEditor
                placeholder={valuePlaceholder}
                initialValue={value}
                onCellChange={handleValueChange}
                numberOnly={true}
                column={'dummyColumn'}
                row={{ id: 1 }}
                // onCellBlur={handleValueBlur}   //Removed This event as it was assigning an Object instead of Date value everytime
                // dateFormat={dateFormat}
                dateFormat='m/d/y'
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
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
  )
}

export default ColumnDateRangeFilter

ColumnDateRangeFilter.propTypes = {
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

  dateFormat: PropTypes.string,
}

ColumnDateRangeFilter.defaultProps = {
  overflowMenuProps: {},
  valueFieldPlaceholder: undefined,
  subtitle: undefined,
  title: undefined,
}
