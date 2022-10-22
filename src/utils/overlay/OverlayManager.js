/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import isFunction from 'lodash/isFunction';

class OverlayManager {
  constructor(config = {}) {
    this.$config = Object.freeze(config);
    this.$items = new Map();
    this.$rootNode = null;
    this.$autoUpdateRafId = undefined;

    this.getItems = this.getItems.bind(this);
    this.getAutoUpdateItems = this.getAutoUpdateItems.bind(this);
    this.processAutoUpdateItems = this.processAutoUpdateItems.bind(this);
    this.cancelRafAutoUpdate = this.cancelRafAutoUpdate.bind(this);
    this.registerItem = this.registerItem.bind(this);
    this.unRegisterItem = this.unRegisterItem.bind(this);
    this.hasRegisteredItem = this.hasRegisteredItem.bind(this);
    this.hasRegisteredItems = this.hasRegisteredItems.bind(this);
    this.updateItemsPosition = this.updateItemsPosition.bind(this);
    this.getItemData = this.getItemData.bind(this);
  }

  get config() {
    return this.$config;
  }

  get id() {
    return this.$config?.id ?? '';
  }

  /**
   *
   * @returns {Array}
   */
  get portalClassNames() {
    return this.$config?.portal?.classNames ?? [];
  }

  get portalId() {
    return this.$config?.portal?.id ?? '';
  }

  /**
   *
   * @returns {HTMLElement}
   */
  get portalNode() {
    if (!this.$rootNode && this.portalId) {
      this.$rootNode = document.getElementById(this.portalId);
    }
    if (!this.$rootNode && this.portalId) {
      const rootElement = document.createElement('div');
      rootElement.setAttribute('id', this.portalId);
      this.portalClassNames.forEach(className => rootElement.classList.add(className));
      document.body.appendChild(rootElement);
      const { onRootCreate } = this.$config;
      if (isFunction(onRootCreate)) {
        onRootCreate(rootElement);
      }
      this.$rootNode = rootElement;
    }
    return this.$rootNode;
  }

  /**
   *
   * @returns {{item: object, details: {object} }[]}
   */
  getItems() {
    return Array.from(this.$items.entries()).map(([entry, key]) => ({ item: entry, details: key }));
  }

  /**
   *
   * @returns {{item: object, details: {object}}[]}
   */
  getAutoUpdateItems() {
    return this.getItems().filter(({ details }) => {
      const { autoUpdatePosition, closeIfOutOfViewport, flipVerticalIfNoSpace } = details;
      return autoUpdatePosition || closeIfOutOfViewport || flipVerticalIfNoSpace;
    });
  }

  /**
   *
   * @returns {number}
   */
  get itemsCount() {
    return this.$items.size;
  }

  /**
   *
   * @param item
   * @param details
   * @returns {boolean}
   */
  registerItem(item, details) {
    if (item) {
      this.$items.set(item, { ...details });
      return true;
    }
    return false;
  }

  /**
   *
   * @param item
   * @returns {boolean}
   */
  unRegisterItem(item) {
    if (item) {
      return this.$items.delete(item);
    }
    if (!this.hasAutoUpdateItems) {
      this.cancelRafAutoUpdate();
    }
    return false;
  }

  /**
   *
   * @returns {boolean}
   */
  hasRegisteredItems() {
    return this.$items.size > 0;
  }

  /**
   *
   * @param item
   * @returns {boolean}
   */
  hasRegisteredItem(item) {
    return this.$items.has(item);
  }

  /**
   *
   * @returns {boolean}
   */
  get hasAutoUpdateItems() {
    return this.hasRegisteredItems() && this.getAutoUpdateItems().length > 0;
  }

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  updateItemsPosition(trigger = null) {
    // abstract
  }

  /**
   *
   * @param clearId {boolean}
   * @param cancelNextRaf {boolean}
   */
  cancelRafAutoUpdate(cancelNextRaf = true, clearId = true) {
    if (cancelNextRaf && this.$autoUpdateRafId) {
      window.cancelAnimationFrame(this.$autoUpdateRafId);
    }
    if (clearId) {
      this.$autoUpdateRafId = undefined;
    }
  }

  processAutoUpdateItems() {
    if (this.hasAutoUpdateItems) {
      this.updateItemsPosition({ autoUpdate: true });
      if (this.hasAutoUpdateItems) {
        if (!this.$autoUpdateRafId) {
          this.$autoUpdateRafId = window.requestAnimationFrame(() => {
            this.cancelRafAutoUpdate(false);
            this.processAutoUpdateItems();
          });
        }
      } else {
        this.cancelRafAutoUpdate();
      }
    } else {
      this.cancelRafAutoUpdate();
    }
  }

  getItemData(item) {
    if (item && this.$items.has(item)) {
      return this.$items.get(item);
    }
    return {};
  }
}

export default OverlayManager;
