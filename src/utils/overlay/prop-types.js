/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import PropTypes from 'prop-types';

import OverlayManager from './OverlayManager';

export const OverlayManagerConfigPropType = PropTypes.shape({
  behavior: PropTypes.shape({
    updatePositions: PropTypes.shape({
      onWindowResize: PropTypes.bool,
      onWindowScroll: PropTypes.bool,
    }),
  }),
  classFactory: PropTypes.instanceOf(OverlayManager),
  id: PropTypes.string.isRequired,
  portal: PropTypes.shape({
    classNames: PropTypes.arrayOf(PropTypes.string), // NOTE: no sense to use classNames for the same portal.id in different configs :)
    id: PropTypes.string.isRequired,
  }).isRequired,
});

export const OverlayItemsGrouping = PropTypes.shape({
  behavior: PropTypes.shape({
    adjustVerticalDirection: PropTypes.oneOf(['none', 'auto']),
    autoCloseOutsideOfViewport: PropTypes.bool,
    clickOutside: PropTypes.func,
    hovering: PropTypes.bool,
    positionAutoUpdate: PropTypes.bool,
  }),
  groupId: PropTypes.string.isRequired,
  viewportName: PropTypes.string,
});
