import WMDevolucion, { WMDevolucionParcial } from '../webmodel/WMDevolucion';
import { IWithPagination } from '../webbo/BInterface';

export const ADD_DEVOLUTION = ({
  method_id,
  reason_id,
  detail,
  request_date,
  photos,
  pedido_id,
  message_title
}) => `mutation{
      addDevolution(
        method_id:"${method_id}"
        reason_id:"${reason_id}"
        detail:"""${detail}"""
        request_date:"${request_date}"
        photos:${JSON.stringify(photos)}
        pedido_id:"${pedido_id}"
        message_title: "${message_title}"
      )${WMDevolucion}
    }`;

export const DEVOLUCION_BY_ID = (devolucion_id) => `{
    DevolucionById(
      devolucion_id:"${devolucion_id}"
      relations:{
        product:true
        order:true
        method:false
        reason:false
        company:true
        buyer:true
        statuses:true
      }
    )${WMDevolucionParcial({
      product: true,
      order: true,
      company: true,
      buyer: true,
      statuses: true
    })}
  }`;

export const DEVOLUCION_BY_ID_REASON = (devolucion_id) => `{
    DevolucionById(
      devolucion_id:"${devolucion_id}"
      relations:{
        product:false
        order:false
        method:false
        reason:true
        company:false
        buyer:false
        statuses:false
      }
    )${WMDevolucionParcial({
      reason: true
    })}
  }`;

export const DEVOLUCION_BY_PEDIDO_ID = (pedido_id) => `{
    DevolucionByPedidoId(
      pedido_id:"${pedido_id}"
      relations:{
        product:true
        order:true
        method:false
        reason:false
        company:true
        buyer:true
        statuses:true
      }
    )${WMDevolucionParcial({
      product: true,
      order: true,
      company: true,
      buyer: true,
      statuses: true
    })}
  }`;

export const DEVOLUCION_BY_BUYER_ID = ({
  buyer_id = '',
  page = 1,
  limit = 10,
  search = ''
}) => `{
  Devolucions(
    page: ${page}
    limit: ${limit}
    filtro: {
      buyer_id: "${buyer_id}"
      search: "${search}"
    }
    relations:{
      product:true
      order:true
      method:false
      reason:false
      company:false
      buyer:false
      statuses:false
    }
  ){${IWithPagination(WMDevolucionParcial({ product: true, order: true }))}}
  }`;

export const DELETE_DEVOLUTION_EMAIL = (company_id, email) => `
  mutation {
    deleteDevolutionEmail(company_id: "${company_id}", email: "${email}"){
      status
      message
    }
  }
  `;

export const ADD_EMAIL_DEVOLUTION_BY_CODE = (code) => `
mutation {
  addEmailDevolutionByCode(code: "${code}") {
    status
    message
  }
}
`;

export const LIST_DEVOLUTION_EMAILS = (company_id) => `
{
  listDevolutionEmails(company_id: "${company_id}"){
    status
    message
    data
  }
}

`;

export const SEND_VALIDATION_CODE_BY_DEVOLUTION_EMAIL = (email, company_id) => `
mutation {
  sendValidationCodeByDevolutionEmail(email: "${email}", company_id: "${company_id}") {
    status
    message
  }
}
`;

export const DEVOLUCION_BY_COMPANY_ID = ({
  company_id = '',
  page = 1,
  limit = 10,
  status = false,
  desde,
  hasta,
  search
}) => `{
  Devolucions(
    page: ${page}
    limit: ${limit}
    filtro: {
      ${search != '' ? `search:"""${search}"""` : ``}
      company_id: "${company_id}"
      ${status && status != 'ALL' ? `status: "${status}"` : ``}
      ${
        desde != hasta
          ? `date_range: { desde: "${desde}", hasta: "${hasta}" }`
          : ``
      }
    }
    relations:{
      product:true
      order:true
      method:false
      reason:false
      company:false
      buyer:false
      statuses:false
    }
  ){${IWithPagination(WMDevolucionParcial({ product: true, order: true }))}}
    }`;

export const DEVOLUCIONS = ({
  page = 1,
  limit = 10,
  status = false,
  desde,
  hasta,
  search
}) => `{
    Devolucions(
      page: ${page}
      limit: ${limit}
      filtro: {
        search: "${search}"
        ${status ? `status: "${status}"` : ``}
        ${
          desde != hasta
            ? `date_range: { desde: "${desde}", hasta: "${hasta}" }`
            : ``
        }
      }
      relations:{
        product:true
        order:true
        method:true
        reason:true
        company:true
        buyer:true
        statuses:false
      }
    ){${IWithPagination(
      WMDevolucionParcial({
        product: true,
        order: true,
        buyer: true,
        company: true
      })
    )}}
      }`;

export const CONFIRM_SHIPMENT_DEVOLUTION = (devolution_id) => `mutation{
  confirmShipmentDevolution(devolution_id:"${devolution_id}")
}`;

export const SATISFIED_PRODUCT_DEVOLUTION = (devolution_id) => `mutation{
  satisfiedProductDevolution(devolution_id:"${devolution_id}")
}`;

export const UNSATISFIED_PRODUCT_DEVOLUTION = (devolution_id) => `mutation{
  unsatisfiedProductDevolution(devolution_id:"${devolution_id}"){
    sala
    status
  }
}`;

export const REJECT_DEVOLUTION = (devolution_id) => `mutation{
  rejectDevolution(devolution_id:"${devolution_id}"){
    status
    message
    sala
  }
}`;
