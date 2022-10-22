/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import settings from '../../../settings';
import { Button as CarbonButton } from '@carbon/react';
import noop from 'lodash/noop';

import {useFormat}  from '../../format';
import ActionToolbar from '../../action-toolbar';
import GridActionList from '../../grid-action-list';


const formatter = useFormat;
const { prefix } = settings;

const ToolbarBatchActions = (
  {
    t,
    className,
    children,
    size,
    shouldShowBatchActions,
    totalSelected,
    onCancel,
    ...rest
  }) => {

  const formatNumber = formatter().formatNumber;

  const batchActionsClasses = classNames(className, `${prefix}--batch-actions`, {
    [`${prefix}--batch-actions--active`]: shouldShowBatchActions,
  });
  return (
    <div {...rest} className={batchActionsClasses}>
      <GridActionList>
        {children}
        <ActionToolbar
          actionKey="cancel"
          kind="primary"
          onClick={onCancel}
          size={size}
          tabIndex={shouldShowBatchActions ? 0 : -1}
        >
          {t('Cancel')}
        </ActionToolbar>
      </GridActionList>
      <div className={`${prefix}--batch-summary`}>
        <p className={`${prefix}--batch-summary__para`}>
          <span>
            { (totalSelected !== 1) && t('toolbar.{{totalSelected}}.items.selected',`${totalSelected} items selected`, {
              totalSelected: formatNumber(totalSelected),
              count: totalSelected,
            }) ||
            t('toolbar.{{totalSelected}}.item.selected', `${totalSelected} item selected`, {
              totalSelected: formatNumber(totalSelected),
              count: totalSelected,
            })
            }
          </span>
        </p>
      </div>
    </div>
  );
};

ToolbarBatchActions.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this component
   */
  onCancel: PropTypes.func,

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed
   */
  // eslint-disable-next-line react/require-default-props
  shouldShowBatchActions: PropTypes.bool,

  /**
   * String size of the cancel button
   *
   */
  // eslint-disable-next-line react/require-default-props
  size: CarbonButton.propTypes.size,
  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message
   */
  // eslint-disable-next-line react/require-default-props
  totalSelected: PropTypes.number,
};

ToolbarBatchActions.defaultProps = {
  onCancel: noop,
};

export default ToolbarBatchActions;


