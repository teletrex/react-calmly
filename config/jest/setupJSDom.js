/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

Object.defineProperties(window, {
  _pageXOffset: {
    value: 0,
    writable: true,
  },
  _pageYOffset: {
    value: 0,
    writable: true,
  },
  pageXOffset: {
    get() {
      return this._pageXOffset;
    },
    configurable: true,
  },
  pageYOffset: {
    get() {
      return this._pageYOffset;
    },
    configurable: true,
  },
});

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.addEventListener = () => {};
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};

copyProps(window, global);
