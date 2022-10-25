/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import {
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
} from '@carbon/react';
import { Modal} from '@carbon/react';

//TODO:  maybe todo, import WithState from somewhere.
import { Edit } from '@carbon/icons-react';


import MultilevelDropdown from './MultilevelDropdown';
import ActionIconDropdown from './ActionIconDropdown';

import { DropdownSkeleton, ExtendedDropdown, SortDropDown, sortStates } from '.';

const headers = [
  {
    id: 'column-A',
    text: 'Column A',
  },
  {
    id: 'column-B',
    text: 'Column B',
  },
  {
    id: 'column-C',
    text: 'Column C',
  },
];

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const rows = [
  {
    'column-A': 'Access',
    'column-B': 'Bread',
    'column-C': 'Cancel',
  },
  {
    'column-A': 'Test',
    'column-B': 'Key',
    'column-C': 'Bad',
  },
  {
    'column-A': 'Local',
    'column-B': 'Bad',
    'column-C': 'Car',
  },
];

const props = () => ({
  dropdownProps: {
    type: select('Dropdown type (type)', types, 'default'),
    label: text('Label (label)', 'Dropdown menu options'),
    ariaLabel: text('Aria Label (ariaLabel)', 'Dropdown'),
    disabled: boolean('Disabled (disabled)', false),
    light: boolean('Light variant (light)', false),
    titleText: text('Title (titleText)', 'Sort by'),
    helperText: text('Helper text (helperText)', ''),
    invalid: boolean('Show form validation UI (invalid)', false),
    invalidText: text('Form validation UI content (invalidText)', 'A valid value is required'),
    items: headers,
    keepOpenAfterSelect: boolean('Keep menu opened after option select', false),
  },
});

const otherDropdownProps = () => ({
  titleText: text('Title (titleText)', 'Sort by'),
  disabled: boolean('Disabled (disabled)', false),
});

const simpleProps = () => ({
  id: 'carbon-dropdown-example',
  ariaLabel: text('Aria Label (ariaLabel)', 'Dropdown'),
  disabled: boolean('Disabled (disabled)', false),
  label: text('Label (label)', 'Choose an option'),
  invalid: boolean('Show error', false),
  invalidText: text('Error message', 'Error message here'),
  searchPlaceHolderText: text('Placeholder text for search input', ''),
});

