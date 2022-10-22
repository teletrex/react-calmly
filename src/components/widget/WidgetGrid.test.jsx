/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { mockOffsetParent } from '../utils/test-helpers/html-element-mocks';

import { Widget, WidgetContent, WidgetGrid } from './index';

jest.mock('../utils/hooks/use-resize-observer', () => ({
  useResizeObserver: () => ({
    setElement: () => {},
    contentRect: {
      width: 1000,
    },
  }),
}));

describe('WidgetGrid', () => {
  beforeAll(() => {
    mockOffsetParent();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders widgets', () => {
    const { getByText } = render(
      <WidgetGrid>
        <Widget widgetId="01">
          <WidgetContent>widget one</WidgetContent>
        </Widget>
        <Widget widgetId="02">
          <WidgetContent>widget two</WidgetContent>
        </Widget>
      </WidgetGrid>
    );
    expect(getByText('widget one')).toBeInTheDocument();
    expect(getByText('widget two')).toBeInTheDocument();
  });

  it('renders drop here message while dragging widgets', async () => {
    const { getByText, queryByText } = render(
      <WidgetGrid>
        <Widget widgetId="01">
          <WidgetContent>widget one</WidgetContent>
        </Widget>
      </WidgetGrid>
    );

    const widget = getByText('widget one');

    fireEvent.mouseDown(widget);

    /*
    Here is why we call mouseMove 3 times:

    During first one, placeholder is created and it does not immediately exists in DOM

    The second call has access to the placeholder, and the text is inserted.

    Third call we want to check if we will not insert the text twice.

    */
    fireEvent.mouseMove(widget); // during first move placeholder is being created
    fireEvent.mouseMove(widget); // here we can already change the text here
    fireEvent.mouseMove(widget); // we make sure we test the case where the logic will not run twice.

    // make sure we do not insert the text more than once
    expect(queryByText('Drop hereDrop here')).toBeNull();

    expect(getByText('Drop here')).toBeInTheDocument();
  });
});
