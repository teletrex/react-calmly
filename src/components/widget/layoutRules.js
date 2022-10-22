/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { minWidth, minHeight, maxHeight, maxWidth, droppingElementId } from './constants';

/**
 * For given item returns the bigger between it's height or the default minimun,
 * but keeping equal or lower to default maximun height
 *
 * @param {{h: number}} item
 * @returns {number} height in columns units
 */
const getItemHeight = item => Math.min(Math.max(item.h || minHeight, minHeight), maxHeight);

/**
 * For given item returns it's width, enforcing rules that apply for LG layout
 * @param {{w: number}} item
 * @returns {number} width in columns units
 */
const getLGItemWidth = item => (item.w === 5 ? 4 : item.w);

/**
 * For given item returns the bigger between it's width or the default minimun
 * @param {{w: number}} item
 * @returns {number} width in columns units
 */
const getItemWidth = item =>
  Math.min(Math.max(getLGItemWidth(item) || minWidth, minWidth), maxWidth);

/**
 * For given item returns the lower between it's maximum height or the default max height
 * @param {{maxH: number}} item
 * @returns {number} maximun height in columns units
 */
const getItemMaxHeight = item => Math.min(item.maxH || maxHeight, maxHeight);

/**
 * For given item returns the bigger between it's minimum width or the default minimum width
 * @param {{w: number}} item
 * @returns {number} minimum width in columns units
 */
const getItemMinWidth = item => Math.max(item.minW || minWidth, minWidth);

/**
 * Returns item correcting some properties if necessary for all breakpoints
 * @param {object} item
 * @returns {object} item definition
 */
export const getEnforcedItem = item => ({
  x: 0,
  y: 0,
  ...item,
  w: getItemWidth(item),
  h: getItemHeight(item),
  minW: getItemMinWidth(item),
  maxH: getItemMaxHeight(item),
});

/**
 * Apply rules for each item in the given layout
 * @param {object[]} layout
 * @returns {object[]} layout
 */
const getEnforcedLayoutRules = layout => layout.map(getEnforcedItem);

/**
 * Returns new layouts object applying rules for each layout
 * @param {{ lg: object[], md: object[] }} layouts
 * @returns {{ lg: object[], md: object[] }} layouts
 */
export const getEnforcedLayouts = ({ lg = [], md = [] } = {}) => ({
  lg: getEnforcedLayoutRules(lg),
  md: getEnforcedLayoutRules(md),
});

/**
 * Returns new dropping item object applying w and h rules
 * @param {{ i: string, w: number, h: number }} item
 * @returns {{ i: string, w: number, h: number }} item
 */
export const getEnforcedDroppingItem = (item = {}) => ({
  i: item.i || droppingElementId,
  w: getItemWidth(item),
  h: getItemHeight(item),
});

const preventFiveColumnsWidth = (oldLayoutItem, layoutItem, placeholder) => {
  // the following mutations on layoutItem and on placeholder
  // follow documentation of react-grid-layout library
  if (layoutItem.w === 5) {
    const newValue = oldLayoutItem.w > 5 ? 4 : 6;
    // eslint-disable-next-line no-param-reassign
    layoutItem.w = newValue;
    // eslint-disable-next-line no-param-reassign
    placeholder.w = newValue;
  }
};

export const enforceResizeRules = (oldLayoutItem, layoutItem, placeholder) => {
  preventFiveColumnsWidth(oldLayoutItem, layoutItem, placeholder);
};
