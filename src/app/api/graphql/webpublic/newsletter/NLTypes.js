import { InfraGQL } from '@/app/infrastructure/graphql/index';
import { gql } from 'graphql-request';
import WMInfo from '../../webmodel/WMInfo';

const Newsletter = `{
    email
    createdAt
    updatedAt
    _id
}`;

export const ADD_NEWS_LETTER = (email) => `mutation{
    addNewsletter(email:"${email}"){
      status
      message
      newsletter${Newsletter}
    }
  }`;

export const NEWS_LETTERS = (page = 1, itemsPage = 20, search = '') => `{
    newsletters(page:${page}, itemsPage:${itemsPage}, search:"${search}"){
      ${WMInfo}
      newsletters${Newsletter}
    }
  }`;

export const DELETE_NEWSLETTER = (_id) => `
mutation {
  deleteNewsletter(_id: "${_id}") {
    message
    status
    newsletter ${Newsletter}
  }
}
`;

export const UPDATE_NEWSLETTER = (_id, email) => `
mutation {
  editNewsletter(_id: "${_id}", email: "${email}") {
    status
    message
    newsletter${Newsletter}
  }
}
`;

export const REQUEST_CHANGES_PROFILE = (data, nuevo, reazon) => `mutation{
    requestChagesProfile(data:"${data}" ,new:"${nuevo}" , reazon:"${reazon}" ){
      status
      message
      newsletter${Newsletter}
    }
  }`;

const REQUEST_SELLER = gql`
  fragment resultNewsletter on ResultNewsletter {
    status
    message
    newsletter ${Newsletter}
  }
  mutation requestFaqSeller(
    $reason: String!
    $detail: String!
    $user: String!
  ) {
    requestFaqSeller(reason: $reason, detail: $detail, user: $user) {
      ...resultNewsletter
    }
  }
`;

export const requestSellerInfo = async (variables) => {
  const res = await InfraGQL.query(REQUEST_SELLER, variables);
  return res.data;
};

export const REQUEST_FAQ_SELLER = (motivo, detalle, usuario) => `mutation{
    requestFaqSeller(reason:"${motivo}" ,detail:"${detalle}" , user:"${usuario}" ){
      status
      message
      newsletter${Newsletter}
    }
  }`;

export const REQUEST_CATEGORY_SELLER = (
  categoryMain,
  categorySecond,
  CategoryThird,
  usuario
) =>
  `mutation{
    requestNewCategory(categoryMain:"${categoryMain}" ,subCategory:"${categorySecond}" , thirdCategory:"${CategoryThird}" , user:"${usuario}" ){
      status
      message
      newsletter${Newsletter}
    }
  }`;
