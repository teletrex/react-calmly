/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

const OVERFLOW_PREVENTING_SCROLL = Object.freeze(['hidden', 'clip', 'visible']);

const emptyRect = () => ({ x: 0, y: 0, width: 0, height: 0 });
const emptyBounds = () => ({
  ...emptyRect(),
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});
const isDefined = value => {
  return !isNil(value) && value !== '';
};

export const isOverflowPreventingScroll = overflow =>
  Boolean(OVERFLOW_PREVENTING_SCROLL.find(type => type === overflow));

/**
 *
 * @param rect {DOMRect}
 * @return {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */
export const toBounds = rect => {
  return {
    top: rect?.top,
    right: rect?.right,
    bottom: rect?.bottom,
    left: rect?.left,
    width: rect?.width,
    height: rect?.height,
    x: rect?.x,
    y: rect?.y,
  };
};

/**
 *
 * @returns {{top: number, left: number, bottom: number, x: number, width: number, y: number, right: number, height: number}}
 */
export const getElementBounds = element => {
  if (element) {
    return toBounds(element.getBoundingClientRect());
  }
  return emptyBounds();
};

/**
 *
 * @returns {{x: number, width: number, y: number, height: number}}
 */
export const getEmptyRect = () => {
  return emptyRect();
};

/**
 *
 * @returns {{top: number, left: number, bottom: number, x: number, width: number, y: number, right: number, height: number}}
 */
export const getEmptyBounds = () => {
  return emptyBounds();
};

/**
 *
 * @param bounds1
 * @param bounds2
 * @returns {{x: number, width: number, y: number, height: number}}
 */
export const getIntersection = (bounds1, bounds2) => {
  if (bounds1 && bounds2) {
    const x = Math.max(bounds1.left, bounds2.left);
    const num1 = Math.min(bounds1.left + bounds1.width, bounds2.left + bounds2.width);
    const y = Math.max(bounds1.top, bounds2.top);
    const num2 = Math.min(bounds1.top + bounds1.height, bounds2.top + bounds2.height);
    if (num1 >= x && num2 >= y) {
      return Object.assign(getEmptyRect(), { x, y, width: num1 - x, height: num2 - y });
    }
  }
  return getEmptyRect();
};

export const areIntersect = (bounds1, bounds2) => {
  if (
    bounds1 &&
    bounds2 &&
    bounds2.left < bounds1.left + bounds1.width &&
    bounds1.left < bounds2.left + bounds2.width &&
    bounds2.top < bounds1.top + bounds1.height
  )
    return bounds1.top < bounds2.top + bounds2.height;
  return false;
};

/**
 *
 * @param element {Element|HTMLElement|Document|ParentNode}
 */
