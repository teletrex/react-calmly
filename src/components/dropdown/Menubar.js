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
import MenubarItem from './MenubarItem';

let localDropDownsArray = [];

class Menubar {
  constructor(domNode, mainArrow, nestedList) {
    this.domNode = domNode;
    this.menubarItems = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasHover = false;
    this.mainArrow = mainArrow;
    this.nestedList = nestedList;
  }
  /*
   *   @method Menubar.init
   *
   *   @desc
   *       Adds ARIA role to the menubar node
   *       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
   *       and populate menuitems array. Initialize firstItem and lastItem properties.
   */

  init() {
    let menubarItem;
    let elem = this.domNode.firstElementChild;

    while (elem) {
      const menuElement = elem.firstElementChild;

      if (elem && menuElement && menuElement.tagName === 'A') {
        menubarItem = new MenubarItem(
          menuElement,
          this,
          this.mainArrow,
          this.setDropDowns,
          this.closeDropDowns,
          this.nestedList
        );
        menubarItem.init();
        this.menubarItems.push(menubarItem);
        this.firstChars.push(
          menuElement.textContent
            .trim()
            .substring(0, 1)
            .toLowerCase()
        );
      }
      elem = elem.nextElementSibling;
    }

    const numItems = this.menubarItems.length;

    if (numItems > 0) {
      [this.firstItem] = this.menubarItems;
      this.lastItem = this.menubarItems[numItems - 1];
    }
    this.firstItem.domNode.tabIndex = 0;

    document.addEventListener('click', e => {
      const element = this.domNode;
      const clicked = e.target === element || element.contains(e.target);
      menubarItem.setIsInnerClick(clicked);
    });
  }

  setDropDowns = dropDowns => {
    localDropDownsArray.push(dropDowns);
  };

  closeDropDowns = () => {
    if (localDropDownsArray.length !== 0) {
      localDropDownsArray.forEach(menu => {
        menu.close.call(menu, true);
      });
      localDropDownsArray = [];
    }
  };

  setFocusToItem(newItem) {
    for (let i = 0; i < this.menubarItems.length; i += 1) {
      const mbi = this.menubarItems[i];
      mbi.domNode.tabIndex = -1;
      if (mbi.popupMenu) {
        mbi.popupMenu.close();
      }
    }
    newItem.domNode.focus();
    // eslint-disable-next-line no-param-reassign
    newItem.domNode.tabIndex = 0;
  }

  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem);
  }

  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem);
  }

  setFocusToPreviousItem(currentItem) {
    let newItem;
    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      newItem = this.menubarItems[this.menubarItems.indexOf(currentItem) - 1];
    }
    this.setFocusToItem(newItem);
  }

  setFocusToNextItem(currentItem) {
    let newItem;
    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      newItem = this.menubarItems[this.menubarItems.indexOf(currentItem) + 1];
    }
    this.setFocusToItem(newItem);
  }

  setFocusByFirstCharacter(currentItem, char) {
    const localChar = char.toLowerCase();
    let start = this.menubarItems.indexOf(currentItem) + 1;
    if (start === this.menubarItems.length) {
      start = 0;
    }
    let index = this.getIndexFirstChars(start, localChar);
    if (index === -1) {
      index = this.getIndexFirstChars(0, localChar);
    }
    if (index > -1) {
      this.setFocusToItem(this.menubarItems[index]);
    }
  }

  getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; i < this.firstChars.length; i += 1) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }
}

export default Menubar;
