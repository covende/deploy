import { gql } from 'graphql-request';
import WMRoles from '../../webmodel/WMRoles';
import { json_format } from '@/common/utils/methods';

const ROLES = gql`
  query roles($platformID: String!) {
    roles(platformID: $platformID) ${WMRoles}
  }
`;

const ROLES_BY_LIMIT = gql`
  query roles($limit: Int, $platformID: String!) {
    roles(limit: $limit, platformID: $platformID) ${WMRoles}
  }
`;

export const PERMISION_STATUS = () => {
  return gql`
    query {
      permissions {
        _id
        name
        position
      }
    }
  `;
};

export const ROLES_BY_SUBACCOUNT = (company_id) => {
  return gql`
  query {
    rolesBySubAccount(company_id: "${company_id}") 
    ${WMRoles}
  }
  `;
};

export const MENU_BY_PLATAFORM = (cod) => {
  return gql`
    query {
     menusHeaderByPlatform(platformID:"${cod}") {
    # platformPosition
    menuID
    menuName
    platformID
     }
    }
  `;
};

export const DELETE_ROLE = (roleID) => `mutation {
  deleteRole(roleID: "${roleID}") {
    status
    message
  }
}`;

export const ADD_ROLE = (newRol) => {
  return gql`
    mutation {
      addRole(
        inputRole: {
          key:"${newRol.key}"
          platformID: ${newRol.platformID}
          onlySubAccount: "${newRol.onlySubAccount}"
          roleName: "${newRol.roleName}"
          description: "${newRol.description}"
          menusPermissions: ${json_format(newRol.menusPermissions)}
          availableRoles: ${json_format(newRol.availableRoles)}
        }
      ) 
      {
       status
       message
      }
    }
  `;
};

export const EDIT_ROLE = (updateRol) => {
  return gql`
    mutation {
      editRole(
        inputRole: {
          roleID:"${updateRol.roleID}"
          key:"${updateRol.key}"
          platformID:"${updateRol.platformID}"
          onlySubAccount: ${updateRol.onlySubAccount}
          availableRoles: ${json_format(updateRol.availableRoles)}
          roleName: "${updateRol.roleName}"
          description: "${updateRol.description}"
          menusPermissions: ${json_format(updateRol.menusPermissions)}
        }
      ) 
      {
       status
       message
      }
    }
  `;
};

export default {
  ROLES,
  ROLES_BY_LIMIT
};
