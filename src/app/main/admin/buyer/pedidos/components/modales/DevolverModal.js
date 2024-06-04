import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Flex } from '@chakra-ui/react';
import CVButton from '@CVTemplate/core/CVButton';
import CVLink from '@CVTemplate/core/CVLink';
import CVModal from '@CVTemplate/core/CVModal';
import CVText from '@CVTemplate/core/CVText';
import React from 'react';
import { useHistory } from 'react-router';

function DevolverModal({ isOpen, onClose, setmessage, seterror, pedido }) {
  const history = useHistory();
  const aceptar = () => {
    history.push(
      '/buyer/devoluciones/' +
        pedido.pedido_id +
        '/' +
        pedido.pedido_id +
        '/create'
    );

    setmessage(
      'El producto pertenece a una categoría que no permite devoluciones.'
    );
    seterror();
  };
  return (
    <CVModal
      header='Devolver Pedido'
      colorHeader='red'
      isOpen={isOpen}
      onClose={onClose}
      justifyContentFooter='center'
      footer={
        <CVButton onClick={aceptar} backgroundColor='red'>
          CONTINUAR
        </CVButton>
      }>
      <CVText color='blue' textAlign='center'>
        Haz clic en continuar si el pedido cumple con nuestras
      </CVText>
      <SizeBox />
      <Flex justifyContent='center'>
        <CVLink href='/terminos-y-condiciones' target='_blank'>
          <CVText
            color='blue'
            fontWeight='bold'
            textAlign='center'
            textDecoration='underline'>
            Políticas de devolución.
          </CVText>
        </CVLink>
      </Flex>

      <SizeBox />
    </CVModal>
  );
}

export default DevolverModal;
