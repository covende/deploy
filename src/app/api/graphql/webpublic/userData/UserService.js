import { gql } from 'graphql-request';
import WMUsuario from '../../webmodel/WMUsuario';
import WMUserFind from '../../webmodel/WMUserFind';

export const USER_BY_ID = (id) => gql`
{
  userFind(_id: "${id}")${WMUserFind}
}`;

export const PRODUCT_COUNTER_INICIO = (id) => `
{
   productCounterInicio(store_id:"${id}"){
    original_name
    name
    background_color
    total
   }
  }
  `;

export const PEDIDO_COUNTER_INICIO = (id) => `
{
   pedidoCounterInicio(store_id:"${id}"){
    original_name
    name
    background_color
    total
   }
  }
  `;

export const SET_NEW_PASSWORD = ({ id, old, last }) => `mutation
{
   changePassword(user_id:"${id}" ,oldPassword:"${old}",newPassword:"${last}"){
     status
     message
   }
  }
  `;

export const TYPES_CARDS = () => `
 {
   typesCards {
    _id
    title
    }
  } 
 `;

export const SAVE_CREDIT_CARD = (createCard) => `
 mutation {
  saveCreditCard(
    input: {
      user_id: "${createCard.user_id}"
      type_card_id: "${createCard.type_card_id}"
      number_card: "${createCard.number_card}"
      name_owner: "${createCard.name_owner}"
      expiration_date: "${createCard.expiration_date}"
    }
  ) {
    _id
    user_id
    type_card_id
    number_card
    name_owner
    expiration_date
    type_card {
      title
    }
  }
}
 `;
export const LIST_CREDIT_CARD = (user_id) => `
 {
  listCreditCard(user_id: "${user_id}") {
    _id
    user_id
    type_card_id
    number_card
    name_owner
    expiration_date
    type_card {
      title
    }
  }
}
 `;

export const UPDATE_CREDIT_CARD = (dataToUpdate) => `
mutation {
  updateCreditCard(
    input: {
      _id: "${dataToUpdate._id}"
      user_id: "${dataToUpdate.user_id}"
      type_card_id: "${dataToUpdate.type_card_id}"
      number_card: "${dataToUpdate.number_card}"
      name_owner: "${dataToUpdate.name_owner}"
      expiration_date: "${dataToUpdate.expiration_date}"
    }
  ) {
    _id
    user_id
    type_card_id
    number_card
    name_owner
    expiration_date
    type_card {
      title
    }
  }
}
`;

export const DELETE_CREDIT_CARD = (_id) => `
mutation {
  deleteCreditCard(_id: "${_id}") {
    _id
    user_id
    type_card_id
    number_card
    name_owner
    expiration_date
    type_card {
      title
    }
  }
}
`;

export const USER_UPDATE_TOKEN = ({
  first_name,
  last_name,
  dni,
  phone,
  image,
  tipodoc
}) => `
mutation {
  editUserByToken(
    ${first_name ? `first_name:"${first_name}"` : ``}
    ${last_name ? `last_name:"${last_name}"` : ``}
    ${dni ? `dni:"${dni}"` : ``}
    ${phone ? `phone:"${phone}"` : ``}
    ${image ? `image:"${image}"` : ``}
    ${tipodoc ? `tipodoc:"${tipodoc}"` : ``}
  ) {
    status
    message
    newToken
  }
}
`;

export const USER_UPDATE = ({
  user_id,
  customer_id,
  platformID,
  email,
  password,
  company_name,
  first_name,
  last_name,
  dni,
  phone,
  image,
  flag_active,
  tipodoc,
  isRepresent
}) => `mutation{
  editUser(
    ${user_id ? `user_id:"${user_id}"` : ``}
    ${customer_id ? `customer_id:"${customer_id}"` : ``}
    ${platformID ? `platformID:"${platformID}"` : ``}
    ${email ? `email:"${email}"` : ``}
    ${password ? `password:"${password}"` : ``}
    ${company_name ? `company_name:"${company_name}"` : ``}
    ${first_name ? `first_name:"${first_name}"` : ``}
    ${last_name ? `last_name:"${last_name}"` : ``}
    ${dni ? `dni:"${dni}"` : ``}
    ${phone ? `phone:"${phone}"` : ``}
    ${image ? `image:"${image}"` : ``}
    ${flag_active ? `flag_active:${flag_active}` : ``}
    ${tipodoc ? `tipodoc:"${tipodoc}"` : ``}
    ${isRepresent ? `isRepresent:${isRepresent}` : ``}
  )${WMUsuario}
}`;

export const FIRST_CARD_SELLER = (store_id) => `{
  firstCardSeller(company_id: "${store_id}") {
    monthSalesTotal
    productName
    productPhoto
    productID
    companyName
    companyIcon
    companyStatus
    companyScore
    companyPerformance
  }
}
`;

export const UPDATE_USER_IMG = (store_id, img) => `mutation{
    editImageUser(user_id: "${store_id}", image: "${img}"){
    id
    user_id
    platformID
    customer_id
    first_name
    last_name
    image
   
  }
}
`;
