import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function UserExist({
  isOpen,
  cancelRef,
  onClose,
  goto_store,
  tipeuser,
  setperson,
  person,
  setusuario,
  usuario,
  setTipeuser
}) {
  // return (
  //   <AlertDialog
  //     isCentered
  //     isOpen={isOpen}
  //     leastDestructiveRef={cancelRef}
  //     onClose={onClose}>
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader
  //           textAlign='center'
  //           fontSize='lg'
  //           fontWeight='bold'
  //           color='white'
  //           backgroundColor='var(--chakra-colors-twitter-500)'>
  //           ¡Usuario ya existe!
  //         </AlertDialogHeader>
  //         <AlertDialogBody>
  //           <CVText>
  //             Le informamos que existe una cuenta vinculada al correo
  //             electrónico ingresado.
  //           </CVText>
  //           <SizeBox />
  //           <CVText fontSize='0.85rem'>
  //             Guarde sus credenciales para su pronta visita.
  //           </CVText>
  //         </AlertDialogBody>

  //         <AlertDialogFooter>
  //           <CVButton onClick={onClose} variant='outlined'>
  //             Cancelar
  //           </CVButton>
  //           <SizeBox />
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );

  const changeType = () => {
    setperson({
      ...person,
      dni: tipeuser.user?.dni,
      nombres: tipeuser.user?.first_name,
      apellidoPaterno: tipeuser.user?.last_name,
      apellidoMaterno: ''
    });
    if (tipeuser.user?.dni == '')
      setTipeuser({
        ...tipeuser,
        exist: false,
        showPassword: false
      });
    onClose();
  };

  const rechaceNewtype = () => {
    setperson({
      ...person,
      dni: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: ''
    });
    setTipeuser({
      ...tipeuser,
      exist: false,
      showPassword: true
    });

    setusuario({
      ...usuario,
      email: ''
    });
    onClose();
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setusuario({
          ...usuario,
          email: ''
        });
        setTipeuser({
          ...tipeuser,
          exist: false,
          showPassword: true
        });
      }}
      header={
        tipeuser.type == 'Buyer'
          ? 'El correo está registrado como comprador'
          : '¡Usuario existente!'
      }
      size={tipeuser.type == 'Buyer' ? '3xl' : 'md'}
      bgHeader='green'
      colorHeader='white'>
      {tipeuser.type == 'Buyer' ? (
        <Flex>
          <Box p={7}>
            <CVText color='blue' textAlign='center'>
              Si desea registrarse con otro correo, ingrese el nuevo mail en el
              campo correspondiente.
            </CVText>
            <Box mt={5} onClick={() => rechaceNewtype()} cursor='pointer'>
              <CVText color='green' fontWeight='bold' textAlign='center'>
                Ingresar otro mail
              </CVText>
            </Box>
          </Box>
          <Box p={7} onClick={() => changeType()}>
            <CVText color='blue' textAlign='center'>
              Para crear una tienda con el mismo correo, haga clic en continuar.
            </CVText>
            <Box cursor='pointer' mt={5}>
              <CVText color='green' fontWeight='bold' textAlign='center'>
                Continuar
              </CVText>
            </Box>
          </Box>
        </Flex>
      ) : (
        <>
          <CVText color='blue' textAlign='center'>
          Se ha encontrado una cuenta asociada al correo electrónico
            ingresado.
          </CVText>
          <SizeBox />
          <CVText color='blue' fontWeight='bold' textAlign='center'>
          Por favor, proporcione otro correo electrónico
          </CVText>
          <SizeBox />
          <CVText color='blue' textAlign='center'>
          o inicie sesión para continuar si dejó algún formulario de registro pendiente.
          </CVText>
          <CVText color='blue' fontWeight='bold' textAlign='center'>
            <a href='https://www.covende.com/iniciar-sesion'>Iniciar sesión</a>
          </CVText>
        </>
      )}
    </CVModal>
  );
}

export default UserExist;
