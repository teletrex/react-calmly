/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import IsNil from 'lodash/isNil';

import { ComponentConfigPropType, ReactComponentPropType } from '../prop-types';

export const ConfigurableComponent = ({
  render: renderFunction,
  component: Component,
  ...props
}) => {
  if (!isUndefined(renderFunction) && isFunction(renderFunction)) {
    return renderFunction({ ...props });
  }

  if (!isUndefined(Component)) {
    if (React.isValidElement(Component) || isString(Component)) {
      return Component;
    }

    // check/render if component is ComponentConfigPropType
    if (isPlainObject(Component) && IsNil(Component.$$typeof)) {
      const { componentProps = {}, render, component } = Component;
      return (
        <ConfigurableComponent
          component={component}
          render={render}
          {...props}
          {...componentProps}
        />
      );
    }

    return <Component {...props} />;
  }
  return null;
};

export const componentPropType = PropTypes.oneOfType([
  ReactComponentPropType,
  ComponentConfigPropType,
]);

ConfigurableComponent.propTypes = {
  component: componentPropType,
  render: PropTypes.func,
};

ConfigurableComponent.defaultProps = {
  component: undefined,
  render: undefined,
};
