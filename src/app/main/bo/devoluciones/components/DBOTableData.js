import DevolucionProcesa from '@/app/main/admin/seller/devoluciones/components/DevolucionProcesa';
import DAprobar from '@/app/main/admin/seller/devoluciones/components/DModales/DAprobar';
import DDisputa from '@/app/main/admin/seller/devoluciones/components/DModales/DDisputa';
import DConfirma from '@/app/main/admin/seller/devoluciones/components/DModales/DConfirma';

import { CVDataTable, CVDownload } from '@/common/CovendeTemplate';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { dboheadCells, dborows } from './DBOTableDataUtils';
import { devolucions } from '@/app/api/graphql/webdevolucion/DevService';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import useGetPermisions from '@/common/hooks/useGetPermisions';

function DBOTableData({ filtro, title }) {
  const { onClose, isOpen, onOpen } = useDisclosure();

  const PermisionsDevolucionbo = useGetPermisions('Backoffice', 'Devoluciones');

  const [confirma, setConfirma] = useState(false);
  const [devolver, setDevolver] = useState(false);
  const [disputa, setDisputa] = useState(false);

  const [idpedido, setIdpedido] = useState(-1);
  const [iddevolucion, setIddevolucion] = useState(-1);
  const [pagination, setpagination] = useState({});
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);

  const aprobar = (id) => {
    // setIdpedido(id);
    // setConfirma(true);
    setIddevolucion(id);
    setDevolver(true);
  };
  const rechazar = (id) => {
    setIddevolucion(id);
    setDisputa(true);
  };

  const initdata = async (page = 1, limit = 10) => {
    setloading(true);

    let filter = { page, limit, status: false, search: filtro.search };

    if (!!filtro.date_range?.hasta && !!filtro.date_range?.desde) {
      filter.desde = filtro.date_range.desde;
      filter.hasta = filtro.date_range.hasta;
    }

    const result = await devolucions(filter);

    const dlista = result.docs.map((item) => ({
      idpedido: item?.pedido_id,
      pedido_id: item?.pedido?.custom_id,
      iddevolucion: item?._id,
      devolucion_id: item?.custom_id,
      seller: item?.company?.comercial_name,
      buyer: item?.buyer?.first_name + ' ' + item?.buyer?.last_name,
      product_name: item?.product?.name,
      sale_date: CVFormatDate({
        date: item?.pedido?.fecha_compra,
        format: 'DD/MM/YYYY'
      }),
      method_pay: item?.pedido?.medio_pago,
      price: item?.pedido?.total,
      cantidad: item?.pedido?.cantidad,
      status: item?.status,
      method_devolution: item.method?.title || '-'
    }));
    setloading(false);
    setlista(dlista);
    setpagination({ ...result, docs: [] });
  };

  useEffect(() => {
    initdata();
  }, [filtro?.active]);

  return (
    <Box width='100%'>
      <CVDataTable
        loading={loading}
        fetchdata={initdata}
        headers={dboheadCells}
        data={dborows(
          {
            lista,
            setIdpedido,
            setIddevolucion,
            onOpen,
            aprobar,
            rechazar
          },
          PermisionsDevolucionbo
        )}
        pagination={pagination}
        Download={() => <CVDownload />}
      />

      <DevolucionProcesa
        onClose={onClose}
        isOpen={isOpen}
        idpedido={idpedido}
        iddevolucion={iddevolucion}
        aprobar={() => setDevolver(true)}
        disputa={() => setDisputa(true)}
        title={title}
      />
      <DConfirma
        isOpen={confirma}
        onClose={() => setConfirma(false)}
        iddevolucion={iddevolucion}
      />
      <DAprobar
        isOpen={devolver}
        onClose={() => setDevolver(false)}
        iddevolucion={iddevolucion}
      />
      <DDisputa
        isOpen={disputa}
        onClose={() => setDisputa(false)}
        iddevolucion={iddevolucion}
      />
    </Box>
  );
}

export default DBOTableData;
