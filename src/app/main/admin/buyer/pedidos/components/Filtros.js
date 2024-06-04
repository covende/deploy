import { pedido_status_counter } from '@/app/api/graphql/webadmin/PedidoService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVInput, CVSelect } from '@/common/CovendeTemplate';
import { CVEstadoPedido } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';
import { COLORS, TIPODATE } from '@/common/CovendeTemplate/CVThemes';
import { Flex, useToast, Spacer, useDisclosure } from '@chakra-ui/react';
import { CVButton } from '@/common/CovendeTemplate';
import { Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { MdDeleteSweep } from 'react-icons/md';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import { DELETE_PEDIDOS_BULLER } from '@CVApi/core/webbo/BProductoService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function Filtros({ filtro, setfiltro, buttonref }) {
  const [state, setstate] = useState([
    { data: 'ALL', total: 0 },
    { data: 'PROCESSED', total: 0 },
    { data: 'SENDED', total: 0 },
    { data: 'COMPLETED', total: 0 },
    { data: 'CANCELLED', total: 0 }
  ]);
  const addToast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const us = getLoggedInUser();
  const initdata = async () => {
    const result = await pedido_status_counter({ buyer_id: us.user_id });
    let totales = [...state];
    let tot = totales.map((item) => {
      let it = result.find((es) => es.original_name == item.data);

      return {
        ...item,
        total: it?.total || 0
      };
    });
    setstate(tot);
  };

  const masiveaction = (confirm) => {
    buttonref?.current?.click();
    let seleccionados = localStorage.getItem('selecteds');
  
    if (!seleccionados || JSON.parse(seleccionados).length === 0) {
      CVAlertError({ addToast, message: 'Selecciona al menos un pedido.' });
      onClose();
      return;
    }
  
    if (us.user_id && seleccionados) {
      AxiosGQL(
        DELETE_PEDIDOS_BULLER({
          user_id: us.user_id,
          orders_ids: JSON.parse(seleccionados)
        })
      )
        .then(({ deletePedidosByBuyer }) => {
          console.log('Success:', deletePedidosByBuyer);
          if (deletePedidosByBuyer && deletePedidosByBuyer.status) {
            CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
            setfiltro({ ...filtro, search: '' });
          } else {
            CVAlertError({ addToast, message: 'Ocurrió un error al eliminar.' });
          }
        })
        .catch((err) => {
          console.error('Error', err);
          CVAlertError({ addToast, message: 'Ocurrió un error al eliminar.' });
        });
    }
  
    localStorage.removeItem('selecteds');
    onClose();
  };
  

  useEffect(() => {
    initdata();
  }, []);

  const CustomButton = ({ pos, text }) => (
    <Button
      style={{
        color: '#FFFFFF',
        backgroundColor: filtro.tipo == pos ? '#FF5454' : '#FFBEBE',
        borderRadius: '20px',
        boxShadow: 'none'
      }}
      onClick={() => setfiltro({ ...filtro, tipo: pos })}
      variant='contained'>
      {text}
    </Button>
  );
  return (
    <>
      <Box>
        <Box
          style={{
            backgroundColor: '#FFBEBE',
            borderRadius: '20px'
          }}>
          <Flex justifyContent='space-between' wrap='wrap'>
            {state.map((item) => (
              <CustomButton
                key={v4()}
                text={`${CVEstadoPedido(item.data).text} (${item.total})`}
                pos={CVEstadoPedido(item.data).value}
              />
            ))}
          </Flex>
        </Box>
        <br />

        <Flex>
          <CVButton padding='0.5rem' onClick={onOpen} backgroundColor='red'>
            <MdDeleteSweep style={{ fontSize: '2rem' }} />
          </CVButton>
          <SizeBox />
          <CVInput
            width='350px'
            iconFind={true}
            placeholder='Buscar pedido'
            buttonColor='red'
            value={filtro.search}
            onChange={(value) => setfiltro({ ...filtro, search: value })}
            onEnter={(value) => setfiltro({ ...filtro, search: value })}
          />

         <SizeBox/>
          <Box maxWidth='350px'>
            <CVSelect
              title='Tiempo: '
              options={TIPODATE}
              value={filtro.time}
              onChange={(value) => setfiltro({ ...filtro, time: value })}
            />
          </Box>
        </Flex>
      </Box>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        title='los Pedidos'
        confirm={masiveaction}
        onConfirm={true}
        itemToDelete={true}
      />
    </>
  );
}

export default Filtros;