export const DomElement = (element = undefined) => ({
  isChildOf(root) {
    return root && element ? root.contains(element) : false;
  },
  getBounds() {
    return getElementBounds(element);
  },
  focus() {
    if (isFunction(element?.focus)) {
      element.focus();
    }
    return this;
  },
  blur() {
    if (isFunction(element?.blur)) {
      element.blur();
    }
    return this;
  },
  removeAllChildren() {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.lastChild);
      }
    }
  },
  moveTo(
    direction = {
      x: undefined,
      y: undefined,
    }
  ) {
    if (element && direction) {
      const { x, y } = direction;

      const result = {};

      if (x === 'center' && y === 'center') {
        result.left = '50%';
        result.top = '50%';
        result.transform = 'translate(-50%, -50%)';
      } else if (x === 'center') {
        result.transform = 'translateX(-50%)';
        result.left = '50%';
      } else if (y === 'center') {
        result.transform = 'translateY(-50%)';
        result.top = '50%';
      } else if (isDefined(x) || isDefined(y)) {
        element.style.removeProperty('transform');
      }

      if (isDefined(x) && x !== 'center') {
        if (x === 'clear') {
          element.style.removeProperty('left');
        } else {
          result.left = isNumber(x) ? `${x}px` : `${x}`;
        }
      }
      if (isDefined(y) && y !== 'center') {
        if (y === 'clear') {
          element.style.removeProperty('top');
        } else {
          result.top = isNumber(y) ? `${y}px` : `${y}`;
        }
      }

      Object.assign(element.style, result);
    }
    return this;
  },
  resize(
    sizes = { width: undefined, maxWidth: undefined, height: undefined, maxHeight: undefined }
  ) {
    if (element && sizes) {
      const { width, maxWidth, height, maxHeight } = sizes;
      const result = {};

      if (isDefined(width)) {
        if (width === 'clear') {
          element.style.removeProperty('width');
        } else {
          result.width = isNumber(width) ? `${width}px` : `${width}`;
        }
      }

      if (isDefined(maxWidth)) {
        if (maxWidth === 'clear') {
          element.style.removeProperty('max-width');
        } else {
          result['max-width'] = isNumber(maxWidth) ? `${maxWidth}px` : `${maxWidth}`;
        }
      }

      if (isDefined(height)) {
        if (height === 'clear') {
          element.style.removeProperty('height');
        } else {
          result.height = isNumber(height) ? `${height}px` : `${height}`;
        }
      }

      if (isDefined(maxHeight)) {
        if (maxHeight === 'clear') {
          element.style.removeProperty('max-height');
        } else {
          result['max-height'] = isNumber(maxHeight) ? `${maxHeight}px` : `${maxHeight}`;
        }
      }

      Object.assign(element.style, result);
    }
    return this;
  },
  setStyle(styles) {
    if (element && styles) {
      const result = {};
      Object.entries(styles).forEach(([key, value]) => {
        if (value === 'clear') {
          element.style.removeProperty(key);
        } else {
          result[key] = value;
        }
      });
      Object.assign(element.style, result);
    }
    return this;
  },
  /**
   *
   * @param className {string}
   * @param toggle {boolean}
   */
  toggleClass(className, toggle) {
    if (element && className) {
      element.classList.toggle(className, toggle);
    }
    return this;
  },
  /**
   *
   * @param attributeName {string}
   * @returns {boolean}
   */
  hasAttribute(attributeName) {
    return element && attributeName ? element.hasAttribute(attributeName) : false;
  },
  /**
   *
   * @param name {string}
   * @param value {string}
   * @returns {Array}
   */
  queryAllWithAttribute(name, value = undefined) {
    return element && name
      ? [...element.querySelectorAll(value ? `[${name}='${value}']` : `[${name}]`)]
      : [];
  },
  /**
   *
   * @param name {string}
   * @returns {Element}
   */
  closestWithAttribute(name) {
    return element && name ? element.closest(`[${name}]`) : null;
  },
  /**
   *
   * @param otherElement
   * @returns {{x: number, width: number, y: number, height: number}}
   */
  getIntersectionWith(otherElement) {
    return getIntersection(getElementBounds(element), getElementBounds(otherElement));
  },
  /**
   *
   * @param viewport {Element}
   * @returns {boolean}
   */
  isInViewport(viewport) {
    if (element && viewport) {
      return areIntersect(getElementBounds(element), getElementBounds(viewport));
    }
    return false;
  },
  isTruncatedHorizontal() {
    if (element) {
      return element.scrollWidth > element.clientWidth;
    }
    return false;
  },
  isTruncatedVertical() {
    if (element) {
      return element.scrollHeight > element.clientHeight;
    }
    return false;
  },
  getScrollTop() {
    if (element) {
      return element.scrollTop;
    }
    return 0;
  },
  getScrollLeft() {
    if (element) {
      return element.scrollLeft;
    }
    return 0;
  },
  getComputedStyle(pseudoElt) {
    if (element) {
      return window.getComputedStyle(element, pseudoElt);
    }
    return null;
  },
  /**
   * Returns enough information to access the state and existence of scrollbars.
   * computed styles are used, but only if we find styles explicitly disabling scroll, like hidden, visible and clip
   * @returns {{
   * overflowX: string | undefined,
   * overflowY: string | undefined,
   * hasScroll: boolean,
   * hasHorizontalScroll: boolean,
   * hasVerticalScroll: boolean,
   * isTruncatedHorizontal: boolean,
   * isTruncatedVertical: boolean,
   * scrollTop: number,
   * scrollLeft: number
   * }}
   */
  getScrollInfo() {
    const isTruncatedHorizontal = this.isTruncatedHorizontal();
    const isTruncatedVertical = this.isTruncatedVertical();
    const scrollTop = this.getScrollTop();
    const scrollLeft = this.getScrollLeft();
    const styles = this.getComputedStyle();
    const overflowX = styles ? styles.getPropertyValue('overflow-x') : undefined;
    const overflowY = styles ? styles.getPropertyValue('overflow-y') : undefined;
    const overflowXHidden = isOverflowPreventingScroll(overflowX);
    const overflowYHidden = isOverflowPreventingScroll(overflowY);
    const overflowHidden = overflowXHidden && overflowYHidden;
    return {
      overflowX,
      overflowY,
      isTruncatedHorizontal,
      isTruncatedVertical,
      scrollTop,
      scrollLeft,
      hasScroll: (isTruncatedHorizontal || isTruncatedVertical) && !overflowHidden,
      hasHorizontalScroll: isTruncatedHorizontal && !overflowXHidden,
      hasVerticalScroll: isTruncatedVertical && !overflowYHidden,
    };
  },
});

/**
 * @param {Object} globalPosition
 * @param {Number} globalPosition.left
 * @param {Number} globalPosition.top
 * @param {Object} localPosition
 * @param {Number} localPosition.top
 * @param {Number} localPosition.left
 * @returns {{top: number, left: number}|{top: undefined, left: undefined}}
 */
DomElement.globalToLocal = (globalPosition, localPosition) => {
  if (globalPosition && localPosition) {
    return {
      left: globalPosition.left - localPosition.left,
      top: globalPosition.top - localPosition.top,
    };
  }
  return {
    left: undefined,
    top: undefined,
  };
};

export const isVisible = element => Boolean(element.offsetParent);

export { default as mergeRefs } from '@carbon/react/es/tools/mergeRefs';

/**
 *
 * @param callback {function}
 * @returns {{cancel: function}}
 */
export const invokeAfterRepaint = callback => {
  const result = {};
  result.rafIdBefore = window.requestAnimationFrame(() => {
    result.rafIdAfter = window.requestAnimationFrame(() => {
      callback();
    });
  });
  return {
    cancel: () => {
      if (result.rafIdBefore) {
        window.cancelAnimationFrame(result.rafIdBefore);
      }
      if (result.rafIdAfter) {
        window.cancelAnimationFrame(result.rafIdAfter);
      }
    },
  };
};
