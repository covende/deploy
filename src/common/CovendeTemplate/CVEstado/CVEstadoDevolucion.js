import React from 'react';
import { CVImage, CVText } from '..';
import imgPENDING from '@/app/assets/img/pendiente.svg';
import imgAPPROVED from '@/app/assets/img/aprovado.svg';
import imgENVIADO from '@/app/assets/img/enviado.svg';
import imgANNULLED from '@/app/assets/img/anulado.svg';
import imgCOMPLETADO from '@/app/assets/img/complete.svg';

export const CVEstadoDevolucionStatus = {
  ALL: {
    value: 'ALL',
    text: 'Todos',
    color: 'primary',
    icon: ''
  },
  X: {
    value: 'X',
    text: '-',
    icon: <CVImage image={imgANNULLED} />,
    color: 'gray'
  },
  IN_REVIEW: {
    value: 'IN_REVIEW',
    text: 'En Revisión',
    icon: <CVImage image={imgANNULLED} />,
    color: 'gray'
  },
  PENDING: {
    value: 'PENDING',
    text: 'Pendiente',
    color: 'yellow',
    icon: <CVImage image={imgPENDING} />
  },
  APPROVED: {
    value: 'APPROVED',
    text: 'Aprobado',
    icon: <CVImage image={imgPENDING} />,
    color: 'primary'
  },
  SENDED: {
    value: 'SENDED',
    text: 'Enviado',
    icon: <CVImage image={imgAPPROVED} />,
    color: 'red'
  },
  RETURNED: {
    value: 'RETURNED',
    text: 'Devuelto',
    icon: <CVImage image={imgENVIADO} />,
    color: 'green'
  },
  COMPLETED: {
    value: 'COMPLETED',
    text: 'Completado',
    icon: <CVImage image={imgCOMPLETADO} />,
    color: 'blue'
  },
  ANNULLED: {
    value: 'ANNULLED',
    text: 'Anulado',
    icon: <CVText color='black'>---------</CVText>,
    color: 'lightGray'
  },
  REJECTED: {
    value: 'REJECTED',
    text: 'Rechazado',
    icon: <CVImage image={imgANNULLED} />,
    color: 'black'
  },
  CANCELLED: {
    value: 'CANCELLED',
    text: 'Cancelado',
    icon: <CVImage image={imgANNULLED} />,
    color: 'black'
  }
};

export const CVEstadoDevolucion = (status = 'IN_REVIEW') =>
  CVEstadoDevolucionStatus[status || 'IN_REVIEW'] ||
  CVEstadoDevolucionStatus['IN_REVIEW'];
export const CVEDevDisableProcess = (status) => {
  return status != 'PENDING';
};

export const CVEDevDisableCancel = (status) => {
  return ['RETURNED', 'CANCELLED', 'COMPLETED', 'ANNULLED'].includes(status);
};
