import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import noop from 'lodash/noop';

import { ExtendedPagination } from './ExtendedPagination';

describe('ExtendedPagination', () => {
  describe('page selection', () => {
    const props = {
      pageSizes: [10],
      pageSize: 10,
      totalItems: 10000,
      onChange: noop,
    };

    it.each`
      page    | path           | toBe          | notToBe
      ${1}    | ${[1]}         | ${[100]}      | ${[101, 999]}
      ${30}   | ${[30]}        | ${[100]}      | ${[101, 999]}
      ${50}   | ${[50]}        | ${[100]}      | ${[101, 999]}
      ${70}   | ${[70]}        | ${[20, 120]}  | ${[2, 121, 999]}
      ${930}  | ${[1000, 930]} | ${[880, 980]} | ${[879, 981]}
      ${950}  | ${[1000, 950]} | ${[900]}      | ${[2, 899]}
      ${1000} | ${[1000]}      | ${[900]}      | ${[2, 899]}
    `(
      'should render 1, 1000 and $toBe but not $notToBe for page $page',
      ({ path, toBe, notToBe }) => {
        render(<ExtendedPagination {...props} />);

        path.forEach(page => {
          fireEvent.change(screen.getByTestId('page-select'), { target: { value: page } });
        });

        [1, 1000, ...toBe].forEach(page => expect(screen.getByText(`${page}`)).toBeInTheDocument());
        notToBe.forEach(page => expect(screen.queryByText(`${page}`)).not.toBeInTheDocument());
      }
    );
  });
});
