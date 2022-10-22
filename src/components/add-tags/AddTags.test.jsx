/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AddTags from './AddTags';

const DEFAULT_INPUT_PLACEHOLDER = 'Use commas for multiple tags';

describe('AddTags default', () => {
  let props;

  beforeEach(() => {
    props = {
      onDelete: jest.fn(),
      onInputChange: jest.fn(),
      onAddTag: jest.fn(),
      tags: [],
      suggestions: [],
      id: 'add-tags',
    };
  });

  it('should add a new tag', () => {
    const initialTag = 'marketing';
    const newTag = 'abc';

    const { getByPlaceholderText, getByText } = render(<AddTags {...props} tags={[initialTag]} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: newTag } });
    fireEvent.click(addButton);

    expect(props.onAddTag).toHaveBeenCalledWith([initialTag, newTag]);
  });

  it('should add two tags separated by a comma', () => {
    const { getByPlaceholderText, getByText } = render(<AddTags {...props} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: 'abc,aaa' } });
    fireEvent.click(addButton);

    expect(props.onAddTag).toHaveBeenCalledWith(['abc', 'aaa']);
  });

  it('should render tags', () => {
    const initialTags = ['marketing', 'banner', 'social media'];
    const { getByText } = render(<AddTags {...props} tags={initialTags} />);

    expect(getByText(initialTags[0])).toBeInTheDocument();
    expect(getByText(initialTags[1])).toBeInTheDocument();
    expect(getByText(initialTags[2])).toBeInTheDocument();
  });

  it('should properly remove a tag', () => {
    const tags = ['marketing', 'market'];
    const { getAllByTitle } = render(<AddTags {...props} tags={tags} />);
    const buttons = getAllByTitle('Remove');

    fireEvent.click(buttons[0]);

    expect(props.onDelete).toHaveBeenCalledWith(['market'], 'marketing', 0);
  });

  it('should not add an empty tag', () => {
    const { getByPlaceholderText, getByText } = render(<AddTags {...props} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);

    expect(props.onAddTag).not.toHaveBeenCalled();
  });

  it('should not add empty tags when provided with a comma-separated value', () => {
    const { getByPlaceholderText, getByText } = render(<AddTags {...props} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: 'abc,,' } });
    fireEvent.click(addButton);

    expect(props.onAddTag).toHaveBeenCalledWith(['abc']);
  });

  it('should verify that a tag is already added', () => {
    const existingTag = 'marketing';
    const { getByPlaceholderText, getByText } = render(<AddTags {...props} tags={[existingTag]} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);

    fireEvent.change(input, { target: { value: existingTag } });

    expect(getByText('This tag already exists')).toBeInTheDocument();
  });

  it('should not add an existing tag', () => {
    const existingTag = 'abc';
    const { getByPlaceholderText, getByText } = render(<AddTags {...props} tags={[existingTag]} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: existingTag } });
    fireEvent.click(addButton);

    expect(props.onAddTag).toHaveBeenCalledTimes(0);
  });

  it('should not add duplicated tags', () => {
    const { getByPlaceholderText, getByText } = render(<AddTags {...props} />);
    const input = getByPlaceholderText(DEFAULT_INPUT_PLACEHOLDER);
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: 'abc,abc,aa,aa' } });
    fireEvent.click(addButton);

    expect(props.onAddTag).toHaveBeenCalledWith(['abc', 'aa']);
  });

  it('should focus input after clicking the add tag button', () => {
    const { getByText } = render(<AddTags inline {...props} />);

    expect(document.activeElement.type).toBeUndefined();
    fireEvent.click(getByText('+ Add tag'));
    expect(document.activeElement.type).toEqual('text');
  });

  it('should not split tags when tag splitting is disabled', () => {
    const unsplittableTag = 'a,b,c';
    const { getByPlaceholderText, getByText } = render(
      <AddTags {...props} allowTagSplitting={false} />
    );
    const input = getByPlaceholderText('Enter tag');
    const addButton = getByText('Add');

    fireEvent.change(input, { target: { value: unsplittableTag } });
    fireEvent.click(addButton);

    expect(props.onAddTag).toHaveBeenCalledWith([unsplittableTag]);
  });

  it('should set alternative placeholder when tag splitting is disabled', () => {
    const { getByPlaceholderText } = render(<AddTags {...props} allowTagSplitting={false} />);
    expect(getByPlaceholderText('Enter tag')).toBeInTheDocument();
  });

  it('should set a custom placeholder', () => {
    const { getByPlaceholderText } = render(<AddTags {...props} placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('should set a custom placeholder when tag splitting is disabled', () => {
    const { getByPlaceholderText } = render(
      <AddTags {...props} allowTagSplitting={false} placeholder="Test placeholder" />
    );
    expect(getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });
});
