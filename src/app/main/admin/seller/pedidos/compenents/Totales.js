import { pedido_status_counter } from '@/app/api/graphql/webadmin/PedidoService';
import { CVTotales } from '@/common/CovendeTemplate';
import { CVEstadoPedido } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '../../productos/redux/ProductUpdate';
import { lestados } from '../PedidoUtils';

function Totales({ setEstado, store_id }) {
  const [total, setTotal] = useState(lestados);
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();

  const initdata = async () => {
    let company_id = store_id || (await tienda(dispatch, product));
    const result = await pedido_status_counter({ store_id: company_id });
    let totales = [...total];
    let tot = totales.map((item) => {
      let it = result.find((es) => es.original_name == item.title);
      return {
        ...item,
        cantidad: it.total
      };
    });
    setTotal(tot);
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <CVTotales
      lista={total.map((item) => ({
        color: CVEstadoPedido(item.title).color,
        text: `${CVEstadoPedido(item.title).text} (${item.cantidad})`,
        value: item.title
      }))}
      onChange={(value) => setEstado(value)}
    />
  );
}

export default Totales;
