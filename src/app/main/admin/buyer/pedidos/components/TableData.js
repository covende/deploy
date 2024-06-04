import {
  pedidos_paginacion_buyer,
  pedidos_pagination
} from '@/app/api/graphql/webadmin/PedidoService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { CVDataTable, CVPanel } from '@/common/CovendeTemplate';
import { formatpaginate } from '@/common/utils/methods';
import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { headCells, rows } from '../BuyerPedidosUtils';
import CancelarModal from './modales/CancelarModal';
import DevolverModal from './modales/DevolverModal';
import ErrorModal from './modales/ErrorModal';
import SuccessCancel from './modales/SuccessCancel';

function TableData({ filtro, setreference }) {
  const [paginate, setPaginate] = useState({});
  const [loading, setloading] = useState(true);
  const [lista, setlista] = useState([]);
  const [idpedido, setIdpedido] = useState(-1);
  const [pedido, setpedido] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [success, setsuccess] = useState(false);
  const [cancel, setcancel] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState('');

  const initdata = async (page = 1, limit = 10) => {
    setloading(true);
    let us = getLoggedInUser();
    const { info, pedidos } = await pedidos_paginacion_buyer({
      buyer_id: us.user_id,
      page,
      itemsPage: limit,
      pedido_status: filtro.tipo,
      product_name: filtro.search,
      tiempo: filtro.time
    });
    setPaginate(formatpaginate(info));
    setlista(pedidos);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, [filtro]);

  return (
    <CVPanel>
      <Box
        width='100%'
        padding='1rem'
        borderRadius='1rem'
        backgroundColor='#FFFFFF'>
        <CVDataTable
          loading={loading}
          pagination={paginate}
          fetchdata={initdata}
          headers={headCells}
          data={rows({
            lista,
            methods: {
              setIdpedido,
              onOpen,
              cancelapedido: () => setcancel(true),
              setpedido
            }
          })}
          selectable={true}
          selectedComponente={<Box ref={(ref) => setreference(ref)}></Box>}
          selectedAction={(selecteds) => {
            localStorage.setItem('selecteds', JSON.stringify(selecteds));
          }}
        />
      </Box>

      {pedido != null ? (
        <CancelarModal
          isOpen={cancel}
          onClose={() => setcancel(false)}
          idpedido={idpedido}
          pedido={pedido}
          setsuccess={setsuccess}
        />
      ) : (
        ''
      )}

      {success && (
        <SuccessCancel
          isOpen={success}
          onClose={() => setsuccess(false)}
          pedido={pedido}
        />
      )}

      <DevolverModal
        isOpen={isOpen}
        onClose={onClose}
        setmessage={setmessage}
        seterror={() => seterror(true)}
        pedido={pedido}
      />
      <ErrorModal
        isOpen={error}
        message={message}
        onClose={() => seterror(false)}
        pedido={pedido}
      />
    </CVPanel>
  );
}

export default TableData;
