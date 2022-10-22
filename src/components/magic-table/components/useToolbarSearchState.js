/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { useState } from 'react';
import PropTypes from 'prop-types';

import { usePrevious } from '../../../utils/hooks';
import { deprecate } from '../../utils/prop-types';

/**
 * Below hook has been remained to keep backwards compatibility with searchTextValue prop.
 * It is deprecated and will be removed in the next major release.
 */
const useToolbarSearchState = ({
  /**
   * Value for the search text input, same as 'searchTextValue' but has priority.
   * both properties are kept for backwards compatibility.
   */
  value,
  /**
   * Value for the search text input, same as 'value'.
   * both properties are kept for backwards compatibility.
   */
  searchTextValue,
}) => {
  const prevSearchTextValue = usePrevious(searchTextValue);
  const prevValue = usePrevious(value);

  const searchTextValueChanged = searchTextValue !== prevSearchTextValue;
  const valueChanged = value !== prevValue;

  const [searchTextState, setSearchTextState] = useState(value || searchTextValue || '');

  if (valueChanged) {
    if (value !== searchTextState) {
      setSearchTextState(value);
    }
  } else if (searchTextValueChanged) {
    if (searchTextValue !== searchTextState) {
      setSearchTextState(searchTextValue);
    }
  }

  return {
    value: searchTextState,
    setValue: setSearchTextState,
  };
};

export default useToolbarSearchState;

export const useToolbarSearchStatePropTypes = {
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  searchTextValue: deprecate(
    PropTypes.string,
    `The \`searchTextValue\` prop has been deprecated and will be removed in the next major release. Use \`value\` prop instead.`
  ),
};
