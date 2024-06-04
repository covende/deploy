import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLink, CVModal, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

function DProceso({ isOpen, onClose }) {
  return (
    <CVModal
      size='xl'
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Flex justifyContent='center' width='100%'>
          <CVLink
            text={
              <CVButton backgroundColor='blue'>Ver mis devoluciones</CVButton>
            }
            href='/buyer/devoluciones'
          />
          <SizeBox />
          <CVLink
            text={<CVButton backgroundColor='red'>Ver mis pedidos</CVButton>}
            href='/buyer/pedidos'
          />
        </Flex>
      }>
      <Flex alignItems='center' flexDirection='column'>
        <SizeBox />
        <FiCheckCircle style={{ fontSize: '3rem', color: COLORS['blue'] }} />
        <SizeBox />
        <CVText fontWeight='bold' fontSize='1.5rem' color='blue'>
          TU DEVOLUCIÓN ESTÁ SIENDO PROCESADA
        </CVText>
        <SizeBox />
        <CVText color='red' fontWeight='bold'>
          El vendedor tiene 3 días para responderte
        </CVText>
        <SizeBox />
        <CVText textAlign='center'>
          El vendedor deberá evaluar tu solicitud y responderte en un plazo de 3
          días hábiles. Superado este plazo la solicitud es aceptada
          automáticamente.
        </CVText>
        <SizeBox />
        <CVText textAlign='center'>
          Recibirás una notificación con la respuesta del vendedor.
        </CVText>
      </Flex>
    </CVModal>
  );
}

export default DProceso;
