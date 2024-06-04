import React, { useState, useEffect } from 'react';
import {
  Text,
  Box,
  Center,
  HStack,
  useRadioGroup,
  useRadio,
  Container,
  Flex
} from '@chakra-ui/react';

import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_CLAIM } from '@/app/api/graphql/webpublic/complaintsBook/complaintsBook';
import { useToast } from '@chakra-ui/toast';
import { listdepartamento } from '@/app/api/graphql/webpublic/createstore/Planservice';
import {
  listdistrito,
  listprovincia
} from '@/app/api/graphql/webpublic/createstore/Planservice';
import { CVButton, CVInput, CVModal, CVText } from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVErrorsValidate,
  CVErrorTags,
  isEmail,
  isPhone,
  onlyNumber
} from '@/common/CovendeTemplate/CVValidation';
import { CVGoUp } from '@/common/CovendeTemplate/CVMethods';
import FormReclamationBook from './FromReclamationBook';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label' fontSize='md' w='240px' mr={props.marginRight}>
      <input {...input} />
      <Box
        as='span'
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        px={3}
        py={0}
        mr={2}></Box>
      {props.children}
      {props.index === 0 ? (
        <h3
          style={{
            color: '#000',
            fontSize: '11px',
            fontWeight: '300',
            marginLeft: '27px',
            width: '300px',
            lineHeight: '20px'
          }}>
          Disconformidad relacionada a los productos o servicios.
        </h3>
      ) : (
        <h3
          style={{
            color: '#000',
            fontSize: '11px',
            fontWeight: '300',
            marginLeft: '27px',
            width: '300px',
            lineHeight: '20px'
          }}>
          Disconformidad no relacionada a los productos o servicios, o respecto
          a la atención al público.
        </h3>
      )}
    </Box>
  );
}

