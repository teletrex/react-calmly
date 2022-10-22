/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';

import { ContentSvg } from '../../svg-components'; //TODO: PlaceholderSvg
import { componentPropType } from '../../utils/configurable-component';
// import { ConfigurableActionEmbeddedPropTypes } from '../../configurable-action';
import  {TEXT_TYPES}  from '../../text/constants';  // TODO:  carbon react has Text, does it have the constants somehwere?

import {
  Loading,
} from '@carbon/react';

import { ConfigurableActionEmbeddedPropTypes} from "../../configurable-action";

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

export const WidgetEmptyStatePropTypes = {
  buttonText: PropTypes.string,
  /**
   * The image to render, as node, configuration or a component
   * Send null for no default image.
   */
  image: componentPropType,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
  /**
   * Render function for the image, if used, has preference over the 'image' prop
   */
  // eslint-disable-next-line react/require-default-props
  renderImage: PropTypes.func,
  text: PropTypes.string,
};

export const WidgetEmptyStateDefaultProps = {
  buttonText: '',
  text: '',
  image: ContentSvg,
};

export const WidgetHeaderPropTypes = {
  title: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  actions: PropTypes.arrayOf(PropTypes.shape(ConfigurableActionEmbeddedPropTypes)),
  /**
   * Render overflow menu by giving a node or a configuration object.
   */
  // eslint-disable-next-line react/require-default-props
  overflowMenu: componentPropType,
  /**
   * Mount point for renderin custom elements before the actions.
   * Render by using node or configuration object
   */
  // eslint-disable-next-line react/require-default-props
  preActions: componentPropType,
  /**
   * Render function for overflow menu. Use this prop instead of 'overflowMenu'
   * if you want to render it using a render function
   */
  // eslint-disable-next-line react/require-default-props
  renderOverflowMenu: PropTypes.func,
  /**
   * Use this instead of 'preActions' if you want to render elements before
   * actions by using a render function
   */
  // eslint-disable-next-line react/require-default-props
  renderPreActions: PropTypes.func,
  /**
   * Use the slim variant, will cause the title to be much smaller
   */
  slim: PropTypes.bool,
  /**
   * A value to be emphasized, will show below title.
   */
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  /**
   * Children will be rendered below title and value.
   * In the context of the widget, this is the mount point for metadata
   */
  children: childrenPropType,
};

export const WidgetHeaderDefaultProps = {
  title: '',
  children: null,
  slim: false,
};

export const WidgetTitlePropTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf([TEXT_TYPES.BOLD_01, TEXT_TYPES.BOLD_03, TEXT_TYPES.BOLD_04]),
};

export const WidgetTitleDefaultProps = {
  title: '',
  type: TEXT_TYPES.BOLD_03,
};

export const WidgetContentPropTypes = {
  className: PropTypes.string,
  children: childrenPropType,
  /**
   * Content by default will have flex-grow: 1
   * this props removes the grow and adds flex-shrink: 1
   */
  shrink: PropTypes.bool,
  /**
   * Applies overflow hidden to the content, preventing scroll.
   * Very useful for content that should resize with widget, like charts.
   */
  overflowHidden: PropTypes.bool,
};

export const WidgetContentDefaultProps = {
  className: '',
  children: null,
  overflowHidden: false,
  shrink: false,
};

export const WidgetLoadingIndicatorPropTypes = {
  ...Loading.propTypes,
  /**
   * shows loading state
   */
  loading: PropTypes.bool,
};

export const WidgetLoadingIndicatorDefaultProps = {
  ...Loading.defaultProps,
  loading: false,
  active: true,
  alignCenter: true,
  withOverlay: false,
};

export const WidgetChartWrapperPropTypes = {
  className: '',
  children: null,
};

export const WidgetChartWrapperDefaultProps = {
  className: '',
  children: null,
};
