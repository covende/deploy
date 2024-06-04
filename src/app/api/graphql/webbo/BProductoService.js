import { json_format } from '@/common/utils/methods';
import { gql } from 'graphql-request';
import WMInfo from '../webmodel/WMInfo';
import WMProduct from '../webmodel/WMProduct';

const validateFecha = (date) => {
  const fecha = new Date(date || '');
  if (!isNaN(fecha.getTime())) return fecha.toISOString();
  else return '';
};

const validateFechas = (datestart, dateend) => {
  const start = new Date(datestart || '');
  const end = new Date(dateend || '');
  if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
    return `range_date: {
    desde:"${datestart.toISOString()}"
    hasta:"${dateend.toISOString()}"
  }`;
  } else {
    return '';
  }
};

export const PRODUCT_LIST_WITH_STORE = ({ page, itemsPage, filtros }) => `{
    productListWithStore(
      page:${page}
      itemsPage:${itemsPage}
      keywords:"${filtros.keywords}"
      product_state: "${
        filtros.product_state == 'Todo' ? '' : filtros.product_state
      }"
      date: "${validateFecha(filtros?.date)}"
      environment: "${filtros?.ambiente || ''}"
      asesor: "${filtros?.ejecutivo || ''}"
      statusDate: ${filtros?.statusDate || false}
      categories: ${JSON.stringify(filtros.categories || [])}
      ${validateFechas(filtros?.startdate, filtros?.enddate)}
      offer: ${filtros?.offer || false}
    ){
      ${WMInfo}
      products${WMProduct}
    }
}`;

export const APRROVE_PRODUCT = ({
  _id,
  user_id,
  links = [],
  enable = false
}) => {
  let enlaces = json_format(links);
  return `mutation {
    approveProduct(
      product_id: "${_id}"
      status: ${enable}
      asesor: "${user_id}"
      rejection_reasons: ${enlaces}
    ) {
      status
      message
    }
  }`;
};

export const REJECTION_ITEM_SAVE = (title) => `mutation{
  RejectionItemSave(
    title:"${title}"
  ){
    _id
    rejections{
      _id
      item {
        _id
      }
      title
      description
    }
    title
  }
}`;

export const REJECTION_ITEM_UPDATE = (rejection_item_id, title) => `mutation{
  RejectionItemUpdate(
    rejection_item_id: "${rejection_item_id || ''}"
    title:"${title}"
  ){
    _id
    rejections{
      _id
      item {
        _id
      }
      title
      description
    }
    title
  }
}`;

export const REJECTION_ITEM_LIST = `{
  RejectionItemList{
    _id
    rejections{
      _id
      title
      description
    }
    title
  }
}`;

export const REJECTION_DELETE = ({ rejection_id }) => gql`mutation{
  RejectionDelete(
    rejection_id:"${rejection_id || ''}"
  ){
    _id
    item {
      _id
    }
  }}`;

export const REJECTION_ITEM_DELETE = ({ rejection_item_id }) => gql`mutation{
  RejectionItemDelete(
    rejection_item_id:"${rejection_item_id || ''}"
  ){
    _id
  }}`;

export const REJECTION_SAVE = ({ title, item, description }) => gql`mutation{
  RejectionSave(
    item:"${item}"
    title:"${title}"
    description:"""${description}"""
  ){
    _id
    item {
      _id
    }
    title
    description
  }
}`;

export const REJECTION_UPDATE = ({
  _id,
  title,
  item,
  description
}) => gql`mutation{
  RejectionUpdate(
    _id:"${_id}"
    item:"${item}"
    title:"${title}"
    description:"""${description}"""
  ){
    _id
    item {
      _id
    }
    title
    description
  }
}`;

export const REJECTION_LIST = `{
  RejectionList{
    _id
    item{
      title
    }
    title
    description
  }
  }`;

export const DELETE_PRODUCTS = ({
  store_id,
  product_ids = [],
  no_products = [],
  search = '',
  category = '',
  product_state = ''
}) => gql`
  mutation{
    deleteProducts(
      store_id:"${store_id}"
      product_state: "${product_state}"
      product_ids: ${JSON.stringify(product_ids)}
      no_products: ${JSON.stringify(no_products)}
      keywords: "${search}"
      category_id: "${category}"
    ){
      status      
      message
    }
  }`;

export const DELETE_PEDIDOS_BULLER = ({ user_id, orders_ids }) => `
  mutation{
    deletePedidosByBuyer(user_id:"${user_id}", pedidos:${JSON.stringify(
  orders_ids
)}){
      status 
      message     
    }
  }`;

export const ACTIVE_PRODUCTS = ({
  store_id,
  flag_active,
  product_ids = [],
  no_products = [],
  search = '',
  category = ''
}) => {
  return gql`
    mutation {
      activeProducts(
        store_id: "${store_id}"
        product_ids: ${JSON.stringify(product_ids)}
        flag_active: ${flag_active}
        keywords: "${search}"
        category_id: "${category}"
        no_products: ${JSON.stringify(no_products)}
      ) {
        status
        message
      }
    }`;
};

export const CLEAR_STOCK_PRODUCT = ({
  store_id = '',
  product_ids = [],
  search = '',
  category_id = '',
  no_products = []
}) => {
  return `mutation {
    clearStockProducts(
      ids: ${JSON.stringify(product_ids)}
      store_id: "${store_id}"
      keywords: "${search}"
      category_id: "${category_id}"
      no_products: ${JSON.stringify(no_products)}
    ) {
      status
      message
    }
  }`;
};

export const DUPLICATE_PRODUCT = (product_id) => `
mutation {
  duplicateProduct(product_id: "${product_id}") {
    status
    message
  }
}

`;

export const ADD_START_PRODUCT = (product_id, status) => `mutation {
  addStartProduct(product_id: "${product_id}", status: ${status}) {
    status
    message
  }
}`;
