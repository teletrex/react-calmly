/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import { useCallback, useRef } from 'react';

import { useTranslation } from '../../translation';

import { placeholderClassName } from './constants';

const useWidgetGridTranslatedPlaceholder = ({ onDrag, onDragStart }) => {
  const { t } = useTranslation();
  // using ref instead of state to avoid rerenders during drag
  const dragStarted = useRef(false);

  const handleDragStart = useCallback(
    (...args) => {
      dragStarted.current = true;
      onDragStart(...args);
    },
    [onDragStart]
  );

  const handleDrag = useCallback(
    (...args) => {
      const [, , , , , element] = args;

      // the placeholder does not exist during the drag start,
      // so we need to use the first drag event.
      if (dragStarted.current) {
        const placeholder = element.parentNode.querySelector(placeholderClassName);

        if (placeholder) {
          const textNode = document.createTextNode(t('Drop here'));
          placeholder.appendChild(textNode);
          // prevent future attempts to creating this text.
          dragStarted.current = false;
        }
      }
      onDrag(...args);
    },
    [onDrag, t]
  );

  return {
    onDrag: handleDrag,
    onDragStart: handleDragStart,
  };
};

export default useWidgetGridTranslatedPlaceholder;
