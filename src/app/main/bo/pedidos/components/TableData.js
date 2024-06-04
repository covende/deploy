import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { headCells, rows } from '../PedidosBo.utils';
import { useDisclosure } from '@chakra-ui/react';
// import PedidoProcesa from './PedidoProcesa';
import { formatFecha, formatpaginate } from '@/common/utils/methods';
import { pedidos_pagination } from '@/app/api/graphql/webadmin/PedidoService';
import Filtros from './Filtros';
import PedidoDetails from '@/app/components/OrderDetails/PedidoDetails';
import { CVDataTable } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVAlertConfirm } from '@/common/CovendeTemplate/CVAlert';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import PedidoGenera from '@CVPages/core/admin/seller/pedidos/modales/PedidoGenera';
import PedidoFinaliza from '@CVPages/core/admin/seller/pedidos/modales/PedidoFinaliza';
import PedidoProcesa from '@CVPages/core/admin/seller/pedidos/modales/PedidoProcesa';
import PedidoConfirm from '@CVPages/core/admin/seller/pedidos/modales/PedidoConfirm';
import PedidoCancelBo from './PedidoCancelBo';
import PedidoExcessShippingBo from './PedidoExcessShipping';

function TableData({ filtro, setFiltro, type = 'Vender', initFilter }) {
  const [paginate, setPaginate] = useState({});
  const [genera, setgenera] = useState(false);
  const [procesa, setprocesa] = useState(false);
  const [confirma, setconfirma] = useState(false);
  const [finaliza, setfinaliza] = useState(false);
  const [basepath, setbasepath] = useState('');
  const [loading, setloading] = useState(true);
  const [lista, setlista] = useState([]);
  const permisions = useGetPermisions('Backoffice', 'Pedidos');

  const [cancel, setcancel] = useState(false);
  const [excessShipping, setExcessShipping] = useState(false);
  const [idpedido, setIdpedido] = useState(-1);
  const [pedido, setpedido] = useState({ company_id: '' });

  const ExpandData = ({ params, item }) => (
    <PedidoDetails
      permisions={permisions}
      id={params}
      item={item}
      cancelapedido={cancelapedido}
      addExcessShipping={addExcessShipping}
    />
  );

  const deleting = async (idpedido) => {
    console.log({ idpedido });
  };

  const addExcessShipping = (pedido_id) => {
    setExcessShipping(true);
    setpedido(lista.find((item) => item.pedido_id == pedido_id));
    setIdpedido(pedido_id);
  };

  const cancelapedido = async (idpedido) => {
    setcancel(true);
    setIdpedido(idpedido);
    // CVAlertConfirm({
    //   title: 'Cancelar Pedido',
    //   message: 'Esta seguro con Cancelar este Pedido?',
    //   okLabel: 'Regresar a los Pedidos',
    //   okAction: () => {},
    //   noLabel: 'Cancelar Ahora',
    //   noAction: () => deleting(idpedido)
    // });
  };

  const initdata = async (page = 1, limit = 10) => {
    setloading(true);
    setbasepath(process.env.API_URL);
    const { info, pedidos } = await pedidos_pagination({
      page,
      itemsPage: limit,
      pedido_status: filtro?.estado || '',
      product_name: filtro?.search || '',
      start_date: filtro?.startdate || '',
      end_date: filtro?.enddate || '',
      buy_type: filtro?.buytype || ''
    });
    setPaginate(formatpaginate(info));
    if (pedidos) setlista(pedidos);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, []);
  return (
    <Box>
      <Filtros {...{ initFilter, filtro, setFiltro }} fetchdata={initdata} />
      <SizeBox />
      <CVDataTable
        ExpandData={ExpandData}
        loading={loading}
        pagination={paginate}
        fetchdata={initdata}
        headers={headCells}
        data={rows({
          lista,
          acciones: {
            setIdpedido,
            setpedido,
            onOpen: () => setconfirma(!confirma),
            cancelapedido
          },
          permisions
        })}
      />
      {/* <PedidoProcesa
        onClose={onClose}
        isOpen={isOpen}
        idpedido={idpedido}
        lista={lista}
        initdata={initdata}
        paginate={paginate}
        basepath={basepath}
        setgenera={setgenera}
      /> */}

      {/*  */}

      {confirma && (
        <PedidoConfirm
          isOpen={confirma}
          onClose={() => setconfirma(!confirma)}
          process={(value) => {
            value == 'si' ? setgenera(true) : setprepara(true);
            setconfirma(!confirma);
          }}
        />
      )}
      {genera && lista && (
        <PedidoGenera
          pedido={lista.find((item) => item.pedido_id == idpedido)}
          store_id={lista.find((item) => item.pedido_id == idpedido).company_id}
          isOpen={genera}
          onClose={() => setgenera(!genera)}
          process={async (guide) => {
            // console.log({ guide });
            // setlista([
            //   ...lista.map((item) => {
            //     if (item.pedido_id == idpedido) {
            //       item.guide_number == guide;
            //     }
            //     return item;
            //   })
            // ]);
            await initdata(paginate?.page, paginate?.limit);
            setgenera(!genera);
            setprocesa(true);
          }}
        />
      )}

      {procesa && (
        <PedidoProcesa
          basepath={basepath}
          pedido={lista.find((item) => item.pedido_id == idpedido)}
          isOpen={procesa}
          onClose={() => setprocesa(!procesa)}
          process={async (tracking) => {
            // console.log({ tracking });
            // setlista([
            //   ...lista.map((item) => {
            //     if (item.pedido_id == idpedido) {
            //       item.tracking == tracking;
            //     }
            //     return item;
            //   })
            // ]);
            await initdata(paginate?.page, paginate?.limit);
            setprocesa(!procesa);
            setfinaliza(true);
          }}
        />
      )}

      {finaliza && (
        <PedidoFinaliza
          pedido={lista.find((item) => item.pedido_id == idpedido)}
          isOpen={finaliza}
          onClose={() => setfinaliza(!finaliza)}
          process={() => setfinaliza(!finaliza)}
        />
      )}

      {excessShipping && (
        <PedidoExcessShippingBo
          isOpen={excessShipping}
          onClose={() => setExcessShipping(!excessShipping)}
          pedido={pedido}
          success={() => {
            setpedido({ company_id: '' });
            setIdpedido('');
            initdata();
          }}
        />
      )}

      {cancel && (
        <PedidoCancelBo
          {...{
            idpedido,
            company_id: pedido?.company_id,
            setsuccess: (value) => {
              setlista(
                lista.map((item) => ({
                  ...item,
                  ...(item?.pedido_id == idpedido && {
                    status: 'CANCELLED',
                    permit_cancelled: false
                  })
                }))
              );
              setcancel(!value);
            }
          }}
          isOpen={cancel}
          onClose={() => setcancel(!cancel)}
          process={() => deleting()}
        />
      )}
    </Box>
  );
}

export default TableData;
