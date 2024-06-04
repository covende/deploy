import { Box } from '@chakra-ui/layout';
import { offerprice } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import React from 'react';
import { v4 } from 'uuid';
import ItemCarrito from '../components/ItemCarrito';

function PayResume({
  basket,
  tipodoc,
  tipopago,
  itemsPrice,
  infoenvio,
  factura
}) {
  return (
    <Box backgroundColor='white' rounded='1rem' marginTop='1rem' padding='1rem'>
      {basket.map((cartItem) => (
        <ItemCarrito
          key={v4()}
          producto={cartItem.product}
          pt={45}
          id={cartItem.product_id}
          images={cartItem.product?.main_photograph}
          name={cartItem.product?.product_name}
          description={
            cartItem.product?.product_detail?.featured_description ?? ''
          }
          saving={cartItem.saving}
          // condicion={cartItem.condicion}
          precio={cartItem.price}
          // precio={offerprice({
          //   precio: cartItem.price,
          //   percentage_oferta: cartItem.product?.offer_percentage
          // })}
          subtotal={cartItem.subtotal}
          attributes={
            cartItem.attributes ? JSON.parse(atob(cartItem.attributes)) : ''
          }
          descuento={cartItem.discount}
          cantidad={cartItem?.quantity}
          borrar={() => {}}
          agregar={() => {}}
          eliminar={() => {}}
          actions={false}
          store_name={cartItem?.store?.comercial_name ?? ''}
          envio={cartItem?.delivery_price}
          delivery_time={Math.ceil(Number(cartItem?.delivery_time))}
          disponible={cartItem?.product?.enable ?? true}
          preparation_time_type={cartItem?.preparation_time_type}
          tipodoc={tipodoc}
          infoenvio={infoenvio.direccion}
          delivery_free={cartItem.delivery_price == 0}
        />
      ))}
    </Box>
  );
}

export default PayResume;
