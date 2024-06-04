/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import CustomTable from './components/Table';

import { PLANS_BY_COMPANY } from '@/app/api/graphql/webbo/BClientService';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '../productos/redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function ListadoPlan({}) {
  const [listplan, setListPlan] = useState([]);
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const init = async () => {
    let store_id = await tienda(dispatch, product);

    let { plansByCompany } = await AxiosGQL(PLANS_BY_COMPANY(store_id));
    console.log(plansByCompany);
    setListPlan(plansByCompany.plans);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Box w='65%'>
        <CustomTable
          style={{ fontSize: '1rem' }}
          nameListCRUD=''
          listPlan={listplan}
        />
      </Box>
    </>
  );
}

export default ListadoPlan;
