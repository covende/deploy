import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex } from '@chakra-ui/layout';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import React from 'react';
import LoginSocial from '.';
import LoginConventional from '../LoginConventional';
import LoginRegister from '../LoginRegister';
import { StyledLoginTitle } from '../_styles';

function LoginCard() {
  return (
    <Flex
      justifyContent='end'
      position='relative'
      height='100%'
      alignItems='center'>
      <Box
        padding='2rem'
        width='100%'
        maxWidth={
          window.screen.width < SCREEN.xs.max
            ? `${window.screen.width - 50}px`
            : '450px'
        }
        backgroundColor='#FFFFFF'
        borderRadius='2rem'
        margin='2rem'
        display='flex'
        flexDirection='column'>
        <StyledLoginTitle>¡Qué bueno tenerte de vuelta!</StyledLoginTitle>
        <SizeBox />
        <LoginConventional />
        {/* <LoginSocial isRow width='100%' /> */}
        <LoginRegister />
      </Box>
    </Flex>
  );
}

export default LoginCard;
