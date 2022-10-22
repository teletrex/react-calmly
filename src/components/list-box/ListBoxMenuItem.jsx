/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';
import PropTypes from 'prop-types';
import settings  from '../../settings';
import classNames from 'classnames';

const { prefix } = settings;

const ListBoxMenuItem = ({ children, disabled, isActive, isHighlighted, className, ...rest }) => {
  const composedClassName = classNames(className, {
    [`${prefix}--list-box__menu-item`]: true,
    [`${prefix}--list-box__menu-item--disabled`]: disabled,
    [`${prefix}--list-box__menu-item--active`]: isActive,
    [`${prefix}--list-box__menu-item--highlighted`]: isHighlighted,
  });
  return (
    <div aria-selected={isActive} className={composedClassName} role="option" {...rest}>
      <div className={`${prefix}--list-box__menu-item__option`}>
        <span className={`${prefix}--list-box__menu-item__option__text`}>{children}</span>
      </div>
    </div>
  );
};

ListBoxMenuItem.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
};
ListBoxMenuItem.defaultProps = {
  children: undefined,
  disabled: false,
};

export default ListBoxMenuItem;
