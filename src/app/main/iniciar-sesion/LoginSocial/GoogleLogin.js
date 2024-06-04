import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import GoogleLogin from 'react-google-login';

import { svgGoogle } from './_styles';

function LoginGoogle(props) {
  const responseGoogle = (response) => {
    if (response !== undefined) {
      props.login(
        {
          isSocial: true,
          typeSocial: 'google',
          accessToken: response.accessToken
        },
        props.history
      );
    }
  };
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={(renderProps) => (
        <a onClick={renderProps.onClick} disabled={renderProps.disabled}>
          {svgGoogle}
        </a>
      )}
      icon={svgGoogle}
    >
      {svgGoogle}
    </GoogleLogin>
  );
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth.BuyerSeller;
  return { user, loading, error };
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(ActionsAuth.BuyerSeller.login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginGoogle);
