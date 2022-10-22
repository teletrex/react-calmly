/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';
import settings  from '../../settings';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';

import BreadcrumbTemplate from './BreadcrumbTemplate';

describe('BreadcrumbTemplate', () => {
  const { prefix } = settings;

  test('verify if created', () => {
    const { container } = render(<BreadcrumbTemplate />);

    expect(container.querySelector(`.${prefix}--breadcrumbs-template`)).toBeInTheDocument();
  });

  test('should render with breadcrumbs', () => {
    const Breadcrumbs = () => (
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem href="#">Breadcrumb Test</BreadcrumbItem>
      </Breadcrumb>
    );
    const { queryAllByText } = render(<BreadcrumbTemplate breadcrumbs={<Breadcrumbs />} />);

    expect(queryAllByText('Breadcrumb Test')).toHaveLength(1);
  });
});
