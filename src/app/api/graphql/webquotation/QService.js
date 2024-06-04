import AxiosGQL from '../../rest/AxiosGQL';
import { InfraGQL } from '@/app/infrastructure';
import { QUOTATION_SAVE } from './QTypes';
import {
  QUOTATIONS,
  QUOTATIONS_BY_STORE_ID,
  QUOTATIONS_BY_USER_ID,
  SAVE_QUOTATIONS,
  QUOTATION_BY_ID
} from './QTypes';

export const quotations = async ({ date = '', category = '' }) => {
  const { quotations } = await AxiosGQL(QUOTATIONS({ date, category }));
  return { info: quotations.info, quotations: quotations.quotations };
};

export const quotations_save = async (variables) => {
  const res_quotation = await InfraGQL.query(QUOTATION_SAVE, variables);
  return res_quotation.data.addQuotation;
};
// export const quotations_save = async ({
//   user_id,
//   product_id,
//   quantity,
//   measure_unit,
//   delivery_time,
//   message,
//   file,
//   other_stores
// }) => {
//   const { addQuotation } = await AxiosGQL(
//     SAVE_QUOTATIONS({
//       user_id,
//       product_id,
//       quantity,
//       measure_unit,
//       delivery_time,
//       message,
//       file,
//       other_stores
//     })
//   );
//   return { info: addQuotation.info, addQuotation: addQuotation.addQuotation };
// };

export const quotations_by_user_id = async ({
  page = 1,
  itemsPage = 10,
  user_id,
  date = '',
  category = ''
}) => {
  const { quotations } = await AxiosGQL(
    QUOTATIONS_BY_USER_ID({ page, itemsPage, user_id, date, category })
  );
  return { info: quotations.info, quotations: quotations.quotations };
};

export const quotations_by_store_id = async ({
  page = 1,
  itemsPage = 10,
  store_id,
  date = '',
  category = ''
}) => {
  const { quotations } = await AxiosGQL(
    QUOTATIONS_BY_STORE_ID({ page, itemsPage, store_id, date, category })
  );
  return { info: quotations.info, quotations: quotations.quotations };
};

export const quotation_by_id = async (id) => {
  const { quotationByID } = await AxiosGQL(QUOTATION_BY_ID(id));
  return quotationByID;
};
