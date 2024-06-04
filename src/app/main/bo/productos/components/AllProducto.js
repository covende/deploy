import {
  ACTIVE_PRODUCTS,
  PRODUCT_LIST_WITH_STORE
} from '@/app/api/graphql/webbo/BProductoService';
import { SET_ATTRIBUTE } from '@/app/api/graphql/webseller/AttributeService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVDataTable, CVInput } from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { formatpaginate } from '@/common/utils/methods';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import { useToast } from '@chakra-ui/toast';
import CVDateRangePicker from '@CVTemplate/core/CVDateRangePicker';
import { columnsData, inputproceced } from './ProductoBOAllUtils';
import { removeproducts } from './ProductsMethod';
import CVSearchInput from '@CVTemplate/core/CVSearchInput';
import { TIPOAMBIENTE } from '@CVTemplate/core/CVThemes';
import CVSelect from '@CVTemplate/core/CVSelect';
import { ALL_EJECUTIVOS } from '@CVApi/core/webbo/BClientService';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVCheck from '@CVTemplate/core/CVCheck';
import CVSingleDatePicker from '@CVTemplate/core/CVDatePicker';
import MFilterCategories from '../../clientes/components/MFilterCategories';

const nowDesde = new Date();
nowDesde.setDate(nowDesde.getDate() - 7);

