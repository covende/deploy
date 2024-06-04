import { gql } from 'graphql-request';

const PERMISSION_ALL_FIELDS = gql`
  fragment permissionAllFields on permission {
    id
    permission_id
    platformID
    guard_name
    read
    add
    edit
    delete
  }
`;

export const permissionFragment = {
  PERMISSION_ALL_FIELDS
};
