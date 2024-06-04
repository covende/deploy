import { gql } from 'graphql-request';
import WMRoles from '../../webmodel/WMRoles';

const ADD_ROLE = gql`
  mutation addRole(
    $platformID: String!
    $name: String!
    $description: String
    $permissions: [InputRolePermissions]
  ) {
    addRole(
      platformID: $platformID
      name: $name
      description: $description
      permissions: $permissions
    ) ${WMRoles}
  }
`;

const EDIT_ROLE = gql`
  mutation editRole(
    $role_id: String!
    $name: String
    $description: String
    $permissions: [InputRolePermissions]
  ) {
    editRole(
      role_id: $role_id
      name: $name
      description: $description
      permissions: $permissions
    ) ${WMRoles}
  }
`;

const DELETE_ROLE = gql`
  mutation deleteRole($role_id: String!) {
    deleteRole(role_id: $role_id) {
      role_id
    }
  }
`;

export default {
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE
};
