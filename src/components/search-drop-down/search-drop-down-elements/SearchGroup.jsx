/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  settings  from '../../../settings';

const { prefix } = settings;

const SearchGroup = props => {
  const { children, className } = props;

  return <div className={classNames(className, `${prefix}--search-group`)}>{children}</div>;
};

SearchGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SearchGroup.defaultProps = {
  className: '',
};

export default SearchGroup;
