/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
import  settings  from '../../../settings';

import { Checkbox, Button} from '@carbon/react';
import { withTranslation } from '../../../translation';

const { prefix } = settings;

const createExtendedOptions = options => {
  return options.map(option => ({
    ...option,
    id: uniqueId(`${prefix}--checkbox-list-`),
  }));
};

class CheckboxList extends Component {
  state = {
    extendedOptions: [],
    prevOptions: [],
  };

  static getDerivedStateFromProps(props, state) {
    const valueChange = !isEqual(state.extendedOptions, props.options);

    if (!isEqual(state.prevOptions, props.options) && valueChange) {
      const clonedOptions = cloneDeep(props.options);
      return {
        extendedOptions: createExtendedOptions(clonedOptions),
        prevOptions: clonedOptions,
      };
    }

    if (!isEqual(state.prevOptions, props.options)) {
      return {
        ...state,
        prevOptions: cloneDeep(props.options),
      };
    }

    return null;
  }

  onChange = (checked, id) => {
    const { extendedOptions } = this.state;
    const { hasSingleSelect } = this.props;

    const { value } = extendedOptions[extendedOptions.findIndex(elem => elem.id === id)];

    const newExtendedOption = extendedOptions.map(option => {
      let isChecked = option.checked;

      if (option.value === value) {
        isChecked = checked;
      } else if (hasSingleSelect) {
        isChecked = false;
      }

      return { ...option, checked: isChecked };
    });

    this.setState({ extendedOptions: newExtendedOption });
    this.props.onChangeSelection(newExtendedOption);
  };

  render() {
    const { simple, limit, onPushLimit, t } = this.props;
    const { extendedOptions } = this.state;
    const visibleOptions = extendedOptions.filter(opt => !opt.invisible);

    const limitedOptionsToDisplay = visibleOptions.slice(0, limit);
    const isShowMore = limit < visibleOptions.length;
    return (
      <div className={`${prefix}--data-table-filters-window__checkbox-list`}>
        {limitedOptionsToDisplay.map((option, key) => (
          <div key={key} className={`${prefix}--data-table-filters-window__checkbox-list-item`}>
            <Checkbox
              checked={option.checked}
              id={option.id}
              indeterminate={option.indeterminate}
              labelText={option.text}
              onChange={this.onChange}
              title={option.hoveringTooltip || option.text}
            />
            {option.itemCounter && !simple && (
              <div className={`${prefix}--checkbox-counter-text`}>{option.itemCounter}</div>
            )}
          </div>
        ))}
        {isShowMore && (
          <Button
            className={`${prefix}--data-table-filters-window--show-more`}
            kind="ghost"
            onClick={onPushLimit}
            preventDefaultOnMouseDown
            size="small"
          >
            {t('Show more')}
          </Button>
        )}
      </div>
    );
  }
}

CheckboxList.propTypes = {
  hasSingleSelect: PropTypes.bool,
  limit: PropTypes.number,
  onChangeSelection: PropTypes.func.isRequired,
  onPushLimit: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      hoveringTooltip: PropTypes.string,
      invisible: PropTypes.bool,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
  simple: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

CheckboxList.defaultProps = {
  hasSingleSelect: false,
  limit: 10,
  onPushLimit: noop,
  simple: false,
};

export default withTranslation()(CheckboxList);
