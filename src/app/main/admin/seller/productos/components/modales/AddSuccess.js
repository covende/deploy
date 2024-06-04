import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVModal, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';

function AddSuccess() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { success, product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();

  const closable = () => {
    dispatch(A_PRODUCTVIEW({ success: false }));
    onClose();
  };

  useEffect(() => {
    let isMounted = true;
    if (success) onOpen();
    return () => (isMounted = false);
  }, [success]);

  return (
    <CVModal isOpen={isOpen} onClose={closable} size='xl'>
      <SizeBox />
      <Flex justifyContent='center'>
        <FaCheckCircle style={{ color: COLORS['green'], fontSize: '4rem' }} />
      </Flex>
      <SizeBox />

      <CVText
        color='green'
        fontSize='1.8rem'
        fontWeight='bold'
        textAlign='center'>
        Tu producto fue guardado con éxito
      </CVText>
      <SizeBox />

      <CVText textAlign='center'>
        Tu producto será evaluado por Covende. Una vez aprobado, te llegará una
        notificación y tu producto será publicado.
      </CVText>
      <SizeBox />

      <CVText textAlign='center'>
        Si tu producto no es aprobado, te indicaremos los campos que debes
        completar y/o corregir.
      </CVText>
      <CVLine lineHeight='1px' color='gray' />
      <Flex width='100%' justifyContent='center'>
        {/* <CVLink href={'/seller/productos/update/' + product?.product_id}>
          <Box>
            <CVButton backgroundColor='green'>VER ESTADO</CVButton>
          </Box>
        </CVLink> */}
        <Box>
          <CVButton backgroundColor='green' onClick={() => closable()}>
            VER ESTADO
          </CVButton>
        </Box>
        <SizeBox />
        <Box>
          <CVButton onClick={() => closable()}>ACEPTAR</CVButton>
        </Box>
      </Flex>
    </CVModal>
  );
}

export default AddSuccess;
