/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



// TODO: fix later, its a story warning.

import React from 'react';
import { storiesOf } from '@storybook/react';

import omit from 'lodash/omit';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import noop from 'lodash/noop';
import settings from '../../settings';

import SideBarTemplate from '../side-bar-template';
import {  Breadcrumb, BreadcrumbItem, Button, Tab, Tabs } from '@carbon/react';

import {Delete, Edit } from '@carbon/icons-react';

import BreadcrumbsTemplate from '../breadcrumb-template';
import ActionToolbar, { ActionToolbarItem } from '../action-toolbar';

// Story imports
import ConfigurableTable from '@carbon/react';
import { TreeNavigationExample } from '../tree-navigation/stories/ExampleTreeNavigation';
//import { ToolbarWithViewModeSwitcher } from '../data-table/stories/ConfigurableTableWithTiles.story';


import FullPageTemplate from '.';

const { prefix } = settings;

const buttonOnClickActionHandler = () => {
  action('Button::onClick')();
};

const ActionBar = props => (
  <ActionToolbar {...props}>
    <ActionToolbarItem>
      <Button
        hasIconOnly
        iconDescription="Button icon"
        onClick={buttonOnClickActionHandler}
        renderIcon=<Delete size={16}/>
        tooltipAlignment="center"
        tooltipPosition="top"
      />
    </ActionToolbarItem>

    <ActionToolbarItem>
      <Button
        disabled
        hasIconOnly
        iconDescription="Button disabled"
        onClick={buttonOnClickActionHandler}
        renderIcon=<Edit size={16} />
        tooltipAlignment="center"
        tooltipPosition="top"
      />
    </ActionToolbarItem>
  </ActionToolbar>
);

const ActionBarWitButtons = () => (
  <div style={{ display: 'flex' }}>
    <Button kind="secondary" onClick={noop}>
      Primary
    </Button>
    <Button kind="primary" onClick={noop}>
      Secondary
    </Button>
  </div>
);

const ButtonBar = () => (
  <div
    style={{
      flexWrap: 'nowrap',
      display: 'flex',
    }}
  >
    <Button
      iconDescription="Button icon"
      onClick={buttonOnClickActionHandler}
      renderIcon={<Delete size={16} />}
    >
      Button
    </Button>
    <Button
      iconDescription="Button disabled"
      onClick={buttonOnClickActionHandler}
      renderIcon={<Edit size={16} />}
    >
      Button 2
    </Button>
  </div>
);

const ButtonBarWithIcons = () => {
  const buttonProps = {
    hasIconOnly: true,
    iconDescription: 'text',
    kind: 'ghost',
    renderIcon: Download16,
    tooltipAlignment: 'center',
    tooltipPosition: 'top',
  };

  return (
    <div
      style={{
        flexWrap: 'nowrap',
        display: 'flex',
      }}
    >
      <Button {...buttonProps} />
      <Button {...buttonProps} renderIcon={<Reset size={16} />} />
      <Button {...buttonProps} renderIcon={<Chat size={16} />} />
      <Button {...buttonProps} renderIcon={<Link size={16} />} />
      <Button onClick={buttonOnClickActionHandler}>New</Button>
    </div>
  );
};

export const renderActionBar = variant => {
  switch (variant) {
    case 'ActionBar':
      return ActionBar();
    case 'ButtonBar':
      return ButtonBar();
    case 'ButtonBarWithIcons':
      return ButtonBarWithIcons();
    default:
      return '';
  }
};

const actionBarValues = ['ActionBar', 'ButtonBar', 'ButtonBarWithIcons', 'none'];

const Breadcrumbs = () => (
  <Breadcrumb noTrailingSlash>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#" isCurrentPage>
      Current Page
    </BreadcrumbItem>
  </Breadcrumb>
);

const sideBarDefaultProps = () => ({
  width: 25,
  place: 'left',
  closeButtonInside: false,
  overlay: false,
  show: true,
  showCloseButton: false,
});

const tableProps = () => ({
  withData: boolean('With data', true),
  size: select(
    'Row height (size)',
    { compact: 'compact', short: 'short', tall: 'tall', none: null },
    'short'
  ),
  isLoading: boolean('Loading state (isLoading)', false),
});

