import React, { Suspense } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Helpers
import { isUserAuthenticated, getLoggedInUser } from '@/app/helpers/authUtils';

// Components
import Loading from '@/app/components/Loading';

// Layouts items
import { Wrapper } from './AuthBackofficeTopbar/_styles';

const Topbar = React.lazy(() => import('./AuthBackofficeTopbar'));
const Footer = React.lazy(() => import('./AuthBackofficeFooter'));

// Loading
const loading = () => <Loading>Cargando AuthLayout...</Loading>;

const AuthBackofficeLayout = (props) => {
  const isAuthTokenValid = isUserAuthenticated();
  const loggedInUserPlatform = getLoggedInUser();
  const loc = useLocation();
  const { from } = loc.state || { from: { pathname: '/bo' } };
  const children = props.children || null;

  const renderRedirect = () => {
    if (loggedInUserPlatform?.platformID === 'PBO' && isAuthTokenValid) {
      return <Redirect to={from} />;
    }
  };

  return (
    <Wrapper>
      {renderRedirect()}
      <Suspense fallback={loading()}>
        <Topbar {...props} />
      </Suspense>
      <Suspense fallback={loading()}>{children}</Suspense>
      <Footer />
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth
});

export default connect(mapStateToProps)(AuthBackofficeLayout);
