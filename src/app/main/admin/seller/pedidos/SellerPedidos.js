import React, { useState } from 'react';

import {
  Flex,
  Text,
  useDisclosure,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react/';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { IconState } from './icons/stateIcons';
import CVPanel from '@CVTemplate/core/CVPanel';
import PendingActiveStore from '../PendingActiveStore';
import TableData from './compenents/TableData';
import Totales from './compenents/Totales';
import { useLocation } from 'react-router-dom';

const estados = [
  {
    bg: '#F7B844',
    icon: 'IconConfirm',
    children:
      'El pedido ha sido pagado por el comprador y está a la espera de ser atendido por la tienda.',
    title: 'Confirmado'
  },
  {
    bg: '#FF5454',
    icon: 'IconProcesed',
    children:
      'El pedido ha sido procesado por la tienda, es decir está listo para el recojo del courier.',
    title: 'Procesado'
  },
  {
    bg: '#17BF93',
    icon: 'IconSend',
    children:
      'El pedido ha sido recogido por el courier y está en camino a ser entregado al comprador.',
    title: 'En camino'
  },
  {
    bg: '#ABABAB',
    icon: 'IconDelivered',
    children: 'El pedido ha sido entregado al comprador.',
    title: 'Entregado'
  }
];

const Estado = ({ bg, children, title, icon }) => (
  <Box w='12.2rem' pt='1rem'>
    <Text
      fontSize='16px'
      fontWeight={500}
      bg={bg}
      borderRadius='0.6rem'
      color='white'
      textAlign='center'>
      {title}
    </Text>
    <Flex justify='center' my='1.8rem'>
      <IconState type={icon} bg={bg} />
    </Flex>
    <Text textAlign='center' color='#4D4D4D' fontWeight='300' fontSize='16px'>
      {children}
    </Text>
  </Box>
);

function SellerPedidos({ store_id }) {
  const { store_status } = useSelector((state) => state.ProductView);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const [filtro, setFiltro] = useState({
    search: searchParams.get('search') || '',
    startdate: new Date(),
    enddate: new Date(),
    estado: 'ALL',
    totalFil: false
  });

  return store_status == 'APPROVED' || store_id ? (
    <Container>
      <Flex w='100%' justify='end' py='2rem'>
        <Text
          transition='color 0.5s ease'
          textDecoration='underline'
          color='#004772'
          cursor='pointer'
          onClick={onOpen}
          _hover={{ color: '#40ADF6' }}>
          ¿Qué indica cada estado del pedido?
        </Text>
      </Flex>

      <CVPanel variant='box' height='100%'>
        <Totales
          setEstado={(value) =>
            setFiltro({ ...filtro, estado: value, totalFil: !filtro.totalFil })
          }
          store_id={store_id}
        />
        <SizeBox />
        <TableData filtro={filtro} setFiltro={setFiltro} store_id={store_id} />
      </CVPanel>

      <Modal {...{ isOpen, onClose }} isCentered rounded='1rem'>
        <ModalOverlay />
        <ModalContent rounded='1rem' maxW='none' w='60rem'>
          <ModalHeader
            justifyContent='start'
            borderRadius='1rem 1rem 0 0'
            backgroundColor={COLORS['skyblue']}
            color={COLORS['white']}
            fontSize='20px'>
            ¿Qué indica cada estado?
          </ModalHeader>
          <ModalCloseButton rounded='50%' color={COLORS['white']} />
          <ModalBody>
            <Flex justify='space-between' pb='3rem'>
              {estados.map(({ bg, title, icon, children }) => (
                <Estado key={v4()} {...{ bg, title, icon }}>
                  {children}
                </Estado>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  ) : (
    <PendingActiveStore />
  );
}

export default SellerPedidos;
