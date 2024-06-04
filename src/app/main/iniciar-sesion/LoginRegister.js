import React from 'react';

import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/layout';
import { CVButton, CVLine, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useHistory, useLocation } from 'react-router-dom';

const StyledLoginRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  div {
    width: 100%;
    grid-gap: 0px;
    &:before {
      border: 0.5px solid #e0e0e0;
    }
    &:after {
      border: 0.5px solid #e0e0e0;
    }
  }

  button {
    width: 213px;
    height: 28px;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }
`;

function LoginRegister(props) {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <StyledLoginRegister>
      <SizeBox height='2rem' />
      <CVLine
        backgroundColor='white'
        lineHeight='1px'
        color='gray'
        titles={[
          '',
          <CVText color='black' display='flex'>
            <Flex width='175px !important' justifyContent='center'>
              ¿Eres nuevo en CoVende?
            </Flex>
          </CVText>,
          ''
        ]}
      />
      <SizeBox height='2rem' />

      <Flex justifyContent='center'>
        <CVButton
          backgroundColor='blue'
          width='100%'
          fontWeight='bold'
          fontSize='1.25rem'
          onClick={() => {
            window.localStorage.setItem('previous_link', pathname);
            history.push('/registrar-cuenta');
          }}>
          Crear cuenta
        </CVButton>
      </Flex>
    </StyledLoginRegister>
  );
}

export default LoginRegister;
