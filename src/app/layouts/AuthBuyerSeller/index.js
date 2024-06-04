import React, { Suspense } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Helpers
import { isUserAuthenticated, getLoggedInUser } from '@/app/helpers/authUtils';

// Components
import Loading from '@/app/components/Loading';

// Layouts items
import { Wrapper } from './AuthBuyerSellerTopbar/_styles';

const Topbar = React.lazy(() => import('./AuthBuyerSellerTopbar'));
const Footer = React.lazy(() => import('./AuthBuyerSellerFooter'));

// Loading
const loading = () => <Loading>Cargando AuthLayout...</Loading>;

const AuthBuyerSellerLayout = (props) => {
  const isAuthTokenValid = isUserAuthenticated();
  const loggedInUserPlatform = getLoggedInUser();
  const loc = useLocation();
  const { from } = loc.state || { from: { pathname: '/admin' } };
  const children = props.children || null;

  const renderRedirect = () => {
    if (
      loggedInUserPlatform?.platformID === 'PBS' &&
      isAuthTokenValid &&
      loc.pathname !== '/crea-tu-tienda'
    ) {
      let linkBefore = window.localStorage.getItem('previous_link');
      if (linkBefore) {
        from.pathname = linkBefore;
        window.localStorage.removeItem('previous_link');
      }
      return <Redirect to={from} />;
    }
  };

  return (
    <Wrapper>
      {renderRedirect()}

      <Suspense fallback={loading()}>
        <Topbar />
      </Suspense>
      <Suspense fallback={loading()}>{children}</Suspense>
      <Footer />
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth
});

export default connect(mapStateToProps)(AuthBuyerSellerLayout);
