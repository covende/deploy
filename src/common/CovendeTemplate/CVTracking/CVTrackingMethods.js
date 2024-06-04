import { CVEstadoPedido } from '../CVEstado/CVEstadoPedido';
import { COLORS } from '../CVThemes';

export const typeStatusValue = {
  PENDING_PAY: {
    step: 0,
    color: 'black'
  },
  PENDING: {
    step: 1,
    color: CVEstadoPedido('PENDING').color
  },
  SENDED: {
    step: 3,
    color: CVEstadoPedido('SENDED').color
  },
  PROCESSED: {
    step: 2,
    color: CVEstadoPedido('PROCESSED').color
  },
  COMPLETED: {
    step: 4,
    color: CVEstadoPedido('COMPLETED').color
  }
};

export const typeStatusValueDev = {
  PENDING: {
    step: 1,
    color: 'yellow'
  },
  PROCESSED: {
    step: 2,
    color: 'red'
  },
  SENDED: {
    step: 3,
    color: 'green'
  },
  COMPLETED: {
    step: 4,
    color: 'blue'
  }
};

export const colorByStatusValue = (stepValue, statusValue, variant) => {
  if (variant == 'devolucion') {
    return typeStatusValueDev[statusValue] != null &&
      typeStatusValueDev[stepValue] != null &&
      typeStatusValueDev[stepValue].step <= typeStatusValueDev[statusValue].step
      ? COLORS[typeStatusValueDev[statusValue].color]
      : COLORS['gray'];
  } else {
    return typeStatusValue[statusValue] != null &&
      typeStatusValue[stepValue] != null &&
      typeStatusValue[stepValue].step <= typeStatusValue[statusValue].step
      ? COLORS[typeStatusValue[statusValue].color]
      : COLORS['gray'];
  }
};

export const defaultTrack = [
  {
    fecha: '',
    hora: '',
    observacion1: '',
    observacion2: '',
    ubicacion: '',
    position: 1,
    active: false,
    estado: 'Pendiente',
    status: 'PENDING',
    code: '',
    messages: {
      buyer:
        'Tu pedido está pendiente. El vendedor está preparando tu pedido para ser enviado.',
      seller: 'Tu pedido está pendiente.',
      back_office: 'message back_office'
    }
  },
  {
    fecha: '',
    hora: '',
    observacion1: '',
    observacion2: '',
    ubicacion: '',
    position: 2,
    active: false,
    estado: 'Procesado',
    status: 'PROCESSED',
    code: '100',
    messages: {
      buyer:
        'Tu pedido está procesado. El courier está en camino para el recojo de tu pedido.',
      seller: 'Tu pedido está procesado.',
      back_office: 'message back_office'
    }
  },
  {
    fecha: '',
    hora: '',
    observacion1: '',
    observacion2: '',
    ubicacion: '',
    position: 3,
    active: false,
    estado: 'Enviado',
    status: 'SENDED',
    code: '101',
    messages: {
      buyer: 'Tu pedido está en camino.',
      seller: 'Tu pedido está en camino.',
      back_office: 'message back_office'
    }
  },
  {
    fecha: '',
    hora: '',
    observacion1: '',
    observacion2: '',
    ubicacion: '',
    position: 4,
    active: false,
    estado: 'Completado',
    status: 'COMPLETED',
    code: '500',
    messages: {
      buyer: 'Tu pedido ha sido entregado. !Gracias!',
      seller: 'Tu pedido ha sido recibido.',
      back_office: 'message back_office'
    }
  }
];
