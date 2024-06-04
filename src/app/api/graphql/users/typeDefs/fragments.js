import { gql } from 'graphql-request';

const USER_ALL_FIELDS = gql`
  fragment userAllFields on UserList {
    user_id
    platformID
    customer_id
    first_name
    last_name
    image
    email
    custom_id
    flag_active
    role {
      role_id
      name
    }
    createdAt
  }
`;

const ADD_USER_ALL_FIELDS = gql`
  fragment addUserAllFields on userListResponse {
    code
    message
    description
    error
    data {
      user_id
      platformID
      customer_id
      first_name
      last_name
      image
      flag_active
      role {
        role_id
        name
      }
      createdAt
    }
    next
    url
  }
`;

const EDIT_USER_ALL_FIELDS = gql`
  fragment editUserAllFields on userEdit {
    user_id
    platformID
    email
    image
    flag_active
    token
    role
    first_name
    last_name
    dni
    company_name
    phone {
      type
      number
    }
    fax
    address {
      priority
      street
      city
      district
      region
      zipcode
    }
  }
`;

const USER_FOR_LOGIN_ALL_FIELDS = gql`
  fragment userForLoginAllFields on userLoginResponse {
    code
    message
    description
    error
    data {
      _id
      token
      expireIn
      user_id
      platformID
      first_name
      last_name
      image
      email
      role
      customer_id
      company_id
    }
    sidebars {
      typeDashboard
      headers {
        menuID
        menuName
        menuSlug
        icon
        menus {
          menuName
          menuSlug
          menuID
          icon
          platformID
          typeDashboard
          parentID
          position
        }
        permissions {
          name
        }
      }
    }
  }
`;

const USER_VERIFY_FIELD = gql`
  fragment userVerifyField on userMessage {
    message
  }
`;

export const userFragment = {
  USER_ALL_FIELDS,
  ADD_USER_ALL_FIELDS,
  EDIT_USER_ALL_FIELDS,
  USER_FOR_LOGIN_ALL_FIELDS,
  USER_VERIFY_FIELD
};
