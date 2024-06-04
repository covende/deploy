import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import LoginCard from '@/app/main/iniciar-sesion/LoginSocial/LoginCard';
function MLogin() {
  const { carrito_login } = useSelector((state) => state.CardProduct);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(A_CARD_PRODUCT({ carrito_login: false }));
  };

  return (
    <Modal isOpen={carrito_login} onClose={onClose} size='2xl' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LoginCard />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MLogin;
