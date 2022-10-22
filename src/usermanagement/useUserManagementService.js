/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import { useDispatch} from 'react-redux';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import axios from 'axios';
import { actions } from './reducers';
import serviceApi from '../services/serviceApi';

const useDispatchRequest = ( {url,method, successType, failureType, data}) => {
  const dispatch = useDispatch();
  // return an object with a fetch property that is the function

  const fetchAndDispatch = () => {
    // sort out the method to call the axios function
    axios(
      {
        method: method.toLowerCase(),
        url: url,
        data: data,
        headers: {'Content-type': 'application/json'}
      }).then(response => {
        dispatch && dispatch(successType, response)
      },
      err => {
        dispatch && dispatch(failureType, response)
      }
    );
  }
  return fetchAndDispatch;
}


const useUserManagementService = (params) => {
    const usersGridUrl = serviceApi.userManagement.getUsersGrid.api;
    const {fetch: getUsersGrid} = useDispatchRequest(
        {
            url: `${usersGridUrl}`,
            method: "GET",
            successType: actions.successUsersGridData.type,
            failType: actions.failedUsersGridData.type,
            data: {},
        },
        { trigger: false },
    );

    const rolesGridUrl = serviceApi.userManagement.getRolesGrid.api;
    const {fetch: getRolesGrid} = useDispatchRequest(
        {
            url: `${rolesGridUrl}`,
            method: "GET",
            headers: {'X-Requested-With-Custom': 'XMLHttpRequest-Custom'},
            successType: actions.successRolesGridData.type,
            failType: actions.failedRolesGridData.type,
            data: {},
        },
        { trigger: false },
    );

    const permissionsGridUrl = serviceApi.userManagement.getPermissionsGrid.api;
    const {fetch: getPermissionsGrid} = useDispatchRequest(
        {
            url: `${permissionsGridUrl}`,
            method: "GET",
            successType: actions.successPermissionsGridData.type,
            failType: actions.failedPermissionsGridData.type,
            data: {},
        },
        { trigger: false },
    );

   const permissionsDataUrl = serviceApi.userManagement.getPermissionsData.api;
   const getPermissionsData = () => {
        return axios.get(
            permissionsDataUrl,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Permissions data loaded!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

   const usersDataUrl = serviceApi.userManagement.getUsersData.api;
   const getUsersData = () => {
        return axios.get(
            usersDataUrl,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Users data loaded!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

   const rolesDataUrl = serviceApi.userManagement.getRolesData.api;
   const getRolesData = () => {
        return axios.get(
            rolesDataUrl,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Roles data loaded!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

   const currentUserRolesUrl = serviceApi.userManagement.getCurrentUserRoles.api;
   const getCurrentUserRoles = () => {
        return axios.get(
            currentUserRolesUrl,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Roles for current user loaded! " + res)
        return res
      }, err => {
        console.log(err)
        return err
      });
    };

    const saveRoleUrl = serviceApi.userManagement.saveRole.api;
    const saveRole = (role) => {
        return axios.post(
            saveRoleUrl,
            role,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Role saved!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

   const saveRolesUrl = serviceApi.userManagement.saveRoles.api;
    const saveRoles = (roles) => {
        return axios.post(
            saveRolesUrl,
            roles,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Roles saved!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

    const savePGUrl = serviceApi.userManagement.savePG.api;
    const savePG = (pg) => {
        return axios.post(
            savePGUrl,
            pg,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Succeed!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

    const savePermissionUrl = serviceApi.userManagement.savePermission.api;
    const savePermission = (permission) => {
        return axios.post(
            savePermissionUrl,
            permission,
            {
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(res=>{
        console.log("Succeed!" + res)
        return res
      },err =>{
        console.log(err)
        return err
      });
    };

    const getUserDivisionsUrl = serviceApi.userManagement.getUserDivisions.api;
    const getUserDivisions = (id) => axios.get(getUserDivisionsUrl,{
        params:{
            id
        },
        headers: {
            'content-type': 'application/json'
        }
    })
    const getUserCategoriesUrl =serviceApi.userManagement.getUserCategories.api;
    const getUserCategories = (id) => axios.get(getUserCategoriesUrl,{
        params:{
            id
        },
        headers: {
            'content-type': 'application/json'
        }
    })

    const saveDivPermissionsUrl =serviceApi.userManagement.saveUserDivCatPerms.api;
    const saveDivCatPermissions = (user, changes, hasAllAccess, editType) => axios.post(saveDivPermissionsUrl + `/${editType}`,
        {
            user,
            changes,
            hasAllAccess
        },
        {
            headers: {
                'content-type': 'application/json'
            }
        })
    return {
        getUsersGrid: getUsersGrid,
        getUsersData: getUsersData,
        getRolesGrid: getRolesGrid,
        getRolesData: getRolesData,
        getCurrentUserRoles: getCurrentUserRoles,
        getPermissionsGrid: getPermissionsGrid,
        getPermissionsData: getPermissionsData,
        saveRole: saveRole,
        saveRoles: saveRoles,
        savePG: savePG,
        savePermission: savePermission,
        getUserCategories,
        getUserDivisions,
        saveDivCatPermissions
    };
}

export const doSearch = (dataSet, searchTerm) => {
    return dataSet.filter(row =>
      Object.values(row).find(value => {
        return (
          (isNumber(value) || isString(value)) &&
          value
            .toString()
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        );
      })
    );
};

export default useUserManagementService;
