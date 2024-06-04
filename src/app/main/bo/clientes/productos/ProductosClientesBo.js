// Page
// import SellerProductos from '@/app/main/admin/seller/productos';
import { Text } from '@chakra-ui/react';
import AttrProducts from '@CVPages/core/admin/seller/productos/AttrProducts';
import CargaMasiva from '@CVPages/core/admin/seller/productos/CargaMasiva';
import React from 'react';
import { useSelector } from 'react-redux';
import AddProducts from './bo/AddProducts';
import SellerProductos from './bo/SellerProducts';

function ProductosClientesBo({ params }) {
  const { client } = useSelector((state) => state.Clients);
  const actions = {
    templateEmpty: <Text>No Store</Text>,
    templateProduct: function (origin) {
      if (!origin) return this.templateEmpty;

      if (params.get('id') && params.get('step') && client?.store?._id) {
        return (
          <AddProducts
            action={params.get('action')}
            id={params.get('id')}
            step={params.get('step')}
            store={client?.store}
          />
        );
      } else return this.templateEmpty;
    },
    update: function () {
      return this.templateProduct(true);
    },
    create: function () {
      return this.templateProduct(true);
    },
    carga: function () {
      if (client?.store?._id) return <CargaMasiva store={client?.store} />;
      else this.templateEmpty;
    },
    attributes: function () {
      return <AttrProducts />;
    }
  };

  return actions.hasOwnProperty(params.get('action')) ? (
    actions[params.get('action')]()
  ) : client?.store?._id ? (
    <SellerProductos store_id={client?.store?._id || ''} />
  ) : (
    <Text>No Store</Text>
  );
}

export default ProductosClientesBo;
