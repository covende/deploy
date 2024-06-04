import React from 'react';

import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import LinkedinLogin from './LinkedinLogin';
import {
  LoginSocialContainer,
  LoginSocialTitle,
  LoginSocialBody
} from './_styles';

function LoginSocial(props) {
  const { isRow, width } = props;
  const [isSignIn, setIsSignIn] = React.useState(false);

  // const iconOnClick = (typeSocial) => {
  //   if (isSignIn) {
  //     handleLogoutClick();
  //   }
  //   handleSignInClick(typeSocial);
  // };

  const handleSignInClick = (typeSocial, e) => {
    const API_URL_SOCIAL = `http://localhost:3000/auth/${typeSocial}`;
    window.open(API_URL_SOCIAL, '_self');
    setIsSignIn(true);
  };

  return (
    <LoginSocialContainer isRow={isRow} width={width}>
      <LoginSocialTitle>Inicia sesión con:</LoginSocialTitle>
      <LoginSocialBody>
        <FacebookLogin />
        <GoogleLogin />
        {/* <LinkedinLogin /> */}
      </LoginSocialBody>
    </LoginSocialContainer>
  );
}

export default LoginSocial;
