import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import {
  complete_pedidos,
  total_pedidos_by_status
} from '@CVApi/core/webadmin/PedidoService';
import { Grid } from '@material-ui/core';

function PedidosEntrega({
  isOpen,
  onClose,
  process,
  buttonRef,
  filtro,
  store_id,
  checkAll
}) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState([]);
  const [noSelected, setNoSelected] = useState([]);
  const [loadingInit, setLoadingInit] = useState(true);
  const [total, setTotal] = useState(0);

  const save = async () => {
    setloading(true);

    let resp = await complete_pedidos({
      company_id: store_id || '',
      order_ids: selected,
      no_orders: noSelected,
      search: filtro?.search,
      start_date: filtro?.startdate,
      end_data: filtro?.enddate
    });

    if (resp?.status) {
      setSelected([]);
      setNoSelected([]);
      setFinished(true);
      CVAlertSuccess({
        addToast,
        message: resp.message
      });
    } else {
      CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }
    setloading(false);
  };

  const initData = async () => {
    buttonRef?.current?.click();
    let seleccionados = JSON.parse(localStorage.getItem('selecteds') || []);
    let unSeleccionados = JSON.parse(localStorage.getItem('unSelecteds') || []);

    const resp = await total_pedidos_by_status({
      company_id: store_id || '',
      order_ids: checkAll ? [] : seleccionados,
      no_orders: checkAll ? unSeleccionados : [],
      search: filtro?.search,
      start_date: filtro?.startdate,
      end_data: filtro?.enddate,
      status: 'SENDED'
    });

    if (resp?.status && resp?.data !== '0') {
      setSelected(checkAll ? [] : seleccionados);
      setNoSelected(checkAll ? unSeleccionados : []);
      setTotal(Number(resp.data));
    }

    seleccionados && localStorage.removeItem('selecteds');
    unSeleccionados && localStorage.removeItem('unSelecteds');

    setLoadingInit(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={() => {
        setSelected([]);
        setNoSelected([]);
        onClose();
      }}
      size='xl'
      bgHeader='primary'
      header='Detalle de entrega masiva'
      colorHeader='white'>
      <SizeBox />
      <SizeBox />

      {total == 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CVText fontWeight='bold' color='blue' textAlign='center'>
              {loadingInit ? 'Cargando...' : 'No tienes pedidos para entregar'}
            </CVText>
          </Grid>
          <Grid item xs={12}>
            <Flex width='100%' justifyContent='center'>
              <Box>
                <CVButton onClick={onClose}>Aceptar</CVButton>
              </Box>
            </Flex>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {finished ? (
            <Grid item xs={12}>
              <CVText textAlign='center' color='blue'>
                Tus pedidos estan siendo entregados.
              </CVText>
              <CVText textAlign='center' color='blue'>
                Ver los cambios en la plataforma puede tardar algunos minutos.
              </CVText>
              <SizeBox />
              <Flex width='100%' justifyContent='center'>
                <Box>
                  <CVButton onClick={process}>Aceptar</CVButton>
                </Box>
              </Flex>
            </Grid>
          ) : (
            <Grid item xs={12}>
              {loading ? (
                <CVText textAlign='center' color='blue'>
                  No cerrar la venta hasta que termine de procesar
                </CVText>
              ) : (
                <>
                  <CVText textAlign='center' color='blue'>
                    Tienes&nbsp;
                    <b>
                      {total} {total > 1 ? 'pedidos' : 'pedido'}
                    </b>
                    &nbsp;para entregar.
                  </CVText>
                  <CVText textAlign='center' color='blue'>
                    Haz clic en el siguiente botón para cambiar el estado
                    de&nbsp;
                    {total > 1 ? 'tus pedidos' : 'tu pedido'}
                    &nbsp;ha entregado.
                  </CVText>
                </>
              )}
              <SizeBox />
              <Flex width='100%' justifyContent='center'>
                <Box>
                  <CVButton
                    isLoading={loading}
                    disabled={loading}
                    onClick={save}>
                    Entregar
                  </CVButton>
                </Box>
              </Flex>
            </Grid>
          )}
        </Grid>
      )}
    </CVModal>
  );
}

export default PedidosEntrega;
