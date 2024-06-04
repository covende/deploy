import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  useDisclosure,
  Center,
  Flex,
  Checkbox,
  useToast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Icon
} from '@chakra-ui/react';
import iconDeliveryOwn from '@/app/assets/img/delivery-own.svg';
import CVImage from '@CVTemplate/core/CVImage';
import { Grid } from '@material-ui/core';
import CVButton from '@CVTemplate/core/CVButton';
import CVText from '@CVTemplate/core/CVText';
import CVInput from '@CVTemplate/core/CVInput';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVDownloadXlxs from '@CVTemplate/core/CVDownloadXlsx';
import styled from '@emotion/styled';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { uploadFile } from '@CVApi/core/upload/uploadservice';
import { addDeliveryOwn } from '@CVApi/core/deliveryOwn/service';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { CVErrorTags, CVErrorsValidate } from '@CVTemplate/core/CVValidation';
import { DELIVERY_OWN_BY_COMPANY } from '@CVApi/core/webbo/BClientService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import DecorativeHeading from '@CVPages/core/bo/clientes/components/DecorativeHeading';
import DecorativeText from '@CVPages/core/bo/clientes/components/DecorativeText';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { estadoBadge } from '@/common/utils/index';
import { Typography } from '@material-ui/core';
import CVLink from '@CVTemplate/core/CVLink';

const Filecontainer = styled.label`
  width: 100%;
  /* padding: 0px 0px 0px 10px; */
  /* border-radius: 12px; */
  /* box-shadow: -1px 1px 8px rgba(0, 0, 0, 0.2); */
  /* border: 1px solid #cdcccc; */
  display: flex;
  & input {
    display: none;
  }
  & > div {
    background: white;
    border: 1px solid ${COLORS['primary']};
    font-weight: bold;
    box-sizing: border-box;
    display: flex;
    padding: 5px;
    border-radius: 0 1rem 1rem 0;
    font-size: 1rem;
    width: 150px;
    color: ${COLORS['primary']};
    justify-content: center;
  }
  & > div:hover {
    background: ${COLORS['primary']};
    border: 1px solid #00adf6;
    color: white;
  }
  & p {
    display: flex;
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #ececec;
    border-radius: 1rem 0 0 1rem;
  }
`;

