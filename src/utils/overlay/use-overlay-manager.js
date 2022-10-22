/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { useCallback, useRef } from 'react';

import { Overlays } from './Overlays';

export function useOverlayManager(config) {
  const manager = useRef(Overlays.register(config));

  const updateItemsPosition = useCallback(e => {
    manager.current.updateItemsPosition(e);
  }, []);

  return [manager.current, updateItemsPosition];
}
