import { COMPANY_DIRECTIONS_BY_COMPANY } from '@/app/api/graphql/webbo/BClientService';
import { send_pedido } from '@/app/api/graphql/webpedido/PedidoService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { all_couriers } from '@/app/api/graphql/webbuy/TableAPIService';
import {
  CVButton,
  CVErrorLabel,
  CVImage,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function PedidoProcesa({ isOpen, onClose, idpedido, idstore }) {
  const addToast = useToast();
  const [couriers, setcouriers] = useState([]);
  const [direction, setdirection] = useState([]);
  const [almacen, setalmacen] = useState('');
  const [envio, setEnvio] = useState('');
  const [procesa, setProcesa] = useState(false);
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [pedido, setpedido] = useState([
    {
      idpedido: idpedido,
      items: '1/1',
      envio: envio,
      idtracking: '8348758475201',
      comprobante: '001 -1'
    }
  ]);

  const senddata = async () => {
    setloading(true);
    const result = await send_pedido({
      companyDirection_id: almacen,
      courier_id: envio,
      pedido_id: idpedido
    });
    setloading(false);
    let pdido = [...pedido];
    pdido[0].envio = envio;
    pdido[0].idpedido = idpedido;
    pdido[0].idtracking = result || '';
    setpedido(pdido);
    result
      ? CVAlertSuccess({ addToast, message: 'Procesado Correctamente' })
      : CVAlertError({ addToast, message: 'Hubieron Errores' });
  };

  const sendProcess = () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    setProcesa(!procesa);
  };

  const onSubmit = () =>
    !errors ? seterrors(true, sendProcess) : sendProcess();

  const ModoEnvio = () => (
    <Box>
      <Box border='1px solid #CDCCCC' padding='1rem'>
        <SizeBox />
        <CVSelect
          title='Lugar de recojo'
          titleOrientation='column'
          value={almacen}
          height='auto'
          onChange={(value) => setalmacen(value)}
          options={[
            ...direction.map((item) => ({
              value: item._id,
              text: (
                <Flex flexDirection='column'>
                  <CVText>{item.type_local}</CVText>
                  <CVText>{item.phone}</CVText>
                  <CVText>{item.street_fiscal}</CVText>
                </Flex>
              )
            }))
          ]}
        />
        {errors && almacen == '' && (
          <CVErrorLabel errorMessage='Seleccione un lugar de recojo del paquete' />
        )}
        <SizeBox />
        <CVRadio
          value={envio}
          options={[
            ...couriers.map((item) => ({
              value: item._id,
              text: (
                <Box>
                  <CVImage image={item.image} height='50px' width='auto' />
                </Box>
              )
            }))
          ]}
          onChange={(value) => setEnvio(value)}
        />
        {errors && envio == '' && (
          <CVErrorLabel errorMessage='Seleccione un operador logìstico' />
        )}
        <SizeBox />
      </Box>
      <br />
      <Flex justifyContent='end'>
        <CVButton onClick={() => onSubmit()}>Continuar</CVButton>
        <SizeBox />
        <CVButton onClick={() => onClose()} variant='outlined'>
          Cancelar
        </CVButton>
      </Flex>
      <SizeBox />
    </Box>
  );
  const Terminar = () => (
    <Box>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#FF545450', color: '#FFFFFF' }}>
            <TableCell>ID de Pedido</TableCell>
            <TableCell>Items </TableCell>
            <TableCell>envío</TableCell>
            <TableCell>ID tracking</TableCell>
            <TableCell>Nº Comprobante</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedido.map((it) => (
            <TableRow key={v4()}>
              <TableCell>{it.idpedido}</TableCell>
              <TableCell>{it.items}</TableCell>
              <TableCell>{it.envio}</TableCell>
              <TableCell>{it.idtracking}</TableCell>
              <TableCell>{it.comprobante}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <Flex justifyContent='space-around' wrap='wrap' flexDirection='column'>
        <Flex justifyContent='center'>
          <CVButton
            onClick={() => senddata()}
            isLoading={loading}
            disabled={loading}>
            Enviar
          </CVButton>
        </Flex>
        <SizeBox />
        <Flex justifyContent='space-around'>
          <CVButton onClick={() => onClose()} variant='outlined'>
            Cancelar
          </CVButton>
          <CVButton onClick={() => onClose()} variant='outlined'>
            Todos los documentos
          </CVButton>
          <CVButton onClick={() => {}} variant='outlined'>
            Orden de compra
          </CVButton>
        </Flex>
      </Flex>
      <SizeBox />
    </Box>
  );

  const initdata = async () => {
    let store_id = await idstore();
    let result = await all_couriers();
    let { companyDirectionsByID } = await AxiosGQL(
      COMPANY_DIRECTIONS_BY_COMPANY(store_id)
    );

    setcouriers(result);
    setdirection(companyDirectionsByID);
    setProcesa(!procesa);
  };

  useEffect(() => {
    initdata();
  }, [idpedido]);

  return (
    <Modal onClose={onClose} size='3xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ color: '#004772' }}>
          <CVText fontSize='2rem' fontWeight='bold'>
            Envío del Pedido
          </CVText>
          <CVText>Selecciona el proveedor de entrega </CVText>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#004772' }} />
        <ModalBody>{!procesa ? <ModoEnvio /> : <Terminar />}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PedidoProcesa;
