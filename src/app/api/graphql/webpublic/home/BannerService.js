import { gql } from 'graphql-request';
import WMCategoryProduct from '../../webmodel/WMCategoryProduct';

export const ALL_OFERTS = gql`
  {
    categoryProductsList(status: true) ${WMCategoryProduct}
    bannerOffers {
      id
      banner_offer_id
      category_product_id
      title
      description
      order
      image
      flag_active
      createdAt
    }
  }
`;
