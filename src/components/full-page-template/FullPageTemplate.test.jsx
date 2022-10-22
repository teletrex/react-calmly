/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import { Header } from 'carbon-components-react';

import FullPageTemplate, { FullPageTemplateContext } from '.';

describe('FullPageTemplate', () => {
  it('verify if created', () => {
    const wrapper = mount(<FullPageTemplate>Content</FullPageTemplate>);
    expect(wrapper.find(FullPageTemplate)).toHaveLength(1);
  });

  it('with scrollable table', () => {
    const wrapper = mount(
      <FullPageTemplate scrollableTable={<div>scrollable table</div>}>Content</FullPageTemplate>
    );

    expect(renderToJson(wrapper.render())).toMatchSnapshot();
  });

  it('should render wrapper for table when table is registered', () => {
    const TableComponent = () => {
      const { registerTable } = useContext(FullPageTemplateContext);

      registerTable();

      return null;
    };

    const wrapper = mount(
      <FullPageTemplate>
        <div>Content</div>
        <TableComponent>table</TableComponent>
      </FullPageTemplate>
    );

    expect(wrapper.find('.bx--full-page-template__scrollable-table')).toHaveLength(1);
  });

  it('should render header wrapper with string', () => {
    const { getByText } = render(
      <FullPageTemplate header="Test header">
        <div>Content</div>
      </FullPageTemplate>
    );

    expect(getByText('Test header')).toBeInTheDocument();
  });

  it('should render header wrapper with component', () => {
    const { getByLabelText } = render(
      <FullPageTemplate header={<Header aria-label="header">Test header</Header>}>
        <div>Content</div>
      </FullPageTemplate>
    );

    expect(getByLabelText('header')).toBeInTheDocument();
  });

  it('should render subheader as string', () => {
    const { getByText } = render(
      <FullPageTemplate subheader="Subheader test">
        <div>Content</div>
      </FullPageTemplate>
    );

    expect(getByText('Subheader test')).toBeInTheDocument();
  });

  it('should render actionbar', () => {
    const ActionBar = () => <button type="button">Action Button</button>;

    const { getByText } = render(
      <FullPageTemplate actionBar={<ActionBar />}>
        <div>Content</div>
      </FullPageTemplate>
    );

    expect(getByText('Action Button')).toBeInTheDocument();
  });
});
