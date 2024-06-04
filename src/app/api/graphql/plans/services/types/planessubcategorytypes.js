import { gql } from 'graphql-request';

const modelo = `_id
                name
                role
                description
                idcategory
                value
                porcentage
                status
                datestart
                dateends
                `;

export const PLAN_SUBCATEGORY_FIND = gql`
  query PlansubcategoryFind($_id: String!){
    planByID(_id: $_id){
      ${modelo}
    }
  }
`;
export const PLAN_SUBCATEGORY_EDIT = gql`
    mutation PlansubcategoryEdit(
        $_id: String!
        $name: String!
        $role: String!
        $description: String!
        $idcategory: String!
        $value: String!
        $porcentage: String!
        $status: Boolean!
        $datestart: Date!
        $dateends: Date!
    ){
        PlansubcategoryEdit(
            _id: $_id
            name: $name
            role: $role
            description: $description
            idcategory: $idcategory
            value: $value
            porcentage: $porcentage
            status: $status
            datestart: $datestart
            dateends: $dateends
        ){
            ${modelo}
        }
    }
`;
export const PLAN_SUBCATEGORY_ADD = gql`
    mutation PlansubcategoryAdd(
        $name: String!
        $role: String!
        $description: String!
        $idcategory: String!
        $value: String!
        $porcentage: String!
        $datestart: Date!
        $dateends: Date!
    ){
        PlansubcategoryAdd(
            name: $name
            role: $role
            description: $description
            idcategory: $idcategory
            value: $value
            porcentage: $porcentage
            datestart: $datestart
            dateends: $dateends
        ){
            ${modelo}
        }
    }
`;
export const PLAN_SUBCATEGORY_REMOVE = gql`
    mutation PlansubcategoryRemove($_id: String!){
        PlansubcategoryRemove(_id: $_id){
            ${modelo}
        }
    }
`;
