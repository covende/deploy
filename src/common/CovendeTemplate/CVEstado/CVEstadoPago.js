export const CVEstadoPagoStatus = {
  COMPLETED: {
    value: 'COMPLETED',
    color: 'green',
    text: 'Completado'
  },
  PENDING: {
    color: 'yellow',
    text: 'Pendiente',
    value: 'PENDING'
  },
  EXPIRED: {
    color: 'boldGray',
    text: 'Expirado',
    value: 'EXPIRED'
  }
};

export const CVEstadoPago = (status = 'PENDING') =>
  CVEstadoPagoStatus[status || 'PENDING'];
