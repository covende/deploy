import WMInfo from '../webmodel/WMInfo';
import WMQuotation from '../webmodel/WMQuotation';
import { gql } from 'graphql-request';

export const QUOTATIONS = ({ date = '', category = '' }) => `{
  
    quotations(
      page: ${date}
      itemsPage: ${category}
      ${
        date != '' || category != ''
          ? `filtro: {  ${date != '' ? `, date: ""` : ``} ${
              category != '' ? `,category: "${category}"` : ``
            }  }`
          : ``
      }
      relations: { product: true, user: true, seller: true, room: false }
    ) {
      ${WMInfo}
      quotations ${WMQuotation}
    }
  }
  `;

export const SAVE_QUOTATIONS = ({
  user_id,
  product_id,
  quantity,
  measure_unit,
  delivery_time,
  message,
  file,
  other_stores
}) => `mutation{
       addQuotation(
         quotation:{
              user_id:"${user_id}"
              product_id:"${product_id}"
              quantity:${quantity}
              measure_unit:"${measure_unit}"
              delivery_time :${delivery_time}
              message:"""${message}"""
              file:"${file}"
              other_stores:${other_stores}
    }    
   )
    {
    status
     message
          quotation{
      _id
      custom_id
      user_id
      user{
        user_id
      }
      seller_id
    }
    }

}`;

export const QUOTATION_SAVE = gql`
  fragment addQuotation on ResultQuotation {
    status
    message
    quotation {
      user_id
      _id
      custom_id
      user_id
      user {
        user_id
      }
      seller_id
    }
  }
  mutation addQuotation(
    $user_id: String
    $product_id: String
    $quantity: Int
    $measure_unit: String
    $delivery_time: Int
    $message: String
    $file: String
    $other_stores: Boolean
  ) {
    addQuotation(
      quotation: {
        user_id: $user_id
        product_id: $product_id
        quantity: $quantity
        measure_unit: $measure_unit
        delivery_time: $delivery_time
        message: $message
        file: $file
        other_stores: $other_stores
      }
    ) {
      ...addQuotation
    }
  }
`;

export const QUOTATIONS_BY_USER_ID = ({
  page = 1,
  itemsPage = 10,
  user_id,
  date = '',
  category = ''
}) => `{
    quotations(
      page: ${page}
      itemsPage: ${itemsPage}
      filtro: { user_id: "${user_id}" ${date != '' ? `, date: ""` : ``} ${
  category != '' ? `,category: "${category}"` : ``
} }
      relations: { product: true, user: true, seller: true, room: false }
    ) {
      ${WMInfo}
      quotations ${WMQuotation}
    }
  }
  `;

  export const COUNTER_HOME_BUYER = (user_id) => `
  {
    counterHomeBuyer(user_id: "${user_id}"){
      orders
      quotations
      favorites
    }
  }
  `;

export const QUOTATIONS_BY_STORE_ID = ({
  page = 1,
  itemsPage = 10,
  store_id,
  date = '',
  category = ''
}) => `{
    quotations(
      page: ${page}
      itemsPage: ${itemsPage}
      filtro: { store_id: "${store_id}" ${date != '' ? `, date: ""` : ``} ${
  category != '' ? `,category: "${category}"` : ``
}  }
      relations: { product: true, user: true, seller: true, room: false }
    ) {
      ${WMInfo}
      quotations ${WMQuotation}
    }
  }
  `;

export const QUOTATION_BY_ID = (id) => `{
  quotationByID(
    _id: "${id}"
    relations: { product: true, user: true, seller: true, room: false }
  ) ${WMQuotation}
}
`;
