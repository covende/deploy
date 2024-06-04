import { CVText } from '@/common/CovendeTemplate';
import {
  offerPrice,
  offerprice
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { v4 } from 'uuid';

function PVMayor({
  wholesale = [],
  price,
  offer_percentage,
  offer_type,
  offer_value
}) {
  return (
    <Box display='flex' flexWrap='wrap' fontFamily='Roboto'>
      {wholesale && wholesale.length > 0 ? (
        wholesale.map((item, index) => (
          <Flex key={v4()} direction='column' alignItems='center' margin='1rem'>
            <Text
              textAlign='center'
              color={
                eval(item.price + '') == eval(price + '') ? COLORS['blue'] : ''
              }
              // fontWeight={
              //   eval(item.price + '') == eval(price + '') ? 'bold' : 'normal'
              // }
              fontWeight='400'
              fontSize='14'>
              {wholesale.length - 1 == index
                ? ` mayor a ${item.minimum_order} unidades`
                : `${item.minimum_order} unidades  - ${item.maximum_order} unidades`}
            </Text>

            <Text
              textAlign='center'
              color={
                eval(item.price + '') == eval(price + '')
                  ? COLORS['primary']
                  : COLORS['blue']
              }
              fontWeight='900'
              fontSize='18'
              // fontWeight={
              //   eval(item.price + '') == eval(price + '') ? 'bold' : 'normal'
              // }
            >
              {(offer_value + '').length > 0
                ? CVMoneyFormat({
                    amount: offerPrice({
                      offer_type,
                      offer_value,
                      price: item.price
                    })
                  })
                : ''}
            </Text>
            <CVText
              fontFamily='Roboto'
              textDecoration='line-through'
              color='gray'
              fontWeight='500'
              fontSize='10'>
              {CVMoneyFormat({ amount: item.price })}
            </CVText>
          </Flex>
        ))
      ) : (
        <></>
      )}
    </Box>
  );
}

export default PVMayor;
