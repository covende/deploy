import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box
} from '@chakra-ui/react';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import { ICON_CART_ADD } from '../Iconos';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useHistory } from 'react-router';

function MWishList({ auth }) {
  const { whislist_added } = useSelector((state) => state.CardProduct);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClose = () => {
    dispatch(A_CARD_PRODUCT({ whislist_added: false }));
  };

  const gotoCart = () => {
    onClose();
    history.push('/wish-list');
  };

  // return (
  //   <Modal isOpen={whislist_added} onClose={onClose} size='3xl' isCentered>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader></ModalHeader>
  //       <ModalCloseButton />
  //       <ModalBody>
  //         <SizeBox />
  //         <Flex justifyContent='center'>{ICON_CART_ADD}</Flex>
  //         <SizeBox />

  //         <CVText fontSize='2rem' color='blue' textAlign='center'>
  //           ¡Añadido a tu lista de deseos!
  //         </CVText>
  //         <SizeBox />
  //       </ModalBody>

  //       <ModalFooter>
  //         <Flex width='100%' justifyContent='space-between'>
  //           <CVButton
  //             variant='outlined'
  //             color='blue'
  //             width='40%'
  //             onClick={() => onClose()}
  //           >
  //             SEGUIR COMPRANDO
  //           </CVButton>

  //           <CVButton
  //             backgroundColor='blue'
  //             width='40%'
  //             onClick={() => gotoCart()}
  //           >
  //             VER LISTA DE DESEOS
  //           </CVButton>
  //         </Flex>
  //       </ModalFooter>
  //     </ModalContent>
  //   </Modal>
  // );

  return (
    <CVModal
      isOpen={whislist_added}
      onClose={onClose}
      size='xl'
      bgHeader='green'
      colorHeader='white'
      header='Lo guardamos para ti'
      footer={
        <Flex width='100%' justifyContent='center'>
          <CVButton
            backgroundColor='green'
            width='50%'
            onClick={() => gotoCart()}>
            IR A MI LISTA DE DESEOS
          </CVButton>
        </Flex>
      }>
      <CVText
        color='green'
        textAlign='center'
        fontWeight='bold'
        fontSize='1.25rem'>
        Añadido a tu lista de deseos
      </CVText>
      <SizeBox />
      <CVText textAlign='center'>
        Encuentra los productos que más te gustaron para comprarlos después
      </CVText>
    </CVModal>
  );
}

export default MWishList;
