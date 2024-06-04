import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { iconwarning } from '../../BuyerPedidoIcons';

function ErrorModal({ isOpen, onClose, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent='center'>{iconwarning}</Flex>
          <Text align='center' color='#004772'>
            {message}
          </Text>
          <Text align='center' color='#004772' fontWeight='bold'>
            Lo sentimos
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ErrorModal;
