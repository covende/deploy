import { iconHouse } from '@/app/main/crea-tu-tienda/components/CreateStoreIcons';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVText } from '@/common/CovendeTemplate';
import DetailPlane from '../DetailPlane';
import {
  Flex,
  Text,
  useDisclosure,
  Spacer,
  Center,
  Button
} from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BaseCommission from './BaseCommission';
import { GET_CURRENT_COMPANY_PLAN } from '@/app/api/graphql/webbo/BClientService';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '../../productos/redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVImage from '@CVTemplate/core/CVImage';
import { Link } from 'react-router-dom';
function OptionsPlan({ lista }) {
  return (
    <Box>
      {lista.map((item, i) => (
        <Flex key={i}>
          <Text my={5} fontSize='1.1rem'>
            {item.text}
          </Text>
          <Spacer></Spacer>
          <Box mt={2}>
            <svg
              width='21'
              height='21'
              viewBox='0 0 21 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <rect
                x='0.5'
                y='0.5'
                width='20'
                height='20'
                rx='2.5'
                fill='white'
                stroke='#00ADF6'
              />
              <path
                d='M6.06066 10.9393C5.47487 10.3536 4.52513 10.3536 3.93934 10.9393C3.35355 11.5251 3.35355 12.4749 3.93934 13.0607L6.06066 10.9393ZM9 16L7.93934 17.0607C8.24541 17.3667 8.66879 17.5257 9.10067 17.4966C9.53254 17.4676 9.93082 17.2534 10.1931 16.9091L9 16ZM18.1931 6.40906C18.6952 5.75011 18.568 4.80892 17.9091 4.30685C17.2501 3.80479 16.3089 3.93198 15.8069 4.59094L18.1931 6.40906ZM3.93934 13.0607L7.93934 17.0607L10.0607 14.9393L6.06066 10.9393L3.93934 13.0607ZM10.1931 16.9091L18.1931 6.40906L15.8069 4.59094L7.80685 15.0909L10.1931 16.9091Z'
                fill='#00ADF6'
              />
            </svg>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}
export default OptionsPlan;
