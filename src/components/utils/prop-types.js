/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import { Component } from 'react';
import warning from 'warning';

import { POLICIES, ORIENTATION } from '../constants';

export const ReactComponentPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.instanceOf(Component),
  PropTypes.shape({ render: PropTypes.func }),
  PropTypes.string,
]);

export const AllNoneAutoPolicyPropType = PropTypes.oneOf([
  POLICIES.ALL,
  POLICIES.NONE,
  POLICIES.AUTO,
]);

export const OrientationPropType = PropTypes.oneOf(Object.values(ORIENTATION));

OrientationPropType.isOrientationValid = orientation => {
  return Object.values(ORIENTATION).includes(orientation);
};

export const ComponentConfigPropType = PropTypes.shape({
  component: ReactComponentPropType,
  componentProps: PropTypes.object,
  name: PropTypes.string,
  render: PropTypes.func,
});

export const onePropBetweenProps = requiredProps => (props, _propName, componentName) => {
  if (requiredProps.filter(prop => !props[prop]).length === requiredProps.length) {
    return new Error(
      `One of props ${requiredProps.slice(', ')} was not specified in '${componentName}'.`
    );
  }
  return true;
};

export const WithLeftTopOffsetPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
]);

export const RefPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.any }),
]);

const didWarnAboutDeprecation = {};

export const deprecate = (propType, message) => {
  function checker(props, propName, componentName, ...rest) {
    if (props[propName] === undefined) {
      return null;
    }
    if (
      !didWarnAboutDeprecation[componentName] ||
      !didWarnAboutDeprecation[componentName][propName]
    ) {
      didWarnAboutDeprecation[componentName] = {
        ...didWarnAboutDeprecation[componentName],
        [propName]: true,
      };

      warning(
        false,
        message ||
          `The prop \`${propName}\` has been deprecated for the ` +
            `${componentName} component. It will be removed in the next major ` +
            `release`
      );
    }

    return propType(props, propName, componentName, ...rest);
  }

  return checker;
};
