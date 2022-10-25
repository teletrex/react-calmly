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
import classNames from 'classnames';
import PropTypes from 'prop-types';
import settings from '../../settings';
import omit from 'lodash/omit';

import { useTranslation } from '../../translation';
import { useFormat } from '../format';

import { ExtendedPagination as CarbonPagination } from './ExtendedPagination';

const { prefix } = settings;

const Pagination = props => {
  const { t } = useTranslation();
  const { formatNumber } = useFormat();

  const itemRangeText = (min, max, total) => {
    if (total >= 1000 && window.innerWidth < 800) {
      const slicedTotal = formatNumber(total).slice(0, 3);
      return t('{{min}} - {{max}} of {{slicedTotal}}... items', {
        min: formatNumber(min),
        max: formatNumber(max),
        slicedTotal,
      });
    }
    return t('{{min}} - {{max}} of {{total}} items', {
      min: formatNumber(min),
      max: formatNumber(max),
      total: formatNumber(total),
    });
  };

  const itemText = (min, max) =>
    t('{{min}} - {{max}} items', {
      min: formatNumber(min),
      max: formatNumber(max),
    });

  const pageRangeText = (current, total) =>
    t('of {{total}} pages', {
      total: formatNumber(total),
    });

  const pageText = page =>
    t('Page {{page}}', {
      page: formatNumber(page),
    });

  const { simple, unbound, pagesUnknown } = props;

  const className = classNames(
    { [`${prefix}--pagination--simple`]: simple || unbound },
    { [`${prefix}--pagination--unbound`]: unbound }
  );

  return (
    <CarbonPagination
      backwardText={t('Previous page')}
      className={className}
      forwardText={t('Next page')}
      itemRangeText={itemRangeText}
      itemsPerPageText={t('Items per page:')}
      itemText={itemText}
      pageNumberText={t('Page Number')}
      pageRangeText={pageRangeText}
      pageText={pageText}
      {...omit(props, ['simple', 'unbound'])}
      pagesUnknown={simple || unbound || pagesUnknown}
    />
  );
};

Pagination.propTypes = {
  pagesUnknown: PropTypes.bool,
  simple: PropTypes.bool,
  unbound: PropTypes.bool,
};

Pagination.defaultProps = {
  pagesUnknown: false,
  simple: false,
  unbound: false,
};

export default Pagination;
