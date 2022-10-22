/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

///  Used by FullPageTemplate....


import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  TableToolbar,
  TableToolbarAction
//  ToolbarItem,
//  ToolbarTitle,
//  ToolbarOption,
//  ToolbarDivider,
} from '@carbon/react';
import  settings  from '../../settings';

import { useTranslation } from '../../translation';

const { prefix } = settings;

/** Action Toolbar */
const ActionToolbar = props => {
  const { children, layout, ariaLabel } = props;
  const { t } = useTranslation();

  const actionToolbarClasses = classNames({
    'action-toolbar-horizontal': layout === 'horizontal',
    'action-toolbar-vertical': layout === 'vertical',
    'action-toolbar-single': layout === 'single',
  });

  return (
    <section>
      <TableToolbar
        aria-label={ariaLabel || t('toolbar')}
        className={classNames(`${actionToolbarClasses} ${prefix}--action-toolbar`)}
        role="toolbar"
      >
        {children}
      </TableToolbar>
    </section>
  );
};

ActionToolbar.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** Layout to choose */
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'single']),
};

ActionToolbar.defaultProps = {
  ariaLabel: '',
  layout: 'horizontal',
};

export default ActionToolbar;

/** Action Toolbar Item */
export const ActionToolbarItem = ({ children, className, placeHolderText, type, disabled }) => {
  const actionToolbarItemClasses = classNames(className, `action-toolbar-item-wrapper`, {
    'action-toolbar-item-wrapper--disabled': disabled,
  });

  const onMouseDown = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <TableToolbarAction placeHolderText={placeHolderText} type={type}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={actionToolbarItemClasses} onMouseDown={onMouseDown}>
        {children}
      </div>
    </TableToolbarAction>
  );
};

ActionToolbarItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  /** Specify the placeholder text for the ToolbarSearch component. Useful if `type` is set to 'search' */
  disabled: PropTypes.bool,
  /** Specify the type of the ToolbarItem. The `search` type will render a `ToolbarSearch` component */
  placeHolderText: PropTypes.string,
  type: PropTypes.string,
};

ActionToolbarItem.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  placeHolderText: undefined,
  type: undefined,
};

/** Action Toolbar Title */
export const ActionToolbarTitle = ({ title }) => <div title={title} />;

ActionToolbarTitle.propTypes = {
  /** Specify the title of the Toolbar */
  title: PropTypes.string,
};

ActionToolbarTitle.defaultProps = {
  title: undefined,
};

/** Action Toolbar Option */
export const ActionToolbarOption = ({ children }) => <TableToolbarOption>{children}</TableToolbarOption>;

ActionToolbarOption.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ActionToolbarOption.defaultProps = {
  children: undefined,
};

/** Action Toolbar Divider */
export const ActionToolbarDivider = () => <ToolbarDivider />;
