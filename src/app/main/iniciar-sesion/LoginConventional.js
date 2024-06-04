import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';
import { userService } from '@/app/api/graphql';

import { StyledLoginConventional } from './LoginConventional.styles';
// import { Link, useHistory } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { CVButton, CVInput, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVErrorTags,
  isEmail,
  isPassword,
  isPasswordBasic
} from '@/common/CovendeTemplate/CVValidation';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { Flex } from '@chakra-ui/react';
// import { Link } from '@/../node_modules/@material-ui/icons/index';
import { Link } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@/../node_modules/@material-ui/icons/index';

function LoginConventional({ auth, login }) {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [isExistUserEmail, setIsExistUserEmail] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [res, setres] = useState();
  const addToast = useToast();
  const { url } = useSelector((state) => state.CardProduct);
  const history = useHistory();
  const { pathname } = useLocation();

  const [errors, seterrors] = CVUseStateCallback(false);

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setcredentials] = useState({
    email: '',
    password: ''
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateUserByEmail = (value) => {
    setcredentials({ ...credentials, email: value });
    if (isEmail(value)) {
      userService.fetchByEmail({ email: value }).then((res) => {
        setIsOpenTooltip(!res);
        setIsExistUserEmail(!!res);
        setres(res);
      });
    }
  };

  const callback = (isLogged, role = '') => {
    if (!isLogged) {
      CVAlertError({ addToast, message: role });
      return false;
    }

    dispatch(A_CARD_PRODUCT({ carrito_login: !login }));
    if (url != '' && res.type && isLogged) {
      history.push(
        url.includes('pedidos') ? `/${role.toLocaleLowerCase()}${url}` : url
      );
      dispatch(A_CARD_PRODUCT({ url: '' }));
    }
  };

  const sendata = async () => {
    if (isLoading) return;

    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    setIsLoading(true);

    login({
      ...credentials,
      setIsLoading,
      callback
    });
  };

  const onSubmit = () => {
    !errors ? seterrors(true, sendata) : sendata();
  };

  return (
    <StyledLoginConventional>
      <CVInput
        onEnter={() => onSubmit()}
        title='Correo Electrónico:'
        titleOrientation='column'
        placeholder='ejm: xyz@gmail.com'
        error={errors && !isEmail(credentials.email)}
        // error={errors && (!isEmail(credentials.email) || isOpenTooltip)}
        errorMessage='*Campo requerido. Correo electrónico no válido'
        value={credentials.email}
        onValidate={(value) => {
          setcredentials({ ...credentials, email: value });
        }}
        // onValidate={(value) => validateUserByEmail(value)}
        width='100%'
      />
      <SizeBox />
      <div    style={{ position: 'relative', width: '100%' }}>
  <CVInput
    type={showPassword ? 'text' : 'password'}
    onEnter={() => onSubmit()}
    title='Contraseña:'
    titleOrientation='column'
    value={credentials.password}
    onValidate={(value) => {
      setcredentials({ ...credentials, password: value });
    }}
    autoComplete='nope'
    placeholder='Ingrese su contraseña'
    width='100%'
  
  />
 <span onClick={toggleShowPassword} style={{ position: 'absolute', right: 15, top: '72%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
    {showPassword ? <Visibility /> : <VisibilityOff />}
  </span>
</div>

      <SizeBox height='2rem' />
      <Flex>
        <Link
          component='button'
          underline='none'
          onClick={(e) => {
            window.localStorage.setItem('previous_link', pathname);
            history.push('/recuperar-cuenta');
          }}>
          <CVText color='blue'>¿Has olvidado tu contraseña?</CVText>
        </Link>
      </Flex>
      <SizeBox height='2rem' />

      <CVButton
        disabled={isLoading}
        isLoading={isLoading}
        width='100%'
        fontWeight='bold'
        fontSize='1.25rem'
        onClick={() => onSubmit()}>
        INICIAR SESIÓN
      </CVButton>
    </StyledLoginConventional>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Auth.BuyerSeller
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(ActionsAuth.BuyerSeller.login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginConventional);
