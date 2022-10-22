/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import classNames from 'classnames';

import {Button, Checkbox} from '@carbon/react';
import { defaultClassName } from '../constants';
import { optionsPropTypes } from '../prop-types';

const Options = ({ t, options, shouldDisplayShowMoreButton, onOptionToggle, onShowMoreClick }) => {

  return (
    <div className={`${defaultClassName}__options`}>
      {options.map(({ checked, resultsCount, text, value, disabled }) => (
        <div
          key={value}
          className={classNames(`${defaultClassName}__option`, {
            [`${defaultClassName}__option--disabled`]: disabled,
          })}
        >
          <Checkbox
            checked={checked}
            className={`${defaultClassName}__checkbox-label`}
            disabled={disabled}
            id={`column-filter-option-${value}`}
            labelText={text}
            onChange={() => onOptionToggle(value)}
            title={text}
            wrapperClassName={`${defaultClassName}__checkbox-wrapper`}
          />
          {!isNil(resultsCount) && (
            <div className={`${defaultClassName}__results-count`}>{resultsCount}</div>
          )}
        </div>
      ))}
      {shouldDisplayShowMoreButton && (
        <Button kind="ghost" onClick={onShowMoreClick} preventDefaultOnMouseDown size="small">
          {t('Show more')}
        </Button>
      )}
      {options.length === 0 && (
        <div className={`${defaultClassName}__empty-state-text`}>{t('Click Enter to add wildcard text to search terms.')}</div>
//        <EmptyStates
//          buttonHidden
//          state="no-result-state-simple"
//          text=
//          title={null}
//        />
      )}
    </div>
  );
};

Options.propTypes = {
  onOptionToggle: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  options: optionsPropTypes.isRequired,
  shouldDisplayShowMoreButton: PropTypes.bool,
};

Options.defaultProps = {
  shouldDisplayShowMoreButton: false,
};

export default Options;
