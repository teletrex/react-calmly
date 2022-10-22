/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import classNames from 'classnames';

import { ScrollContainer } from '../scroll-container';

import { widgetClassBuilder } from './utils';
import {
  WidgetEmptyState,
  WidgetHeader,
  WidgetLoadingIndicator,
  widgetHeaderHasContent,
  WidgetFooter
} from './components';
import  ErrorBoundary from "../ErrorBoundary";
import { WidgetPropTypes, WidgetDefaultProps } from './prop-types';
import { usePreventMouseDownPropagation } from './usePreventMouseDownPropagation';

const Widget = props => {
  const {
    actions,
    dataGrid,
    children,
    className,
    emptyStateProps,
    horizontalScrollType,
    loading,
    loadingIndicatorProps,
    metadata,
    onMouseDown: onMouseDownProp,
    overflowMenu,
    preActions,
    renderOverflowMenu,
    renderPreActions,
    slim,
    footer,
    title,
    value,
    verticalScrollType,
    footerLeftActions,
    footerRightActions,
    footerCenterActions,
    noBorder,
    isEditing,
    isMaximized,
    fancyTitle
  } = props;

  const shouldShowEmptyState = !(widgetHeaderHasContent(props), children || metadata || loading);

  const composedClassNames = classNames(className, widgetClassBuilder(), {
    [widgetClassBuilder('__slim')]: true,
    [widgetClassBuilder('__no-border')]: noBorder,
    [widgetClassBuilder('__is-editing')]: isEditing,
    [widgetClassBuilder('__is-maximized')]: isMaximized,
  });

  const footerHeightClassName = widgetClassBuilder('__footerheight');

  const { elementRef, onMouseDown } = usePreventMouseDownPropagation({
    onMouseDown: onMouseDownProp,
  });

  return (
    // design shows Widgets as focusable
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions

    <div ref={elementRef}
         className={composedClassNames}
         onMouseDown={onMouseDown}
         tabIndex={0}
         dataGrid={dataGrid}
    >
      <WidgetHeader
        actions={actions}
        overflowMenu={overflowMenu}
        preActions={preActions}
        renderOverflowMenu={renderOverflowMenu}
        renderPreActions={renderPreActions}
        slim={slim}
        title={title}
        fancyTitle={fancyTitle}
        value={value}
      >
        {metadata}
      </WidgetHeader>

      <WidgetLoadingIndicator loading={loading} {...loadingIndicatorProps} />

      {shouldShowEmptyState && <WidgetEmptyState {...emptyStateProps} />}

      {!shouldShowEmptyState && !loading && (
        <ScrollContainer
          horizontalScrollType={horizontalScrollType}
          verticalScrollType={verticalScrollType}
        >
          <ErrorBoundary>

          {children}
          </ErrorBoundary>
        </ScrollContainer>
      )}
      {(footerLeftActions ||
        footerCenterActions ||
        footerRightActions ) &&
        <div className={footerHeightClassName}>
          <WidgetFooter
            leftActions={footerLeftActions}
            rightActions={footerRightActions}
            centerActions={footerCenterActions}
          />
        </div>
      }
    </div>
  );
};

Widget.propTypes = WidgetPropTypes;
Widget.defaultProps = WidgetDefaultProps;

export default Widget;
