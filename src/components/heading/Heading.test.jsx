/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import  settings  from '../../settings';

import { H1, H2, H3, H4, H5, H6 } from '.';

const { prefix } = settings;

describe('TitleH1', () => {
  test('verify if created', () => {
    const TitleH1 = mount(<H1 />);
    expect(TitleH1.find(H1)).toHaveLength(1);
  });

  test('verify if default class applied correctly', () => {
    const wrapper = mount(<H1 />);
    expect(wrapper.find('h1').hasClass(`${prefix}--heading_1`)).toBeTruthy();
  });

  test('verify if extra class applied correctly', () => {
    const wrapper = mount(<H1 extra />);
    expect(wrapper.find('h1').hasClass(`${prefix}--heading_1__extra`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<H1 className="new_class" />);
    expect(wrapper.find('h1').hasClass(`new_class`)).toBeTruthy();
  });
});

describe('TitleH2', () => {
  test('verify if created', () => {
    const TitleH2 = mount(<H2 />);
    expect(TitleH2.find(H2)).toHaveLength(1);
  });

  test('verify if default class applied correctly', () => {
    const wrapper = mount(<H2 />);
    expect(wrapper.find('h2').hasClass(`${prefix}--heading_2`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<H2 className="new_class" />);
    expect(wrapper.find('h2').hasClass(`new_class`)).toBeTruthy();
  });
});

describe('TitleH3', () => {
  test('verify if created', () => {
    const TitleH3 = mount(<H3 />);
    expect(TitleH3.find(H3)).toHaveLength(1);
  });

  test('verify if default class applied correctly', () => {
    const wrapper = mount(<H3 />);
    expect(wrapper.find('h3').hasClass(`${prefix}--heading_3`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<H3 className="new_class" />);
    expect(wrapper.find('h3').hasClass(`new_class`)).toBeTruthy();
  });
});

describe('TitleH4', () => {
  test('verify if created', () => {
    const TitleH4 = mount(<H4 />);
    expect(TitleH4.find(H4)).toHaveLength(1);
  });

  test('verify if default class applied correctly', () => {
    const wrapper = mount(<H4 />);
    expect(wrapper.find('h4').hasClass(`${prefix}--heading_4`)).toBeTruthy();
  });

  test('verify if bold class applied correctly', () => {
    const wrapper = mount(<H4 bold />);
    expect(wrapper.find('h4').hasClass(`${prefix}--heading_4__bold`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<H4 className="new_class" />);
    expect(wrapper.find('h4').hasClass(`new_class`)).toBeTruthy();
  });
});

describe('TitleH5', () => {
  test('verify if created', () => {
    const TitleH5 = mount(<H5 />);
    expect(TitleH5.find(H5)).toHaveLength(1);
  });

  test('verify if default class applied correctly', () => {
    const wrapper = mount(<H5 />);
    expect(wrapper.find('h5').hasClass(`${prefix}--heading_5`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<H5 className="new_class" />);
    expect(wrapper.find('h5').hasClass(`new_class`)).toBeTruthy();
  });
});

describe('TitleH6', () => {
  test('verify if created', () => {
    const TitleH6 = mount(<H6 />);
    expect(TitleH6.find(H6)).toHaveLength(1);
  });

  test('verify if default class applied correctly', () => {
    const wrapper = mount(<H6 />);
    expect(wrapper.find('h6').hasClass(`${prefix}--heading_6`)).toBeTruthy();
  });

  test('verify if custom class applied correctly', () => {
    const wrapper = mount(<H6 className="new_class" />);
    expect(wrapper.find('h6').hasClass(`new_class`)).toBeTruthy();
  });
});
