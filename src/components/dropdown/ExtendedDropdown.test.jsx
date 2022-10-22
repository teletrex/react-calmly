/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';
import {
  findMenuItemNode,
  findMenuNode,
  generateGenericItem,
  generateItems,
  openMenu,
} from 'carbon-components-react/es/components/ListBox/test-helpers';

import ExtendedDropdown from './ExtendedDropdown';

const { prefix } = settings;

describe('Dropdown', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      ariaLabel: 'Extend dropdown',
      id: 'test-dropdown',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should render', () => {
    const wrapper = mount(<ExtendedDropdown {...mockProps} />);
    expect(wrapper.find(ExtendedDropdown)).toHaveLength(1);
  });

  it('should initially render with the menu not open', () => {
    const wrapper = mount(<ExtendedDropdown {...mockProps} />);
    expect(wrapper.find(`.${prefix}--list-box__open`)).toHaveLength(0);
  });

  it('should let the user open the menu by clicking on the control', () => {
    const wrapper = mount(<ExtendedDropdown {...mockProps} />);
    wrapper
      .find(`.${prefix}--list-box__field`)
      .at(0)
      .simulate('click');
    expect(wrapper.find(`.${prefix}--list-box__menu`).children().length).toBe(6);
  });

  describe('title', () => {
    let wrapper;
    let renderedLabel;

    beforeEach(() => {
      wrapper = mount(<ExtendedDropdown titleText="Email Input" {...mockProps} />);
      renderedLabel = wrapper.find(`.${prefix}--label`);
    });

    it('renders a title', () => {
      expect(renderedLabel.length).toBe(1);
    });

    it('should set title as expected', () => {
      expect(renderedLabel.text()).toEqual('Email Input');
    });
  });

  describe('menu item title', () => {
    it('should set title attribute for the menu items', () => {
      const { getByTitle } = render(<ExtendedDropdown {...mockProps} />);
      expect(getByTitle(mockProps.items[0].label)).toBeInTheDocument();
    });
  });

  describe('helper', () => {
    it('renders a helper', () => {
      const wrapper = mount(<ExtendedDropdown helperText="Email Input" {...mockProps} />);
      const renderedHelper = wrapper.find(`.${prefix}--form__helper-text`);
      expect(renderedHelper.length).toEqual(1);
    });

    it('renders children as expected', () => {
      const wrapper = mount(
        <ExtendedDropdown
          helperText={
            <span>
              This helper text has <a href="/">a link</a>.
            </span>
          }
          {...mockProps}
        />
      );
      const renderedHelper = wrapper.find(`.${prefix}--form__helper-text`);
      expect(renderedHelper.props().children).toEqual(
        <span>
          This helper text has <a href="/">a link</a>.
        </span>
      );
    });

    it('should set helper text as expected', () => {
      const wrapper = mount(<ExtendedDropdown {...mockProps} />);
      wrapper.setProps({ helperText: 'Helper text' });
      const renderedHelper = wrapper.find(`.${prefix}--form__helper-text`);
      expect(renderedHelper.text()).toEqual('Helper text');
    });
  });

  it('should specify light version as expected', () => {
    const wrapper = mount(<ExtendedDropdown {...mockProps} />);
    expect(wrapper.childAt(0).props().light).toEqual(false);
    wrapper.setProps({ light: true });
    expect(wrapper.props().light).toEqual(true);
  });

  it('should let the user select an option by clicking on the option node', () => {
    const wrapper = mount(<ExtendedDropdown {...mockProps} />);
    openMenu(wrapper);
    findMenuItemNode(wrapper, 0).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    expect(wrapper.find(`.${prefix}--list-box__open`)).toHaveLength(0);

    mockProps.onChange.mockClear();

    openMenu(wrapper);
    findMenuItemNode(wrapper, 1).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
  });

  it('should call onSelect if it is provided and the user selects twice the same value', () => {
    const onSelect = jest.fn();
    const wrapper = mount(<ExtendedDropdown {...mockProps} onSelect={onSelect} />);

    openMenu(wrapper);
    findMenuItemNode(wrapper, 1).simulate('click');
    expect(onSelect).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
    findMenuItemNode(wrapper, 1).simulate('click');
    expect(onSelect).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', () => {
      const wrapper = mount(
        <ExtendedDropdown {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );

      expect(wrapper.find(`.${prefix}--list-box__label`).text()).toEqual(mockProps.items[0].label);
    });

    it('using a string type for the `initialSelectedItem` prop', () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      const wrapper = mount(
        <ExtendedDropdown {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );
      expect(wrapper.find(`span.${prefix}--list-box__label`).text()).toEqual(mockProps.items[1]);
    });
  });

  describe('verify search attribute', () => {
    let wrapper;
    const findSearchNode = () => wrapper.find(`.${prefix}--search-input`);
    const filterBy = text =>
      findSearchNode(wrapper).simulate('change', { target: { value: text } });

    beforeEach(() => {
      wrapper = mount(
        <ExtendedDropdown
          {...mockProps}
          items={['Name', 'Status', 'Created by', 'Last modified']}
          searchPlaceHolderText="My custom placeholder text...."
          withSearch
        />
      );
    });

    it('render', () => {
      expect(wrapper.find(ExtendedDropdown)).toHaveLength(1);

      openMenu(wrapper);
      expect(findMenuNode(wrapper)).toHaveLength(2);
    });

    it('verify if custom placeholder is in place', () => {
      openMenu(wrapper);
      expect(findSearchNode(wrapper).props().placeholder).toEqual('My custom placeholder text....');
    });

    it('verify filters', () => {
      openMenu(wrapper);
      expect(wrapper.find('ListBoxMenuItem')).toHaveLength(5);

      filterBy('e');

      expect(wrapper.find('ListBoxMenuItem')).toHaveLength(4);
    });
  });

  describe('verify withPortal attribute', () => {
    it('should initially render with the menu not open in Portal', () => {
      const wrapper = mount(<ExtendedDropdown {...mockProps} withPortal />);
      expect(wrapper.find(`.${prefix}--list-box--in-portal`)).toHaveLength(0);
    });

    it('should open the menu in Portal', () => {
      const wrapper = mount(<ExtendedDropdown {...mockProps} withPortal />);
      wrapper
        .find(`.${prefix}--list-box__field`)
        .at(0)
        .simulate('click');
      expect(wrapper.find(`.${prefix}--list-box--in-portal`)).toHaveLength(1);
    });

    it('should not be closed after click on search input inside dropdown withPortal', () => {
      const { container } = render(<ExtendedDropdown {...mockProps} withPortal withSearch />);
      expect(container.querySelectorAll(`.${prefix}--list-box__field`)).toHaveLength(1);

      fireEvent.click(container.querySelector(`.${prefix}--list-box__field`));
      expect(document.body.querySelectorAll(`.${prefix}--list-box--in-portal`)).toHaveLength(1);

      const findSearchNode = document.body.querySelector(`.${prefix}--search-input`);
      fireEvent.click(findSearchNode);
      expect(document.body.querySelectorAll(`.${prefix}--list-box--in-portal`)).toHaveLength(1);
    });

    it('should not add click event listener on body if dropdown is closed', () => {
      const listenerFn = jest.fn();
      document.addEventListener = listenerFn;
      render(<ExtendedDropdown {...mockProps} withPortal />);

      expect(listenerFn.mock.calls.filter(([event]) => event === 'click')).toHaveLength(0);
    });

    it('should add click event listener on body if dropdown is open', () => {
      const originalEventListener = document.addEventListener.bind(document);
      const listenerFn = jest.fn(originalEventListener);
      document.addEventListener = listenerFn;

      const { container } = render(<ExtendedDropdown {...mockProps} withPortal />);
      fireEvent.click(container.querySelector(`.${prefix}--list-box__field`));

      // check if dropdown is opened;
      expect(document.body.querySelectorAll(`.${prefix}--list-box--in-portal`)).toHaveLength(1);
      // check if new click event listener was added to the document;
      expect(listenerFn.mock.calls.filter(([event]) => event === 'click')).toHaveLength(1);
    });
  });
});
