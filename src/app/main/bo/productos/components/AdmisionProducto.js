import { PRODUCT_LIST_WITH_STORE } from '@/app/api/graphql/webbo/BProductoService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVDataTable, CVInput } from '@/common/CovendeTemplate';
import { formatpaginate } from '@/common/utils/methods';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { groupBy, set } from 'lodash';

import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@chakra-ui/toast';
import { columnsData, inputproceced } from './ProductoBOUtils';
import { removeproducts } from './ProductsMethod';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import CVDateRangePicker from '@CVTemplate/core/CVDateRangePicker';
import CVSearchInput from '@CVTemplate/core/CVSearchInput';
import { ALL_EJECUTIVOS } from '@CVApi/core/webbo/BClientService';
import CVSelect from '@CVTemplate/core/CVSelect';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVCheck from '@CVTemplate/core/CVCheck';
import CVSingleDatePicker from '@CVTemplate/core/CVDatePicker';
import MFilterCategories from '../../clientes/components/MFilterCategories';

function AdmisionProducto({ permisionsProductBO }) {
  const addToast = useToast();
  const [productos, setProductos] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [filtro, setfiltro] = useState({
    keyword: '',
    startdate: '',
    statusDate: false,
    enddate: '',
    // ambiente: 'ALL',
    categories_ids: [],
    ejecutivo: 'ALL'
  });
  const [pagination, setpagination] = useState({});
  const [total, setTotal] = useState(0);
  const [ejecutivos, setEjecutivos] = useState([]);
  const [clear, setClear] = useState(false);

  const [isRangeDate, setIsRangeDate] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();

  let getEjecutivos = async () => {
    if (ejecutivos.length == 0) {
      let { getExecutives } = await AxiosGQL(ALL_EJECUTIVOS());
      if (getExecutives) {
        setEjecutivos([{ text: 'Todos', value: 'ALL' }, ...getExecutives]);
      }
    }
  };

  const deleteproduct = async (product_ids, store_id, fechtnow = true) =>
    removeproducts({
      product_ids,
      store_id,
      initdata: fechtnow ? fetchdata : () => {},
      addToast
    });

  const removeselected = (selected) => {
    selected = selected.map((item) => {
      const [product_id, store_id] = item.split('|');
      return {
        product_id,
        store_id
      };
    });
    selected = groupBy(selected, (item) => item.store_id);
    selected = Object.keys(selected).map((item, key) => {
      return {
        store_id: item,
        product_ids: selected[item].map((pp) => pp.product_id)
      };
    });

    selected.forEach((item, idx) =>
      deleteproduct(item.product_ids, item.store_id, selected.length - 1 == idx)
    );
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
          product_state: 'IN_REVIEW'
        }
      })
    );
    if (!productListWithStore) return;
    let product_in_draft = productListWithStore.products;

    setProductos(product_in_draft || []);
    setpagination(formatpaginate(productListWithStore?.info));
    setLoadings(false);
    setTotal(productListWithStore?.info?.total);
    setClear(false);
  };

  useEffect(() => {
    getEjecutivos();
    fetchdata();
  }, []);

  useEffect(() => {
    if (clear) fetchdata();
  }, [clear]);

  const setDateRange = (changeDate) => {
    setfiltro({
      ...filtro,
      startdate: changeDate[0],
      enddate: changeDate[1]
    });
  };

  return (
    <Box>
      <Flex justifyContent='space-between' wrap='wrap'>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
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

            {/* <CVDateRangePicker
              title={'Tiempo: '}
              dateend={filtro.enddate}
              datestart={filtro.startdate}
              onChange={setDateRange}
              disabledDate={null}
              height='3rem'
            /> */}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <CVSelect
              height='3rem'
              options={ejecutivos}
              title={'Ejecutivos: '}
              value={filtro.ejecutivo}
              onChange={(value) => setfiltro({ ...filtro, ejecutivo: value })}
            />
          </Grid>

          {/* <Grid item xs={12} sm={1} md={4} lg={6}></Grid> */}

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CVSearchInput
              placeholder='Producto'
              onSubmit={(value) => setfiltro({ ...filtro, keyword: value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={12} lg={4}>
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
                  setClear(true);
                }}>
                Limpiar
              </CVButton>
            </Flex>
          </Grid>

          {/* <CVInput
          width='initial'
          height='3rem'
          onEnter={(value) => setfiltro({ ...filtro, keyword: value })}
          placeholder='Producto'
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
        headers={columnsData}
        pagination={pagination}
        data={inputproceced({
          data: productos,
          method: {
            deleteproducto: deleteproduct,
            page: pagination.page
          },
          permisionsProductBO
        })}
        fetchdata={(page, limit) => fetchdata(page || 1, limit || 10)}
        selectable={true}
        selectedAction={(values) => removeselected(values)}
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

export default AdmisionProducto;
