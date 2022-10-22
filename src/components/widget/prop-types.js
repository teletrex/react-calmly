/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

import { ScrollContainerScrollTypes } from '../scroll-container';

import {
  WidgetEmptyStateDefaultProps,
  WidgetEmptyStatePropTypes,
  WidgetHeaderPropTypes,
  WidgetHeaderDefaultProps,
  WidgetLoadingIndicatorPropTypes,
  WidgetLoadingIndicatorDefaultProps,
  childrenPropType,
} from './components/prop-types';
import {
  marginSizes,
  validHValues,
  validXValues,
  validWValues,
  droppingElementId,
} from './constants';

const { children: metadataPropType, ...HeaderPropTypes } = WidgetHeaderPropTypes;
const { children: metadataDefaultProp, ...HeaderDefaultProps } = WidgetHeaderDefaultProps;

const { loading: loadingPropType, ...LoadingIndicatorPropTypes } = WidgetLoadingIndicatorPropTypes;
const {
  loading: loadingDefaultProp,
  ...LoadingIndicatorDefaultProps
} = WidgetLoadingIndicatorDefaultProps;

export const WidgetPropTypes = {
  ...HeaderPropTypes,
  children: childrenPropType,
  emptyStateProps: PropTypes.shape(WidgetEmptyStatePropTypes),
  horizontalScrollType: PropTypes.oneOf(Object.values(ScrollContainerScrollTypes)),
  loading: loadingPropType,
  loadingIndicatorProps: PropTypes.shape(LoadingIndicatorPropTypes),
  metadata: metadataPropType,
  onMouseDown: PropTypes.func,
  verticalScrollType: PropTypes.oneOf(Object.values(ScrollContainerScrollTypes)),
};

export const WidgetDefaultProps = {
  ...HeaderDefaultProps,
  children: null,
  emptyStateProps: WidgetEmptyStateDefaultProps,
  horizontalScrollType: ScrollContainerScrollTypes.auto,
  loading: loadingDefaultProp,
  loadingIndicatorProps: LoadingIndicatorDefaultProps,
  metadata: metadataDefaultProp,
  onMouseDown: noop,
  verticalScrollType: ScrollContainerScrollTypes.auto,
};

export const ChartWidgetPropTypes = {
  ...omit(WidgetPropTypes, ['horizontalScrollType', 'verticalScrollType']),
};

export const ChartWidgetDefaultProps = {
  ...omit(WidgetDefaultProps, ['horizontalScrollType', 'verticalScrollType']),
};

const layoutPropType = PropTypes.arrayOf(
  PropTypes.shape({
    /**
     * Height of widget in columns units.
     */
    h: PropTypes.oneOf(validHValues),
    /**
     * id of the widget, controls the widget with `widgetId` of same value.
     */
    i: PropTypes.string.isRequired,
    /**
     * If true and draggable, item will be moved only within grid.
     * False by default
     */
    isBounded: PropTypes.bool,
    /**
     * If false, will not be draggable. Overrides `static`.
     * True by default
     */
    isDraggable: PropTypes.bool,
    /**
     * If false, will not be resizable. Overrides `static`.
     * True by default
     */
    isResizable: PropTypes.bool,
    /**
     * Max height of widget in columns units.
     */
    maxH: PropTypes.oneOf(validHValues),
    /**
     * Max width of widget in columns units.
     */
    maxW: PropTypes.oneOf(validWValues),
    /**
     * Min height of widget in columns units.
     */
    minH: PropTypes.oneOf(validHValues),
    /**
     * Min width of widget in columns units.
     */
    minW: PropTypes.oneOf(validWValues),
    /**
     * If true, equal to `isDraggable: false, isResizable: false`
     * False by default
     */
    static: PropTypes.bool,
    /**
     * Width of widget in columns units.
     */
    w: PropTypes.oneOf(validWValues),
    /**
     * x position of widget. Top left, in columns units.
     */
    x: PropTypes.oneOf(validXValues),
    /**
     * y position of widget. Top left, in columns units.
     */
    y: PropTypes.number,
  })
);

