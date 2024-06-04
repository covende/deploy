import WMCompany from './WMCompany';
import WMCustomer from './WMCustomer';
import WMPedido from './WMPedido';
import WMTable from './WMTable';
import WMProductQ from './WMProductQ';
import WMSPedido from './webmodelstatus/WMSPedido';

const WMDevolucion = `{
    _id
    method_id
    reason_id
    detail
    request_date
    guia_pdf
    photos
    pedido_id
    company_id
    product_id
    status
    custom_id
    pedido${WMPedido({})}
    method${WMTable}
    reason${WMTable}
    company${WMCompany}
    product${WMProductQ}
    buyer${WMCustomer}
    statuses${WMSPedido}
  }`;

export const WMDevolucionParcial = ({
  order,
  method,
  reason,
  company,
  product,
  buyer,
  statuses
}) => `{
    _id
    method_id
    reason_id
    detail
    request_date
    guia_pdf
    photos
    pedido_id
    method{
      title
    }
    company_id
    product_id
    status
    custom_id
    request_status
    tracking{
      emision
      remito
      status
    }
    request_estado
    estado
    confirm_shipment_product
    satisfied_product
    ${order ? `pedido${WMPedido({})}` : ``}
    ${method ? `method${WMTable}` : ``}
    ${reason ? `reason${WMTable}` : ``}
    ${company ? `company${WMCompany}` : ``}
    ${product ? `product${WMProductQ}` : ``}
    ${buyer ? `buyer${WMCustomer}` : ``}
    ${statuses ? `statuses${WMSPedido}` : ``}
  }`;

export default WMDevolucion;
