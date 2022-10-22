/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

export const ConfigurableActionPropTypes = {
  // eslint-disable-next-line react/require-default-props
  actionKey: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  buttonRef: PropTypes.node,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  // eslint-disable-next-line react/require-default-props
  iconDescription: PropTypes.string,
  notificationFlag: PropTypes.bool,
  onAction: PropTypes.func,
  onClick: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  // eslint-disable-next-line react/require-default-props
  size: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  text: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
};

export const ConfigurableActionEmbeddedPropTypes = {
  key: PropTypes.string.isRequired,
  ...omit(ConfigurableActionPropTypes, ['actionKey']),
};

export const ConfigurableActionDefaultProps = {
  notificationFlag: false,
  onAction: noop,
  onClick: noop,
};
