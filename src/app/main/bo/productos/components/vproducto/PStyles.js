import { COLORS } from '@CVTemplate/core/CVThemes';
import styled from '@emotion/styled';
import React from 'react';

export const HeadStyle = styled.div`
  padding: 2rem;
  & table tbody tr th,
  table tbody tr td {
    padding: 0px;
  }
  & .MuiButton-contained {
    border-radius: 20px;
    text-transform: capitalize;
    color: #ffffff;
    height: 32px;
  }
`;

export const CustomTable = styled.table`
  //font-size: 0.85rem;
  width: 100%;
`;
export const CustomHead = styled.thead``;
export const CustomTbody = styled.tbody``;
export const CustomRow = styled.tr`
  & th:first-of-type div,
  & td:first-of-type div {
    border-radius: 10px 0px 0px 10px;
  }

  & th:last-of-type div,
  td:last-of-type div {
    border-radius: 0px 10px 10px 0px;
  }
`;
export const CustomTH = styled.th`
  padding: 0px;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    background-color: ${COLORS['blue']};
    color: #ffffff;
    margin: 3px 0px;
  }
`;
export const CustomTD = styled.td`
  padding: 0px;
  & div {
    color: ${({ fontColor }) => (fontColor ? fontColor : '#004772')};
    display: flex;
    justify-content: ${({ justifyContent }) =>
      justifyContent ? justifyContent : 'center'};
    align-items: center;
    min-height: 2rem;
    height: 100%;
    flex-direction: ${({ flexDirection }) =>
      flexDirection ? flexDirection : 'initial'};
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? backgroundColor : `${COLORS['primary'] + '20'}`};
    margin: 3px 0px;
    padding: 3px;
  }
`;
