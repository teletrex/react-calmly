/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import * as ListBoxPropTypes from '@carbon/react/es/components/ListBox/ListBoxPropTypes';

import ListBox from './ListBox';
import ListBoxMenu from './ListBoxMenu';
import ListBoxField from './ListBoxField';
import ListBoxMenuIcon from './ListBoxMenuIcon';
import ListBoxMenuItem from './ListBoxMenuItem';
import ListBoxSelection from './ListBoxSelection';

ListBox.Menu = ListBoxMenu;
ListBox.Field = ListBoxField;
ListBox.MenuIcon = ListBoxMenuIcon;
ListBox.MenuItem = ListBoxMenuItem;
ListBox.Selection = ListBoxSelection;

export default ListBox;
export const PropTypes = ListBoxPropTypes;
