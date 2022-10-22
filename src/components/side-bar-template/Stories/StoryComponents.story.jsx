/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import {
  AddComment,
  Bookmark,
  Code,
  Copy,
  Image,
  Link,
  Checkbox,
  Row,
  Subtract,
  TextLinkAnalysis,
  TextSmallCaps,
  ThumbsUp,
} from '@carbon/icons-react';
import { action } from '@storybook/addon-actions';
import { forceReRender } from '@storybook/react';
// import { Store } from '@sambego/storybook-state';  TODO: remove this


import { Accordion, AccordionItem,Breadcrumb, BreadcrumbItem, Button, FormGroup, RadioButton, RadioButtonGroup,Tab,Tabs,TextInput,Toggle} from '@carbon/react';

import ActionToolbar, { ActionToolbarItem } from '../../action-toolbar';
import AddTags from '../../add-tags';
import { H4 } from '../../heading';
import HR from '../../hr';
import InlineEdit from '../../inline-edit';

const contentBlock = (icon, label) => (
  <div className="content-block">
    <div className="content-block--content">
      {icon}
      <span className="content-block--label">{label}</span>
    </div>
  </div>
);

export const defaultStore = new Store({
  tabIndex: 0,
  tags: ['Tag 1', 'Tag 2', 'Long tag three'],
});

export const defaultSideBarBody = {
  0: tags => (
    <>
      <FormGroup legendText="Email name">
        <InlineEdit id="inline-edit-1" inputType="text" placeholder="Enter email name" />
      </FormGroup>
      <AddTags
        id="add-tags-id"
        inline={false}
        inlineInputAlwaysOn={false}
        onAddTag={tags => {
          defaultStore.set({
            ...defaultStore,
            tags,
          });
          forceReRender();
        }}
        onDelete={tags => {
          defaultStore.set({
            ...defaultStore,
            tags,
          });
          forceReRender();
        }}
        tags={tags}
      />
      <HR />
      <Accordion alignWithContent>
        <AccordionItem title="Audience">
          <Button className="button-class" disabled={false} kind="tertiary">
            Select List
          </Button>
        </AccordionItem>
        <AccordionItem title="Email Details">
          <TextInput id="text-input-1" labelText="From name" placeholder="Enter from name" />
          <TextInput id="text-input-2" labelText="From address" placeholder="Enter from address" />
          <TextInput
            id="text-input-3"
            labelText="Reply-to address"
            placeholder="Enter reply-to address"
          />
          <TextInput id="text-input-4" labelText="Subject line" placeholder="Enter subject line" />
          <TextInput id="text-input-5" labelText="Preheader" placeholder="Enter preheader" />
          <Toggle id="toggle-1" labelText="Include plain text body" />
          <Toggle id="toggle-2" labelText="Add click-to-view link" />
          <Toggle id="toggle-3" labelText="Share with CRM" />
          <FormGroup legendText="Link tracking level">
            <RadioButtonGroup defaultSelected="2-2" name="group-2" orientation="vertical">
              <RadioButton
                className="radio-button"
                id="radio-2-1"
                labelText="Aggregate"
                value="2-1"
              />
              <RadioButton className="radio-button" id="radio-2-2" labelText="Unique" value="2-2" />
              <RadioButton
                className="radio-button"
                id="radio-2-3"
                labelText="Opens only"
                value="2-3"
              />
              <RadioButton
                className="radio-button"
                id="radio-2-4"
                labelText="No tracking"
                value="2-4"
              />
            </RadioButtonGroup>
          </FormGroup>
        </AccordionItem>
      </Accordion>
    </>
  ),
  1: () => (
    <Accordion alignWithContent>
      <AccordionItem title="Global Styles">
        <Button className="button-class" disabled={false} kind="tertiary">
          Select Styles
        </Button>
      </AccordionItem>
      <AccordionItem title="Content Blocks">
        <div className="content-wrapper" role="group">
          <div className="content-row">
            {contentBlock(<TextSmallCaps size={32} />, 'Text')}
            {contentBlock(<Image size={32} />, 'Image')}
            {contentBlock(<Row size={32} />, 'Spacer')}
          </div>
          <div className="content-row">
            {contentBlock(<Subtract size={32} />, 'Divider')}
            {contentBlock(<Checkbox size={32} />, 'Button')}
            {contentBlock(<Code size={32} />, 'HTML')}
          </div>
          <div className="content-row">
            {contentBlock(<ThumbsUp size={32} />, 'Social')}
            {contentBlock(<Link size={32} />, 'Link Bar')}
            {contentBlock(<TextLinkAnalysis size={32} />, 'Image + Text')}
          </div>
          <div className="content-row">
            {contentBlock(<Copy size={32} />, 'Image Group')}
            {contentBlock(<AddComment size={32} />, 'Promotion')}
            {contentBlock(<Bookmark size={32} />, 'Saved Block')}
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  ),
};

export const defaultSideBarHeader = () => (
  <Tabs
    className="tabs-class"
    iconDescription="Show Menu Options"
    onSelectionChange={tabIndex => {
      defaultStore.set({
        ...defaultStore,
        tabIndex,
      });
      forceReRender();
    }}
    role="tablist"
    selected={defaultStore.get('tabIndex')}
    size="large"
    tabContentClassName="tab-content"
    triggerHref="#"
  >
    <Tab disabled={false} href="#" label="Details" role="presentation" tabIndex={0} />
    <Tab disabled={false} href="#" label="Details" role="presentation" tabIndex={0} />
  </Tabs>
);

export const basicSideBarBody = () => (
  <>
    <H4>Side Bar Title</H4>
    <Accordion alignWithContent>
      <AccordionItem open title="Section 1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </AccordionItem>
      <AccordionItem open title="Section 2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </AccordionItem>
      <AccordionItem open title="Section 3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </AccordionItem>
    </Accordion>
  </>
);

export const breadcrumbs = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
  </Breadcrumb>
);

export const actionBar = () => (
  <ActionToolbar>
    <ActionToolbarItem>
      <Button
        hasIconOnly
        iconDescription="Button icon"
        onClick={action('Button::onClick')}
        renderIcon=<Delete size={16} />
        tooltipAlignment="center"
        tooltipPosition="bottom"
      />
    </ActionToolbarItem>
    <ActionToolbarItem>
      <Button
        disabled
        hasIconOnly
        iconDescription="Button disabled"
        onClick={action('Button::onClick')}
        renderIcon=<Edit size={16} />
        tooltipAlignment="center"
        tooltipPosition="bottom"
      />
    </ActionToolbarItem>
  </ActionToolbar>
);
