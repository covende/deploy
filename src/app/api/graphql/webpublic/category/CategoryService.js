import { gql } from 'graphql-request';
import WMCategoryProduct from '../../webmodel/WMCategoryProduct';
import WMInfo from '../../webmodel/WMInfo';
import WMProductItemPublic from '../../webmodel/WMProductItemPublic';

export const CATEGORY_PRODUCT_BY_CUSTOM_ID = (custom_id, parents = false) => {
  return `{
    categoryProductByCustomID(id:"${custom_id}", parents: ${parents})${WMCategoryProduct}
  }`;
};

export const CATEGORY_PRODUCT_BY_SLUG = (blug, parents = false) => {
  return `{
    categoryProductBySlug(slug:"${blug}", parents: ${parents})${WMCategoryProduct}
  }`;
};

export const SUB_CATEGORIES_PUBLIC = (_id, categoriesParents = false) => `{
    subcategoriesPublic(header_id:"${_id}", categoriesParents:${categoriesParents}){
      _id
      name
      parent_id
      slug
      description
      image
      slider
      banner
      status
      custom_id
      categories ${WMCategoryProduct}
    }
  }`;

export const CATEGORY_PRODUCTS_OFFERT_PUBLIC = (cant) => `{
 categoryProductsOfferPublic(
    cant_category:${cant}
  ) {
    category_id
    name
    image
    slider
    banner
    products ${WMProductItemPublic}
  }

 }`;

export const CATEGORY_HEADER_PUBLIC = () => `{
   categoriesHeaderPublic${WMCategoryProduct}
 }`;

export const CATEGORY_BY_STORE_PUBLIC = (id) => `{   
  categoriesByStorePublic(store_id:"${id}")
   ${WMCategoryProduct}
 }`;

export const CATEGORY_MAIN_PUBLIC = () => `{
 categoriesOfferPublic${WMCategoryProduct}
 }`;

export const FULL_QUERY_PRODUCTS = (
  filtro,
  categoryProductBySlug,
  page,
  sortBy,
  itemsPage = 40
) => {
  return gql`

    query  {
      productsPublic(
      page:${page} 
      category_ids:["${categoryProductBySlug?._id || ''}"]
      itemsPage: ${itemsPage}
      sort: "${sortBy}"
      filtro:{
        price_range:{
          desde: "${filtro?.filtro?.price_range?.desde || ''}",
          hasta: "${filtro?.filtro?.price_range?.hasta || ''}"
          }    
        type_sale: "${filtro?.filtro?.type_sale || ''}"
        brand_id: "${filtro?.filtro?.marca_id || ''}"
        ${
          filtro?.filtro?.marca_ids?.length != 0
            ? `brand_ids: ${JSON.stringify(filtro?.filtro?.marca_ids || [])}`
            : ''
        }
        condition: "${filtro?.filtro?.condicion || ''}"
        search: "${filtro?.filtro?.search || ''}"
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

export const FULL_QUERY_PRODUCTS_OFERTAS = (category, page) => {
  return gql`
    query {
      productsPublic( page:${page} category_ids:["${category}"] filtro: { promotions: { offers: true } }) {
        ${WMInfo}
        productsItemPublic ${WMProductItemPublic}
      }
    }
  `;
};

export const STORES_BY_CATEGORIES_PUBLIC = ({
  page = 1,
  itemsPage = 5,
  cant_store = 10,
  category = ''
}) => {
  return `
  {
    storesByCategoriesPublic(
      page: ${page}
      itemsPage: ${itemsPage},
      cant_store: ${cant_store},
      category: "${category}"
    ) {
      status
      info {
        page
        total
        itemsPage
        pages
      }
      storesByCategories {
        category_id
        name
        image
        banner
        stores {
          comercial_name
          social_razon
          logo
          type_of_sale
          category_images
          _id
        }
      }
    }
  }
  `;
};
