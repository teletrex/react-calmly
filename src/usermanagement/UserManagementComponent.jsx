/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';

import { useSelector } from 'react-redux';

import FullPageTemplate from '../components/full-page-template';
import SideBarTemplate from '../components/side-bar-template';


import LeftNav from './LeftNav';
import PermissionTable from './PermissionTable';
import RoleTable from './RoleTable';
import UserTable from './UserTable';


export default () => {
  const activeAccordionTab = useSelector(state => state.userManagementReducer.activeAccordionTab);

  return (
    <div>
      <SideBarTemplate
          ariaLabel="side-bar"
          className=""
          controlledOutside={false}
          marginlessPanel={false}
          overlay={false}
          place="left"
          showCloseButton
          showExpander
          showSeparator
          sideBarBody={
            <LeftNav
            />
          }
          sideBarFooter={null}
          sideBarHeader={null}
          size="default"
        >
          <FullPageTemplate
            actionBarTitleAlign={false}
            className=""
            scrollableTable={null}
          >
          { activeAccordionTab == 0 &&
            <div class="strategy-content">
              <UserTable
                size="short"
                withData />
            </div>
          }
          { activeAccordionTab == 1 &&
            <div class="strategy-content">
              <RoleTable
                size="short"
                withData />
            </div>
          }
          { activeAccordionTab == 2 &&
            <div class="strategy-content">
              <PermissionTable
                size="short"
                withData />
            </div>
          }
          </FullPageTemplate>
        </SideBarTemplate>
    </div>
  );
};
