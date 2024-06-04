import React, { useState } from 'react';
import { CardBody } from '@/common/components';
import { userService } from '@/app/api/graphql';

import {
  Wrapper,
  svgShape,
  StyledLoginConventional
} from './IniciarSesionBo.styles';
import { Link } from 'react-router-dom';
import { CVButton, CVInput, CVText } from '@/common/CovendeTemplate';
import {
  CVErrorTags,
  isEmail,
  isPassword
} from '@/common/CovendeTemplate/CVValidation';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import { useToast } from '@chakra-ui/react';

// Form hooks

function IniciarSesionBo({ login, auth }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [isExistUserEmail, setIsExistUserEmail] = useState(false);
  const addToast = useToast();
  const [error, seterror] = CVUseStateCallback(false);

  const [credentials, setcredentials] = useState({
    email: '',
    password: ''
  });
  const validateUserByEmail = (value) => {
    setcredentials({ ...credentials, email: value });
    if (isEmail(value)) {
      userService.fetchByEmail({ email: value }).then((res) => {
        setIsOpenTooltip(!res);
        setIsExistUserEmail(!!res);
      });
    }
  };

  const senddata = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    setIsLoading(true);
    login({ ...credentials, setIsLoading });
  };

  const onSubmit = () => {
    !error ? seterror(true, senddata) : senddata();
  };

  return (
    <Wrapper>
      <CardBody
        margin='auto'
        padding='22px 44px'
        boxShadow='2px 3px 12px rgba(0, 0, 0, 0.15)'
        borderRadius='15px'
        width='474px'
        height='350px'>
        <StyledLoginConventional>
          <CVText fontWeight='bold' fontSize='2rem' textAlign='center'>
            INICIAR SESIÓN
          </CVText>
          <SizeBox />
          <CVInput
            onEnter={() => onSubmit()}
            title='Correo Electrónico:'
            titleOrientation='column'
            placeholder='ejm: xyz@gmail.com'
            error={error && (!isEmail(credentials.email) || isOpenTooltip)}
            errorMessage='*Campo requerido. Correo electrónico no válido'
            value={credentials.email}
            onValidate={(value) => {
              validateUserByEmail(value);
            }}
            width='100%'
          />

          <SizeBox />
          <CVInput
            onEnter={() => onSubmit()}
            title='Contraseña:'
            titleOrientation='column'
            value={credentials.password}
            onValidate={(value) => {
              setcredentials({ ...credentials, password: value });
            }}
            type='password'
            error={error && !isPassword(credentials.password)}
            errorMessage='*Campos requeridos.'
            autoComplete='nope'
            placeholder='Ingrese su contraseña'
            width='100%'
          />

          <SizeBox />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 100px',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '28px'
            }}>
            <Link to='/'>
              <span style={{ textColor: '#004772' }}>
                ¿Has olvidado tu contraseña?
              </span>
            </Link>
          </div>
          <SizeBox />

          <CVButton
            isLoading={isLoading}
            width='100%'
            onClick={() => onSubmit()}
            backgroundColor='red'>
            INICIAR SESIÓN
          </CVButton>
        </StyledLoginConventional>
      </CardBody>
      <div>{svgShape}</div>
    </Wrapper>
  );
}

export default IniciarSesionBo;
