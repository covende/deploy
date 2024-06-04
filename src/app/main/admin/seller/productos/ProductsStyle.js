import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(56.15deg, #00adf6 -6.12%, #85d9fc 97.77%);
  color: white;
  border-radius: 50%;
  border: 5px solid #d4f4ff;
`;

export const ParentsCategory = styled.div`
  background-color: #f5f8f9;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  height: 100%;
  & .MuiButton-label {
    justify-content: start;
  }
`;

export const ChildrenCategory = styled.div`
  padding: 1rem;
  border: 0.5px solid #c4c4c4;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  margin-left: 0.5rem;
  & .MuiButton-label {
    justify-content: start;
  }
`;

export const ContainerAttr = styled.div`
  & .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] {
    padding: 0px;
  }
`;

export const ContainerAttrDts = styled.div`
  padding: 1rem;
  border: 0.5px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  & .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] {
    padding: 0px;
  }
`;

export const TabContainer = styled.div`
  height: 100%;
  overflow: 'auto';
  width: 100%;
  max-width: 100%;
  border: 1px solid #efefef;

  & .MuiTab-root.Mui-selected {
    border-left: 10px solid #40adf6;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  & .MuiTouchRipple-root {
    border-radius: 0px;
  }

  & .chakra-button:first-of-type {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    text-transform: inherit;
    font-weight: inherit;
  }
  & button {
    background: white;
  }
  & button:hover {
    border-radius: 0px;
  }
`;
export const AddAttr = styled.div`
  position: relative;
  bottom: 0;
  padding-top: 1rem;
`;
export const TableStyle = styled.div`
  & tbody tr,
  & tbody td,
  & thead tr,
  & thead th {
    border: none;
    padding: 0px;
  }
  & tbody td > div,
  & thead th > div {
    margin-top: 2px;
    margin-bottom: 2px;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    height: 2rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
  & tbody tr td:first-of-type > div,
  & thead tr th:first-of-type > div {
    border-left: 1px solid #efefef;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    padding-left: 1rem;
  }
  & tbody tr td:last-child > div,
  & thead tr th:last-child > div {
    border-right: 1px solid #efefef;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    padding-right: 1rem;
  }
  & thead tr th > div {
    background-color: #efefef;
  }
  & thead tr th > div button,
  & tbody tr td > div button {
    padding: 0px;
    height: 1.2rem;
    width: 1.2rem;
    background-color: #ffffff;
    color: #c4c4c4;
  }
`;

export const BoxProgress = styled.div`
  width: 100%;
  min-width: 150px;
  margin-right: -1rem;
  flex-grow: 1;
  & .MuiLinearProgress-barColorPrimary {
    background: linear-gradient(90deg, #00adf6 50%, #65d1ff 75.76%);
    border-radius: 25px;
  }
`;

export const ProductSubTitle = ({ children }) => (
  <>
    <SizeBox />
    <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
      <Flex alignItems='center'>
        <FaCheckCircle style={{ color: COLORS['green'], fontSize: '1.5rem' }} />
        <SizeBox />
        {children}
      </Flex>
    </CVText>
    <SizeBox />
  </>
);
