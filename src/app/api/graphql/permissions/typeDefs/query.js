import { gql } from 'graphql-request';
import { permissionFragment } from './fragments';

const PERMISSIONS = gql`
  ${permissionFragment.PERMISSION_ALL_FIELDS}
  query permissions($platformID: String!) {
    permissions(platformID: $platformID) {
      ...permissionAllFields
    }
  }
`;

const PERMISSION_BY_ID = gql`
  ${permissionFragment.CUSTOMER_ALL_FIELDS}
  query permissionByID($permission_id: String!, $platformID: String!) {
    permissionByID(permission_id: $permission_id, platformID: $platformID) {
      ...permissionAllFields
    }
  }
`;

const PERMISSIONS_BY_NAME = gql`
  ${permissionFragment.CUSTOMER_ALL_FIELDS}
  query permissionsByName($guard_name: String!, $platformID: String!) {
    permissionsByName(guard_name: $guard_name, platformID: $platformID) {
      ...permissionAllFields
    }
  }
`;

export default {
  PERMISSIONS,
  PERMISSION_BY_ID,
  PERMISSIONS_BY_NAME
};
