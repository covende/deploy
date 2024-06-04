import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import { list_devolution_emails } from '@CVApi/core/webdevolucion/DevService';
import { useToast } from '@chakra-ui/toast';
import React, { useEffect } from 'react';
import { tienda } from '../../../productos/redux/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { CVAlertError } from '@CVTemplate/core/CVAlert';

import listEmail from '@/app/assets/images/list-email.svg';
import addEmail from '@/app/assets/images/add-email.svg';
import CVImage from '@CVTemplate/core/CVImage';

function DOptionsDevolution({
  isOpen,
  onClose,
  store_id,
  setList,
  setAdd,
  setEmails,
  emails = []
}) {
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const addToast = useToast();

  const init = async () => {
    try {
      let company_id = store_id || (await tienda(dispatch, product));
      let resp = await list_devolution_emails(company_id);

      if (resp.status) setEmails(resp.data);
      else CVAlertError({ addToast, message: resp.message });
    } catch (error) {}
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header='Correo de gestión de devoluciones'
      colorHeader='white'>
      <SizeBox />
      <Flex
        flexDirection='column'
        justifyContent='flex-center'
        alignItems='center'>
        {emails.length > 0 && (
          <CVButton
            width='90%'
            fontWeight='bold'
            height='3rem'
            onClick={() => {
              onClose();
              setList(true);
            }}>
            <div>
              <CVImage image={listEmail} width='auto' />
            </div>
            &nbsp; Lista de correos
          </CVButton>
        )}
        <SizeBox />
        <CVButton
          width='90%'
          fontWeight='bold'
          height='3rem'
          onClick={() => {
            onClose();
            setAdd(true);
          }}>
          <div>
            <CVImage image={addEmail} width='auto' />
          </div>
          &nbsp; Agregar correo
        </CVButton>
      </Flex>
    </CVModal>
  );
}

export default DOptionsDevolution;
