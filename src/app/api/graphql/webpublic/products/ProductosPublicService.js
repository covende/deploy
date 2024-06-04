import { gql } from 'graphql-request';
import WMCategoryProduct from '../../webmodel/WMCategoryProduct';
import WMInfo from '../../webmodel/WMInfo';
import WMProduct from '../../webmodel/WMProduct';
import WMProductItemPublic from '../../webmodel/WMProductItemPublic';

export const PRODUCT_BY_SLUG = (slug) => `{
     productBySlug(slug:"${slug}"){
      status
      message
      product${WMProduct}
    }
  }`;

export const PRODUCT_BY_ID = (prod, store) => `{
    productById(product_id:"${prod}" store_id:"${store}" ){
      status
      message
      product${WMProduct}
    }
  }`;

export const STORE_WITH_CATEGORIES = (store_id, ibracket, fbracket) => `${
  ibracket ? '{' : ''
}
  storeWithCategories( store_id:"${store_id}"){
    status
    message
    storeCategories{
      stars
      desempeno
      sales
      categories${WMCategoryProduct}
    }
  }
  ${fbracket ? '}' : ''}`;

export const PRODUCTS_BY_CATEGORY_PUBLIC = ({
  category_id,
  filtro,
  filtro_o,
  offer,
  price_range
}) => `{
  productsByCategoryPublic(
    category_id:"${category_id}"
    filtro:{
      ${filtro.marca_id != '' ? `marca_id:"${filtro.marca_id}"` : ''}
      ${filtro.condicion != '' ? `condicion:"${filtro.condicion}"` : ''}
      price_range:{
        desde:${price_range.desde}
        hasta:${price_range.hasta}
      }
      ${filtro.type_sale != '' ? `type_sale:"${filtro.type_sale}"` : ''}
    }
    filtro_o:{
      ${filtro_o.mayor_precio ? `mayor_precio:"${filtro_o.mayor_precio}"` : ''}
      ${filtro_o.menor_precio ? `menor_precio:"${filtro_o.menor_precio}"` : ''}
      ${filtro_o.novedades ? `novedades:"${filtro_o.novedades}"` : ''}
      ${filtro_o.mas_vendido ? `mas_vendido:"${filtro_o.mas_vendido}"` : ''}
      ${
        filtro.mejor_calificado
          ? `mejor_calificado:"${filtro.mejor_calificado}"`
          : ''
      }
    }
    ${offer ? `offer:"${offer}"` : ''}
  ){
    status
    message
    productsItemPublic${WMProductItemPublic}
  }
}`;

export const PRODUCTS_BY_STORE_PUBLIC = ({
  store_id,
  random_amount,
  ibracket = true,
  fbracket = true
}) => `${ibracket ? '{' : ''}
  productsByStorePublic(store_id:"${store_id}",random_amount:${random_amount}){
    status
    message
    productsItemPublic${WMProductItemPublic}
  }
  ${fbracket ? '}' : ''}`;

export const PRODUCTS_OFFER_PUBLIC = (random_amount) => `{
  productsOfferPublic(random_amount:${random_amount}){
    status
    message
    productsItemPublic${WMProductItemPublic}
  }
}`;

export const FULL_QUERY_PRODUCTS_STORE = (id) => {
  return gql`
    query  {
      productsPublic(store_id :"${id}" sort: "star") {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }
    }
  `;
};

export const FULL_QUERY_PRODUCTS_STORE_PAGE = (id, page, fill, categoriID) => {
  if (fill.firstTime == false) {
    return gql`
  query  {
    productsPublic(
      page:${page} 
      store_id :"${id || ''}"
      ${categoriID ? `category_ids: ["${categoriID}"]` : ''}
      filtro: {
        price_range:{
          desde:"${fill?.filtro?.price_range?.desde || ''}",
          hasta:"${fill?.filtro?.price_range?.hasta || ''}"
        }    
        brand_id: "${fill?.filtro?.marca_id || ''}"
        ${
          fill?.filtro?.marca_ids?.length != 0
            ? `brand_ids: ${JSON.stringify(fill?.filtro?.marca_ids || [])}`
            : ''
        }
        type_sale:"${fill.filtro.type_sale}"
         condition:"${fill.filtro.condicion}"
         promotions: {
          free_shipping: ${fill?.filtro?.delivery_free || false}
        }
      }
    ) {
      ${WMInfo}
      productsItemPublic ${WMProductItemPublic}
    }
  }
`;
  } else {
    return gql`
    query  {
      productsPublic(
        page:${page} 
        store_id :"${id}"
      ) {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }
    }
  `;
  }
};

export const RESULT_QUERY_PRODUCTS_STORE = (
  id,
  filtro,
  categoryProductBySlug,
  page
) => {
  return gql`   
    query  {
      productsPublic(
        page:${page} 
        store_id :"${id}"
        category_ids: ["${categoryProductBySlug}"]
         filtro:{
        price_range:{
          desde:"${filtro?.filtro?.price_range?.desde || ''}"
           hasta:"${filtro?.filtro?.price_range?.hasta || ''}"
          }    
        type_sale:"${filtro.filtro.type_sale}"
        condition:"${filtro.filtro.condicion}"
        promotions: {
          free_shipping: ${filtro?.filtro?.delivery_free || false}
        }
        }
        ) {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }
    }
  `;
};

export const FULL_QUERY_PRODUCTS_OFERT_BY_STORE = (id, page) => {
  return gql`
    query {
      productsPublic( store_id:"${id}", page:${page}, filtro: { promotions: { offers: true } }) {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }
    }
  `;
};
