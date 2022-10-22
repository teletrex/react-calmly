/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import { useState, useCallback, useMemo, useRef } from 'react';
import noop from 'lodash/noop';
import isObject from 'lodash/isObject';

import { useResizeObserver } from '../../utils/hooks';

import { minWidth } from './constants';
import {
  getEnforcedLayouts,
  enforceResizeRules,
  getEnforcedDroppingItem,
  getEnforcedItem,
} from './layoutRules';
import { getBreakpointFromWidth, getGetNewPosition } from './utils';

const hasDroppingElement = (layout, droppingElementId) => {
  return Boolean(layout.find(({ i }) => i === droppingElementId));
};

export const createDefaultItemDefinition = ({ x, y }) => ({
  x,
  y,
  w: minWidth,
  h: 1,
  minW: minWidth,
});

const useWidgetGrid = ({
  droppingItem,
  fromDropToLayoutItem = noop,
  layouts,
  onDrop = noop,
  onLayoutChange = noop,
  onResize = noop,
}) => {
  //const enforcedLayouts = useMemo(() => getEnforcedLayouts(layouts), [layouts]);
  const enforcedLayouts = layouts;
  const enforcedDroppingItem = useMemo(() => getEnforcedDroppingItem(droppingItem), [droppingItem]);
  const prevEnforcedLayoutsRef = useRef(enforcedLayouts);
  const prevEnforcedLayouts = prevEnforcedLayoutsRef.current;
  const [layoutsState, setLayoutsState] = useState(enforcedLayouts);

  const {
    setElement,
    contentRect: { width },
  } = useResizeObserver({ observableProperties: ['width'] });
  const breakpoint = useMemo(() => getBreakpointFromWidth(width), [width]);

  if (prevEnforcedLayouts !== enforcedLayouts) {
    prevEnforcedLayoutsRef.current = enforcedLayouts;
//    setLayoutsState(enforcedLayouts);  This makes the component unreactive, like a complete zombie.
  }

  const getItemProps = useCallback(
    itemId => {
      const layout = layoutsState[breakpoint];
      const item = layout.find(item => item.i === itemId);
      if (item) {
        return {};
      }
      const position = getGetNewPosition(layout);
      return { 'data-grid': { ...createDefaultItemDefinition(position)} };
    },
    [breakpoint, layoutsState]
  );

  const handleResize = useCallback(
    (...args) => {
      const [, oldLayoutItem, layoutItem, placeholder] = args;

      // Enforcing during resize happens trough mutation in
      // compliance with react-grid-layout documentation
      enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

      onResize(...args);
    },
    [onResize]
  );

  const handleLayoutChange = useCallback(
    (layout, allLayouts) => {
      if (!hasDroppingElement(layout, enforcedDroppingItem.i)) {
        setLayoutsState(allLayouts);
      }
      onLayoutChange(layout, allLayouts);
    },
    [onLayoutChange, enforcedDroppingItem]
  );

  const addDroppedElement = useCallback(
    (newItem, { x, y, w, h }, breakpoint, layout) => {
      if (isObject(newItem)) {
        const enforcedItem = getEnforcedItem({ ...newItem, x, y, w, h });
        const newLayout = layout.map(item =>
          item.id === enforcedDroppingItem.id ? enforcedItem : item
        );
        setLayoutsState(layouts => ({
          ...layouts,
          [breakpoint]: newLayout,
        }));
      }
    },
    [enforcedDroppingItem]
  );

  const handleDrop = useCallback(
    (layout, layoutItem, event) => {
      onDrop(layout, layoutItem, event, layoutsState, breakpoint);
      const definition = fromDropToLayoutItem(layout, layoutItem, event, layoutsState, breakpoint);
      addDroppedElement(definition, layoutItem, breakpoint, layout);
    },
    [breakpoint, layoutsState, fromDropToLayoutItem, addDroppedElement, onDrop]
  );

  return {
    droppingItem: enforcedDroppingItem,
    getItemProps,
    layouts: layoutsState,
    onDrop: handleDrop,
    onLayoutChange: handleLayoutChange,
    onResize: handleResize,
    setWrapperElement: setElement,
    width,
  };
};

export default useWidgetGrid;
