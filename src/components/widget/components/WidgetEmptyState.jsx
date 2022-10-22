/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';

import {Button} from '@carbon/react';
import ConfigurableComponent from '../../utils/configurable-component';
import { useTranslation } from '../../../translation';
import { widgetClassBuilder } from '../utils';

import { WidgetEmptyStatePropTypes, WidgetEmptyStateDefaultProps } from './prop-types';

const WidgetEmptyState = ({ image, renderImage, text, buttonText, onClick, children }) => {
  const { t } = useTranslation();

  const buttonTextOrDefault = buttonText || t('Add a widget');

  const shouldRenderImage = image || renderImage;

  return (
    <div className={widgetClassBuilder('--empty')}>
      <div className={widgetClassBuilder('--empty-content')}>
        {shouldRenderImage && (
          <div className={widgetClassBuilder('--empty-image')}>
            <ConfigurableComponent component={image} render={renderImage} />
          </div>
        )}
        {text && <p className={widgetClassBuilder('--empty-text')}>{text}</p>}
        {onClick && (
          <Button
            className={widgetClassBuilder('--empty-button')}
            kind="tertiary"
            onClick={onClick}
            preventDefaultOnMouseDown
          >
            {buttonTextOrDefault}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

WidgetEmptyState.propTypes = WidgetEmptyStatePropTypes;
WidgetEmptyState.defaultProps = WidgetEmptyStateDefaultProps;

export default WidgetEmptyState;
