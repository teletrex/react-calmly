/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

import MultilevelDropdown from './MultilevelDropdown';

const { prefix } = settings;

const itemsExtend = [
  {
    id: 'option-1-1',
    text: 'Option 1-1',
  },
  {
    id: 'option-1-2',
    text: 'Option 1-2',
    sublist: [
      {
        id: 'option-2-1',
        text: 'Option 2-1',
      },
      {
        id: 'option-2-2',
        text: 'Option 2-2',
        sublist: [
          {
            id: 'option-3-1',
            text: 'Option 3-1',
            sublist: [
              {
                id: 'option-4-1',
                text: 'Option 4-1',
              },
              {
                id: 'option-4-2',
                text: 'Option 4-2',
              },
            ],
          },
          {
            id: 'option-3-2',
            text: 'Option 3-2',
          },
        ],
      },
    ],
  },
  {
    id: 'option-1-3',
    text: 'Option 1-3',
  },
  {
    id: 'option-1-4',
    text: 'Option 1-4',
    sublist: [
      {
        id: 'option-2-3',
        text: 'Option 2-3',
      },
      {
        id: 'option-2-4',
        text: 'Option 2-4',
      },
      {
        id: 'option-2-5',
        text: 'Option 2-5',
      },
    ],
  },
];

describe('MultilevelDropdown', () => {
  let wrapper;
  beforeEach(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    wrapper = mount(<MultilevelDropdown items={itemsExtend} />, { attachTo: container });
  });

  afterEach(() => {
    wrapper.detach();
  });

  test('verify if created', () => {
    expect(wrapper.find(MultilevelDropdown)).toHaveLength(1);
  });

  test('verify handle click event at "Choose an option"', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    multilevelDropdownDomNode.click();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    multilevelDropdownDomNode.click();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
  });

  test('verify click in first level dropdown', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();

    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    multilevelDropdownDomNode.click();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    const chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    const chosenText = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(9);

    const item = chosenText.getDOMNode();
    item.click();

    const chosenItem = multilevelDropdown.text();
    expect(chosenItem).toBe('Choose an option');
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
  });

  test('verify hover on levels and click in 4th level item', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();

    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    multilevelDropdownDomNode.click();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    const chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    const firstLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(1);

    const secondLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(3);

    const thirdLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(4);

    const fourthLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(6);

    const option12 = firstLevel.getDOMNode();
    const option22 = secondLevel.getDOMNode();
    const option31 = thirdLevel.getDOMNode();

    const eMouseover = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    const eMouseout = new MouseEvent('mouseout', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    expect(option12.getAttribute('aria-expanded')).toBe('false');

    option12.dispatchEvent(eMouseover);
    expect(option12.getAttribute('aria-expanded')).toBe('true');

    option12.dispatchEvent(eMouseout);
    expect(option12.getAttribute('aria-expanded')).toBe('false');

    option12.dispatchEvent(eMouseover);
    expect(option12.getAttribute('aria-expanded')).toBe('true');

    option22.dispatchEvent(eMouseover);
    expect(option22.getAttribute('aria-expanded')).toBe('true');

    option31.dispatchEvent(eMouseover);
    expect(option31.getAttribute('aria-expanded')).toBe('true');

    const item = fourthLevel.getDOMNode();
    item.click();

    const chosenItem = multilevelDropdown.text();
    expect(chosenItem).toBe('Option 4-2');
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
  });

  test('verify hover on 2nd level and click outside dropdown', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();

    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    multilevelDropdownDomNode.click();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    const chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    const firstLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(1);

    const secondLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(3);

    const option12 = firstLevel.getDOMNode();
    const option22 = secondLevel.getDOMNode();

    const eMouseover = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    const eMouseout = new MouseEvent('mouseout', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    const outsideClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    expect(option12.getAttribute('aria-expanded')).toBe('false');
    expect(option22.getAttribute('aria-expanded')).toBe('false');

    option12.dispatchEvent(eMouseover);
    expect(option12.getAttribute('aria-expanded')).toBe('true');

    option22.dispatchEvent(eMouseover);
    expect(option22.getAttribute('aria-expanded')).toBe('true');

    option22.dispatchEvent(eMouseout);

    expect(option12.getAttribute('aria-expanded')).toBe('true');
    expect(option22.getAttribute('aria-expanded')).toBe('false');

    const element = document.body;
    element.dispatchEvent(outsideClick);

    expect(chooseAnOption).toBe('Choose an option');
    expect(option12.getAttribute('aria-expanded')).toBe('false');
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
  });

  test('verify handle click event at "Choose an option" after that click outside dropdown', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    multilevelDropdownDomNode.click();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    const outsideClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    const element = document.body;
    element.dispatchEvent(outsideClick);

    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
  });

  test('verify click enter and esc at "Choose an option"', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const firstLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(0);

    const option11 = firstLevel.getDOMNode();

    const chooseAnOption = multilevelDropdown.text();

    const enterClick = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });

    const escClick = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 27,
    });

    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(chooseAnOption).toBe('Choose an option');

    multilevelDropdownDomNode.dispatchEvent(enterClick);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(chooseAnOption).toBe('Choose an option');

    option11.dispatchEvent(escClick);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(chooseAnOption).toBe('Choose an option');
  });

  test('verify open on click arrow down and close on click left arrow "Choose an option"', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const firstLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(0);

    const option11 = firstLevel.getDOMNode();

    const chooseAnOption = multilevelDropdown.text();

    const clickArrowDown = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 40,
    });

    const clickArrowLeft = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 37,
    });

    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(chooseAnOption).toBe('Choose an option');

    multilevelDropdownDomNode.dispatchEvent(clickArrowDown);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(chooseAnOption).toBe('Choose an option');

    option11.dispatchEvent(clickArrowLeft);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(chooseAnOption).toBe('Choose an option');
  });

  test('verify move on 4th level and back with keyboard', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const firstLevelFirstItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(0);

    const firstLevelSecondItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(1);

    const secondLevelFirstItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(2);

    const secondLevelSecondItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(3);

    const thirdLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(4);

    const fourthLevel = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(6);

    const option11 = firstLevelFirstItem.getDOMNode();
    const option12 = firstLevelSecondItem.getDOMNode();
    const option21 = secondLevelFirstItem.getDOMNode();
    const option22 = secondLevelSecondItem.getDOMNode();
    const option31 = thirdLevel.getDOMNode();
    const option41 = fourthLevel.getDOMNode();

    let chooseAnOption = multilevelDropdown.text();

    const enterClick = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });

    const escClick = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 27,
    });

    const clickArrowDown = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 40,
    });

    const clickArrowLeft = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 37,
    });

    const clickArrowUp = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 38,
    });

    const clickArrowRight = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 39,
    });

    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();

    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(chooseAnOption).toBe('Choose an option');

    multilevelDropdownDomNode.dispatchEvent(enterClick);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option11.dispatchEvent(clickArrowDown);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option12.dispatchEvent(clickArrowRight);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option21.dispatchEvent(clickArrowDown);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option22.dispatchEvent(clickArrowRight);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    expect(option22.getAttribute('aria-expanded')).toBe('true');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option31.dispatchEvent(clickArrowRight);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    expect(option22.getAttribute('aria-expanded')).toBe('true');
    expect(option31.getAttribute('aria-expanded')).toBe('true');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option41.dispatchEvent(clickArrowLeft);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    expect(option22.getAttribute('aria-expanded')).toBe('true');
    expect(option31.getAttribute('aria-expanded')).toBe('false');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option31.dispatchEvent(clickArrowLeft);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    expect(option22.getAttribute('aria-expanded')).toBe('false');
    expect(option31.getAttribute('aria-expanded')).toBe('false');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option22.dispatchEvent(clickArrowUp);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('true');
    expect(option22.getAttribute('aria-expanded')).toBe('false');
    expect(option31.getAttribute('aria-expanded')).toBe('false');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option21.dispatchEvent(clickArrowLeft);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option12.getAttribute('aria-expanded')).toBe('false');
    expect(option22.getAttribute('aria-expanded')).toBe('false');
    expect(option31.getAttribute('aria-expanded')).toBe('false');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');

    option12.dispatchEvent(escClick);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(option12.getAttribute('aria-expanded')).toBe('false');
    expect(option22.getAttribute('aria-expanded')).toBe('false');
    expect(option31.getAttribute('aria-expanded')).toBe('false');
    chooseAnOption = multilevelDropdown.text();
    expect(chooseAnOption).toBe('Choose an option');
  });

  test('verify move on 2nd level and choose option', () => {
    const multilevelDropdown = wrapper.find(
      `a.${prefix}--multilevel-dropdown--choose-an-option--list--box-menu`
    );
    const firstLevelFirstItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(0);
    const firstLevelSecondItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(1);
    const firstLevelThirdItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(8);
    const firstLevelFourthItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(9);
    const secondLevelItem = wrapper
      .find(`a.bx--multilevel-dropdown--choose-an-option--list--box-menu-nested--item`)
      .at(10);

    const option11 = firstLevelFirstItem.getDOMNode();
    const option12 = firstLevelSecondItem.getDOMNode();
    const option13 = firstLevelThirdItem.getDOMNode();
    const option14 = firstLevelFourthItem.getDOMNode();
    const option23 = secondLevelItem.getDOMNode();

    let chooseAnOption = multilevelDropdown.text();

    const enterClick = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });

    const clickArrowDown = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 40,
    });

    const clickArrowRight = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 39,
    });

    const multilevelDropdownDomNode = multilevelDropdown.getDOMNode();

    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');

    multilevelDropdownDomNode.dispatchEvent(enterClick);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    option11.dispatchEvent(clickArrowDown);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    option12.dispatchEvent(clickArrowDown);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    option13.dispatchEvent(clickArrowDown);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');

    option14.dispatchEvent(clickArrowRight);
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('true');
    expect(option14.getAttribute('aria-expanded')).toBe('true');

    option23.dispatchEvent(enterClick);
    chooseAnOption = multilevelDropdown.text();
    expect(multilevelDropdownDomNode.getAttribute('aria-expanded')).toBe('false');
    expect(option14.getAttribute('aria-expanded')).toBe('false');
    expect(chooseAnOption).toBe('Option 2-3');
  });
});
