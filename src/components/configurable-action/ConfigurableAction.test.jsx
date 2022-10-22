/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import settings from '../../settings';

import ConfigurableAction from '.';

const { prefix } = settings;

describe('ConfigurableAction', () => {
  it('should display button using text prop', () => {
    const { getByText } = render(
      <ConfigurableAction actionKey="testAction" text="button inner text" />
    );

    expect(getByText('button inner text')).toBeInTheDocument();
  });

  it('should display button using children prop', () => {
    const { getByText } = render(
      <ConfigurableAction actionKey="testAction">button inner text</ConfigurableAction>
    );

    expect(getByText('button inner text')).toBeInTheDocument();
  });

  it('renders button as ghost by defaul when no text is given', () => {
    const { getByLabelText } = render(
      <ConfigurableAction actionKey="testAction" aria-label="button-aria" />
    );

    expect(getByLabelText('button-aria')).toHaveClass(`${prefix}--btn--ghost`);
  });

  it('renders button as icon only by defaul when no text is given', () => {
    const { getByLabelText } = render(
      <ConfigurableAction actionKey="testAction" aria-label="button-aria" />
    );

    expect(getByLabelText('button-aria')).toHaveClass(`${prefix}--btn--icon-only`);
  });

  it('renders normal primary button when there is text', () => {
    const { getByText } = render(<ConfigurableAction actionKey="testAction" text="button-text" />);

    expect(getByText('button-text')).not.toHaveClass(`${prefix}--btn--icon-only`);
    expect(getByText('button-text')).toHaveClass(`${prefix}--btn--primary`);
  });

  describe('events', () => {
    it('fires onClick event', () => {
      const onClick = jest.fn();
      const { getByText } = render(
        <ConfigurableAction actionKey="testAction" onClick={onClick} text="button inner text" />
      );
      fireEvent.click(getByText('button inner text'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onAction', () => {
      const onAction = jest.fn();
      const { getByText } = render(
        <ConfigurableAction
          actionKey="action-key"
          iconDescription="icon description"
          id="action-id"
          onAction={onAction}
          text="button inner text"
        />
      );
      fireEvent.click(getByText('button inner text'));
      expect(onAction).toHaveBeenCalledWith('action-key', expect.anything());
    });
  });
});
