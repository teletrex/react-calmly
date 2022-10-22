/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';

import useLocalization from './useLocalization';
import { getDisplayName } from './utils';

const withLocalization = (options = {}) => WrappedComponent => {
  const WithLocalization = ({
    // eslint-disable-next-line react/prop-types
    forwardedRef,
    ...rest
  }) => {
    const { language, locale, timeZone } = useLocalization();

    const passDownProps = {
      ...rest,
      language,
      locale,
      timeZone,
    };
    if (options.withRef && forwardedRef) {
      passDownProps.ref = forwardedRef;
    } else if (!options.withRef && forwardedRef) {
      passDownProps.forwardedRef = forwardedRef;
    }
    return React.createElement(WrappedComponent, passDownProps);
  };

  WithLocalization.displayName = `withLocalization(${getDisplayName(WrappedComponent)})`;

  WithLocalization.WrappedComponent = WrappedComponent;

  const forwardRef = (props, ref) =>
    React.createElement(WithLocalization, { ...props, forwardedRef: ref });

  return options.withRef ? React.forwardRef(forwardRef) : WithLocalization;
};

export default withLocalization;
