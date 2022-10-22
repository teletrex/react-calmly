/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  settings  from '../../../settings';
import noop from 'lodash/noop';

const { prefix } = settings;

const SearchElement = props => {
  const { children, onMouseDown, selected, onClick, clickable } = props;
  const element = useRef(null);

  const searchElementClasses = classNames(`${prefix}--search-element`, {
    [`${prefix}--search-element--selected`]: selected,
  });

  useEffect(() => {
    if (selected && element.current) {
      element.current.scrollIntoView(false);
    }
  }, [selected, clickable]);

  return (
    <div
      ref={element}
      className={searchElementClasses}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      role="presentation"
    >
      {children}
    </div>
  );
};

SearchElement.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  selected: PropTypes.bool,
};

SearchElement.defaultProps = {
  clickable: false,
  onClick: noop,
  onMouseDown: noop,
  selected: false,
};

export default SearchElement;
