/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { useRef, useCallback } from 'react';

/**
 * react-grid-layout uses mouse events for drag and drop,
 * in special, mousedown which will make the dragging start.
 *
 * to avoid cases where you click a button (or other interactive) and the dragging starts,
 * we have to stop propagation of the event coming from those.
 */
const interactiveElementsSelector =
  'input, select, button, textarea, a, video, option, [role="tab"], [role="button"], [role="menu"]';

export const usePreventMouseDownPropagation = ({ onMouseDown: onMouseDownProp }) => {
  const elementRef = useRef(null);

  const onMouseDown = useCallback(
    event => {
      onMouseDownProp(event);
      const interactiveParent = event.target.closest(interactiveElementsSelector);

      if (
        (interactiveParent && elementRef.current.contains(interactiveParent)) ||
        !elementRef.current.contains(event.target)
      ) {
        event.stopPropagation();
      }
    },
    [onMouseDownProp]
  );

  return {
    elementRef,
    onMouseDown,
  };
};
