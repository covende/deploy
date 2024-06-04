import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@material-ui/core';
import { useDisclosure } from '@chakra-ui/react/';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import { MdDeleteSweep } from 'react-icons/md';

import {
  ADD_PEDIDOS_CANCELED_SELLER,
  deletePedidosSeller
} from '@CVApi/core/webadmin/types/PedidoType';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { CVDataTable, CVButton } from '@/common/CovendeTemplate';
import { CVDownload } from '@CVTemplate/core/index';
import { formatFecha, formatpaginate } from '@/common/utils/methods';
import { headCells, rows } from '../PedidoUtils';
import { pedidos_paginacion_seller } from '@/app/api/graphql/webadmin/PedidoService';
import { tienda } from '../../productos/redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import Filtros from './Filtros';
import PedidoCancel from '../modales/PedidoCancel';
import PedidoConfirm from '../modales/PedidoConfirm';
import PedidoDetails from '@/app/components/OrderDetails/PedidoDetails';
import PedidoFinaliza from '../modales/PedidoFinaliza';
import PedidoGenera from '../modales/PedidoGenera';
import PedidoPrepara from '../modales/PedidoPrepara';
import PedidoProcesa from '../modales/PedidoProcesa';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import SuccessCancel from '@CVPages/core/admin/buyer/pedidos/components/modales/SuccessCancel';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import PedidosGenera from '../modales/PedidosGenera';
import PedidosProcesa from '../modales/PedidosProcesa';
import PedidosEnvia from '../modales/PedidosEnvia';
import PedidosEntrega from '../modales/PedidosEntrega';
import PedidosStatusMasivo from '../modales/PedidosStatusMasivo';
import CVDownloadRest from '@CVTemplate/core/CVDownloadRest';

