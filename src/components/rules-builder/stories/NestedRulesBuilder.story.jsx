/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { RadioButton, RadioButtonGroup } from '@carbon/react';

import RulesBuilder from '../RulesBuilder';
import { CONJUNCTION_AND } from '../constants';
// import Button from '../../button';
import { useNodeRef } from '../../../utils/hooks';  // TODO:
// import Modal from '../../modal/Modal';

import { Button,  Modal} from '@carbon/react';

import mdx from './docs/NestedRulesBuilder.mdx';

export default {
  title: 'Components/RulesBuilder/NestedRulesBuilder',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const TABLES = ['users', 'products', 'orders', 'payments'];

  const ColumnRules = React.memo(
    ({ onChange, initialValue, isReadOnly }) => {
      const CRITERIA_CONFIG = {
        COLUMN: { type: 'string' },
      };

      const CRITERIA_DROPDOWN = [
        {
          id: 'COLUMN',
          text: 'Column name',
        },
      ];

      return (
        <RulesBuilder
          criteriaConfig={CRITERIA_CONFIG}
          criteriaDropdown={CRITERIA_DROPDOWN}
          initialRules={initialValue || undefined}
          isLight
          isReadOnly={isReadOnly}
          maxDepth={3}
          onRulesChange={onChange}
        />
      );
    },
    (prev, next) =>
      prev.table === next.table &&
      prev.operator === next.operator &&
      prev.isReadOnly === next.isReadOnly
  );

  const InputComponent = ({ isReadOnly, onChange, operator, value }) => {
    const { table: initialTable, columnRules: initialColumnRules } = value || {};
    const [buttonRef, setButtonRef] = useNodeRef();
    const [isModalOpened, triggerModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(initialTable || null);
    const [columnsUpdated, setColumnsUpdated] = useState(false);

    const handleColumnSelect = useCallback(
      columnRules => {
        onChange({ table: selectedTable, columnRules });
        setColumnsUpdated(true);
      },
      [onChange, selectedTable]
    );

    if (isReadOnly) {
      return (
        <div style={{ flexDirection: 'column' }}>
          <span style={{ fontWeight: 500 }}>&nbsp;{selectedTable}</span>
          <div style={{ padding: '4px' }}>
            <ColumnRules
              initialValue={!columnsUpdated ? initialColumnRules : undefined}
              isReadOnly={isReadOnly}
              operator={operator?.value}
              table={selectedTable}
            />
          </div>
        </div>
      );
    }

    if (!operator) {
      return null;
    }

    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <code style={{ margin: '0 15px' }}>{selectedTable}</code>
          <Button
            ref={setButtonRef}
            kind={selectedTable ? 'ghost' : 'primary'}
            onClick={() => triggerModal(true)}
            size="field"
          >
            Select table
          </Button>
          <Modal
            onRequestClose={() => triggerModal(false)}
            onRequestSubmit={() => triggerModal(false)}
            open={isModalOpened}
            primaryButtonText="Close"
            triggerRef={buttonRef}
          >
            <RadioButtonGroup
              defaultSelected="default-selected"
              name="received-times-radio-group"
              onChange={setSelectedTable}
              orientation="vertical"
              valueSelected={selectedTable}
            >
              {TABLES.map(label => (
                <RadioButton key={label} id={label} labelText={label} value={label} />
              ))}
            </RadioButtonGroup>
          </Modal>
        </div>
        {selectedTable && (
          <div style={{ flexBasis: '100%' }}>
            <ColumnRules
              initialValue={!columnsUpdated ? initialColumnRules : undefined}
              onChange={handleColumnSelect}
              operator={operator?.value}
              table={selectedTable}
            />
          </div>
        )}
      </>
    );
  };

  const CRITERIA_CONFIG = {
    TABLE: {
      type: 'custom',
      inputComponent: InputComponent,
      operators: ['IS', 'CONTAINS'],
    },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'TABLE',
      text: 'Table',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'TABLE',
        data: {
          operator: 'IS',
          value: {
            columnRules: {
              conjunction: CONJUNCTION_AND.id,
              data: [
                {
                  criteriaKey: 'COLUMN',
                  data: {
                    operator: 'IS',
                    value: 'Foo',
                  },
                },
              ],
            },
            table: 'products',
          },
        },
      },
      {},
    ],
  };

  return (
    <RulesBuilder
      criteriaConfig={CRITERIA_CONFIG}
      criteriaDropdown={CRITERIA_DROPDOWN}
      initialRules={INITIAL_RULES}
      isReadOnly={boolean('isReadOnly', false)}
      maxDepth={number('Max. number of levels (nesting)', Infinity, {})}
      onRulesChange={action('onRulesChange')}
    />
  );
};
