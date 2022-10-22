/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import {Modal, Button} from '@carbon/react';
import Badge from '../badge/Badge';
import InsightsFlag from '../badge/InsightsFlag';
import { useNodeRef } from '../../utils/hooks';
import  TableToolbarSearchDropdown  from '../magic-table/components/TableToolbarSearchDropdown';

import SearchDropDown, { SearchDropDownPortalAnchor } from './SearchDropDown';
import SearchGroup from './search-drop-down-elements/SearchGroup';
import SearchHeader from './search-drop-down-elements/SearchHeader';
import SearchElement from './search-drop-down-elements/SearchElement';
import SearchElementContent from './search-drop-down-elements/SearchElementContent';
import SearchElementStatus from './search-drop-down-elements/SearchElementStatus';

const props = ({ dropdownMaxHeight = '500px' } = {}) => ({
  className: 'storybook-search-dropdown',
  kind: select('Kind (kind)', { primary: 'primary', secondary: 'secondary' }, 'secondary'),
  size: select('Size (size)', { small: 'small', large: 'large' }, 'small'),
  withBorderBottom: boolean('With border bottom', false),
  showDropdownOnInputFocus: boolean('show dropdown on input focus', false),
  handleSelect: action('handleSelect'),
  onChange: action('onChange'),
  disabled: boolean('Disabled state (disabled)', false),
  selectedElementCallback: action('selectedElementCallback'),
  dropdownMaxHeight: text('dropdownMaxHeight', dropdownMaxHeight),
  labelText: text('Set label text', ''),
  withMagnifyingGlass: boolean('Show magnifying glass', true),
});

const toolbarSearchProps = () => ({
  onSearch: action('onSearch'),
  onSearchChange: action('onSearchChange'),
  onSearchInputChange: action('onSearchInputChange'),
  onSearchSelect: action('onSearchSelect'),
  searchChangeDelay: number('searchChangeDelay', 500),
  searchTextValue: text('Search Text Value (searchTextValue)', 'search text initial value'),
  onDropDownOpenChange: action('onDropDownOpenChange'),
});

const modalProps = () => ({
  modalHeading: 'Modal heading',
  modalLabel: 'Label',
  modalAriaLabel: 'A label to be read by screen readers on the modal root node',
  primaryButtonText: 'Primary Button',
  secondaryButtonText: 'Secondary Button',
});

// NOTE: in __DEV__ mode enabled extra knobs to check portals positioning
// behavior having browser and/or inner scrollbars;
const isDevelopingMode = false;

const StorySearchDropDown = ({ component: SearchComponent = SearchDropDown, ...props }) => {
  return (
    <>
      <SearchComponent {...props}>
        <SearchGroup>
          <SearchHeader>Recent</SearchHeader>
          <SearchElement clickable onClick={action('search element clicked')}>
            <SearchElementContent>Lorem Ipsum</SearchElementContent>
            <SearchElementStatus>
              <Badge label="New" />
            </SearchElementStatus>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>Dolor sit amet</SearchElementContent>
            <SearchElementStatus>Removed</SearchElementStatus>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>Consectetur adipiscing</SearchElementContent>
          </SearchElement>
        </SearchGroup>

        <SearchGroup>
          <SearchHeader>Insights</SearchHeader>
          <SearchElement clickable>
            <SearchElementContent>
              <InsightsFlag className="search-dd-story-insight" showButton={false} /> Lorem Ipsum
            </SearchElementContent>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>
              <InsightsFlag className="search-dd-story-insight" showButton={false} /> Dolor sit amet
            </SearchElementContent>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>
              <InsightsFlag className="search-dd-story-insight" showButton={false} /> Consectetur
              adipiscing
            </SearchElementContent>
          </SearchElement>
        </SearchGroup>

        <SearchGroup>
          <SearchHeader>Quick actions</SearchHeader>
          <SearchElement>
            <Button kind="tertiary" size="small">
              Tertiary button
            </Button>
          </SearchElement>
        </SearchGroup>
      </SearchComponent>
    </>
  );
};

const StorySearchDropDownWithPortalAndAnchor = props => {
  const [nodeToBindRef, handleNodeRef] = useNodeRef();
  return (
    <>
      <SearchDropDownPortalAnchor
        ref={handleNodeRef}
        className="story-search-dropdown-portal-anchor"
      />
      <StorySearchDropDown
        {...props}
        withPortal={{
          nodeToBindRef,
          offset: isDevelopingMode
            ? {
                top: number('Set dropdown top offset', 0),
                left: number('Set dropdown left offset', 0),
              }
            : {},
        }}
      />
    </>
  );
};

storiesOf('Components/SearchDropDown', module)
  .addDecorator(story => (
    <div
      style={
        isDevelopingMode && boolean('Toggle auto overflow (inner scrollbars)', false) === true
          ? { overflow: 'auto' }
          : undefined
      }
    >
      {story()}
    </div>
  ))
  .add('Default', () => (
    <div tabIndex={-1}>
      <StorySearchDropDown {...props()} />
    </div>
  ))
  .add('WithPortal', () => <StorySearchDropDown {...props()} withPortal />)
  .add('WithPortal Inside modal', () => (
    <Modal open {...modalProps()}>
      <StorySearchDropDown {...props({ dropdownMaxHeight: '250px' })} withPortal />
    </Modal>
  ))
  .add('WithPortal, by anchor', () => <StorySearchDropDownWithPortalAndAnchor {...props()} />)
  .add('ToolbarSearch', () => (
    <StorySearchDropDown
      component={TableToolbarSearchDropdown}
      {...props()}
      {...toolbarSearchProps()}
    />
  ));
