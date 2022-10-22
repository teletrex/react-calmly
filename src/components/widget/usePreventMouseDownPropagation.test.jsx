/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Tabs, { Tab } from '../tabs';
import OverflowMenu, { OverflowMenuItem } from '../overflow-menu';

import { Widget, WidgetTabs } from './index';

describe('usePreventMouseDownPropagation', () => {
  const upperListener = jest.fn();
  const elementListener = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('propagates mouseDown from simple div element', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <div>simple div</div>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('simple div'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('propagates mouseDown from simple span element', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <span>simple span</span>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('simple span'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('propagates mouseDown from simple svg element', () => {
    const { getByLabelText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <svg aria-label="the svg" />
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByLabelText('the svg'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('propagates mouseDown from simple img element', () => {
    const { getByAltText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <img alt="the img" />
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByAltText('the img'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('propagates mouseDown from simple table', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <table>
            <tbody>
              <tr>
                <td> some data </td>
              </tr>
            </tbody>
          </table>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('some data'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('does not propagates mouseDown from link', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <a href="#something">some link</a>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('some link'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from inner element inside link', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <a href="#something">
            <span>some text</span>
          </a>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('some text'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from button', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <button type="button">some button</button>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('some button'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from inner element inside button', () => {
    const { getByLabelText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <button type="button">
            <svg aria-label="the svg" />
          </button>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByLabelText('the svg'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from select and option', () => {
    const { getByText, getByPlaceholderText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <select placeholder="select something">
            <option>the option</option>
          </select>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByPlaceholderText('select something'));
    fireEvent.mouseDown(getByText('the option'));

    expect(elementListener).toHaveBeenCalledTimes(2);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from input', () => {
    const { getByPlaceholderText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <input placeholder="edit me" type="text" />
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByPlaceholderText('edit me'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from textarea', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <textarea defaultValue="text inside text area" />
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('text inside text area'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from video', () => {
    const { getByLabelText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video aria-label="a video" />
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByLabelText('a video'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from Tab', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <Tabs>
            <Tab label="tab 01">
              <div>tab content</div>
            </Tab>
          </Tabs>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('tab 01', { selector: '[role="tab"]' }));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('does not propagates mouseDown from Tab in WidgetTabs', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <WidgetTabs onMouseDown={elementListener}>
          <Tab label="tab 01">
            <Widget>
              <div>content</div>
            </Widget>
          </Tab>
        </WidgetTabs>
      </div>
    );

    fireEvent.mouseDown(getByText('tab 01', { selector: '[role="tab"]' }));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('propagates mouseDown from content in WidgetTabs', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <WidgetTabs onMouseDown={elementListener}>
          <Tab label="tab 01">
            <Widget>
              <div>content</div>
            </Widget>
          </Tab>
        </WidgetTabs>
      </div>
    );

    fireEvent.mouseDown(getByText('content'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('propagates mouseDown from Tab content', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <Tabs>
            <Tab label="tab 01">
              <div>tab content</div>
            </Tab>
          </Tabs>
        </Widget>
      </div>
    );

    fireEvent.mouseDown(getByText('tab content'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });

  it('does not propagates mouseDown from element in portal', () => {
    const { getByText } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={upperListener}>
        <Widget onMouseDown={elementListener}>
          <OverflowMenu iconDescription="overflow trigger">
            <OverflowMenuItem itemText="overflow item" />
          </OverflowMenu>
        </Widget>
      </div>
    );

    fireEvent.click(getByText('overflow trigger'));
    fireEvent.mouseDown(getByText('overflow item'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(0);
  });

  it('propagates mouseDown interactive element is not a child', () => {
    const { getByLabelText } = render(
      <button type="button">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onMouseDown={upperListener}>
          <Widget onMouseDown={elementListener}>
            <svg aria-label="the svg" />
          </Widget>
        </div>
      </button>
    );

    fireEvent.mouseDown(getByLabelText('the svg'));

    expect(elementListener).toHaveBeenCalledTimes(1);
    expect(upperListener).toHaveBeenCalledTimes(1);
  });
});
