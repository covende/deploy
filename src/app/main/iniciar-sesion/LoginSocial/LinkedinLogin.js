import React, { useState } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';

// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import { svgLinkedin } from './_styles';

function LinkedinLogin(props) {
  const [state, setState] = useState({
    code: '',
    errorMessage: ''
  });

  const handleSuccess = (data) => {
    responseLinkedin(data);
    console.log('handleSuccess.data', data);
    setState({
      code: data.code,
      errorMessage: ''
    });
  };

  const handleFailure = (error) => {
    console.log('handleFailure.error', error);
    setState({
      code: '',
      errorMessage: error.errorMessage
    });
  };
  const responseLinkedin = (response) => {
    if (response !== undefined) {
      console.log('responseLinkedin.code', response.code);
      props.login(
        {
          isSocial: true,
          typeSocial: 'linkedin',
          accessToken: response.code
        },
        props.history
      );
    }
  };

  return (
    <LinkedIn
      clientId={process.env.LINKEDIN_API_KEY}
      onFailure={handleFailure}
      onSuccess={handleSuccess}
      redirectUri={`${process.env.APP_URL}/linkedin`}
      scope='r_liteprofile,r_emailaddress'
      state='random_string'
      supportIE
      renderElement={({ onClick, disabled }) => (
        <a onClick={onClick} disabled={disabled}>
          {svgLinkedin}
        </a>
      )}></LinkedIn>
  );
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth.BuyerSeller;
  return { user, loading, error };
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(ActionsAuth.BuyerSeller.login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkedinLogin);
