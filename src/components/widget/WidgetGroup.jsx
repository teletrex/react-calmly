/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


// TODO:  Needs love

import React from 'react';
import { Add } from '@carbon/icons-react';

import Button from '../button';
import { useTranslation } from '../translation';
import ConfigurableComponent from '../utils/configurable-component';

import { widgetClassBuilder } from './utils';
import { WidgetGroupPropTypes, WidgetGroupDefaultProps } from './prop-types';

const groupClassName = widgetClassBuilder('--group');
const titleClassName = widgetClassBuilder('--group-title');
const buttonWrapperClassName = widgetClassBuilder('--group-button-wrapper');

const WidgetGroup = ({ title, buttonText, onClick, children, renderButton }) => {
  const { t } = useTranslation();
  const hasButton = onClick || renderButton;
  const buttonTextOrDefault = buttonText || t('Add widget');
  return (
    <div className={groupClassName}>
      <h4 className={titleClassName}>{title}</h4>
      {children}
      {hasButton && (
        <div className={buttonWrapperClassName}>
          <ConfigurableComponent
            component={Button}
            kind="ghost"
            onClick={onClick}
            preventDefaultOnMouseDown
            render={renderButton}
            renderIcon={<Add size={20} />}
            size="small"
          >
            {buttonTextOrDefault}
          </ConfigurableComponent>
        </div>
      )}
    </div>
  );
};

WidgetGroup.propTypes = WidgetGroupPropTypes;
WidgetGroup.defaultProps = WidgetGroupDefaultProps;

export default WidgetGroup;
