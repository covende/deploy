import React, { useEffect } from 'react';

import BackgroundSlider from 'react-background-slider';

// Helpers
import Utils from './utils';

import { ContentPage, StyledCardBody, StyledLoginTitle } from './_styles';

import LoginConventional from './LoginConventional';
import LoginSocial from './LoginSocial';
import LoginRegister from './LoginRegister';
import { Box, Flex } from '@chakra-ui/react';
import { CVCarrusel } from '@/common/CovendeTemplate';
import LoginCard from './LoginSocial/LoginCard';

export const Login = ({ bannersLogin, fetchBannerLogin }) => {
  useEffect(() => {
    fetchBannerLogin();
  }, []);

  return bannersLogin.loading ? null : bannersLogin.error ? (
    <ContentPage bgColor='#e4e4e4'>
      <h1>Revise su conexión a internet...</h1>
    </ContentPage>
  ) : (
    <ContentPage backgroundColor='#EFEFEF'>
      <BackgroundSlider images={Utils.inputDataProcessed(bannersLogin.data)} />
      {/* <Box
        position='absolute'
        display='flex'
        justifyContent='center'
        width='100vw'
        height='100vh'>
        <CVCarrusel
          datalist={(bannersLogin?.data || []).map((item, index) => (
            <CVImage width='auto' height='100%' image={item.image} />
          ))}
        />
      </Box> */}

      <LoginCard />
    </ContentPage>
  );
};

export default Login;