function CustomiceRadio({ setAclaim, aclaim }) {
  const options = ['Tengo un reclamo', 'Tengo una queja'];

  const getValueOption = (val) => {
    switch (val) {
      case options[0]:
        return setAclaim({
          ...aclaim,
          isReclamation: true,
          isComplaint: false
        });
      case options[1]:
        return setAclaim({
          ...aclaim,
          isComplaint: true,
          isReclamation: false
        });
      default:
        break;
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'tipo',
    onChange: getValueOption
  });

  const group = getRootProps();

  return (
    <Box>
      <HStack {...group}>
        {options.map((value, i) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard
              marginRight='128px'
              index={i}
              onChange={(e) => {}}
              key={i}
              {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </Box>
  );
}

function LibroReclamaciones(props) {
  const addToast = useToast();
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [aclaim, setAclaim] = useState({
    names: '',
    last_names: '',
    email: '',
    phone: '',
    dni: '',
    address: '',
    detail: '',
    solution: '',
    departamento_id: '',
    provincia_id: '',
    distrito_id: '',
    isReclamation: false,
    isComplaint: false,
    typeDocument: 'DNI'
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const showerrors = () => {
    setLoading(false);
    errors !== true ? seterrors(true) : seterrors(false);
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Solucione o corrija los errores en rojo'
      });
      seterrors(true);
      return false;
    }
    return true;
  };

  const validando = () =>
    CVErrorsValidate({
      pdni: aclaim.dni != '',
      pnombres: aclaim.names != '',
      uphone: aclaim.phone != '' && isPhone(aclaim.phone),
      ullast_name: aclaim.last_names != '',
      uaddress: aclaim.address != '',
      udetail: aclaim.detail != '',
      usolution: aclaim.solution != '',
      umail: isEmail(aclaim.email),
      udocument:
        aclaim.dni != '' &&
        onlyNumber(aclaim.dni) &&
        `${aclaim.dni}`.length == 8,
      isComplaint: aclaim.isComplaint || aclaim.isReclamation
    });

  const send = async () => {
    try {
      setLoading(true);
      if (validando()) {
        showerrors();
      } else {
        const addAclaim = await AxiosGQL(ADD_CLAIM({ aclaim }));
        if (addAclaim.addComplaintsBook.complaintsBook._id) {
          setShowResults(true);
          setLoading(false);
          setAclaim({
            names: '',
            last_names: '',
            email: '',
            phone: '',
            dni: '',
            address: '',
            detail: '',
            solution: '',
            departamento_id: '',
            provincia_id: '',
            distrito_id: '',
            isReclamation: false,
            isComplaint: false,
            typeDocument: 'DNI'
          });
          seterrors(false);
          CVAlertSuccess({
            addToast,
            message: `${
              addAclaim.addComplaintsBook.complaintsBook.isReclamation
                ? 'Su reclamo fué enviado correctamente'
                : 'Su queja fué enviada correctamente'
            }`
          });
          setShowResults(true);
          setLoading(false);
        }
        return false;
      }
    } catch (error) {
      CVAlertError({
        addToast,
        title: 'Error con el servidor, intentelo mas tarde'
      });
      setLoading(false);
    }
  };

  const initdata = async () => {
    const data = await AxiosGQL(listdepartamento());
    setDepartamentos(data?.departamentos || []);
  };

  const findprovincs = async (value) => {
    setAclaim({ ...aclaim, departamento_id: value });
    setProvincias([]);
    let dp = departamentos.filter((da) => da._id == value);
    let result = await AxiosGQL(listprovincia(dp[0].code));
    setProvincias(result.provincias);
  };
  const finddistrict = async (value) => {
    setAclaim({ ...aclaim, provincia_id: value });
    setDistritos([]);
    let dp = provincias.filter((da) => da._id == value);
    let result = await AxiosGQL(listdistrito(dp[0].code));
    setDistritos(result.distritos);
  };

  useEffect(() => {
    initdata();
    CVGoUp();
  }, []);

  return (
    <>
      <Center>
        <Box bg='white' width='5xl' my={5} borderRadius='24px'>
          <Box p={5}>
            <Center my={10} fontSize='3xl' color='#00ADF6' fontWeight='bold'>
              Libro de Reclamaciones de Covende
            </Center>

            <Center fontSize='4xl' color='#004772' fontWeight='bold'>
              <CustomiceRadio setAclaim={setAclaim} aclaim={aclaim} />
            </Center>
            <Center>
              {errors &&
              aclaim.isComplaint == false &&
              aclaim.isReclamation == false ? (
                <CVErrorLabel
                  errorClass='errores'
                  errorMessage='Por favor seleccióne al menos una opción.*'
                />
              ) : (
                ''
              )}
            </Center>

            <Text
              ml={15}
              color='#004772'
              fontWeight='500'
              fontSize='16px'
              mt='50px'>
              Tus datos personales
            </Text>

            <Container>
              <FormReclamationBook
                {...{
                  aclaim,
                  setAclaim,
                  errors,
                  findprovincs,
                  finddistrict,
                  distritos,
                  departamentos,
                  provincias
                }}
              />
            </Container>
            <Text
              ml={15}
              color='#004772'
              fontWeight='500'
              fontSize='16px'
              mt='50px'>
              Detalles del reclamo
            </Text>

            <Container maxW='70ch'>
              <Box>
                <Flex align='center'>
                  <Text w='10rem' textAlign='end' mr='0.8rem'>
                    Detalles
                  </Text>
                  <CVInput
                    multiline={true}
                    height='100%'
                    value={aclaim.detail}
                    onChange={(value) =>
                      setAclaim({ ...aclaim, detail: value })
                    }
                    error={errors && aclaim.detail == ''}
                    errorMessage='ingrese el detalle'
                  />
                </Flex>
                <Flex align='center' mt='1rem'>
                  <Text w='16rem' ml='-4.5rem' textAlign='end' mr='0.8rem'>
                    ¿Qué solución esperas?
                  </Text>
                  <CVInput
                    multiline={true}
                    height='100%'
                    value={aclaim.solution}
                    onChange={(value) =>
                      setAclaim({ ...aclaim, solution: value })
                    }
                    error={errors && aclaim.solution == ''}
                    errorMessage='ingrese la solución que esperas'
                  />
                </Flex>
              </Box>
            </Container>
            <Box my={10}>
              <Center>
                <CVButton
                  color={loading ? 'gray' : 'skyblue'}
                  fontSize='1.5rem'
                  fontWeight='bold'
                  padding='0 3rem'
                  variant='outlined'
                  loading={loading}
                  disabled={loading}
                  onClick={() => send()}>
                  Enviar
                </CVButton>
              </Center>
            </Box>

            {/* <Center>
              {showResults ? (
                <CVText>
                  Te respondemos en breve. Revisa tu correo electrónico para
                  mantenernos en contacto.
                </CVText>
              ) : null}
            </Center> */}
          </Box>
        </Box>
      </Center>
      {showResults && (
        <CVModal
          isOpen={showResults}
          onClose={() => setShowResults(false)}
          header='Libro de Reclamaciones'
          bgHeader='green'
          colorHeader='white'>
          <SizeBox />
          <CVText color='blue'>
            Hemos recibido tu solicitud. Nos comunicaremos a la brevedad
            posible.
          </CVText>
        </CVModal>
      )}
    </>
  );
}

export default LibroReclamaciones;
