/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { text, boolean } from '@storybook/addon-knobs';

import BreadcrumbTemplate from './BreadcrumbTemplate';

const Breadcrumbs = () => (
  <Breadcrumb noTrailingSlash>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#" isCurrentPage>
      Current Page
    </BreadcrumbItem>
  </Breadcrumb>
);

storiesOf('Templates/BreadcrumbTemplate', module).add('default', () => (
  <div
    style={{
      width: text('container-width', '100%'),
      height: text('container-height', '800px'),
      border: '1px dashed #000',
    }}
  >
    <BreadcrumbTemplate breadcrumbs={boolean('show breadcrumbs', true) && <Breadcrumbs />}>
      <div style={{ backgroundColor: '#e4e4e4', height: '100%' }} />
    </BreadcrumbTemplate>
  </div>
));
