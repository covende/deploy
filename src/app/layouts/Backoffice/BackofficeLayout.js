import React, { Suspense, lazy, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// UI components
import { Breadcrumb } from '@/common/components';

// Layouts items
import Loading from '@/app/components/Loading';
import { isUserAuthenticated, getLoggedInUser } from '@/app/helpers/authUtils';
import { Wrapper, ContentPage } from './BackofficeLayout.styles';
import Sidebar from './BackofficeTopbar/Sidebar';
import { SCREEN } from '@CVTemplate/core/CVThemes';

// Components

// Helpers

const Topbar = lazy(() => import('./BackofficeTopbar'));
const Footer = lazy(() => import('./BackofficeFooter'));

// Loading
const loading = () => <Loading>Backoffice ...</Loading>;

const BackofficeLayout = (props) => {
  const isAuthTokenValid = isUserAuthenticated();
  const loggedInUserPlatform = getLoggedInUser();
  const loc = useLocation();
  const { from } = loc.state || { from: { pathname: '/bo/iniciar-sesion' } };
  const children = props.children || null;
  const [sideBarCollapse, setSideBarCollapse] = useState(
    window.screen.width <= SCREEN.sm.max
  );

  const renderRedirectToLogin = () => {
    if (loggedInUserPlatform?.platformID !== 'PBO' || !isAuthTokenValid) {
      return <Redirect to={from} />;
    }
  };

  return (
    <Wrapper>
      {renderRedirectToLogin()}
      <Topbar
        setSideBarCollapse={setSideBarCollapse}
        sideBarCollapse={sideBarCollapse}
        {...props}
      />
      <div id='page-wrapper'>
        <Sidebar collapse={sideBarCollapse} />
        <div id='page-content-wrapper'>
          <ContentPage
            padding={
              sideBarCollapse ? '16px 24px 16px 74px' : '16px 24px 16px 300px'
              // sideBarCollapse ? '16px 24px 16px 74px' : '16px 24px 16px 232px'
            }>
            <Suspense fallback={loading()}>
              <Breadcrumb data={props.crumbs} rootLayoutPath='/bo' />
              {children}
            </Suspense>
          </ContentPage>
          <Footer
            padding={
              sideBarCollapse ? '16px 24px 16px 74px' : '16px 24px 16px 300px'
              // sideBarCollapse ? '16px 24px 16px 74px' : '16px 24px 16px 232px'
            }
          />
        </div>
      </div>
    </Wrapper>
  );
};
export default BackofficeLayout;
