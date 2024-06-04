import React, { Suspense, lazy } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// UI components
import { Breadcrumb } from '@/common/components';
import { Flex } from '@chakra-ui/react';

// Components
import Loading from '@/app/components/Loading';

// Helpers
import { isUserAuthenticated, getLoggedInUser } from '@/app/helpers/authUtils';
import { Box, Container } from '@material-ui/core';
import MenuWrapper from './BuyerSellerTopbar/MenuWrapper';
import { rolesidebar } from '@/app/helpers';

// Layouts items
const Topbar = lazy(() => import('./BuyerSellerTopbar'));
const Footer = lazy(() => import('./BuyerSellerFooter'));

// Loading
const loading = () => <Loading>BuyerSeller ...</Loading>;

const BuyerSellerLayout = (props) => {
  const isAuthTokenValid = isUserAuthenticated();
  const loggedInUserPlatform = getLoggedInUser();
  const loc = useLocation();
  const { from } = loc.state || { from: { pathname: '/iniciar-sesion' } };
  const children = props.children || null;

  const renderRedirectToLogin = () => {
    if (loggedInUserPlatform?.platformID !== 'PBS' || !isAuthTokenValid) {
      return <Redirect to={from} />;
    }
  };

  return (
    <Box
      padding='0px'
      maxWidth='100vw'
      width='100vw'
      height='100vh'
      position='relative'>
      {renderRedirectToLogin()}
      <Suspense fallback={loading()}>
        <Topbar {...props} />
      </Suspense>
      <Box
        bgcolor='#f2f2f2'
        style={{
          minHeight: `${
            rolesidebar() == 'BUYER' ? `calc(100vh - 99px)` : `1090px`
          }`,
          width: '100%'
        }}>
        <Flex
          width='100%'
          // maxWidth={`calc(100vw - ${
          //   window.screen.width < 624 ? '0' : '200'
          // }px)`}
        >
          <MenuWrapper />

          <Container
            maxWidth='xl'
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              overflow: 'hidden'
            }}>
            <Suspense fallback={loading()}>
              <Breadcrumb data={props.crumbs} rootLayoutPath='/seller' />
              {children}
            </Suspense>
          </Container>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default BuyerSellerLayout;
