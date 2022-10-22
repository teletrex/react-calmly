/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';
import { Close } from '@carbon/icons-react';
import { match } from '../keyboard';
import noop from 'lodash/noop';

const { prefix } = settings;

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */

const ListBoxSelection = ({
  clearSelection,
  selectionCount,
  translateWithId: t,
  disabled,
  onClearSelection,
}) => {
  const className = classNames(`${prefix}--list-box__selection`, {
    [`${prefix}--tag--filter`]: selectionCount,
    [`${prefix}--list-box__selection--multi`]: selectionCount,
  });
  const handleOnClick = event => {
    event.stopPropagation();
    if (disabled) {
      return;
    }
    clearSelection(event);
    if (onClearSelection) {
      onClearSelection(event);
    }
  };
  const handleOnKeyDown = event => {
    event.stopPropagation();
    if (disabled) {
      return;
    }

    // When a user hits ENTER, we'll clear the selection
    if (
      match(event, {
        key: 'Enter',
        which: 13,
        keyCode: 13,
      })
    ) {
      clearSelection(event);
      if (onClearSelection) {
        onClearSelection(event);
      }
    }
  };
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  return (
    <div
      aria-label="Clear Selection"
      className={className}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      title={description}
    >
      {selectionCount}
      <Clos size={16} />
    </div>
  );
};

export const translationIds = {
  'clear.all': 'clear.all',
  'clear.selection': 'clear.selection',
};

const defaultTranslations = {
  [translationIds['clear.all']]: 'Clear all selected items',
  [translationIds['clear.selection']]: 'Clear selected item',
};

ListBoxSelection.propTypes = {
  clearSelection: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onClearSelection: PropTypes.func,
  selectionCount: PropTypes.number,
  translateWithId: PropTypes.func,
};

ListBoxSelection.defaultProps = {
  disabled: false,
  onClearSelection: noop,
  selectionCount: undefined,
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxSelection;
