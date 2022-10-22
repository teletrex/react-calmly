/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import classNames from 'classnames';

import { widgetClassBuilder } from '../utils';

import { WidgetContentPropTypes, WidgetContentDefaultProps } from './prop-types';

const WidgetContent = ({ className, children, shrink, overflowHidden, ...props }) => {
  const composedClassNames = classNames(className, widgetClassBuilder('--content'), {
    [widgetClassBuilder('--content__shrink')]: shrink,
    [widgetClassBuilder('--content__overflow-hidden')]: overflowHidden,
  });

  return (
    <div className={composedClassNames} {...props}>
      {children}
    </div>
  );
};

WidgetContent.propTypes = WidgetContentPropTypes;
WidgetContent.defaultProps = WidgetContentDefaultProps;

export default WidgetContent;
