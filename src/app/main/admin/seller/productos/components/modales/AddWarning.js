import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVModal, CVText } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import React from 'react';

function AddWarning({ isOpen, onClose, confirmar, cancelar, isLoading }) {
  return (
    <CVModal isOpen={isOpen} onClose={onClose}>
      <SizeBox />
      <CVText textAlign='center'>
        ¿Confirmas que todos los campos han sido rellenados verídicamente y
        están listos para su revisión?
      </CVText>
      <CVLine color='gray' lineHeight='1px' />
      <Flex justifyContent='space-between' width='100%'>
        <CVButton
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => confirmar()}
        >
          confirmar
        </CVButton>
        <SizeBox />
        <CVButton
          onClick={() => {
            onClose();
            cancelar();
          }}
          backgroundColor='red'
        >
          Cancelar
        </CVButton>
      </Flex>
    </CVModal>
  );
}

export default AddWarning;
