/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  settings  from '../../settings';
import noop from 'lodash/noop';
import isObjectLike from 'lodash/isObjectLike';
import { keys, match, matches } from '../keyboard';
import uniqueId from 'lodash/uniqueId';

import { useTranslation } from '../../translation';
import {Search} from '@carbon/react';
import { useDropdownInPortal, WithPortalPropType } from '../../utils/hooks/use-dropdown-in-portal';
import { DomElement } from '../../utils/DomUtils';
import { usePrevious } from '../../utils/hooks';

const { prefix } = settings;
const mainPrefix = `${prefix}--search-drop-down`;

const SIZE = {
  SMALL: 'sm',
  LARGE: 'lg',
};

const KIND = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

const CONTROL_KEYS = [keys.ArrowUp, keys.ArrowDown, keys.Enter, keys.Escape];

const SearchDropDown = ({
  className,
  disabled,
  dropdownMaxHeight,
  children,
  id,
  kind,
  labelText,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  selectedElementCallback,
  size,
  withBorderBottom,
  shouldShowDropdown,
  showDropdownOnInputFocus,
  handleSelect,
  withPortal,
  onDropDownOpenChange,
  ...rest
}) => {
  const { t } = useTranslation();
  const root = useRef();
  const [input, setInput] = useState('');

  const [focusIndex, setFocusIndex] = useState(-1);
  const iterableElements = [];

  const onDropDownOpenChangeHandler = useRef(onDropDownOpenChange);
  onDropDownOpenChangeHandler.current = onDropDownOpenChange;
//  TODO: really should just reuse a menu or list box to get the styles right.

  const {
    Portal,
    portalRef,
    showDropDown,
    isDropDownOpen,
    dropDownInPortalOffset,
  } = useDropdownInPortal(root, withPortal, {
    closeIfClickOutside: true,
  });

  const isDropDownWasOpen = usePrevious(isDropDownOpen, isDropDownOpen);

  const usePortalDropDown = useMemo(() => {
    return withPortal === true || isObjectLike(withPortal);
  }, [withPortal]);

  const labelTextOrDefault = useMemo(() => {
    return labelText || t('search');
  }, [labelText, t]);

  const calculateNextIndex = (currentIndex, maxIndex, isDown) => {
    if (isDown) {
      if (currentIndex + 1 >= maxIndex) {
        return 0;
      }
      return currentIndex + 1;
    }
    if (currentIndex - 1 < 0) {
      return maxIndex - 1;
    }
    return currentIndex - 1;
  };

  const handleKeyDown = useCallback(
    e => {
      onKeyDown(e);

      if (matches(e, CONTROL_KEYS)) {
        const isArrowUp = match(e.which, keys.ArrowUp);
        const isArrowDown = match(e.which, keys.ArrowDown);
        const isEnter = match(e.which, keys.Enter);
        const isEscape = match(e.which, keys.Escape);

        if (isArrowUp || isArrowDown) {
          setFocusIndex(calculateNextIndex(focusIndex, iterableElements.length, isArrowDown));
        } else if (isEscape) {
          showDropDown(false);
        } else if (isEnter) {
          if (focusIndex === -1) {
            handleSelect(input);
          } else {
            selectedElementCallback({
              i: focusIndex,
              element: iterableElements[focusIndex],
            });
          }
          DomElement(document.activeElement).blur();
        }
      }
    },
    [
      focusIndex,
      handleSelect,
      input,
      iterableElements,
      onKeyDown,
      selectedElementCallback,
      showDropDown,
    ]
  );

  const searchDropDownClasses = useMemo(
    () =>
      classNames(className, {
        [`${mainPrefix}--small`]: size === SIZE.SMALL,
        [`${mainPrefix}--large`]: size === SIZE.LARGE,
        [`${mainPrefix}--primary`]: kind === KIND.PRIMARY,
        [`${mainPrefix}--secondary`]: kind === KIND.SECONDARY,
      }),
    [className, kind, size]
  );

  const dropdownStyle = useMemo(() => (dropdownMaxHeight ? { maxHeight: dropdownMaxHeight } : {}), [
    dropdownMaxHeight,
  ]);

  const isDropDownOpenRequire = useCallback(
    (triggerEvent, inputString = input) => {
      return (
        shouldShowDropdown({ ...rest, showDropdownOnInputFocus, triggerEvent, inputString }) ===
        true
      );
    },
    [input, rest, shouldShowDropdown, showDropdownOnInputFocus]
  );

  const listMouseDown = useCallback(e => {
    e.preventDefault();
  }, []);

  const handleInputBlur = useCallback(
    e => {
      showDropDown(false);
      setFocusIndex(-1);
      onBlur(e);
    },
    [onBlur, showDropDown]
  );

  const handleInputFocus = useCallback(
    e => {
      if (isDropDownOpenRequire(e)) {
        showDropDown(true);
      }
      onFocus(e);
    },
    [isDropDownOpenRequire, onFocus, showDropDown]
  );

  const handleInputChange = useCallback(
    e => {
      if (e && e.target) {
        const inputValue = e.target.value;
        setInput(inputValue);
        showDropDown(isDropDownOpenRequire(e, inputValue));
      }
      onChange(e);
    },
    [showDropDown, isDropDownOpenRequire, onChange]
  );

  useEffect(() => {
    if (isDropDownOpen !== isDropDownWasOpen) {
      onDropDownOpenChangeHandler.current(isDropDownOpen);
    }
  }, [isDropDownOpen, isDropDownWasOpen]);

  const childrenClone =
    React.Children.count(children) > 0
      ? React.Children.map(children, group => {
          return React.isValidElement(group)
            ? React.cloneElement(group, {
                ...group.props,
                children: React.Children.map(group.props.children, child => {
                  if (child && child.props.clickable) {
                    iterableElements.push(child);
                  }
                  const index = iterableElements.length - 1;
                  return React.isValidElement(child)
                    ? React.cloneElement(child, {
                        ...child.props,
                        selected: child.props.clickable && focusIndex === index,
                        onMouseDown: child.props.clickable
                          ? () => {
                              showDropDown(false);
                              setFocusIndex(-1);
                              selectedElementCallback({
                                i: index,
                                element: child,
                              });
                            }
                          : undefined,
                      })
                    : null;
                }),
              })
            : null;
        })
      : null;

  return (
    <>
      {labelText && (
        <label className={`${prefix}--label`} htmlFor={`search-${id}`} id={`${id}-label`}>
          {t(labelText)}
        </label>
      )}
      <div
        ref={root}
        className={classNames(mainPrefix, searchDropDownClasses, {
          [`${mainPrefix}--underlined`]: withBorderBottom,
        })}
      >
        <Search
          aria-label={labelTextOrDefault}
          {...rest}
          disabled={disabled}
          handleSelect={handleSelect}
          id={`search-${id}`}
          labelText=""
          light={kind === KIND.SECONDARY}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          small={size === SIZE.SMALL}
        />
        {usePortalDropDown ? (
          <Portal>
            {isDropDownOpen && (
              <div
                ref={portalRef}
                className={classNames(
                  mainPrefix,
                  searchDropDownClasses,
                  `${mainPrefix}--in-portal`
                )}
                style={dropDownInPortalOffset}
              >
                <div
                  className={`${mainPrefix}--list`}
                  onMouseDown={listMouseDown}
                  role="presentation"
                  style={dropdownStyle}
                >
                  {isDropDownOpen && childrenClone}
                </div>
              </div>
            )}
          </Portal>
        ) : (
          <div
            className={`${mainPrefix}--list`}
            onMouseDown={listMouseDown}
            role="presentation"
            style={dropdownStyle}
          >
            {isDropDownOpen && childrenClone}
          </div>
        )}
      </div>
    </>
  );
};

