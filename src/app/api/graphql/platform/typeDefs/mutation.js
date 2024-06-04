import { gql } from 'graphql-request';
import { platformFragment } from './fragments';

const ADD_PLATFORM = gql`
  ${platformFragment.PLATFORM_ALL_FIELDS}
  mutation addPlatform($name: String, $description: String, $active: Boolean) {
    addPlatform(name: $name, description: $description, active: $active) {
      ...platformAllFields
    }
  }
`;

const EDIT_PLATFORM = gql`
  ${platformFragment.PLATFORM_ALL_FIELDS}
  mutation editPlatform(
    $platformID: String!
    $name: String
    $description: String
    $active: Boolean
  ) {
    editPlatform(
      platformID: $platformID
      name: $name
      description: $description
      active: $active
    ) {
      ...platformAllFields
    }
  }
`;

const DELETE_PLATFORM = gql`
  mutation deletePlatform($platform_id: String!) {
    deletePlatform(platform_id: $platform_id) {
      platform_id
    }
  }
`;

export default {
  ADD_PLATFORM,
  EDIT_PLATFORM,
  DELETE_PLATFORM
};
