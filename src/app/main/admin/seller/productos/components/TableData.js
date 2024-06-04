import AxiosGQL from '@/app/api/rest/AxiosGQL';
import React, { useEffect, useState } from 'react';
import { headCells, rows } from '../ProductsUtils';
import { SET_ATTRIBUTE } from '@/app/api/graphql/webseller/AttributeService';
import { PRODUCT_LIST } from '@/app/api/graphql/webseller/ProductService';
import { tienda } from '../redux/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { formatpaginate } from '@/common/utils/methods';
import {
  CVButton,
  CVDataTable,
  CVDownload,
  CVModal,
  CVText
} from '@/common/CovendeTemplate';
import { delete_products } from '@/app/api/graphql/webbo/BProductoMethods';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useToast } from '@chakra-ui/toast';
import { Flex, useDisclosure, Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  ACTIVE_PRODUCTS,
  ADD_START_PRODUCT,
  DUPLICATE_PRODUCT
} from '@CVApi/core/webbo/BProductoService';

function TableData({
  search,
  cat,
  store_id,
  product_state = '',
  setreference,
  checkAll
}) {
  const [lista, setlista] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [loadings, setLoadings] = useState(true);
  const [confirm, setconfirm] = useState(false);
  const [send, setsend] = useState(false);
  const [datas, setdatas] = useState({});
  const [product_id, setProduct_id] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [removed, setremoved] = useState(false);
  const { isDelete } = useSelector((state) => state.ProductView);

  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const addToast = useToast();

  const initdata = async (page = 1, limit = 10) => {
    setLoadings(true);
    let company_id = store_id || (await tienda(dispatch, product));
    const { productListByStore } = await AxiosGQL(
      PRODUCT_LIST({
        store_id: company_id,
        page,
        itemsPage: limit,
        keywords: search || '',
        category_id: cat?._id || '',
        product_state,
        sort_star: true
      })
    );
    //setlista(result.productList.products || []);
    setlista(productListByStore.products || []);
    setPaginate(formatpaginate(productListByStore.info));
    setLoadings(false);
  };

  const sendAttribute = async () => {
    let company_id = store_id || (await tienda(dispatch, product));
    setsend(true);
    let { activeProducts } = await AxiosGQL(
      ACTIVE_PRODUCTS({
        store_id: company_id,
        flag_active: confirm,
        product_ids: [product_id]
      })
    );
    if (activeProducts.status) {
      let ls = [...lista];
      ls = ls.map((da) => {
        if (da.product_id == product_id) {
          da = {
            ...da,
            product_active: datas.boolean
          };
        }
        return da;
      });
      setlista(ls);
      CVAlertSuccess({ addToast, message: activeProducts.message });
    } else {
      CVAlertError({ addToast, message: activeProducts.message });
    }
    setsend(false);
    onClose();
  };

  const setattribute = async (data) => {
    setdatas(data);
    setconfirm(data.boolean);
    setProduct_id(data._id);
    onOpen();
  };

  const okAction = async () => {
    const product_ids = JSON.parse(localStorage.getItem('pids'));
    let company_id = store_id || (await tienda(dispatch, product));
    const deleted = await delete_products({
      store_id: company_id,
      product_ids
    });
    if (deleted) {
      initdata();
      CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
    } else {
      CVAlertError({ addToast, message: 'Ocurrieron Problemas' });
    }
    setremoved(false);
  };

  const removeproducts = async (product_ids) => {
    localStorage.setItem('pids', JSON.stringify(product_ids));
    setremoved(!removed);
  };

  const duplicateProduct = async (id_duplicate) => {
    try {
      const { duplicateProduct } = await AxiosGQL(
        DUPLICATE_PRODUCT(id_duplicate)
      );
      if (duplicateProduct.status) {
        CVAlertSuccess({
          addToast,
          message: 'Producto duplicado correctamente.'
        });
        initdata();
      } else {
        CVAlertError({
          addToast,
          message: 'No pudo ser posible duplicar el producto.'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const download = async () => {
    let company_id = store_id || (await tienda(dispatch, product));
    const { productsByStoreCSV } = await AxiosGQL(`{
      productsByStoreCSV(
        store_id:"${company_id}", 
        product_state: "${product_state}",
        keywords: "${search || ''}"
        category_id: "${cat?._id || ''}")
    }`);
    return JSON.parse(productsByStoreCSV);
  };

  const startProduct = async (id, status) => {
    try {
      const { addStartProduct } = await AxiosGQL(ADD_START_PRODUCT(id, status));
      if (addStartProduct.status) {
        let index = lista.findIndex((item) => item.product_id == id);

        if (index > -1) {
          lista[index].destacado = status;
          if (status) {
            lista.unshift(lista[index]);
            index++;
          } else lista.push(lista[index]);

          lista.splice(index, 1);
          setlista([...lista]);
        }

        CVAlertSuccess({
          addToast,
          message: status
            ? 'Agregado a productos estrella.'
            : 'Quitado de productos estrella.'
        });
        // await initdata();
      } else {
        CVAlertError({
          addToast,
          message: 'No se pudo agregar a productos estrella.'
        });
      }
    } catch (error) {
      CVAlertError({
        addToast,
        message: 'Tenemos un error, vuelva a intentarlo mas tarde.'
      });
    }
  };

  useEffect(() => {
    initdata(1, 10);
  }, [search, cat, product_state, isDelete]);

  return (
    <Box padding='1rem' borderRadius='1rem' backgroundColor='#FFFFFF'>
      <CVDataTable
        loading={loadings}
        pagination={paginate}
        fetchdata={initdata}
        headers={headCells}
        data={rows(
          lista,
          {
            setattribute,
            page: paginate.page,
            removeproducts,
            duplicateProduct,
            startProduct
          },
          addToast
        )}
        selectable={true}
        checkAll={checkAll}
        selectedComponente={<Box ref={(ref) => setreference(ref)}></Box>}
        selectedAction={(selecteds, unSelecteds) => {
          localStorage.setItem('selecteds', JSON.stringify(selecteds));
          localStorage.setItem('unSelecteds', JSON.stringify(unSelecteds));
        }}
        Download={() => <CVDownload fetchData={download} />}
      />
      <CVModal
        colorHeader='white'
        isOpen={isOpen}
        onClose={onClose}
        bgHeader='primary'
        header={!confirm ? 'Producto Desactivado' : '!Que empiezen las ventas!'}
        footer={
          <Flex justifyContent='center' width='100%'>
            <Box>
              <CVButton
                onClick={() => sendAttribute()}
                disabled={send}
                isLoading={send}>
                {!confirm ? 'ACEPTAR' : 'CONFIRMAR'}
              </CVButton>
            </Box>
          </Flex>
        }>
        <SizeBox />
        {!confirm ? (
          <>
            <CVText textAlign='center' color='blue'>
              <span style={{ fontWeight: 'bold' }}>
                Tu producto ya no se mostrará en el marketplace{' '}
              </span>{' '}
              los compradores ya no podran visualizarlo ni realizar pedidos
            </CVText>
          </>
        ) : (
          <>
            <CVText color='blue'>
              Tu producto se mostrará en marketplace de CoVende
            </CVText>
          </>
        )}
        <SizeBox />
      </CVModal>
      {removed && (
        <CVModal
          isOpen={removed}
          onClose={() => setremoved(!removed)}
          header='Eliminar producto'
          bgHeader='primary'
          colorHeader='white'
          footer={
            <Flex width='100%'>
              <CVButton onClick={() => setremoved(!removed)}>CANCELAR</CVButton>
              <SizeBox />
              <CVButton onClick={() => okAction()} variant='outlined'>
                ELIMINAR
              </CVButton>
            </Flex>
          }>
          <SizeBox />
          <CVText color='blue' fontWeight='bold' textAlign='center'>
            ¿Seguro que desea eliminar este producto?
          </CVText>
          <CVText color='blue' textAlign='center'>
            Recuerde que no podrá recuperar la información.
          </CVText>
        </CVModal>
      )}
    </Box>
  );
}

export default TableData;
