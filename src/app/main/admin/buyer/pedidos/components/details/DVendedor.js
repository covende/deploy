import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { STORE_REVIEW_BY_CUSTOMER } from '@/app/api/graphql/webbuyer/WBReviewTypes';
import {
  CVButton,
  CVImage,
  CVPanel,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import { CVDateDifference } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

import { AiFillMessage } from 'react-icons/ai';

import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { sendtomessage } from '../Acciones';
import { useHistory } from 'react-router-dom';

function DVendedor({ pedido, onOpen, setapplyto }) {
  const [puntuacion, setpuntuacion] = useState(0);
  const history = useHistory();
  const initdata = async () => {
    const { storeReviewByCustomer } = await AxiosGQL(
      STORE_REVIEW_BY_CUSTOMER({
        store_id: pedido.company_id,
        customer_id: pedido.buyer_id
      })
    );
    setpuntuacion(storeReviewByCustomer?.rating || 0);
  };
  const createdAt = CVDateDifference({
    pastDate: pedido?.company?.createdAt
  });

  const creationAt = () => {
    if (createdAt.years > 0)
      return createdAt.years + ' año' + (createdAt.years > 1 ? 's' : '');
    if (createdAt.months > 0)
      return createdAt.months + ' mes' + (createdAt.months > 1 ? 'es' : '');
    if (createdAt.days > 0)
      return createdAt.days + ' dia' + (createdAt.days > 1 ? 's' : '');
  };

  useEffect(() => {
    initdata();
  }, [pedido]);

  const translate = (world) => {
    switch (world) {
      case 'RETAIL':
        return 'Ventas por Menor'
      case 'WHOLESALE':
        return 'Ventas por Mayor'
      case 'BOTH':
        return 'Ventas por Mayor y Menor'
      default:
        return '--';
    }
  }

  return (
    <Box>
      <SizeBox />
      <Flex width='100%' justifyContent='space-between'>
        <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
          Detalles de Vendedor
        </CVText>
        <Box
          color={COLORS['green']}
          onClick={() =>
            sendtomessage({
              id: pedido.pedido_id,
              owner: pedido?.company?.owner,
              producto_name: pedido.producto,
              history
            })
          }>
          <Flex alignItems='center'>
            <AiFillMessage /> !Chatea Ahora!
          </Flex>
        </Box>
      </Flex>
      <SizeBox />

      <CVPanel>
        <Flex>
          <CVImage
            name={pedido?.company?.comercial_name}
            image={pedido?.company?.logo ? pedido?.company?.logo : null}
            width='75px'
            height='75px'
            variant='avatar'
          />
        </Flex>
        <SizeBox />
        <Box width='100%' height='100%'>
          <CVText fontSize='1.5rem' color='blue'>
            {pedido?.company?.comercial_name} - {pedido?.company?.social_razon}
          </CVText>
          <Flex>
            <CVText color='blue'>Tipo de venta:</CVText>
            <SizeBox />
            {translate(pedido?.company?.activity)}
          </Flex>
          <Flex>
            <CVText color='blue'>Tiempo en Covende:</CVText>
            <SizeBox />
            {creationAt()}
          </Flex>
          <Flex justifyContent='space-between'>
            <CVRating height='2rem' puntuation={pedido?.company?.stars} />
            <CVButton
              disabled={puntuacion > 0 || pedido.status != 'COMPLETED'}
              color='yellow'
              variant='outlined'
              fontWeight='bold'
              onClick={() => {
                setapplyto('seller');
                onOpen();
              }}>
              <AiFillStar style={{ color: COLORS['yellow'] }} />
              <SizeBox />
              CALIFICAR
            </CVButton>
          </Flex>
        </Box>
      </CVPanel>
    </Box>
  );
}

export default DVendedor;
