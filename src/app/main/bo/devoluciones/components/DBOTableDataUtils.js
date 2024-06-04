import { CVText } from '@/common/CovendeTemplate';
import CVActionsDevolucion from '@/common/CovendeTemplate/CVActions/CVActionsDevolucion';
import { CVEstadoDevolucion } from '@/common/CovendeTemplate/CVEstado/CVEstadoDevolucion';
import { estadoTexto } from '@/common/utils';
import React from 'react';

export const dboheadCells = [
  {
    data: 'numero',
    label: 'N°',
    first: true,
    align: 'center'
  },
  {
    data: 'iddevolucion',
    label: 'ID Devolución'
  },
  {
    data: 'buyer',
    label: 'Comprador'
  },
  {
    data: 'seller',
    label: 'Vendedor'
  },
  { data: 'idpedido', label: 'ID Pedido' },
  {
    data: 'sale_date',
    label: 'Fecha de solicitud'
  },
  // Método
  { data: 'method_devolution', label: 'Método' },

  { data: 'estado', label: 'Estado de solicitud' },
  // {
  //   data: 'nombre',
  //   label: 'Nombre de Producto'
  // },
  // { data: 'price', label: 'Precio' },
  { data: 'acciones', label: 'Acciones', last: true, align: 'center' }
];

export const dborows = (
  { lista = [], setIdpedido, onOpen, aprobar, rechazar, setIddevolucion },
  PermisionsDevolucionbo
) => {
  let data = lista.map((it, index) => {
    const acciones = () => (
      <CVActionsDevolucion
        devolucion_id={it.iddevolucion}
        status={it.status}
        acciones={{
          see: () => {
            setIdpedido(it.idpedido);
            setIddevolucion(it.iddevolucion);
            onOpen();
          },
          process: () => aprobar(it.iddevolucion),
          cancel: () => rechazar(it.iddevolucion)
        }}
        permissions={PermisionsDevolucionbo}
      />
    );
    return {
      numero: index + 1,
      idpedido: it.pedido_id,
      seller: it.seller,
      buyer: it.buyer,
      iddevolucion: it.devolucion_id,
      nombre: it.product_name ?? '',
      price: 'S/ ' + it.price,
      sale_date: it.sale_date,
      method_devolution: it.method_devolution,
      estado: (
        <CVText color={CVEstadoDevolucion(it.status).color} fontWeight='bold'>
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

export const dbolista = [
  {
    pedido_id: 'adfasdfasdfasdf',
    devolucion_id: '7897yhyui',
    seller: 'Walksana SAC',
    buyer: 'Carlos Martin Rojas',
    product_name: 'Celulares Samsung Metálico HD987i',
    sale_date: '2021-06-11',
    method_pay: 'VisaNet_WebService',
    price: '44.00',
    cantidad: '01',
    status: 'Procesado'
  }
];
