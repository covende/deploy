import { CVButton } from '@/common/CovendeTemplate';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import PedidoGenera from '@CVPages/core/admin/seller/pedidos/modales/PedidoGenera';
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function PedidoProcesa({ isOpen, onClose, idpedido, setgenera }) {
  const modos = ['OLVA', 'URBANO', 'PROPIA FLOTA'];
  const [envio, setEnvio] = useState('OLVA');
  const [procesa, setProcesa] = useState(false);
  const data = [
    {
      idpedido: idpedido,
      items: '1/1',
      envio: envio,
      idtracking: '8348758475201',
      comprobante: '001 -1'
    }
  ];

  const senddata = () => {};
  const ModoEnvio = () => (
    <Box>
      <Box border='1px solid #CDCCCC' padding='1rem'>
        <br />
        <RadioGroup
          aria-label='envio'
          name='envio'
          value={envio}
          onChange={(e) => setEnvio(e.target.value)}>
          <Grid container spacing={2}>
            {modos.map((it) => (
              <Grid key={v4()} item xs={12} sm={12} md={4}>
                <FormControlLabel value={it} control={<Radio />} label={it} />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <br />
      <Flex justifyContent='end'>
        <CVButton onClick={() => setProcesa(!procesa)}>Continuar</CVButton>
        <CVButton onClick={() => onClose()} variant='outlined'>
          Cancelar
        </CVButton>
      </Flex>
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
          {data.map((it) => (
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
      <Flex justifyContent='space-around' wrap='wrap'>
        <CVButton onClick={() => onClose()}>Todos los documentos</CVButton>
        <CVButton onClick={() => {}}>Orden de compra</CVButton>
        <CVButton onClick={() => setgenera(true)}>Enviar</CVButton>
        <CVButton onClick={() => onClose()} variant='outlined'>
          Cancelar
        </CVButton>
      </Flex>
    </Box>
  );

  useEffect(() => {
    setProcesa(!procesa);
  }, [idpedido]);

  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ color: '#004772' }}>
          <Text fontSize='2rem' fontWeight='bold'>
            Envío del Pedido
          </Text>
          <Text>Selecciona el proveedor de entrega </Text>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#004772' }} />
        <ModalBody>{!procesa ? <ModoEnvio /> : <Terminar />}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PedidoProcesa;