SearchDropDown.shouldShowDropdownOnFocusDefault = ({ showDropdownOnInputFocus, triggerEvent }) => {
  return triggerEvent.type === 'focus' ? showDropdownOnInputFocus : false;
};

SearchDropDown.shouldShowDropdownOnChangeDefault = ({ triggerEvent }) => {
  return triggerEvent.type === 'change';
};

SearchDropDown.shouldShowDropdownDefault = params =>
  SearchDropDown.shouldShowDropdownOnFocusDefault(params) ||
  SearchDropDown.shouldShowDropdownOnChangeDefault(params);

SearchDropDown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  dropdownMaxHeight: PropTypes.string,
  handleSelect: PropTypes.func,
  id: PropTypes.string,
  kind: PropTypes.oneOf([KIND.PRIMARY, KIND.SECONDARY]),
  // eslint-disable-next-line react/require-default-props
  labelText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDropDownOpenChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  selectedElementCallback: PropTypes.func,
  shouldShowDropdown: PropTypes.func,
  showDropdownOnInputFocus: PropTypes.bool,
  size: PropTypes.oneOf([SIZE.SMALL, SIZE.LARGE]),
  withBorderBottom: PropTypes.bool,
  withMagnifyingGlass: PropTypes.bool,
  withPortal: WithPortalPropType,
};

SearchDropDown.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  handleSelect: noop,
  id: uniqueId('search__drop_down__id_'),
  kind: KIND.PRIMARY,
  onBlur: noop,
  onChange: noop,
  onDropDownOpenChange: noop,
  onFocus: noop,
  onKeyDown: noop,
  selectedElementCallback: noop,
  shouldShowDropdown: SearchDropDown.shouldShowDropdownDefault,
  showDropdownOnInputFocus: false,
  size: SIZE.LARGE,
  withBorderBottom: false,
  withMagnifyingGlass: true,
  withPortal: false,
};

export const SearchDropDownPortalAnchor = React.forwardRef(({ className }, ref) => {
  return (
    <div style={{ position: 'relative', display: 'contents' }}>
      <div
        ref={ref}
        className={classNames(`${mainPrefix}-portal-anchor`, { [className]: className })}
        style={{ position: 'absolute' }}
      />
    </div>
  );
});

export default SearchDropDown;
