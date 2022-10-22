/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {useTranslation} from '../../../../../translation';
import RulesBuilderContext from '../../../RulesBuilderContext';

const RuleElementMenu = ({
  className,
  duplicateDisabled,
  moveDownDisabled,
  moveUpDisabled,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}) => {
  const { t } = useTranslation();
  const { maxOperands, totalOperands } = useContext(RulesBuilderContext);

  return (
    <OverflowMenu className={className} data-testid="overflow-menu" flipped>
      <OverflowMenuItem
        disabled={duplicateDisabled || maxOperands <= totalOperands}
        itemText={t('Duplicate')}
        onClick={onDuplicate}
      />
      <OverflowMenuItem disabled={moveUpDisabled} itemText={t('Move up')} onClick={onMoveUp} />
      <OverflowMenuItem
        disabled={moveDownDisabled}
        itemText={t('Move down')}
        onClick={onMoveDown}
      />
    </OverflowMenu>
  );
};

RuleElementMenu.propTypes = {
  duplicateDisabled: PropTypes.bool,
  moveDownDisabled: PropTypes.bool,
  moveUpDisabled: PropTypes.bool,
  onDuplicate: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
};

RuleElementMenu.defaultProps = {
  duplicateDisabled: false,
  moveDownDisabled: false,
  moveUpDisabled: false,
};

export default RuleElementMenu;
