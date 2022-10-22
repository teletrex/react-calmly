/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { WidgetGroup } from './index';

describe('WidgetGroup', () => {
  it('renders title', () => {
    const { getByText } = render(<WidgetGroup title="the title" />);
    expect(getByText('the title')).toBeInTheDocument();
  });

  it('renders if onClick is present', () => {
    const { getByText } = render(<WidgetGroup onClick={() => {}} />);
    expect(getByText('Add widget')).toBeInTheDocument();
  });

  it('renders if renderButton is present', () => {
    const { getByText } = render(
      <WidgetGroup renderButton={() => <button type="button">custom button</button>} />
    );
    expect(getByText('custom button')).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    const { getByText } = render(<WidgetGroup buttonText="custom text" onClick={() => {}} />);
    expect(getByText('custom text')).toBeInTheDocument();
  });
});
