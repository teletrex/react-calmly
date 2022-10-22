/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { mount } from 'enzyme';

import { ProgressStep } from './ProgressStep';

describe('ProgressStep', () => {
  const props = {
    label: 'label',
    description: 'Step 1: Getting Started',
  };

  it('Renders ProgressStep Component as expected', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} onClick={mockOnClick} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger onClick if clicked', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('disabled: should not trigger onClick if clicked', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} disabled onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('click');
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('non interactive: should not trigger onClick if clicked', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} interactive={false} onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('click');
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should call onClick if the enter button keydown', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('keydown', { keyCode: 13 });
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('disabled: should not call onClick if the enter button keydown', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} disabled onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('keydown', { keyCode: 13 });
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('not interactive: should not call onClick if the enter button keydown', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} interactive={false} onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('keydown', { keyCode: 13 });
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should call onClick if the space button keydown', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('keydown', { keyCode: 32 });
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('disabled: should not call onClick if the space button keydown', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} disabled onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('keydown', { keyCode: 32 });
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('not interactive: should not call onClick if the space button keydown', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<ProgressStep {...props} interactive={false} onClick={mockOnClick} />);
    wrapper.find('[role="button"]').simulate('keydown', { keyCode: 32 });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
