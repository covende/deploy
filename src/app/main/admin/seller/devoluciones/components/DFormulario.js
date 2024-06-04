import { add_devolution } from '@/app/api/graphql/webdevolucion/DevService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVText } from '@/common/CovendeTemplate';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { Flex } from '@chakra-ui/layout';
import {
  useToast,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { devolucion_by_pedido_id } from '@/app/api/graphql/webdevolucion/DevService';
import { initialdevolucion } from './DMethods';
import DEstado from './DProcesa/DEstado';
import DInformacion from './DProcesa/DInformacion';
import DProducto from './DProcesa/DProducto';
import { pedido_details } from '@CVApi/core/webadmin/PedidoService';
import DDevolver from './DProcesa/DDevolver';
import DProcesado from './DModales/DProcesado';
import DComprador from './DProcesa/DComprador';
import DDevolverBuyer from './DProcesa/DDevolverBuyer';
import { useHistory } from 'react-router-dom';

function DFormulario({
  idpedido,
  iddevolucion,
  disputa,
  aprobar,
  variant = 'seller' || 'buyer' || 'admin',
  method,
  onClose,
  setConfirma,
  setDevolut,
  fetchdata = () => {},
  setDisputa,
  setDevolver,
  devolver,
  title = 'seller'
}) {
  const [devolucion, setdevolucion] = useState(initialdevolucion);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [pedido, setpedido] = useState({});
  const addToast = useToast();
  const [isProcess, setisProcess] = useState(false);
  const [loading, setloading] = useState(false);
  const [reset, setReset] = useState(false);

  const history = useHistory();

  const optsStatus = {
    SENDED: 'PROCESSED',
    RETURNED: 'SENDED'
  };

  const solicite = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    setloading(true);
    const addDevolution = await add_devolution({
      detail: devolucion.informacion.details,
      method_id: devolucion.informacion.methods,
      pedido_id: idpedido,
      photos: devolucion.informacion.photos,
      reason_id: devolucion.informacion.reason,
      request_date: devolucion.informacion.registred_date
    });
    if (addDevolution != null) {
      setdevolucion({ ...devolucion, custom_id: addDevolution.custom_id });
      setisProcess(true);
      if (method == 'create') {
        onOpen();
      }
      initdata();
    } else {
      CVAlertError({ addToast, message: 'Hubieron Errores' });
    }
    setloading(false);
  };

  const senddata = () => (errors ? solicite() : seterrors(true, solicite));

  // const cleardata = async () => {};
  const loaddata = async () => {
    let exist = await devolucion_by_pedido_id(idpedido);
    if (exist != null) {
      setdevolucion({
        ...devolucion,
        courier_type: exist?.pedido?.courier_code,
        idpedido: exist.pedido_id,
        iddevolucion: title != 'bo' ? exist.devolucion_id : exist._id,
        custom_id: exist.custom_id,
        informacion: {
          ...devolucion.informacion,
          registred_date: exist.request_date,
          guia_pdf: exist.guia_pdf || '',
          status: optsStatus[exist?.status] || exist?.status,
          methods: exist.method_id,
          reason: exist.reason_id,
          details: exist.detail,
          photos: exist.photos
        },
        estado: {
          ...devolucion.estado,
          request_status: exist?.request_status,
          statuses: exist?.statuses || [],
          // status: exist?.status,
          status: optsStatus[exist?.status] || exist?.status,
          idtracking: exist?.tracking?.remito
        },
        comprador: {
          name: exist?.buyer?.first_name + ' ' + exist?.buyer?.last_name,
          phone: exist?.buyer?.phone[0].number || '',
          email: exist?.buyer?.email || ''
        },
        company: {
          name: exist?.pedido?.seller_name,
          phone: exist?.pedido?.seller_phone
        },
        confirm_shipment_product: exist?.confirm_shipment_product,
        satisfied_product: exist?.satisfied_product
      });
    } else {
      setdevolucion({
        ...devolucion,
        idpedido,
        iddevolucion
      });
    }

    let order = await pedido_details(idpedido);
    setpedido(order);
  };

  const initdata = async () => {
    // cleardata();
    await loaddata();
  };
  useEffect(() => {
    initdata();
  }, [method]);

  return (
    <>
      {variant == 'buyer' && devolucion?.estado?.request_status == '' && (
        <>
          <CVText color='#D4D4D4' fontSize='12px'>
            Lamentamos que no estés satisfecho con tu pedido. Por favor llena la
            siguiente información para proceder con la devolución.
          </CVText>
        </>
      )}
      <SizeBox />
      <Flex wrap='wrap'>
        <Flex alignItems='center'>
          <CVText fontWeight='bold' color='blue'>
            ID Devolucion:{' '}
          </CVText>
          <SizeBox />
          <CVText color='blue'>{devolucion?.custom_id}</CVText>
        </Flex>
        <SizeBox />|<SizeBox />
        <Flex alignItems='center'>
          <CVText fontWeight='bold' color='blue'>
            ID Pedido:
          </CVText>
          <SizeBox />
          <CVText color='blue'>{pedido?.custom_id}</CVText>
        </Flex>
      </Flex>
      <CVLine color='gray' lineHeight='2px' height='5px' />
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Box mr={35}>
            {variant == 'buyer' &&
              devolucion?.estado?.request_status == 'APPROVED' && (
                <DDevolverBuyer
                  fetchdata={async () => {
                    await initdata();
                    setReset(true);
                  }}
                  devolucion={devolucion}
                  iddevolucion={iddevolucion}
                  guia_pdf={devolucion?.informacion.guia_pdf}
                  confirm_shipment_product={
                    devolucion?.confirm_shipment_product
                  }
                />
              )}

            {variant == 'seller' &&
              devolucion?.courier_type == 'propio' &&
              devolucion?.estado?.status == 'PENDING' && (
                <>
                  <Box rounded='lg'>
                    <Alert status='warning' rounded='lg'>
                      <AlertIcon />
                      <AlertTitle>
                        Comuníquese con el comprador para el recojo o entrega
                        del pedido a devolver.
                      </AlertTitle>
                    </Alert>
                  </Box>
                  <SizeBox />
                </>
              )}

            {variant == 'seller' &&
              devolucion?.confirm_shipment_product != null && (
                <DDevolver
                  fetchdata={async () => {
                    await initdata();
                    setReset(true);
                  }}
                  iddevolucion={iddevolucion}
                  disputa={disputa}
                  aprobar={aprobar}
                  satisfied_product={devolucion.satisfied_product}
                />
              )}
            {variant == 'seller' && (
              <>
                <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
                  Información de Comprador
                </CVText>
                <SizeBox />
                <DComprador comprador={devolucion?.comprador} />
                <SizeBox />
              </>
            )}
            <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
              Información de solicitud de devolución
            </CVText>
            <SizeBox />
            <DInformacion
              variant={variant}
              errors={errors}
              devolucion={devolucion}
              setdevolucion={setdevolucion}
              method={method}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box ml={35}>
            {devolucion?.estado?.status != undefined &&
              !['', 'X'].includes(devolucion?.estado?.status) && (
                <>
                  <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
                    Estado de la devolución
                  </CVText>
                  <SizeBox />
                  <DEstado
                    devolucion={devolucion}
                    setdevolucion={setdevolucion}
                    iddevolucion={iddevolucion}
                    reset={reset}
                  />
                  <SizeBox />
                </>
              )}

            <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
              Informacion del Pedido
            </CVText>
            <SizeBox />
            <DProducto
              devolucion={devolucion}
              setdevolucion={setdevolucion}
              pedido={pedido}
              title={title}
              // type='buyer'
              type={variant}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SizeBox />
          <SizeBox />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SizeBox />

          <Flex justifyContent='center'>
            {variant == 'seller' && (
              <>
                {devolucion?.estado?.request_status == 'IN_REVIEW' && (
                  <>
                    <CVButton
                      backgroundColor='red'
                      onClick={() => setDisputa(true)}>
                      Rechazar
                    </CVButton>
                    <SizeBox />
                    <CVButton onClick={() => setDevolver(true)}>
                      Aprobar
                    </CVButton>
                    <SizeBox />
                  </>
                )}
                <CVButton
                  backgroundColor='white'
                  border='none'
                  boxShadow='none'
                  color='primary'
                  onClick={() =>
                    title != 'bo'
                      ? history.push('/seller/devoluciones')
                      : onClose()
                  }>
                  Volver a la lista de devoluciones
                </CVButton>
              </>
            )}
            {variant == 'buyer' &&
              (devolucion?.estado?.request_status == undefined ||
                devolucion?.estado?.request_status == '') && (
                <CVButton
                  backgroundColor='red'
                  onClick={() => senddata()}
                  isLoading={loading}
                  disabled={loading || devolucion.custom_id != ''}>
                  Enviar Solicitud
                </CVButton>
              )}
          </Flex>
          <SizeBox />
        </Grid>
      </Grid>

      {isProcess && (
        <DProcesado
          onClose={() => {
            history.push('/buyer/devoluciones');
            setisProcess(!isProcess);
          }}
          isOpen={isProcess}
        />
      )}
    </>
  );
}

export default DFormulario;
