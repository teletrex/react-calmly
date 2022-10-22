/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *   This software or document includes material copied from or derived from https://github.com/w3c/aria-practices/tree/master/examples/menubar/menubar-1/js. Copyright © 2020 W3C® (MIT, ERCIM, Keio, Beihang)
 */
import  settings  from '../../settings';

import { KEY_CODE } from './utilsDropdown';

const { prefix } = settings;

let level = 1;

let allowedToClick = true;

export const PopupMenu = function PopupMenu(
  domNode,
  mainArrow,
  controllerObj,
  setDropDowns,
  closeDropDowns
) {
  this.domNode = domNode;
  this.controller = controllerObj;

  this.menuitems = [];

  this.firstItem = null;
  this.lastItem = null;

  this.hasFocus = false;
  this.hasHover = false;
  this.subMenu = null;
  this.mainArrow = mainArrow;

  this.openDropdown = 0;
  this.setDropDowns = setDropDowns;
  this.closeDropDowns = closeDropDowns;

  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  document.addEventListener(
    'scroll',
    () => {
      this.setNestedDropdownPosition();
    },
    true
  );

  this.domNode.style.display = 'none';

  let childElement = this.domNode.firstElementChild;

  while (childElement) {
    const menuElement = childElement.firstElementChild;

    if (menuElement && menuElement.tagName === 'A') {
      // eslint-disable-next-line no-use-before-define
      const menuItem = new MenuItem(
        menuElement,
        this.mainArrow,
        this,
        this.setDropDowns,
        this.closeDropDowns
      );
      this.menuitems.push(menuItem);
    }
    childElement = childElement.nextElementSibling;
  }

  const numItems = this.menuitems.length;

  if (numItems > 0) {
    [this.firstItem] = this.menuitems;
    this.lastItem = this.menuitems[numItems - 1];
  }
};

/*
 *   @desc
 *       Add domNode event listeners for mouseover and mouseout. Traverse
 *       domNode children to configure each menuitem and populate menuitems
 *       array. Initialize firstItem and lastItem properties.
 */

PopupMenu.prototype.handleMouseover = function handleMouseover() {
  this.hasHover = true;
};

PopupMenu.prototype.handleMouseout = function handleMouseout() {
  this.hasHover = false;
};

PopupMenu.prototype.setFocusToController = function setFocusToController(command, flag) {
  const localCommand = typeof command !== 'string' ? '' : command;

  function setFocusToMenubarItem(controller, close) {
    while (controller) {
      if (controller.isMenubarItem) {
        controller.domNode.focus();
        return controller;
      }

      if (close) {
        controller.menu.close(true);
      }

      // eslint-disable-next-line no-param-reassign
      controller = {
        ...controller.menu.controller,
        hasFocus: false,
      };
    }
    return false;
  }

  if (localCommand === '') {
    if (this.controller && this.controller.domNode) {
      this.controller.domNode.focus();
    }
    return;
  }

  if (!this.controller.isMenubarItem) {
    this.controller.domNode.focus();
    this.close();

    if (localCommand === 'next') {
      const menubarItem = setFocusToMenubarItem(this.controller, false);

      if (menubarItem) {
        menubarItem.menu.setFocusToNextItem(menubarItem, flag);
      }
    }
  } else if (localCommand === 'previous') {
    this.controller.menu.setFocusToPreviousItem(this.controller, flag);
  } else if (localCommand === 'next') {
    this.controller.menu.setFocusToNextItem(this.controller, flag);
  }
};

PopupMenu.prototype.setFocusToFirstItem = function setFocusToFirstItem() {
  this.firstItem.domNode.focus();
  this.firstItem.conditionalOpen();
};

PopupMenu.prototype.setFocusToLastItem = function setFocusToLastItem() {
  this.lastItem.domNode.focus();
  this.lastItem.conditionalOpen();
};

PopupMenu.prototype.setFocusToPreviousItem = function setFocusToPreviousItem(currentItem) {
  if (currentItem === this.firstItem) {
    this.lastItem.domNode.focus();
    this.lastItem.conditionalOpen();
  } else {
    this.menuitems[this.menuitems.indexOf(currentItem) - 1].domNode.focus();
    this.menuitems[this.menuitems.indexOf(currentItem) - 1].conditionalOpen();
  }
  currentItem.conditionalClose();
};

PopupMenu.prototype.setFocusToNextItem = function setFocusToNextItem(currentItem) {
  if (currentItem === this.lastItem) {
    this.firstItem.domNode.focus();
    this.firstItem.conditionalOpen();
  } else {
    this.menuitems[this.menuitems.indexOf(currentItem) + 1].domNode.focus();
    this.menuitems[this.menuitems.indexOf(currentItem) + 1].conditionalOpen();
  }
  currentItem.conditionalClose();
};

PopupMenu.prototype.open = function open(subItem) {
  this.domNode.style.display = 'block';
  this.domNode.style.position = 'absolute';
  this.domNode.style.zIndex = 100;

  this.setNestedDropdownPosition();

  this.controller.setExpanded(true);

  if (subItem) {
    if (
      this.controller.menu.subMenu &&
      !this.controller.menu.subMenu.domNode.isSameNode(subItem.domNode)
    ) {
      this.controller.menu.subMenu.close();
    }

    this.controller.menu.subMenu = subItem;
  }
};

PopupMenu.prototype.close = function close(force) {
  const controllerHasHover = this.controller.hasHover;

  let { hasFocus } = this;

  for (let i = 0; i < this.menuitems.length; i += 1) {
    const mi = this.menuitems[i];

    if (mi.popupMenu) {
      hasFocus = hasFocus || mi.popupMenu.hasFocus;
    }
  }

  if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
    this.domNode.style.display = 'none';
    this.domNode.style.zIndex = 0;
    this.controller.setExpanded(false);
  }
};

