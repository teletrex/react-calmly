/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import without from 'lodash/without';

import { DatePickerInput, Tag, DatePicker } from '@carbon/react';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { DATE_PATTERN } from '../../constants';
import { getPrefixedClasses } from '../../helpers';

const parseDate = timestamp => new Date(timestamp).toDateString();

const OneOfValues = ({ id, onValueChange, value }) => {
  const { isReadOnly } = useContext(RulesBuilderContext);
  const [timestamps, setTimestamps] = useState(value);

  useEffect(() => {
    setTimestamps(value);
  }, [value]);

  const addValue = dateValue => {
    const date = new Date(dateValue[0]);
    const newTimestamps = uniq([...timestamps, date.getTime()]);

    setTimestamps(newTimestamps);
    onValueChange(newTimestamps);
  };

  const removeValue = timestamp => {
    const newTimestamps = without(timestamps, timestamp);

    setTimestamps(newTimestamps);
    onValueChange(newTimestamps);
  };

  if (isReadOnly) {
    return map(timestamps, (timestamp, i) => (
      <Fragment key={timestamp}>
        <span>{i ? ',' : ':'}</span>
        <span className={getPrefixedClasses(['--text-space-left', '--rule-value-readonly'])}>
          {parseDate(timestamp)}
        </span>
      </Fragment>
    ));
  }

  return (
    <div
      className={getPrefixedClasses('--input-field-container')}
      data-testid="date-rule-one-of-values"
    >
      {map(timestamps, timestamp => (
        <Tag
          key={timestamp}
          filter
          onClick={() => {
            removeValue(timestamp);
          }}
          title={timestamp.toString()}
        >
          {parseDate(timestamp)}
        </Tag>
      ))}
      <DatePicker datePickerType="single" id={`${id}--date-rule-picker-1`} onChange={addValue}>
        <DatePickerInput id={`${id}--date-rule-value-1`} labelText="" pattern={DATE_PATTERN} />
      </DatePicker>
    </div>
  );
};

OneOfValues.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
};

OneOfValues.defaultProps = {
  value: [],
};

export default OneOfValues;
