/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render } from '@testing-library/react';

import { mockGetBoundingClientRect } from '../../utils/test-helpers/html-element-mocks';

import EllipsisAxisTick from './EllipsisAxisTick';

describe('EllipsisAxisTick', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 10 });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const getDefaultProps = overrides => ({
    fontSize: 11,
    lineHeight: '1em',
    textAnchor: 'end',
    scaleToFit: false,
    width: 50,
    maxLines: 1,
    ...overrides,
  });

  const labels = [['2019 Q1'], [undefined], [null], [150000000]];

  test.each(labels)('verify if created when the value is %p', value => {
    const { container } = render(
      <svg>
        <EllipsisAxisTick {...getDefaultProps({ payload: { value } })} />
      </svg>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('verify if label is given ellipsis if it is longer then width', () => {
    const { container } = render(
      <svg>
        <EllipsisAxisTick
          {...getDefaultProps({
            payload: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
          })}
        />
      </svg>
    );

    const axisLabelValue = container.querySelector('tspan').textContent;

    expect(axisLabelValue).toBe('Lorem ipsum…');
  });

  test('verify if label is formatted by tickFormatter', () => {
    const { container } = render(
      <svg>
        <EllipsisAxisTick
          {...getDefaultProps({
            payload: { value: 10000 },
            tickFormatter: value => `${value}$`,
          })}
        />
      </svg>
    );

    const axisLabelValue = container.querySelector('tspan').textContent;

    expect(axisLabelValue).toBe('10000$');
  });
});
