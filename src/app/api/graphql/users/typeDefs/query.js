import { gql } from 'graphql-request';
import { userFragment } from './fragments';

const USERS = gql`
  ${userFragment.USER_ALL_FIELDS}
  query users($platformID: String!) {
    users(platformID: $platformID) {
      ...userAllFields
    }
  }
`;

const USERS_BY_LIMIT = gql`
  ${userFragment.USERS_ALL_FIELDS}
  query usersLimit($limit: Int, $platformID: String!) {
    users(limit: $limit, platformID: $platformID) {
      ...userAllFields
    }
  }
`;

const USER_BY_ID = gql`
  ${userFragment.USERS_ALL_FIELDS}
  query userByID($user_id: String!, $platformID: String!) {
    userByID(user_id: $user_id, platformID: $platformID) {
      ...userAllFields
    }
  }
`;

const USER_BY_EMAIL = gql`
  query userByEmailSeller($email: String!) {
    userByEmailSeller(email: $email) {
      exist
      active
      type
      next
      url
      message
      user {
        user_id
        first_name
        last_name
        email
        dni
        tipodoc
      }
    }
  }
`;

const USER_FOR_LOGIN = gql`
  ${userFragment.USER_FOR_LOGIN_ALL_FIELDS}
  query userForlogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      ...userForLoginAllFields
    }
  }
`;

export default {
  USERS,
  USERS_BY_LIMIT,
  USER_BY_ID,
  USER_BY_EMAIL,
  USER_FOR_LOGIN
};
