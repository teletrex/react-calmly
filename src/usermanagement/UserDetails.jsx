/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { DivCatPermissionDetails } from './DivCatPermissionDetails';


import { UserRolesDetails } from './UserRolesDetails';


export const UserDetailsTypes = Object.freeze({
  ROLES:"roles",
  DIVISIONS:"divisions",
  CATEGORIES:"categories"
});

const UserDetails = ({
  selectedEdit,
  isSave,
  saveRolesHandler,
  saveDivCatHandler,
  size,
}) => {

  if(!selectedEdit.user)
    return null;

  const { editType } = selectedEdit;
  if (editType === UserDetailsTypes.ROLES)
    return <UserRolesDetails
      selectedUser={selectedEdit.user}
      isSave={isSave}
      saveRolesHandler={saveRolesHandler}
      size={size}
      withData
      />

      return <DivCatPermissionDetails
      selectedUser={selectedEdit.user}
      userDetailsTypes={UserDetailsTypes}
      editType={selectedEdit.editType}
    saveDivCatHandler={saveDivCatHandler}
    isSave={isSave}
  />
};

export default UserDetails;

