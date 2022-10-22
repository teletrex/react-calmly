/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import  settings  from '../../settings';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const { prefix } = settings;

const BreadcrumbTemplate = ({ children, breadcrumbs, className }) => {
  const defaultClassName = `${prefix}--breadcrumb-template`;

  return (
    <div className={classNames(defaultClassName, className)}>
      {breadcrumbs && (
        <div className={`${defaultClassName}__breadcrumb-wrapper`}>{breadcrumbs}</div>
      )}
      <div className={`${defaultClassName}__content`}>{children}</div>
    </div>
  );
};

BreadcrumbTemplate.propTypes = {
  breadcrumbs: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  children: PropTypes.node,
  className: PropTypes.string,
};

BreadcrumbTemplate.defaultProps = {
  breadcrumbs: null,
  children: null,
  className: '',
};

export default BreadcrumbTemplate;