function AllProducto({
  permisionsProductBO = { crear: true, eliminar: true, editar: true, ver: true }
}) {
  const addToast = useToast();
  const [productos, setProductos] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [filtro, setfiltro] = useState({
    keyword: '',
    startdate: nowDesde,
    enddate: new Date(),
    date: '',
    ambiente: 'PRODUCTION',
    ejecutivo: 'ALL',
    offer: false,
    categories_ids: [],
    statusDate: false
  });
  const [filterStatus, setFilterStatus] = useState('APPROVED');
  const [pagination, setpagination] = useState({});
  const [ejecutivos, setEjecutivos] = useState([]);
  const [total, setTotal] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isRangeDate, setIsRangeDate] = useState(true);

  const deleteproduct = async (product_ids, store_id) =>
    removeproducts({
      product_ids,
      store_id,
      initdata: fetchdata,
      addToast
    });

  const setattribute = async (data) => {
    try {
      let { activeProducts } = await AxiosGQL(
        ACTIVE_PRODUCTS({
          store_id: data.store_id,
          flag_active: data.boolean,
          product_ids: `["${data._id}"]`
        })
      );
      if (activeProducts.status) {
        let ls = [...productos];
        ls = ls.map((da) => {
          if (da.product_id == data._id) {
            da = {
              ...da,
              product_active: data.boolean
            };
          }
          return da;
        });
        setProductos(ls);
        CVAlertSuccess({ addToast, message: activeProducts.message });
      } else {
        CVAlertError({ addToast, message: activeProducts.message });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchdata = async (page = 1, limit = 10, filter) => {
    setLoadings(true);
    const { productListWithStore } = await AxiosGQL(
      PRODUCT_LIST_WITH_STORE({
        page: page,
        itemsPage: limit,
        filtros: {
          ...filtro,
          categories: filter?.categories_ids || filtro.categories_ids || [],
          keywords: filtro.keyword,
          product_state: filterStatus
        }
      })
    );

    if (!productListWithStore) return;

    setProductos(productListWithStore.products);
    setpagination(formatpaginate(productListWithStore.info));
    setTotal(productListWithStore?.info?.total || 0);
    setLoadings(false);
  };

  let getEjecutivos = async () => {
    if (ejecutivos.length == 0) {
      let { getExecutives } = await AxiosGQL(ALL_EJECUTIVOS());
      if (getExecutives) {
        setEjecutivos([{ text: 'Todos', value: 'ALL' }, ...getExecutives]);
      }
    }
  };

  const setDateRange = (changeDate) => {
    setfiltro({
      ...filtro,
      startdate: changeDate[0],
      enddate: changeDate[1],
      date: ''
    });
  };

  useEffect(() => {
    getEjecutivos();
    fetchdata();
  }, [filterStatus]);

  return (
    <Box>
      <Flex justifyContent='space-between' wrap='wrap'>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <Box maxWidth='138px'>
              <CVCheck
                titleAlign='left'
                value={isRangeDate}
                onChange={(value) => {
                  setfiltro({
                    ...filtro,
                    date: '',
                    startdate: '',
                    enddate: ''
                  });
                  setIsRangeDate(value);
                }}
                title='Rango de fecha'
              />
            </Box>

            {isRangeDate ? (
              <CVDateRangePicker
                title={'Tiempo: '}
                dateend={filtro.enddate}
                datestart={filtro.startdate}
                onChange={setDateRange}
                disabledDate={null}
                height='3rem'
              />
            ) : (
              <Box maxWidth='180px'>
                <CVSingleDatePicker
                  title={'Tiempo: '}
                  date={filtro.date}
                  onChange={(date) =>
                    setfiltro({
                      ...filtro,
                      date: date,
                      startdate: '',
                      enddate: ''
                    })
                  }
                  disabledDate={null}
                  height='3rem'
                />
              </Box>
            )}
            <Box maxWidth='205px'>
              <CVCheck
                titleAlign='left'
                value={filtro.statusDate}
                onChange={(value) =>
                  setfiltro({ ...filtro, statusDate: value })
                }
                title='Filtrar por fecha de estado'
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={2}>
            <CVSelect
              height='3rem'
              options={ejecutivos}
              title={'Ejecutivos: '}
              value={filtro.ejecutivo}
              onChange={(value) => setfiltro({ ...filtro, ejecutivo: value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={2}>
            <CVSelect
              height='3rem'
              options={TIPOAMBIENTE}
              title={'Ambiente: '}
              value={filtro.ambiente}
              onChange={(value) => setfiltro({ ...filtro, ambiente: value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <CVSearchInput
              placeholder='Producto'
              onSubmit={(value) => setfiltro({ ...filtro, keyword: value })}
            />
          </Grid>

          <Grid item xs={12} sm={2} md={2} lg={1}>
            <Box maxWidth='150px'>
              <CVCheck
                titleAlign='left'
                value={filtro.offer}
                onChange={(value) => setfiltro({ ...filtro, offer: value })}
                title='Oferta'
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={10} md={10} lg={12}>
            <Flex justifyContent='end'>
              <CVButton
                onClick={() => onOpen()}
                height='3rem'
                backgroundColor='blue'>
                Categorias
              </CVButton>
              <SizeBox />
              <CVButton
                onClick={() => fetchdata(1, 10)}
                height='3rem'
                backgroundColor='red'>
                Filtrar
              </CVButton>
              <SizeBox />
              <CVButton
                height='3rem'
                variant='outlined'
                color='green'
                onClick={() => {
                  setfiltro({
                    keyword: '',
                    startdate: '',
                    enddate: '',
                    ambiente: 'ALL',
                    ejecutivo: 'ALL',
                    categories_ids: []
                  });
                  if (filterStatus == 'Todo') fetchdata(1, 10);
                  else setFilterStatus('Todo');
                }}>
                Limpiar
              </CVButton>
            </Flex>
          </Grid>

          {/* <CVInput
          width='initial'
          height='3rem'
          onEnter={(value) => setfiltro({ ...filtro, keyword: value })}
          placeholder='Busca el producto por palabras clave'
          value={filtro.keyword}
          onChange={(value) => setfiltro({ ...filtro, keyword: value })}
          iconFind={true}
          buttonClick={() => fetchdata()}
        /> */}
        </Grid>
      </Flex>
      <br />
      <CVDataTable
        loading={loadings}
        headers={columnsData(filterStatus, setFilterStatus)}
        pagination={pagination}
        data={inputproceced({
          data: productos,
          method: {
            deleteproducto: deleteproduct,
            filterStatus: filterStatus,
            page: pagination.page,
            setattribute,
            addToast
          },
          permisionsProductBO
        })}
        fetchdata={(page, limit) => fetchdata(page || 1, limit || 10)}
      />
      <Box ml='1rem' mt='-2rem'>
        <Text fontSize='1rem'>{total} Productos</Text>
      </Box>

      <MFilterCategories
        isOpen={isOpen}
        onClose={onClose}
        categories={filtro.categories_ids}
        setCategories={(categories_ids) => {
          setfiltro({ ...filtro, categories_ids });
          fetchdata(1, 10, { categories_ids });
        }}
      />
    </Box>
  );
}

export default AllProducto;
