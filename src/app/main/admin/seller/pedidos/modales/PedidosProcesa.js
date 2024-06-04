// import SizeBox from '@/common/components/CustomComponent/SizeBox';
// import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
// import {
//   Box,
//   Flex,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   Spinner
// } from '@chakra-ui/react';
// import CVLink from '@CVTemplate/core/CVLink';
// import { process_pedido } from '@CVApi/core/webpedido/PedidoService';
// import React, { useEffect, useState } from 'react';
// import { CVAlertError } from '@CVTemplate/core/CVAlert';
// import { useToast } from '@chakra-ui/toast';
// import { v4 } from 'uuid';
// import RemisionGuide from '@/app/components/OrderDetails/components/RemisionGuide/RemisionGuide';
// import { pedidos_by_process } from '@CVApi/core/webadmin/PedidoService';
// import { Grid } from '@material-ui/core';

// const headers = [
//   'N°',
//   'ID Pedido',
//   'Producto',
//   'Dirección de recojo',
//   'Courier',
//   'N° de guía',
//   'N° de tracking',
//   'Procesado'
// ];

// function PedidosProcesa({
//   isOpen,
//   onClose,
//   process,
//   updateOrder,
//   basepath,
//   buttonRef,
//   filtro,
//   store_id,
//   checkAll
// }) {
//   const [loading, setloading] = useState(false);
//   const [idOrder, setIdOrder] = useState('');
//   const addToast = useToast();
//   const [finished, setFinished] = useState(false);
//   const [list, setList] = useState([]);
//   const [loadingList, setLoadingList] = useState(false);

//   // const delay = (ms = 1000) => {
//   //   return new Promise((resolve) => {
//   //     setTimeout(() => {
//   //       resolve();
//   //     }, ms);
//   //   });
//   // };

//   const procesar = async () => {
//     setloading(true);

//     let ordersProcess = list.filter((order) => order.status !== 'PROCESSED');

//     if (ordersProcess.length == 0)
//       return CVAlertError({
//         addToast,
//         message: 'No tienes pedidos para procesar.'
//       });

//     for (const pedido of ordersProcess) {
//       setIdOrder(pedido.pedido_id);

//       try {
//         const result = await process_pedido(pedido.pedido_id);
//         if (result?.pedido_id) {
//           setList((prevList) => [
//             ...prevList.map((item) =>
//               item.pedido_id == result.pedido_id
//                 ? {
//                     ...item,
//                     estado: result.estado,
//                     status: result.status,
//                     tracking: result.tracking || {},
//                     guide_number: result.guide_number || ''
//                   }
//                 : item
//             )
//           ]);

//           updateOrder(result);
//         } else {
//           setloading(false);
//           CVAlertError({
//             addToast,
//             message:
//               'Ocurrieron errores en el pedido ' +
//               pedido.custom_id +
//               ', vuelva a enviarlo mas tarde'
//           });
//         }
//       } catch (error) {
//         CVAlertError({
//           addToast,
//           message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
//         });
//       }
//     }
//     setloading(false);
//     setIdOrder('');
//     setFinished(true);
//   };

//   const Courier = {
//     olva: 'Olva Courier',
//     minutes99: '99 Minutos',
//     propio: 'Flota Propia'
//   };

//   const initData = async () => {
//     setLoadingList(true);
//     buttonRef?.current?.click();
//     let seleccionados = JSON.parse(localStorage.getItem('selecteds') || []);
//     let unSeleccionados = JSON.parse(localStorage.getItem('unSelecteds') || []);

//     const { info, pedidos, status } = await pedidos_by_process({
//       company_id: store_id || '',
//       order_ids: checkAll ? [] : seleccionados,
//       no_orders: checkAll ? unSeleccionados : [],
//       search: filtro?.search,
//       start_date: filtro?.startdate,
//       end_data: filtro.enddate
//     });

//     if (status) setList(pedidos);

//     setLoadingList(false);
//     seleccionados && localStorage.removeItem('selecteds');
//     unSeleccionados && localStorage.removeItem('unSelecteds');
//   };

