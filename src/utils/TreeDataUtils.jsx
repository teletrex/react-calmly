/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';

const renderItemsRecursive = (
  { itemRenderer: ItemRenderer, itemRendererProps, subItemsPath },
  dataItems,
  parent = null
) => {
  if (ItemRenderer && Array.isArray(dataItems)) {
    return dataItems.map((item, index, data) => (
      <ItemRenderer {...itemRendererProps({ item, index, data, parent })}>
        {Array.isArray(item[subItemsPath]) &&
          renderItemsRecursive(
            { itemRenderer: ItemRenderer, itemRendererProps, subItemsPath },
            item[subItemsPath],
            {
              item,
              parent,
            }
          )}
      </ItemRenderer>
    ));
  }
  return false;
};

const mapItemsRecursive = ({ mapFunction, subItemsPath }, dataItems, parent = null) => {
  const result = [];
  if (Array.isArray(dataItems)) {
    dataItems.forEach((item, index, array) => {
      const mappedItem = mapFunction(item, index, array, parent);
      if (mappedItem && Array.isArray(item[subItemsPath]) && item[subItemsPath].length) {
        const mappedChildren = mapItemsRecursive(
          { mapFunction, subItemsPath },
          item[subItemsPath],
          {
            item,
            parent,
          }
        );
        if (mappedChildren.length) {
          mappedItem[subItemsPath] = mappedChildren;
        }
      }
      result.push(mappedItem);
    });
  }
  return result;
};

const forEachItemRecursive = ({ forEachFunction, subItemsPath }, dataItems, parent = null) => {
  if (Array.isArray(dataItems)) {
    dataItems.forEach((item, index, array) => {
      forEachFunction(item, index, array, parent);

      if (Array.isArray(item[subItemsPath]) && item[subItemsPath].length) {
        forEachItemRecursive({ forEachFunction, subItemsPath }, item[subItemsPath], {
          item,
          parent,
        });
      }
    });
  }
  return dataItems;
};

const filterItemsRecursive = ({ filterFunction, subItemsPath }, dataItems, parent = null) => {
  const matches = [];
  if (Array.isArray(dataItems)) {
    dataItems.forEach((item, index, array) => {
      if (filterFunction({ ...item }, index, array, parent) === true) {
        matches.push({
          ...item,
          ...(Array.isArray(item[subItemsPath])
            ? { [subItemsPath]: item[subItemsPath].map(item => ({ ...item })) }
            : {}),
        });
      } else if (Array.isArray(item[subItemsPath]) && item[subItemsPath].length) {
        const matchesChildren = filterItemsRecursive(
          { filterFunction, subItemsPath },
          item[subItemsPath],
          {
            item,
            parent,
          }
        );
        if (matchesChildren.length) {
          matches.push({ ...item, [subItemsPath]: matchesChildren });
        }
      }
    });
  }
  return matches;
};

/**
 *
 * @param itemRenderer
 * @param itemRendererProps {function}
 * @param subItemsPath  {string}
 * @param dataItems {array}
 * @returns {boolean|array}
 */
export const renderTreeData = (
  { itemRenderer = 'div', itemRendererProps = ({ item }) => item, subItemsPath = 'children' } = {},
  dataItems
) => renderItemsRecursive({ itemRenderer, itemRendererProps, subItemsPath }, dataItems);

/**
 *
 * @param {object|function} itemRenderer
 * @param {function} itemRendererProps
 * @param {string} subItemsPath
 * @returns {function({data: object[]}): boolean|Array}
 */
export const withTreeDataItems = ({
  itemRenderer = 'div',
  itemRendererProps = ({ item }) => item,
  subItemsPath = 'children',
} = {}) => ({ data }) =>
  renderItemsRecursive({ itemRenderer, itemRendererProps, subItemsPath }, data);

/**
 *
 * @param {function} filterFunction
 * @param {string} subItemsPath
 * @param {array} dataItems
 * @returns {[]}
 */
export const filterTreeData = (
  { filterFunction = () => true, subItemsPath = 'children' } = {},
  dataItems
) => filterItemsRecursive({ filterFunction, subItemsPath }, dataItems);

/**
 *
 * @param {function} mapFunction
 * @param {string} subItemsPath
 * @param {array} dataItems
 * @returns {[]}
 */
export const mapTreeData = (
  { mapFunction = item => ({ ...item }), subItemsPath = 'children' } = {},
  dataItems
) => mapItemsRecursive({ mapFunction, subItemsPath }, dataItems);

/**
 *
 * @param {function} forEachFunction
 * @param {string} subItemsPath
 * @param {array} dataItems
 * @returns {[]}
 */
export const forEachTreeItem = (
  { forEachFunction = item => item, subItemsPath = 'children' } = {},
  dataItems
) => forEachItemRecursive({ forEachFunction, subItemsPath }, dataItems);

export const forEachChild = (callBack, dataItems) =>
  forEachItemRecursive({ forEachFunction: callBack, subItemsPath: 'children' }, dataItems);
