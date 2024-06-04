import { gql } from 'graphql-request';
import { platformFragment } from './fragments';

const PLATFORMS = gql`
  ${platformFragment.PLATFORMS_RESPONSE_ALL_FIELDS}
  query platforms {
    platforms {
      ...platformsResponseAllFields
    }
  }
`;

const PLATFORMS_BY_LIMIT = gql`
  ${platformFragment.PLATFORMS_RESPONSE_ALL_FIELDS}
  query platforms($limit: String!) {
    platforms(limit: $limit) {
      ...platformsResponseAllFields
    }
  }
`;

const PLATFORM_BY_ID = gql`
  ${platformFragment.PLATFORM_RESPONSE_ALL_FIELDS}
  query platformByID($platform_id: String!) {
    platformByID(platform_id: $platform_id) {
      ...platformResponseAllFields
    }
  }
`;

const PLATFORMS_BY_NAME = gql`
  ${platformFragment.PLATFORM_RESPONSE_ALL_FIELDS}
  query platformsByName($name: String!) {
    platformsByName(name: $name) {
      ...platformsResponseAllFields
    }
  }
`;

export default {
  PLATFORMS,
  PLATFORMS_BY_LIMIT,
  PLATFORM_BY_ID,
  PLATFORMS_BY_NAME
};
