/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { composeOperators } from './composeOperators';

const OPERATORS = [
  {
    label: 'foo operator',
    value: 'FOO',
  },
  {
    label: 'bar operator',
    value: 'BAR',
  },
  {
    label: 'foobar operator',
    value: 'FOOBAR',
  },
];

describe('composeOperators', () => {
  it('should compose default operators', () => {
    const result = composeOperators(['FOO', 'BAR'], OPERATORS);

    expect(result).toEqual([
      {
        label: 'foo operator',
        value: 'FOO',
      },
      {
        label: 'bar operator',
        value: 'BAR',
      },
    ]);
  });

  it('should compose default operators with custom', () => {
    const result = composeOperators(
      [
        'FOO',
        'BAR',
        {
          label: 'custom operator',
          value: 'CUSTOM_OPERATOR',
        },
      ],
      OPERATORS
    );

    expect(result).toEqual([
      {
        label: 'foo operator',
        value: 'FOO',
      },
      {
        label: 'bar operator',
        value: 'BAR',
      },
      {
        label: 'custom operator',
        value: 'CUSTOM_OPERATOR',
      },
    ]);
  });
});
