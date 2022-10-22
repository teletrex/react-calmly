/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { getSVGSizeProps } from './utils';

describe('getSVGSizeProps', () => {
  test('returns width and height equals to size', () => {
    const result = getSVGSizeProps(200);
    expect(result).toStrictEqual({
      width: 200,
      height: 200,
    });
  });

  test('height overides size', () => {
    const result = getSVGSizeProps(200, 300);
    expect(result).toStrictEqual({
      width: 200,
      height: 300,
    });
  });

  test('width overides size', () => {
    const result = getSVGSizeProps(200, undefined, 400);
    expect(result).toStrictEqual({
      width: 400,
      height: 200,
    });
  });

  test('returns only height if only height is given', () => {
    const result = getSVGSizeProps(undefined, '100%', undefined);
    expect(result).toStrictEqual({
      height: '100%',
    });
  });

  test('returns only width if only width is given', () => {
    const result = getSVGSizeProps(undefined, undefined, '1rem');
    expect(result).toStrictEqual({
      width: '1rem',
    });
  });

  test('returns height and width', () => {
    const result = getSVGSizeProps(undefined, 150, '1rem');
    expect(result).toStrictEqual({
      width: '1rem',
      height: 150,
    });
  });

  test('returns empty object by default', () => {
    const result = getSVGSizeProps();
    expect(result).toStrictEqual({});
  });
});
