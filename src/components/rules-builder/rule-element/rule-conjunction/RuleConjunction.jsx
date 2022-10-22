/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import settings from '../../../../settings';
import compact from 'lodash/compact';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
import reduce from 'lodash/reduce';
import cn from 'classnames';

import {
  CONJUNCTION_AND as CONJUNCTION_AND_DEFAULT,
  CONJUNCTION_OR as CONJUNCTION_OR_DEFAULT,
  CONJUNCTIONS,
} from '../../constants';
//import { Dropdown } from '../../../new-dropdown';
import RulesBuilderContext from '../../RulesBuilderContext';
import { Dropdown} from '@carbon/react';
import {useTranslation} from "../../../../translation";

const { prefix } = settings;
const defaultClassName = `${prefix}--conjunction`;

const RuleConjunction = ({
  disableBracketConjunction,
  id,
  initialConjunction,
  onConjunctionChange,
}) => {
  const { t } = useTranslation();

  const { oneConjunctionMode, isLight, isReadOnly, rulesLabels } = useContext(RulesBuilderContext);

  const {
    CONJUNCTION_AND,
    CONJUNCTION_AND_ALL,
    CONJUNCTION_AND_BRACKETS,
    CONJUNCTION_OR,
    CONJUNCTION_OR_ALL,
    CONJUNCTION_OR_BRACKETS,
  } = {
    ...CONJUNCTIONS,
    ...reduce(
      rulesLabels,
      (prev, label, key) => ({ ...prev, [key]: { ...CONJUNCTIONS[key], label } }),
      {}
    ),
  };

  const handleChange = ({ selectedItem }) => {
    onConjunctionChange(selectedItem);
  };

  const labelConjunction =
    initialConjunction === CONJUNCTION_AND.id ? CONJUNCTION_AND : CONJUNCTION_OR;

  const conjunctionItems = useMemo(() => {
    let conjunctionA;
    let conjunctionB;

    if (!oneConjunctionMode) {
      conjunctionA =
        initialConjunction === CONJUNCTION_AND.id ? CONJUNCTION_OR_ALL : CONJUNCTION_AND_ALL;
    }

    if (!disableBracketConjunction) {
      if (initialConjunction === CONJUNCTION_AND.id) {
        conjunctionB = oneConjunctionMode ? CONJUNCTION_AND_BRACKETS : CONJUNCTION_OR_BRACKETS;
      } else {
        conjunctionB = oneConjunctionMode ? CONJUNCTION_OR_BRACKETS : CONJUNCTION_AND_BRACKETS;
      }
    }

    return compact([conjunctionA, conjunctionB]).map(conjunction => ({
      ...conjunction,
      label: t(conjunction.label),
    }));
  }, [
    disableBracketConjunction,
    CONJUNCTION_AND_ALL,
    CONJUNCTION_AND_BRACKETS,
    CONJUNCTION_AND,
    CONJUNCTION_OR_ALL,
    CONJUNCTION_OR_BRACKETS,
    initialConjunction,
    oneConjunctionMode,
    t,
  ]);

  return (
    <div className={`${defaultClassName}`}>
      {isReadOnly ? (
        <span className={`${defaultClassName}--readonly`}>{labelConjunction.label}</span>
      ) : (
        <Dropdown
          ariaLabel={t('Rule conjunction')}
          className={cn({
            [`${defaultClassName}--empty`]: conjunctionItems.length === 0,
          })}
          id={`${id}-rule-conjunction`}
          isInline
          isLight={isLight}
          items={conjunctionItems}
          onChange={handleChange}
          selectedItem={labelConjunction}
          size="small"
        />
      )}
    </div>
  );
};

RuleConjunction.propTypes = {
  disableBracketConjunction: PropTypes.bool,
  id: PropTypes.string,
  initialConjunction: PropTypes.oneOf([CONJUNCTION_AND_DEFAULT.id, CONJUNCTION_OR_DEFAULT.id])
    .isRequired,
  onConjunctionChange: PropTypes.func,
};

RuleConjunction.defaultProps = {
  disableBracketConjunction: false,
  id: `RuleConjunction_${uniqueId()}`,
  onConjunctionChange: noop,
};

export default RuleConjunction;
