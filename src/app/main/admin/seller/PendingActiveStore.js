import { Flex, Center, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from './productos/redux/ProductUpdate';
import { lista_fondo_seller } from '@/app/api/graphql/webbuy/TableAPIService';
import { CVImage } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function PendingActiveStore() {
  const { product, store_status } = useSelector((state) => state.ProductView);
  const [img, setImg] = useState('');
  const dispatch = useDispatch();

  const initdata = async (isMounted) => {
    if (!isMounted) return;

    await tienda(dispatch, product);
    let background_img = await lista_fondo_seller();
    setImg(background_img[0].image);
  };

  useEffect(() => {
    let isMounted = true;
    // tienda(dispatch, product);
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);
  return (
    <>
      <Box height='10rem' />
      <Flex justify='center'>
        {/* Covende está validando tu negocio. Te enviaremos un correo electrónico
        confirmando la aprobación de tu tienda */}
        <SizeBox height='20px' />
        <Center>
          <CVImage height='auto' width='80%' image={img} />
        </Center>
      </Flex>
    </>
  );
}

export default PendingActiveStore;
