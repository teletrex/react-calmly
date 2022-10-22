/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';

import Tabs from '@carbon/react';  // TODO: Tabs

import { widgetClassBuilder } from './utils';
import { WidgetTabsPropTypes, WidgetTabsDefaultProps } from './prop-types';
import { usePreventMouseDownPropagation } from './usePreventMouseDownPropagation';

const tabsClassName = widgetClassBuilder('--tabs');

const WidgetTabs = ({ onMouseDown: onMouseDownProp, children }) => {
  const { elementRef, onMouseDown } = usePreventMouseDownPropagation({
    onMouseDown: onMouseDownProp,
  });
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={elementRef} className={tabsClassName} onMouseDown={onMouseDown}>
      <Tabs size="small" type="container">
        {children}
      </Tabs>
    </div>
  );
};

WidgetTabs.propTypes = WidgetTabsPropTypes;
WidgetTabs.defaultProps = WidgetTabsDefaultProps;

export default WidgetTabs;
