/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, {useState, useEffect} from 'react';

import Widget from "../widget/Widget";
import settings from '../../settings';

import classNames from 'classnames';

/* Widget on which other ValueWidgets are based.
This widget provides a small size and blue background.
Use for custom value widgets by setting the children, have fun.
 */
const ValueWidget = props => {
  const {
    widgetId,
    actions,
    children,
    emptyStateProps,
    horizontalScrollType,
    loading,
    loadingIndicatorProps,
    overflowMenu,
    slim,
    title
  } = props;

  const [shouldShowEmptyState, setShouldShowEmptyState] = useState(false);
  const {prefix} = settings;

  useEffect( () => {
    setShouldShowEmptyState( !children && !loading);
    },
    [children,loading]
  )

  return (
    // design shows Widgets as focusable
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions
    <Widget
      widgetId={widgetId}
      title={title}
      loading={loading}
      slim={slim}
      overflowMenu={overflowMenu}
      actions={actions}
      className={`#${prefix}--widget-value-widget`}

//      emptyStateProps={{text:<h1>?</h1>,renderIcon:null,image:null}}
    >
      {children}
    </Widget>
  );
}

ValueWidget.propTypes = {};
ValueWidget.defaultProps = {};

export default ValueWidget;

