import { CVText } from '@/common/CovendeTemplate';
import CVActionsDevolucion from '@/common/CovendeTemplate/CVActions/CVActionsDevolucion';
import { CVEstadoDevolucion } from '@/common/CovendeTemplate/CVEstado/CVEstadoDevolucion';
import { Link, useHistory } from 'react-router-dom';
import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { Flex } from '@chakra-ui/react';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import React from 'react';
import { COLORS } from '@CVTemplate/core/CVThemes';

export const headCells = [
  {
    data: 'numero',
    label: 'Nro',
    first: true,
    align: 'center'
  },
  {
    data: 'iddevolucion',
    label: 'ID Devolución',
    align: 'center'
  },
  { data: 'idpedido', label: 'ID Pedido', align: 'center' },
  {
    data: 'nombre',
    label: 'Nombre de Producto',
    align: 'center'
  },
  { data: 'price', label: 'Precio (S/)', align: 'center' },
  {
    data: 'sale_date',
    label: 'Fecha de solicitud',
    align: 'center'
  },
  { data: 'estado', label: 'Estado de la devolución', align: 'center' },
  { data: 'acciones', label: 'Acciones', last: true, align: 'center' }
];

export const rows = ({
  lista = [],
  setIdpedido,
  onOpen,
  aprobar,
  setConfirma,
  rechazar,
  setDisputa,
  setDevolver,
  setIddevolucion,
  permissions
}) => {
  const history = useHistory();
  let data = lista.map((it, index) => {
    const acciones = () => (
      <CVActionsDevolucion
        devolucion_id={it.iddevolucion}
        status={it.status}
        acciones={{
          see: () => {
            setIdpedido(it.idpedido);
            setIddevolucion(it.iddevolucion);
            history.push(
              `${
                '/seller/devoluciones/' +
                toBase64(it.idpedido) +
                '/' +
                toBase64(it.iddevolucion) +
                '/consult'
              }`
            );
            // onOpen();
          },
          process: () => {
            setIddevolucion(it.iddevolucion);
            setDevolver(true);
          }
          // cancel: () => {
          //   setIddevolucion(it.iddevolucion);
          //   setDisputa(true);
          // }
        }}
        permissions={{ ...permissions, eliminar: false }}
      />
    );
    return {
      numero: index + 1,
      idpedido: it.pedido_id,
      iddevolucion: it.devolucion_id,
      nombre: (
        <Flex w='12rem'>
          <CVText
            variant='maxtext'
            lines={2}
            color='blue'
            fontSize='12px'
            fontWeight={600}>
            {it.product_name ?? ''}
          </CVText>
        </Flex>
      ),
      price: CVMoneyFormat({ amount: it.price }),
      sale_date: (
        <Flex flexDirection='column' alignItems='center'>
          <CVText>{it.sale_date}</CVText>
          <CVText
            color={CVEstadoDevolucion(it.request_status).color}
            fontWeight='bold'>
            {CVEstadoDevolucion(it.request_status).text}
          </CVText>
        </Flex>
      ),
      estado: (
        <CVText
          textAlign='center'
          color={CVEstadoDevolucion(it.status).color}
          fontWeight='bold'>
          {CVEstadoDevolucion(it.status).text}
        </CVText>
      ),
      acciones: acciones(),
      params: it.iddevolucion,
      status: 'APPROVED'
    };
  });
  return data;
};
