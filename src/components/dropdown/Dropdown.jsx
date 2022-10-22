/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  settings  from '../../settings';

import { useTranslation } from '../../translation';

const { prefix } = settings;

export const DropdownSkeleton = ({ inline, className, ...rest }) => {
  const { t } = useTranslation();

  const wrapperClasses = classNames(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--dropdown-v2`]: true,
    [`${prefix}--list-box`]: true,
    [`${prefix}--form-item`]: true,
    [`${prefix}--list-box--inline`]: inline,
  });

  return (
    <div className={wrapperClasses} {...rest}>
      <div aria-label={t('skeleton')} className={`${prefix}--list-box__field`}>
        <svg height="16" viewBox="0 0 16 16" width="16">
          <path d="M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z" />
        </svg>
        <span className={`${prefix}--list-box__label`} />
      </div>
    </div>
  );
};

DropdownSkeleton.propTypes = {
  inline: PropTypes.bool,
};

DropdownSkeleton.defaultProps = {
  inline: false,
};

export { Dropdown } from '@carbon/react';
