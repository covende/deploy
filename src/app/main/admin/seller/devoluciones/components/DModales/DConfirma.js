import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CVButton, CVCheckBox } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function DConfirma({ isOpen, onClose, iddevolucion }) {
  const confirma = () => {
    console.log(iddevolucion);
  };
  const [conformidad, setConformidad] = useState(['reembolso', 'producto']);
  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton style={{ color: '#004772' }} />
        <ModalBody>
          <Stack padding='2rem'>
            <CVCheckBox
              onChange={(values) => {
                setConformidad(values);
              }}
              value={conformidad}
              options={[
                {
                  text: 'Doy mi conformidad al producto devuelto. Procedan con el reembolso al comprador.',
                  value: 'reembolso'
                },
                {
                  text: 'No estoy conforme con el producto devuelto.',
                  value: 'producto'
                }
              ]}
            />
          </Stack>
          <Flex justifyContent='center'>
            <CVButton onClick={confirma}>Enviar</CVButton>
            <SizeBox />
            <CVButton backgroundColor='red' onClick={() => onClose()}>
              Cancelar
            </CVButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DConfirma;
