import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import CVText from '@CVTemplate/core/CVText';
import React from 'react';
import { Flex, useDisclosure, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { sendValidationCodeByEmail } from '@CVApi/core/webpublic/userData/UserValidationCode';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { activeSubAccount } from '@CVApi/core/subAccount/service';
import { useToast } from '@chakra-ui/toast';

function MActiveSubAccount({
  isOpen,
  onClose,
  user,
  process,
  showValidateCode
}) {
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const confirm = async () => {
    setLoading(true);

    if (!user.validated) {
      let resp = await sendValidationCodeByEmail(user.email);
      if (resp.code === 200) showValidateCode();
      else {
        CVAlertError({
          addToast,
          message: resp?.description || 'Validar la subcuenta en otro momento.'
        });
      }
    } else {
      let resp = await activeSubAccount(user.user_id, user.active);

      if (resp.status) {
        CVAlertSuccess({ addToast, message: resp.message });
        process();
      } else {
        CVAlertError({ addToast, message: resp.message });
      }
    }

    setLoading(false);
  };

  return (
    <CVModal
      colorHeader='white'
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header={
        !user.validated
          ? 'Validar Usuario'
          : user.active
          ? 'Activar Usuario'
          : 'Desactivar Usuario'
      }
      footer={
        <Flex justifyContent='center' width='100%'>
          <Box>
            <CVButton
              onClick={() => confirm()}
              disabled={loading}
              isLoading={loading}>
              CONFIRMAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />

      {!user.validated ? (
        <CVText textAlign='center' color='blue'>
          Para Activar la Subcuenta deberás validar el correo electrónico a
          continuación.
        </CVText>
      ) : user.active ? (
        <CVText textAlign='center' color='blue'>
          La Subcuenta estará activa en el marketplace de CoVende
        </CVText>
      ) : (
        <CVText textAlign='center' color='blue'>
          La Subcuenta estará deshabilitada en el marketplace de CoVende
        </CVText>
      )}
      <SizeBox />
    </CVModal>
  );
}

export default MActiveSubAccount;
