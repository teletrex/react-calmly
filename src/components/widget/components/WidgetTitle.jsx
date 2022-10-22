/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import Text from '../../text';
import { widgetClassBuilder } from '../utils';
import {DomElement} from '../../utils/DomUtils';

import { WidgetTitleDefaultProps, WidgetTitlePropTypes } from './prop-types';

const titleClassName = widgetClassBuilder('--truncated');

const WidgetTitle = ({ title, className, type }) => {
  const domElement = useRef(DomElement());
  const [showTitleAttr, setShowTitleAttr] = useState(false);

  const ref = useCallback(element => {
    if (element) {
      domElement.current = DomElement(element);
    }
  }, []);

  const handleMouseOver = useCallback(() => {
    setShowTitleAttr(domElement.current.isTruncatedHorizontal());
  }, []);

  if (!title) {
    return null;
  }
  const props = showTitleAttr ? { title } : {};
  return (
    // Heading text is not focusable
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <Text
      ref={ref}
      className={classNames(titleClassName, className)}
      onMouseOver={handleMouseOver}
      textTruncate
      type={type}
      {...props}
    >
      {title}
    </Text>
  );
};

WidgetTitle.propTypes = WidgetTitlePropTypes;
WidgetTitle.defaultProps = WidgetTitleDefaultProps;

export default WidgetTitle;
