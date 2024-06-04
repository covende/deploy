import React, { useEffect, useState } from 'react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Box } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react';
import { estadoBadge } from '@/common/utils';
import { Typography } from '@material-ui/core';
import { COMPANY_COMPANY_DOCUMENTS } from '@/app/api/graphql/webbo/BClientService';
import { reviceCompanyDocuments } from '@/app/api/graphql/customers/services/CompanyDocumentService';
import { useToast } from '@chakra-ui/toast';
import { fileicon } from '../../ConfigurationIcons';
import CVInputFileLink from '@/common/CovendeTemplate/CVInputFileLink';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
function ValidacionDocs({ storeID }) {
  const [documents, setDocuments] = useState({});
  const addToast = useToast();
  const initdata = async () => {
    const result = await AxiosGQL(COMPANY_COMPANY_DOCUMENTS(storeID));
    let doc = { ...result.companyCompanyDocuments };
    if (doc?.statusCCI == 'REJECTED') doc.fileCCI = '';
    if (doc?.statusDNI == 'REJECTED') doc.fileDNI = '';
    if (doc?.statusRUC == 'REJECTED') doc.fileRUC = '';
    if (doc?.statusCC == 'REJECTED') doc.fileCC = '';

    setDocuments(doc);
  };

  const filechange = async (e, file) => {
    await reviceCompanyDocuments(documents._id, file, e.data);
    setDocuments({ ...documents, [file]: e.data });
    CVAlertSuccess({ addToast, message: e.data + ' CORRECTAMENTE' });
  };

  useState(() => {
    initdata();
    return () => {
      setDocuments({});
    };
  }, []);

  return (
    <Box>
      <Table variant='striped' colorScheme='gray'>
        <Thead background='#00ADF6'>
          <Tr>
            <Th textTransform='capitalize' color='white' fontSize='1rem'>
              Nº
            </Th>
            <Th textTransform='capitalize' color='white' fontSize='1rem'>
              Nombre
            </Th>
            <Th textTransform='capitalize' color='white' fontSize='1rem'>
              Archivo
            </Th>
            <Th textTransform='capitalize' color='white' fontSize='1rem'>
              Estado
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Typography> 1 </Typography>
            </Td>
            <Td>
              <Typography>{documents.titleRUC}</Typography>
            </Td>
            <Td>
              <Box>
                {documents?.fileRUC != '' ? (
                  <a href={documents?.fileRUC || ' '} target='_blank'>
                    {fileicon}
                  </a>
                ) : (
                  <CVInputFileLink callback={(e) => filechange(e, 'fileRUC')}>
                    Subir archivo{' '}
                  </CVInputFileLink>
                )}
              </Box>
            </Td>
            <Td>{estadoBadge(documents?.statusRUC || ' ')}</Td>
          </Tr>
          <Tr>
            <Td>
              <Typography>2</Typography>
            </Td>
            <Td>
              <Typography>{documents.titleDNI}</Typography>
            </Td>
            <Td>
              <Box>
                {documents?.fileDNI != '' ? (
                  <a href={documents?.fileDNI || ' '} target='_blank'>
                    {fileicon}
                  </a>
                ) : (
                  <CVInputFileLink callback={(e) => filechange(e, 'fileDNI')}>
                    Subir archivo{' '}
                  </CVInputFileLink>
                )}
              </Box>
            </Td>
            <Td>{estadoBadge(documents?.statusDNI || ' ')} </Td>
          </Tr>
          <Tr>
            <Td>
              <Typography>3</Typography>
            </Td>
            <Td>
              <Typography>{documents.titleCCI}</Typography>
            </Td>
            <Td>
              <Box>
                {documents?.fileCCI != '' ? (
                  <a href={documents?.fileCCI || ' '} target='_blank'>
                    {fileicon}
                  </a>
                ) : (
                  <CVInputFileLink callback={(e) => filechange(e, 'fileCCI')}>
                    Subir archivo{' '}
                  </CVInputFileLink>
                )}
              </Box>
            </Td>
            <Td>{estadoBadge(documents?.statusCCI || ' ')}</Td>
          </Tr>

          {/*documents?.titleCC ? (
            <Tr>
              <Td>
                <Typography>4</Typography>
              </Td>
              <Td>
                <Typography>{documents.titleCC}</Typography>
              </Td>
              <Td>
                <Box>
                  {documents?.fileCC != '' ? (
                    <a href={documents?.fileCC || ' '} target='_blank'>
                      {fileicon}
                    </a>
                  ) : (
                    <CVInputFileLink callback={(e) => filechange(e, 'fileCC')}>
                      Subir archivo{' '}
                    </CVInputFileLink>
                  )}
                </Box>
              </Td>
              <Td>{estadoBadge(documents?.statusCC || ' ')}</Td>
            </Tr>
          ) : (
            <></>
          )*/}
        </Tbody>
      </Table>
    </Box>
  );
}

export default ValidacionDocs;
