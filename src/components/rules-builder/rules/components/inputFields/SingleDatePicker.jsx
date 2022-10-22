/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DatePicker,DatePickerInput } from '@carbon/react';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { DATE_PATTERN, VALUES } from '../../constants';
import {
  getDayTimestamp,
  getReadOnlyDate,
  getMachineDateTime,
  getPrefixedClasses,
} from '../../helpers';

const SingleDatePicker = ({ id, onValueChange, value }) => {
  const { isReadOnly } = useContext(RulesBuilderContext);

  const handleValueChange = date => {
    onValueChange(getDayTimestamp(date[0]));
  };

  if (isReadOnly) {
    return (
      <time
        className={getPrefixedClasses(['--text-space-left', '--rule-value-readonly'])}
        dateTime={getMachineDateTime(value)}
      >
        {getReadOnlyDate(value)}
      </time>
    );
  }

  return (
    <DatePicker
      data-testid="input-field-single-date-picker"
      datePickerType="single"
      id={`${id}--input-field-date-picker`}
      onChange={handleValueChange}
      value={value}
    >
      <DatePickerInput id={`${id}--single-datepicker-value`} labelText="" pattern={DATE_PATTERN} />
    </DatePicker>
  );
};

SingleDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

SingleDatePicker.defaultProps = {
  value: VALUES.UNPROVIDED,
};

export default SingleDatePicker;
