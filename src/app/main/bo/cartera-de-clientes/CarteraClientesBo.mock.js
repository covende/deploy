import faker from 'faker/locale/es';

const fakeUsers = ['Mi tienda SAC', 'Susana Péres Rojas', 'Miguel Flores Ruiz'];
const fakeAdmins = [
  'Ruth Cárdenas Suarez',
  'Asael Ruan Font',
  'Rosa Maria Fonte'
];
const typeReason = [
  'Centro de ayuda',
  'Reporte tienda',
  'Devolución (intervención)'
];
const typeStatus = ['Si', 'No'];
const typeClientPortfolio = ['V', 'C'];

const createClientPortfolio = () => {
  const createdAt = faker.date.between('2020-04-20', '2021-04-21');
  const orderDate = `${createdAt.getDay()}/${createdAt.getMonth()}/${createdAt.getUTCFullYear()}`;

  return {
    client_portfolio_id: `CO ${faker.random.number(392837)}`,
    client_portfolio_customer: fakeUsers[faker.random.number(100) % 3],
    client_portfolio_admin: fakeAdmins[faker.random.number(100) % 3],
    client_portfolio_type: typeClientPortfolio[faker.random.number(100) % 2],
    client_portfolio_reason: typeReason[faker.random.number(100) % 3],
    client_portfolio_date: orderDate,
    client_portfolio_status: typeStatus[faker.random.number(100) % 2]
  };
};

const createClientPortfolios = (numClientPortfolios = 10) =>
  Array.from({ length: numClientPortfolios }, createClientPortfolio);

export const mockClientPortfolios = (numClientPortfolios) =>
  createClientPortfolios(numClientPortfolios);

export const mockClientPortfoliosStats = [
  {
    type: 'Clientes',
    quantity: 10,
    bgColor: 'green'
  },
  {
    type: 'Clientes sin verificar',
    quantity: 5,
    bgColor: 'yellow'
  },
  {
    type: 'Clientes bloqueados',
    quantity: 2,
    bgColor: 'red'
  },
  {
    type: 'Asesores',
    quantity: 3,
    bgColor: 'primary'
  }
];
