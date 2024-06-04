import { devolucion, facturas, pedido, producto } from './InicioIcons';

export const totalescards = (producs, orders) => {
  return [
    {
      title: 'PRODUCTOS',
      fondo: '#40ADF6',
      border: '1px solid #40ADF6',
      opacity: 0.1,
      icon: producto,
      data: {
        Total: producs[0].total,
        Rechazados: producs[1].total,
        Aprobados: producs[2].total,
        'Por agotar stock': producs[3].total
      }
    },
    {
      title: 'PEDIDOS',
      fondo: '#54BD8E',
      border: '1px solid #54BD8E',
      opacity: 0.1,
      icon: pedido,
      data: {
        Total: orders[0].total,
        Pendientes: orders[1].total,
        Enviados: orders[2].total,
        Completados: orders[3].total
      }
    }
  ];
};
