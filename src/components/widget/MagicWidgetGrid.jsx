/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useMemo } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import { widgetClassBuilder } from './utils';
import { breakpoints, cols, marginsMap } from './constants';
import useWidgetGrid from './useWidgetGrid';
import useWidgetGridTranslatedPlaceholder from './useWidgetGridTranslatedPlaceholder';
import { WidgetGridPropTypes, WidgetGridDefaultProps } from './prop-types';

const MagicWidgetGrid = ({
  layouts,
  children,
  onLayoutChange: onLayoutChangeProp,
  marginSize,
  ...otherProps
}) => {


  const {
    droppingItem,
    getItemProps,
    layouts: enforcedLayouts,
    onDrop,
    onLayoutChange,
    onResize,
    setWrapperElement,
    width
  } = useWidgetGrid({
    ...otherProps,
    layouts,
    onLayoutChange: onLayoutChangeProp,
  });

  const { onDragStart, onDrag } = useWidgetGridTranslatedPlaceholder({ ...otherProps });

  // React.Children.map is not suitable here because it will change our keys
  // and react-grid-layout depend on them
  const wrappedChildren = useMemo(
    () =>
      React.Children.toArray(children).map(child => {
        const id = child.props.widgetId;

        let dataGrid = getItemProps(id.toString())
        if (dataGrid["data-grid"]) {
          dataGrid["data-grid"].w = child.props.w;
          dataGrid["data-grid"].h = child.props.h;
        }

        if (child.props.isMaximized) {

        }

        return (
          <div key={id} {...dataGrid}>
            {child}
          </div>
        );
      }),
    [children, getItemProps]
  );

  return (
    <div ref={setWrapperElement}>
      {/* Render only when we have width to prevent funky mount animation */}
      {Boolean(width) && (
        <ResponsiveGridLayout
          {...otherProps}
          breakpoints={breakpoints}
          className={widgetClassBuilder('-grid')}
          cols={cols}
          compactType="vertical"
          containerPadding={[0, 0]}
          droppingItem={droppingItem}
          layouts={layouts}
          margin={marginsMap[marginSize]}
          onDrag={onDrag}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onLayoutChange={onLayoutChange}
          onResize={onResize}
          rowHeight={200}
          width={width}
        >
          {wrappedChildren}
        </ResponsiveGridLayout>
      )}
      <br/>
    </div>
  );
};

MagicWidgetGrid.propTypes = WidgetGridPropTypes;
MagicWidgetGrid.defaultProps = WidgetGridDefaultProps;

export default MagicWidgetGrid;
