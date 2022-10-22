/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { getEnforcedLayouts, enforceResizeRules } from './layoutRules';

describe('getEnforcedLayouts', () => {
  it('returns empty layout', () => {
    const result = getEnforcedLayouts();

    expect(result).toStrictEqual({
      lg: [],
      md: [],
    });
  });

  describe('default item values', () => {
    it('returns all defaults when no property is given', () => {
      const result = getEnforcedLayouts({
        lg: [{ i: 'a' }],
      });

      expect(result).toStrictEqual({
        lg: [
          {
            i: 'a',
            h: 1,
            maxH: 4,
            minW: 2,
            w: 2,
            x: 0,
            y: 0,
          },
        ],
        md: [],
      });
    });

    it.each([
      [
        'x',
        'lg',
        { lg: [{ i: 'a', x: 1 }] },
        {
          lg: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 2,
              w: 2,
              x: 1,
              y: 0,
            },
          ],
          md: [],
        },
      ],
      [
        'y',
        'lg',
        { lg: [{ i: 'a', y: 1 }] },
        {
          lg: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 2,
              w: 2,
              x: 0,
              y: 1,
            },
          ],
          md: [],
        },
      ],
      [
        'w',
        'lg',
        { lg: [{ i: 'a', w: 3 }] },
        {
          lg: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 2,
              w: 3,
              x: 0,
              y: 0,
            },
          ],
          md: [],
        },
      ],
      [
        'h',
        'lg',
        { lg: [{ i: 'a', h: 1 }] },
        {
          lg: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 2,
              w: 2,
              x: 0,
              y: 0,
            },
          ],
          md: [],
        },
      ],
      [
        'minW',
        'lg',
        { lg: [{ i: 'a', minW: 3 }] },
        {
          lg: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 3,
              w: 2,
              x: 0,
              y: 0,
            },
          ],
          md: [],
        },
      ],
      [
        'maxH',
        'lg',
        { lg: [{ i: 'a', maxH: 1 }] },
        {
          lg: [
            {
              i: 'a',
              h: 1,
              maxH: 1,
              minW: 2,
              w: 2,
              x: 0,
              y: 0,
            },
          ],
          md: [],
        },
      ],
      [
        'y',
        'md',
        { md: [{ i: 'a', y: 1 }] },
        {
          md: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 2,
              w: 2,
              x: 0,
              y: 1,
            },
          ],
          lg: [],
        },
      ],
      [
        'h',
        'md',
        { md: [{ i: 'a', h: 1 }] },
        {
          md: [
            {
              i: 'a',
              h: 1,
              maxH: 4,
              minW: 2,
              w: 2,
              x: 0,
              y: 0,
            },
          ],
          lg: [],
        },
      ],
      [
        'maxH',
        'md',
        { md: [{ i: 'a', maxH: 1 }] },
        {
          md: [
            {
              i: 'a',
              h: 1,
              maxH: 1,
              minW: 2,
              w: 2,
              x: 0,
              y: 0,
            },
          ],
          lg: [],
        },
      ],
    ])(
      'returns all defaults without overriding %s on layout %s',
      (_property, _layout, input, expected) => {
        const result = getEnforcedLayouts(input);

        expect(result).toStrictEqual(expected);
      }
    );
  });

  describe('min and max values', () => {
    it('prevents height to be lower than 1', () => {
      const result = getEnforcedLayouts({ lg: [{ i: 'a', h: 0 }], md: [{ i: 'a', h: 0 }] });

      expect(result.lg[0]).toHaveProperty('h', 1);
      expect(result.md[0]).toHaveProperty('h', 1);
    });
    it('prevents height to be bigger than 4', () => {
      const result = getEnforcedLayouts({ lg: [{ i: 'a', h: 5 }], md: [{ i: 'a', h: 5 }] });

      expect(result.lg[0]).toHaveProperty('h', 4);
      expect(result.md[0]).toHaveProperty('h', 4);
    });

    it('prevents width to be lower than 2', () => {
      const result = getEnforcedLayouts({ lg: [{ i: 'a', w: 1 }], md: [{ i: 'a', w: 1 }] });

      expect(result.lg[0]).toHaveProperty('w', 2);
      expect(result.md[0]).toHaveProperty('w', 2);
    });

    it('prevents width to be bigger than 6', () => {
      const result = getEnforcedLayouts({ lg: [{ i: 'a', w: 7 }], md: [{ i: 'a', w: 7 }] });

      expect(result.lg[0]).toHaveProperty('w', 6);
      expect(result.md[0]).toHaveProperty('w', 6);
    });
  });

  describe('lg layout', () => {
    it('changes w 5 to 4', () => {
      const result = getEnforcedLayouts({ lg: [{ i: 'a', w: 5 }] });

      expect(result.lg[0]).toHaveProperty('w', 4);
    });
  });
});

describe('enforceResizeRules', () => {
  describe('when layoutItem width is 5', () => {
    let oldLayoutItem;
    let layoutItem;
    let placeholder;

    beforeEach(() => {
      oldLayoutItem = { i: 'a', w: 2, h: 1, x: 0, y: 0 };
      layoutItem = { i: 'a', w: 5, h: 1, x: 0, y: 0 };
      placeholder = { i: 'a', w: 5, h: 1, x: 0, y: 0 };
    });

    it('does not mutate oldLayoutItem', () => {
      enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

      expect(oldLayoutItem).toStrictEqual({
        i: 'a',
        w: 2,
        h: 1,
        x: 0,
        y: 0,
      });
    });

    describe('when oldLayoutItem width is lower than 5', () => {
      it('mutates layoutItem.w to 6', () => {
        enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

        expect(layoutItem).toStrictEqual({
          i: 'a',
          w: 6,
          h: 1,
          x: 0,
          y: 0,
        });
      });

      it('mutates placeholder.w to 6', () => {
        enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

        expect(placeholder).toStrictEqual({
          i: 'a',
          w: 6,
          h: 1,
          x: 0,
          y: 0,
        });
      });
    });

    describe('when oldLayoutItem width is bigger than 5', () => {
      beforeEach(() => {
        oldLayoutItem.w = 6;
      });

      it('mutates layoutItem.w to 4', () => {
        enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

        expect(layoutItem).toStrictEqual({
          i: 'a',
          w: 4,
          h: 1,
          x: 0,
          y: 0,
        });
      });

      it('mutates placeholder.w to 4', () => {
        enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

        expect(placeholder).toStrictEqual({
          i: 'a',
          w: 4,
          h: 1,
          x: 0,
          y: 0,
        });
      });
    });

    it('does not mutate anothing when width is not 5', () => {
      layoutItem = { i: 'a', w: 3, h: 1, x: 0, y: 0 };
      placeholder = { i: 'a', w: 3, h: 1, x: 0, y: 0 };
      enforceResizeRules(oldLayoutItem, layoutItem, placeholder);

      expect(oldLayoutItem).toStrictEqual({ i: 'a', w: 2, h: 1, x: 0, y: 0 });
      expect(layoutItem).toStrictEqual({ i: 'a', w: 3, h: 1, x: 0, y: 0 });
      expect(placeholder).toStrictEqual({ i: 'a', w: 3, h: 1, x: 0, y: 0 });
    });
  });
});
