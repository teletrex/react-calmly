/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import classNames from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import settings from '../../settings';
import { ErrorFilled, Document } from '@carbon/icons-react';
import { keys, match } from '../keyboard';

import isObjectLike from 'lodash/isObjectLike';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';

import { withTranslation } from '../../translation';
import { Search } from '@carbon/react';
import { WithPortalPropType, useDropdownInPortal } from '../../utils/hooks/use-dropdown-in-portal';
import { useNodeRef } from '../../utils/hooks';
import ListBox, { PropTypes as ListBoxPropTypes } from '../list-box';
import ListBoxMenu from '../list-box/ListBoxMenu';
import { DomElement } from '../../utils/DomUtils';
import ClickAwayListener from '../click-away-listener';

const { prefix } = settings;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

export const defaultFilterByText = (item, filterText) => {
  const text = typeof item === 'object' ? item.text || item.label : item;

  if (!filterText) {
    return true;
  }

  return text.toLowerCase().includes(filterText.toLowerCase());
};

const defaultTranslations = {
  ['close.menu']: 'Close menu',
  ['open.menu']: 'Open menu',
};

const ExtendedDropdown = ({
  t,
  className: containerClassName,
  disabled,
  filterByText,
  items,
  label,
  ariaLabel,
  itemToString,
  itemToElement,
  type,
  initialSelectedItem,
  selectedItem,
  id,
  titleText,
  helperText,
  translateWithId,
  light,
  invalid,
  invalidText,
  searchPlaceHolderText,
  preventDefaultOnMouseDown,
  downshiftProps,
  withSearch,
  withItemIcon,
  withPortal,
  onChange,
  onSelect,
  keepOpenAfterSelect,
}) => {
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchElement, setSearchElement] = useNodeRef();
  const root = useRef();
  const fieldRef = useRef();
  const menuRef = useRef();

  const handleDownshiftStateChange = useCallback(
    changes => {
      const highlightChanged = changes.hasOwnProperty('highlightedIndex');
      if (withSearch && highlightChanged) {
        const { highlightedIndex } = changes;

        if (highlightedIndex === 0) {
          DomElement(searchElement).focus();
          return;
        }
        if (!highlightedIndex && document.activeElement === searchElement) {
          menuRef.current.setHighlightedIndex(0);
        }
      }
    },
    [withSearch, searchElement]
  );

  const handleOnChange = useCallback(
    (selectedItem, downshiftProps) => {
      if (onChange) {
        onChange({ selectedItem });
      }

      if (keepOpenAfterSelect) {
        downshiftProps.openMenu();
      }
    },
    [keepOpenAfterSelect, onChange]
  );

  const handleOnSelect = useCallback(
    (selectedItem, downshiftProps) => {
      if (onSelect) {
        onSelect({ selectedItem });
      }

      if (keepOpenAfterSelect) {
        downshiftProps.openMenu();
      }
    },
    [keepOpenAfterSelect, onSelect]
  );

  const handleMouseDown = useCallback(
    (event, item, selectItem) => {
      if (preventDefaultOnMouseDown) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (selectItem) {
        selectItem(item);
      }
    },
    [preventDefaultOnMouseDown]
  );

  const { Portal, portalRef, showDropDown, dropDownInPortalOffset } = useDropdownInPortal(
    root,
    withPortal,
    {
      closeIfClickOutside: false,
    }
  );

  const usePortalDropDown = useMemo(() => {
    return withPortal === true || isObjectLike(withPortal);
  }, [withPortal]);

  const inline = type === 'inline';
  const className = ({ isOpen }) =>
    classNames(`${prefix}--dropdown`, containerClassName, {
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--open`]: isOpen,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--disabled`]: disabled,
      [`${prefix}--dropdown--light`]: light,
    });
  const titleClasses = classNames(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });

  const labelId = `dropdown-label-${id || uniqueId()}`;
  const dropdownId = `dropdown-${id || uniqueId()}`;

  const title = titleText ? (
    <div aria-disabled={disabled} className={titleClasses} id={labelId}>
      <span>{titleText}</span>
    </div>
  ) : null;
  const helperClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });
  const helper = helperText ? <div className={helperClasses}>{helperText}</div> : null;
  const wrapperClasses = classNames(
    `${prefix}--dropdown__wrapper`,
    `${prefix}--list-box__wrapper`,
    {
      [`${prefix}--dropdown__wrapper--inline`]: inline,
      [`${prefix}--list-box__wrapper--inline`]: inline,
      [`${prefix}--dropdown__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
    }
  );

  const ariaProps = () =>
    titleText && titleText !== '' ? { 'aria-labelledby': labelId } : { 'aria-label': ariaLabel };

  // needs to be Capitalized for react to render it correctly
  const ItemToElement = itemToElement;

  useEffect(() => {
    if (withPortal) {
      showDropDown(isOpen);
    }
  }, [isOpen, showDropDown, withPortal]);

  const renderMenuList = (
    selectedItem,
    highlightedIndex,
    getItemProps,
    getMenuProps,
    getInputProps,
    selectItem
  ) => {
    const searchProps = getInputProps({
      value: filterText,
      onChange: event => {
        setFilterText(event.target.value);
      },
      'aria-label': `${dropdownId}-search`,
    });


    return (
      <ListBoxMenu
        {...getMenuProps()}
        aria-label={dropdownId}
        className={classNames(
          `${prefix}--list-box__menu ${prefix}--list-box__${isOpen ? 'open' : 'close'}`
        )}
        id={id}
      >
        {withSearch && (
          <ListBox.MenuItem
            key={`${dropdownId}-search`}
            className={`${prefix}--dropdown__search-wrapper`}
            isActive={false}
            isHighlighted={highlightedIndex === 0}
            onClick={e => e.nativeEvent.stopImmediatePropagation()}
            role="option"
          >
            <Search
              aria-label={`${dropdownId}-search`}
              inputRef={setSearchElement}
              labelText={t('Search for dropdown')}
              placeHolderText={searchPlaceHolderText || t('Search...')}
              small
              {...searchProps}
              onKeyDown={event => {
                // removing extra parameter from search
                searchProps.onKeyDown(event);
              }}
            />
          </ListBox.MenuItem>
        )}
        { items
          .filter(item => !withSearch || filterByText(item, filterText))
          .map((item, index) => {
            const indexWithSearch = withSearch ? index + 1 : index;
            return (
              <div key={`item-${index}`} className={`${prefix}--icon-wrapper`}>
                <ListBox.MenuItem
                  key={itemToString(item)}
                  isActive={selectedItem === item}
                  isHighlighted={highlightedIndex === indexWithSearch || selectedItem === item}
                  {...getItemProps({
                    key: `${id}-${indexWithSearch}`,
                    item,
                    disabled: item.disabled,
                    index: indexWithSearch,
                    onMouseDown: event => handleMouseDown(event, item, selectItem),
                  })}
                  role="option"
                  tabIndex={0}
                  title={item.name || itemToString(item)}
                >
                  {withItemIcon && <Document size={16} className={`${prefix}--file-icon`} />}
                  {itemToElement ? (
                    <ItemToElement key={itemToString(item)} {...item} />
                  ) : (
                    itemToString(item)
                  )}
                </ListBox.MenuItem>
              </div>
            );
          })}
      </ListBoxMenu>
    );
  };

  const onChangeOrSelect = onSelect ? { onSelect: handleOnSelect } : { onChange: handleOnChange };
  return (
    <div ref={root} className={wrapperClasses} {...ariaProps()}>
      <div>{isOpen?"open":"closed"}</div>
      {title}
      {!inline && helper}
      <Downshift
        {...downshiftProps}
        initialSelectedItem={initialSelectedItem}
        itemToString={itemToString}
        {...onChangeOrSelect}
        ref={menuRef}
        onStateChange={handleDownshiftStateChange}
        selectedItem={selectedItem}
      >
        {({
          isOpen,
          itemToString,
          selectedItem,
          highlightedIndex,
          getRootProps,
          getToggleButtonProps,
          getItemProps,
          getInputProps,
          getLabelProps,
          getMenuProps,
          toggleMenu,
          closeMenu,
          selectItem,
          selectHighlightedItem,
        }) => {
          setIsOpen(isOpen);
          const renderDropdown = () => (
            <ListBox
              className={className({ isOpen })}
              disabled={disabled}
              id={dropdownId}
              invalid={invalid}
              invalidText={invalidText}
              isOpen={isOpen}
              light={light}
              tabIndex={-1}
              type={type}
              {...getRootProps({ refKey: 'innerRef' })}
              {...ariaProps()}
              aria-owns={`${id}__menu`}
            >
              {invalid && <ErrorFilled size={16} className={`${prefix}--list-box__invalid-icon`} />}
              <ListBox.Field
                ref={fieldRef}
                aria-disabled={disabled}
                disabled={disabled}
                id={id}
                tabIndex="0"
                {...getToggleButtonProps({
                  onKeyDown: event => {
                    if (match(event, keys.Enter)) {
                      toggleMenu();
                    }
                    if (match(event, keys.Space)) {
                      selectHighlightedItem();
                      toggleMenu();
                    }
                    if (match(event, keys.Escape)) {
                      event.nativeEvent.preventDownshiftDefault = true; // eslint-disable-line no-param-reassign
                      if (isOpen) {
                        toggleMenu();
                      }
                    }
                  },
                  onMouseUp: event => {
                    if (event.target.contains(fieldRef.current)) {
                      event.stopPropagation();
                    }
                  },
                  disabled,
                })}
              >
                <span className={`${prefix}--list-box__label`} {...getLabelProps()}>
                  {selectedItem ? itemToString(selectedItem) : label}
                </span>
                <ListBox.MenuIcon isOpen={isOpen} translateWithId={translateWithId} />
              </ListBox.Field>
              {isOpen && usePortalDropDown ? (
                <Portal>
                  <div
                    ref={portalRef}
                    className={classNames(
                      `${prefix}--list-box--in-portal`,
                      `${prefix}--dropdown__wrapper`
                    )}
                    style={dropDownInPortalOffset}
                  >
                    {renderMenuList(
                      selectedItem,
                      highlightedIndex,
                      getItemProps,
                      getMenuProps,
                      getInputProps,
                      selectItem
                    )}
                  </div>
                </Portal>
              ) : (
                renderMenuList(
                  selectedItem,
                  highlightedIndex,
                  getItemProps,
                  getMenuProps,
                  getInputProps
                )
              )}
            </ListBox>
          );
          if (isOpen) {
            return (
              <ClickAwayListener onClickAway={closeMenu} {...getRootProps({ refKey: 'innerRef' })}>
                {renderDropdown()}
              </ClickAwayListener>
            );
          }
          return renderDropdown();
        }}
      </Downshift>

    </div>
  );
};

ExtendedDropdown.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  downshiftProps: PropTypes.shape(Downshift.propTypes),
  filterByText: PropTypes.func,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string.isRequired,
  initialSelectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  inline: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      }),
      PropTypes.string,
    ])
  ).isRequired,
  itemToElement: PropTypes.func,
  itemToString: PropTypes.func,
  keepOpenAfterSelect: PropTypes.bool,
  label: PropTypes.node.isRequired,
  light: PropTypes.bool,
  onChange: PropTypes.func,
  onDropDownOpenChange: PropTypes.func,
  onSelect: PropTypes.func,
  preventDefaultOnMouseDown: PropTypes.bool,
  searchPlaceHolderText: PropTypes.string,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // eslint-disable-line react/require-default-props
  t: PropTypes.func.isRequired,
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  translateWithId: PropTypes.func,
  type: ListBoxPropTypes.ListBoxType,
  withItemIcon: PropTypes.bool,
  withPortal: WithPortalPropType,
  withSearch: PropTypes.bool,
};

ExtendedDropdown.defaultProps = {
  disabled: false,
  downshiftProps: {},
  filterByText: defaultFilterByText,
  helperText: '',
  initialSelectedItem: null,
  inline: false,
  invalid: false,
  invalidText: '',
  itemToElement: null,
  itemToString: defaultItemToString,
  keepOpenAfterSelect: false,
  light: false,
  onChange: noop,
  onDropDownOpenChange: noop,
  onSelect: undefined,
  preventDefaultOnMouseDown: true,
  searchPlaceHolderText: '',
  titleText: '',
  translateWithId: id => defaultTranslations[id],
  type: 'default',
  withItemIcon: false,
  withPortal: false,
  withSearch: false,
};

export default withTranslation()(ExtendedDropdown);
