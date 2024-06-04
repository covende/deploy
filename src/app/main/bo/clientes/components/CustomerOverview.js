import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';

// Components
import { Grid, Button, Text, Box, Flex, Spacer } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { customerService } from '@/app/api/graphql';

import { v4 } from 'uuid';
import { ClientesBoConfig, componentes } from './utils';
import { A_CLIENTS } from '../redux/actions';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { typeuser } from '@/app/helpers';
import {
  COMPANY_BY_OWNER,
  STATUS_STORE,
  USER_FIND
} from '@/app/api/graphql/webbo/BClientService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { useToast } from '@chakra-ui/toast';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { CVImage } from '@/common/CovendeTemplate';
import CVText from '@CVTemplate/core/CVText';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { boRolesActions } from '@/app/redux/actions';

function CustomerOverview() {
  let { idcustomer, tab } = useParams();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const routerHistory = useHistory();
  const { client } = useSelector((state) => state.Clients);
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState('-');
  const addToast = useToast();
  const [loading, setLoading] = useState(false);

  const routetab = (route) => {
    routerHistory.push('/bo/clientes/' + idcustomer + '/' + route);
  };
  const roles = useSelector((state) => state.Backoffice_Roles);

  useEffect(() => {
    let findUser =
      roles.data &&
      roles.data.find((rol) => rol.roleID === client.usuario?.role);
    if (findUser) setRoleName(findUser?.roleName);
  }, [roles, client]);

  const findbyid = async () => {
    dispatch(boRolesActions.fetch({ platformID: 'PBS' }));

    let customer = await customerService.fetchByID({ customer_id: idcustomer });
    let { userFind } = await AxiosGQL(USER_FIND(customer.user_id));
    const { companyByOwner } = await AxiosGQL(
      COMPANY_BY_OWNER(customer.user_id)
    );

    var store = {};
    if (companyByOwner.length > 0) {
      store = companyByOwner[companyByOwner.length - 1];
    }

    dispatch(
      A_CLIENTS({
        client: {
          ...customer,
          role: { name: roleName },
          usuario: userFind,
          store: store
        }
      })
    );

    setLoading(true);
  };

  const Activate = async ({ status, store_id }) => {
    let user = getLoggedInUser();
    const { statusstore } = await AxiosGQL(
      STATUS_STORE({
        store_id: store_id,
        status: status,
        user_id: user.user_id
      })
    );
    if (statusstore?.status) {
      CVAlertSuccess({
        addToast,
        message: statusstore?.message || 'Activado Correctamente'
      });
      dispatch(
        A_CLIENTS({
          client: {
            ...client,
            store: { ...client.store, status: status }
          }
        })
      );
    } else {
      CVAlertError({ addToast, message: statusstore.message });
    }
  };

  const changestatus = (status) => {
    const store_id = client?.store?._id;
    if (store_id) {
      Activate({ status, store_id });
    } else {
      window.alert('Usuario sin Tienda');
    }
  };

  useEffect(() => {
    findbyid();
  }, [client?.store?.status, roleName]);

  return (
    <Grid mb='16px' templateRows='repeat(2, max-content)' gap='16px'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        bg='#FFFFFF'
        w='100%'
        borderRadius='50px'
        p={4}
        color='#000000'>
        <CVImage
          variant='avatar'
          height='64px'
          width='auto'
          image={client?.usuario?.image || 'https://via.placeholder.com/150'}
          name={`${client?.last_name} ${client?.first_name}`}
        />
        <CVText>
          <Flex>
            ID: <SizeBox />
            {client?.custom_id}
          </Flex>
        </CVText>
        <CVText>
          <Flex>
            Cliente: <SizeBox />
            {`${client?.last_name} ${client?.first_name}`}
          </Flex>
        </CVText>
        <CVText>
          <Flex>
            Tipo: <SizeBox />
            {client?.role?.name}
          </Flex>
        </CVText>
        <CVText>
          <Flex>
            Estado: <SizeBox />
            <CVText
              fontWeight='bold'
              color={client?.flagValidated ? 'green' : 'red'}>
              {client?.flagValidated ? 'Verificado' : 'No Verificado'}
            </CVText>
          </Flex>
        </CVText>
        <Flex flexDirection='column'>
          <CVText>
            <Flex>
              Fecha de Creación: <SizeBox />
              {CVFormatDate({ date: client?.createdAt, time: true })}
            </Flex>
          </CVText>
          <CVText>
            <Flex>
              Fecha de Actualización: <SizeBox />
              {CVFormatDate({ date: client?.updatedAt, time: true })}
            </Flex>
          </CVText>
        </Flex>
        <Button
          onClick={() =>
            changestatus(
              client?.store?.status == 'APPROVED' ? 'LOCKED' : 'APPROVED'
            )
          }
          variant='solid'
          boxShadow='lg'
          p='2'
          height='32px'
          style={{
            color: '#FFFFFF',
            backgroundColor:
              client?.store?.status == 'APPROVED' ? '#FF5454' : '#00ADF6',
            fontSize: '1rem'
          }}>
          {client?.store?.status == 'APPROVED' ? 'Bloquear' : 'Activar'}
        </Button>
      </Box>
      <Flex justifyContent='space-between' wrap='wrap'>
        {ClientesBoConfig.map((item) => (
          <Button
            key={v4()}
            rounded='20px'
            onClick={() => routetab(item.id)}
            style={{
              background: tab == item.id ? '#00ADF6' : '#FFFFFF',
              color: tab == item.id ? '#FFFFFF' : '#000000',
              height: '32px',
              fontWeight: tab == item.id ? 'bold' : 'initial',
              textTransform: 'capitalize',
              fontSize: '1rem'
            }}>
            {item.name}
          </Button>
        ))}
      </Flex>
      {loading && <>{componentes[tab](searchParams)}</>}
      <Flex>
        <Spacer />
        <Link to='/bo/clientes'>
          <Button
            variant='outline'
            colorScheme='red'
            rounded='20px'
            height='32px'
            fontSize='1rem'>
            Regresar a la Lista de Clientes
          </Button>
        </Link>
        <Spacer />
      </Flex>
    </Grid>
  );
}

export default CustomerOverview;
