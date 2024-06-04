import { pedidos_paginacion_buyer_intial } from '@/app/api/graphql/webadmin/PedidoService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import LastPedidosItem from './LastPedidosItem';

function LastPedidos({ ver }) {
  const [pedidos, setpedidos] = useState([]);

  const initdata = async (isMounted, page = 1, limit = 3) => {
    if (!isMounted) return;

    let us = getLoggedInUser();
    const { pedidos } = await pedidos_paginacion_buyer_intial({
      buyer_id: us.user_id,
      page,
      itemsPage: limit
    });
    setpedidos(pedidos);
  };

  useEffect(() => {
    let isMounted = true;
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);

  return (
    <Grid container>
      {pedidos.map((item, idx) => (
        <LastPedidosItem key={v4()} item={item} idx={idx} ver={ver} />
      ))}
    </Grid>
  );
}

export default LastPedidos;