//   useEffect(() => {
//     list.length == 0 && initData();
//   }, []);

//   return (
//     <CVModal
//       isOpen={isOpen}
//       onClose={onClose}
//       size='xl'
//       maxW={list.length > 0 ? '1100px' : '350px'}
//       bgHeader='primary'
//       header='Detalle de envío'
//       colorHeader='white'>
//       <SizeBox />
//       <SizeBox />

//       {list.length == 0 ? (
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <CVText fontWeight='bold' color='blue' textAlign='center'>
//               {loadingList ? 'Cargando...' : 'No tienes pedidos para procesar'}
//             </CVText>
//           </Grid>
//           <Grid item xs={12}>
//             <Flex width='100%' justifyContent='center'>
//               <Box>
//                 <CVButton onClick={onClose}>Aceptar</CVButton>
//               </Box>
//             </Flex>
//           </Grid>
//         </Grid>
//       ) : (
//         <>
//           <TableContainer>
//             <Table variant='simple'>
//               <Thead>
//                 <Tr>
//                   {headers.map((header) => (
//                     <Th textAlign='center' key={v4()}>
//                       {header}
//                     </Th>
//                   ))}
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {list.map((item, i) => (
//                   <Tr key={v4()}>
//                     <Td>{i + 1}</Td>
//                     <Td>{item.custom_id}</Td>
//                     <Td>{item.producto}</Td>
//                     <Td>{item?.seller_direction || ''}</Td>

//                     <Td>
//                       <CVText fontWeight='bold' color='blue'>
//                         {Courier[item?.courier_code] || ''}
//                       </CVText>
//                     </Td>

//                     <Td textAlign='center'>
//                       {item?.guide_number ? (
//                         <Flex
//                           fontSize='16px'
//                           justifyContent='center'
//                           width='100%'>
//                           <CVText color='blue' fontWeight='bold'>
//                             {item?.guide_number}
//                           </CVText>
//                           <SizeBox />
//                           <CVText fontSize='16px' color='blue'>
//                             <CVLink
//                               href={
//                                 basepath +
//                                 '/api.shippingguidepdf/' +
//                                 item?.guide_number
//                               }
//                               target='_blank'
//                               color='blue'>
//                               <Flex alignItems='center' justifyContent='center'>
//                                 <RemisionGuide />
//                               </Flex>
//                             </CVLink>
//                           </CVText>
//                           <SizeBox />
//                         </Flex>
//                       ) : (
//                         '-'
//                       )}
//                     </Td>

//                     <Td textAlign='center'>
//                       {item?.tracking?.remito ? (
//                         <Flex justifyContent='center'>
//                           <Box
//                             rounded='1rem'
//                             padding='3px 1rem'
//                             backgroundColor='gray.300'>
//                             <CVText color='green'>
//                               {item?.tracking?.remito}
//                             </CVText>
//                           </Box>
//                         </Flex>
//                       ) : (
//                         '-'
//                       )}
//                     </Td>

//                     <Td textAlign='center'>
//                       {idOrder == item.pedido_id ? (
//                         <Spinner
//                           thickness='4px'
//                           speed='0.65s'
//                           emptyColor='gray.200'
//                           color='blue.500'
//                           size='md'
//                         />
//                       ) : (
//                         <Flex width='100%' justifyContent='center'>
//                           <Box>
//                             <CVText
//                               textAlign='center'
//                               fontWeight='bold'
//                               color='blue'>
//                               {item.status == 'PROCESSED' ? 'Sí' : '-'}
//                             </CVText>
//                           </Box>
//                         </Flex>
//                       )}
//                     </Td>
//                   </Tr>
//                 ))}
//               </Tbody>
//             </Table>
//           </TableContainer>
//           <SizeBox />
//           <SizeBox />
//           {finished ? (
//             <>
//               <CVText fontWeight='bold' color='blue'>
//                 Imprime la Guía de envío y pégala en el paquete a enviar.
//               </CVText>
//               <CVText color='blue'>
//                 Deberás entregar una copia al courier cuando venga a recoger el
//                 pedido. Puedes guardar otra copia para tus registros. Además,
//                 recuerda tomar fotos del contenido del paquete para guardar
//                 evidencias.
//               </CVText>
//               <SizeBox />
//               <CVText fontWeight='bold' color='blue'>
//                 El courier vendrá a recoger tu pedido pronto.{' '}
//               </CVText>
//               <CVText color='blue'>
//                 Podrás hacer seguimiento a tu pedido usando el número de
//                 Tracking en la web del courier.
//               </CVText>
//               <SizeBox />
//               <SizeBox />
//               <CVText textAlign='center' color='blue'>
//                 Haz procesado exitosamente tus pedidos.
//               </CVText>
//               <SizeBox />
//               <Flex width='100%' justifyContent='center'>
//                 <Box>
//                   <CVButton onClick={process}>Aceptar</CVButton>
//                 </Box>
//               </Flex>
//             </>
//           ) : (
//             <>
//               <CVText textAlign='center' color='blue'>
//                 {loading
//                   ? 'No cerrar la venta hasta que termine de procesar.'
//                   : 'Haz clic en el siguiente botón para notificar al courier que recoja tu pedido.'}
//               </CVText>
//               <SizeBox />
//               <Flex width='100%' justifyContent='center'>
//                 <Box>
//                   <CVButton
//                     isLoading={loading}
//                     disabled={loading}
//                     onClick={procesar}>
//                     PROCESAR
//                   </CVButton>
//                 </Box>
//               </Flex>
//             </>
//           )}
//         </>
//       )}
//     </CVModal>
//   );
// }

// export default PedidosProcesa;

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import {
  process_pedidos,
  total_pedidos_by_status
} from '@CVApi/core/webadmin/PedidoService';
import { Grid } from '@material-ui/core';

function PedidosProcesa({
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

  const procesar = async () => {
    setloading(true);

    let resp = await process_pedidos({
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
      status: 'PENDING'
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
      header='Detalle de preparación masiva'
      colorHeader='white'>
      <SizeBox />

      {total == 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CVText fontWeight='bold' color='blue' textAlign='center'>
              {loadingInit ? 'Cargando...' : 'No tienes pedidos para procesar'}
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
              <CVText fontWeight='bold' color='blue'>
                Imprime la Guía de envío y pégala en el paquete a enviar.
              </CVText>
              <CVText color='blue'>
                Deberás entregar una copia al courier cuando venga a recoger el
                pedido. Puedes guardar otra copia para tus registros. Además,
                recuerda tomar fotos del contenido del paquete para guardar
                evidencias.
              </CVText>
              <SizeBox />
              <CVText fontWeight='bold' color='blue'>
                El courier vendrá a recoger tu pedido pronto.
              </CVText>
              <CVText color='blue'>
                Podrás hacer seguimiento a tu pedido usando el número de
                Tracking en la web del courier.
              </CVText>
              <SizeBox />
              <SizeBox />
              <CVText textAlign='center' color='blue' fontWeight='bold'>
                Tus pedidos estan siendo procesados. Ver los cambios en la
                plataforma puede tardar algunos minutos.
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
                  No cerrar la venta hasta que termine de procesar.
                </CVText>
              ) : (
                <>
                  <CVText textAlign='center' color='blue'>
                    Tienes&nbsp;
                    <b>
                      {total} {total > 1 ? 'pedidos' : 'pedido'}
                    </b>
                    &nbsp;para procesar.
                  </CVText>
                  <CVText textAlign='center' color='blue'>
                    Haz clic en el siguiente botón para notificar al courier que
                    recoja {total > 1 ? 'tus pedidos' : 'tu pedido'}.
                  </CVText>
                </>
              )}

              <SizeBox />
              <Flex width='100%' justifyContent='center'>
                <Box>
                  <CVButton
                    isLoading={loading}
                    disabled={loading}
                    onClick={procesar}>
                    PROCESAR
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

export default PedidosProcesa;
