import React from 'react';
import imgPENDING from '@/app/assets/img/pendiente.svg';
import imgAPPROVED from '@/app/assets/img/aprovado.svg';
import imgENVIADO from '@/app/assets/img/enviado.svg';
import imgANNULLED from '@/app/assets/img/anulado.svg';
import imgCOMPLETADO from '@/app/assets/img/complete.svg';
import { CVImage, CVText } from '..';
import { CVDateDifference } from '@/common/CovendeTemplate/CVMethods';

export const CVEstadoPedidoStatus = {
  ALL: {
    value: 'ALL',
    text: 'Todos',
    color: 'primary',
    icon: ''
  },
  PENDING_PAY: {
    value: 'PENDING_PAY',
    text: 'Por Pagar',
    color: 'mediumGray',
    icon: <CVImage image={imgANNULLED} />
  },
  EXPIRED: {
    value: 'EXPIRED',
    text: 'Expirado',
    color: 'lightGray',
    icon: <CVImage image={imgANNULLED} />
  },
  ANNULLED: {
    value: 'ANNULLED',
    text: 'Anulado',
    color: 'black',
    icon: <CVText color='black'>---------</CVText>
  },
  PENDING: {
    value: 'PENDING',
    text: 'Confirmado',
    color: 'yellow',
    icon: <CVImage image={imgPENDING} />
  },
  PROCESSED: {
    value: 'PROCESSED',
    text: 'Procesado',
    color: 'red',
    icon: <CVImage image={imgAPPROVED} />
  },
  SENDED: {
    value: 'SENDED',
    text: 'Enviado',
    color: 'green',
    icon: <CVImage image={imgENVIADO} />
  },
  COMPLETED: {
    value: 'COMPLETED',
    text: 'Completado',
    color: 'blue',
    icon: <CVImage image={imgCOMPLETADO} />
  },
  CANCELLED: {
    value: 'CANCELLED',
    text: 'Cancelado',
    color: 'black',
    icon: <CVImage image={imgANNULLED} />
  },
  RETURNED: {
    value: 'RETURNED',
    text: 'Devuelto',
    color: 'boldGray',
    icon: <CVImage image={imgANNULLED} />
  }
};

export const CVEstadoPedido = (status = 'PENDING_PAY') =>
  CVEstadoPedidoStatus[status || 'PENDING_PAY'];

export const CVEPDisableCancelBuyer = (status, date, payment_status) => {
  let dayspast = CVDateDifference({ pastDate: date }).days;
  let disabledates = [
    'PENDING',
    'SENDED',
    'PROCESSED',
    'RETURNED',
    'CANCELLED',
    'COMPLETED',
    'ANNULLED'
  ].includes(status);

  if (payment_status == 'PENDING') return false;
  if (payment_status == 'COMPLETED') return true;
  if (dayspast > 3 && disabledates && payment_status == 'COMPLETED')
    return true;
  if (dayspast <= 3 && disabledates && payment_status == 'PENDING')
    return false;
};
export const CVEPDisableDevolucionBuyer = (status, date, payment_status) => {
  let daypast = CVDateDifference({ pastDate: date }).days;
  let disabledates = [
    'PENDING_PAY',
    'PENDING',
    'SENDED',
    'RETURNED',
    'CANCELLED',
    'ANNULLED'
  ].includes(status);

  if (payment_status == 'PENDING') return true;
  if (daypast > 7 && (disabledates || payment_status == 'COMPLETED'))
    return true;
  if (daypast <= 7 && (disabledates || payment_status == 'COMPLETED'))
    return false;
};

export const CVEPDisableProcess = (status) => {
  return status != 'PENDING';
};

export const CVEPDisableCancel = (status) => {
  return ['RETURNED', 'CANCELLED', 'COMPLETED', 'ANNULLED'].includes(status);
};
