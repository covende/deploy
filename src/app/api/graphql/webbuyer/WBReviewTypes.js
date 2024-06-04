import WMInfo from '../webmodel/WMInfo';
import WMReview from '../webmodel/WMReview';
import WMTable from '../webmodel/WMTable';

export const ADD_PRODUCT_REVIEW = ({
  product_id,
  user_id,
  rating,
  comment
}) => `mutation{
	addProductReview(
    product_id:"${product_id}"
    user_id:"${user_id}"
    rating:${rating}
    comment:"""${comment}"""
  ){
    status
    message
    total
    review${WMReview}
  }
}`;

export const ADD_STORE_REVIEW = ({
  store_id,
  user_id,
  rating,
  comment,
  tags
}) => `mutation{
	addStoreReview(
    store_id:"${store_id}"
    user_id:"${user_id}"
    rating:${rating}
    comment:"""${comment}"""
    tags:${tags}
  ){
    status
    message
    total
    review${WMReview}
  }
}`;

export const PRODUCT_OR_STORE_REVIEWS = ({ id, score, page, itemsPage }) => `{
  productOrStoreReviews(id:"${id}",${
  score > 0 ? `score:${score},` : ``
} page:${page}, itemsPage:${itemsPage}){
    ${WMInfo}
    reviewsPublic{
      customer{
        full_name
        image
        provincia
      }
      comment
      rating
      date
      tags${WMTable}
    }
  }
}`;

export const PRODUCT_OR_STORE_REVIEWS_ALL_POINTS = (id) => `
{
  star1:productOrStoreReviews(id:"${id}", score:1){
    info{
      total
    }
  }
  star2:productOrStoreReviews(id:"${id}", score:2){
    info{
      total
    }
  }
  star3:productOrStoreReviews(id:"${id}", score:3){
    info{
      total
    }
  }
  star4:productOrStoreReviews(id:"${id}", score:4){
    info{
      total
    }
  }
  star5:productOrStoreReviews(id:"${id}", score:5){
    info{
      total
    }
  }
}
`;

export const RAITINGS_PERCENTAGE = (id) => `
{
  ratingsPercentage(id: "${id}") {
    reviews_total
    stars {
      score
      percentage
    }
  }
}
`;

export const STORE_REVIEW_BY_CUSTOMER = ({ store_id, customer_id }) => `{
  storeReviewByCustomer(store_id:"${store_id}",customer_id:"${customer_id}")${WMReview}
}`;

export const PRODUCT_REVIEW_BY_CUSTOMER = ({ product_id, customer_id }) => `{
  productReviewByCustomer(product_id:"${product_id}",customer_id:"${customer_id}")${WMReview}
}`;
