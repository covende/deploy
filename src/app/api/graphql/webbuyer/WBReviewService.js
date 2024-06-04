import AxiosGQL from '../../rest/AxiosGQL';
import {
  ADD_PRODUCT_REVIEW,
  ADD_STORE_REVIEW,
  PRODUCT_OR_STORE_REVIEWS,
  PRODUCT_OR_STORE_REVIEWS_ALL_POINTS
} from './WBReviewTypes';

export const add_product_review = async ({
  product_id,
  user_id,
  rating,
  comment
}) => {
  const { addProductReview } = await AxiosGQL(
    ADD_PRODUCT_REVIEW({
      product_id,
      user_id,
      rating,
      comment
    })
  );
  return addProductReview;
};

export const add_store_review = async ({
  store_id,
  user_id,
  rating,
  comment,
  tags
}) => {
  const { addStoreReview } = await AxiosGQL(
    ADD_STORE_REVIEW({
      store_id,
      user_id,
      rating,
      comment,
      tags: JSON.stringify(tags)
    })
  );
  return addStoreReview;
};

// export const total_de_calificaciones = async (id) => {
//   const result = await AxiosGQL(PRODUCT_OR_STORE_REVIEWS_ALL_POINTS(id));
//   let total = 0;
//   let totales = Object.keys(result).map((k, v) => {
//     total = eval(total + '') + eval(result[k].info.total + '');
//     return { point: v + 1, total: result[k].info.total, label: v + 1 };
//   });
//   let califications = totales.map((item) => ({
//     ...item,
//     percentage:
//       eval(total + '') > 0
//         ? (eval(item.total + '') / eval(total + '')) * 100
//         : 0
//   }));
//   return {
//     total,
//     califications: califications.reverse()
//   };
// };

export const allreviews = async ({ id, page, itemsPage, score }) => {
  const { productOrStoreReviews } = await AxiosGQL(
    PRODUCT_OR_STORE_REVIEWS({ id, page, itemsPage, score })
  );
  return {
    info: productOrStoreReviews.info,
    reviews: productOrStoreReviews.reviewsPublic
  };
};
