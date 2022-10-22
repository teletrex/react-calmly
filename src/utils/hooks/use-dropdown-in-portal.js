/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import usePortal from 'react-useportal';
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import isObjectLike from 'lodash/isObjectLike';
import get from 'lodash/get';

import { DomElement, getEmptyBounds } from '../DomUtils';
import { WithLeftTopOffsetPropType } from '../prop-types';

export const getDefaultInPortalPosition = (componentNode, portalNode) => {
  const scroll = { x: window.scrollX, y: window.scrollY };
  const componentBounds = DomElement(componentNode).getBounds();

  return portalNode === document.body
    ? {
        position: 'absolute',
        top: componentBounds.height + componentBounds.top + scroll.y,
        left: componentBounds.left + scroll.x,
        width: componentBounds.width,
      }
    : {
        position: 'absolute',
        top: componentBounds.height,
        left: 0,
        width: componentBounds.width,
      };
};

export const WithPortalPropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.shape({
    nodeToBindRef: PropTypes.instanceOf(Element),
    withOffset: WithLeftTopOffsetPropType,
  }),
]);

const checkIsClickOutside = (e, component, portal) => {
  return !DomElement(e.target).isChildOf(component) && !DomElement(e.target).isChildOf(portal);
};

/**
 * @param componentNodeRef {Object} component with dropdown root reference
 * @param withPortal {boolean|Object} true is enable portal in document.body, WithPortalPropType to customize portal position/behavior
 * @param options {Object} options to customize dropdown behavior
 */
export function useDropdownInPortal(
  componentNodeRef,
  withPortal = false,
  options = { closeIfClickOutside: true }
) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownStatus = useRef({ visible: false });

  const portalBindNode = useMemo(() => {
    return get(withPortal, 'nodeToBindRef', document.body);
  }, [withPortal]);

  const closeIfClickOutside = useMemo(() => {
    return get(options, 'closeIfClickOutside', true);
  }, [options]);

  const { Portal, ref: portalRef } = usePortal({
    bindTo: portalBindNode,
  });

  const [dropDownInPortalOffset, setDropDownInPortalOffset] = useState(getEmptyBounds());

  const updatePortalPosition = useCallback(() => {
    if (withPortal && componentNodeRef && componentNodeRef.current) {
      const rootElement = componentNodeRef.current;
      const { offset: withOffset } = isObjectLike(withPortal) ? withPortal : {};

      const position = getDefaultInPortalPosition(componentNodeRef.current, portalBindNode);

      if (isFunction(withOffset) || isObjectLike(withOffset)) {
        const customOffset = isFunction(withOffset)
          ? withOffset({ element: rootElement })
          : withOffset;
        position.top += get(customOffset, 'top', 0);
        position.left += get(customOffset, 'left', 0);
        position.position = customOffset.position ?? position.position;
      }
      setDropDownInPortalOffset(Object.assign(getEmptyBounds(), position));
    }
  }, [withPortal, componentNodeRef, portalBindNode]);

  const updatePosition = useCallback(() => {
    updatePortalPosition();
    window.requestAnimationFrame(updatePortalPosition);
  }, [updatePortalPosition]);

  const showDropDown = useCallback(
    show => {
      if (show !== dropDownStatus.current.visible) {
        dropDownStatus.current.visible = show;
        setIsDropDownOpen(show);
      }

      if (show === true) {
        updatePosition();
      }
    },
    [updatePosition]
  );

  const handleIfClickOutside = useCallback(
    e => {
      const isClickedOutside =
        closeIfClickOutside && checkIsClickOutside(e, componentNodeRef.current, portalRef.current);

      if (isClickedOutside) {
        showDropDown(false);
      } else {
        updatePosition();
      }
    },
    [closeIfClickOutside, componentNodeRef, portalRef, showDropDown, updatePosition]
  );

  useEffect(() => {
    const debouncedUpdatePos = debounce(updatePortalPosition, 50);

    if (isDropDownOpen) {
      window.addEventListener('resize', debouncedUpdatePos);
      document.addEventListener('scroll', updatePortalPosition, true);
      document.addEventListener('mousedown', handleIfClickOutside);
    }
    return () => {
      window.removeEventListener('resize', debouncedUpdatePos);
      document.removeEventListener('scroll', updatePortalPosition);
      document.removeEventListener('mousedown', handleIfClickOutside);
    };
  }, [isDropDownOpen, handleIfClickOutside, updatePortalPosition]);

  return {
    Portal,
    portalRef,
    showDropDown,
    isDropDownOpen,
    dropDownInPortalOffset,
    updatePosition,
  };
}
