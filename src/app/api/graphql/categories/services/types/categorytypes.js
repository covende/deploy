import { gql } from 'graphql-request';
import WMCategoryProduct from '../../../webmodel/WMCategoryProduct';

export const CATEGORY_PRODUCTS_LIST = gql`
    query categoryProductsList($status: Boolean){
        categoryProductsList(status: $status)${WMCategoryProduct}
    }
`;

export const CATEGORIES_HOME = gql`
  query categoriesHome {
    categoriesHome {
      _id
      custom_id
      name
      parent_id
      slug
      description
      image
      status
      logo
      percent
      mimimun
      slider
      banner
      store_ids
      datestart
      dateends
      allow_return
      stores {
        logo
        _id
        comercial_name
      }
      products {
        product_name
        product_photo
        precio
        percentage_oferta
        product_slug
        product_id
        precio_minimo
        precio_maximo
        offer
        offer_type
        offer_value
        stars
        pedido_minimo
        store_id
        product_attributes {
          name
          id_attribute
        }
      }
    }
  }
`;

export const CATEGORY_PRODUCT_BY_SLUG = gql`
    query categoryProductBySlug($slug: String){
        categoryProductBySlug(slug: $slug)${WMCategoryProduct}
    }
`;

export const CATEGORIES_BY_STORE = gql`
  query categoriesByStore($store_id: String!) {
    categoriesByStore(store_id: $store_id) {
      _id
      name
    }
  }
`;

export const CATEGORY_PRODUCTS_BY_ID = gql`
    query categoryProductsByID($_id: String!){
        categoryProductsByID(_id: $_id)${WMCategoryProduct}
    }
`;
export const ADD_CATEGORY_PRODUCT = gql`
    mutation addCategoryProduct(
        $name: String!
        $parent_id: String!
        $slug: String!
        $description: String!
        $image: String!
        $percent: Float
        $mimimun: Float
        $logo: String
        $datestart: Date
        $dateends: Date
        $slider: String
        $banner: String
        $allow_return: Boolean!
    ){
        addCategoryProduct(
            name: $name
            parent_id: $parent_id
            slug: $slug
            description: $description
            image: $image
            percent: $percent
            mimimun: $mimimun
            datestart: $datestart
            logo: $logo
            dateends: $dateends
            slider:$slider
            banner:$banner
            allow_return:$allow_return
        )${WMCategoryProduct}
    }
`;
export const EDIT_CATEGORY_PRODUCT = gql`
    mutation editCategoryProduct(
        $_id: String!
        $name: String!
        $parent_id: String!
        $slug: String!
        $description: String!
        $image: String!
        $status: Boolean!
        $logo: String
        $percent: Float
        $mimimun: Float
        $datestart: Date
        $dateends: Date
        $slider: String
        $banner: String
        $allow_return: Boolean!
    ){
        editCategoryProduct(
            _id: $_id
            name: $name
            parent_id: $parent_id
            slug: $slug
            description: $description
            image: $image
            status: $status
            percent: $percent
            logo: $logo
            mimimun: $mimimun
            datestart: $datestart
            dateends: $dateends
            slider:$slider
            banner:$banner
            allow_return:$allow_return
        )${WMCategoryProduct}
    }
`;
export const DELETE_CATEGORY_PRODUCT = gql`
    mutation deleteCategoryProduct($_id: String!){
        deleteCategoryProduct(_id: $_id)${WMCategoryProduct}
    }
`;
