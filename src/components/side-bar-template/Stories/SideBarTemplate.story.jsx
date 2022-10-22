/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
// import { State } from '@sambego/storybook-state';

// import './SideBarTemplate-story.scss';
import BreadcrumbsTemplate from '../../breadcrumb-template';
import FullPageTemplate from '../../full-page-template';
import EmptyStates from '../../empty-states';
import SideBarTemplate, { SIZE } from '../SideBarTemplate';
import {Tooltip} from '@carbon/react';
import { TreeNavigationWithSearchExample } from '../../tree-navigation/stories/ExampleTreeNavigationWithSearch';

import {
  actionBar,
  basicSideBarBody,
  breadcrumbs,
  defaultSideBarBody,
  defaultSideBarHeader,
  defaultStore,
} from './StoryComponents.story';
import mdx from './SideBarTemplate.mdx';

const places = {
  Left: 'left',
  Right: 'right',
};

export default {
  title: 'Templates/Side Bar Template',
  component: SideBarTemplate,
  decorators: [
    withKnobs,
    story => (
      <div className="sidebar-story" style={{ width: '100%', height: '100%' }}>
        {story()}
      </div>
    ),
  ],
  parameters: {
    chromatic: { disable: false },
    docs: { page: mdx },
    info: { disable: true },
    'in-dsm': { id: '5fa0e012a66f6d13771cbb89' },
  },
};

export const Default = () => (
  <State store={defaultStore}>
    <SideBarTemplate
      isResponsive={boolean('Display side bar expander on medium breakpoint', false)}
      onCloseCallback={action('onCloseCallback')}
      overlay={boolean('Side bar overlay content', false)}
      place={select('Side bar alignment', places, places.Left)}
      show={boolean('Side bar visibility', true)}
      showCloseButton={boolean('Show close button', false)}
      showExpander={boolean('Side bar expander', false)}
      showSeparator={boolean('Show border between sidebar and content', true)}
      sideBarBody={defaultSideBarBody[defaultStore.get('tabIndex')](defaultStore.get('tags'))}
      sideBarHeader={defaultSideBarHeader()}
      size={select('Side bar size', SIZE, SIZE.DEFAULT)}
    >
      <EmptyStates
        buttonHidden={false}
        onClick={() => {}}
        state="404-state"
        text="No comments"
        textHidden={false}
        title="Title"
        titleHidden={false}
      />
    </SideBarTemplate>
  </State>
);

export const WithFullPageTemplate = () => (
  <SideBarTemplate
    overlay={boolean('Side bar overlay content', false)}
    place={select('Side bar alignment', places, places.Left)}
    show={boolean('Show side bar', true)}
    showCloseButton={boolean('Show close button', false)}
    sideBarBody={basicSideBarBody()}
  >
    <FullPageTemplate header="Analytics Overview" subheader="Additional description">
      <div
        style={{
          backgroundColor: '#e4e4e4',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip triggerText="Content">
          <Tooltip.Description>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam blanditiis
            cupiditate dicta doloremque ducimus illum incidunt magnam maxime, modi praesentium quas
            qui quidem quis rem soluta voluptas voluptates voluptatum?
          </Tooltip.Description>
        </Tooltip>
      </div>
    </FullPageTemplate>
  </SideBarTemplate>
);

export const WithBreadcrumbsTemplate = () => (
  <BreadcrumbsTemplate breadcrumbs={breadcrumbs()}>
    <SideBarTemplate
      overlay={boolean('Side bar overlay content', false)}
      place={select('Side bar alignment', places, places.Left)}
      show={boolean('Show side bar', true)}
      showCloseButton={boolean('Show close button', false)}
      sideBarBody={basicSideBarBody()}
    >
      <EmptyStates
        buttonHidden={false}
        onClick={() => {}}
        state="404-state"
        text="No comments"
        textHidden={false}
        title="Title"
        titleHidden={false}
      />
    </SideBarTemplate>
  </BreadcrumbsTemplate>
);

export const WithActionBar = () => (
  <SideBarTemplate
    actionBar={actionBar()}
    overlay={boolean('Side bar overlay content', false)}
    place={select('Side bar alignment', places, places.Left)}
    show={boolean('Show side bar', true)}
    showCloseButton={boolean('Show close button', false)}
    sideBarBody={basicSideBarBody()}
  >
    <EmptyStates
      buttonHidden={false}
      onClick={() => {}}
      state="404-state"
      text="No comments"
      textHidden={false}
      title="Title"
      titleHidden={false}
    />
  </SideBarTemplate>
);

export const SearchFilterInSideBar = () => (
  <SideBarTemplate
    isResponsive={boolean('Display side bar expander on medium breakpoint', false)}
    onCloseCallback={action('OnCloseCallback')}
    overlay={boolean('Side bar overlay content', false)}
    place={select('Side bar alignment', places, places.Left)}
    show={boolean('Side bar visibility', true)}
    showCloseButton={boolean('Show close button', false)}
    showExpander={boolean('Side bar expander', false)}
    showSeparator={boolean('Show border between sidebar and content', true)}
    sideBarBody={<TreeNavigationWithSearchExample />}
    size={select('Side bar size', SIZE, SIZE.DEFAULT)}
  >
    <EmptyStates
      buttonHidden={false}
      onClick={() => {}}
      state="404-state"
      text="No comments"
      textHidden={false}
      title="Title"
      titleHidden={false}
    />
  </SideBarTemplate>
);

export { LayoutOptions } from './LayoutOptions.story';