const SampleStructuredList = ({ sortRows }) => {
  return (
    <StructuredListWrapper>
      <StructuredListHead>
        <StructuredListRow head>
          {headers.map((header, id) => (
            <StructuredListCell key={id} head>
              {header.text}
            </StructuredListCell>
          ))}
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {rows.sort(sortRows).map((row, id) => {
          return (
            <StructuredListRow key={id}>
              <StructuredListCell>{row['column-A']}</StructuredListCell>
              <StructuredListCell>{row['column-B']}</StructuredListCell>
              <StructuredListCell>{row['column-C']}</StructuredListCell>
            </StructuredListRow>
          );
        })}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

const SortStructuredList = () => {
  const [sortDirection, setSortDirection] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const handleOnChange = (sortColumn, direction) => {
    setSortBy(sortColumn);
    setSortDirection(direction);
  };

  const sortRows = (a, b) => {
    if (sortDirection === sortStates.ASC) {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    if (sortDirection === sortStates.DESC) {
      return b[sortBy].localeCompare(a[sortBy]);
    }
    return 0;
  };

  return (
    <>
      <div style={{ width: '300px', margin: '0 0 120px 0' }}>
        <SortDropDown {...props()} onChange={handleOnChange} />
      </div>
      <div>
        <SampleStructuredList sortRows={sortRows} />
      </div>
    </>
  );
};

const items = [
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3',
  },
  {
    id: 'option-4',
    text: 'Option 4',
    disabled: true,
  },
];

const stringItems = ['Name', 'Status', 'Created by', 'Last modified'];

const itemsWithIcon = [
  {
    id: 'option1',
    text: 'Option 1',
    icon: <Edit size={16} />,
    iconAction: action('iconAction'),
    ariaLabel: 'Option 1 Edit',
  },
  {
    id: 'option3',
    text: 'Option 3',
    icon: <Edit size={16} />,
    iconAction: action('iconAction'),
    ariaLabel: 'Option 3 Edit',
  },
  { id: 'option4', text: 'Option 4', icon: <Edit size={16} />, iconAction: action('iconAction') },
  { id: 'option2', text: 'Option 2' },
];

const itemsExtend = [
  {
    id: 'option-1-1',
    text: 'Option 1-1',
  },
  {
    id: 'option-1-2',
    text: 'Option 1-2',
    sublist: [
      {
        id: 'option-2-1',
        text: 'Option 2-1',
      },
      {
        id: 'option-2-2',
        text: 'Option 2-2',
        sublist: [
          {
            id: 'option-3-1',
            text: 'Option 3-1',
            sublist: [
              {
                id: 'option-4-1',
                text: 'Option 4-1',
              },
              {
                id: 'option-4-2',
                text: 'Option 4-2',
              },
            ],
          },
          {
            id: 'option-3-2',
            text: 'Option 3-2',
          },
        ],
      },
    ],
  },
  {
    id: 'option-1-3',
    text: 'Option 1-3',
  },
  {
    id: 'option-1-4',
    text: 'Option 1-4',
    sublist: [
      {
        id: 'option-2-3',
        text: 'Option 2-3',
      },
      {
        id: 'option-2-4',
        text: 'Option 2-4',
      },
      {
        id: 'option-2-5',
        text: 'Option 2-5',
      },
    ],
  },
];

const itemToElement = item => {
  const itemAsArray = item.text.split(' ');
  return (
    <div>
      <span>{itemAsArray[0]}</span>
      <span style={{ color: 'blue' }}> {itemAsArray[1]}</span>
    </div>
  );
};

storiesOf('Components/Dropdown', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <div style={{ width: 300 }}>
        <ExtendedDropdown
          {...props().dropdownProps}
          id="default_dropdown"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          titleText={props().dropdownProps.type === 'inline' ? '' : props().dropdownProps.titleText}
        />
      </div>
    ),
    {
      info: {
        text: 'Dropdown',
      },
      'in-dsm': {
        id: '5fa0ca8abdc1e611d8225f17',
      },
    }
  )
  .add(
    'items as strings',
    () => (
      <div style={{ width: 300 }}>
        <ExtendedDropdown
          {...props().dropdownProps}
          id="dropdown_with_strings"
          items={stringItems}
          onChange={action('onChange')}
          titleText={props().dropdownProps.type === 'inline' ? '' : props().dropdownProps.titleText}
        />
      </div>
    ),
    {
      info: {
        text: 'Rendering an array of strings as `items`',
      },
    }
  )
  .add(
    'items as components',
    () => (
      <div style={{ width: 300 }}>
        <ExtendedDropdown
          {...props().dropdownProps}
          id="dropdown_with_items"
          items={items}
          itemToElement={itemToElement}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          titleText={props().dropdownProps.type === 'inline' ? '' : props().dropdownProps.titleText}
        />
      </div>
    ),
    {
      info: {
        text: `Rendering items as custom components`,
      },
    }
  )
  .add('search dropdown with label', () => (
    <div style={{ width: 300 }}>
      <Dropdown
        {...simpleProps()}
        ariaLabel="Search dropdown with label"
        id="search-dropdown-label"
        items={stringItems}
        onChange={action('onChange')}
        titleText="Sort by"
        withSearch
      />
    </div>
  ))
  .add('search dropdown inline', () => (
    <div style={{ width: 300 }}>
      <ExtendedDropdown
        {...simpleProps()}
        ariaLabel="Search dropdown inline"
        id="search-dropdown-inline"
        items={stringItems}
        onChange={action('onChange')}
        titleText=""
        type="inline"
        withSearch
      />
    </div>
  ))
  /*
  .add(
    'fully controlled',
    () => (
      <WithState initialState={{ selectedItem: items[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <ExtendedDropdown
              {...props().dropdownProps}
              items={items}
              itemToString={item => (item ? item.text : '')}
              onChange={({ selectedItem }) => setTimeout(() => setState({ selectedItem }), 1000)}
              selectedItem={state.selectedItem}
              titleText={
                props().dropdownProps.type === 'inline' ? '' : props().dropdownProps.titleText
              }
            />
          </div>
        )}
      </WithState>
    ),
    {
      info: {
        text: `
            Sometimes you want to control everything.
          `,
      },
    }
  ) */
  .add(
    'skeleton',
    () => (
      <div style={{ width: 300 }}>
        <DropdownSkeleton />
        &nbsp;
        <DropdownSkeleton inline />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
          `,
      },
    }
  )
  .add('Dropdown with label', () => (
    <div style={{ width: 300 }}>
      <ExtendedDropdown
        {...simpleProps()}
        items={headers}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
        titleText="Label"
      />
    </div>
  ))
  .add('Dropdown (no label)', () => (
    <div style={{ width: 300 }}>
      <ExtendedDropdown
        {...simpleProps()}
        items={headers}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
      />
    </div>
  ))
  .add('drop down inline', () => (
    <div style={{ width: 300 }}>
      <ExtendedDropdown
        {...simpleProps()}
        items={headers}
        itemToString={item => (item ? item.text : '')}
        label="Label"
        light
        onChange={action('onChange')}
        type="inline"
      />
    </div>
  ))
  .add('skeleton light', () => (
    <div style={{ width: 300 }}>
      <DropdownSkeleton style={{ width: 300, marginBottom: 8 }} />
      &nbsp;
      <DropdownSkeleton inline light style={{ width: 300 }} />
    </div>
  ))
  .add('sort drop down', () => <SortStructuredList />, {
    info: {
      text: 'Dropdown',
    },
  })
  .add(
    'Other dropdown',
    () => (
      <>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 300 }}>
            <ExtendedDropdown
              {...otherDropdownProps()}
              ariaLabel="Search dropdown with label"
              id="search-dropdown-other-dropdown"
              items={stringItems}
              label="Choose an option"
              onChange={action('onChange')}
              withSearch
            />
          </div>

          <div style={{ width: 300 }}>
            <ExtendedDropdown
              {...otherDropdownProps()}
              ariaLabel="Search dropdown with label"
              id="search-dropdown-other-dropdown-icon"
              items={stringItems}
              label="Choose an option"
              onChange={action('onChange')}
              withItemIcon
            />
          </div>
        </div>

        <div style={{ width: 200 }}>
          <MultilevelDropdown
            {...otherDropdownProps()}
            isParentSelectable={boolean('Is Parent Selectable (isParentSelectable)', true)}
            items={itemsExtend}
            titleText="Multi-level dropdown 200px width"
          />
        </div>
      </>
    ),
    {
      info: {
        text: 'Dropdown',
      },
    }
  )
  .add('inside a Modal', () => {
    return (
      <Modal open>
        <ExtendedDropdown
          {...simpleProps()}
          items={stringItems}
          onChange={action('onChange')}
          withPortal
        />
      </Modal>
    );
  })
  .add(
    'action icon dropdown',
    () => (
      <div style={{ width: 200 }}>
        <ActionIconDropdown {...otherDropdownProps()} items={itemsWithIcon} />
      </div>
    ),
    {
      info: {
        text: 'Dropdown',
      },
    }
  )
  .add(
    'action icon dropdown inline',
    () => (
      <div style={{ width: 200 }}>
        <ActionIconDropdown {...otherDropdownProps()} items={itemsWithIcon} type="inline" />
      </div>
    ),
    {
      info: {
        text: 'Dropdown',
      },
    }
  )
  /*
  .add(
    'fully controlled icon dropdown',
    () => (
      <WithState initialState={{ selectedItem: itemsWithIcon[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <ActionIconDropdown
              {...otherDropdownProps()}
              ariaLabel="drop-down option has edit icon can be chosen by Tab"
              items={itemsWithIcon}
              onChange={({ selectedItem }) => setTimeout(() => setState({ selectedItem }), 1000)}
              selectedItem={state.selectedItem}
            />
          </div>
        )}
      </WithState>
    ),
    {
      info: {
        text: `
            Sometimes you want to control everything.
          `,
      },
    }
  );

   */
