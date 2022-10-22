/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { ProgressIndicator, ProgressStep, ProgressIndicatorSkeleton } from './index';

const defaultStepProps = [
  {
    description: 'Step 1: Getting started with Carbon Design System',
    label: 'First step',
    secondaryLabel: 'Optional label',
    index: 0,
  },
  {
    description: 'Step 2: Getting started with Carbon Design System',
    label: 'Second step with tooltip',
    invalidWarning: true,
    index: 1,
  },
  {
    description: 'Step 3: Getting started with Carbon Design System',
    label: 'Third step with tooltip',
    index: 2,
  },
  {
    description: 'Step 4: Getting started with Carbon Design System',
    invalid: true,
    label: 'Fourth step',
    secondaryLabel: 'Example invalid step',
    index: 3,
  },
  {
    description: 'Step 5: Getting started with Carbon Design System',
    completed: true,
    label: 'Fifth step',
    secondaryLabel: 'Example completed step',
    index: 4,
  },
  {
    description: 'Step 6: Getting started with Carbon Design System',
    disabled: true,
    label: 'Sixth step with a long long long long text',
    index: 5,
  },
];

export default {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  parameters: { chromatic: { disable: false } },
};

export const Default = () => (
  <ProgressIndicator currentIndex={2} vertical={boolean('Vertical (vertical)', true)}>
    {defaultStepProps.map((props, index) => (
      <ProgressStep
        {...props}
        key={index}
        interactive={boolean('Steps interactive (ProgressStep interactive)', false)}
      />
    ))}
  </ProgressIndicator>
);

Default.parameters = {
  info: {
    text: `
        For React usage, ProgressIndicator holds the currentIndex state to indicate which ProgressStep is the current step. The ProgressIndicator component should always be used with ProgressStep components as its children. Changing currentIndex prop will automatically set the ProgressStep components props (complete, incomplete, current).
        For general usage, Progress Indicators display steps in a process. It should indicate when steps have been complete, the active step,
        and the steps to come.
      `,
  },
  'in-dsm': {
    id: '5fa0def7da3f946c846aad60',
  },
};

export const Skeleton = () => <ProgressIndicatorSkeleton />;
