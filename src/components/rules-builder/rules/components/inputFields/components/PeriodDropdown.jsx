/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@carbon/react';
import { useTranslation } from '../../../../../../translation';
import { PERIODS } from '../../../constants';

const PeriodDropdown = ({ idPrefix, onChange, value }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      ariaLabel="period-dropdown"
      id={`${idPrefix}--period-dropdown`}
      initialSelectedItem={value}
      items={PERIODS}
      onChange={onChange}
      placeholder={t('Select period')}
    />
  );
};

PeriodDropdown.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};

PeriodDropdown.defaultProps = {
  value: PERIODS[0],
};

export default PeriodDropdown;
