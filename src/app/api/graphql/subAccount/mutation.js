import { gql } from 'graphql-request';
import WMSubAccount from '../webmodel/WMSubAccount';
import WMInfo from '../webmodel/WMInfo';

export const ADD_SUBACCOUNT = gql`
  mutation addSubAccount($input: ISubAccount!) {
    addSubAccount(input: $input) {
      message
      status
      data ${WMSubAccount}
    }
  }
`;

export const DELETE_SUBACCOUNT = gql`
  mutation deleteSubAccount($user_id: String!) {
    deleteSubAccount(user_id: $user_id) {
      message
      status
      data
    }
  }
`;

export const ACTIVE_SUBACCOUNT = gql`
  mutation activeSubAccount($user_id: String!, $status: Boolean!) {
    activeSubAccount(user_id: $user_id, status: $status) {
      message
      status
      data
    }
  }
`;

export const GET_SUBACCOUNTS = gql`
query getSubAccounts($page: Int, $itemsPage: Int, $search: String) {
  getSubAccounts(page: $page, itemsPage: $itemsPage, search: $search) {
    message
    ${WMInfo}
    data ${WMSubAccount}
  }
}
`;
