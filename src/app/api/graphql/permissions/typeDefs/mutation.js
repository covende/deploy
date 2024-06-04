import { gql } from 'graphql-request';
import { permissionFragment } from './fragments';

const ADD_PERMISSION = gql`
  ${permissionFragment.PERMISSION_ALL_FIELDS}
  mutation addPermission(
    $guard_name: String!
    $platformID: String!
    $read: Boolean
    $add: Boolean
    $edit: Boolean
    $delete: Boolean
  ) {
    addPermission(
      guard_name: $guard_name
      platformID: $platformID
      read: $read
      add: $add
      edit: $edit
      delete: $delete
    ) {
      ...permissionAllFields
    }
  }
`;

const EDIT_PERMISSION = gql`
  ${permissionFragment.PERMISSION_ALL_FIELDS}
  mutation editPermission(
    $permission_id: String!
    $platformID: String!
    $guard_name: String
    $read: Boolean
    $add: Boolean
    $edit: Boolean
    $delete: Boolean
  ) {
    editPermission(
      permission_id: $permission_id
      platformID: $platformID
      guard_name: $guard_name
      read: $read
      add: $add
      edit: $edit
      delete: $delete
    ) {
      ...permissionAllFields
    }
  }
`;

const DELETE_PERMISSION = gql`
  mutation deletePermission($permission_id: String!) {
    deletePermission(permission_id: $permission_id) {
      permission_id
    }
  }
`;

export default {
  ADD_PERMISSION,
  EDIT_PERMISSION,
  DELETE_PERMISSION
};
