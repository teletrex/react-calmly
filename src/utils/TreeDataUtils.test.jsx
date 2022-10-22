/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';
import { render } from '@testing-library/react';

import { filterTreeData, mapTreeData, renderTreeData, withTreeDataItems } from './TreeDataUtils';

describe('TreeDataUtils', () => {
  describe('renderTreeData', () => {
    const treeDataSample = [
      {
        key: 'item1',
        'aria-label': 'item1',
      },
      {
        key: 'item2',
        'aria-label': 'item2',
        children: [
          {
            key: 'item2-nested1',
            'aria-label': 'item2-nested1',
          },
          {
            key: 'item2-nested2',
            'aria-label': 'item2-nested2',
          },
        ],
      },
      {
        key: 'item3',
        'aria-label': 'item3',
      },
    ];

    it('should be safe if no component and/or data', () => {
      const { getByLabelText } = render(
        <div aria-label="root">{renderTreeData(undefined, undefined)}</div>
      );
      expect(getByLabelText('root')).toBeInTheDocument();
    });

    it('should be safe if data is not Array', () => {
      const { getByLabelText } = render(
        <div aria-label="root">{renderTreeData({ itemRenderer: null }, {})}</div>
      );
      expect(getByLabelText('root')).toBeInTheDocument();
    });

    it('should render by default correct', () => {
      const { getByLabelText } = render(
        <div aria-label="root">{renderTreeData({}, treeDataSample)}</div>
      );
      expect(getByLabelText('root')).toBeInTheDocument();
      expect(getByLabelText('item1')).toBeInTheDocument();
      expect(getByLabelText('item2')).toBeInTheDocument();
      expect(getByLabelText('item2-nested1')).toBeInTheDocument();
      expect(getByLabelText('item2-nested2')).toBeInTheDocument();
      expect(getByLabelText('item2-nested1').parentNode === getByLabelText('item2')).toBeTruthy();
      expect(getByLabelText('item2-nested2').parentNode === getByLabelText('item2')).toBeTruthy();
      expect(getByLabelText('item3')).toBeInTheDocument();
    });
  });

  describe('withTreeDataItems ', () => {
    const treeDataSample = [
      {
        key: 'first',
        'aria-label': 'first',
      },
      {
        key: 'withNested',
        'aria-label': 'withNested',
        items: [
          {
            key: 'withNested-nested1',
            'aria-label': 'withNested-nested1',
          },
          {
            key: 'withNested-nested2',
            'aria-label': 'withNested-nested2',
          },
        ],
      },
      {
        key: 'last',
        'aria-label': 'last',
      },
    ];

    it('should be safe if no component and/or data', () => {
      const TreeDataItems = withTreeDataItems();
      const { getByLabelText } = render(
        <div aria-label="root">
          <TreeDataItems data={null} />
        </div>
      );
      expect(getByLabelText('root')).toBeInTheDocument();
    });

    const TreeDataItems = withTreeDataItems({
      itemRenderer: props => <nav {...props} />,
      subItemsPath: 'items',
    });

    it('should render items correct', () => {
      const { getByLabelText } = render(
        <div aria-label="main">
          <TreeDataItems data={treeDataSample} />
        </div>
      );
      expect(getByLabelText('main')).toBeInTheDocument();
      expect(getByLabelText('first')).toBeInTheDocument();
      expect(getByLabelText('withNested')).toBeInTheDocument();
      expect(getByLabelText('withNested-nested1')).toBeInTheDocument();
      expect(getByLabelText('withNested-nested2')).toBeInTheDocument();
      expect(
        getByLabelText('withNested-nested1').parentNode === getByLabelText('withNested')
      ).toBeTruthy();
      expect(
        getByLabelText('withNested-nested2').parentNode === getByLabelText('withNested')
      ).toBeTruthy();
      expect(getByLabelText('last')).toBeInTheDocument();
    });
  });

  describe('mapTreeData', () => {
    const origin = [
      {
        key: 'first',
        'aria-label': 'first',
        children: [],
      },
      {
        key: 'withNested',
        'aria-label': 'withNested',
        children: [
          {
            key: 'withNested-nested1',
            'aria-label': 'withNested-nested1',
          },
          {
            key: 'withNested-nested2',
            'aria-label': 'withNested-nested2',
          },
        ],
      },
      {
        key: 'last',
        'aria-label': 'last',
      },
    ];

    it('should be safe if no function and/or data', () => {
      const mapped = mapTreeData(undefined, undefined);
      expect(mapped.length).toBe(0);
    });

    it('should be safe if no mapFunction (just shallow copy)', () => {
      const mapped = mapTreeData({}, origin);
      expect(mapped === origin).toBeFalsy();
      expect(mapped.length).toBe(3);

      expect(mapped[0] === origin[0]).toBeFalsy();
      expect(mapped[0].key).toBe('first');

      expect(mapped[1] === origin[1]).toBeFalsy();
      expect(mapped[1].key).toBe('withNested');
      expect(mapped[1].children === origin[1].children).toBeFalsy();
      expect(mapped[1].children[0] === origin[1].children[0]).toBeFalsy();
      expect(mapped[1].children[0].key).toBe('withNested-nested1');
      expect(mapped[1].children[1] === origin[1].children[1]).toBeFalsy();
      expect(mapped[1].children[1].key).toBe('withNested-nested2');

      expect(mapped[2] === origin[2]).toBeFalsy();
      expect(mapped[2].key).toBe('last');
    });

    it('should call mapFunction correct', () => {
      const mapFunction = jest.fn((item, index, array, parent) => {
        expect(item).not.toBeUndefined();
        expect(index).not.toBeUndefined();
        expect(array).not.toBeUndefined();

        switch (item.key) {
          case 'first':
          case 'last':
          case 'withNested':
            expect(parent).toBeNull();
            break;
          case 'withNested-nested1':
            expect(parent).not.toBeNull();
            expect(parent.item.key).toBe('withNested');
            break;
          case 'withNested-nested2':
            expect(parent).not.toBeNull();
            expect(parent.item.key).toBe('withNested');
            break;
          default:
            jest.fail('it should not reach here');
        }
        return item;
      });

      const result = mapTreeData({ mapFunction }, origin);
      expect(result).toEqual(origin);

      expect(result[0]).toEqual(origin[0]);
      expect(result[1]).toEqual(origin[1]);
      expect(result[2]).toEqual(origin[2]);

      expect(mapFunction).toHaveBeenCalledTimes(5);
    });

    it('May eventual modify origin items', () => {
      const mapFunction = (item, index) => {
        // eslint-disable-next-line no-param-reassign
        item.newProp = index;
        return item;
      };

      const mapped = mapTreeData({ mapFunction }, origin);
      expect(origin[0].newProp).not.toBeUndefined();
      expect(mapped[0].newProp).not.toBeUndefined();
      expect(origin[1].newProp).not.toBeUndefined();
      expect(mapped[1].newProp).not.toBeUndefined();

      expect(origin[1].children[0].newProp).not.toBeUndefined();
      expect(mapped[1].children[0].newProp).not.toBeUndefined();
      expect(origin[1].children[1].newProp).not.toBeUndefined();
      expect(mapped[1].children[1].newProp).not.toBeUndefined();

      expect(origin[2].newProp).not.toBeUndefined();
      expect(mapped[2].newProp).not.toBeUndefined();
    });

    it('should map origin items appropriate', () => {
      const mapFunction = (item, index, array, parent) => {
        return {
          ...item,
          key: `@${item.key}`,
          label: `${parent?.item?.key ?? 'root'}:${item.key}`,
        };
      };

      const withDetailedKeys = mapTreeData({ mapFunction }, origin);
      expect(withDetailedKeys[0].key).toBe('@first');
      expect(withDetailedKeys[0].label).toBe('root:first');
      expect(withDetailedKeys[1].key).toBe('@withNested');
      expect(withDetailedKeys[1].label).toBe('root:withNested');

      expect(withDetailedKeys[1].children[0].key).toBe('@withNested-nested1');
      expect(withDetailedKeys[1].children[0].label).toBe('withNested:withNested-nested1');
      expect(withDetailedKeys[1].children[1].key).toBe('@withNested-nested2');
      expect(withDetailedKeys[1].children[1].label).toBe('withNested:withNested-nested2');
      expect(withDetailedKeys[2].key).toBe('@last');
      expect(withDetailedKeys[2].label).toBe('root:last');
    });
  });

  describe('filterTreeData', () => {
    const source = [
      {
        key: 'first',
        'aria-label': 'first',
        children: [],
      },
      {
        key: 'withNested',
        'aria-label': 'withNested',
        children: [
          {
            key: 'withNested-nested1',
            'aria-label': 'withNested-nested1',
          },
          {
            key: 'withNested-nested2',
            'aria-label': 'withNested-nested2',
          },
        ],
      },
      {
        key: 'last',
        'aria-label': 'last',
      },
    ];

    it('should be safe if no function and/or data', () => {
      const filtered = filterTreeData(undefined, undefined);
      expect(filtered.length).toBe(0);
    });

    it('should be safe if no filterFunction (just shallow copy)', () => {
      const filtered = filterTreeData({}, source);
      expect(filtered.length).toBe(3);
      expect(filtered !== source).toBeTruthy();
      expect(filtered[0] !== source[0]).toBeTruthy();
      expect(filtered[1] !== source[1]).toBeTruthy();
      expect(filtered[2] !== source[2]).toBeTruthy();

      expect(filtered[1].children !== source[1].children).toBeTruthy();
      expect(filtered[1].children[0] !== source[1].children[0]).toBeTruthy();
      expect(filtered[1].children[1] !== source[1].children[1]).toBeTruthy();

      expect(filtered[0].key).toBe('first');
      expect(filtered[1].key).toBe('withNested');
      expect(filtered[2].key).toBe('last');
      expect(filtered[1].children[0].key).toBe('withNested-nested1');
      expect(filtered[1].children[1].key).toBe('withNested-nested2');
    });

    it('should call filterFunction correct', () => {
      const filterFunction = jest.fn((item, index, array, parent) => {
        expect(item).not.toBeUndefined();
        expect(index).not.toBeUndefined();
        expect(array).not.toBeUndefined();

        switch (item.key) {
          case 'first':
          case 'last':
          case 'withNested':
            expect(parent).toBeNull();
            break;
          case 'withNested-nested1':
            expect(parent).not.toBeNull();
            expect(parent.key).toBe('withNested');
            break;
          case 'withNested-nested2':
            expect(parent).not.toBeNull();
            expect(parent.key).toBe('withNested');
            break;
          default:
            jest.fail('it should not reach here');
        }
        return true;
      });

      const filtered = filterTreeData({ filterFunction }, source);
      expect(filtered).toEqual(source);

      expect(filtered[0]).toEqual(source[0]);
      expect(filtered[1]).toEqual(source[1]);
      expect(filtered[2]).toEqual(source[2]);

      expect(filterFunction).toHaveBeenCalledTimes(3);
    });

    it('should call filterFunction through all items until...', () => {
      const filterFunction = jest.fn(() => {
        return false;
      });
      expect(filterTreeData({ filterFunction }, source)).not.toEqual(source);
      expect(filterFunction).toHaveBeenCalledTimes(5);
    });

    it('should not modify origin items', () => {
      const filterFunction = (item, index) => {
        // eslint-disable-next-line no-param-reassign
        item.hacked = index;
        return true;
      };

      const filtered = filterTreeData({ filterFunction }, source);
      expect(source[0].hacked).toBeUndefined();
      expect(filtered[0].hacked).toBeUndefined();
      expect(source[1].hacked).toBeUndefined();
      expect(filtered[1].hacked).toBeUndefined();

      expect(source[1].children[0].hacked).toBeUndefined();
      expect(filtered[1].children[0].hacked).toBeUndefined();
      expect(source[1].children[1].hacked).toBeUndefined();
      expect(filtered[1].children[1].hacked).toBeUndefined();

      expect(source[2].hacked).toBeUndefined();
      expect(filtered[2].hacked).toBeUndefined();

      expect(filtered).toEqual(source);
    });

    it('should filter origin items (first and last)', () => {
      const filterFunction = item => {
        return item.key === 'first' || item.key === 'last';
      };

      const filtered = filterTreeData({ filterFunction }, source);
      expect(filtered.length).toBe(2);
      expect(filtered[0].key).toBe('first');
      expect(filtered[1].key).toBe('last');
    });

    it('should filter origin items (withChildren and last)', () => {
      const filterFunction = item => {
        return item.key === 'last' || item?.children?.length > 0;
      };

      const filtered = filterTreeData({ filterFunction }, source);
      expect(filtered.length).toBe(2);
      expect(filtered[0].key).toBe('withNested');
      expect(filtered[0].children[0].key).toBe('withNested-nested1');
      expect(filtered[0].children[1].key).toBe('withNested-nested2');
      expect(filtered[1].key).toBe('last');
    });

    it('should filter origin items deeper', () => {
      const filterFunction = item => {
        return item.key.startsWith('withNested-nested');
      };
      const filtered = filterTreeData({ filterFunction }, source);
      expect(filtered.length).toBe(1);
      expect(filtered[0].key).toBe('withNested');
      expect(filtered[0].children[0].key).toBe('withNested-nested1');
      expect(filtered[0].children[1].key).toBe('withNested-nested2');
    });
  });
});
