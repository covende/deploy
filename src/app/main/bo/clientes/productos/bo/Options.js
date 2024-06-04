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
import { useHistory, useLocation } from 'react-router-dom';
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
import {
  ON_DELETE,
  A_PRODUCTVIEW
} from '@CVPages/core/admin/seller/productos/redux/ProductViewAction';
import { rolemenu } from '@/app/helpers/role';
import CVCheck from '@CVTemplate/core/CVCheck';

function Options({
  search,
  setSearch,
  cat,
  setCat,
  buttonref,
  permisions,
  store_id,
  checkAll,
  setCheckAll,
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
  const location = useLocation();
  const addToast = useToast();
  const [masive, setmasive] = useState('');
  const [categoriProduct, setCategoriProduct] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const initdata = async () => {
    if (categorys.length == 0 || treecategorys.length == 0) {
      const data = await categoryProductsList(true);
      const tree = arrayToTree(data, {
        parentProperty: 'parent_id',
        customID: '_id'
      });
      dispatch(A_CATEGORYPRODUCTS({ treecategorys: tree, categorys: data }));
    }
    const categoriesStore = await categoriesByStore(
      store_id || product?.store_id
    );
    setCategoriProduct(categoriesStore);
    if (!isAdmin && rolemenu() == '/bo/') setIsAdmin(true);
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
          store_id: store_id || product?.store_id,
          product_ids: checkAll ? [] : seleccionados,
          no_products: checkAll ? JSON.parse(unSelect || []) : [],
          category: cat?._id || '',
          search: search
        })
      )
        .then(({ deleteProducts }) => {
          dispatch(ON_DELETE(!isDelete));
          deleteProducts.status &&
            CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
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
          store_id: store_id || product?.store_id,
          flag_active: statusSwitch,
          // product_ids: select
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
          product_ids: select,
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

    if (isAdmin) {
      let position = location.pathname.indexOf('productos');
      history.push(
        location.pathname.substring(0, position) +
          'productos/?action=create&id=new&step=0'
      );
    } else {
      history.push('/seller/productos/create/new/step/0');
    }
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <CVInput
            placeholder='Buscar tus productos por palabra clave'
            value={search}
            onChange={(value) => setSearch(value)}
            iconFind={true}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
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
          md={3}
          style={{ display: 'flex', justifyContent: 'end' }}>
          <Flex alignItems='center'>
            <Box>
              {permisions.crear && (
                <CVButton
                  onClick={() => {
                    if (isAdmin) {
                      let position = location.pathname.indexOf('productos');
                      history.push(
                        location.pathname.substring(0, position) +
                          'productos/' +
                          '?action=attributes'
                      );
                    } else {
                      history.push('/seller/productos/attributes');
                    }
                  }}
                  backgroundColor='green'>
                  + ATRIBUTOS
                </CVButton>
              )}
            </Box>

            <Box ml={50}>
              <CVButton
                backgroundColor='blue'
                onClick={() => {
                  setOpenBulkLoad(true);
                  // if (isAdmin) {
                  //   let position = location.pathname.indexOf('productos');
                  //   history.push(
                  //     location.pathname.substring(0, position) +
                  //       'productos/' +
                  //       '?action=carga'
                  //   );
                  // } else {
                  //   history.push('/seller/productos/carga');
                  // }
                }}>
                CARGA MASIVA
              </CVButton>
            </Box>
          </Flex>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          style={{ display: 'flex', justifyContent: 'end' }}>
          {/* <Link to='#!'> */}
          {permisions.crear && (
            <CVButton onClick={() => createProducto()} backgroundColor='red'>
              CREAR PRODUCTO
            </CVButton>
          )}
          {/* </Link> */}
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
