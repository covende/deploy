import { gql } from 'graphql-request';
import { planFragment } from './fragments';

const PLANS = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  query plans {
    plans {
      ...planAllFields
    }
  }
`;

const PLANS_BY_LIMIT = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  query plans($limit: Int) {
    plans(limit: $limit) {
      ...planAllFields
    }
  }
`;

const PLAN_BY_ID = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  query planByID($planID: String!) {
    planByID(planID: $planID) {
      ...planAllFields
    }
  }
`;

const PLANS_BY_NAME = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  query plansByName($name: String!) {
    plansByName(name: $name) {
      ...planAllFields
    }
  }
`;

const PLANS_BY_ROLE = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  query plansByRole($role: String!) {
    plansByRole(role: $role) {
      ...planAllFields
    }
  }
`;

export default {
  PLANS,
  PLANS_BY_LIMIT,
  PLAN_BY_ID,
  PLANS_BY_NAME,
  PLANS_BY_ROLE
};
