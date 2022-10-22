/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

import { PROPTYPES, VALUES } from '../constants';
import { getRuleId } from '../helpers';

import { MultipleSelect, SingleSelect } from './inputFields';

const SelectRule = ({ config, id, isReadOnly, onValueChange, operator, value }) => {
  const { isMultiple = false, options = [], placeholder } = config;

  const commonProps = {
    id,
    isReadOnly,
    onValueChange,
    options,
    placeholder: placeholder?.dropdownLabel,
    value,
  };

  if (!operator) {
    return null;
  }

  if (isMultiple) {
    return <MultipleSelect {...commonProps} />;
  }

  return <SingleSelect {...commonProps} />;
};

SelectRule.propTypes = {
  config: PropTypes.shape({
    isMultiple: PropTypes.bool,
    options: PROPTYPES.SELECT_OPTIONS,
    placeholder: PropTypes.shape({
      dropdownLabel: PropTypes.string,
    }),
  }),
  id: PropTypes.string,
  isReadOnly: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

SelectRule.defaultProps = {
  config: {
    options: [],
    isMultiple: false,
  },
  id: getRuleId('select'),
  isReadOnly: false,
  operator: null,
  value: VALUES.UNPROVIDED,
};

export default SelectRule;
