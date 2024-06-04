import { gql } from 'graphql-request';

const modelo = `_id
            name
            role
            description
            price
            periodo
            subaccounts
            specifications
            unlimited
            productsPost
            datestart
            dateends
            status`;

export const FIND_ALL = gql``;
export const FIND_BY_ID = gql`
  query planByID($_id:String!){
    planByID(_id: $_id){
      ${modelo}
    }
  }
`;
export const FIND_ALL_BY_NAME = gql``;
export const FIND_ALL_BY_ROLE = gql`
  query plansByRole($role:String!){
    plansByRole(role: $role){
      ${modelo}
    }
  }
`;
export const ADD_PLAN = gql`
  mutation addPlan(
    $name: String!
    $role: String!
    $description: String!
    $specifications: String  
    $price: String!
    $periodo: String!
    $subaccounts: Int!
    $unlimited: Boolean!
    $productsPost: Int!
    $datestart: Date!
    $dateends: Date!
  ){
    addPlan(
      name: $name
      role: $role
      description: $description
      specifications:$specifications
      price: $price
      periodo: $periodo 
      subaccounts: $subaccounts
      unlimited: $unlimited
      productsPost: $productsPost
      datestart: $datestart
      dateends: $dateends
    ){
      ${modelo}
    }
  }
`;
export const EDIT_PLAN = gql`
  mutation  editPlan(
    $_id: String!
    $name: String!
    $role: String!
    $description: String!
    $specifications: String 
    $price: String!
    $subaccounts: Int!
    $periodo: String!
    $unlimited: Boolean!
    $productsPost: Int!
    $datestart: Date!
    $dateends: Date!
    $status: Boolean!
  ){
    editPlan(
      _id: $_id
      name: $name
      role: $role
      description: $description
      specifications: $specifications
      price: $price
      periodo: $periodo
      subaccounts: $subaccounts
      unlimited: $unlimited
      productsPost: $productsPost
      datestart: $datestart
      dateends: $dateends
      status: $status
    ){
      ${modelo}
    }
  }
`;
export const DELETE_PLAN = gql`
  mutation deletePlan( $_id: String! ){
    deletePlan( _id: $_id ){
      ${modelo}
    }
  }
`;

export const ALL_PLANS = gql`
  query plans{
    plans{
      ${modelo}
    }
  }
`;
