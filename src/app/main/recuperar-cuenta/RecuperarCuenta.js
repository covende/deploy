import React, { useState } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import { CVPanel, CVButton, CVText, CVInput } from '@CVTemplate/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVErrorTags, isEmail } from '@CVTemplate/core/CVValidation';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { RecaptchaContainer } from '../registrar-cuenta/RegistrarCuenta.styles';
import ReCAPTCHA from 'react-google-recaptcha';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { RESET_PASSWORD } from '@CVApi/core/webpublic/userData/UserReset';

function RecuperarCuenta() {
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [result, setresult] = useState(false);
  const [seeresult, setseeresult] = useState(false);
  const [norobot, setnorobot] = useState({
    captcha: true
  });
  const addToast = useToast();

  function onChangeCaptcha(value) {
    setnorobot({ ...norobot, captcha: value ? true : false });
  }

  const onSubmit = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Llene o corrija los campos obligatorios'
      });
      return false;
    }
    setloading(true);

    const { resetPassword } = await AxiosGQL(RESET_PASSWORD(email));
    setresult(resetPassword);
    setseeresult(true);
    setloading(false);
  };

  const senddata = () => (!errors ? seterrors(true, onSubmit) : onSubmit());

  return (
    <Flex justifyContent='center' minHeight='80vh' alignItems='center'>
      <CVPanel
        variant='box'
        style={{ maxWidth: '350px', height: 'auto', padding: '0px' }}>
        <Box maxWidth='350px' borderRadius='1rem' width='100%'>
          <Box
            backgroundColor={COLORS['blue']}
            borderRadius='1rem 1rem 0 0'
            padding='1rem'
            width='100%'>
            <CVText
              textAlign='center'
              fontSize='1.5rem'
              fontWeight='bold'
              color='white'>
              Restablecer Contraseña
            </CVText>
          </Box>
          <Flex
            flexDirection='column'
            alignItems='center'
            padding='1rem'
            width='100%'>
            <SizeBox />
            <CVText color='blue'>
              Ingresa tu email para enviarte un correo de recuperación:
            </CVText>
            <SizeBox />
            <CVInput
              value={email}
              onValidate={(value) => setemail(value)}
              error={errors && !isEmail(email)}
              errorMessage='Correo no válido'
            />
            <SizeBox />
            {/* <RecaptchaContainer>
              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITEKEY}
                onChange={onChangeCaptcha}
              />
            </RecaptchaContainer> */}
            <SizeBox />
            {seeresult ? (
              <CVText color={result ? 'green' : 'red'}>
                {result
                  ? 'Hemos enviado el mail correspondiente, revisa tu bandeja de entrada.'
                  : 'No hemos encontrado tu correo electrónico'}
              </CVText>
            ) : (
              <Box>
                <CVButton
                  isLoading={loading}
                  backgroundColor='green'
                  disabled={email == '' || !norobot.captcha || loading}
                  onClick={() => senddata()}>
                  CONTINUAR
                </CVButton>
              </Box>
            )}
            <SizeBox />
          </Flex>
        </Box>
      </CVPanel>
    </Flex>
  );
}

export default RecuperarCuenta;
