import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillMinusCircle } from 'react-icons/ai';
import { GoAlert } from 'react-icons/go';
import { COLORS } from '@CVTemplate/core/CVThemes';

const desempeno = {
  card: {
    value: '98%',
    optimo: '> 98%',
    title: 'Desempeño de Vendedor',
    color: 'red',
    icon: <GoAlert style={{ fontSize: '3rem', color: COLORS['red'] }} />
  },
  based: [
    {
      title: '% Cancelacion',
      value: '5%',
      count: '5',
      from: '100',
      item: 'pedidos'
    },
    {
      title: '% Demora en Envio',
      value: '2%',
      count: '2',
      from: '100',
      item: 'pedidos'
    },
    {
      title: '% Devoluciones',
      value: '4%',
      count: '4',
      from: '100',
      item: 'pedidos'
    }
  ]
};

const satisfaccion = {
  card: {
    value: '89%',
    optimo: '> 89%',
    title: 'Satisfación del Comprador',
    color: 'green',
    icon: <FaCheckCircle style={{ fontSize: '3rem', color: COLORS['green'] }} />
  },
  based: [
    {
      title: '% Calificación negativa',
      value: '2%',
      count: '5',
      from: '100',
      item: 'calificaciones'
    },
    {
      title: '% Disputas perdidas',
      value: '1%',
      count: '2',
      from: '100',
      item: 'disputas'
    },
    {
      title: 'Tiempo promedio de resolución (% de efectividad)',
      value: '71%',
      count: '4',
      from: '100',
      item: 'òptimos`'
    }
  ]
};
const evaluacion = {
  card: {
    value: '97%',
    optimo: '> 97%',
    title: 'Evaluación de Producto',
    color: 'yellow',
    icon: (
      <AiFillMinusCircle
        style={{ fontSize: '3rem', color: COLORS['yellow'] }}
      />
    )
  },
  based: [
    {
      title: '% productos prohibidos',
      value: '5%',
      count: '5',
      from: '20',
      item: 'productos'
    },
    {
      title: '% productos  con información cuestionable',
      value: '5%',
      count: '5',
      from: '20',
      item: 'productos'
    }
  ]
};

export const qualitation = {
  desempeno,
  satisfaccion,
  evaluacion
};

export const desempenostore = {
  title: 'Calificación covende',
  values: ['94%', '80%', '90%', '90%']
};
export const desempenometrica = [
  {
    title: 'Desempeño del Vendedor',
    data: [
      { title: '% Cancelación', values: ['12%', '', '', ''] },
      { title: '% Demora de envío', values: ['12%', '', '', ''] },
      { title: '% Devoluciones', values: ['12%', '', '', ''] }
    ]
  },
  {
    title: 'Satisfación del Comprador',
    data: [
      { title: '% Calificación negativa', values: ['12%', '', '', ''] },
      { title: '% Disputas perdidas', values: ['12%', '', '', ''] },
      {
        title: '% Tiempo promedio de resolución (% de efectividad)',
        values: ['12%', '', '', '']
      }
    ]
  },
  {
    title: 'Evaluación del producto',
    data: [
      { title: '% Productos prohibidos', values: ['12%', '', '', ''] },
      {
        title: '% Productos con información cuestionable',
        values: ['12%', '', '', '']
      }
    ]
  }
];
