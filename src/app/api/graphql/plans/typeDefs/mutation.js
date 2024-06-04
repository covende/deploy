import { gql } from 'graphql-request';
import { planFragment } from './fragments';

const ADD_PLAN = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  mutation addPlan(
    $name: String
    $role: String
    $description: String
    $price: String
    $subaccounts: Int
    $unlimited: Boolean
    $productsPost: Int
  ) {
    addPlan(
      name: $name
      role: $role
      description: $description
      price: $price
      subaccounts: $subaccounts
      unlimited: $unlimited
      productsPost: $productsPost
    ) {
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
  }
`;

const EDIT_PLAN = gql`
  ${planFragment.PLAN_ALL_FIELDS}
  mutation editPlan(
    $planID: String!
    $role: String
    $name: String
    $description: String
    $price: String
    $subaccounts: Int
    $unlimited: Boolean
    $productsPost: Int
  ) {
    editPlan(
      planID: $planID
      role: $role
      name: $name
      description: $description
      price: $price
      subaccounts: $subaccounts
      unlimited: $unlimited
      productsPost: $productsPost
    ) {
      ...planAllFields
    }
  }
`;

const DELETE_PLAN = gql`
  mutation deletePlan($planID: String!) {
    deletePlan(planID: $planID) {
      planID
    }
  }
`;

export default {
  ADD_PLAN,
  EDIT_PLAN,
  DELETE_PLAN
};
