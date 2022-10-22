/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useCallback, useState, useEffect, useMemo } from 'react';

import useUserManagementService from './useUserManagementService';

export default function useAuthorizations() {
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState(new Set());
  const userManagementService = useUserManagementService({});

  const hasRole = useCallback(
    (name) => {
      return userRoles.includes(name);
    },
    [userRoles]);

  const hasPermission = useCallback(
    (name) => {
      return userPermissions.has(name);
    },
    [userPermissions]);

  const ALL_PERMISSIONS = useMemo(
    () => {
      return {
        ADMIN_GENERAL: 'admin.general',
        ADMIN_SCHEDULE: 'admin.schedule',
        DATA_CHANNELDIVISION: 'data.channelDivision',
        DATA_PRODUCTGROUP: 'data.productGroup',
        DATA_LOCATIONGROUP: 'data.locationGroup',
        REVIEW_APPROVE: 'review.approve',
        STRATEGY_MANAGE: 'strategy.manage',
        STRATEGY_AUTO_APPROVE_ENABLE: 'strategy.auto_approve_enable'
      }
    },
    []
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await userManagementService.getCurrentUserRoles();
        if (rolesData.status == 200) {
          let perms = new Set();
          let roles = [];
          rolesData.data.map(r => {
            roles.push(r.name);

            r.permissions.map(p => {
              perms.add(p.name);
            })
          })
          setUserRoles(roles);
          setUserPermissions(perms);
        }
        else {
          console.error("Failed to fetch user roles.");
        }
      } catch (error) {
        console.error("Failed to talk to server. " + error);
      }
    };
    fetchRoles();
  }, []);

  return { ALL_PERMISSIONS, userRoles, userPermissions, hasRole, hasPermission };
}


