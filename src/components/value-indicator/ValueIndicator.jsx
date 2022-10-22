/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../settings';

import {Tag} from '@carbon/react';
import { useFormat } from '../format';

const { prefix } = settings;

const getTagType = tagValue => {
  if (tagValue < 0) {
    return 'cds-red';
  }

  if (tagValue > 0) {
    return 'cds-green';
  }
  return 'cds-gray';
};

const ValueIndicator = props => {
  const { formatNumber } = useFormat();
  const { className, tagValue, mainValue, title, tagPostfix, mainPostfix, ...other } = props;

  return (
    <div className={classNames(className, `${prefix}--value-indicator`)}>
      <div className={`${prefix}--value-indicator--header`}>
        <div className={`${prefix}--value-indicator--title`}>{title}</div>
        <Tag
          className={classNames(className, { [`${prefix}--tag--empty`]: tagValue === null })}
          type={getTagType(tagValue)}
          {...other}
        >
          {formatNumber(tagValue)} {tagPostfix}
        </Tag>
      </div>
      <div className={`${prefix}--value-indicator--body`}>
        {formatNumber(mainValue)} {mainPostfix}
      </div>
    </div>
  );
};

ValueIndicator.propTypes = {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Postfix presented on main element
   */
  mainPostfix: PropTypes.string,

  /**
   * The main number displayed in a percentage
   */
  mainValue: PropTypes.number,

  /**
   * Postfix presented on tag element
   */
  tagPostfix: PropTypes.string,

  /**
   * Tag value displayed in tag in percentage
   */
  // eslint-disable-next-line react/require-default-props
  tagValue: PropTypes.number,

  /**
   * Text description for label for tag
   */
  title: PropTypes.string,
};

ValueIndicator.defaultProps = {
  className: '',
  mainPostfix: '%',
  mainValue: null,
  tagPostfix: '%',
  tagValue: 0,
  title: '',
};

export default ValueIndicator;
