import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Box, Flex, Text } from '@chakra-ui/react';
import { delete_devolution_email } from '@CVApi/core/webdevolucion/DevService';
import { useToast } from '@chakra-ui/toast';
import React, { useState } from 'react';
import { tienda } from '../../../productos/redux/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';

function DDeleteEmail({ isOpen, onClose, process, store_id, email }) {
  const { product } = useSelector((state) => state.ProductView);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addToast = useToast();

  const deleteEmail = async () => {
    try {
      setLoading(true);
      let company_id = store_id || (await tienda(dispatch, product));
      let resp = await delete_devolution_email(company_id, email);

      if (resp.status) {
        CVAlertSuccess({ addToast, message: resp.message });
        process(email);
      } else CVAlertError({ addToast, message: resp.message });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Flex justifyContent='center' width='100%'>
          <Box w='50%'>
            <CVButton
              width='100%'
              isLoading={loading}
              disabled={loading}
              backgroundColor='red'
              onClick={() => deleteEmail(email)}>
              Eliminar correo
            </CVButton>
          </Box>
          <SizeBox />
          <Box w='50%'>
            <CVButton
              width='100%'
              onClick={onClose}
              variant='outlined'
              color='red'>
              Regresar
            </CVButton>
          </Box>
        </Flex>
      }>
      <Text textAlign='center' fontWeight='700' fontSize='18px'>
        Eliminar Correo
      </Text>
      <SizeBox />
      <Text textAlign='center' color='#4D4D4D' fontWeight='300' fontSize='14px'>
        Estas seguro que desea eliminar este correo
      </Text>
    </CVModal>
  );
}

export default DDeleteEmail;
