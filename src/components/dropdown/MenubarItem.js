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

import { PopupMenu } from './NestedDropdown';
import { KEY_CODE } from './utilsDropdown';

const { prefix } = settings;

class MenubarItem {
  constructor(domNode, menuObj, mainArrow, setDropDowns, closeDropDowns, nestedList) {
    this.menu = menuObj;
    this.domNode = domNode;
    this.popupMenu = false;
    this.hasHover = false;
    this.isMenubarItem = true;
    this.mainArrow = mainArrow;
    this.setDropDowns = setDropDowns;
    this.closeDropDowns = closeDropDowns;
    this.nestedList = nestedList;
  }

  init() {
    this.domNode.tabIndex = -1;
    this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.domNode.addEventListener('focus', this.handleFocus.bind(this));
    this.domNode.addEventListener('blur', this.handleBlur.bind(this));

    const nextElement = this.domNode.nextElementSibling || this.nestedList;

    if (nextElement && nextElement.tagName === 'UL') {
      this.popupMenu = new PopupMenu(
        nextElement,
        this.mainArrow,
        this,
        this.setDropDowns,
        this.closeDropDowns
      );
    }
  }

  handleKeydown(event) {
    const char = event.key;
    let flag = false;
    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }
    switch (event.keyCode) {
      case KEY_CODE.SPACE:
      case KEY_CODE.RETURN:
      case KEY_CODE.DOWN:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
          this.popupMenu.openDropdown += 1;
          this.mainArrow.current.classList.remove(
            `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--close`
          );
          this.mainArrow.current.classList.add(
            `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--open`
          );
          flag = true;
        }
        break;
      case KEY_CODE.LEFT:
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;
      case KEY_CODE.RIGHT:
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;
      case KEY_CODE.UP:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToLastItem();
          flag = true;
        }
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
      case KEY_CODE.TAB:
        this.popupMenu.close(true);
        break;
      case KEY_CODE.ESC:
        this.popupMenu.close(true);
        this.mainArrow.current.classList.add(
          `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--close`
        );
        this.mainArrow.current.classList.remove(
          `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--open`
        );
        this.popupMenu.openDropdown = 0;
        break;
      default:
        if (isPrintableCharacter(char)) {
          this.menu.setFocusByFirstCharacter(this, char);
          flag = true;
        }
        break;
    }
    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  setExpanded(value) {
    this.domNode.setAttribute('aria-expanded', value ? 'true' : 'false');
  }

  handleFocus() {
    this.menu.hasFocus = true;
  }

  handleBlur() {
    this.menu.hasFocus = false;
  }

  setIsInnerClick(isInnerClick) {
    if (isInnerClick && this.popupMenu.openDropdown < 1) {
      this.popupMenu.open();
      this.popupMenu.openDropdown += 1;
      this.mainArrow.current.classList.remove(
        `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--close`
      );
      this.mainArrow.current.classList.add(
        `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--open`
      );
    } else if (isInnerClick && this.popupMenu.openDropdown > 1) {
      this.popupMenu.close();
      this.popupMenu.openDropdown = 0;
    } else {
      this.popupMenu.close();
      this.popupMenu.openDropdown = 0;

      if (this.mainArrow.current && this.mainArrow.current.classList !== null) {
        this.mainArrow.current.classList.add(
          `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--close`
        );
        this.mainArrow.current.classList.remove(
          `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--open`
        );
      }

      this.closeDropDowns();
    }
  }
}

export default MenubarItem;
