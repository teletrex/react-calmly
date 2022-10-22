/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { generateOptions } from './ColumnFilter.story';

import ColumnFilter from '.';

const defaultProps = {
  options: [
    { text: 'Option 1', checked: true, value: 1 },
    { text: 'Option 2', checked: false, value: 2 },
    { text: 'Option 3', checked: false, value: 3, resultsCount: 10 },
  ],
  title: 'Filter by tags',
  subtitle: 'Tags',
  searchFieldPlaceholder: 'Find tags',
  onApply: jest.fn(),
  onReset: jest.fn(),
  overflowMenuProps: {
    ariaLabel: 'Show filters',
  },
};

describe('ColumnFilter', () => {
  it('should render', () => {
    const { queryByRole, queryByText, queryAllByLabelText } = render(
      <ColumnFilter {...defaultProps} />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    expect(queryByText('Filter by tags')).toBeInTheDocument();
    expect(queryByText('Tags')).toBeInTheDocument();
    expect(queryByRole('button', { name: 'Remove Option 1' })).toBeInTheDocument();
    expect(queryAllByLabelText(/^Option \d/)).toHaveLength(3);
    expect(queryByText('10')).toBeInTheDocument();
  });

  it('should show "show more" button if more than 10 options', () => {
    const { queryByRole } = render(
      <ColumnFilter {...defaultProps} options={generateOptions(200)} />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    expect(document.querySelectorAll('.bx--column-filter__option')).toHaveLength(10);

    const showMoreButton = queryByRole('button', { name: 'Show more' });

    fireEvent.click(showMoreButton);

    expect(document.querySelectorAll('.bx--column-filter__option')).toHaveLength(110);

    fireEvent.click(showMoreButton);

    expect(document.querySelectorAll('.bx--column-filter__option')).toHaveLength(200);
    expect(showMoreButton).not.toBeInTheDocument();
  });

  it('should add and remove tags on filters toggle', () => {
    const { queryByRole, queryByLabelText } = render(<ColumnFilter {...defaultProps} />);

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const option = queryByLabelText('Option 2');

    expect(option.checked).toBe(false);

    fireEvent.click(option);

    expect(option.checked).toBe(true);
    expect(queryByRole('button', { name: 'Remove Option 2' })).toBeInTheDocument();

    fireEvent.click(option);

    expect(option.checked).toBe(false);
    expect(queryByRole('button', { name: 'Remove Option 2' })).not.toBeInTheDocument();
  });

  it('should deselect filter on tag remove', () => {
    const { queryByRole, queryByLabelText } = render(<ColumnFilter {...defaultProps} />);

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const option = queryByLabelText('Option 1');

    expect(option.checked).toBe(true);

    const tagRemoveBtn = queryByRole('button', { name: 'Remove Option 1' });

    fireEvent.click(tagRemoveBtn);

    expect(option.checked).toBe(false);
  });

  it('should search filters', () => {
    const { queryByRole, queryByPlaceholderText, queryAllByLabelText } = render(
      <ColumnFilter {...defaultProps} options={generateOptions(200)} />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const searchInput = queryByPlaceholderText('Find tags');

    fireEvent.change(searchInput, { target: { value: 'Option 2' } });

    expect(queryAllByLabelText(/^Option 2/)).toHaveLength(10);

    const showMoreButton = queryByRole('button', { name: 'Show more' });

    fireEvent.click(showMoreButton);

    expect(queryAllByLabelText(/^Option 2/)).toHaveLength(12);

    fireEvent.change(searchInput, { target: { value: ' ' } });

    expect(queryAllByLabelText(/^Option \d/)).toHaveLength(110);
  });

  it('should reset state to default if overflow is closed', () => {
    const { queryByRole, queryByPlaceholderText, queryAllByLabelText, queryByLabelText } = render(
      <ColumnFilter {...defaultProps} options={generateOptions(200)} />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const option = queryByLabelText('Option 1');
    const searchInput = queryByPlaceholderText('Find tags');
    const showMoreButton = queryByRole('button', { name: 'Show more' });

    fireEvent.click(option);
    fireEvent.change(searchInput, { target: { value: 'Option' } });
    fireEvent.click(showMoreButton);

    expect(option.checked).toBe(true);
    expect(searchInput.value).toBe('Option');
    expect(queryAllByLabelText(/^Option/)).toHaveLength(110);

    fireEvent.click(trigger); // close filter
    fireEvent.click(trigger); // open filter

    expect(queryByLabelText('Option 1').checked).toBe(false);
    expect(queryByPlaceholderText('Find tags').value).toBe('');
    expect(queryAllByLabelText(/^Option/)).toHaveLength(10);
  });

  it('should allow select only one option', () => {
    const { queryByRole, queryByLabelText } = render(
      <ColumnFilter {...defaultProps} singleSelection />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const option1 = queryByLabelText('Option 1');
    const option2 = queryByLabelText('Option 2');

    expect(option1.checked).toBe(true);
    expect(option2.checked).toBe(false);

    fireEvent.click(option2);

    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(true);
  });

  it('should apply changes on "Apply" button click', () => {
    const onApply = jest.fn();
    const { queryByRole, queryByLabelText, queryByText } = render(
      <ColumnFilter {...defaultProps} onApply={onApply} />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const option = queryByLabelText('Option 1');
    const applyButton = queryByRole('button', { name: 'Apply' });

    expect(option.checked).toBe(true);
    expect(applyButton.disabled).toBe(true);

    fireEvent.click(option);

    expect(applyButton.disabled).toBe(false);

    fireEvent.click(option);

    expect(applyButton.disabled).toBe(true);

    fireEvent.click(option);
    fireEvent.click(applyButton);

    expect(onApply).toHaveBeenCalledWith(
      defaultProps.options.map((it, index) => (index === 0 ? { ...it, checked: false } : it))
    );
    expect(queryByText('Filter by tags')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(queryByRole('button', { name: 'Apply' }).disabled).toBe(true);
  });

  it('should reset filters to initial state on "Reset" buton click', () => {
    const onReset = jest.fn();
    const { queryByRole, queryByLabelText } = render(
      <ColumnFilter {...defaultProps} onReset={onReset} />
    );

    const trigger = queryByRole('button', { name: 'Show filters' });

    fireEvent.click(trigger);

    const resetBtn = queryByRole('button', { name: 'Reset' });

    expect(resetBtn.disabled).toBe(true);

    const option = queryByLabelText('Option 1');
    fireEvent.click(option);

    expect(option.checked).toBe(false);
    expect(resetBtn.disabled).toBe(false);

    fireEvent.click(resetBtn);

    expect(onReset).toHaveBeenCalledWith(defaultProps.options);
    expect(option.checked).toBe(true);
    expect(resetBtn.disabled).toBe(true);
    expect(queryByRole('button', { name: 'Apply' }).disabled).toBe(true);
  });
});