function TableData({ filtro, setFiltro, store_id, buttonref }) {
  const { product, deliveryOwnStatus } = useSelector(
    (state) => state.ProductView
  );

  const { client } = useSelector((state) => state.Clients);

  const permisions = useGetPermisions('Vender', 'Pedidos');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const addToast = useToast();
  const btnref = useRef();
  const [checkAll, setCheckAll] = useState(false);

  const [paginate, setPaginate] = useState({});
  const [loading, setloading] = useState(true);
  const [lista, setlista] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [confirma, setconfirma] = useState(false);
  const [genera, setgenera] = useState(false);
  const [generas, setGeneras] = useState(false);
  const [prepara, setprepara] = useState(false);
  const [procesa, setprocesa] = useState(false);
  const [procesas, setProcesas] = useState(false);
  const [finaliza, setfinaliza] = useState(false);
  const [cancel, setcancel] = useState(false);
  const [basepath, setbasepath] = useState('');
  const [idpedido, setIdpedido] = useState(-1);
  const [pedido, setpedido] = useState(null);
  const [success, setsuccess] = useState(false);
  const [masive, setMasive] = useState('default');
  const [listProcess, setListProcess] = useState([]);
  const [sendBulk, setSendBulk] = useState(false);
  const [deliveredBulk, setDeliveredBulk] = useState(false);

  const [updateStatusBulk, setUpdateStatusBulk] = useState(false);

  const ExpandData = ({ params, item }) => (
    <PedidoDetails
      permisions={permisions}
      id={params}
      item={item}
      cancelapedido={cancelapedido}
    />
  );

  const deleting = async () => {
    const idpedido = localStorage.getItem('boidpedido');
    AxiosGQL(ADD_PEDIDOS_CANCELED_SELLER({ idpedido, companyId }))
      .then((res) => {
        res.addPedidoCanceledSeller?.status === true
          ? CVAlertSuccess({
              addToast,
              message: res.addPedidoCanceledSeller?.message
            })
          : CVAlertError({
              addToast,
              message: res.addPedidoCanceledSeller?.message
            });
        setcancel(false);
      })
      .catch((err) => console.log({ err }));
  };

  const cancelapedido = async (idpedido) => {
    setcancel(true);
    setIdpedido(idpedido);
  };

  const initdata = async (page = 1, limit = 10) => {
    setbasepath(process.env.API_URL);
    setloading(true);
    let company_id = store_id || (await tienda(dispatch, product));
    setCompanyId(company_id);
    const { info, pedidos } = await pedidos_paginacion_seller({
      company_id,
      page,
      itemsPage: limit,
      pedido_status: filtro?.estado,
      product_name: filtro?.search,
      start_date: filtro?.startdate,
      end_date: filtro?.enddate
    });
    const numerationPedido = (pedidos || []).map((order, ndx) => {
      return { ...order, number: ndx + 1 + (page - 1) * 10 };
    });
    setPaginate(formatpaginate(info));
    setlista(numerationPedido);
    setloading(false);
  };

  const download = async () => {
    let company_id = store_id || (await tienda(dispatch, product));
    let start_date = formatFecha(filtro?.startdate),
      end_date = formatFecha(filtro?.enddate);

    let body = {
      company_id: company_id,
      pedido_status: filtro?.estado || '',
      search: filtro?.search || ''
    };

    if (end_date != start_date)
      body.date_range = {
        desde: start_date,
        hasta: end_date
      };

    return { body, url: '/api.orders' };
  };

  const onOpenProcess = async () => {
    btnref?.current?.click();

    let seleccionados = localStorage.getItem('selecteds');
    let unSeleccionados = localStorage.getItem('unSelecteds');
    seleccionados = JSON.parse(seleccionados || []);
    unSeleccionados = JSON.parse(unSeleccionados || []);

    if (checkAll && unSeleccionados.length == paginate?.totalDocs) {
      CVAlertError({
        addToast,
        message: 'Seleccione al menos 1 pedido.'
      });
      setMasive('default');
      return;
    }

    if (!checkAll && seleccionados.length < 1) {
      CVAlertError({
        addToast,
        message: 'Seleccione al menos 1 pedido.'
      });
      setMasive('default');
      return;
    }

    let openMasive = {
      process: () => setconfirma(!confirma),
      send: () => setSendBulk(!sendBulk),
      completed: () => setDeliveredBulk(!deliveredBulk)
    };

    openMasive.hasOwnProperty(masive) && openMasive[masive]();

    seleccionados && localStorage.removeItem('selecteds');
    unSeleccionados && localStorage.removeItem('unSelecteds');
  };

  useEffect(() => {
    initdata(1, 10, filtro);
  }, [filtro.totalFil]);

  useEffect(() => {
    if (masive == 'delete') onOpen();
    else if (['send', 'completed', 'process'].includes(masive)) onOpenProcess();
  }, [masive]);

  const masiveaction = async (data) => {
    btnref?.current?.click();

    let seleccionados = localStorage.getItem('selecteds');
    let unSelect = localStorage.getItem('unSelecteds');
    seleccionados = JSON.parse(seleccionados || []);

    if (!seleccionados || seleccionados.length <= 0) {
      CVAlertError({ addToast, message: 'Selecciona al menos 1 pedido.' });
      return;
    }

    if (companyId && seleccionados) {
      const { deletePedidosBySeller } = await deletePedidosSeller({
        company_id: companyId,
        order_ids: checkAll ? [] : seleccionados,
        no_orders: checkAll ? JSON.parse(unSelect || []) : [],
        pedido_status: filtro.estado == 'ALL' ? '' : filtro.estado,
        search: filtro?.search,
        date_range:
          formatFecha(filtro?.startdate) == formatFecha(filtro.enddate)
            ? {}
            : {
                hasta: formatFecha(filtro.enddate),
                desde: formatFecha(filtro?.startdate)
              }
      });

      const { status, message } = deletePedidosBySeller;

      if (status) {
        CVAlertSuccess({ addToast, message });
        initdata();
      } else {
        CVAlertError({ addToast, message });
      }
    }

    seleccionados && localStorage.removeItem('selecteds');
    unSelect && localStorage.removeItem('unSelecteds');
    if (checkAll) setCheckAll(false);
    else checkAll == null ? setCheckAll(false) : setCheckAll(null);
    setMasive('default');
    onClose();
  };

  return (
    <Box>
      <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
        fetchdata={initdata}
        checkAll={checkAll}
        setCheckAll={setCheckAll}
        masive={masive}
        setMasive={setMasive}
        setUpdateStatusBulk={setUpdateStatusBulk}
        deliveryOwnStatus={
          deliveryOwnStatus || client?.store?.delivery_own_status
        }
      />
      <SizeBox />
      <CVDataTable
        ExpandData={ExpandData}
        loading={loading}
        pagination={paginate}
        fetchdata={initdata}
        selectedComponente={<Box ref={(ref) => (btnref.current = ref)}></Box>}
        selectedAction={(selecteds, unSelecteds) => {
          localStorage.setItem('selecteds', JSON.stringify(selecteds));
          localStorage.setItem('unSelecteds', JSON.stringify(unSelecteds));
        }}
        selectable={true}
        checkAll={checkAll}
        headers={headCells}
        data={rows({
          lista,
          acciones: {
            setIdpedido,
            onOpen: () => setconfirma(!confirma),
            cancelapedido,
            setpedido
          },
          permisions
        })}
        Download={() => (
          <CVDownloadRest fetchData={download} fileName='pedidos' />
        )}
      />
      {confirma && (
        <PedidoConfirm
          isOpen={confirma}
          masive={masive == 'process'}
          onClose={() => {
            setMasive('default');
            setconfirma(!confirma);
          }}
          process={(value) => {
            if (value == 'si') {
              if (masive == 'process') setProcesas(!procesas);
              else setprocesa(true);
            } else setprepara(true);

            setconfirma(!confirma);
          }}
        />
      )}
      {success && (
        <SuccessCancel
          isOpen={success}
          onClose={() => setsuccess(false)}
          pedido={pedido}
        />
      )}
      {/* {genera && (
        <PedidoGenera
          pedido={lista.find((item) => item.pedido_id == idpedido)}
          store_id={store_id}
          isOpen={genera}
          onClose={() => setgenera(!genera)}
          process={async ({ receipt, pedido_id }) => {
            setlista(
              lista.map((order) =>
                order.pedido_id === pedido_id
                  ? { ...order, receipt_url: receipt }
                  : order
              )
            );
            setgenera(!genera);
            setprocesa(true);
          }}
        />
      )} */}
      {/* {generas && (
        <PedidosGenera
          buttonRef={btnref}
          filtro={filtro}
          store_id={store_id}
          isOpen={generas}
          checkAll={checkAll}
          onClose={() => {
            setMasive('default');
            setGeneras(!generas);
          }}
          process={(orders) => {
            setListProcess(orders);
            setGeneras(!generas);
            setProcesas(!procesas);
          }}
        />
      )} */}
      {prepara && (
        <PedidoPrepara
          isOpen={prepara}
          onClose={() => setprepara(!prepara)}
          process={() => setprepara(false)}
        />
      )}
      {procesa && (
        <PedidoProcesa
          pedido={lista.find((item) => item.pedido_id == idpedido)}
          isOpen={procesa}
          onClose={() => setprocesa(!procesa)}
          process={async (order) => {
            setlista(
              lista.map((item) =>
                item.pedido_id == order.pedido_id
                  ? {
                      ...item,
                      status: order.status,
                      tracking: order.tracking,
                      guide_number: order.guide_number
                    }
                  : item
              )
            );
            setprocesa(!procesa);
            setfinaliza(true);
          }}
        />
      )}
      {procesas && (
        <PedidosProcesa
          isOpen={procesas}
          buttonRef={btnref}
          filtro={filtro}
          store_id={store_id}
          checkAll={checkAll}
          onClose={() => {
            setMasive('default');
            setProcesas(false);
          }}
          process={() => {
            setProcesas(false);
            setMasive('default');
            if (checkAll) setCheckAll(false);
            else checkAll == null ? setCheckAll(false) : setCheckAll(null);
          }}
        />
      )}
      {sendBulk && (
        <PedidosEnvia
          isOpen={sendBulk}
          buttonRef={btnref}
          filtro={filtro}
          store_id={store_id}
          checkAll={checkAll}
          onClose={() => {
            setMasive('default');
            setSendBulk(false);
          }}
          process={() => {
            setMasive('default');
            setSendBulk(false);
            if (checkAll) setCheckAll(false);
            else checkAll == null ? setCheckAll(false) : setCheckAll(null);
          }}
        />
      )}

      {deliveredBulk && (
        <PedidosEntrega
          isOpen={deliveredBulk}
          buttonRef={btnref}
          filtro={filtro}
          store_id={store_id}
          checkAll={checkAll}
          onClose={() => {
            setMasive('default');
            setDeliveredBulk(false);
          }}
          process={() => {
            setMasive('default');
            setDeliveredBulk(false);
            if (checkAll) setCheckAll(false);
            else checkAll == null ? setCheckAll(false) : setCheckAll(null);
          }}
        />
      )}

      {updateStatusBulk && (
        <PedidosStatusMasivo
          isOpen={updateStatusBulk}
          store_id={store_id}
          deliveryOwnStatus={
            deliveryOwnStatus || client?.store?.delivery_own_status
          }
          onClose={() => setUpdateStatusBulk(false)}
          process={async () => {
            // setUpdateStatusBulk(false);
            await initdata();
          }}
        />
      )}

      {finaliza && (
        <PedidoFinaliza
          basepath={basepath}
          pedido={lista.find((item) => item.pedido_id == idpedido)}
          isOpen={finaliza}
          onClose={() => setfinaliza(!finaliza)}
          process={() => setfinaliza(!finaliza)}
        />
      )}
      {cancel && (
        <PedidoCancel
          {...{
            idpedido,
            pedido,
            store_id,
            setsuccess: (pedido_id) => {
              setlista(
                lista.map((item) => ({
                  ...item,
                  ...(item.pedido_id == pedido_id
                    ? { status: 'CANCELLED', permit_cancelled: false }
                    : {})
                }))
              );
              setcancel(!cancel);
            }
          }}
          isOpen={cancel}
          onClose={() => setcancel(!cancel)}
          process={() => deleting()}
        />
      )}

      <ModalDelete
        isOpen={isOpen}
        onClose={() => {
          setMasive('default');
          onClose();
        }}
        title='los Pedidos'
        confirm={masiveaction}
        onConfirm={true}
        itemToDelete={true}
      />
    </Box>
  );
}

export default TableData;
