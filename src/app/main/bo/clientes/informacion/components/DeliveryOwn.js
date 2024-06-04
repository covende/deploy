import React, { useEffect, useState } from 'react';
import { Flex, Box, useToast, Button, Icon } from '@chakra-ui/react';
import DecorativeHeading from '../../components/DecorativeHeading';
import DecorativeText from '../../components/DecorativeText';
import DataText from '../../components/DataText';
import DataText2 from '../../components/DataText2';
import { Link } from 'react-router-dom';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  ACTIVE_DELIVERY_OWN,
  COMPANY_BY_OWNER,
  COMPANY_DIRECTIONS_BY_COMPANY,
  DELIVERY_OWN_BY_COMPANY,
  LIST_OF_STORE_SUBACCOUNTS
} from '@/app/api/graphql/webbo/BClientService';
import { useDispatch, useSelector } from 'react-redux';
import CVSwitch from '@CVTemplate/core/CVSwitch';

import { Grid } from '@material-ui/core';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { Table, Tbody, Td, Thead, Tr } from '@chakra-ui/table';
// import { Button } from '@chakra-ui/button';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { estadoBadge } from '@/common/utils/index';
import CVInputFileLink from '@CVTemplate/core/CVInputFileLink';
import CVButton from '@CVTemplate/core/CVButton';
import {
  activateRateDeliveryOwn,
  updateFileDeliveryOwnRate,
  updateStatusDeliveryOwnRate
} from '@CVApi/core/deliveryOwn/service';
import { A_CLIENTS } from '../../redux/actions';

function DeliveryOwn() {
  const { client } = useSelector((state) => state.Clients);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState({
    name: '',
    fileRate: '',
    statusFileRate: '',
    company_id: '',
    status: '',
    company_id: ''
  });

  const approveDeliveryOwn = async () => {
    setLoading(true);
    let resp = await activateRateDeliveryOwn(delivery.company_id);

    if (resp.status) {
      CVAlertSuccess({ addToast, message: resp.message });
      setDelivery({ ...delivery, status: 'APPROVED' });
      dispatch(
        A_CLIENTS({
          client: {
            ...client,
            store: { ...client.store, delivery_own_status: 'APPROVED' }
          }
        })
      );
    } else {
      CVAlertError({ addToast, message: resp.message || 'Error' });
    }

    setLoading(false);
  };

  const activeDeliveryOwn = async (value) => {
    let { activeDeliveryOwn: resp } = await AxiosGQL(
      ACTIVE_DELIVERY_OWN(delivery.company_id, value)
    );

    if (resp.status) {
      setActive(value);
      CVAlertSuccess({ addToast, message: resp.message });
    } else CVAlertError({ addToast, message: resp.message });
  };

  const updateFileRate = async (file) => {
    if (!file?.data) return;
    let resp = await updateFileDeliveryOwnRate(delivery.company_id, file.data);

    if (resp?.status) {
      setDelivery({
        ...delivery,
        fileRate: file.data,
        statusFileRate: 'PENDING',
        status: 'PENDING'
      });
      dispatch(
        A_CLIENTS({
          client: {
            ...client,
            store: { ...client.store, delivery_own_status: 'PENDING' }
          }
        })
      );
      CVAlertSuccess({ addToast, message: resp.message });
    } else {
      CVAlertError({ addToast, message: resp.message || 'Error' });
    }
  };

  const updateStatusFileRate = async (status) => {
    let resp = await updateStatusDeliveryOwnRate(delivery.company_id, status);

    if (resp?.status) {
      setDelivery({ ...delivery, statusFileRate: status });
      CVAlertSuccess({ addToast, message: resp.message });
    }
  };

  const initdata = async () => {
    let store_id = client?.store?._id;
    if (store_id) {
      const { getDeliveryOwn: resp } = await AxiosGQL(
        DELIVERY_OWN_BY_COMPANY(store_id)
      );

      if (resp.status) {
        if (resp.data) setDelivery(resp.data);
        else setDelivery({ ...delivery, company_id: store_id });
      }
      setActive(client?.store?.delivery_own || false);
    }
  };

  useEffect(() => {
    initdata();
  }, [client.store]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Flex>
          <CVText>Habilitar</CVText>
          <SizeBox />
          <CVSwitch
            variant='capsule'
            yesColor={active ? 'primary' : 'gray'}
            value={active}
            onChange={activeDeliveryOwn}
          />
        </Flex>
      </Grid>

      {active && client?.store?.delivery_own_status && (
        <>
          <Grid item xs={12}>
            <DecorativeHeading>{delivery.name}</DecorativeHeading>
          </Grid>

          <Grid item xs={12}>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Td>Nombre</Td>
                  <Td>Archivo</Td>
                  <Td>Estado</Td>
                  <Td>Acción</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <DecorativeText>Tarifas</DecorativeText>
                  </Td>
                  <Td>
                    <Flex alignItems='center'>
                      {delivery?.fileRate != '' && (
                        <a
                          style={{ marginRight: '5px' }}
                          href={delivery.fileRate}
                          target='_blank'>
                          <Box m={1}>
                            <Icon as={IoDocumentAttachOutline} boxSize={8} />
                          </Box>
                        </a>
                      )}

                      <CVInputFileLink
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                        callback={(e) => updateFileRate(e)}>
                        Subir archivo{' '}
                      </CVInputFileLink>
                    </Flex>
                  </Td>
                  <Td>{estadoBadge(delivery.statusFileRate || ' ')}</Td>
                  <Td>
                    <Button
                      variant='link'
                      disabled={
                        delivery.statusFileRate == 'PENDING' ? false : true
                      }
                      onClick={() => updateStatusFileRate('APPROVED')}>
                      <DataText2>Aprobar</DataText2>
                    </Button>
                    <br />
                    <Button
                      variant='link'
                      disabled={
                        delivery.statusFileRate == 'PENDING' ? false : true
                      }
                      onClick={() => updateStatusFileRate('REJECTED')}>
                      <DataText2>Rechazar</DataText2>
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Grid>

          <Grid item xs={12}>
            <Flex justifyContent='end'>
              <CVButton
                isLoading={loading}
                backgroundColor='gray'
                disabled={
                  client?.store?.delivery_own_status == 'APPROVED' ||
                  delivery?.statusFileRate != 'APPROVED' ||
                  loading
                    ? true
                    : false
                }
                onClick={approveDeliveryOwn}>
                {client?.store?.delivery_own_status == 'APPROVED'
                  ? 'El Operador logístico ya esta dado de alta'
                  : 'Dar de Alta al Operador logístico'}
              </CVButton>
            </Flex>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default DeliveryOwn;
