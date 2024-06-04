import { gql } from 'graphql-request';

const modelo = `_id
            name
            role
            description
            subcategories{
                _id
                name
                role
                description
                idcategory
                value
                porcentage
                status
            }
            status
            `;

export const PLAN_CATEGORY_ADD = gql`
    mutation PlanCategoryAdd($name: String!, $role: String!, $description: String! ){
        PlanCategoryAdd( name: $name, role: $role, description: $description ){
            ${modelo}
        }
    }
`;
export const PLAN_CATEGORY_FIND = gql`
  query PlanCategoryFind($_id: String!){
    PlanCategoryFind(_id: $_id){
      ${modelo}
    }
  }
`;
export const PLAN_CATEGORY_EDIT = gql`
    mutation PlanCategoryEdit(
        $_id: String
        $name: String
        $role: String
        $description: String
    ){
        PlanCategoryEdit(
            _id: $_id
            name: $name
            role: $role
            description: $description
        ){
            ${modelo}
        }
    }
`;
export const PLAN_CATEGORY_LIST = gql``;
export const PLAN_CATEGORY_ROLE = gql`
    query PlanCategoryRole($role: String!){
        PlanCategoryRole(role: $role){
            ${modelo}
        }
    }
`;
