/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useState, useMemo, useCallback } from 'react';
import settings  from '../../settings';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import { H2 } from '../heading';

import FullPageTemplateContext from './FullPageTemplateContext';

const { prefix } = settings;

const wrapElement = (headerProp, Component) =>
  typeof headerProp === 'string' ? <Component>{headerProp}</Component> : headerProp;

const FullPageTemplate = ({
  children,
  header,
  subheader,
  actionBar,
  className,
  scrollableTable,
  actionBarTitleAlign,
}) => {
  const defaultClassName = `${prefix}--full-page-template`;
  const isSubheaderVisible = !!subheader;
  const subheaderClassNames = classNames(`${defaultClassName}__header-right`, {
    [`${defaultClassName}__header-right__marginless`]: !isSubheaderVisible,
    [`${defaultClassName}__header-right__title-aligned`]: actionBarTitleAlign,
  });
  const [tableRef, setTableRef] = useState(null);
  const [shouldShowTable, setShowTable] = useState(false);

  const onRef = useCallback(value => {
    setTableRef(value);
  }, []);
  const contextValue = useMemo(
    () => ({
      tableWrapperRef: tableRef,
      registerTable: () => setShowTable(true),
      unregisterTable: () => setShowTable(false),
    }),
    [tableRef]
  );

  return (
    <FullPageTemplateContext.Provider value={contextValue}>
      <main className={classNames(defaultClassName, className)}>
        <div className={`${defaultClassName}__heading`}>
          <div className={`${defaultClassName}__header-left`}>
            {header && (
              <div className={`${defaultClassName}__header-wrapper`}>{wrapElement(header, H2)}</div>
            )}
            {subheader && (
              <div className={`${defaultClassName}__subheader-wrapper`}>
                <div className={`${defaultClassName}__subheader-left`}>
                  <p>{isFunction(subheader) ? subheader() : subheader}</p>
                </div>
              </div>
            )}
          </div>
          {actionBar && <div className={subheaderClassNames}>{actionBar}</div>}
        </div>
        <div className={`${defaultClassName}__content`}>
          {children}
          {(scrollableTable || shouldShowTable) && (
            <div
              ref={onRef}
              className={classNames(`${defaultClassName}__scrollable-table`, className)}
            >
              {scrollableTable}
            </div>
          )}
        </div>
      </main>
    </FullPageTemplateContext.Provider>
  );
};

FullPageTemplate.propTypes = {
  actionBar: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  actionBarTitleAlign: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  scrollableTable: PropTypes.node,
  subheader: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

FullPageTemplate.defaultProps = {
  actionBar: null,
  actionBarTitleAlign: false,
  className: '',
  header: '',
  scrollableTable: null,
  subheader: null,
};

export { FullPageTemplate };
