import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { v4 } from 'uuid';
import { CVRating, CVText } from '../..';
import { CVMoneyFormat } from '../../CVMethods';
import { COLORS } from '../../CVThemes';
import {
  oferPricePublic,
  offerPercentage,
  precios
} from '../CVCardProductMethod';
import iconDelivery from '@/app/assets/images/car-delivery-free.svg';
import CVImage from '@CVTemplate/core/CVImage';

const CVCardProductComponentInformation = ({
  isWhosale,
  product_name,
  puntuacion,
  precio_minimo,
  precio_maximo,
  precio,
  pedido_minimo,
  item,
  goto,
  offer_type,
  offer_value,
  percentage_oferta,
  offer,
  delivery_free,
  justifyContent = 'space-between',
  flexDirection = 'row',
  alignItems = 'center'
}) => {
  const opcional = () => {
    if (offer && offer_value) {
      return (
        <Flex justifyContent='start' alignItems='center'>
          <CVText
            fontFamily='Roboto'
            fontSize='12px'
            textDecoration='line-through'
            color='gray'>
            {CVMoneyFormat({ amount: precio })}
          </CVText>
          <SizeBox />
          <Box
            fontFamily='Roboto'
            fontSize='10px'
            padding='1px 8px'
            fontWeight='bold'
            rounded='1rem'
            color='#FFFFFF'
            backgroundColor={COLORS['red']}>
            -{' '}
            {offerPercentage({
              offer_type,
              offer_value,
              price: precio
            })}
            %
          </Box>
        </Flex>
      );
    }
    if (item.product_attributes.length > 0) {
      let containcolors = item.product_attributes.filter((attr) =>
        attr.name.toLowerCase().includes('color')
      );

      if (containcolors.length > 0) {
        return (
          <Flex overflow='auto'>
            {(containcolors[0].attribute_details || []).map((det, idx) =>
              idx < 5 ? (
                <Box
                  fontFamily='Roboto'
                  key={v4()}
                  boxShadow='0px 0px 1px 1px rgba(236,236,236,0.75)'
                  width='1.25rem'
                  height='1.25rem'
                  backgroundColor={det.color}
                  margin='0 0.25rem'
                  rounded='3px'></Box>
              ) : (
                <React.Fragment key={v4()}></React.Fragment>
              )
            )}
          </Flex>
        );
      }
    }
    if (item.company) {
      return (
        <CVText fontSize='0.85rem' color='gray' fontFamily='Roboto'>
          {item?.company?.comercial_name || item?.company?.social_razon || ''}
        </CVText>
      );
    }
    return <SizeBox />;
  };
  return (
    <div
      onClick={() => goto()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
      <div>
        {delivery_free && (
          <>
            <Box
              style={{
                borderRadius: '0 20px 20px 0',
                padding: '5px',
                backgroundColor: '#00ADF6',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 'bold',
                maxWidth: '140px'
              }}>
              <CVImage image={iconDelivery} width='auto' />
              <Flex>Envío GRATIS</Flex>
            </Box>
            <SizeBox />
          </>
        )}

        <CVText color='blue' variant='maxtext' lines='1' fontSize='10px'>
          {product_name}
        </CVText>
        <CVText
          variant='maxtext'
          color='blue'
          fontWeight='900'
          fontFamily='Roboto'
          fontSize='16px'>
          {precios({
            precio_minimo,
            precio_maximo,
            precio,
            ...(offer ? { offer_type, offer_value } : {})
            // offer_type,
            // offer_value
          })}
        </CVText>
        {opcional()}
        {/* <div className='product-name'></div> */}
        <SizeBox />
        <SizeBox />
      </div>

      <Flex
        justifyContent={justifyContent}
        alignItems={alignItems}
        flexDirection={flexDirection}>
        <CVRating puntuation={puntuacion} variant='simple' />
        {isWhosale ? (
          <CVText color='gray' fontSize='0.85rem' fontFamily='Roboto'>
            {pedido_minimo} (Pedido Mínimo)
          </CVText>
        ) : (
          <CVText color='gray' fontSize='0.85rem' fontFamily='Roboto'>
            {item.stock} Unidades
          </CVText>
        )}
      </Flex>
    </div>
  );
};

export default CVCardProductComponentInformation;
