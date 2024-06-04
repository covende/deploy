import { basicTypes } from '@/app/redux/common/types';

// eslint-disable-next-line import/no-mutable-exports
let TYPES = basicTypes('APP/BO/PLANS');

TYPES = {
  ...TYPES,
  FETCH_BY_ROLE: 'FETCH_BY_ROLE_APP/BO/PLANS',
  FETCH_BY_ROLE_SUCCEEDED: 'FETCH_BY_ROLE_APP/BO/PLANS_SUCCEEDED',
  FETCH_BY_ROLE_FAILED: 'FETCH_BY_ROLE_APP/BO/PLANS_FAILED'
};

export default TYPES;
