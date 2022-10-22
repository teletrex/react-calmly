/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import RulesBuilderContext from '../RulesBuilderContext';
import {
  ERROR_RELEGATION_REASON_TAG,
  relegateErrors,
} from '../../utils/test-helpers/relegate-errors';

export const datePickerErrorWrapper = fn => {
  relegateErrors(
    {
      reasonTag: ERROR_RELEGATION_REASON_TAG.FAILED_TO_RESOLVE,
      reason: "Couldn't trace the 'uncontrolled input error' in date component.",
      expectedErrorCount: 1,
    },
    () => {
      fn();
    }
  );
};

export const renderWithContext = (component, contextValue = {}) =>
  render(
    <RulesBuilderContext.Provider value={contextValue}>{component}</RulesBuilderContext.Provider>
  );
