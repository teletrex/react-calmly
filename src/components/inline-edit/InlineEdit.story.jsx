/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { withKnobs, boolean, text, select, number } from '@storybook/addon-knobs';
import noop from 'lodash/noop';

import mdx from './InlineEdit.mdx';

import InlineEdit from '.';

export default {
  title: 'Components/InlineEdit',
  component: InlineEdit,
  decorators: [withKnobs, story => <div style={{ width: 600 }}>{story()}</div>],
  parameters: {
    chromatic: { disable: false },
    docs: { page: mdx },
    info: { disable: true },
    'in-dsm': { id: '5fa0ddf8209dd2440c6ab305' },
  },
};

export const Default = () => <InlineEdit id="inline-edit-1" />;

export const WithConfigurableSize = () => {
  const props = {
    isLoading: boolean('Show skeleton', false),
  };

  return (
    <>
      <InlineEdit
        domProps={{
          style: { height: '30px', width: '200px', fontSize: '18px' },
        }}
        id="inline-edit-2"
        {...props}
      />
      <InlineEdit
        domProps={{
          style: { width: '300px' },
        }}
        id="inline-edit-3"
        {...props}
      />
      <InlineEdit
        domProps={{
          style: { height: '40px', width: '400px', fontSize: '22px' },
        }}
        id="inline-edit-4"
        {...props}
      />
      <InlineEdit
        domProps={{
          style: { height: '50px', width: '500px', fontSize: '26px' },
        }}
        id="inline-edit-5"
        {...props}
      />
    </>
  );
};

export const ControlledValueAndValidation = () => {
  const Example = () => {
    const [val, setVal] = React.useState('');
    const [hasError, setHasError] = React.useState(false);
    const isBad = val === 'bad';
    return (
      <>
        <InlineEdit
          id="inline-edit-6"
          invalid={isBad}
          invalidText={isBad ? 'You cannot enter this value.' : ''}
          maxLength={10}
          minLength={2}
          onChange={setVal}
          onInputChange={hasError ? setVal : noop}
          onValidationChange={setHasError}
          value={val}
        />
        <br />
        Does InlineEdit have an error: {`${hasError}`}
      </>
    );
  };
  return <Example />;
};

ControlledValueAndValidation.parameters = {
  chromatic: { disable: true },
};

export const Skeleton = () => <InlineEdit id="inline-edit-6" isLoading />;

export const Playground = () => {
  const inputType = select('Field format', { text: 'text', number: 'number' }, 'text');

  const numberTypeProps =
    inputType === 'number'
      ? {
          range: {
            minNumber: number('Min number', 0),
            maxNumber: number('Max number', 100),
          },
          rangeErrorMessage: text('Error message when value is out of min/max number range', ''),
        }
      : {};

  const props = {
    id: 'inline-edit-1',
    invalid: boolean('Show form validation UI (invalid)', false),
    invalidText: text('Form validation UI content (invalidText)', 'A valid value is required'),
    placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
    inputType,
    ...numberTypeProps,
    required: boolean('Field is required (required)', false),
    requiredErrorMessage: text('Required field error message (requiredErrorMessage)', ''),
    pattern:
      text('Specify allowed characters(regular expression)', '') ||
      select('Allowed characters', {
        All: null,
        'Only latin alphabet': /^[a-z]*$/i,
        'Only numbers': /^\d*$/,
      }),
    patternErrorMessage: text(
      'Error message when value contains not allowed characters (patternErrorMessage)'
    ),
    minLength: number('Minimum length (minLength)'),
    minLengthErrorMessage: text('Minimum length error message (minLengthErrorMessage)'),
    maxLength: number('Maximum length (maxLength)', 100),
    maxLengthErrorMessage: text('Maximum length error message (maxLengthErrorMessage)'),
  };

  return <InlineEdit id="inline-edit-7" {...props} />;
};

Playground.parameters = {
  chromatic: { disable: true },
};
