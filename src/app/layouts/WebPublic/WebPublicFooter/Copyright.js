import React from 'react';
import styled from '@emotion/styled';
import themeCovende from '@/themeCovende';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

export const CopyrightContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto 0px;
  padding: 7px 14px;
  background: ${({ color }) => color || COLORS['primary']};
  color: ${({ textColor }) => textColor || '#FFFFFF'};
  font-family: 'Poppins';
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  text-align: ${({ textAlign }) => textAlign || 'center'};
`;

function Copyright(props) {
  const { company } = props;
  return (
    <CopyrightContainer {...props}>
      {'©'}
      <SizeBox />
      {new Date().getFullYear()} <SizeBox />
      <Link to='/'> {company} </Link>
      {' - Todos los derechos reservados.'}
    </CopyrightContainer>
    

    
  );
}

export default Copyright;
