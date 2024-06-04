import WMInfo from '../../webmodel/WMInfo';
import WMProduct from '../../webmodel/WMProduct';
import WMProductItemPublic from '../../webmodel/WMProductItemPublic';

export const PRODUCT_LIST_WITH_STORE = ({ page = 1, itemsPage = 1 }) => `{
    productListWithStore(
      page:${page},
      itemsPage:${itemsPage}
    ){
      ${WMInfo}
      products${WMProduct}
    }
  }`;

export const PRODUCTS_RANDOM_PUBLIC = (
  random_amount,
  categories = [],
  no_products = [],
  store_id
) => `{
	productsRandomPublic(
    random_amount:${random_amount}
    store_id: "${store_id || ''}"
    ${
      categories.length != 0
        ? `categories: [${categories.map((categori) => `"${categori}"`)}]`
        : ''
    }
    ${
      no_products.length != 0
        ? `no_products: [${no_products.map((id) => `"${id}"`)}]`
        : ''
    }
  ){
    status
    message
    productsItemPublic${WMProductItemPublic}
  }
}`;

export const PRODUCTS_BEST_SELLERS = (categories = []) => `{
	BestSellers: productsPublic(
    itemsPage: 20
    sort: "best_sellers"
    ${
      categories.length != 0
        ? `category_ids: [${categories.map((categori) => `"${categori}"`)}]`
        : ''
    }
  ){
    status
    message
    productsItemPublic${WMProductItemPublic}
  }
}`;

export const PRODUCTS_BEST_RATED = (random_amount) => ` {
      productsPublic( itemsPage:${random_amount}, sort:"best_rated") {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }    
}`;

export const PRODUCTS_BEST_SELLER = (random_amount) => ` { 
      productsPublic( itemsPage:${random_amount}, sort:"best_sellers") {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }    
}`;

export const PRODUCTS_MOST_VISITED = (random_amount) => ` { 
      productsPublic( itemsPage:${random_amount}, sort:"most_visited") {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }    
}`;

export const PRODUCTS_RECOMMENDED_FOR_YOUR = (random_amount, category) => ` { 
      productsPublic( itemsPage:${random_amount}, category_ids:["${category}"]) {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }    
}`;

export const FULL_QUERY_PRODUCTS_OFERTAS = (category) => {
  if (
    typeof category === 'object' &&
    !Array.isArray(category) &&
    category !== null
  ) {
    category = '';
  }
  return gql`
    query {
      productsPublic( category_ids:["${category}"] filtro: { promotions: { offers: true } }) {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }
    }
  `;
};

export const ADD_SHOPPING_CART_PRODUCT = ({
  _id = '',
  product_id,
  variation_id = '',
  quantity,
  attributes = '',
  campaign = ''
}) => `mutation {
  addOne: addShoppingCartProduct(
    _id: "${_id}"
    product_id: "${product_id}"
    variation_id: "${variation_id}"
    quantity: ${quantity}
    attributes: "${attributes}"
    campaign: "${campaign || ''}"
  ) {
    status
    message
    shopping_cart_id
  }
}`;
