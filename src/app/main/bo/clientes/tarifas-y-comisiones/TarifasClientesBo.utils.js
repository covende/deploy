import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import { Eye } from '@/app/assets/icons';

const inputDataProcessed = (data, actions) =>
  data.map((item, index) => ({
    index: index + 1,
    feeds_commissions_name: item.feeds_commissions_name,
    feeds_commissions_date: item.feeds_commissions_date,
    feeds_commissions_amount: item.feeds_commissions_amount,
    actions: (
      <Link
        style={{ margin: 'auto' }}
        // onClick={() => actions.selected(item.customer_id)}
        to={{
          pathname: '/bo/clientes/informacion',
          state: { customer: item }
        }}
      >
        {Eye}
      </Link>
    )
  }));

const columnsData = [
  {
    Header: 'N°',
    accessor: 'index'
  },
  {
    Header: 'PLAN',
    accessor: 'feeds_commissions_name'
  },
  {
    Header: 'FECHA DE COMPRA',
    accessor: 'feeds_commissions_date'
  },
  {
    Header: 'PRECIO(S/)',
    accessor: 'feeds_commissions_amount'
  },
  {
    Header: 'ACCIONES',
    accessor: 'actions'
  }
];

/*
const columnas = () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'expander', // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
        ),
        Cell: ({ row }) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`
                }
              })}>
              {row.isExpanded ? '👇' : '👉'}
            </span>
          ) : null
      },
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName'
          }
        ]
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age'
          },
          {
            Header: 'Visits',
            accessor: 'visits'
          },
          {
            Header: 'Status',
            accessor: 'status'
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress'
          }
        ]
      }
    ],
    []
  );

  return columns;
}

const data = [
  {
    firstName: 'motion-cq4n1',
    lastName: 'gold-c44qg',
    age: 5,
    visits: 89,
    progress: 70,
    status: 'relationship',
    subRows: [
      {
        firstName: 'digestion-67zau',
        lastName: 'presence-f0w8w',
        age: 17,
        visits: 89,
        progress: 67,
        status: 'relationship',
        subRows: [
          {
            firstName: 'destruction-xbuvr',
            lastName: 'growth-mrmei',
            age: 2,
            visits: 28,
            progress: 48,
            status: 'complicated'
          }
        ]
      },
      {
        firstName: 'rifle-1kwh3',
        lastName: 'awareness-qmhrt',
        age: 0,
        visits: 32,
        progress: 65,
        status: 'complicated',
        subRows: [
          {
            firstName: 'aftermath-g4ydv',
            lastName: 'mixture-hykkg',
            age: 11,
            visits: 94,
            progress: 70,
            status: 'complicated'
          }
        ]
      }
    ]
  },
  {
    firstName: 'philosophy-068q6',
    lastName: 'sticks-07qdm',
    age: 9,
    visits: 47,
    progress: 6,
    status: 'relationship',
    subRows: [
      {
        firstName: 'hole-eeai8',
        lastName: 'historian-yhikw',
        age: 26,
        visits: 32,
        progress: 97,
        status: 'relationship',
        subRows: [
          {
            firstName: 'stitch-lsuft',
            lastName: 'suggestion-j7r61',
            age: 17,
            visits: 23,
            progress: 99,
            status: 'single'
          },
          {
            firstName: 'world-2wi9s',
            lastName: 'courage-q0fvw',
            age: 20,
            visits: 27,
            progress: 1,
            status: 'relationship'
          }
        ]
      },
      {
        firstName: 'pen-y8060',
        lastName: 'magazine-uxycr',
        age: 6,
        visits: 57,
        progress: 83,
        status: 'single',
        subRows: [
          {
            firstName: 'problem-393nd',
            lastName: 'product-efasy',
            age: 12,
            visits: 13,
            progress: 1,
            status: 'single'
          }
        ]
      }
    ]
  }
];

console.log(JSON.stringify(data));
*/
export default {
  inputDataProcessed,
  columnsData
};

/*
export default {
  columns: columnas,
  data: data
};
*/
