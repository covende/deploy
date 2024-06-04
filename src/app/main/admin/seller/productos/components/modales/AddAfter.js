import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import { Flex, useToast } from '@chakra-ui/react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { CVErrorTags } from '@CVTemplate/core/CVValidation';
import React from 'react';

function AddAfter({
  isOpen,
  onClose,
  gotoStart = () => {},
  gotoNext = () => {},
  loading = false
}) {
  const addToast = useToast();

  return (
    <CVModal
      header='Completar luego'
      colorHeader='white'
      bgHeader='primary'
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Flex width='100%'>
          <CVButton
            disabled={loading}
            isLoading={loading}
            variant='outlined'
            onClick={() => gotoStart()}>
            IR A INICIO
          </CVButton>
          <SizeBox />
          <CVButton
            disabled={loading}
            isLoading={loading}
            onClick={() => {
              if (CVErrorTags()) {
                CVAlertError({
                  addToast,
                  message: 'Corrija los errores en rojo'
                });
                onClose();
                return false;
              }
              gotoNext();
            }}>
            SEGUIR
          </CVButton>
        </Flex>
      }>
      <SizeBox />
      <CVText textAlign='center' color='blue'>
        <span style={{ fontWeight: 'bold' }}>
          Guardando creación de producto para otro momento,
        </span>{' '}
        recuerda que puedes volver cuando desees para seguir subiendo tu nuevo
        producto.
      </CVText>
    </CVModal>
  );
}

export default AddAfter;
