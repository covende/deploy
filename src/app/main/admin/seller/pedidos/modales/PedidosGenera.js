import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Typography, Grid } from '@material-ui/core';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import { add_order_receipt } from '@CVApi/core/webpedido/PedidoService';
import React, { useEffect, useState } from 'react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import CVInputFile from '@CVTemplate/core/CVInputFile';
import { pedidos_by_process } from '@CVApi/core/webadmin/PedidoService';
import CVLink from '@CVTemplate/core/CVLink';
import { COLORS } from '@CVTemplate/core/CVThemes';
import RemisionGuide from '@/app/components/OrderDetails/components/RemisionGuide/RemisionGuide';
import CVText from '@CVTemplate/core/CVText';

const headers = ['N°', 'ID de Pedido', 'Producto', 'Comprobante de pago'];

function PedidosGenera({
  isOpen,
  onClose,
  process,
  store_id,
  buttonRef,
  filtro,
  checkAll
}) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();
  const [list, setList] = useState([]);

  const send = async (receipt, pedido_id) => {
    const result = await add_order_receipt(pedido_id, receipt);
    if (result) {
      setList(
        list.map((item) =>
          item.pedido_id == pedido_id ? { ...item, receipt_url: receipt } : item
        )
      );
    } else {
      CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }
  };

  const next = async () => {
    try {
      setloading(true);
      let orders = list.filter((item) => item.receipt_url);

      if (orders.length > 0) {
        process(orders);
      } else {
        CVAlertError({
          addToast,
          message: 'Adjunta al menos un comprobante de pago.'
        });
      }
      setloading(false);
    } catch (error) {}
  };

  const initData = async () => {
    buttonRef?.current?.click();
    let seleccionados = JSON.parse(localStorage.getItem('selecteds') || []);
    let unSeleccionados = JSON.parse(localStorage.getItem('unSelecteds') || []);

    const { info, pedidos, status } = await pedidos_by_process({
      company_id: store_id || '',
      order_ids: checkAll ? [] : seleccionados,
      no_orders: checkAll ? unSeleccionados : [],
      search: filtro?.search,
      start_date: filtro?.startdate,
      end_data: filtro.enddate
    });

    if (status) setList(pedidos);

    setloading(false);
    seleccionados && localStorage.removeItem('selecteds');
    unSeleccionados && localStorage.removeItem('unSelecteds');
  };

  useEffect(() => {
    list.length == 0 && initData();
  }, []);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      size='xl'
      bgHeader='primary'
      header='Solo un paso más para enviar'
      colorHeader='white'
      maxW='600px'>
      <SizeBox />

      {list.length == 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CVText fontWeight='bold' color='blue' textAlign='center'>
              No tienes pedidos para procesar
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
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CVText textAlign='center' fontWeight='bold' color='blue'>
                Adjunta los comprobantes de pago a los pedidos ha enviar:
              </CVText>
            </Grid>
          </Grid>
          <SizeBox />
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  {headers.map((header) => (
                    <Th key={v4()}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {list.map((item, i) => (
                  <Tr key={v4()}>
                    <Td>{i + 1}</Td>
                    <Td>{item.custom_id}</Td>
                    <Td>{item.producto}</Td>
                    {item?.receipt_url ? (
                      <Td>
                        <CVLink
                          href={item.receipt_url}
                          target='_blank'
                          color='blue'>
                          <Flex alignItems='center' justifyContent='center'>
                            <RemisionGuide />
                          </Flex>
                        </CVLink>
                      </Td>
                    ) : (
                      <Td>
                        <CVInputFile
                          callback={(res) => send(res.data, item.pedido_id)}>
                          Elegir archivo
                        </CVInputFile>
                        <Typography variant='caption'>
                          PDF, JPG, JPEG, PNG {'<'} 10 mb{' '}
                        </Typography>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <SizeBox />
          <Flex width='100%' justifyContent='center'>
            <Box>
              <CVButton isLoading={loading} disabled={loading} onClick={next}>
                Siguiente
              </CVButton>
            </Box>
          </Flex>
        </>
      )}
    </CVModal>
  );
}

export default PedidosGenera;
