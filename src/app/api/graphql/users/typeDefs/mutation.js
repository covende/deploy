import { gql } from 'graphql-request';
import { userFragment } from './fragments';

const ADD_USER = gql`
  ${userFragment.ADD_USER_ALL_FIELDS}
  mutation addUser(
    # $platformID: String!
    $email: String!
    $password: String!
    # $company_name: String
    $first_name: String
    $last_name: String
    $dni: String
    $phone: String
    $image: String
    # $flag_active: Boolean
    $role: String
    # $typeUser: String!
    $tipodoc: String
    $isRepresent: Boolean
    $policies_terms: Boolean
    $shareData_promotions: Boolean
    $user_id: String
  ) {
    addUser(
      # platformID: $platformID
      email: $email
      password: $password
      # company_name: $company_name
      first_name: $first_name
      last_name: $last_name
      dni: $dni
      phone: $phone
      image: $image
      # flag_active: $flag_active
      role: $role
      # typeUser: $typeUser
      tipodoc: $tipodoc
      isRepresent: $isRepresent
      policies_terms: $policies_terms
      shareData_promotions: $shareData_promotions
      user_id: $user_id
    ) {
      ...addUserAllFields
    }
  }
`;

const EDIT_USER = gql`
  ${userFragment.EDIT_USER_ALL_FIELDS}
  mutation editUser(
    $user_id: String!
    $platformID: String!
    $email: String
    $password: String
    $image: String
    $flag_active: Boolean
    $role: String
    $first_name: String
    $last_name: String
    $dni: String
    $company_name: String
    $phone: [InputUserPhone]
    $fax: String
    $address: [InputUserAddress]
  ) {
    editUser(
      user_id: $user_id
      platformID: $platformID
      email: $email
      password: $password
      image: $image
      flag_active: $flag_active
      role: $role
      first_name: $first_name
      last_name: $last_name
      dni: $dni
      company_name: $company_name
      phone: $phone
      fax: $fax
      address: $address
    ) {
      ...editUserAllFields
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($user_id: String!) {
    deleteUser(user_id: $user_id) {
      message
      status
    }
  }
`;

const VERIFY_EMAIL_USER = gql`
  ${userFragment.USER_VERIFY_FIELD}
  mutation verifyEmailUser($code: String!) {
    verifyEmailUser(code: $code) {
      message
    }
  }
`;

export default {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  VERIFY_EMAIL_USER
};
