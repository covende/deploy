import React, { useEffect, useState } from 'react';
import { Grid, Box, Flex, Spacer } from '@chakra-ui/react';

import DecorativeText from '../../components/DecorativeText';
import DataText2 from '../../components/DataText2';

import { v4 as uuidv4 } from 'uuid';
import { deleteAccountBank } from '@/app/api/graphql/customers/services/AccountBackService';
import { svgDelete } from '@/app/assets/images/SVG';
import { useToast } from '@chakra-ui/toast';
import { confirmAlert } from 'react-confirm-alert';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useSelector } from 'react-redux';
import { COMPANY_ACCOUNT_BANK } from '@/app/api/graphql/webbo/BClientService';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

function CuentaBancaria() {
  const [accounts, setAccounts] = useState([]);
  const addToast = useToast();
  const { client } = useSelector((state) => state.Clients);

  const initialdata = async () => {
    let store_id = client?.store?._id;
    if (store_id) {
    }
    var { companyAccountBank } = await AxiosGQL(COMPANY_ACCOUNT_BANK(store_id));
    setAccounts(companyAccountBank);
  };

  const deleting = async (_id) => {
    let ls = [...accounts];
    ls = ls.filter((da) => da._id != _id);
    await deleteAccountBank(_id);
    setAccounts(ls);
    CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
  };

  const deleteAccount = async (_id) => {
    confirmAlert({
      title: 'Eliminar Cuenta Bancaria',
      message: 'Esta seguro con eliminar esta cuenta?',
      buttons: [
        {
          label: 'Eliminar cuenta',
          onClick: () => deleting(_id)
        },
        {
          label: 'Regresar a las cuentas',
          onClick: () => {}
        }
      ],
      overlayClassName: 'overlay-custom-class-name'
    });
  };

  useEffect(() => {
    initialdata();
  }, [client.store]);

  return (
    <Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(1, 1fr)'
      gap='16px'>
      {accounts.map((item, idx) => (
        <Box key={uuidv4()} bg='#F2F2F2' w='100%' h='auto' p='10px 16px'>
          <Flex>
            <Grid>
              <DecorativeText>Titular de la cuenta</DecorativeText>
              <DataText2>{item?.titular ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText>Banco</DecorativeText>
              <DataText2>{item.bank?.title ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText># Cuenta bancaria (CC):</DecorativeText>
              <DataText2>{item.numeroCC ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText># Cuenta interbancario (CCI):</DecorativeText>
              <DataText2>{item.numeroCCI ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText>Estado de cuenta:</DecorativeText>
              <DataText2>{item.status ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText onClick={() => deleteAccount(item._id)}>
                {svgDelete}
              </DecorativeText>
            </Grid>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
}

export default CuentaBancaria;
