import { Box, Flex, Grid, Spacer, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Thead, Tr } from '@chakra-ui/table';
import { Spinner, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  companyUpStatus,
  findCompanyDocuments,
  reviceCompanyDocuments
} from '@/app/api/graphql/customers/services/CompanyDocumentService';
import { estadoBadge } from '@/common/utils';
import DecorativeText from '../../components/DecorativeText';
import { Button } from '@chakra-ui/button';
import DataText2 from '../../components/DataText2';
import { useToast } from '@chakra-ui/toast';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMPANY_COMPANY_DOCUMENTS,
  NAMES_ASSESOR_COMPANY_DOCUMENTS,
  STATUS_STORE,
  GET_CURRENT_COMPANY_PLAN
} from '@/app/api/graphql/webbo/BClientService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { A_CLIENTS } from '../../redux/actions';
import CVButton from '@CVTemplate/core/CVButton';
import CVInputFileLink from '@CVTemplate/core/CVInputFileLink';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function ValidacionDocumentaria() {
  const [documents, setDocuments] = useState({});
  const [asesor, setasesor] = useState({});
  const [loading, setloading] = useState(false);
  const [plan, setPlan] = useState({});
  const [datecheck, setdatecheck] = useState('');
  const addToast = useToast();
  const { client } = useSelector((state) => state.Clients);
  const dispatch = useDispatch();
  const initialdata = async (store_id) => {
    if (!!store_id) {
      var { companyCompanyDocuments } = await AxiosGQL(
        COMPANY_COMPANY_DOCUMENTS(store_id)
      );
      setDocuments(companyCompanyDocuments);
      var { getAssessorCompanyDocument } = await AxiosGQL(
        NAMES_ASSESOR_COMPANY_DOCUMENTS(companyCompanyDocuments.asesor)
      );
      setasesor(getAssessorCompanyDocument);

      let { getCurrentPlanByCompany } = await AxiosGQL(
        GET_CURRENT_COMPANY_PLAN(store_id)
      );

      setPlan(getCurrentPlanByCompany);
    } else {
      setDocuments(null);
      setasesor(null);
      setPlan(null);
    }
    let fecha_validacion = '';
    if (client?.store?.validation_date) {
      fecha_validacion = CVFormatDate({
        date: client?.store?.validation_date,
        time: true
      });
    }

    setdatecheck(fecha_validacion);
  };

  const upCompanyDocuments = async (attribute, status) => {
    await reviceCompanyDocuments(documents._id, attribute, status);
    var docs = { ...documents, [attribute]: status };
    setDocuments(docs);
    CVAlertSuccess({ addToast, message: status + ' CORRECTAMENTE' });
  };

  const Activate = async () => {
    let user = getLoggedInUser();
    setloading(true);
    const { statusstore } = await AxiosGQL(
      STATUS_STORE({
        store_id: client?.store?._id,
        status: 'APPROVED',
        user_id: user.user_id
      })
    );

    console.log({ 'imprimindo aproved': statusstore });

    if (statusstore?.status) {
      CVAlertSuccess({ addToast, message: 'Activado Correctamente' });

      dispatch(
        A_CLIENTS({
          client: {
            ...client,
            store: { ...client.store, status: status }
          }
        })
      );

      initialdata(client?.store?._id);
    } else {
      CVAlertError({ addToast, message: statusstore.message });
    }

    setloading(false);
  };

  const messagePlan = (plan) => {
    let status = '';

    if (plan !== null && Object.keys(plan).length > 0) {
      let names = plan.name.split(' ');
      let size = names.length;

      for (let i = 0; i < size; i++) {
        status += names[i].charAt(0).toUpperCase();
        status += names[i].substring(1, names[i].length).toLowerCase();
        if (i < size - 1) {
          status += ' ';
        }
      }

      status += ' | ';
      switch (plan.payment_status) {
        case 'COMPLETED':
          status += 'Pagado';
          break;
        case 'PENDING':
          status += 'Pendiente';
          break;
        case 'EXPIRED':
          status += 'Expirado';
          break;
        default:
          break;
      }
    }

    return status;
  };

  useEffect(() => {
    const store_id = client?.store?._id;
    initialdata(store_id);
  }, [client]);

  const filechange = async (e, file, status) => {
    await reviceCompanyDocuments(documents._id, file, e.data);
    setDocuments({ ...documents, [file]: e.data, [status]: 'PENDIENTE' });
    CVAlertSuccess({ addToast, message: e.data + ' CORRECTAMENTE' });
  };

  return (
    <>
      {plan?.name && (
        <Text
          my={10}
          color='#17BF93'
          fontSize='1rem'
          fontWeight='500'
          lineHeight='21px'>
          {messagePlan(plan)}
        </Text>
      )}
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(1, 1fr)'
        gap='16px'>
        <Table variant='striped' colorScheme='gray'>
          <Thead>
            <Tr>
              <Td>N°</Td>
              <Td>Nombre</Td>
              <Td>Archivo</Td>
              <Td>Estado</Td>
              <Td>Acción</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>
                <DecorativeText>{documents?.titleRUC || ' '}</DecorativeText>
              </Td>
              <Td>
                <Flex justifyContent='left' alignItems='center'>
                  <a
                    style={{ marginRight: '5px' }}
                    href={documents?.fileRUC || ' '}
                    target='_blank'>
                    <Icon as={IoDocumentAttachOutline} boxSize={8} />
                  </a>
                  <SizeBox />
                  <SizeBox />
                  <CVInputFileLink
                    callback={(e) => filechange(e, 'fileRUC', 'statusRUC')}>
                    Subir archivo{' '}
                  </CVInputFileLink>
                </Flex>
              </Td>
              <Td>{estadoBadge(documents?.statusRUC || ' ')}</Td>
              <Td>
                <Button
                  variant='link'
                  disabled={documents?.statusRUC == 'PENDIENTE' ? false : true}
                  onClick={() => upCompanyDocuments('statusRUC', 'APPROVED')}>
                  <DataText2>Aprobar</DataText2>
                </Button>
                <br />
                <Button
                  variant='link'
                  disabled={documents?.statusRUC == 'PENDIENTE' ? false : true}
                  onClick={() => upCompanyDocuments('statusRUC', 'REJECTED')}>
                  <DataText2>Rechazar</DataText2>
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>
                <DecorativeText>{documents?.titleDNI || ' '}</DecorativeText>
              </Td>
              <Td>
                <Flex justifyContent='left' alignItems='center'>
                  <a
                    style={{ marginRight: '5px' }}
                    href={documents?.fileDNI || ' '}
                    target='_blank'>
                    <Icon as={IoDocumentAttachOutline} boxSize={8} />
                  </a>
                  <SizeBox />
                  <SizeBox />
                  <CVInputFileLink
                    callback={(e) => filechange(e, 'fileDNI', 'statusDNI')}>
                    Subir archivo{' '}
                  </CVInputFileLink>
                </Flex>
              </Td>
              <Td>{estadoBadge(documents?.statusDNI || ' ')}</Td>
              <Td>
                <Button
                  variant='link'
                  disabled={documents?.statusDNI == 'PENDIENTE' ? false : true}
                  onClick={() => upCompanyDocuments('statusDNI', 'APPROVED')}>
                  <DataText2>Aprobar</DataText2>
                </Button>
                <br />
                <Button
                  variant='link'
                  disabled={documents?.statusDNI == 'PENDIENTE' ? false : true}
                  onClick={() => upCompanyDocuments('statusDNI', 'REJECTED')}>
                  <DataText2>Rechazar</DataText2>
                </Button>
              </Td>
            </Tr>
            {/* 
          <Tr>
            <Td>3</Td>
            <Td>
              <DecorativeText>{documents?.titleCC || ' '}</DecorativeText>
            </Td>
            <Td>
              <a href={documents?.fileCC || ' '} target='_blank'>
                <IoDocumentAttachOutline />
              </a>
            </Td>
            <Td>{estadoBadge(documents?.statusCC || ' ')}</Td>
            <Td>
              <Button
                variant='link'
                onClick={() => upCompanyDocuments('statusCC', 'APPROVED')}>
                <DataText2>Aprobar</DataText2>
              </Button>
              <br />
              <Button
                variant='link'
                onClick={() => upCompanyDocuments('statusCC', 'REJECTED')}>
                <DataText2>Rechazar</DataText2>
              </Button>
            </Td>
          </Tr>
          */}
            <Tr>
              <Td>4</Td>
              <Td>
                <DecorativeText>{documents?.titleCCI || ' '}</DecorativeText>
              </Td>
              <Td>
                <Flex justifyContent='left' alignItems='center'>
                  <a
                    style={{ marginRight: '5px' }}
                    href={documents?.fileCCI || ' '}
                    target='_blank'>
                    <Icon as={IoDocumentAttachOutline} boxSize={8} />
                  </a>
                  <SizeBox />
                  <SizeBox />
                  <CVInputFileLink
                    callback={(e) => filechange(e, 'fileCCI', 'statusCCI')}>
                    Subir archivo{' '}
                  </CVInputFileLink>
                </Flex>
              </Td>
              <Td>{estadoBadge(documents?.statusCCI || ' ')}</Td>

              <Td>
                <Button
                  variant='link'
                  disabled={documents?.statusCCI == 'PENDIENTE' ? false : true}
                  onClick={() => upCompanyDocuments('statusCCI', 'APPROVED')}>
                  <DataText2>Aprobar</DataText2>
                </Button>
                <br />
                <Button
                  variant='link'
                  disabled={documents?.statusCCI == 'PENDIENTE' ? false : true}
                  onClick={() => upCompanyDocuments('statusCCI', 'REJECTED')}>
                  <DataText2>Rechazar</DataText2>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex direction='column'>
          <Flex>
            <Box>
              <Text>
                Fecha de validación: {loading && <Spinner size='md' />}{' '}
                {datecheck || '...'}
              </Text>
              <Text>
                Verificado por: {loading && <Spinner size='md' />}{' '}
                {asesor?.first_name || ' '} {asesor?.last_name || ' '}({' '}
                {asesor?.role_name || ' Por asignar'})
              </Text>
            </Box>
            <Spacer />

            <Box>
              <CVButton
                isLoading={loading}
                backgroundColor='gray'
                disabled={
                  client?.store?.status == 'APPROVED' || loading ? true : false
                }
                onClick={Activate}>
                {client?.store?.status == 'APPROVED'
                  ? 'El comercio ya esta dado de alta'
                  : 'Dar de Alta al Comercio '}
              </CVButton>
            </Box>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

export default ValidacionDocumentaria;