export const WidgetGridPropTypes = {
  /**
   * The widgets elements. The direct children of WidgetGrid
   * need to have widgetId prop.
   */
  children: childrenPropType,
  /**
   * Dropping placeholder for external elements
   */
  droppingItem: PropTypes.shape({ h: PropTypes.number, i: PropTypes.string, w: PropTypes.number }),
  /**
   * Callback function that lets you return a layoutItem definition based on all the information given to onDrop
   * and that layout item will be automatically added to the layouts.
   * Receives the same parameters as onDrop and it is called right after onDrop.
   */
  fromDropToLayoutItem: PropTypes.func,
  /**
   * If false, items will not be draggable.
   * True by default
   */
  isDraggable: PropTypes.bool,
  /**
   * Enabled the grid to react to external elements being dragged/dropped over.
   */
  isDroppable: PropTypes.bool,
  /**
   * If false, items will not be resizable.
   * True by default
   */
  isResizable: PropTypes.bool,
  /**
   * If true and draggable, items will be moved only within grid.
   * False by default
   */
  isBounded: PropTypes.bool,
  /**
   * Layout object defines the position of the widgets,
   * If not provided, widgets will have default values and
   * not predictable positioning.
   *
   * There are two breakpoints of layout that have to be defined separately:
   *
   * lg: when the grid has more than 672px (The grid and not the viewport)
   * md: when the grid has 672px or less (The grid and not the viewport)
   *
   * md layout is simpler because it has only 2 columns, and the only valid width value is 2.
   * So there is not need to define x, w, minW and maxW in md layout.
   */
  layouts: PropTypes.shape({
    lg: layoutPropType,
    md: layoutPropType,
  }),
  /**
   * Set one of 2 available margin sizes
   */
  marginSize: PropTypes.oneOf(Object.values(marginSizes)),
  /**
   * Fires whenever breakpoint changes.
   * (newBreakpoint: string, newCols: number) => void,
   */
  onBreakpointChange: PropTypes.func,
  /**
   * Calls on each drag movement.
   * (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
   *          placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
   */
  onDrag: PropTypes.func,
  /**
   * Calls when drag starts.
   * (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
   *          placeholder: Undefined, e: MouseEvent, element: HTMLElement) => void;
   */
  onDragStart: PropTypes.func,
  /**
   * Calls when drag is complete.
   * (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
   *          placeholder: Undefined, e: MouseEvent, element: HTMLElement) => void;
   */
  onDragStop: PropTypes.func,
  /**
   * Calls when an element has been dropped into the grid from outside.
   * (layout: Layout, item: ?LayoutItem, e: Event) => void
   */
  onDrop: PropTypes.func,
  /**
   * Fires whenever the layout changes.
   * (currentLayout: Layout, allLayouts: {[key: $Keys<breakpoints>]: Layout}) => void
   */
  onLayoutChange: PropTypes.func,
  /**
   * Calls when resize movement happens.
   * (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
   *          placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;
   */
  onResize: PropTypes.func,
  /**
   * Calls when resize starts.
   * (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
   *          placeholder: Undefined, e: MouseEvent, element: HTMLElement) => void;
   */
  onResizeStart: PropTypes.func,
  /**
   * Calls when resize is complete.
   * (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
   *          placeholder: Undefined, e: MouseEvent, element: HTMLElement) => void;
   */
  onResizeStop: PropTypes.func,
  /**
   * Fires whenever width changes.
   * (containerWidth: number, margin: [number, number], cols: number, containerPadding: [number, number]) => void;
   */
  onWidthChange: PropTypes.func,
  /**
   * If true, grid items won't change position when being
   * dragged over.
   */
  preventCollision: PropTypes.bool,
  /**
   * If parent DOM node of ResponsiveReactGridLayout or ReactGridLayout has "transform: scale(n)" css property,
   * we should set scale coefficient to avoid render artifacts while dragging.
   */
  transformScale: PropTypes.number,
};

export const WidgetGridDefaultProps = {
  children: null,
  droppingItem: { i: droppingElementId, w: 2, h: 1 },
  fromDropToLayoutItem: noop,
  isBounded: false,
  isDraggable: true,
  isDroppable: false,
  isResizable: true,
  layouts: { lg: [], md: [] },
  marginSize: marginSizes.DEFAULT,
  onBreakpointChange: noop,
  onDrag: noop,
  onDragStart: noop,
  onDragStop: noop,
  onDrop: noop,
  onLayoutChange: noop,
  onResize: noop,
  onResizeStart: noop,
  onResizeStop: noop,
  onWidthChange: noop,
  preventCollision: false,
  transformScale: 1,
};

export const WidgetGroupPropTypes = {
  buttonText: PropTypes.string,
  children: childrenPropType,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
  /**
   * Render function to render the action button at the end of the group
   */
  // eslint-disable-next-line react/require-default-props
  renderButton: PropTypes.func,
  title: PropTypes.string,
};
export const WidgetGroupDefaultProps = {
  buttonText: '',
  children: null,
  renderButton: null,
  title: '',
};

export const WidgetTabsPropTypes = {
  children: childrenPropType,
  onMouseDown: PropTypes.func,
};
export const WidgetTabsDefaultProps = {
  children: null,
  onMouseDown: noop,
};
