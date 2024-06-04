import { Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import SellerDevoluciones from '@/app/main/admin/seller/devoluciones';

function DevolucionesClientesBo() {
  const { client } = useSelector((state) => state.Clients);

  return client?.store?._id ? (
    <SellerDevoluciones store_id={client?.store?._id || ''} />
  ) : (
    <Text>No Store</Text>
  );
}

export default DevolucionesClientesBo;
