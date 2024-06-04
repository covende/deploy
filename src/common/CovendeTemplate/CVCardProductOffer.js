import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { CVImage, CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import {
  oferPricePublic,
  offerprice
} from './CVCardProduct/CVCardProductMethod';
import { CVCPOBasket } from './CVCardProductOffer/CVCardProductOfferIcons';
import CVCardProductOfferTime from './CVCardProductOffer/CVCardProductOfferTime';
import { CVMoneyFormat } from './CVMethods';
import { COLORS } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {String} param0.image
 * @param {String} param0.title
 * @param {String} param0.width
 * @param {(String|Date)} param0.time
 * @param {[{image: String, price: (Number|String), offert_percent:(Number|String)}]} param0.products
 * @returns
 */
function CVCardProductOffer({
  image,
  title,
  products = [],
  width = '100%',
  time = false
}) {
  const history = useHistory();
  return (
    <Box width={width} marginBottom='1rem'>
      <Box
        style={{ borderRadius: '1.5rem 1.5rem 0px 0px' }}
        backgroundColor='#'>
        <CVImage image={image} borderRadius='1.5rem 1.5rem 0px 0px' />
      </Box>
      <Box marginTop='-2rem' style={{ borderRadius: '1.5rem 1.5rem 0px 0px' }}>
        <Box
          style={{ borderRadius: '1.5rem 1.5rem 0px 0px' }}
          backgroundColor='#FFFFFF'
          display='flex'
          height='85px'
          width='100%'
          justifyContent='space-around'
          alignItems='center'
          zIndex='10'
          position='relative'
          padding='0 1rem'>
          <Text fontWeight='bold' fontSize='1.2rem'>
            {title}
          </Text>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'>
            <Link to='/ofertas'>
              {false ? <CVCardProductOfferTime time={time} /> : CVCPOBasket}
            </Link>
            <Link
              to='/ofertas'
              style={{
                marginTop: '3px',
                padding: '0px 1rem',
                borderRadius: '1rem',
                color: '#FFFFFF',
                backgroundColor: '#00ADF6',
                fontSize: '1rem'
              }}>
              Ver Ofertas
            </Link>
          </Box>
        </Box>
        <SizeBox height='0.5rem' />

        <Box
          style={{ borderRadius: ' 0px 0px 1.5rem 1.5rem' }}
          backgroundColor='#FFFFFF'
          display='flex'
          height='190px'
          width='100%'
          paddingBottom='1rem'
          paddingTop='1rem'
          justifyContent='space-around'>
          {products.map((item) => (
            <Box
              key={v4()}
              flex='50%'
              maxWidth='50%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              onClick={() =>
                item.slug && history.push(`/producto/${item.slug}`)
              }
              flexDirection='column'>
              <CVImage image={item.image} width='80%' borderRadius='0.5rem' />

              <Text textAlign='center' fontSize='1.25rem' fontWeight='bold'>
                {CVMoneyFormat({ amount: item.price })}
              </Text>
              <Flex justifyContent='space-around' alignItems='center'>
                <CVText
                  fontSize='0.85rem'
                  textDecoration='line-through'
                  color='gray'>
                  {CVMoneyFormat({
                    amount: oferPricePublic({
                      percentage_oferta: eval(item.offert_percent),
                      precio: eval(item.price)
                    })
                  })}
                </CVText>
                <SizeBox />
                <Box
                  fontSize='0.75rem'
                  padding='1px 8px'
                  fontWeight='bold'
                  rounded='1rem'
                  color='#FFFFFF'
                  backgroundColor={COLORS['red']}>
                  - {item.offert_percent}%
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CVCardProductOffer;
