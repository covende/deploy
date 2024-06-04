import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { CVJsonFormat } from '@/common/CovendeTemplate/CVMethods';
import WMPedido from '../webmodel/WMPedido';

export const SEND_PEDIDO = ({
  courier_id,
  pedido_id,
  companyDirection_id
}) => `mutation{
    sendPedido(courier_id:"${courier_id}", pedido_id:"${pedido_id}", companyDirection_id:"${companyDirection_id}")${WMPedido}
  }`;

export const ADD_PEDIDO = ({
  medio_pago,
  payment_method_status,
  buyer_id,
  buy_type,
  moneda,
  factura,
  infoenvio,
  billing_type,
  method_payment,
  products,
  id_cupon,
  code_CIP = '',
  url_CIP = '',
  expire_CIP = '',
  transaction_id = '',
  payment_detail = '',
  payment_amount = ''
}) => {
  let productos = products.map((item) => {
    let prod = {};
    prod.product_id = item.id;
    if (item?.producto?.details?.item_id) {
      prod.item_id = item?.producto?.details?.item_id || '';
    }
    prod.comment = toBase64(
      JSON.stringify({ details: item?.producto?.details || {} })
    );
    prod.cantidad = item.cantidad;
    prod.unidad = '';
    prod.precio_envio = item.envio;
    prod.delivery_time = item.delivery_time;
    return prod;
  });
  productos = CVJsonFormat({
    data: productos,
    variant: 'withoutKeys'
  });

  return `mutation{
      addPedido(
        ${
          transaction_id != ''
            ? `transaction_id:"${transaction_id}"
        payment_detail:"""${payment_detail}"""
        payment_amount:"${payment_amount}"`
            : ``
        }
        buyer_id:"${buyer_id}"
        buy_type:"${buy_type}"
        medio_pago:"${medio_pago}"
        method_payment:"${method_payment}"
        coin_type_code:"${moneda}"
        code_cupon:"${id_cupon}"
        billing_type:"${billing_type}"
        ruc_buyer:"${factura.ruc}"
        id_destination_address:"${infoenvio._id}"
        payment_method_status:"${payment_method_status}"
        products:${productos}
        ${
          code_CIP != ''
            ? `code_CIP:{
          cip:"${code_CIP}"
          cipUrl:"${url_CIP}"
          expiryDate:"${expire_CIP.replace('T', ' ').replace('.', ' ')}"
        }`
            : ``
        }
      ){
        status
        message
        pedidos${WMPedido({})}
      }
    }`;
};

export const PAY_SHOPPING_CART = ({
  _id = '',
  buy_type,
  medio_pago,
  method_payment,
  coin_type_code,
  billing_type,
  ruc_buyer,
  payment_method_status,
  code_CIP,
  url_CIP,
  expire_CIP,
  buyer_social_razon
}) => {
  return `mutation {
    payShoppingCart(
      _id: "${_id}"
      buy_type: "${buy_type}"
      medio_pago: "${medio_pago}"
      method_payment: "${method_payment}"
      coin_type_code: "${coin_type_code}"
      billing_type: "${billing_type}"
      ruc_buyer: "${ruc_buyer}"
      buyer_social_razon: "${buyer_social_razon}"
      payment_method_status: "${payment_method_status}"
      code_CIP: {
        cip: "${code_CIP}"
        cipUrl: "${url_CIP}"
        expiryDate: "${expire_CIP}"
      }
    ) {
      status
      message
      shopping_cart_id
    }
  }`;
};

export const GENERATE_SHIPPING_GUIDE_PEDIDOS = ({
  pedidos_custom_ids,
  defaultDirection_id,
  courier_id
}) => `mutation{
  generateShippingGuidePedidos(
    pedidos_custom_ids:${JSON.stringify(pedidos_custom_ids)}
    defaultDirection_id:"${defaultDirection_id}"
    courier_id:"${courier_id}"
  )${WMPedido({})}
}`;

export const PROCESS_PEDIDO = (pedido_id) => `mutation{
  processPedido(pedido_id:"${pedido_id}")${WMPedido({})}
}`;

export const ADD_ORDER_RECEIPT = (order_id, receipt) => `mutation {
  addOrderReceipt(order_id: "${order_id}", receipt:"${receipt}")
}`;

export const GET_SHIPPING_GUIDE_PDF = (guide_number) => `{
  getShippingGuidePDF(guide_number:"${guide_number}"){
    guide_number
    courier
    sender{
      name
      direction
      reference
      province
      department
      district
    }
    receiver{
      direction
      reference
      province
      department
      district
      name
      dni
      phone
    }
  }
}`;

export const CONFIRM_RECEIPT_PEDIDO = ({ pedido_id, user_id }) => `mutation{
  confirmReceiptPedido(pedido_id:"${pedido_id}", user_id:"${user_id}")
}`;
