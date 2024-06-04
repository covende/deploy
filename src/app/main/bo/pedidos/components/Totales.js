import { pedido_status_counter } from '@/app/api/graphql/webadmin/PedidoService';
import { CVTotales } from '@/common/CovendeTemplate';
import { CVEstadoPedido } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';
import React, { useEffect, useState } from 'react';
import { lestados } from '../PedidosBo.utils';

function Totales({ setEstado }) {
  const [total, setTotal] = useState(lestados);

  const initdata = async () => {
    const result = await pedido_status_counter({});
    let totales = [...total];
    let tot = totales.map((item) => {
      let it = result.find((es) => es.original_name == item.title);
      return {
        ...item,
        cantidad: it?.total
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
        color: CVEstadoPedido(item?.title).color,
        text: `${CVEstadoPedido(item?.title).text} (${item?.cantidad})`,
        value: item?.title
      }))}
      onChange={(value) => setEstado(value)}
    />
  );
}

export default Totales;
