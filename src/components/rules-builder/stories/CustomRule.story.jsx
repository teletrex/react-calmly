/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import without from 'lodash/without';
import { Folder, Email } from '@carbon/icons-react';

import RulesBuilder from '../RulesBuilder';
import { CONJUNCTION_AND } from '../constants';
//import Button from '../../button';
//import { useNodeRef } from '../../utils/hooks';
//import Modal from '../../modal/Modal';
//import Tag from '../../tag';
import MagicTable from '../../magic-table/MagicTable';

import { Button, Modal, Tag} from '@carbon/react';
import {useNodeRef} from '../../../utils/hooks';

// import useNodeRef from somewhere.
import mdx from './docs/CustomRule.mdx';

const LIST_DATA = [
  {
    id: 'root',
    name: '/',
    icon: <Folder size={16} />,
    subRows: [
      {
        id: 'external-email',
        name: 'External Email',
        icon: <Email size={16} />,
      },
      {
        id: 'internal-emails',
        name: 'Internal Emails',
        icon: <Folder size={16} />,
        subRows: [
          {
            id: 'nba-demo-1',
            name: 'NBA Demo',
            icon: <Email size={16} />,
          },
          {
            id: 'nba-demo-2',
            name: 'NBA Demo',
            icon: <Email size={16} />,
          },
          {
            id: 'nba-demo-3',
            name: 'NBA Demo',
            icon: <Email size={16} />,
          },
          {
            id: 'nba-demo-4',
            name: 'NBA Demo',
            icon: <Email size={16} />,
          },
        ],
      },
      {
        id: 'forward-to-a-friend',
        name: 'Forward to a friend',
        icon: <Folder size={16} />,
        subRows: [
          {
            id: 'nba-demo-5',
            name: 'NBA Demo',
            icon: <Email size={16} />,
          },
        ],
      },
    ],
  },
  {
    id: 'root2',
    name: '/dev',
    icon: <Folder size={16} />,
  },
];

export default {
  title: 'Components/RulesBuilder/CustomRule',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const FolderItem = ({ item: { icon, name } }) => (
    <span style={{ display: 'flex' }}>
      {icon} <span style={{ marginLeft: '20px' }}>{name}</span>
    </span>
  );

  const InputComponent = ({
    isLight,
    isReadOnly,
    onChange,
    operator,
    setTimeframeVisibility,
    value,
  }) => {
    const [ref, setRef] = useNodeRef();
    const [isModalOpened, triggerModal] = useState(false);
    const [selectedItems, setSelection] = useState(value);
    const buttonKind = isLight ? 'tertiary' : 'primary';

    useEffect(() => {
      setTimeframeVisibility(!isEmpty(value));
    }, [setTimeframeVisibility, value]);

    const dataTableConfig = [
      {
        id: 'folder',
        hasExpandButton: true,
        renderCol: item => <FolderItem item={item} />,
        renderHeader: () => 'Folder',
      },
    ];

    const subRowsConfig = [
      {
        id: 'folder',
        renderCol: item => <FolderItem item={item} />,
        renderHeader: () => 'Folder',
      },
    ];

    const handleSelection = (isChecked, id) => {
      let newItems;
      if (isChecked) {
        newItems = [...selectedItems, id];
      } else {
        newItems = without(selectedItems, id);
      }

      setSelection(newItems);
      onChange(newItems);
    };

    if (isReadOnly) {
      return <span style={{ fontWeight: 500 }}>&nbsp;{value.join(', ')}</span>;
    }

    if (!operator) {
      return null;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {map(selectedItems, item => (
          <Tag key={item} filter onClick={() => handleSelection(false, item)}>
            {item}
          </Tag>
        ))}
        <Button
          ref={setRef}
          kind={selectedItems.length ? 'ghost' : buttonKind}
          onClick={() => triggerModal(true)}
          size="field"
        >
          Select directory
        </Button>
        <Modal
          onRequestClose={() => triggerModal(false)}
          onRequestSubmit={() => triggerModal(false)}
          open={isModalOpened}
          primaryButtonText="Confirm"
          triggerRef={ref}
        >
          <MagicTable
            config={dataTableConfig}
            data={LIST_DATA}
            disableExpandableRowsSelection={boolean('Disable expandable row selection', false)}
            hasPagination={false}
            radio={boolean('Single selection table', false)}
            subRowsConfig={subRowsConfig}
          />
        </Modal>
      </div>
    );
  };

  const CRITERIA_CONFIG = {
    SEGMENT: {
      type: 'custom',
      inputComponent: InputComponent,
      hasTimeframe: true,
    },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'SEGMENT',
      text: 'Segment',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'SEGMENT',
        data: { operator: 'HAS', value: ['Foo Directory'] },
      },
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
