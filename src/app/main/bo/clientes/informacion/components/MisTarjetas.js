import React, { useEffect, useState } from 'react';
import {
  Grid,
  GridItem,
  Box,
  Button,
  Link,
  Flex,
  Spacer
} from '@chakra-ui/react';

import DecorativeText from '../../components/DecorativeText';
import DataText2 from '../../components/DataText2';

import { v4 as uuidv4 } from 'uuid';
import {
  deleteCreditCard,
  listCreditCard
} from '@/app/api/graphql/customers/services/CreditCardService';
import { svgDelete } from '@/app/assets/images/SVG';
import { useToast } from '@chakra-ui/toast';
import { confirmAlert } from 'react-confirm-alert';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useSelector } from 'react-redux';
import { COMPANY_CREDITCARD } from '@/app/api/graphql/webbo/BClientService';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

function MisTarjetas() {
  const [creditcards, setCreditcards] = useState([]);
  const addToast = useToast();
  const { client } = useSelector((state) => state.Clients);

  const initialdata = async () => {
    const store_id = client?.store?._id;
    if (store_id) {
      var { companyCreditCard } = await AxiosGQL(COMPANY_CREDITCARD(store_id));
      setCreditcards(companyCreditCard);
    }
  };

  const deleting = async (_id) => {
    let ls = [...creditcards];
    ls = ls.filter((da) => da._id != _id);
    await deleteCreditCard(_id);
    setCreditcards(ls);
    CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
  };

  const deleteCredit = async (_id) => {
    confirmAlert({
      title: 'Eliminar Tarjeta',
      message: 'Esta seguro con eliminar esta cuenta?',
      buttons: [
        {
          label: 'Eliminar tarjeta',
          onClick: () => deleting(_id)
        },
        {
          label: 'Regresar a las tarjetas',
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
      {creditcards.map((item, idx) => (
        <Box key={uuidv4()} bg='#F2F2F2' w='100%' h='auto' p='10px 16px'>
          <Flex>
            <Grid>
              <DecorativeText>Nombre Titular:</DecorativeText>
              <DataText2>{item.titular ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText>Número de tarjeta:</DecorativeText>
              <DataText2>{item.numeroLast || ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText>Tipo de tarjeta 1:</DecorativeText>
              <DataText2>
                {item.tipotargeta ?? ''} {item.bank?.name ?? ''}
              </DataText2>
            </Grid>
            <Spacer />
            <Spacer />
            <Grid>
              <DecorativeText>Fecha vencimiento:</DecorativeText>
              <DataText2>{item.date ?? ''}</DataText2>
            </Grid>
            <Spacer />
            <Grid>
              <DecorativeText onClick={() => deleteCredit(item._id)}>
                {svgDelete}
              </DecorativeText>
            </Grid>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
}

export default MisTarjetas;
