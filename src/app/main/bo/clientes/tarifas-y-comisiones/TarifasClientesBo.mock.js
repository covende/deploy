import faker from 'faker/locale/es';

const createFeedCommission = () => {
  const createdAt = faker.date.between('2020-04-20', '2021-04-21');
  const feedsCommissionsDate = `${createdAt.getDay()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`;
  const feedsCommissionsName = ['Anual', 'Semestral', 'Trimestral', 'Mensual'];

  return {
    order_id: faker.random.alphaNumeric(6),
    feeds_commissions_name: feedsCommissionsName[faker.random.number(100) % 4],
    feeds_commissions_date: feedsCommissionsDate,
    feeds_commissions_amount: faker.commerce.price(2)
  };
};

const createFeedsCommissions = (numFeedsCommissions = 10) =>
  Array.from({ length: numFeedsCommissions }, createFeedCommission);

export const mockFeedsCommissions = (numFeedsCommissions) =>
  createFeedsCommissions(numFeedsCommissions);

export const mockFeedsCommissionsDetails = {
  information: {
    order_id: '09664980',
    order_date: '25 Nov 2020',
    invoice_emit: 'Si',
    customer_document: '65345676',
    payment_method: 'Visa',
    in_charge: 'Encargado'
  },
  product: {
    name: 'Celulares Samsung Metálico HD987i',
    sku: 'CD-837',
    id: '1000312345670',
    quantity: '06',
    price: 'S/ 440.00'
  },
  shipping: {
    tracking_id: '----',
    type: '----',
    address: 'Calle las Magnolías N° 889 - Miraflores',
    collection_date: '----',
    deliver_date: '----',
    confirmation_date: '----'
  },
  buyer: {
    id: '09664980',
    name: 'María Manrique Rojas',
    number_document: '78349232',
    email: 'maria@tienda.com',
    celphone: '65345676',
    address: 'Calle las Magnolías N° 889 - Miraflores'
  },
  price: {
    subtotal: 'S/ 360.80',
    igv: 'S/ 79.20',
    total: 'S/ 440.80'
  },
  status: {
    type: 'Pendiente',
    date: '25 Nov 2020 18:30'
  },
  tracking: {
    code: '129D02',
    code_modified: '129002',
    route_tracking: [
      {
        date: '25 Nov 2020 18:30',
        type: 'Tu pedido está pendiente',
        verified: true
      },
      {
        date: '25 Nov 2020 18:30',
        type: 'Tu pedido está procesado',
        verified: false
      },
      {
        date: '25 Nov 2020 18:30',
        type: 'Tu pedido está en camino',
        verified: false
      },
      {
        date: '25 Nov 2020 18:30',
        type: 'Tu pedido ha sido recibido',
        verified: false
      }
    ]
  },
  invoice: {
    id: '1000312345670',
    trade_name: 'Mi tienda S.A.C.',
    address: 'Av. Rosales 123 - Huancayo'
  }
};
