import React, { useEffect, useState } from 'react';

import { Box, Text, Input, Center } from '@chakra-ui/react/';
import CVSelect from '../CVSelect';
import styled from 'styled-components';
// import Input from '@/../../../../Library/Caches/typescript/4.1/node_modules/postcss/lib/input';

const showFilas = [
  { text: '10', value: '1' },
  { text: '20', value: '2' },
  { text: '30', value: '3' },
  { text: 'Todos', value: '4' }
];

const ContentButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #b1b1b1;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ invert }) => (invert ? 'rotate(-180deg)' : '')};
`;
const iconNext = (
  <svg
    width='8'
    height='9'
    viewBox='0 0 8 9'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M6.90239 3.92807C7.26653 4.20117 7.26653 4.75389 6.90239 5.027L4.21035 7.04928L1.889 8.79195C1.43383 9.13009 0.790039 8.81148 0.790039 8.23925V4.47426V0.709301C0.790039 0.14358 1.43383 -0.181531 1.889 0.156601L4.21035 1.89928L6.90239 3.92807Z'
      fill='#36A7DF'
    />
  </svg>
);

const lineIcon = (
  <svg
    width='1'
    height='9'
    viewBox='0 0 1 9'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <line
      x1='0.35'
      y1='0.35'
      x2='0.35'
      y2='8.65'
      stroke='#00ADF6'
      strokeWidth='0.7'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const CVRangePagination = ({ data, setShowValues }) => {
  const [valuePagination, setValuePagination] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [newCurrentPage, setNewCurrentPage] = useState(1);

  const getTotalPages = () => {
    let totalData = data.length;
    return Math.ceil(totalData / (valuePagination * 10));
  };

  const validatePage = (value) => {
    return value <= getTotalPages() && value > 0;
  };

  const handleChange = (ev) => {
    setNewCurrentPage(ev.target.value);
  };

  useEffect(() => {
    if (!validatePage(currentPage)) {
      console.info('Ingrese un paginación válida ctga');
    }
  }, [currentPage]);

  const cutData = () => {
    const valuePaginations = valuePagination * 10;
    const showData = data.slice(
      (currentPage - 1) * valuePaginations,
      currentPage * valuePaginations
    );
    setShowValues(showData);
  };
  useEffect(() => {
    if (currentPage !== '') {
      cutData();
    }
    return () => {
      setShowValues([]);
    };
  }, [newCurrentPage, valuePagination, currentPage]);

  return (
    <Box display='flex' justifyContent='end'>
      <Box
        display='flex'
        width='345px'
        justifyContent='space-between'
        alignItems='center'>
        <Text fontSize='12px' color='#9E9E9E'>
          Mostrar filas:{' '}
        </Text>
        <CVSelect
          value={valuePagination}
          options={showFilas}
          onChange={(e) => setValuePagination(e)}
          width='58px'
          borderRadius='4px'
          height='20px'
        />
        <Text fontSize='12px' color='#9E9E9E'>
          Ir a:
        </Text>
        <Input
          value={newCurrentPage}
          type='number'
          min={0}
          variant='outline'
          width='34px'
          height='20px'
          borderRadius='4px'
          onChange={handleChange}
          isInvalid={!validatePage(Number(newCurrentPage))}
          errorBorderColor='red.300'
        />
        <ContentButton
          onClick={() => {
            if (validatePage(parseInt(newCurrentPage))) {
              setCurrentPage(newCurrentPage);
            }
          }}>
          {lineIcon}
          {iconNext}
        </ContentButton>
        <Text fontSize='12px' color='#9E9E9E'>
          {currentPage} de {getTotalPages()}
        </Text>
        <ContentButton
          invert
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            } else {
              return null;
            }
          }}>
          {iconNext}
        </ContentButton>
        <ContentButton
          onClick={() => {
            if (currentPage < getTotalPages()) {
              setCurrentPage(Number(currentPage) + 1);
            } else {
              return null;
            }
          }}>
          {iconNext}
        </ContentButton>
      </Box>
    </Box>
  );
};

export default CVRangePagination;
