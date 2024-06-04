import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import {
  categoriesByStore,
  categoryProductsList
} from '@/app/api/graphql/categories/services/categoryservice';
import { companyByID } from '@/app/api/graphql/customers/services/CompanyService';
import arrayToTree from 'array-to-tree';
import { A_CATEGORYPRODUCTS } from '@/app/main/bo/arborescencia-de-categorias/redux/Action';
import { A_PRODUCTVIEW, ON_DELETE } from '../redux/ProductViewAction';
import { useHistory } from 'react-router-dom';
import { CVButton, CVInput, CVSelectMultiple } from '@/common/CovendeTemplate';
import { Flex, useToast, useDisclosure, Spacer, Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVSelect from '@CVTemplate/core/CVSelect';

import { MdDeleteSweep } from 'react-icons/md';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  ACTIVE_PRODUCTS,
  CLEAR_STOCK_PRODUCT,
  DELETE_PRODUCTS
} from '@CVApi/core/webbo/BProductoService';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';
import CVCheck from '@CVTemplate/core/CVCheck';

function Options({
  search,
  setSearch,
  cat,
  setCat,
  buttonref,
  permisions,
  checkAll,
  setCheckAll,
  product_state = '',
  setOpenBulkLoad
}) {
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );
  const { product } = useSelector((state) => state.ProductView);
  const { isDelete } = useSelector((state) => state.ProductView);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const history = useHistory();
  const addToast = useToast();
  const [masive, setmasive] = useState('');
  // const [checkAll, setCheckAll] = useState(false);
  const [categoriProduct, setCategoriProduct] = useState([]);

  const initdata = async (isMounted) => {
    if (!isMounted) return;
    console.log({ product });
    if (categorys.length == 0 || treecategorys.length == 0) {
      const data = await categoryProductsList(true);
      const tree = arrayToTree(data, {
        parentProperty: 'parent_id',
        customID: '_id'
      });
      dispatch(A_CATEGORYPRODUCTS({ treecategorys: tree, categorys: data }));
    }
    const categoriesStore = await categoriesByStore(product?.store_id);
    setCategoriProduct(categoriesStore);
  };

  const masiveaction = (confirm) => {
    buttonref?.current?.click();

    let seleccionados = localStorage.getItem('selecteds');
    let unSelect = localStorage.getItem('unSelecteds');

    seleccionados = JSON.parse(seleccionados || []);

    if (!seleccionados || seleccionados.length <= 0) {
      CVAlertError({ addToast, message: 'Selecciona al menos 1 producto.' });
      return;
    }

    if (product.store_id && seleccionados) {
      AxiosGQL(
        DELETE_PRODUCTS({
          store_id: product?.store_id,
          product_ids: checkAll ? [] : seleccionados,
          no_products: checkAll ? JSON.parse(unSelect || []) : [],
          category: cat?._id || '',
          search: search,
          product_state: product_state || ''
        })
      )
        .then(({ deleteProducts }) => {
          dispatch(ON_DELETE(!isDelete));
          deleteProducts.status &&
            CVAlertSuccess({
              addToast,
              message: deleteProducts?.message || 'Eliminado Correctamente'
            });
        })
        .catch((err) =>
          CVAlertError({ addToast, message: 'Ocurrió un error al eliminar.' })
        );
    }
    seleccionados && localStorage.removeItem('selecteds');
    unSelect && localStorage.removeItem('unSelecteds');
    if (checkAll) setCheckAll(false);
    else checkAll == null ? setCheckAll(false) : setCheckAll(null);
    onClose();
  };

  const masiveActivate = (masive) => {
    buttonref?.current?.click();
    let select = localStorage.getItem('selecteds');
    let unSelect = localStorage.getItem('unSelecteds');
    select = JSON.parse(select || []);

    if (!select || select.length <= 0) {
      CVAlertError({ addToast, message: 'Selecciona al menos 1 producto.' });
      return;
    }

    const statusSwitch =
      masive == 'disable' ? false : masive == 'active' ? true : null;

    if (statusSwitch != null) {
      AxiosGQL(
        ACTIVE_PRODUCTS({
          store_id: product?.store_id,
          flag_active: statusSwitch,
          product_ids: checkAll ? [] : select,
          no_products: checkAll ? JSON.parse(unSelect || []) : [],
          category: cat?._id || '',
          search: search
        })
      )
        .then(({ activeProducts }) => {
          if (activeProducts.status) {
            dispatch(ON_DELETE(!isDelete));
            CVAlertSuccess({ addToast, message: activeProducts.message });
          } else {
            CVAlertError({ addToast, message: activeProducts.message });
          }
        })
        .catch((eerr) => console.log({ eerr }));
    } else {
      AxiosGQL(
        CLEAR_STOCK_PRODUCT({
          store_id: product?.store_id,
          product_ids: checkAll ? [] : select,
          no_products: checkAll ? JSON.parse(unSelect || []) : [],
          category_id: cat?._id || '',
          search: search
        })
      )
        .then(({ clearStockProducts }) => {
          if (clearStockProducts.status) {
            dispatch(ON_DELETE(!isDelete));
            CVAlertSuccess({ addToast, message: clearStockProducts.message });
          } else {
            CVAlertError({ addToast, message: clearStockProducts.message });
          }
        })
        .catch(() =>
          CVAlertError({
            addToast,
            message: 'Tuvimos complicaciones, por favor inténtalo más tarde.'
          })
        );
    }
    select && window.localStorage.removeItem('selecteds');
    unSelect && window.localStorage.removeItem('unSelecteds');
    if (checkAll) setCheckAll(false);
    else checkAll == null ? setCheckAll(false) : setCheckAll(null);
  };

  const createProducto = async () => {
    dispatch(
      A_PRODUCTVIEW({
        product: {
          ...product,
          product_id: ''
        },
        tabIndex: 0,
        categorias: [],
        attributes: [],
        allattributes: [],
        brands: [],
        brand: null,
        information: {
          name: '',
          typeMarca: 'GENERIC',
          modelo: '',
          sku: '',
          procedencia: 'IMPORT',
          condicion: 'NEW',
          licencia: null,
          slug: ''
        },
        description: {
          destacada: '',
          detallada: '',
          keywords: [],
          contenido: '',
          fotografias: [],
          material: '',
          peso: 0,
          dimensiones: {
            largo: '',
            ancho: '',
            alto: ''
          }
        },

        // type_of_sale: type_of_sale || 'BOTH',
        type_of_sale: 'BOTH',
        stock: 0,
        offer_percentage: 0,
        offer_start_date: '',
        offer_end_date: '',
        price_unit: 0,
        wholesales: [],
        sale_with_custom_attributes: [],
        stock_alert: true,

        despacha: {
          dias: 0,
          pormayor: 'no',
          tipo_paquete: 'Caja',
          peso_paquete: 0,
          dimensiones: {
            largo: 0,
            ancho: 0,
            alto: 0
          },
          inf_adicional: ''
        },
        extra: {
          comprobante: 'TICKET',
          igv: '18',
          periodo: 0,
          garantia: 'si',
          detalle: ''
        },
        product_state: 'IN_DRAFT',
        status: 'IN_DRAFT',
        in_draft: true
      })
    );
    history.push('/seller/productos/create/new/step/0');
  };

  useEffect(() => {
    let isMounted = true;
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CVInput
            placeholder='Buscar tus productos por palabra clave'
            value={search}
            onChange={(value) => setSearch(value)}
            iconFind={true}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Flex alignItems='center'>
            <CVCheck
              value={checkAll}
              onChange={(value) => setCheckAll(value)}
            />
            <CVButton padding='0.5rem' onClick={onOpen}>
              <MdDeleteSweep style={{ fontSize: '2rem' }} />
            </CVButton>
            <SizeBox />
            <CVSelect
              value={masive}
              onChange={(value) => {
                masiveActivate(value);
                setmasive(value);
              }}
              options={[
                permisions.editar && {
                  value: 'disable',
                  text: 'Desactivar productos '
                },
                permisions.editar && {
                  value: 'active',
                  text: 'Activar productos '
                },
                permisions.editar && {
                  value: 'outstock',
                  text: 'Inventario agotado '
                }
              ]}
            />
            <SizeBox />
          </Flex>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {permisions.ver && (
            <CVSelectMultiple
              title='Categoría:'
              options={[
                { name: 'Todas las categorias', _id: '' },
                ...categoriProduct
              ]}
              itemText='name'
              itemValue='_id'
              value={cat}
              onChange={(value) => setCat(value)}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ display: 'flex', justifyContent: 'end' }}>
          <Flex alignItems='center'>
            <Box m={1}>
              {permisions.crear && (
                <Link to='/seller/productos/attributes'>
                  <CVButton backgroundColor='green'>+ ATRIBUTOS</CVButton>
                </Link>
              )}
            </Box>

            <Box m={1}>
              {/* <Link to='/seller/productos/carga'>
              </Link> */}
              <CVButton
                backgroundColor='blue'
                onClick={() => setOpenBulkLoad(true)}>
                {' '}
                CARGA MASIVA
              </CVButton>
            </Box>
          </Flex>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          lg={3}
          style={{ display: 'flex', justifyContent: 'end' }}>
          <Link to='#!'>
            {permisions.crear && (
              <CVButton onClick={() => createProducto()} backgroundColor='red'>
                CREAR PRODUCTO
              </CVButton>
            )}
          </Link>
        </Grid>
      </Grid>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        title='los Productos'
        confirm={masiveaction}
        onConfirm={true}
        itemToDelete={true}
      />
    </>
  );
}

export default Options;
