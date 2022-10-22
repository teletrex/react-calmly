/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { Tab } from '@carbon/react';

import { WidgetTabs, WidgetContent, Widget } from './index';

describe('WidgetGroup', () => {
  it('renders tabs', () => {
    const { getByText, getByRole } = render(
      <WidgetTabs>
        <Tab label="Tab 1">
          <Widget title="Widget 01">
            <WidgetContent>
              <span>Content tab 1</span>
            </WidgetContent>
          </Widget>
        </Tab>
      </WidgetTabs>
    );
    expect(getByRole('tab')).toBeInTheDocument();
    expect(getByRole('tab').textContent).toBe('Tab 1');
    expect(getByText('Widget 01')).toBeInTheDocument();
    expect(getByText('Content tab 1')).toBeInTheDocument();
  });
});
