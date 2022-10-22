/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';

import { TreeNavigation, TreeNavigationItem } from './TreeNavigation';

describe('TreeNavigation', () => {
  test('should render', () => {
    const { getByTestId } = render(<TreeNavigation />);
    expect(getByTestId('tree-navigation')).toBeInTheDocument();
  });

  test('should render with N items', () => {
    const { getAllByText } = render(
      <TreeNavigation>
        <TreeNavigationItem label="testLabel" />
        <TreeNavigationItem label="testLabel" />
        <TreeNavigationItem label="testLabel" />
      </TreeNavigation>
    );
    expect(getAllByText('testLabel')).toHaveLength(3);
  });

  test('should render item with expand button', () => {
    const { getByTitle } = render(
      <TreeNavigation>
        <TreeNavigationItem expands label="testLabel" open />
      </TreeNavigation>
    );
    expect(getByTitle('testLabel')).toBeVisible();
  });

  test('should render disabled item', () => {
    const { getByTitle } = render(
      <TreeNavigation>
        <TreeNavigationItem disabled expands label="testLabel" open />
      </TreeNavigation>
    );
    expect(getByTitle('testLabel')).toBeDisabled();
  });
});
