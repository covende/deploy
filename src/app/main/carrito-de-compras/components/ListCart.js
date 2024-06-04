import React, { useState } from 'react';

import { v4 } from 'uuid';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import {
  fromBase64,
  offerprice
} from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import { Delete } from './icons';
import ItemCarrito from './ItemCarrito';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';

function ListCart({
  basket,
  removeProductFromCart,
  addProductToCart,
  deleteProductFromCart,
  clearProductFromCart,
  setProductToCart,
  setShoppingCartData
}) {
  const [onDelete, setOnDelete] = useState(false);
  const [id_delete, setId_delete] = useState('');

  return (
    <>
      {basket &&
        basket.map((cartItem) => (
          <ItemCarrito
            key={v4()}
            producto={cartItem.product}
            pt={45}
            id={cartItem._id}
            descuento={cartItem.discount}
            images={cartItem.product?.main_photograph || ''}
            name={cartItem.product?.product_name || ''}
            description={
              cartItem.product?.product_detail.featured_description ?? ''
            }
            saving={cartItem?.saving}
            subtotal={cartItem.subtotal}
            total={cartItem.total}
            precio={cartItem.price}
            attributes={
              cartItem.attributes ? JSON.parse(atob(cartItem.attributes)) : ''
            }
            cantidad={cartItem.quantity}
            stock={cartItem.stock}
            borrar={removeProductFromCart}
            agregar={addProductToCart}
            setProductToCart={setProductToCart}
            actions={true}
            envio={cartItem.delivery_price}
            delivery_time={cartItem.delivery_time}
            disponible={cartItem.product?.enable ?? true}
            preparation_time_type={cartItem.preparation_time_type}
            setOnDelete={setOnDelete}
            variation_id={cartItem.variation_id}
            setShoppingCartData={setShoppingCartData}
            setId_delete={setId_delete}
            numberItems={basket.length}
            store_name={cartItem.store?.comercial_name ?? ''}
            link_product={cartItem.product.slug ?? ''}
            delivery_free={cartItem?.product?.delivery_free || false}
          />
        ))}

      {basket.length > 0 && (
        <Box
          bg='#FF5454'
          color='white'
          py={5}
          px={2}
          borderBottomEndRadius='1rem'
          borderBottomStartRadius='1rem'>
          <Flex>
            <Link to='/'>Seguir comprando</Link>
            <Spacer />
            <Button colorScheme='white' onClick={() => setOnDelete(true)}>
              <Delete />
              Eliminar todo
            </Button>
          </Flex>
        </Box>
      )}
      <ModalDelete
        isOpen={onDelete}
        onClose={() => setOnDelete(false)}
        title={id_delete == '' ? 'los Productos' : 'el producto'}
        onConfirm={true}
        itemToDelete={id_delete}
        confirm={async (item_delete) => {
          if (id_delete == '') {
            await clearProductFromCart();
          } else {
            await deleteProductFromCart(item_delete);
            setId_delete('');
          }
          setOnDelete(false);
        }}
      />
    </>
  );
}

export default ListCart;
