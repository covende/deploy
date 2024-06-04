import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { BANK_COMPANY_BY_ID } from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import { Container, Flex, Text } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CVButton, CVCheck, CVInput } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { BsWhatsapp } from 'react-icons/bs';

function MiAccountBank({ storeID, onOpen, permisions }) {
  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState({
    titular: '',
    bank: '',
    numeroCC: '',
    numeroCCI: ''
  });

  const [bank, setBank] = useState([]);

  const initdata = async () => {
    const result = await AxiosGQL(BANK_COMPANY_BY_ID(storeID));
    setAccount({ ...result.companyAccountBank[0] });
  };

  useEffect(() => {
    initdata();
    return () => {
      setAccount({}); // This worked for me
    };
  }, []);

  return (
    <Box>
      <Text fontSize='1.5rem' fontWeight='bold' textColor='#00ADF6'>
        Datos bancarios
      </Text>

      <Container>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <CVInput
              title='Titular de la cuenta bancaria'
              placeholder='Empresa de distribución VitaC'
              titleColor={COLORS['blue']}
              titleOrientation='column'
              value={account.titular}
              disabled={true}
              onChange={(value) => setAccount({ ...account, titular: value })}
              /*
              error={
                account.titular == '' ||
                !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/.test(account.titular)
              }*/
            />
          </Grid>
          <Grid item md={12}>
            <CVInput
              title='Banco'
              placeholder='BBVA Continental'
              titleColor={COLORS['blue']}
              titleOrientation='column'
              disabled={true}
              value={account?.bank?.title || ''}
              onChange={(value) => setAccount({ ...account, banco: value })}
            />
          </Grid>
          <Grid item md={12}>
            <CVInput
              title='Nº de cuenta'
              titleColor={COLORS['blue']}
              titleOrientation='column'
              placeholder='Ingreso los 20 dígitos de tu cuenta con guiones'
              value={account.numeroCC}
              disabled={true}
              onChange={(value) => setAccount({ ...account, numeroCC: value })}
              maxLength='20'
              error={
                account.numeroCC == '' || !/^[\-0-9]{14}/.test(account.numeroCC)
              }
              errorMessage='Campo Obligatorio (20 caracteres númericos con guiones)'
            />
          </Grid>
          <Grid item md={12}>
            <CVInput
              title='Nº de cuenta interbancaria (CCI)'
              titleColor={COLORS['blue']}
              titleOrientation='column'
              placeholder='Ingreso los 20 dígitos de tu CCI con guiones'
              value={account.numeroCCI}
              disabled={true}
              onChange={(value) => setAccount({ ...account, numeroCCI: value })}
              maxLength='20'
              error={
                account.numeroCCI == '' ||
                !/^[\-0-9]{20}/.test(account.numeroCCI)
              }
              errorMessage='Campo Obligatorio (20 caracteres númericos con guiones)'
            />
          </Grid>
          {/* <Grid item md={12}>
            {permisions.crear && (
              <CVButton backgroundColor='blue' onClick={onOpen}>
                Añadir otra cuenta bancaria
              </CVButton>
            )}
          </Grid> */}
          <Grid item md={12}>
            {/*
            <Flex alignItems='center'>
              <CVCheck
                titleAlign='left'
                value={account.inWhatapp}
                onChange={(value) =>
                  setAccount({ ...account, inWhatapp: value })
                }
                title='Quiero recibir alertas sobre el estado de mis pedidos por WhatsApp'
              />
              <span style={{ color: 'green', fontSize: '2rem' }}>
                <BsWhatsapp />
              </span>
            </Flex>
             */}
          </Grid>
          {/* <Grid item md={12}>
            <Flex justifyContent='center'>
              {permisions.crear && (
                <CVButton isLoading={loading}>Guardar</CVButton>
              )}
            </Flex>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

export default MiAccountBank;
