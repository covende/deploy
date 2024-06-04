import { gql } from 'graphql-request';

const PLATFORM_ALL_FIELDS = gql`
  fragment platformAllFields on platform {
    id
    platformID
    name
    description
    active
  }
`;

const PLATFORMS_RESPONSE_ALL_FIELDS = gql`
  fragment platformsResponseAllFields on platformsResponse {
    code
    message
    description
    error
    data {
      platformID
      name
      description
      active
    }
  }
`;

const PLATFORM_RESPONSE_ALL_FIELDS = gql`
  fragment platformResponseAllFields on platformResponse {
    code
    message
    description
    error
    data {
      platformID
      name
      description
      active
    }
  }
`;

export const platformFragment = {
  PLATFORM_ALL_FIELDS,
  PLATFORMS_RESPONSE_ALL_FIELDS,
  PLATFORM_RESPONSE_ALL_FIELDS
};
