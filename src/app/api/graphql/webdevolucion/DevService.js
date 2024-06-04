import { getLoggedInUser } from '@/app/helpers/authUtils';
import { formatFecha } from '@/common/utils/methods';
import AxiosGQL from '../../rest/AxiosGQL';
import {
  ADD_DEVOLUTION,
  ADD_EMAIL_DEVOLUTION_BY_CODE,
  CONFIRM_SHIPMENT_DEVOLUTION,
  DELETE_DEVOLUTION_EMAIL,
  DEVOLUCIONS,
  DEVOLUCION_BY_BUYER_ID,
  DEVOLUCION_BY_COMPANY_ID,
  DEVOLUCION_BY_ID,
  DEVOLUCION_BY_ID_REASON,
  DEVOLUCION_BY_PEDIDO_ID,
  LIST_DEVOLUTION_EMAILS,
  SATISFIED_PRODUCT_DEVOLUTION,
  SEND_VALIDATION_CODE_BY_DEVOLUTION_EMAIL,
  UNSATISFIED_PRODUCT_DEVOLUTION
} from './DevTypes';

export const add_devolution = async ({
  method_id,
  reason_id,
  detail,
  request_date,
  photos,
  pedido_id
}) => {
  const us = getLoggedInUser();
  const { addDevolution } = await AxiosGQL(
    ADD_DEVOLUTION({
      method_id,
      reason_id,
      detail,
      request_date,
      photos,
      pedido_id,
      message_title: us?.first_name + ' ' + us?.last_name
    })
  );
  return addDevolution;
};

export const devolucion_by_id = async (devolucion_id) => {
  const { DevolucionById } = await AxiosGQL(DEVOLUCION_BY_ID(devolucion_id));
  return DevolucionById;
};

export const devolucion_by_pedido_id = async (pedido_id) => {
  const { DevolucionByPedidoId } = await AxiosGQL(
    DEVOLUCION_BY_PEDIDO_ID(pedido_id)
  );
  return DevolucionByPedidoId;
};

export const devolucion_by_id_reason = async (devolution_id) => {
  const { DevolucionById } = await AxiosGQL(
    DEVOLUCION_BY_ID_REASON(devolution_id)
  );
  return DevolucionById;
};

export const devolucion_by_buyer_id = async ({
  buyer_id = '',
  page = 1,
  limit = 10,
  search = ''
}) => {
  const { Devolucions } = await AxiosGQL(
    DEVOLUCION_BY_BUYER_ID({
      buyer_id,
      page,
      limit,
      search
    })
  );
  return Devolucions || { docs: [] };
};

export const devolucion_by_company_id = async ({
  company_id = '',
  page = 1,
  limit = 10,
  status = false,
  desde,
  hasta,
  search
}) => {
  const { Devolucions } = await AxiosGQL(
    DEVOLUCION_BY_COMPANY_ID({
      company_id,
      page,
      limit,
      status,
      desde: formatFecha(desde),
      hasta: formatFecha(hasta),
      search
    })
  );
  return Devolucions || { docs: [] };
};

export const delete_devolution_email = async (company_id, email) => {
  const { deleteDevolutionEmail } = await AxiosGQL(
    DELETE_DEVOLUTION_EMAIL(company_id, email)
  );
  return deleteDevolutionEmail;
};

export const list_devolution_emails = async (company_id) => {
  const { listDevolutionEmails } = await AxiosGQL(
    LIST_DEVOLUTION_EMAILS(company_id)
  );
  return listDevolutionEmails;
};

export const send_validation_code_by_devolution_email = async (
  email,
  store_id
) => {
  const { sendValidationCodeByDevolutionEmail } = await AxiosGQL(
    SEND_VALIDATION_CODE_BY_DEVOLUTION_EMAIL(email, store_id)
  );
  return sendValidationCodeByDevolutionEmail;
};

export const addEmailDevolutionByCode = async (code) => {
  const { addEmailDevolutionByCode } = await AxiosGQL(
    ADD_EMAIL_DEVOLUTION_BY_CODE(code)
  );
  return addEmailDevolutionByCode;
};

export const devolucions = async ({
  page = 1,
  limit = 10,
  status = false,
  desde,
  hasta,
  search
}) => {
  const { Devolucions } = await AxiosGQL(
    DEVOLUCIONS({
      page,
      limit,
      status,
      desde: formatFecha(desde),
      hasta: formatFecha(hasta),
      search
    })
  );
  return Devolucions || { docs: [] };
};

export const confirm_shipment_devolution = async (devolution_id) => {
  const { confirmShipmentDevolution } = await AxiosGQL(
    CONFIRM_SHIPMENT_DEVOLUTION(devolution_id)
  );
  return confirmShipmentDevolution || false;
};
export const satisfied_product_devolution = async (devolution_id) => {
  const { satisfiedProductDevolution } = await AxiosGQL(
    SATISFIED_PRODUCT_DEVOLUTION(devolution_id)
  );
  return satisfiedProductDevolution;
};
export const unsatisfied_product_devolution = async (devolution_id) => {
  const { unsatisfiedProductDevolution } = await AxiosGQL(
    UNSATISFIED_PRODUCT_DEVOLUTION(devolution_id)
  );
  return unsatisfiedProductDevolution;
};
