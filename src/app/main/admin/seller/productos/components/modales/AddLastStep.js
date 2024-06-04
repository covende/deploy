import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
function AddLastStep({ isOpen, onClose, gotoConfirm, loading }) {
  return (
    <CVModal
      bgHeader='primary'
      colorHeader='white'
      isOpen={isOpen}
      onClose={onClose}
      header='Último paso'
      footer={
        <Flex justifyContent='center' width='100%'>
          <Box>
            <CVButton
              isLoading={loading}
              disabled={loading}
              onClick={() => gotoConfirm()}>
              CONFIRMAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText color='blue'>
        ¿Confirmas que todos los campos han sido rellenados verídicamente y
        están listos para su revisión?
      </CVText>
    </CVModal>
  );
}

export default AddLastStep;
