/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import classNames from 'classnames';

import ConfigurableAction from '../../configurable-action';
import ConfigurableComponent from '../../utils/configurable-component';
import { widgetClassBuilder } from '../utils';

import { TEXT_TYPES } from '../../text/constants';

import { WidgetHeaderDefaultProps, WidgetHeaderPropTypes } from './prop-types';
import WidgetTitle from './WidgetTitle';

const headerClassName = widgetClassBuilder('--header');
const contentClassName = widgetClassBuilder('--header-content');
const titleClassName = widgetClassBuilder('--header-title');
const fancyTitleClassName = widgetClassBuilder('--header-title-fancy');
const valueClassName = widgetClassBuilder('--header-value');
const metadataClassName = widgetClassBuilder('--header-metadata');
const actionsClassName = widgetClassBuilder('--header-actions');

export const widgetHeaderHasContent = ({
  actions,
  overflowMenu,
  preActions,
  renderOverflowMenu,
  renderPreActions,
  title,
  value,
}) =>
  Boolean(
    actions ||
      preActions ||
      renderPreActions ||
      overflowMenu ||
      renderOverflowMenu ||
      title ||
      value
  );

const WidgetHeader = props => {
  const {
    actions,
    children,
    overflowMenu,
    preActions,
    renderOverflowMenu,
    renderPreActions,
    slim,
    title,
    fancyTitle,
    value,
  } = props;

  const hasContent = widgetHeaderHasContent(props);

  if (!hasContent && !children) {
    return null;
  }

  return (
    <div className={headerClassName}>
      {hasContent && (
        <div
          className={classNames(contentClassName, {
            [`${contentClassName}__slim`]: slim,
          })}
        >
          <WidgetTitle
            key={"title"}
            className={(fancyTitle && fancyTitleClassName)||titleClassName}
            title={title}
            type={slim ? TEXT_TYPES.BOLD_01 : TEXT_TYPES.BOLD_03}
          />
          <ConfigurableComponent component={preActions} render={renderPreActions} />
          <div key="actions"
               className={actionsClassName}>
            {actions &&
              // explicitly not destructing here, we want full action to be passed down
              actions.map(action => (
                <ConfigurableAction key={action.key} actionKey={action.key} {...action} size="small" />
              ))}
          </div>
          <ConfigurableComponent key="overflowmenu" component={overflowMenu} render={renderOverflowMenu} />
        </div>
      )}
      <WidgetTitle key="subTitle" className={valueClassName} title={value} type={TEXT_TYPES.BOLD_04} />
      {!!children && <div className={metadataClassName}>{children}</div>}
    </div>
  );
};

WidgetHeader.propTypes = WidgetHeaderPropTypes;
WidgetHeader.defaultProps = WidgetHeaderDefaultProps;

export default WidgetHeader;
