/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import RulesBuilderContext from '../../RulesBuilderContext';
import { RULE_INPUT_TYPES } from '../../constants';
import { DEFAULT_PROPS, PROPTYPES, VALUES } from '../constants';
import { getRuleConfigData, getRuleId } from '../helpers';

const CustomRule = ({ config, id, onValueChange, operator, setTimeframeVisibility, value }) => {
  const { isLight, isReadOnly } = useContext(RulesBuilderContext);
  const { inputComponent: InputComponent } = getRuleConfigData(config);

  if (!InputComponent) {
    return null;
  }

  return (
    <InputComponent
      id={id}
      isLight={isLight}
      isReadOnly={isReadOnly}
      onChange={onValueChange}
      operator={operator}
      setTimeframeVisibility={setTimeframeVisibility}
      value={value}
    />
  );
};

CustomRule.propTypes = {
  config: PropTypes.shape({
    operators: PROPTYPES.OPERATORS,
  }),
  id: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  operator: PropTypes.shape({
    inputType: PropTypes.oneOf(Object.values(RULE_INPUT_TYPES)),
  }),
  setTimeframeVisibility: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
};

CustomRule.defaultProps = {
  config: {
    operators: DEFAULT_PROPS.OPERATORS,
  },
  id: getRuleId('customRule'),
  operator: null,
  setTimeframeVisibility: noop,
  value: VALUES.UNPROVIDED,
};

export default CustomRule;
