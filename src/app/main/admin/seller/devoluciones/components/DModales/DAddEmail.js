import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/react';
import { send_validation_code_by_devolution_email } from '@CVApi/core/webdevolucion/DevService';
import CVInput from '@CVTemplate/core/CVInput';
import { useToast } from '@chakra-ui/toast';
import { isEmail } from '@CVTemplate/core/CVValidation';
import React, { useState } from 'react';
import { tienda } from '../../../productos/redux/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { CVAlertError } from '@CVTemplate/core/CVAlert';

function DAddEmail({ isOpen, onClose, process, store_id }) {
  const { product } = useSelector((state) => state.ProductView);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const dispatch = useDispatch();
  const addToast = useToast();

  const sendCodeConfirmation = async () => {
    try {
      setLoading(true);
      if (!isEmail(email)) {
        setMessageError('Correo electrónico no válido (ejemplo@ejemplo.com)');
        setLoading(false);
        return;
      }

      let company_id = store_id || (await tienda(dispatch, product));

      let resp = await send_validation_code_by_devolution_email(
        email,
        company_id
      );

      if (resp.status) process(email);
      else CVAlertError({ addToast, message: resp.message });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <CVModal
      header='Agregar Correo de gestión de devoluciones'
      bgHeader='primary'
      isOpen={isOpen}
      onClose={onClose}
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton
              disabled={loading}
              onClick={sendCodeConfirmation}
              isLoading={loading}>
              Enviar código de confirmación
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText color='blue' fontWeight='600' fontSize='16px'>
        Correo Electrónico:
      </CVText>

      <Flex alignItems='end'>
        <CVInput
          value={email}
          onValidate={(value) => {
            setMessageError('');
            setEmail(value);
          }}
          placeholder='Ingrese su correo electrónico'
          width='100%'
          maxLength='80'
          error={messageError != ''}
          errorMessage={messageError}
        />
        <SizeBox />
      </Flex>
    </CVModal>
  );
}

export default DAddEmail;
