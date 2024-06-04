import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

function UserRegister({ isOpen, cancelRef, onClose, goto_store }) {
  // return (
  //   <AlertDialog
  //     isCentered
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}>
  //     <AlertDialogOverlay>
  //       <AlertDialogContent borderRadius='1rem'>
  //         <AlertDialogHeader
  //           borderRadius='1rem 1rem 0px 0px'
  //           textAlign='center'
  //           fontSize='lg'
  //           fontWeight='bold'
  //           color='white'
  //           backgroundColor={COLORS['green']}
  //           height='2rem'></AlertDialogHeader>
  //         <AlertDialogBody>
  //           <CVText
  //             fontSize='1.5rem'
  //             textAlign='center'
  //             color='blue'
  //             fontWeight='bold'>
  //             Te enviamos un correo de confirmación
  //           </CVText>
  //           <SizeBox />
  //           <CVText color='blue' textAlign='center'>
  //             ¡Confirma el correo y seguirás en la creación de tu nueva tienda!
  //           </CVText>
  //         </AlertDialogBody>

  //         <AlertDialogFooter>
  //           <CVButton onClick={onClose} variant='outlined'>
  //             Aceptar
  //           </CVButton>
  //           <SizeBox />
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );

  return (
    <CVModal
      bgHeader='green'
      colorHeader='white'
      isOpen={isOpen}
      onClose={onClose}
      header='Confirma tu correo'>
      <CVText
        color='green'
        fontWeight='bold'
        textAlign='center'
        fontSize='1.25rem'>
        Te enviamos un correo de confirmación
      </CVText>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        ¡Valida tu correo para continuar con la creación de tu tienda!
      </CVText>
    </CVModal>
  );
}

export default UserRegister;
