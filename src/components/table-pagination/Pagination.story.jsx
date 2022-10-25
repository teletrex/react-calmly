/* <LICENSE>
 *
 * Copyright (C) 2020 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 * </LICENSE>
 *  */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean, number, text } from '@storybook/addon-knobs';

import Pagination, { PaginationSkeleton } from '.';

const props = () => ({
  disabled: boolean('Disable backward/forward buttons (disabled)', false),
  page: number('The current page (page)', 1),
  totalItems: number('Total number of items (totalItems)', 103),
  pagesUnknown: boolean('Total number of items unknown (pagesUnknown)', false),
  pageInputDisabled: boolean('Disable page input (pageInputDisabled)', false),
  backwardText: text('The description for the backward icon (backwardText)', 'Previous page'),
  forwardText: text('The description for the backward icon (forwardText)', 'Next page'),
  pageSize: number('Number of items per page (pageSize)', 10),
  pageSizes: array('Choices of `pageSize` (pageSizes)', [10, 20, 30, 40, 50]),
  itemsPerPageText: text('Label for `pageSizes` select UI (itemsPerPageText)', 'Items per page:'),
  simple: boolean('Enable/disable simple view', false),
  unbound: boolean('Enable/disable unbound view', false),
  onChange: action('onChange'),
});

storiesOf('Atoms/Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ maxWidth: '1030px' }}>{story()}</div>)
  .add('Pagination', () => <Pagination {...props()} />, {
    info: {
      text: `
            The pagination component is used to switch through multiple pages of items, when only a maxium number of items can be displayed per page. Can be used in combination with other components like DataTable.
          `,
    },
    'in-dsm': {
      id: '5fa0dec3a77395d86bf5c321',
    },
  })
  .add(
    '↪︎ multiple Pagination components',
    () => {
      return (
        <div>
          <Pagination {...props()} />
          <Pagination {...props()} />
        </div>
      );
    },
    {
      info: {
        text: `Showcasing unique ids for each pagination component`,
      },
    }
  )
  .add('pagination skeleton', () => <PaginationSkeleton />, {
    info: {
      text: `Drawing pagination skeleton while pagination is loading`,
    },
  });
