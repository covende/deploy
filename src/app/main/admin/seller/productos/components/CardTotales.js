import { PRODUCT_STATUS_COUNTER } from '@/app/api/graphql/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVText, CVTotales } from '@/common/CovendeTemplate';
import { CVEstadoProducto } from '@/common/CovendeTemplate/CVEstado/CVEstadoProducto';
import { Flex, Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  iconAprobados,
  iconRechazados,
  iconRevision,
  iconTodos
} from '../ProductoIcons';
import { tienda } from '../redux/ProductUpdate';

const CardTotales = ({ setproduct_state, store_id }) => {
  const { product } = useSelector((state) => state.ProductView);
  const [total, setTotal] = useState([]);

  const icons = {
    ALL: iconTodos,
    IN_REVIEW: iconRevision,
    APPROVED: iconAprobados,
    REJECTED: iconRechazados
  };
  const dispatch = useDispatch();

  const initdata = async (isMounted) => {
    if (!isMounted) return;
    let company_id = store_id || (await tienda(dispatch, product));
    const { productStatusCounter } = await AxiosGQL(
      PRODUCT_STATUS_COUNTER(company_id)
    );
    let data = productStatusCounter.map((item) => ({
      ...item,
      icon: icons[item.original_name]
    }));
    setTotal(data);
  };

  useEffect(() => {
    let isMounted = true;
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      <CVTotales
        onChange={(value) => setproduct_state(value)}
        height='auto'
        lista={total.map((item) => ({
          value: CVEstadoProducto(item.original_name).value,
          color: CVEstadoProducto(item.original_name).color,
          text: (
            <Flex
              direction='column'
              justifyContent='space-between'
              width='100%'>
              <Flex justifyContent='space-between'>
                <span className='fa-2x'>{item.total}</span>
                {item.icon}
              </Flex>
              <CVText color='white' textTransform='uppercase' fontSize='1.5rem'>
                {CVEstadoProducto(item.original_name).text}
              </CVText>
            </Flex>
          )
        }))}
      />
    </>
  );
};

export default CardTotales;
