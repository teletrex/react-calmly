/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import  settings from '../../../settings';
import { ChevronDown, ChevronUp} from '@carbon/icons-react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';

import { useTranslation } from '../../../translation';
import Checkbox from '../../checkbox';

const { prefix } = settings;

export const getTitleClassName = collapsable =>
  classNames(`${prefix}--recharts__legend_title`, {
    [`${prefix}--recharts__legend_title-collapsable`]: collapsable,
  });

export const getIconWhen = collapsed => (collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />);

const CustomLegend = ({
  data,
  onChange,
  withMetrics,
  collapsable,
  collapsed,
  onCollapse,
  selectAllEntriesAfterAllWereDeselected,
}) => {
  const { t } = useTranslation();

  const [hiddenEntries, setHiddenEntries] = useState([]);

  const handleLegendItemClick = useCallback(
    entry => checked => {
      let newHiddenEntries;

      const isAllDeselected = !checked && hiddenEntries.length === data.length - 1;

      if (selectAllEntriesAfterAllWereDeselected && isAllDeselected) {
        newHiddenEntries = [];
      } else {
        newHiddenEntries = checked
          ? hiddenEntries.filter(entryName => entryName !== entry.name)
          : [...hiddenEntries, entry.name];
      }

      setHiddenEntries(newHiddenEntries);
      onChange(newHiddenEntries);
    },
    [data.length, hiddenEntries, onChange, selectAllEntriesAfterAllWereDeselected]
  );

  const isChecked = entry => !hiddenEntries.includes(entry.name);

  const className = classNames(`${prefix}--recharts__legend`, {
    [`${prefix}--recharts__legend-with-metrics`]: withMetrics,
    [`${prefix}--recharts__legend-collapsed`]: collapsed,
  });

  const collapseArrow = useMemo(() => getIconWhen(collapsed), [collapsed]);
  const dataA = [];
  const dataB = [];

  data.forEach(it => {
    if (it.comparingGroup) {
      dataA.push(it);
    } else {
      dataB.push(it);
    }
  });

  const legendRenderItems = (data, id) =>
    data.map((entry, index) => (
      <li
        key={`leg-${index}-${id}`}
        style={{
          '--checkbox-background-color': entry.color,
          '--checkbox-border-color': entry.color,
        }}
      >
        <Checkbox
          checked={isChecked(entry)}
          data-testid={`checkbox-${entry.name}`}
          id={uniqueId(`leg-${entry.name}`)}
          labelText={entry.name}
          onChange={handleLegendItemClick(entry)}
        />
      </li>
    ));
  return (
    <div className={className} data-testid="recharts__legend">
      <button
        className={getTitleClassName(collapsable)}
        data-testid="legend-title"
        onClick={onCollapse}
        type="button"
      >
        <span>{t('Legend')}</span>
        {collapsable && collapseArrow}
      </button>
      {!collapsed && (
        <ul data-testid="legend-items">
          {legendRenderItems(dataA, 'A')}
          {dataA.length > 0 && dataB.length > 0 && (
            <li>
              <hr />
            </li>
          )}
          {legendRenderItems(dataB, 'B')}
        </ul>
      )}
    </div>
  );
};

CustomLegend.defaultProps = {
  collapsable: false,
  collapsed: false,
  data: [],
  onCollapse: noop,
  selectAllEntriesAfterAllWereDeselected: true,
  withMetrics: false,
};

CustomLegend.propTypes = {
  collapsable: PropTypes.bool,
  collapsed: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func.isRequired,
  onCollapse: PropTypes.func,
  selectAllEntriesAfterAllWereDeselected: PropTypes.bool,
  withMetrics: PropTypes.bool,
};

export default CustomLegend;
