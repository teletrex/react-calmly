/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */
import isFunction from 'lodash/isFunction';

import { DomElement } from '../DomUtils';

import { commonAttributes } from './constants';

/**
 * Need to compensate base <carbon::Tooltip by window pageXOffset, pageYOffset
 * coz overlay with position: fixed used;
 * see "--tooltips-placeholder" of tooltip.css
 * @param offsetBaseFunction {function(Element, string, *): {top: number, left: number}}
 * @returns {function(Element, string): {top: number, left: number}}
 */
export const getOverlayOffsetFixed = offsetBaseFunction => (menuBody, menuDirection, ...other) => {
  const result = {
    left: 0,
    top: 0,
    ...(isFunction(offsetBaseFunction)
      ? offsetBaseFunction(menuBody, menuDirection, ...other)
      : offsetBaseFunction),
  };
  const vertDirFactor = menuDirection === 'top' ? -1 : 1;
  const horDirFactor = menuDirection === 'left' ? -1 : 1;
  result.left -= window.pageXOffset * horDirFactor;
  result.top -= window.pageYOffset * vertDirFactor;
  return result;
};

export class Overlays {
  static get attributes() {
    return commonAttributes;
  }

  /**
   *
   * @returns {string}
   */
  static get OVERFLOW_MENUS_ROOT_ID() {
    return 'overflow-menus-root';
  }

  static $overflowMenusRoot;

  /**
   *
   * @returns {HTMLElement}
   */
  static get overflowMenusRootNode() {
    if (!this.$overflowMenusRoot) {
      this.$overflowMenusRoot = document.getElementById(Overlays.OVERFLOW_MENUS_ROOT_ID);
      if (!this.$overflowMenusRoot) {
        this.$overflowMenusRoot = document.createElement('nav');
        this.$overflowMenusRoot.setAttribute('id', Overlays.OVERFLOW_MENUS_ROOT_ID);
        this.$overflowMenusRoot.setAttribute('aria-label', Overlays.OVERFLOW_MENUS_ROOT_ID);
        document.body.appendChild(this.$overflowMenusRoot);
      }
    }
    return this.$overflowMenusRoot;
  }

  static get screenBounds() {
    return DomElement(this.overflowMenusRootNode).getBounds();
  }

  /**
   *
   * @returns {string}
   */
  static get MODAL_ROOT_ID() {
    return 'modal-root';
  }

  static $modalRoot;

  /**
   *
   * @returns {HTMLElement}
   */
  static get modalRootNode() {
    if (!this.$modalRoot) {
      this.$modalRoot = document.getElementById(Overlays.MODAL_ROOT_ID);
      if (!this.$modalRoot) {
        this.$modalRoot = document.createElement('div');
        this.$modalRoot.setAttribute('id', Overlays.MODAL_ROOT_ID);
        document.body.appendChild(this.$modalRoot);
      }
    }
    return this.$modalRoot;
  }

  static $instances = new Map();

  /**
   *
   * @param config {object} // OverlayManagerConfigPropType
   * @returns {OverlayManager}
   */
  static register = config => {
    if (!config) {
      throw new ReferenceError("Overlays::register -> 'config' is mandatory ");
    }
    const { id, ClassFactory } = config;
    if (!id) {
      throw new ReferenceError("Overlays::register -> 'config.id' is mandatory");
    }

    // if has already registered
    if (this.$instances.has(id)) {
      return this.$instances.get(id);
    }

    if (!ClassFactory) {
      throw new ReferenceError("Overlays::register -> 'config.ClassFactory' is mandatory");
    }

    return this.$instances.set(id, new ClassFactory(config)).get(id);
  };

  static updateItemsPosition = event => {
    this.$instances.forEach(overlayManager => {
      overlayManager.updateItemsPosition(event);
    });
  };

  /**
   * @param id {string} unique uid
   * @returns {OverlayManager} instance
   */
  static getInstance = id => {
    return this.$instances.get(id);
  };

  /**
   *
   * @param id {string}
   * @returns {OverlayManager}
   */
  static unRegister = id => {
    const instance = this.$instances.get(id);
    if (instance) {
      this.$instances.delete(id);
    }
    return instance;
  };
}

(function initOverlayRootNodes() {
  return [Overlays.modalRootNode, Overlays.overflowMenusRootNode];
})();

export default Overlays;
