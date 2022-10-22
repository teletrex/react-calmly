/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, DatePickerInput } from '@carbon/react';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { DATE_PATTERN, VALUES } from '../../constants';
import {
  getDayTimestamp,
  getMachineDateTime,
  getPrefixedClasses,
  getReadOnlyDate,
} from '../../helpers';

const RangeDatePicker = ({ id, onValueChange, value }) => {
  const { isReadOnly } = useContext(RulesBuilderContext);

  const handleOnChange = dates => {
    const [rangeStart, rangeEnd] = dates;

    if (rangeStart && rangeEnd) {
      onValueChange([getDayTimestamp(rangeStart), getDayTimestamp(rangeEnd)]);
    }
  };

  if (isReadOnly) {
    return (
      <>
        <time
          className={getPrefixedClasses([
            '--text-space-left',
            '--text-space-right',
            '--rule-value-readonly',
          ])}
          dateTime={getMachineDateTime(value[0])}
        >
          {getReadOnlyDate(value[0])}
        </time>
        -
        <time
          className={getPrefixedClasses(['--text-space-left', '--rule-value-readonly'])}
          dateTime={getMachineDateTime(value[1])}
        >
          {getReadOnlyDate(value[1])}
        </time>
      </>
    );
  }

  return (
    <DatePicker
      data-testid="input-field-range-date-picker"
      datePickerType="range"
      id={`${id}--input-field-date-picker`}
      onChange={handleOnChange}
      value={value}
    >
      <DatePickerInput id={`${id}--range-picker-value-1`} labelText="" pattern={DATE_PATTERN} />
      <DatePickerInput id={`${id}--range-picker-value-2`} labelText="" pattern={DATE_PATTERN} />
    </DatePicker>
  );
};

RangeDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
};

RangeDatePicker.defaultProps = {
  value: VALUES.UNPROVIDED,
};

export default RangeDatePicker;
