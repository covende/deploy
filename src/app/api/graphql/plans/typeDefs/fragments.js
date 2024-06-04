import { gql } from 'graphql-request';

const PLAN_ALL_FIELDS = gql`
  fragment planAllFields on plansResponse {
    code
    message
    description
    error
    data {
      planID
      name
      role
      description
      price
      subaccounts
      unlimited
      productsPost
    }
  }
`;

export const planFragment = {
  PLAN_ALL_FIELDS
};
