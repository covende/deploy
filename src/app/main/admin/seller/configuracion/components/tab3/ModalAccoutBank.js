import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

import { Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { CVButton, CVInput } from '@/common/CovendeTemplate';

function ModalAccoutBank({ onClose, isOpen, newAccounts, setNewAccounts }) {
  const [loading, setLoading] = useState(false);
  const [newAccount, setNewAccount] = useState({
    titular: '',
    bank: '',
    numeroCC: '',
    numeroCCI: ''
  });

  const saveNewAccount = () => {
    setNewAccounts([...newAccounts, newAccount]);
    //console.log(newAccounts);
    onClose();
  };

  return (
    <Modal motionPreset='slideInBottom' onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Agregar cuenta Bancaria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <CVInput
                title='Titular d ela cuenta Bancaria'
                placeholder='ejm. Juan Peres de Emp.'
                value={newAccount.titular}
                onChange={(value) =>
                  setNewAccount({
                    ...newAccount,
                    titular: value
                  })
                }
              />
            </Grid>
            <Grid item md={12}>
              <CVInput
                title='Banco'
                placeholder='BBVA'
                value={newAccount.bank}
                onChange={(value) =>
                  setNewAccount({
                    ...newAccount,
                    bank: value
                  })
                }
              />
            </Grid>
            <Grid item md={12}>
              <CVInput
                title='Nº de cuenta (CC)'
                placeholder='Ingreso los 15 dígitos de tu CC con guiones'
                value={newAccount.numeroCC}
                onChange={(value) =>
                  setNewAccount({
                    ...newAccount,
                    numeroCC: value
                  })
                }
              />
            </Grid>
            <Grid item md={12}>
              <CVInput
                title='Nº de cuenta interbancaria (CCI)'
                placeholder='Ingreso los 20 dígitos de tu CCI con guiones'
                value={newAccount.numeroCCI}
                onChange={(value) =>
                  setNewAccount({
                    ...newAccount,
                    numeroCCI: value
                  })
                }
              />
            </Grid>

            <Grid item md={12}>
              <Flex justifyContent='center'>
                <CVButton
                  variant='outlined'
                  isLoading={loading}
                  onClick={() => saveNewAccount()}
                >
                  Guardar
                </CVButton>
              </Flex>
            </Grid>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalAccoutBank;
