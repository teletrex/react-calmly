/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

import ValueIndicator from './ValueIndicator';

const { prefix } = settings;

const props = {
  green: {
    mainValue: 88.4,
    tagValue: 3.4,
    title: 'Open rate',
  },
  gray: {
    mainValue: -88.4,
    tagValue: 0,
    title: 'Open rate',
  },
  red: {
    mainValue: -88.4,
    tagValue: -2.4,
    title: 'Open rate',
  },
};

describe('ValueIndicator', () => {
  test('verify if created', () => {
    const wrapper = mount(<ValueIndicator {...props.green} />);
    expect(wrapper.find(ValueIndicator)).toHaveLength(1);
  });
  test('show green for positive values', () => {
    const greenWrapper = mount(<ValueIndicator {...props.green} />);
    expect(greenWrapper.find(`.${prefix}--tag--rc-green`)).toHaveLength(1);
  });
  test('show gray for zero value', () => {
    const zeroWrapper = mount(<ValueIndicator {...props.gray} />);
    expect(zeroWrapper.find(`.${prefix}--tag--rc-gray`)).toHaveLength(1);
  });
  test('show red for negative values', () => {
    const redWrapper = mount(<ValueIndicator {...props.red} />);
    expect(redWrapper.find(`.${prefix}--tag--rc-red`)).toHaveLength(1);
  });
  test('verify default tagValue', () => {
    const wrapper = mount(<ValueIndicator />);

    expect(wrapper.find(`.${prefix}--tag`).text()).toBe('0 %');
  });
});
