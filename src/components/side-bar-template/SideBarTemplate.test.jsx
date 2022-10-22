/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { settings } from 'carbon-components';

import SideBarTemplate from './SideBarTemplate';

const { prefix } = settings;

const sideBarDefaultProps = () => ({
  width: 25,
  place: 'left',
  showSeparator: true,
  overlay: false,
  show: true,
  showCloseButton: true,
});

describe('SideBarTemplate', () => {
  test('verify if created', () => {
    const wrapper = mount(
      <SideBarTemplate {...sideBarDefaultProps()}>
        <div>test</div>
      </SideBarTemplate>
    );
    expect(wrapper.find(SideBarTemplate)).toHaveLength(1);
  });

  test('hide sidebar on click close button', () => {
    const wrapper = mount(
      <SideBarTemplate {...sideBarDefaultProps()}>
        <div>test</div>
      </SideBarTemplate>
    );

    expect(wrapper.find(`.${prefix}--side-bar-template__bar`)).toHaveLength(1);
    const closeButton = wrapper.find(`.${prefix}--side-bar-template__bar__close`);
    closeButton.simulate('click');
    expect(wrapper.find(`.${prefix}--side-bar-template__bar`)).toHaveLength(0);
  });

  test('override hide behaviour for sidebar on click close button', () => {
    const wrapper = mount(
      <SideBarTemplate {...sideBarDefaultProps()} toggleShowOnClose={false}>
        <div>test</div>
      </SideBarTemplate>
    );

    expect(wrapper.find(`.${prefix}--side-bar-template__bar`)).toHaveLength(1);
    const closeButton = wrapper.find(`.${prefix}--side-bar-template__bar__close`);
    closeButton.simulate('click');
    expect(wrapper.find(`.${prefix}--side-bar-template__bar`)).toHaveLength(1);
  });

  describe('focus handling', () => {
    const props = () => ({
      showCloseButton: true,
    });

    it('focus triggerRef on close', () => {
      const mockElement = document.createElement('div');
      mockElement.focus = jest.fn();

      const { rerender } = render(<SideBarTemplate {...props()} show triggerRef={mockElement} />);

      rerender(<SideBarTemplate {...props()} triggerRef={mockElement} />);

      expect(mockElement.focus).toHaveBeenCalledTimes(1);
    });

    it('does not focus triggerRef on open', () => {
      const mockElement = document.createElement('div');
      mockElement.focus = jest.fn();

      const { rerender } = render(<SideBarTemplate {...props()} triggerRef={mockElement} />);

      rerender(<SideBarTemplate {...props()} show triggerRef={mockElement} />);

      expect(mockElement.focus).toHaveBeenCalledTimes(0);
    });
  });
});
