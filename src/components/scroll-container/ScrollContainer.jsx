/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createCssClassBuilder } from '../../utils';
import { DomElement, isOverflowPreventingScroll } from '../../utils/DomUtils';
import { useResizeObserver } from '../../utils/hooks';

export const SCROLL_TYPES = Object.freeze({
  auto: 'auto',
  clip: 'clip',
  hidden: 'hidden',
  inherit: 'inherit',
  scroll: 'scroll',
  visible: 'visible',
});

const classBuilder = createCssClassBuilder('scroll-container');

export const ScrollContainer = ({
  horizontalScrollType,
  verticalScrollType,
  className,
  children,
}) => {
  const scrollableRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(undefined);
  const { setElement, contentRect } = useResizeObserver({
    observableProperties: ['width', 'height'],
  });

  const needSensor =
    !isOverflowPreventingScroll(horizontalScrollType) ||
    !isOverflowPreventingScroll(verticalScrollType);

  useEffect(() => {
    const scrollInfo = DomElement(scrollableRef.current).getScrollInfo();
    setTabIndex(scrollInfo.hasScroll ? 0 : undefined);
    // contentRect is a dep because we want to
    // recalculate every time the inner div changes size.
  }, [contentRect, horizontalScrollType, verticalScrollType]);

  return (
    <div
      ref={scrollableRef}
      className={classNames(
        className,
        classBuilder(),
        classBuilder(`__horizontal-${horizontalScrollType}`),
        classBuilder(`__vertical-${verticalScrollType}`)
      )}
      data-testid="scroll-container"
      tabIndex={tabIndex}
    >
      {needSensor ? (
        <div ref={setElement} className={classNames(classBuilder('--sensor'))}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

ScrollContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  horizontalScrollType: PropTypes.oneOf(Object.values(SCROLL_TYPES)),
  verticalScrollType: PropTypes.oneOf(Object.values(SCROLL_TYPES)),
};

ScrollContainer.defaultProps = {
  children: null,
  className: '',
  horizontalScrollType: SCROLL_TYPES.auto,
  verticalScrollType: SCROLL_TYPES.auto,
};