const propsTabs = {
  tabs: () => ({
    className: 'some-class',
    selected: 0,
    triggerHref: '#',
    role: 'navigation',
    iconDescription: 'show menu options',
    onKeyDown: action('onKeyDown'),
    onSelectionChange: action('onSelectionChange'),
    tabContentClassName: 'tab-content',
    size: 'small',
  }),
  tab: () => ({
    disabled: false,
    href: '#',
    role: 'presentation',
    tabIndex: 0,
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
  }),
};

const TabContentRenderedOnlyWhenSelected = ({ selected, children, ...other }) =>
  selected ? <div {...other}>{children}</div> : null;

export const fullPageTemplateProps = () => {
  return {
    actionBar: select('select action bar', actionBarValues, 'ActionBar'),
    header: text('header', 'Analytics Overview'),
    subheader: text('subheader', 'Additional description'),
    actionBarTitleAlign: boolean('Should align to title', false),
  };
};

const ConfigurableTableWithToolbar = () => {
  const toolbar = props => <ToolbarWithViewModeSwitcher {...props} onViewModeChange={() => {}} />;
  return (
    <ConfigurableTable
      {...tableProps()}
      alternativeView={null}
      renderToolbar={toolbar}
      scrollableRows
    />
  );
};

storiesOf('Templates/FullPage Template', module)
  .add('default', () => (
    <div
      style={{
        width: text('container-width', '100%'),
        height: text('container-height', '800px'),
        border: '1px dashed #000',
      }}
    >
      <BreadcrumbsTemplate breadcrumbs={boolean('show breadcrumbs', true) && <Breadcrumbs />}>
        <FullPageTemplate
          {...omit(fullPageTemplateProps(), 'actionBar')}
          actionBar={renderActionBar(fullPageTemplateProps().actionBar)}
        >
          <div style={{ backgroundColor: '#e4e4e4', height: '100%' }} />
        </FullPageTemplate>
      </BreadcrumbsTemplate>
    </div>
  ))
  .add('with another templates inside', () => (
    <div
      style={{
        width: text('container-width', '100%'),
        border: '1px dashed #000',
      }}
    >
      <BreadcrumbsTemplate breadcrumbs={<Breadcrumbs />}>
        <SideBarTemplate
          {...sideBarDefaultProps()}
          marginlessPanel
          showSeparator={false}
          sideBarBody={<TreeNavigationExample />}
          sideBarHeader={<div className={`${prefix}--side-bar-template__bar__heading`}>Email</div>}
        >
          <FullPageTemplate
            actionBar={<ActionBar />}
            header="Email"
            subheader="Additional description"
          >
            <div style={{ backgroundColor: '#e4e4e4', height: '100%' }} />
          </FullPageTemplate>
        </SideBarTemplate>
      </BreadcrumbsTemplate>
    </div>
  ))
  .add('with scrollable table', () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '1px dashed #000',
      }}
    >
      <FullPageTemplate
        actionBar={<ActionBarWitButtons />}
        header="Analytics Overview"
        subheader="Additional description"
      >
        <ConfigurableTableWithToolbar />
      </FullPageTemplate>
    </div>
  ))
  .add('with scrollable table inside tab', () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '1px dashed #000',
      }}
    >
      <FullPageTemplate
        actionBar={<ActionBarWitButtons />}
        header="Analytics Overview"
        subheader="Additional description"
      >
        {boolean('Show tabs', true) ? (
          <Tabs {...propsTabs.tabs()}>
            <Tab
              {...propsTabs.tab()}
              label="Tab label 1"
              renderContent={({ selected }) => {
                if (selected) {
                  return <ConfigurableTableWithToolbar />;
                }

                return null;
              }}
            />
            <Tab {...propsTabs.tab()} label="Tab label 2">
              <div className="some-content">Content for second tab goes here.</div>
            </Tab>
            <Tab
              {...propsTabs.tab()}
              label="Tab label 3"
              renderContent={TabContentRenderedOnlyWhenSelected}
            >
              <div className="some-content">Content for third tab goes here.</div>
            </Tab>
            <Tab {...propsTabs.tab()} label="Tab label 4">
              <div className="some-content">Content for fourth tab goes here.</div>
            </Tab>
          </Tabs>
        ) : (
          <ConfigurableTableWithToolbar />
        )}
      </FullPageTemplate>
    </div>
  ));
