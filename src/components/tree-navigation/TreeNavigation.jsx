/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import settings from '../../settings';
import { ChevronDown } from '@carbon/icons-react';

import ExpandableHoC from './ExpandableHoC';

const {prefix} = settings;

export const TreeNavigation = ({ isNode, children }) => (
  <ul
    className={classNames(`${prefix}--tree-navigation`, { "cds--tree-navigation--is-root": !isNode })}
    data-testid="tree-navigation"
  >
    {children}
  </ul>
);

TreeNavigation.propTypes = {
  children: PropTypes.node,
  isNode: PropTypes.bool,
};

TreeNavigation.defaultProps = {
  children: null,
  isNode: false,
};

const CARBON_BASE_FONT_SIZE = 16;

function carbonRem(pixels) {
  return pixels / CARBON_BASE_FONT_SIZE;
}

const MENU_ITEM_LEFT_PADDING = 16;
const ROOT_MENU_ITEM_LEFT_PADDING = 32;
const MENU_ITEM_SELECT_BORDER_WIDTH = 3;

function calculateLeftPadding(level, selected) {
  const nonSelectedPadding = ROOT_MENU_ITEM_LEFT_PADDING + level * MENU_ITEM_LEFT_PADDING;
  return carbonRem(
    selected ? nonSelectedPadding - MENU_ITEM_SELECT_BORDER_WIDTH : nonSelectedPadding
  );
}

export const TreeNavigationItem = ExpandableHoC(
  ({
    chevronLeft,
    children,
    selected,
    label,
    targetClassName,
    expands,
    disabled,
    handleHeadingKeyDown,
    handleHeadingClick,
    open,
    elementType,
    hideChevron,
    heading,
    hideTitle,
    isRoot,
    level,
    decorator,
    ...props
  }) => {
    const Wrapper = elementType || 'button';
    const buttonProps = {
      type: 'button',
    };
    const isOpen = open || heading;
    return (
      <li
        className={classNames(`${prefix}--tree-navigation-item`, {
          "cds--tree-navigation-item--open": open,
          "cds--tree-navigation-item--heading": heading,
        })}
      >
        <Wrapper
          aria-expanded={isOpen}
          className={classNames(`${prefix}--tree-navigation-item__button`, targetClassName, {
            "cds--tree-navigation-item__button--selected": selected,
          })}
          disabled={disabled}
          onClick={handleHeadingClick}
          onKeyDown={handleHeadingKeyDown}
          readOnly={!expands}
          role="button"
          style={{ paddingLeft: `${calculateLeftPadding(level, selected)}rem` }}
          title={!hideTitle && expands ? label : null}
          {...(!elementType && buttonProps)}
          {...props}
        >
          {!chevronLeft && <div className={`${prefix}--tree-navigation-item__label`}>{label}</div>}
          {expands && !hideChevron && (
            <div
              className={classNames(`${prefix}--tree-navigation-item__header-chevron`, {
                "cds--tree-navigation-item__header-chevron--rotate": isOpen,
              })}
            >
              <ChevronDown size={16} />
            </div>
          )}
          {chevronLeft && (
            <>
              <div className={`${prefix}--tree-navigation-item__label`}>{label}</div>
              {decorator}
            </>
          )}
        </Wrapper>
        {isOpen && (
          <TreeNavigation isNode>
            {React.Children.map(children, child => ({
              ...child,
              props: {
                ...child.props,
                level: level + 1,
                isRoot: false,
              },
            }))}
          </TreeNavigation>
        )}
      </li>
    );
  }
);

TreeNavigationItem.propTypes = {
  chevronLeft: PropTypes.bool,
  children: PropTypes.node,
  decorator: PropTypes.node,
  disabled: PropTypes.bool,
  elementType: PropTypes.elementType,
  expands: PropTypes.bool,
  handleHeadingClick: PropTypes.func,
  handleHeadingKeyDown: PropTypes.func,
  heading: PropTypes.bool,
  hideChevron: PropTypes.bool,
  hideTitle: PropTypes.bool,
  label: PropTypes.node.isRequired,
  level: PropTypes.number,
  open: PropTypes.bool,
  selected: PropTypes.bool,
  targetClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

TreeNavigationItem.defaultProps = {
  chevronLeft: false,
  decorator: undefined,
  disabled: false,
  expands: false,
  heading: false,
  hideChevron: false,
  level: 0,
  open: false,
  selected: false,
  targetClassName: '',
};
