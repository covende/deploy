import { CVDataTable, CVDownload } from '@/common/CovendeTemplate';
import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '../../productos/redux/ProductUpdate';
import { headCells, rows } from '../DevolucionUtils';
import DAprobar from './DModales/DAprobar';
import { devolucion_by_company_id } from '@/app/api/graphql/webdevolucion/DevService';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import DDisputa from './DModales/DDisputa';
import DevolucionProcesa from './DevolucionProcesa';
import DConfirma from './DModales/DConfirma';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { formatFecha } from '@/common/utils/methods';

function TableData({ store_id, filtro, type, permissions }) {
  const { product } = useSelector((state) => state.ProductView);
  const { onClose, isOpen, onOpen } = useDisclosure();

  const [disputa, setDisputa] = useState(false);
  const [devolver, setDevolver] = useState(false);
  const [confirma, setConfirma] = useState(false);
  const [lista, setlista] = useState([]);

  const [idpedido, setIdpedido] = useState(-1);
  const [iddevolucion, setIddevolucion] = useState(-1);
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);

  const aprobar = (id) => {
    setIddevolucion(id);
    setDevolver(true);
  };
  const rechazar = (id) => {
    setIddevolucion(id);
    setDisputa(true);
  };

  const initdata = async (page = 1, limit = 10) => {
    setloading(true);
    const company_id = store_id || (await tienda(dispatch, product));
    const result = await devolucion_by_company_id({
      company_id,
      page,
      limit,
      status: filtro.estado != '' ? filtro.estado : false,
      desde: filtro.startdate,
      hasta: filtro.enddate,
      search: filtro.search
    });
    const data = result.docs.map((item) => ({
      idpedido: item?.pedido_id,
      pedido_id: item?.pedido?.custom_id,
      iddevolucion: item?._id,
      devolucion_id: item?.custom_id,
      product_name: item?.product?.name,
      sale_date: CVFormatDate({
        date: item?.request_date || item?.pedido?.fecha_compra,
        format: 'DD/MM/YYYY'
      }),
      method_pay: item?.pedido?.medio_pago,
      price: item?.pedido?.total,
      cantidad: item?.pedido?.cantidad,
      status: item?.status,
      request_status: item?.request_status
    }));
    setloading(false);
    setlista(data);
    setpagination({ ...result, docs: [] });
  };

  const dispatch = useDispatch();

  const download = async () => {
    let company_id = store_id || (await tienda(dispatch, product));
    const { devolutionsByCompanyCSV } = await AxiosGQL(`{
       devolutionsByCompanyCSV(company_id:"${company_id}" 
       search: "${filtro.search}"
       status: "${filtro.estado}"
        ${
          formatFecha(filtro.startdate) != formatFecha(filtro.enddate)
            ? `date_range: { desde: "${filtro.startdate}", hasta: "${filtro.enddate}" }`
            : ``
        }
      )}`);
    return JSON.parse(devolutionsByCompanyCSV);
  };

  useEffect(() => {
    initdata();
  }, [store_id, filtro]);
  return (
    <Box>
      {
        (type = !'bo' ? (
          <>
            <CVDataTable
              loading={loading}
              fetchdata={initdata}
              headers={headCells}
              data={rows(
                {
                  lista,
                  setIdpedido,
                  setIddevolucion,
                  onOpen,
                  setDisputa,
                  setConfirma,
                  setDevolver,
                  rechazar
                },
                permissions
              )}
              pagination={pagination}
              Download={() => <CVDownload fetchData={download} />}
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
          </>
        ) : (
          <>
            <CVDataTable
              loading={loading}
              fetchdata={initdata}
              headers={headCells}
              data={rows(
                {
                  lista,
                  setIdpedido,
                  setIddevolucion,
                  onOpen,
                  aprobar,
                  rechazar,
                  permissions
                },
                permissions
              )}
              pagination={pagination}
              Download={() => <CVDownload fetchData={download} />}
            />
            {/* <DevolucionProcesa
        onClose={onClose}
        isOpen={isOpen}
        idpedido={idpedido}
        iddevolucion={iddevolucion}
        fetchdata={async () =>
          await initdata(pagination?.page, pagination?.limit)
        }
        aprobar={() => {
          setDevolver(true);
        }}
        disputa={() => setDisputa(true)}
      /> */}
            <DConfirma
              fetchdata={async () =>
                await initdata(pagination?.page, pagination?.limit)
              }
              isOpen={confirma}
              onClose={() => setConfirma(false)}
              iddevolucion={iddevolucion}
            />
            <DAprobar
              fetchdata={async () =>
                await initdata(pagination?.page, pagination?.limit)
              }
              isOpen={devolver}
              onClose={() => setDevolver(false)}
              iddevolucion={iddevolucion}
            />
            <DDisputa
              isOpen={disputa}
              onClose={() => setDisputa(false)}
              iddevolucion={iddevolucion}
            />
          </>
        ))
      }
    </Box>
  );
}

export default TableData;