function DeliveryOwn({ storeID, permisions }) {
  const [newAccounts, setNewAccounts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, seterrors] = CVUseStateCallback(false);
  const filedialog = useRef();
  const [loading, setLoading] = useState(false);
  const [filename, setfilename] = useState('');
  const [fileRate, setFileRate] = useState('');
  const [delivery, setDelivery] = useState({
    name: '',
    fileRate: '',
    statusFileRate: '',
    company_id: '',
    status: '',
    company_id: '',
    information_legal: false,
    policies_terms: false
  });

  const [loadingInit, setLoadingInit] = useState(true);

  const addToast = useToast();

  let deliveryOwnHeaders = [
    {
      header: 'Ubigeo',
      comment:
        'Ingrese el código de ubigeo de la ubicación geográfica en el Perú. Este código se utiliza para identificar el lugar.',
      width: 27
    },
    {
      header: 'Departamento',
      comment: 'Ingrese el departamento en el que realizará las entregas.',
      width: 22
    },
    {
      header: 'Provincia',
      comment: 'Ingrese las provincias en las que realizará las entregas.',
      width: 22
    },
    {
      header: 'Distrito',
      comment: 'Ingrese los distritos en los que realizará las entregas.',
      width: 22
    },
    {
      header: 'Tiempo de espera',
      comment: 'Ingrese el tiempo estimado de transporte del paquete.',
      width: 22
    },

    {
      header: 'XS',
      comment:
        'Ingrese el precio para la talla del paquete XS (disponible para un peso máximo de 1kg)',
      width: 25
    },
    {
      header: 'S',
      comment:
        'Ingrese el precio para la talla del paquete S (disponible para un peso mínimo de 1.01kg y máximo de 5kg)',
      width: 25
    },
    {
      header: 'M',
      comment:
        'Ingrese el precio para la talla del paquete M (disponible para un peso mínimo de 5.01kg y máximo de 20kg)',
      width: 25
    },
    {
      header: 'L',
      comment:
        'Ingrese el precio para la talla del paquete L (disponible para un peso mínimo de 20.01kg y máximo de 50kg)',
      width: 25
    },
    {
      header: 'XL',
      comment:
        'Ingrese el precio para la talla del paquete XL (disponible para un peso mínimo de 50.01kg y máximo de 100kg)',
      width: 25
    },
    {
      header: 'XXL',
      comment:
        'Ingrese el precio para la talla del paquete XXL (disponible para un peso mínimo de 100.01kg)',
      width: 25
    }
  ];

  const messageDelivery = {
    PENDING: 'Tú Operador logístico esta en evaluación',
    APPROVED: 'Tú Operador logístico ha sido dado de alta',
    REJECTED: 'Tú Operador logístico ha sido rechazado'
  };

  const coloresDelivery = {
    PENDING: 'blue',
    APPROVED: 'skyblue',
    REJECTED: 'red'
  };

  const onChangedFile = (e) => {
    e.preventDefault();
    let files;
    try {
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }

      if (!files[0]) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFileRate(reader.result);
      };
      setfilename(files[0].name || '');
    } catch (error) {
      setfilename('');
      setFileRate('');
    }
  };

  const senData = () => (!errors ? seterrors(true, onSubmit) : onSubmit());

  const onSubmit = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Llene o corrija los campos obligatorios'
      });
      return false;
    }
    setLoading(true);

    try {
      let result = await uploadFile({
        file: fileRate,
        type: 'documents',
        mimetype: ''
      });

      if (result?.data) {
        let resp = await addDeliveryOwn({
          name: delivery?.name,
          fileRate: result?.data,
          information_legal: delivery.information_legal,
          policies_terms: delivery.policies_terms
        });

        if (resp?.status) {
          CVAlertSuccess({ addToast, message: resp.message });
          setDelivery(resp.data);
        } else {
          CVAlertError({ addToast, message: resp?.message || 'Error' });
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const initdata = async () => {
    const { getDeliveryOwn: resp } = await AxiosGQL(DELIVERY_OWN_BY_COMPANY());
    if (resp?.status) resp.data && setDelivery(resp.data);
    setLoadingInit(false);
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Flex direction='column' alignItems='center'>
          <Box>
            <Center mt={20}>
              <CVImage image={iconDeliveryOwn} />
            </Center>
          </Box>
          <Box m={2}>
            <CVLink
              target='_blank'
              href='https://covendefiles.s3.amazonaws.com/documents/1704935999409'>
              <CVButton>Descargar Documentación</CVButton>
            </CVLink>
          </Box>
        </Flex>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={5}>
        {!loadingInit &&
          (delivery.status ? (
            <>
              <Box marginTop='2rem'>
                <DecorativeHeading>{delivery.name}</DecorativeHeading>
              </Box>
              <SizeBox />
              <Table variant='striped' colorScheme='gray'>
                <Thead background='#00ADF6'>
                  <Tr>
                    <Th
                      textTransform='capitalize'
                      color='white'
                      fontSize='1rem'>
                      Nº
                    </Th>
                    <Th
                      textTransform='capitalize'
                      color='white'
                      fontSize='1rem'>
                      Nombre
                    </Th>
                    <Th
                      textTransform='capitalize'
                      color='white'
                      fontSize='1rem'>
                      Archivo
                    </Th>
                    <Th
                      textTransform='capitalize'
                      color='white'
                      fontSize='1rem'>
                      Estado
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>1</Td>
                    <Td>
                      <Typography>Tarifas</Typography>
                    </Td>
                    <Td>
                      <Flex>
                        <a
                          style={{ marginRight: '5px' }}
                          href={delivery.fileRate}
                          target='_blank'>
                          <Box m={1}>
                            <Icon as={IoDocumentAttachOutline} boxSize={6} />
                          </Box>
                        </a>
                      </Flex>
                    </Td>
                    <Td>{estadoBadge(delivery.statusFileRate || ' ')}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <SizeBox />

              <Flex justifyContent='end'>
                <CVButton
                  isLoading={loading}
                  backgroundColor={coloresDelivery[delivery.status] || 'gray'}
                  disabled={true}>
                  {messageDelivery[delivery.status] || '-'}
                </CVButton>
              </Flex>
            </>
          ) : (
            <>
              <Box marginTop='2rem'>
                <CVText fontSize='1.5rem' fontWeight='500'>
                  Nombre
                </CVText>
                <SizeBox />
                <CVInput
                  value={delivery.name}
                  onChange={(name) => setDelivery({ ...delivery, name })}
                  width='100%'
                  maxLength='100'
                  textTransform=''
                  error={errors && delivery.name == ''}
                  errorMessage='*Campo requerido.'
                />
              </Box>

              <SizeBox />
              <SizeBox />
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <CVButton
                    padding='1.5rem'
                    backgroundColor='green'
                    width='100%'>
                    <CVText fontSize='1.2rem' fontWeight='500' color='white'>
                      Plantilla de tarifa
                    </CVText>
                  </CVButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Flex ml={'1rem'} justifyContent='end'>
                    <Box fontSize='1.5rem' p={3} borderRadius='20'>
                      <CVDownloadXlxs
                        headers={deliveryOwnHeaders}
                        fetchData={[]}
                        color='green'
                        headersColor='F7B844'
                        fontWeight='Bold'
                        text='Descargar en excel'
                        justifyContent='center'
                        sheetName='Tarifas'
                      />
                    </Box>
                  </Flex>
                </Grid>
              </Grid>

              <Box marginTop='1.2rem'>
                <CVText fontSize='1.5rem' fontWeight='500'>
                  Tarifas
                </CVText>
                <Flex width='100%' maxHeight='350px'>
                  <Filecontainer>
                    <input
                      ref={filedialog}
                      type='file'
                      onChange={onChangedFile}
                      accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    />
                    <p>{filename}</p>
                    <div>Elegir archivo</div>
                  </Filecontainer>
                </Flex>
                {errors && filename == '' && (
                  <CVText
                    color='red'
                    className='errores'
                    fontWeight='bold'
                    fontSize='0.85rem'>
                    *Campo requerido.
                  </CVText>
                )}
              </Box>

              <Box marginTop='1.2rem'>
                <Checkbox
                  size='lg'
                  isChecked={delivery?.information_legal}
                  onChange={(e) =>
                    setDelivery({
                      ...delivery,
                      information_legal: e?.target?.checked
                    })
                  }>
                  <Box marginTop={{ base: '0px', md: '1rem' }}>
                    <CVText>
                      Declaro que toda la información proporcionada es legal,
                      verídica y disponible de verificación.
                    </CVText>
                  </Box>
                </Checkbox>
                {errors && delivery.information_legal != true && (
                  <CVText
                    color='red'
                    className='errores'
                    fontWeight='bold'
                    fontSize='0.85rem'>
                    *Campo requerido.
                  </CVText>
                )}
                <SizeBox />
                <Checkbox
                  size='lg'
                  isChecked={delivery?.policies_terms}
                  onChange={(e) =>
                    setDelivery({
                      ...delivery,
                      policies_terms: e?.target?.checked
                    })
                  }>
                  <CVText>
                    Declaro que Acepto los terminos y condiciones.
                  </CVText>
                </Checkbox>{' '}
                {errors && delivery.policies_terms != true && (
                  <CVText
                    color='red'
                    className='errores'
                    fontWeight='bold'
                    fontSize='0.85rem'>
                    *Campo requerido.
                  </CVText>
                )}
              </Box>

              <Flex marginTop='1.5rem' justifyContent='end'>
                <CVButton
                  isLoading={loading}
                  disabled={loading}
                  onClick={() => senData()}
                  backgroundColor={loading ? 'gray' : 'primary'}>
                  Guardar
                </CVButton>
              </Flex>
            </>
          ))}
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={2}></Grid>
    </Grid>
  );
}

export default DeliveryOwn;
