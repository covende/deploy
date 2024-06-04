import React, { useState, useEffect } from 'react';
import { CVButton, CVInput, CVSelectMultiple } from '@/common/CovendeTemplate';
import { Grid } from '@material-ui/core';
import { Box, Text, Flex } from '@chakra-ui/react';
import icons from '../../assets/icons';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { SEARCH_FILTER } from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import { TermsComponent } from '../TermsComponent';
import { TermsV1 } from '../TerminosSeller.js/TermsSeller';
import TermV2 from '@CVPages/core/terminos-y-condiciones/termsVersions/TermV2';
import TermV1 from '@CVPages/core/terminos-y-condiciones/termsVersions/TermV1';
const termsAndConditions = [
 // { date: 'vigente a la fecha', nameTab: 'Actual', Component: <TermsV1 /> },
  {
    nameTab: 'Actual',
    Component: <TermV1 date='vigente a la fecha' />
  }
];

const TermsPolitics = ({ type }) => {
  const fetchSearch = async (e) => {
    const pag = 1;
    const item = 10;
    const searh = e;
    const res = await AxiosGQL(SEARCH_FILTER(pag, item, searh));
  };

  useEffect(() => {
    fetchSearch(' ');
  }, []);

  return (
    <>
      <Box
        bg={type === 'buyer' ? '#FF5454' : '#00ADF6'}
        borderRadius='8'
        mt='17px'
        display='flex'
        h='126px'
        justifyContent='space-around'
        alignItems='center'
        w='100%'
        p='0'>
        <Box mt={10}>{icons.LeftFaqiconSeller}</Box>

        <Grid xs={12} sm={12} md={6}>
          <Box mr={8} bg='#FFF' borderRadius='17px' mt='0'>
            <CVInput
              placeholder='Escribe lo que estás buscando'
              value=''
              iconFind={true}
              minWidth='559px'
              onChange={(e) => fetchSearch(e)}
              textFind='BUSCAR'
            />
          </Box>
        </Grid>
      </Box>
      <Flex mt={10}>
        <Box color='#00ADF6' fontWeight='bold'>
          <Text fontSize='4xl' fontWeight='extrabold'>
            Términos y Condiciones
          </Text>
          <TermsComponent data={termsAndConditions} />
        </Box>
      </Flex>
    </>
  );
};

export default TermsPolitics;
