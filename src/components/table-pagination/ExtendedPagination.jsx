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
import { Pagination as CarbonPagination, Select, SelectItem } from '@carbon/react';
import { CaretRight24, CaretLeft24 } from '@carbon/icons-react';
import  settings  from '../../settings';
import classnames from 'classnames';
import times from 'lodash/times';

const { prefix } = settings;

export class ExtendedPagination extends CarbonPagination {
  getPageOptions() {
    const { totalItems } = this.props;
    const { page, pageSize } = this.state;

    if (totalItems === undefined) {
      return [1];
    }

    const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
    const maxNumberOfOptions = 100;

    let firstPageOption = Math.max(1, page - maxNumberOfOptions / 2);
    const lastPageOption = Math.min(firstPageOption + maxNumberOfOptions, totalPages);
    firstPageOption = Math.max(1, Math.min(firstPageOption, lastPageOption - maxNumberOfOptions));
    const pageOptionsToShow = lastPageOption - firstPageOption + 1;

    const pageOptions = times(pageOptionsToShow, i => i + firstPageOption);

    if (firstPageOption === 1) {
      pageOptions.splice(100);
    } else {
      pageOptions.unshift(1);
    }

    if (lastPageOption !== totalPages) {
      pageOptions.push(totalPages);
    }

    return pageOptions;
  }

  render() {
    const {
      backwardText,
      className,
      forwardText,
      id,
      itemsPerPageText,
      itemRangeText,
      pageRangeText,
      pageSize,
      pageSizes,
      itemText,
      pageText,
      pageNumberText,
      pagesUnknown,
      isLastPage,
      pageInputDisabled,
      totalItems,
      onChange,
      page: pageNumber,
      ...other
    } = this.props;

    const classNames = classnames(`${prefix}--pagination`, className);
    const inputId = id || this.uniqueId;
    const { page: statePage, pageSize: statePageSize } = this.state;
    const totalPages = Math.max(Math.ceil(totalItems / statePageSize), 1);
    const backButtonDisabled = this.props.disabled || statePage === 1;
    const backButtonClasses = classnames(
      `${prefix}--pagination__button`,
      `${prefix}--pagination__button--backward`,
      {
        [`${prefix}--pagination__button--no-index`]: backButtonDisabled,
      }
    );
    const forwardButtonDisabled = this.props.disabled || statePage === totalPages;
    const forwardButtonClasses = classnames(
      `${prefix}--pagination__button`,
      `${prefix}--pagination__button--forward`,
      {
        [`${prefix}--pagination__button--no-index`]: forwardButtonDisabled,
      }
    );
    const pageOptions = this.getPageOptions();
    const pageRange = (() => {
      if (pageInputDisabled) {
        return null;
      }
      return (
        <span className={`${prefix}--pagination__text`}>
          {pagesUnknown ? pageText(statePage) : pageRangeText(statePage, totalPages)}
        </span>
      );
    })();
    return (
      <div className={classNames} {...other}>
        <div className={`${prefix}--pagination__left`}>
          <label
            className={`${prefix}--pagination__text`}
            htmlFor={`${prefix}-pagination-select-${inputId}`}
            id={`${prefix}-pagination-select-${inputId}-count-label`}
          >
            {itemsPerPageText}
          </label>
          <Select
            className={`${prefix}--select__item-count`}
            hideLabel
            id={`${prefix}-pagination-select-${inputId}`}
            inline
            labelText=""
            noLabel
            onChange={this.handleSizeChange}
            value={statePageSize}
          >
            {pageSizes.map(size => (
              <SelectItem key={size} text={String(size)} value={size} />
            ))}
          </Select>
          <span className={`${prefix}--pagination__text`}>
            {pagesUnknown
              ? itemText(statePageSize * (statePage - 1) + 1, statePage * statePageSize)
              : itemRangeText(
                  Math.min(statePageSize * (statePage - 1) + 1, totalItems),
                  Math.min(statePage * statePageSize, totalItems),
                  totalItems
                )}
          </span>
        </div>
        <div className={`${prefix}--pagination__right`}>
          {pageInputDisabled ? null : (
            <Select
              data-testid="page-select"
              className={`${prefix}--select__page-number`}
              hideLabel
              id={`${prefix}-pagination-select-${inputId}-right`}
              inline
              labelText={`Page number, of ${totalPages} pages`}
              onChange={this.handlePageInputChange}
              value={statePage}
            >
              {pageOptions.map(id => (
                <SelectItem key={id} text={String(id)} value={id} />
              ))}
            </Select>
          )}
          {pageRange}
          <button
            aria-label={backwardText}
            className={backButtonClasses}
            disabled={backButtonDisabled}
            onClick={this.decrementPage}
            title={backwardText}
            type="button"
          >
            <CaretLeft24 />
          </button>
          <button
            aria-label={forwardText}
            className={forwardButtonClasses}
            disabled={forwardButtonDisabled || isLastPage}
            onClick={this.incrementPage}
            title={forwardText}
            type="button"
          >
            <CaretRight24 />
          </button>
        </div>
      </div>
    );
  }
}
