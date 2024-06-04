import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import styled from '@emotion/styled';

import { CVImage } from '@/common/CovendeTemplate';
import { SCREEN } from '@CVTemplate/core/CVThemes';

const Retail = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.76 19.9996H0L1.22 4.30957H18.54L19.76 19.9996Z'
      fill='#FFB93E'
    />
    <path
      d='M17.11 19.9996H2.65002L3.77002 8.44965C3.83002 7.84965 4.34002 7.38965 4.94002 7.38965H14.82C15.43 7.38965 15.93 7.84965 15.99 8.44965L17.11 19.9996Z'
      fill='#FFB93E'
      style={{ mixBlendMode: 'color-burn' }}
    />
    <path
      d='M6.51001 10.4102L8.88001 11.7102L9.87001 10.6902L11.47 11.8302L14.58 10.7602L16.4 12.7102L17.11 20.0002H6.87001L4.14001 17.1602L6.51001 10.4102Z'
      fill='#FFB93E'
      style={{ mixBlendMode: 'multiply' }}
    />
    <path
      d='M15.01 11.1202C15.49 11.6302 15.73 12.3402 15.73 13.2402V17.1602H13.37V13.5402C13.37 13.1802 13.27 12.9002 13.07 12.7002C12.87 12.5002 12.6 12.4002 12.26 12.4002C11.91 12.4002 11.63 12.5002 11.42 12.7102C11.22 12.9202 11.11 13.2102 11.11 13.5802V17.1702H8.76001V13.5502C8.76001 13.1902 8.66001 12.9102 8.46001 12.7102C8.26001 12.5102 7.99001 12.4102 7.65001 12.4102C7.30001 12.4102 7.02001 12.5102 6.82001 12.7202C6.61001 12.9302 6.51001 13.2202 6.51001 13.5902V17.1802H4.14001V10.4302H6.51001V11.4602C6.70001 11.1202 6.97001 10.8602 7.32001 10.6602C7.66001 10.4602 8.07001 10.3702 8.53001 10.3702C9.04001 10.3702 9.48001 10.4802 9.87001 10.7102C10.25 10.9402 10.55 11.2602 10.77 11.6702C11 11.2802 11.32 10.9602 11.71 10.7202C12.1 10.4802 12.54 10.3702 13.02 10.3702C13.87 10.3502 14.54 10.6102 15.01 11.1202Z'
      fill='white'
    />
    <path
      d='M18.17 3.94H14.52C14.08 1.7 12.11 0 9.75001 0C7.39001 0 5.42001 1.7 4.98001 3.94H1.59001C1.27001 3.94 1.01001 4.2 1.01001 4.52V5.54C1.01001 5.86 1.27001 6.12 1.59001 6.12H18.18C18.5 6.12 18.76 5.86 18.76 5.54V4.51C18.75 4.2 18.49 3.94 18.17 3.94ZM9.75001 2.01C11 2.01 12.05 2.82 12.44 3.94H7.06001C7.45001 2.82 8.50001 2.01 9.75001 2.01Z'
      fill='#FFA01C'
    />
  </svg>
);

const NotRetail = () => (
  <svg
    width='20'
    height='19'
    viewBox='0 0 20 19'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M18.48 18.0102H1.26999C1.03999 18.0102 0.859985 17.8302 0.859985 17.6002V2.7002H18.89V17.6002C18.89 17.8302 18.71 18.0102 18.48 18.0102Z'
      fill='#6AD9BE'
    />
    <path
      d='M17.17 18.0096H2.57996V7.12957C2.57996 6.53957 3.05996 6.05957 3.64996 6.05957H16.1C16.69 6.05957 17.17 6.53957 17.17 7.12957V18.0096Z'
      fill='#07BF93'
      style={{ mixBlendMode: 'multiply' }}
    />
    <path
      d='M19.43 3.52957H0.57C0.25 3.52957 0 3.26957 0 2.95957V1.87957C0 1.56957 0.25 1.30957 0.57 1.30957H19.43C19.74 1.30957 20 1.55957 20 1.87957V2.95957C20 3.26957 19.75 3.52957 19.43 3.52957Z'
      fill='#36CBA7'
    />
    <path
      d='M16.7001 3.53H3.06006V0.6C3.06006 0.27 3.33006 0 3.66006 0H16.1001C16.4301 0 16.7001 0.27 16.7001 0.6V3.53Z'
      fill='#17BF93'
    />
    <path
      d='M7.67003 8.26953L11.07 11.6595L14.35 8.26953L17.17 11.0395V18.0095H7.27003L4.91003 16.3595L7.67003 8.26953Z'
      fill='#52D2B4'
      style={{ mixBlendMode: 'multiply' }}
    />
    <path
      d='M7.67003 8.26953H4.91003V16.3595H7.17003V11.7695L8.67003 16.3595H9.63003V13.4195L7.67003 8.26953Z'
      fill='white'
    />
    <path
      d='M11.59 8.26953H14.35V16.3595H12.09V11.7695L10.59 16.3595H9.63V13.4195L11.59 8.26953Z'
      fill='white'
    />
    <path
      d='M17.26 7.16953H2.48998C2.20998 7.16953 1.97998 6.93953 1.97998 6.65953V5.77953C1.97998 5.49953 2.20998 5.26953 2.48998 5.26953H17.26C17.54 5.26953 17.77 5.49953 17.77 5.77953V6.65953C17.76 6.94953 17.54 7.16953 17.26 7.16953Z'
      fill='#17BF93'
    />
  </svg>
);

const CardStore = styled.div`
  background-color: #ffffff;
  position: relative;
  margin: 0.5rem;
  border-radius: 1.2rem;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${SCREEN.xs.max}px) {
    width: 160px;
    height: 160px;
  }
`;

function MTienda({ item, size = '230px' }) {
  return (
    <Link
      to={
        '/tienda/' +
        item._id +
        '/' +
        slugify(item.comercial_name || item.social_razon)
      }>
      <CardStore size={size}>
        <CVImage
          variant='avatar'
          width='150px'
          height='150px'
          name={item.comercial_name}
          image={item?.logo || item.image}
        />
        <Flex
          position='absolute'
          bottom='15px'
          right='15px'
          align='end'
          gap='5px'>
          <Retail />
          {item.type_of_sale != 'RETAIL' && <NotRetail />}
        </Flex>
      </CardStore>
    </Link>
  );
}

export default MTienda;
