/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { renderHook, act } from '@testing-library/react-hooks';

import { useResizeObserver } from '../utils/hooks/use-resize-observer';

import useWidgetGrid from './useWidgetGrid';

jest.mock('../utils/hooks/use-resize-observer', () => ({
  useResizeObserver: jest.fn(() => ({
    setElement: () => {},
    contentRect: {
      width: 1000,
    },
  })),
}));

const mockWidth = width => {
  useResizeObserver.mockImplementationOnce(() => ({
    setElement: () => {},
    contentRect: {
      width,
    },
  }));
};

describe('useWidgetGrid', () => {
  it('works with no parameters', () => {
    const { result } = renderHook(props => useWidgetGrid(props), { initialProps: {} });

    expect(result.current.layouts).toStrictEqual({
      lg: [],
      md: [],
    });
  });

  it('works controlled or uncontrolled', () => {
    const { result, rerender } = renderHook(props => useWidgetGrid(props), {
      initialProps: {
        layouts: {
          lg: [{ i: 'a', w: 3 }],
        },
      },
    });

    // returns enforcedLayout from layouts on props
    expect(result.current.layouts).toStrictEqual({
      lg: [expect.objectContaining({ i: 'a', w: 3 })],
      md: [],
    });

    // simulate a internal layout change
    act(() => {
      result.current.onLayoutChange([{ i: 'b', w: 2 }], {
        lg: [{ i: 'b', w: 2 }],
        md: [],
      });
    });

    // returns enforcedLayout from internal layout change
    expect(result.current.layouts).toStrictEqual({
      lg: [{ i: 'b', w: 2 }],
      md: [],
    });

    // re-render hook with different layout
    rerender({
      layouts: {
        lg: [{ i: 'c', w: 4 }],
      },
    });

    // returns enforcedLayout from the newly given layouts on props
    // ignoring previous layout that was internally changed
    expect(result.current.layouts).toStrictEqual({
      lg: [expect.objectContaining({ i: 'c', w: 4 })],
      md: [],
    });
  });

  it('calls onLayoutChange when there is internal layout change', () => {
    const onLayoutChangeCB = jest.fn();

    const { result } = renderHook(props => useWidgetGrid(props), {
      initialProps: {
        layouts: {
          lg: [{ i: 'a', w: 3 }],
        },
        onLayoutChange: onLayoutChangeCB,
      },
    });

    // simulate a internal layout change
    act(() => {
      result.current.onLayoutChange([{ i: 'b', w: 2 }], {
        lg: [{ i: 'b', w: 2 }],
        md: [],
      });
    });

    expect(onLayoutChangeCB).toHaveBeenCalledTimes(1);
    expect(onLayoutChangeCB).toHaveBeenCalledWith([{ i: 'b', w: 2 }], {
      lg: [{ i: 'b', w: 2 }],
      md: [],
    });
  });

  it('does not update internal layouts if onLayoutChange contains droppable placeholder', () => {
    const onLayoutChangeCB = jest.fn();

    const { result } = renderHook(props => useWidgetGrid(props), {
      initialProps: {
        layouts: {
          lg: [{ i: 'a', w: 3 }],
        },
        onLayoutChange: onLayoutChangeCB,
        droppingItem: { i: '__dropping_element__' },
      },
    });

    const previousLayouts = result.current.layouts;

    // simulate a internal layout change
    act(() => {
      result.current.onLayoutChange([{ i: '__dropping_element__', w: 2 }], {
        lg: [{ i: '__dropping_element__', w: 2 }],
        md: [],
      });
    });

    expect(onLayoutChangeCB).toHaveBeenCalledTimes(1);
    expect(onLayoutChangeCB).toHaveBeenCalledWith([{ i: '__dropping_element__', w: 2 }], {
      lg: [{ i: '__dropping_element__', w: 2 }],
      md: [],
    });

    expect(result.current.layouts).toEqual(previousLayouts);
  });

  describe('fromDropToLayoutItem', () => {
    it('Adds new element returned from fromDropToLayoutItem', () => {
      const fromDropToLayoutItem = jest.fn(() => ({ i: 'new_id' }));

      const { result } = renderHook(props => useWidgetGrid(props), {
        initialProps: {
          layouts: {
            lg: [{ i: 'a', w: 2, h: 1, x: 0, y: 0 }],
          },
          fromDropToLayoutItem,
          droppingItem: { i: '__dropping_element__' },
        },
      });

      act(() => {
        result.current.onDrop(
          [
            { i: 'a', w: 2, h: 1, x: 0, y: 1 },
            { i: '__dropping_element__', w: 2, h: 1, x: 0, y: 0 },
          ],
          { i: '__dropping_element__', w: 2, h: 1, x: 0, y: 0 },
          {}
        );
      });

      expect(result.current.layouts).toStrictEqual({
        lg: [
          expect.objectContaining({ i: 'a', w: 2, h: 1, x: 0, y: 1 }),
          expect.objectContaining({ i: 'new_id', w: 2, h: 1, x: 0, y: 0 }),
        ],
        md: [],
      });
    });

    it('ignores fromDropToLayoutItem returned w, h, x and y', () => {
      const fromDropToLayoutItem = jest.fn(() => ({ i: 'new_id', w: 3, h: 3, x: 3, y: 3 }));

      const { result } = renderHook(props => useWidgetGrid(props), {
        initialProps: {
          layouts: {
            lg: [{ i: 'a', w: 2, h: 1, x: 0, y: 0 }],
          },
          fromDropToLayoutItem,
          droppingItem: { i: '__dropping_element__' },
        },
      });

      act(() => {
        result.current.onDrop(
          [
            { i: 'a', w: 2, h: 1, x: 0, y: 1 },
            { i: '__dropping_element__', w: 2, h: 1, x: 0, y: 0 },
          ],
          { i: '__dropping_element__', w: 2, h: 1, x: 0, y: 0 },
          {}
        );
      });

      expect(result.current.layouts).toStrictEqual({
        lg: [
          expect.objectContaining({ i: 'a', w: 2, h: 1, x: 0, y: 1 }),
          expect.objectContaining({ i: 'new_id', w: 2, h: 1, x: 0, y: 0 }),
        ],
        md: [],
      });
    });

    it('ignores fromDropToLayoutItem if returning something other than obj', () => {
      const fromDropToLayoutItem = jest.fn(() => null);

      const { result } = renderHook(props => useWidgetGrid(props), {
        initialProps: {
          layouts: {
            lg: [{ i: 'a', w: 2, h: 1, x: 0, y: 0 }],
          },
          fromDropToLayoutItem,
          droppingItem: { i: '__dropping_element__' },
        },
      });

      act(() => {
        result.current.onDrop(
          [
            { i: 'a', w: 2, h: 1, x: 0, y: 1 },
            { i: '__dropping_element__', w: 2, h: 1, x: 0, y: 0 },
          ],
          { i: '__dropping_element__', w: 2, h: 1, x: 0, y: 0 },
          {}
        );
      });

      expect(result.current.layouts).toStrictEqual({
        lg: [expect.objectContaining({ i: 'a', w: 2, h: 1, x: 0, y: 0 })],
        md: [],
      });
    });
  });

  describe('resize', () => {
    it('calls prevents width of 5 during resize', () => {
      const onResizeCB = jest.fn();

      const { result } = renderHook(props => useWidgetGrid(props), {
        initialProps: {
          layouts: {
            lg: [{ i: 'a', w: 3 }],
          },
          onResize: onResizeCB,
        },
      });

      // simulate a internal layout change
      act(() => {
        result.current.onResize(undefined, { i: 'a', w: 3 }, { i: 'a', w: 5 }, { i: 'a', w: 5 });
      });

      expect(onResizeCB).toHaveBeenCalledTimes(1);
      expect(onResizeCB).toHaveBeenCalledWith(
        undefined,
        { i: 'a', w: 3 },
        { i: 'a', w: 6 },
        { i: 'a', w: 6 }
      );
    });
  });

  describe('getItemProps', () => {
    describe('md layout', () => {
      beforeEach(() => {
        mockWidth(600);
      });
      it('returns empty object if item is defined', () => {
        const { result } = renderHook(props => useWidgetGrid(props), {
          initialProps: {
            layouts: {
              md: [{ i: 'a', w: 3 }],
            },
          },
        });

        expect(result.current.getItemProps('a')).toStrictEqual({});
      });

      it('returns data grid if item is not defined', () => {
        const { result } = renderHook(props => useWidgetGrid(props), {
          initialProps: {
            layouts: {
              md: [],
            },
          },
        });

        expect(result.current.getItemProps('c')).toStrictEqual({
          'data-grid': { h: 1, minW: 2, w: 2, x: 0, y: 1 },
        });
      });
    });
    describe('lg layout', () => {
      it('returns empty object if item is defined', () => {
        const { result } = renderHook(props => useWidgetGrid(props), {
          initialProps: {
            layouts: {
              lg: [{ i: 'a', w: 3 }],
            },
          },
        });

        expect(result.current.getItemProps('a')).toStrictEqual({});
      });

      it('returns data grid if item is not defined', () => {
        const { result } = renderHook(props => useWidgetGrid(props), {
          initialProps: {
            layouts: {
              lg: [],
            },
          },
        });

        expect(result.current.getItemProps('c')).toStrictEqual({
          'data-grid': { h: 1, minW: 2, w: 2, x: 0, y: 1 },
        });
      });
    });
    describe('x and y for undefined items', () => {
      it.each([
        [3, 1, [{ i: 'a', x: 0, y: 0, w: 3, h: 1 }]],
        [0, 1, [{ i: 'a', x: 2, y: 0, w: 3, h: 1 }]],
        [4, 1, [{ i: 'a', x: 2, y: 0, w: 2, h: 1 }]],
        [
          4,
          1,
          [
            { i: 'a', x: 0, y: 0, w: 2, h: 1 },
            { i: 'b', x: 2, y: 0, w: 2, h: 1 },
          ],
        ],
        [
          0,
          3,
          [
            { i: 'a', x: 0, y: 0, w: 2, h: 1 },
            { i: 'b', x: 2, y: 0, w: 4, h: 3 },
          ],
        ],
        [
          2,
          2,
          [
            { i: 'a', x: 0, y: 0, w: 2, h: 2 },
            { i: 'b', x: 2, y: 0, w: 4, h: 1 },
          ],
        ],
        [
          2,
          3,
          [
            { i: 'b', x: 2, y: 0, w: 4, h: 1 },
            { i: 'a', x: 0, y: 0, w: 2, h: 3 },
          ],
        ],
      ])('returns x: %s and y: %s for previous layout %o', (x, y, lg) => {
        const { result } = renderHook(props => useWidgetGrid(props), {
          initialProps: {
            layouts: {
              lg,
            },
          },
        });

        expect(result.current.getItemProps('z')).toStrictEqual({
          'data-grid': expect.objectContaining({ x, y }),
        });
      });
    });
  });
});
