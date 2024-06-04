import React, { useEffect } from 'react';
import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { Box, Text, Flex, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CVText from '@CVTemplate/core/CVText';
import { CVMoneyFormat, CVRenderHTML } from '@CVTemplate/core/CVMethods';

function CardPlan(props) {
  const { plan, planActive, setPlanActive, order, width } = props;
  useEffect(() => {
    if (!planActive) setPlanActive(plan);
  }, []);
  return (
    <Box
      onClick={() => {
        setPlanActive(plan);
      }}
      margin='1rem'
      height={width ? '250px' : '232px'}
      minWidth='300px'
      width={width ? width : '300px'}
      background={planActive?._id === plan?._id ? '#00ADF6' : '#DEDEDE'}
      color='white'
      borderRadius='16px'
      borderWidth='2px'
      borderStyle='solid'
      borderColor={planActive?._id === plan?._id ? '#00ADF6' : '#DEDEDE'}
      boxShadow={planActive?._id === plan?._id ? '0px 0px 5px grey' : 'none'}
      _hover={{
        background: '#00ADF6',
        borderColor: '#00ADF6'
      }}>
      <Text
        py='4px'
        fontSize='20px'
        fontStyle='normal'
        fontWeight='700'
        lineHeight='30px'
        letterSpacing='0em'
        textAlign='center'>
        {plan?.name || ''}
      </Text>
      <Box
        as='div'
        bg='white'
        p={2}
        color={planActive?._id === plan?._id ? '#004772' : '#DEDEDE'}
        display='block'
        height='calc(100% - 39px)'
        justifyContent='center'
        borderRadius='0px 0px 16px 16px'
        _hover={{
          color: '#004772'
        }}>
        <Center>
          <Flex mt='24px'>
            <Text
              textShadow={
                planActive?._id === plan?._id ? '-2px 0px 0px #004772' : 'none'
              }
              fontSize='30px'
              fontStyle='normal'>
              {/* {plan?.price ? `S/${eval(plan?.price || '0').toFixed(2)}` : ' - '} */}
              {plan?.price ? 'S/' + plan?.price : ' - '}
            </Text>

            <Text mt={5} fontSize='15px' fontStyle='normal' fontWeight='700'>
              ({plan?.periodo + ' meses' || ''})
            </Text>
          </Flex>
        </Center>
        {planActive?._id === plan?._id && planActive?.discount && (
          <CVText color='red' textAlign='center'>
            {' '}
            - {CVMoneyFormat({ amount: planActive?.discount })}
          </CVText>
        )}
        <Text
          fontSize='12px'
          fontStyle='normal'
          fontWeight='400'
          lineHeight='18px'
          letterSpacing='0em'
          textAlign='center'>
          {plan?.description || ''}
        </Text>
        {width && (
          <Box mx={5}>
            <pre
              style={{
                fontSize: '1rem',
                fontFamily: 'unset',
                color: '#4D4D4D'
              }}>
              {plan?.specifications || ''}
            </pre>
          </Box>
        )}

        {/* <Link
          target='_blank'
          to={
            '/crea-tu-tienda/plan-description/' +
            toBase64(JSON.stringify(planActive))
          }>
          <Text
            marginTop='48px'
            fontSize='12px'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='18px'
            letterSpacing='0em'
            textAlign='center'>
            Ver Plan y Tarifas & Comisiones.
          </Text>
        </Link> */}
      </Box>
    </Box>
  );
}

export default CardPlan;
