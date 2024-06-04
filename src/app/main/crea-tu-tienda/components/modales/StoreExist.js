import React from 'react';
import { CVModal, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function StoreExist({ isOpen, onClose }) {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='green'
      colorHeader='white'
      header='¡Cuenta existente!'>
      <CVText
        color='green'
        fontWeight='bold'
        textAlign='center'
        fontSize='1.25rem'>
        Ya existe una cuenta registrada con este RUC
      </CVText>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        Si deseas recuperar tu cuenta, escríbenos a{' '}
        <span style={{ fontWeight: 'bold' }}>recuperar@covende.com</span>
      </CVText>
    </CVModal>
  );
}

export default StoreExist;
