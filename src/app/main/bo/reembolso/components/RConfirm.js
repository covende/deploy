import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useToast } from '@chakra-ui/react/';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { ADD_ACOUNT_DEPOSIT } from '@CVApi/core/webreembolso/ReemTypes';
import { CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import CVText from '@CVTemplate/core/CVText';
import React, { useState } from 'react';

const RConfirm = ({ isOpen, onClose, selected }) => {
  const [loading, setloading] = useState(false);
  const { user_id } = getLoggedInUser();
  const addToast = useToast();
  const process = async () => {
    setloading(true);
    AxiosGQL(ADD_ACOUNT_DEPOSIT(selected, user_id))
      .then((res) => {
        CVAlertSuccess({ addToast, message: 'Se marco como depositado' });
      })
      .catch((err) => console.log(err));
    console.log({ selected });
    setloading(false);
    onClose();
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      justifyContentFooter='center'
      footer={
        <>
          <CVButton onClick={() => onClose()} color='red' variant='outlined'>
            CANCELAR
          </CVButton>
          <SizeBox />
          <CVButton
            onClick={() => process()}
            isLoading={loading}
            disabled={loading}
            backgroundColor='blue'>
            CONFIRMAR
          </CVButton>
        </>
      }>
      <SizeBox />
      <CVText fontSize='1.5rem' color='blue'>
        ¿Confirmas que realizaste el depósito de estos reembolsos?
      </CVText>
    </CVModal>
  );
};

export default RConfirm;
