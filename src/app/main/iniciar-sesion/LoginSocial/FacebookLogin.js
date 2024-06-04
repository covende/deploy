import React from 'react';

// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import FacebookLogin from 'react-facebook-login';

import { svgFB } from './_styles';

function LoginFacebook(props) {
  const componentClicked = (data) => {
    console.log('data', data);
  };

  const responseFacebook = (response) => {
    if (response !== undefined) {
      props.login(
        {
          isSocial: true,
          typeSocial: 'facebook',
          accessToken: response.accessToken
        },
        props.history
      );
    }
  };

  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_APP_ID}
      fields='name,email,picture'
      onClick={() => componentClicked()}
      callback={responseFacebook}
      cssClass=''
      icon={svgFB}
      textButton=''
      tag='a'
    />
  );
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(ActionsAuth.BuyerSeller.login(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginFacebook);
