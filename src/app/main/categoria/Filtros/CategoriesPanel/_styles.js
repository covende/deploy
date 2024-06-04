import React from 'react';
import styled from '@emotion/styled';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

export const CategoriesPanelTitle = styled.h2`
  margin: 0px;
  padding: 0px;
  color: #004574;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
`;

export const CategoriesItem = styled.div`
  margin-bottom: 8px;
  color: #4d4d4d;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  list-style: none;
  & a {
    color: black;
  }
  &:hover {
    a {
      color: ${COLORS['primary']};
    }
  }
`;

export const svgArrowRight = (
  <svg
    width='8'
    height='16'
    viewBox='0 0 8 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1 1L7 8L0.999999 15'
      stroke='#004772'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
