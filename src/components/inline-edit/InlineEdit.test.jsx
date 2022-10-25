/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { keys } from '@carbon/react';

import InlineEdit from '.';

describe('InlineEdit', () => {
  const onCancel = jest.fn();
  const onBlur = jest.fn();
  const onChange = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('verify if created', () => {
    const { getByLabelText } = render(<InlineEdit id="inline-edit-0" />);
    expect(getByLabelText('Inline Edit')).toBeTruthy();
  });

  it('should render action buttons when focused and valid', () => {
    const { getByLabelText, getByText } = render(<InlineEdit id="inline-edit-0" />);

    fireEvent.focus(getByLabelText('Inline Edit'));

    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('should not render action buttons when focused and invalid', () => {
    const { getByLabelText, queryByText } = render(<InlineEdit id="inline-edit-0" invalid />);

    fireEvent.focus(getByLabelText('Inline Edit'));

    expect(queryByText('Cancel')).not.toBeInTheDocument();
    expect(queryByText('Save')).not.toBeInTheDocument();
  });

  it('should reset input after blur', () => {
    const { getByLabelText } = render(
      <InlineEdit id="inline-edit-0" onBlur={onBlur} onCancel={onCancel} />
    );

    const input = getByLabelText('Inline Edit');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Foo value' } });
    fireEvent.blur(input);

    expect(onCancel).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('should reset input after Cancel button click', () => {
    const { getByLabelText, getByText } = render(
      <InlineEdit id="inline-edit-0" onBlur={onBlur} onCancel={onCancel} />
    );

    const input = getByLabelText('Inline Edit');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Foo value' } });
    fireEvent.click(getByText('Cancel'));

    expect(onCancel).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('should reset input after ESC key press', () => {
    const { getByLabelText } = render(
      <InlineEdit id="inline-edit-0" onBlur={onBlur} onCancel={onCancel} />
    );

    const input = getByLabelText('Inline Edit');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Foo value' } });
    fireEvent.keyDown(input, keys.Escape);

    expect(onCancel).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('should save input after Enter key press', () => {
    const { getByLabelText } = render(
      <InlineEdit id="inline-edit-0" onBlur={onBlur} onChange={onChange} />
    );

    const input = getByLabelText('Inline Edit');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Foo value' } });
    fireEvent.keyDown(input, keys.Enter);

    expect(onChange).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(input.value).toBe('Foo value');
  });

  it('should save input after Save button click', () => {
    const { getByLabelText, getByText } = render(
      <InlineEdit id="inline-edit-0" onBlur={onBlur} onChange={onChange} />
    );

    const input = getByLabelText('Inline Edit');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Foo value' } });
    fireEvent.click(getByText('Save'));

    expect(onChange).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(input.value).toBe('Foo value');
  });

  it('should disable Save button for unchanged input', () => {
    const { getByLabelText, getByRole } = render(
      <InlineEdit id="inline-edit-0" value="Foo value" />
    );

    const input = getByLabelText('Inline Edit');
    fireEvent.focus(input);

    expect(getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  describe('validation', () => {
    it('should validate required field', () => {
      const { queryByText, getByLabelText, getByRole } = render(
        <InlineEdit currentMode="edit" id="inline-edit-1" required />
      );
      const inputElement = getByLabelText('Inline Edit');
      fireEvent.focus(inputElement);

      expect(queryByText('Field is required.')).toBe(null);

      const saveButtonElement = getByRole('button', { name: 'Save' });
      fireEvent.click(saveButtonElement);

      expect(queryByText('Field is required.')).toBeTruthy();

      fireEvent.input(inputElement, { target: { value: 'a' } });

      expect(queryByText('Field is required.')).toBe(null);
    });

    it('should allow only numbers if inputType number', () => {
      const { getByLabelText } = render(
        <InlineEdit currentMode="edit" id="inline-edit-1" inputType="number" />
      );

      const inputElement = getByLabelText('Inline Edit');
      fireEvent.input(inputElement, { target: { value: 'a' } });

      expect(inputElement.value).toBe('');
    });

    it('should validate numeric field with range', () => {
      const { queryByText, getByLabelText, getByRole } = render(
        <InlineEdit
          currentMode="edit"
          id="inline-edit-1"
          inputType="number"
          range={{
            maxNumber: 100,
            minNumber: 0,
          }}
        />
      );

      const inputElement = getByLabelText('Inline Edit');
      fireEvent.focus(inputElement);

      fireEvent.input(inputElement, { target: { value: '-1' } });
      fireEvent.click(getByRole('button', { name: 'Save' }));

      expect(queryByText('Value is out of range.')).toBeTruthy();

      fireEvent.input(inputElement, { target: { value: '1' } });

      expect(queryByText('Value is out of range.')).toBe(null);

      fireEvent.input(inputElement, { target: { value: '101' } });
      fireEvent.click(getByRole('button', { name: 'Save' }));

      expect(queryByText('Value is out of range.')).toBeTruthy();
    });

    it('should validate not allowed characters', () => {
      const { queryByText, getByLabelText, getByRole } = render(
        <InlineEdit currentMode="edit" id="inline-edit-1" pattern={/^[a-z]*$/i} />
      );

      const inputElement = getByLabelText('Inline Edit');
      fireEvent.focus(inputElement);

      fireEvent.input(inputElement, { target: { value: '1' } });
      fireEvent.click(getByRole('button', { name: 'Save' }));

      expect(queryByText('Field contains not allowed characters.')).toBeTruthy();

      fireEvent.input(inputElement, { target: { value: 'a' } });

      expect(queryByText('Field contains not allowed characters.')).toBe(null);
    });

    it('should validate minLength', () => {
      const { queryByText, getByLabelText } = render(
        <InlineEdit currentMode="edit" id="inline-edit-1" minLength={2} />
      );

      const inputElement = getByLabelText('Inline Edit');

      userEvent.type(inputElement, 'a{Enter}');

      expect(queryByText('Value must be at least 2 characters.')).toBeTruthy();

      fireEvent.input(inputElement, { target: { value: 'ab' } });

      expect(queryByText('Value must be at least 2 characters.')).toBe(null);

      userEvent.clear(inputElement);
      userEvent.type(inputElement, '{Enter}');

      expect(queryByText('Value must be at least 2 characters.')).toBeTruthy();
    });

    it('should display combined message if many errors', () => {
      const { queryByText, getByLabelText } = render(
        <InlineEdit
          currentMode="edit"
          id="inline-edit-1"
          invalid
          invalidText="Custom error message."
          minLength={2}
          pattern={/^[a-z]*$/i}
        />
      );
      const inputElement = getByLabelText('Inline Edit');

      fireEvent.input(inputElement, { target: { value: '1' } });

      expect(
        queryByText(
          'Custom error message. Field contains not allowed characters. Value must be at least 2 characters.'
        )
      ).toBeTruthy();

      fireEvent.input(inputElement, { target: { value: 'a' } });

      expect(
        queryByText('Custom error message. Value must be at least 2 characters.')
      ).toBeTruthy();

      fireEvent.input(inputElement, { target: { value: 'ab' } });

      expect(queryByText('Custom error message.')).toBeTruthy();
    });
  });
});