PopupMenu.prototype.setNestedDropdownPosition = function setNestedDropdownPosition() {
  if (this.domNode.style.display !== 'block') {
    return;
  }

  // Get position and bounding rectangle of controller object's DOM node
  const { height, width, left, bottom } = this.controller.domNode.getBoundingClientRect();
  const widthCorrection = parseInt(this.domNode.getAttribute('width-correction') || 0, 10);
  const isInPortal = this.domNode.classList.contains(`${prefix}--portal-rendered`);

  if (this.controller.isMenubarItem) {
    if (isInPortal) {
      this.domNode.style.top = `${bottom}px`;
      this.domNode.style.left = `${left}px`;
    } else {
      this.domNode.style.top = `${height}px`;
    }

    this.domNode.style.width = `${width}px`;
  } else {
    this.domNode.parentNode.style.position = 'relative';
    this.domNode.style.left = `${width - widthCorrection}px`;
    this.domNode.style.width = `${widthCorrection || width}px`;
    this.domNode.style.top = 0;
  }
};

export const MenuItem = function MenuItem(
  domNode,
  mainArrow,
  menuObj,
  setDropDowns,
  closeDropDowns
) {
  this.domNode = domNode;
  this.menu = menuObj;
  this.popupMenu = false;
  this.isMenubarItem = false;
  this.mainArrow = mainArrow;
  this.setDropDowns = setDropDowns;
  this.closeDropDowns = closeDropDowns;

  this.domNode.tabIndex = -1;

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('keyup', this.handleKeyup.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  const nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new PopupMenu(
      nextElement,
      this.mainArrow,
      this,
      this.setDropDowns,
      this.closeDropDowns
    );
  }
};

MenuItem.prototype.isExpanded = function isExpanded() {
  return this.domNode.getAttribute('aria-expanded') === 'true';
};

MenuItem.prototype.handleKeyup = function handleKeyup() {
  allowedToClick = true;
};

MenuItem.prototype.handleKeydown = function handleKeydown(event) {
  const tgt = event.currentTarget;
  let flag = false;
  let clickEvent;

  function setMainArrow(mainArrow) {
    level -= 1;
    if (level < 1) {
      mainArrow.current.classList.add(
        `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--close`
      );
      mainArrow.current.classList.remove(
        `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--open`
      );
      level = 1;
    }
  }

  switch (event.keyCode) {
    case KEY_CODE.SPACE:
    case KEY_CODE.RETURN:
      if (!allowedToClick) return;
      allowedToClick = false;
      clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      this.closeDropDowns();
      tgt.dispatchEvent(clickEvent);
      this.menu.setFocusToController('next', true);
      flag = true;
      this.mainArrow.current.classList.add(
        `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--close`
      );
      this.mainArrow.current.classList.remove(
        `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--open`
      );
      level = 1;
      break;

    case KEY_CODE.UP:
      this.menu.setFocusToPreviousItem(this);
      flag = true;
      break;

    case KEY_CODE.DOWN:
      this.menu.setFocusToNextItem(this);
      flag = true;
      break;

    case KEY_CODE.LEFT:
      this.conditionalClose();
      this.menu.setFocusToController('previous', true);
      this.menu.close(true);
      setMainArrow(this.mainArrow);
      flag = true;
      break;

    case KEY_CODE.RIGHT:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
        level += 1;
      }
      flag = true;
      break;

    case KEY_CODE.HOME:
    case KEY_CODE.PAGEUP:
      this.menu.setFocusToFirstItem();
      flag = true;
      break;

    case KEY_CODE.END:
    case KEY_CODE.PAGEDOWN:
      this.menu.setFocusToLastItem();
      flag = true;
      break;

    case KEY_CODE.ESC:
      this.conditionalClose();
      this.menu.setFocusToController();
      this.menu.close(true);
      setMainArrow(this.mainArrow);
      flag = true;
      break;

    case KEY_CODE.TAB:
      this.menu.setFocusToController();
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

MenuItem.prototype.conditionalOpen = function conditionalOpen() {
  if (this.popupMenu && this.domNode.getAttribute('auto-open') === 'true') {
    this.popupMenu.open();
  }
};

MenuItem.prototype.conditionalClose = function conditionalClose() {
  if (this.popupMenu && this.domNode.getAttribute('auto-open') === 'true') {
    this.popupMenu.close();
  }
};

MenuItem.prototype.setExpanded = function setExpanded(value) {
  this.domNode.setAttribute('aria-expanded', value ? 'true' : 'false');
};

MenuItem.prototype.handleClick = function handleClick() {
  this.menu.setFocusToController('next', true);
  this.closeDropDowns();
};

MenuItem.prototype.handleFocus = function handleFocus() {
  this.menu.hasFocus = true;
};

MenuItem.prototype.handleBlur = function handleBlur() {
  this.menu.hasFocus = false;
  this.setDropDowns(this.menu);
};

MenuItem.prototype.handleMouseover = function handleMouseover() {
  this.menu.hasHover = true;
  this.menu.open();

  if (this.popupMenu) {
    this.popupMenu.hasHover = true;
    this.popupMenu.open(this.popupMenu);
  }
  this.setDropDowns(this.menu);
};

MenuItem.prototype.handleMouseout = function handleMouseout() {
  if (this.popupMenu) {
    this.popupMenu.hasHover = false;
    this.popupMenu.close(true);
  }
  this.menu.hasHover = false;
};
