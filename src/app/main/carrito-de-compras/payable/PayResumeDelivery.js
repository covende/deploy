import { Box } from '@chakra-ui/layout';
import { offerprice } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import React from 'react';
import { v4 } from 'uuid';
import ItemCarritoDelivery from '../components/ItemCarritoDelivery';
import { useToast } from '@chakra-ui/toast';
import { CVAlertWarning } from '@CVTemplate/core/CVAlert';

function PayResumeDelivery({
  basket,
  tipodoc,
  tipopago,
  itemsPrice,
  infoenvio,
  factura,
  itemChangeDelivery,
  deleteItemErrorDelivery,
  shoppingCartStatus,
  hasDelivery
}) {
  const addToast = useToast();

  return (
    <Box
      backgroundColor='white'
      rounded='1rem'
      marginTop='1rem'
      padding='1rem'
      {...(shoppingCartStatus == 'VALIDATED_COUPON'
        ? {
            cursor: 'not-allowed',
            backgroundColor: '#f0f0f0',
            color: '#888888',
            border: '1px solid #ccc'
          }
        : {})}
      onClick={() => {
        if (shoppingCartStatus == 'VALIDATED_COUPON')
          CVAlertWarning({
            addToast,
            message: 'Debes quitar el cupón si quieres actualizar tu dirección',
            duration: 3000
          });
      }}>
      {basket.map((cartItem) => (
        <ItemCarritoDelivery
          key={v4()}
          producto={cartItem.product}
          pt={45}
          id={cartItem._id}
          images={cartItem.product?.main_photograph}
          name={cartItem.product?.product_name}
          description={
            cartItem.product?.product_detail?.featured_description ?? ''
          }
          saving={cartItem?.saving}
          precio={cartItem.price}
          subtotal={cartItem.subtotal}
          attributes={
            cartItem.attributes ? JSON.parse(atob(cartItem.attributes)) : ''
          }
          deliveries={cartItem?.deliveries}
          descuento={cartItem.discount}
          cantidad={cartItem?.quantity}
          borrar={() => {}}
          agregar={() => {}}
          eliminar={() => {}}
          deleteItemErrorDelivery={deleteItemErrorDelivery}
          changeDeliveryByID={itemChangeDelivery}
          actions={false}
          store_name={cartItem?.store?.comercial_name ?? ''}
          envio={cartItem?.delivery_price}
          delivery_time={Math.ceil(Number(cartItem?.delivery_time))}
          disponible={cartItem?.product?.enable ?? true}
          preparation_time_type={cartItem?.preparation_time_type}
          delivery_code={cartItem?.delivery_code}
          shoppingCartStatus={shoppingCartStatus}
          hasDelivery={hasDelivery}
        />
      ))}
    </Box>
  );
}

export default PayResumeDelivery;
