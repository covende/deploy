/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import * as User from '@/app/helpers/authUtils';
import { tienda } from '../productos/redux/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import FormPayment from '@CVPages/core/crea-tu-tienda/components/FormPayment';
import { useParams } from 'react-router-dom';
import { fromBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { CVCarrusel, CVImage, CVText } from '@CVTemplate/core/index';
import { Center } from '@chakra-ui/react';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { boWebPublicEditionActions as ActionsWebPublicEdition } from '@/app/redux/Backoffice/actions';
import { Container } from '@/../node_modules/@material-ui/core/index';
import { v4 } from 'uuid';

function PayPlan({}) {
  const { plan } = useParams();
  const [idStore, seIdStore] = useState('');
  const { product } = useSelector((state) => state.ProductView);
  const { BannersCreateStore } = useSelector(
    (state) => state.Backoffice_WebPublicEdition
  );
  let { user_id } = User.getLoggedInUser();
  const dispatch = useDispatch();
  const init = async () => {
    let store_id = await tienda(dispatch, product);
    seIdStore(store_id);
  };

  const fetchBannerCreaTienda = (data) =>
    dispatch(ActionsWebPublicEdition.BannersCreaTienda.fetch(data));

  const boundAddTodo = (text) => dispatch(addTodo(text));
  console.log(fetchBannerCreaTienda);
  console.log(BannersCreateStore);

  useEffect(() => {
    fetchBannerCreaTienda();
    init();
  }, []);
  return (
    <>
      <Container>
        {BannersCreateStore.loading ? null : BannersCreateStore.error ? null : (
          <CVCarrusel
            datalist={BannersCreateStore.data.map((item, index) => (
              <CVImage
                key={v4()}
                image={item.image}
                width='100%'
                height='auto'
              />
            ))}
          />
        )}
      </Container>
      {/* <Center>
       
        <CVText color='skyblue' fontSize='3rem' fontWeight='bold'>
          Adquiriendo un nuevo Plan
        </CVText>
      </Center> */}
      <Box
        bg={COLORS.blue}
        mt={20}
        mx={40}
        p={5}
        w='10%'
        fontSize='1.3em'
        textAlign={['center']}
        borderTopRadius='14px'
        color='white'>
        PAGO
      </Box>
      <Box
        p={30}
        mx={40}
        bg='white'
        borderBottomRadius='16px'
        borderTopRightRadius='16px'>
        <FormPayment
          user_id={user_id}
          store_id={idStore}
          plan_select={JSON.parse(fromBase64(plan))}
        />
      </Box>
    </>
  );
}

export default PayPlan;
