/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../../settings';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import omit from 'lodash/omit';
import filter from 'lodash/filter';
import classNames from 'classnames';

import {Dropdown, MultiSelect} from '@carbon/react';  // was new-dropdown
import { useTranslation } from '../../../translation';

const { prefix } = settings;

const ChartMetrics = ({ items, onChange, limit, width, placeholder, label, helperText, size = 'sm'}) => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const isMultiselect = limit > 1;

  const omitProperty = (data, prop) => omit(data, prop);
  const omitChecked = useCallback(data => data.map(i => omitProperty(i, 'checked')), []);

  const setItemDisabledStatus = useCallback(
    (data, selectedMetrics) => {
      const hitLimit = isMultiselect && selectedMetrics.length >= limit;
      return data.map(metric => ({
        ...metric,
        isDisabled: metric.isDisabled || (!find(selectedMetrics, metric) && hitLimit),
      }));
    },
    [isMultiselect, limit]
  );

  useEffect(() => {
    const itemsClone = omitChecked(cloneDeep(items || []));
    setMetrics(setItemDisabledStatus(itemsClone, selectedMetrics));
  }, [items, omitChecked, selectedMetrics, setItemDisabledStatus]);

  useEffect(() => {
    const nextSelectedMetrics = omitChecked(filter(items, 'checked'));
    setSelectedMetrics(setItemDisabledStatus(nextSelectedMetrics, nextSelectedMetrics));
  }, [items, omitChecked, setItemDisabledStatus]);

  const handleMetricSelect = e => {
    const hasOnChange = onChange && typeof onChange === 'function';
    if (isMultiselect) {
      const { selectedItems } = e;
      if (selectedItems.length <= limit) {
        if (hasOnChange) {
          onChange(selectedItems.map(item => omitProperty(item, 'isDisabled')));
        }
        setSelectedMetrics(selectedItems);
      }
    } else {
      const { selectedItem } = e;
      if (hasOnChange) {
        onChange(omitProperty(selectedItem, 'isDisabled'));
      }
      setSelectedMetrics([selectedItem]);
    }
  };

  const style = width
    ? {
        maxWidth: `${width}px`,
      }
    : null;

  return (
    <div
      className={classNames(`${prefix}--chart-metrics`, {
        [`${prefix}--chart-metrics-multiple`]: isMultiselect,
      })}
      data-testid="chart-metrics"
      style={style}
    >
      {isMultiselect &&
      <MultiSelect
        size={size}
        ariaLabel="Dropdown"
        helperText={
          helperText || t('Select up to {{limit}} metrics', { limit })
        }
        id="chart_metrics"
        items={metrics}
        itemToString={item => (item ? item.name : '')}
        labelText={label || t('Metrics')}
        onChange={handleMetricSelect}
        placeholder={placeholder || t('selected')}
        selectedItems={isMultiselect ? selectedMetrics : selectedMetrics[0]}
      />

      }
      { !isMultiselect &&
      <Dropdown
        size={size}
        ariaLabel="Dropdown"
        helperText={ helperText }
        id="chart_metrics"
        items={metrics}
        itemToString={item => (item ? item.name : '')}
        labelText={label || t('Metrics')}
        onChange={handleMetricSelect}
        placeholder={placeholder || t('selected')}
        selectedItem={isMultiselect ? selectedMetrics : selectedMetrics[0]}
      />
      }
    </div>
  );
};

export const chartMetricsPropTypes = {
  helperText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.number,
};

export const chartMetricsDefaultPropTypes = {
  helperText: '',
  items: [],
  label: '',
  limit: 2,
  onChange: undefined,
  placeholder: '',
  width: undefined,
};

ChartMetrics.propTypes = chartMetricsPropTypes;
ChartMetrics.defaultProps = chartMetricsDefaultPropTypes;

export default ChartMetrics;
