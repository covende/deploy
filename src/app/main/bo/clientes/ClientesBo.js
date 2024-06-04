// Page Template
import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, useDisclosure } from '@chakra-ui/react';
import { ClientesBoContainer } from './ClientesBo.styles';

import { useToast } from '@chakra-ui/toast';
import {
  ALL_CUSTOMERS,
  UPDATE_ATTRIBUTE_CUSTOMER
} from '@/app/api/graphql/webbo/BClientService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { columnsData, inputDataProcessed } from './components/utils';
import CustomerFiltros from './components/CustomerFiltros';
import { CVDataTable } from '@/common/CovendeTemplate';
import {
  CVAlertConfirm,
  CVAlertError,
  CVAlertSuccess
} from '@/common/CovendeTemplate/CVAlert';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { DELETE_USER_BY_ID } from './ClientesBoService';
import CVText from '@CVTemplate/core/CVText';

import Categorias from './../../admin/seller/productos/components/step1/S1Categorias';
import MFilterCategories from './components/MFilterCategories';

// import Categorias from './components/step1/S1Categorias';

function ClientesBo() {
  const [clients, setClients] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [loadings, setLoadings] = useState(true);
  const addToast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const permissions = useGetPermisions('Backoffice', 'Clientes');
  const [total, setTotal] = useState(0);
  const initFilter = {
    bloqueados: 'ALL',
    verificados: 'ALL',
    // datestart: new Date(),
    // dateend: new Date(),
    // categories_ids: [],
    datestart: '',
    dateend: '',
    tipo: '',
    search: '',
    ejecutivo: 'ALL',
    ambiente: 'ALL',
    firstTime: true,
    rangeTime: false,
    singleTime: ''
  };

  const [filtros, setfiltros] = useState(initFilter);

  const fetchdata = async (page = 1, limit = 10, filter = initFilter) => {
    setLoadings(true);
    try {
      const { customers } = await AxiosGQL(ALL_CUSTOMERS(page, limit, filter));

      setClients(customers.docs);
      setPaginate({ ...customers });

      setLoadings(false);
      setTotal(customers?.totalDocs || 0);
      localStorage.setItem('page', customers.page);
      localStorage.setItem(
        'filtros',
        JSON.stringify(filter, (key, value) => {
          if (value instanceof Date) {
            return value.toISOString(); // Convertir a cadena de texto ISO
          }
          return value;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cedititem = async (itemEdited, attribute) => {
    const { updateattributecustomer } = await AxiosGQL(
      UPDATE_ATTRIBUTE_CUSTOMER({
        _id: itemEdited.id,
        attribute,
        value: itemEdited[attribute]
      })
    );
    if (updateattributecustomer.status) {
      let ls = [...clients];
      ls = ls.map((item) => (item.id === itemEdited.id ? itemEdited : item));
      setClients(ls);
      CVAlertSuccess({ addToast, message: 'Editado Correctamente' });
    } else {
      CVAlertError({ addToast, message: updateattributecustomer?.message });
    }
  };

  const cflagValidated = (item, status) => {
    item.flagValidated = status;
    cedititem(item, 'flagValidated');
  };

  const cflagactive = (item, status) => {
    item.flagActive = status;
    cedititem(item, 'flagActive');
  };

  const deleting = async (itemDeleted) => {
    const { deleteUser: resp } = await AxiosGQL(
      DELETE_USER_BY_ID(itemDeleted.user_id)
    );
    if (resp.status) {
      setClients(
        clients.filter((client) => client.user_id !== itemDeleted.user_id)
      );
      CVAlertSuccess({ addToast, message: 'Eliminado correctamente.' });
    }
  };

  const cdeleteitem = async (itemDeleted) => {
    CVAlertConfirm({
      message: 'Esta seguro con eliminar este Cliente?',
      title: 'Eliminar Cliente',
      okLabel: 'Eliminar Cliente',
      // okAction: deleting(itemDeleted),
      okAction: () => deleting(itemDeleted),
      noLabel: 'Regresar a las Clientes',
      noAction: () => {}
    });
  };

  useEffect(() => {
    const filtrosLs =
      JSON.parse(localStorage.getItem('filtros') || 'null', (key, value) => {
        if (
          typeof value === 'string' &&
          /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)
        ) {
          return new Date(value); // Convertir de cadena de texto a objeto Date
        }
        return value;
      }) || initFilter;

    setfiltros(filtrosLs);

    const page = localStorage.getItem('page');
    fetchdata(page, 10, filtrosLs);
  }, []);

  return (
    <Flex flex={1} p={4}>
      <ClientesBoContainer>
        <Text fontWeight='bold' color='#004474' fontSize='1.5rem'>
          Clientes
        </Text>
        <br />
        <CustomerFiltros
          filtros={filtros}
          setfiltros={setfiltros}
          fetchdata={fetchdata}
          initFilter={initFilter}
          onOpenCategories={onOpen}
        />
        <br />
        <CVDataTable
          loading={loadings}
          pagination={paginate}
          fetchdata={(page) => fetchdata(page, 10, filtros)}
          headers={columnsData}
          data={inputDataProcessed(
            clients,
            {
              cflagValidated: cflagValidated,
              cflagactive: cflagactive,
              cdeleteitem: cdeleteitem,
              page: paginate?.page || 0
            },
            permissions
          )}
        />
        <Box ml='1rem' mt='-2rem'>
          <Text fontSize='1rem'>{total} Clientes</Text>
        </Box>
        {/* 
        <MFilterCategories
          isOpen={isOpen}
          onClose={onClose}
          categories={filtros.categories_ids}
          setCategories={(categories_ids) => {
            setfiltros({ ...filtros, categories_ids });
            fetchdata(1, 10, { ...filtros, categories_ids });
          }}
        /> */}
      </ClientesBoContainer>
    </Flex>
  );
}

export default ClientesBo;
