import React from 'react';
import { Link } from 'react-router-dom';

import { svgEdit, svgDelete } from '@/app/assets/images/SVG';
import { Flex, Box } from '@chakra-ui/react';

import InformacionClientesBo from '../informacion/InformacionClientesBo';
import PedidosClientesBo from '../pedidos/PedidosClientesBo';
import TarifasClientesBo from '../tarifas-y-comisiones/TarifasClientesBo';
import FacturasClientesBo from '../facturas/FacturasClientesBo';
import DevolucionesClientesBo from '../devoluciones/DevolucionesClientesBo';
import ProductosClientesBo from '../productos';
import CVSwitch from '@/common/CovendeTemplate/CVSwitch';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import DesempenoClientesBO from '../desempeno/DesempenoClientesBO';
import { CVText } from '@CVTemplate/core/index';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';

export const inputDataProcessed = (data, actions, permissions) => {
  const userName = (item) => {
    let name = '';
    if (item.company !== null) {
      if (item.company.comercial_name !== '-') {
        name = item.company.comercial_name;
      } else {
        name = item.company.social_razon;
      }
    } else {
      name = item.first_name + ' ' + item.last_name;
    }
    return name;
  };

  const typeDocument = (item) => {
    let type = '';
    if (item.company !== null) {
      type = 'RUC';
    } else {
      if (item.dni !== '') type = 'DNI';
    }
    return type;
  };

  const statusPay = (plan) => {
    let status = '-';
    if (plan !== null) {
      switch (plan.payment_status) {
        case 'COMPLETED':
          status = 'Pagado';
          break;
        case 'PENDING':
          status = 'Pendiente';
          break;
        case 'EXPIRED':
          status = 'Expirado';
          break;
        default:
          break;
      }
    }
    return status;
  };

  const setNameAsesor = (asesor) => {
    if (asesor) {
      return (asesor?.first_name || '') + ' ' + (asesor?.last_name || '');
    } else {
      return '-';
    }
  };

  const setCountProducts = (company) => {
    return company ? company.total_products || 0 : '-';
  };

  return data.map((item, index) => ({
    params: item.customer_id,
    orden: (actions.page - 1) * 10 + (index + 1),
    customer: userName(item),
    customer_id: item.custom_id,
    type: item?.role?.name?.slice(0, 1) || '',
    tipodoc: typeDocument(item),
    email: item.email,
    documentIdentity: item.company ? item.company.ruc : item.dni,
    status_paid: statusPay(item.company_plan),
    lastConnectionDate: item?.lastConnectionDate
      ? CVFormatDate({
          date: item?.lastConnectionDate,
          format: 'DD/MM/YYYY',
          time: true
        })
      : '-',
    flagValidated: permissions.editar && (
      <CVSwitch
        value={item.flagValidated}
        variant='withtext'
        onChange={(value) => {
          actions.cflagValidated(item, value);
        }}
      />
    ),
    asesor: setNameAsesor(item?.asesor),
    totalProducts: setCountProducts(item?.company),
    flagActive: permissions.editar && (
      <CVSwitch
        value={!item.flagActive}
        variant='withtext'
        onChange={(value) => {
          actions.cflagactive(item, !value);
        }}
      />
    ),
    actions: (
      <Flex>
        {permissions.editar && (
          <Link
            style={{ margin: 'auto' }}
            // onClick={() => actions.selected(item.customer_id)}
            to={{
              pathname: `/bo/clientes/${item.customer_id}/information`,
              state: { currentPage: actions.page } // Guardar el número de página actual
            }}>
            {svgEdit}
          </Link>
        )}
        <SizeBox />
        {permissions.eliminar && (
          <Box cursor='pointer' onClick={() => actions.cdeleteitem(item)}>
            {svgDelete}
          </Box>
        )}
      </Flex>
    )
  }));
};

// Data columns of Table
export const columnsData = [
  {
    label: 'N°',
    data: 'orden',
    first: true,
    align: 'center'
  },
  {
    label: 'Cliente',
    data: 'customer'
  },
  {
    label: 'ID',
    data: 'customer_id'
  },
  {
    label: 'cliente',
    data: 'type',
    align: 'center'
  },
  {
    label: 'Email',
    data: 'email'
  },
  {
    label: 'Tipo',
    data: 'tipodoc'
  },
  {
    label: 'N° Documento',
    data: 'documentIdentity',
    align: 'center'
  },
  {
    label: 'Suscripción',
    data: 'status_paid'
  },

  {
    label: 'Verificados',
    data: 'flagValidated'
  },
  {
    label: 'Encargado',
    data: 'asesor'
  },
  {
    label: 'Total de productos',
    data: 'totalProducts',
    align: 'center'
  },
  {
    label: 'Fecha de última conexión',
    data: 'lastConnectionDate',
    align: 'center'
  },
  {
    label: 'Bloqueados',
    data: 'flagActive'
  },
  {
    label: 'Acciones',
    data: 'actions',
    last: true
  }
];

export const ClientesBoConfig = [
  {
    name: 'Información',
    id: 'information'
  },
  {
    name: 'Pedidos',
    id: 'pedidos'
  },
  {
    name: 'Tarifas y comisiones',
    id: 'tarifas-y-comisiones'
  },
  {
    name: 'Facturas',
    id: 'facturas'
  },
  {
    name: 'Devoluciones',
    id: 'devoluciones'
  },
  {
    name: 'Productos',
    id: 'productos'
  },
  {
    name: 'Desempeño',
    id: 'desempeno'
  }
];

// export const componentes = {
//   information: <InformacionClientesBo />,
//   pedidos: <PedidosClientesBo />,
//   'tarifas-y-comisiones': <TarifasClientesBo />,
//   facturas: <FacturasClientesBo />,
//   devoluciones: <DevolucionesClientesBo />,
//   productos: <ProductosClientesBo />,
//   desempeno: <DesempenoClientesBO />
// };

export const componentes = {
  information: (args) => <InformacionClientesBo />,
  pedidos: (args) => <PedidosClientesBo />,
  'tarifas-y-comisiones': (args) => <TarifasClientesBo />,
  facturas: (args) => <FacturasClientesBo />,
  devoluciones: (args) => <DevolucionesClientesBo />,
  productos: (args) => <ProductosClientesBo params={args} />,
  desempeno: (args) => <DesempenoClientesBO />
};
