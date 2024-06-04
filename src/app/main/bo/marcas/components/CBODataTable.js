import { CVDataTable } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { marcasHeaders } from './CBODataTableUtils';
import { formatpaginate } from '@/common/utils/methods';

import { HStack, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import CVImage from '@CVTemplate/core/CVImage';
import CVText from '@CVTemplate/core/CVText';
import CVSwitch from '@CVTemplate/core/CVSwitch';
import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  active_brand,
  all_brands_paginations,
  delete_brand
} from '@CVApi/core/webBrands/WBrandService';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { Eye } from '@/app/assets/icons/index';
import { svgDelete } from '@/app/assets/images/SVG';
import CVInput from '@CVTemplate/core/CVInput';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import CVSelect from '@CVTemplate/core/CVSelect';
import { ALL_EJECUTIVOS } from '@CVApi/core/webbo/BClientService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function CBODataTable({  filtro, setfiltro, updateBrand }) {

  const initFilter = {
    active: 'none',
    type_brand: 'none',
    ejecutivo: 'ALL' 
  };

  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);
  const [lista, setlista] = useState([]);
  const [confirm, setconfirm] = useState(false);
  const [send, setsend] = useState(false);
  const [brand_id, setBrand_id] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addToast = useToast();
  const [modalType, setModalType] = useState('');



  const [search, setSearch] = useState(''); 
  const [filteredLista, setFilteredLista] = useState([]);
  const [ejecutivos, setEjecutivos] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (ejecutivos.length === 0) {
        let { getExecutives } = await AxiosGQL(ALL_EJECUTIVOS());
        if (getExecutives) {
          setEjecutivos([{ text: 'Todos', value: 'ALL' }, ...getExecutives]);
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    // Filtrar la lista cuando cambia el término de búsqueda
    const filteredBrands = lista.filter(brand => brand.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredLista(filteredBrands);
  }, [search, lista]);

  const fetchdata = async (page = 1, limit = 10) => {
    setloading(true);

    let filter = { page, itemsPage: limit };
    if (filtro.active !== 'none') filter.active = filtro.active;
    if (filtro.type_brand !== 'none') filter.type_brand = filtro.type_brand;

    const resp = await all_brands_paginations(filter);

    // console.log(resp, "ññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññ")

    if (resp.status) {
      setlista(resp.brands);
      setFilteredLista(resp.brands); // Actualizar la lista filtrada al obtener nuevos datos
      setpagination(formatpaginate(resp.info));
    }

    setloading(false);
  };

  const deleteBrand = async () => {
    setsend(true);
    let resp = await delete_brand({ id: brand_id });

    if (resp.status) {
      CVAlertSuccess({ addToast, message: resp.message });
    } else {
      CVAlertError({ addToast, message: resp.message });
    }

    setsend(false);
    onClose();

    if (resp.status) await fetchdata();
  };

  const active = async () => {
    setsend(true);
    const resp = await active_brand({ brand_id, flag_active: confirm });

    if (resp.status) {
      setlista(
        lista.map((item) =>
          item.brand_id === resp.brand.brand_id
            ? { ...item, flag_active: resp.brand.flag_active }
            : item
        )
      );
      CVAlertSuccess({ addToast, message: resp.message });
    } else {
      CVAlertError({ addToast, message: resp.message });
    }

    setsend(false);
    onClose();
  };

  const handleClear = () => {
    setSearch(''); // Limpiar el estado de búsqueda
    setfiltro(initFilter); // Restablecer el filtro principal
    fetchdata(1, 10); // Volver a obtener los datos sin filtro
  };

  useEffect(() => {
    fetchdata();
  }, [filtro]);
  return (
    <Box padding='1rem' backgroundColor='white' rounded='1rem'>
        
        <Grid container alignItems='center' spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={2}>

        <CVInput
          height='3rem'
          placeholder='Marca a Buscar'
          value={search}
        onChange={(value) => setSearch(value)} // Actualizar el estado de búsqueda
          iconFind={true}
        />
</Grid>
       
      {/* <Grid item xs={12} sm={6} md={3} lg={2}>
      <CVSelect
          height='3rem'
          options={ejecutivos}
          title={'Ejecutivos: '}
           value={filtro.ejecutivo}
           onChange={(value) => setfiltro({ ...filtro, ejecutivo: value })}
        />
      </Grid> */}

      {/* boton filtrar */}


      {/* <CVButton
            // onClick={() => fetchdata(1, 10, filtros)}
            height='3rem'
            backgroundColor='red'>
            Filtrar
          </CVButton>
          <SizeBox /> */}
           <SizeBox />
           <Grid item>
           <CVButton
  height='3rem'
  variant='outlined'
  color='green'
  onClick={handleClear}>
  Limpiar
</CVButton>
    </Grid>
       {/* boton filtrar */}

       </Grid> 
       
      <CVDataTable
        fetchdata={fetchdata}
        loading={loading}
        pagination={pagination}
        data={filteredLista.map((item, i) => ({
          ...item,
          numero: i + 1,
          type_brand: item.type_brand == 'REGISTERED' ? 'Registrado' : 'Propio',
          logo: (
            <HStack>
              <CVImage
                image={item.image || 'https://via.placeholder.com/700x700'}
                width='auto'
                height='50px'
              />
            </HStack>
          ),
          active: (
            <CVSwitch
              variant='capsule'
              yesColor={item.flag_active ? 'primary' : 'gray'}
              value={item.flag_active}
              onChange={(value) => {
                setconfirm(value);
                setBrand_id(item.brand_id);
                setModalType('active');
                onOpen();
              }}
            />
          ),
          acciones: (
            <Flex alignItems='center'>
              <Button onClick={() => updateBrand(item)}>{Eye}</Button>
              <Button
                colorScheme='teal'
                variant='ghost'
                onClick={() => {
                  setBrand_id(item.brand_id);
                  setModalType('delete');
                  onOpen();
                }}>
                {svgDelete}
              </Button>
            </Flex>
          )
        }))}
        headers={marcasHeaders({ filtro, setfiltro })}
      />

      {modalType == 'active' && (
        <CVModal
          colorHeader='white'
          isOpen={isOpen}
          onClose={onClose}
          bgHeader={!confirm ? 'red' : 'primary'}
          header={!confirm ? 'Marca Desactivada' : 'Marca Activada'}
          footer={
            <Flex justifyContent='center' width='100%'>
              <Box>
                <CVButton
                  backgroundColor={!confirm ? 'red' : 'skyblue'}
                  onClick={() => active()}
                  disabled={send}
                  isLoading={send}>
                  ACEPTAR
                </CVButton>
              </Box>
            </Flex>
          }>
          <SizeBox />
          <CVText color={!confirm ? 'red' : 'skyblue'}>
            ¿Estas seguro de &nbsp;
            <span style={{ fontWeight: 'bold' }}>
              {confirm ? 'activar' : 'desactivar'}
            </span>
            &nbsp; la marca?
          </CVText>
          <SizeBox />
        </CVModal>
      )}

      {modalType == 'delete' && (
        <CVModal
          colorHeader='white'
          isOpen={isOpen}
          onClose={onClose}
          bgHeader='red'
          header={'Eliminación de Marca'}
          footer={
            <Flex justifyContent='center' width='100%'>
              <Box>
                <CVButton
                  onClick={() => deleteBrand()}
                  backgroundColor='red'
                  disabled={send}
                  isLoading={send}>
                  ACEPTAR
                </CVButton>
              </Box>
            </Flex>
          }>
          <SizeBox />
          <CVText color='red'>
            ¿Estas seguro de &nbsp;
            <span style={{ fontWeight: 'bold' }}>Eliminar</span>
            &nbsp; la marca?
          </CVText>
          <SizeBox />
        </CVModal>
      )}
    </Box>


          

  );
}

export default CBODataTable;
