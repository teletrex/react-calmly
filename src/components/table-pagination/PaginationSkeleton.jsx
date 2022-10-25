/* <LICENSE>
 *
 * Copyright (C) 2020 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 * </LICENSE>
 *  */

import React from 'react';
import PropTypes from 'prop-types';
import { SkeletonText } from '@carbon/react';
import settings from '../../settings';

const { prefix } = settings;

export function PaginationSkeleton({ className }) {
  return (
    <div className={`${prefix}--pagination ${prefix}--skeleton ${className}`}>
      <div className={`${prefix}--pagination__left`}>
        <SkeletonText width="70px" />
        <SkeletonText width="35px" />
        <SkeletonText width="105px" />
      </div>
      <div
        className={`${prefix}--pagination__right ${prefix}--pagination--inline ${prefix}--pagination-skeleton--right`}
      >
        <SkeletonText width="70px" />
      </div>
    </div>
  );
}

PaginationSkeleton.propTypes = {
  className: PropTypes.string,
};

PaginationSkeleton.defaultProps = {
  className: undefined,
};
