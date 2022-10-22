/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';

import {Loading} from '@carbon/react';
import { useTranslation } from '../../../translation';
import { widgetClassBuilder } from '../utils';

import { WidgetLoadingIndicatorPropTypes, WidgetLoadingIndicatorDefaultProps } from './prop-types';

const WidgetLoadingIndicator = ({ loading, ...indicatorProps }) => {
  const { t } = useTranslation();

  if (!loading) {
    return null;
  }

  return (
    <div className={widgetClassBuilder('--loading')}>
      <Loading description={t('Loading widget')} {...indicatorProps} />
    </div>
  );
};

WidgetLoadingIndicator.propTypes = WidgetLoadingIndicatorPropTypes;
WidgetLoadingIndicator.defaultProps = WidgetLoadingIndicatorDefaultProps;

export default WidgetLoadingIndicator;
