/* <LICENSE>
 *
 * Copyright (C) 2020 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 * </LICENSE>
 *  */

import React from 'react';
import { mount } from 'enzyme';
import  settings from '../../settings';

import Pagination from './Pagination';

const { prefix } = settings;

const props = {
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  page: 1,
  totalItems: 103,
};

describe('Not found page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Pagination {...props} />);
  });

  test('verify if created', () => {
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });
});

describe('Externalization checks keys', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Pagination {...props} />);
  });

  test('verify prev button key', () => {
    expect(wrapper.find(`button.${prefix}--pagination__button--backward`).prop('aria-label')).toBe(
      'Previous page'
    );
  });

  test('verify next button', () => {
    expect(wrapper.find(`button.${prefix}--pagination__button--forward`).prop('aria-label')).toBe(
      'Next page'
    );
  });

  test('verify label for items quantity on the page', () => {
    expect(
      wrapper
        .find(`.${prefix}--pagination__left`)
        .find(`label.${prefix}--pagination__text`)
        .text()
    ).toBe('Items per page:');
  });

  test('verify items range text', () => {
    wrapper = mount(<Pagination {...props} />);
    expect(
      wrapper
        .find(`.${prefix}--pagination__left`)
        .find(`span.${prefix}--pagination__text`)
        .text()
    ).toBe('1 - 10 of 103 items');
  });

  test('verify items text if pages quantity is unknown', () => {
    wrapper = mount(<Pagination pagesUnknown {...props} />);
    expect(
      wrapper
        .find(`.${prefix}--pagination__left`)
        .find(`span.${prefix}--pagination__text`)
        .text()
    ).toBe('1 - 10 items');
  });

  test('verify page range text', () => {
    wrapper = mount(<Pagination {...props} />);
    expect(
      wrapper
        .find(`.${prefix}--pagination__right`)
        .find(`span.${prefix}--pagination__text`)
        .text()
    ).toBe('of 11 pages');
  });

  test('verify page range text if pages quantity is unknown', () => {
    wrapper = mount(<Pagination pagesUnknown {...props} />);
    expect(
      wrapper
        .find(`.${prefix}--pagination__right`)
        .find(`span.${prefix}--pagination__text`)
        .text()
    ).toBe('Page 1');
  });

  test('verify if simple version is rendered', () => {
    wrapper = mount(<Pagination simple {...props} />);
    expect(wrapper.find(`.${prefix}--pagination`).hasClass(`${prefix}--pagination--simple`)).toBe(
      true
    );
  });

  test('verify if simple version is not rendered', () => {
    wrapper = mount(<Pagination simple={false} {...props} />);
    expect(wrapper.find(`.${prefix}--pagination`).hasClass(`${prefix}--pagination--simple`)).toBe(
      false
    );
  });

  test('verify if unbound version is rendered', () => {
    wrapper = mount(<Pagination unbound {...props} />);
    expect(wrapper.find(`.${prefix}--pagination`).hasClass(`${prefix}--pagination--unbound`)).toBe(
      true
    );
  });

  test('verify if unbound version is not rendered', () => {
    wrapper = mount(<Pagination unbound={false} {...props} />);
    expect(wrapper.find(`.${prefix}--pagination`).hasClass(`${prefix}--pagination--unbound`)).toBe(
      false
    );
  });
});
