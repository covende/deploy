import OrderDetails from '@/app/components/OrderDetails';
import { pedido_details } from '@CVApi/core/webadmin/PedidoService';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function PedidoDetails({
  id,
  item,
  cancelapedido,
  permisions,
  addExcessShipping
}) {
  const [basepath, setbasepath] = useState('');
  const [data, setData] = useState({
    price: {
      subtotal: '',
      igv: '',
      total: ''
    },
    information: {
      order_id: id,
      order_date: '',
      invoice_emit: '',
      customer_document: '',
      payment_method: '',
      in_charge: ''
    },
    shipping: {
      tracking_id: '',
      type: '',
      address: '',
      date_pickup: '',
      date_delivery: '',
      date_confirmation: ''
    },
    product: {
      name: '',
      sku: '',
      id: '',
      quantity: '',
      price: ''
    },
    buyer: {
      id: '',
      name: '',
      number_document: '',
      email: '',
      celphone: '',
      address: ''
    },
    status: 'PENDING_PAY',
    permit_cancelled: false,
    invoice: {
      id: '',
      trade_name: '',
      address: ''
    }
  });

  const initdata = async () => {
    setbasepath(process.env.API_URL);
    const pedido = await pedido_details(id);

    item = pedido;
    setData({
      ...data,
      information: {
        ...data.information,
        order_date: CVFormatDate({ date: item.fecha_compra }),
        invoice_emit: item.billing_type,
        customer_document: item.ruc_buyer,
        buyer_social_razon: item.buyer_social_razon,
        payment_method: item.methodPayment?.title,
        in_charge: item?.company?.social_razon,
        custom_id: item?.custom_id || ''
      },
      price: {
        ...data.price,
        subtotal: item?.subtotal - item?.igv,
        igv: item?.igv,
        total: item?.subtotal
      },
      shipping: {
        tracking_id: item?.tracking?.remito || '',
        type: '',
        address: item?.receiver_direction || '',
        date_pickup: item?.fecha_recoleccion
          ? CVFormatDate({ date: item?.fecha_recoleccion })
          : '',
        date_delivery: item?.fecha_entrega
          ? CVFormatDate({ date: item?.fecha_entrega })
          : '',
        date_confirmation: item?.fecha_confirmacion
          ? CVFormatDate({ date: item?.fecha_confirmacion })
          : ''
      },
      product: {
        name: item?.producto || '',
        sku: item?.sku || '',
        id: item?.product_id || '',
        custom_id: item?.product?.custom_id || '',
        quantity: item?.cantidad || '',
        attributes: item?.attributes || '',
        price: item?.final_unit_price || '',
        delivery_price: item?.precio_envio || 0
      },
      buyer: {
        id: item?.buyer?.user_id || '',
        custom_id: item?.buyer?.custom_id || '',
        name:
          item?.buyer?.first_name || '' + ' ' + item?.buyer?.last_name || '',
        number_document: item?.buyer?.dni || '',
        email: item?.buyer?.email || '',
        celphone: item?.buyer?.phone ? item?.buyer?.phone[0].number : '',
        address: item?.receiver_direction || ''
      },
      permit_cancelled: item?.permit_cancelled || false,
      guide_number: item?.guide_number || '',
      receipt_url: item?.receipt_url || '',
      status: item?.status || 'PENDING_PAY',
      weekly_cut_id: item?.weekly_cut_id || ''
    });
  };

  useEffect(() => {
    initdata();
  }, [id, item]);
  return (
    <Box padding='0.5rem'>
      <OrderDetails
        {...{ permisions, basepath }}
        data={data}
        item={item}
        cancelapedido={cancelapedido}
        addExcessShipping={addExcessShipping}
      />
    </Box>
  );
}

export default PedidoDetails;
