import { ADD_PRODUCT_ATTRIBUTE } from '@/app/api/graphql/webseller/AttributeService';
import { Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal';
import React, { useState } from 'react';

import { useToast } from '@chakra-ui/toast';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Grid } from '@material-ui/core';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

export const normalize = (function () {
  let from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç',
    to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc',
    mapping = {};

  for (let i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
    const ret = [];
    for (let i = 0, j = str.length; i < j; i++) {
      const c = str.charAt(i);
      if (mapping.hasOwnProperty(c)) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join('');
  };
})();

function AddAttributeBo({ isOpen, onClose, process }) {
  const addToast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const createAttr = async () => {
    setLoading(true);

    const { addProductAttribute } = await AxiosGQL(ADD_PRODUCT_ATTRIBUTE(name));

    if (addProductAttribute.status) {
      process(addProductAttribute.productAttribute);
      setLoading(false);
      setName('');
      onClose();
      CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
      return false;
    }
    CVAlertError({ addToast, message: addProductAttribute.message });
    setLoading(false);
  };

  return (
    <Modal
      onClose={() => {
        setName('');
        onClose();
      }}
      size='xl'
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ color: '#004772' }}>
          <Text fontSize='1.5rem' fontWeight='bold'>
            Agregar Atributo
          </Text>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#004772' }} />
        <ModalBody>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CVInput
                title='Nombre'
                value={name}
                onChange={(value) => setName(value)}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <CVButton onClick={() => createAttr()} isLoading={loading}>
                Guardar
              </CVButton>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <CVButton
                onClick={() => {
                  setName('');
                  onClose();
                }}
                backgroundColor='red'>
                Cancelar
              </CVButton>
            </Grid>
          </Grid>
          <br />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddAttributeBo;
