import React from 'react';

// Components
import { Badge, Box } from '@chakra-ui/react';

const inputDataProcessed = (data) =>
  data.map((item, index) => ({
    index: index + 1,
    client_portfolio_id: item.client_portfolio_id,
    client_portfolio_customer: (
      <CellUser value={item.client_portfolio_customer} />
    ),
    client_portfolio_admin: <CellAdmin value={item.client_portfolio_admin} />,
    client_portfolio_type: item.client_portfolio_type,
    client_portfolio_date: <CellDates value={item.client_portfolio_date} />,
    client_portfolio_verified: (
      <CellStatus value={item.client_portfolio_status} />
    ),
    client_portfolio_active: <CellStatus value={item.client_portfolio_status} />
  }));

const CellUser = ({ value }) => <Box color='#4D4D4D'>{value}</Box>;

const CellAdmin = ({ value }) => (
  <Box color='#4D4D4D' textAlign='center'>
    {value}
  </Box>
);

const CellDates = ({ value }) => (
  <Box
    width='80px'
    textOverflow='initial'
    whiteSpace='normal'
    color='#4D4D4D'
    fontWeight='500'
  >
    {value}
  </Box>
);

const CellStatus = ({ value }) => (
  <Badge
    px='8px'
    py='4px'
    borderRadius='4px'
    color='white'
    bg={value === 'Si' ? '#17BF93' : value === 'No' ? '#FF5454' : 'transparent'}
  >
    {value}
  </Badge>
);

const columnsData = [
  {
    label: 'N°',
    data: 'index',
    first: true,
    align: 'center'
  },
  {
    label: 'ID',
    data: 'client_portfolio_id'
  },
  {
    label: 'Nombre',
    data: 'client_portfolio_customer'
  },
  {
    label: 'Verificado',
    data: 'client_portfolio_verified'
  },
  {
    label: 'Bloqueado',
    data: 'client_portfolio_active'
  },
  {
    label: 'Asesor',
    data: 'client_portfolio_admin'
  },
  {
    label: 'Asignado el',
    data: 'client_portfolio_date',
    last: true
  }
];

export default {
  inputDataProcessed,
  columnsData
};
