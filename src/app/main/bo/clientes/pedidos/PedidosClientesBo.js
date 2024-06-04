// Page
import SellerPedidos from '@/app/main/admin/seller/pedidos';
import { Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

function PedidosClientesBo() {
  const { client } = useSelector((state) => state.Clients);

  return client?.store?._id ? (
    <SellerPedidos store_id={client?.store?._id || ''} />
  ) : (
    <Text>No Store</Text>
  );
}

export default PedidosClientesBo;
