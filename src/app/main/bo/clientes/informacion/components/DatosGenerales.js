import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex
} from '@chakra-ui/react';

import DecorativeHeading from '../../components/DecorativeHeading';
import DecorativeText from '../../components/DecorativeText';
import DataText from '../../components/DataText';
import DataText2 from '../../components/DataText2';

import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { Spinner } from '@chakra-ui/react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiSave } from 'react-icons/fi';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Tooltip } from '@chakra-ui/tooltip';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CVInput from '@CVTemplate/core/CVInput';
import { useToast } from '@chakra-ui/toast';
import {
  CVErrorTags,
  isEmail,
  isPhone,
  onlyEmail,
  onlyNumber
} from '@CVTemplate/core/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import {
  isAvailableEmailByUser,
  updateUserData
} from '@CVApi/core/webbo/BClientService';
import { A_CLIENTS } from '../../redux/actions';

function DatosGenerales() {
  const [DatosRepresentanteLegal, setDatosRepresentanteLegal] = useState(null);
  const [UsuariosAsociados, setUsuariosAsociados] = useState([]);
  const { client } = useSelector((state) => state.Clients);
  const [editValue, setEditValue] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dni: '',
    phone: ''
  });
  const [edit, setEdit] = useState(true);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();
  const dispatch = useDispatch();

  const _companyByUser = async () => {};

  const initData = () => {
    setEditValue({
      user_id: client?.user_id || '',
      first_name: client?.first_name || '',
      last_name: client?.last_name || '',
      email: client?.email || '',
      dni: client?.dni || '',
      phone: client?.phone[0]?.number || ''
    });
    setInit(true);
  };

  const objetosIguales = () => {
    let valueOld = {
      user_id: client?.user_id || '',
      first_name: client?.first_name || '',
      last_name: client?.last_name || '',
      email: client?.email || '',
      dni: client?.dni || '',
      phone: client?.phone[0]?.number || ''
    };

    for (const clave in valueOld) {
      if (valueOld[clave] !== editValue[clave]) return false;
    }

    return true;
  };

  const senddata = async () => {
    setLoading(true);
    if (CVErrorTags()) {
      setLoading(false);
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }

    if (objetosIguales()) {
      setLoading(false);
      setEdit(true);
      return CVAlertSuccess({
        addToast,
        message: 'Datos actualizados correctamente'
      });
    }

    if (editValue?.email !== client?.email) {
      let availableEmail = await isAvailableEmailByUser({
        user_id: client?.user_id,
        email: editValue?.email
      });

      if (!availableEmail?.isAvailableEmailByUser) {
        setLoading(false);
        return CVAlertError({
          addToast,
          message:
            'El correo ya está registrado, por favor ingrese otro correo.'
        });
      }
    }

    const { editUser: resp } = await updateUserData(editValue);

    if (resp?.user_id) {
      dispatch(
        A_CLIENTS({
          client: {
            ...client,
            ...editValue,
            phone: [{ type: 'celular', number: editValue.phone }]
          }
        })
      );

      CVAlertSuccess({
        addToast,
        message: 'Datos actualizados correctamente'
      });
    } else {
      setLoading(false);
      return CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }

    setLoading(false);
    setEdit(true);
  };

  const onSubmit = () => {
    !errors ? seterrors(true, senddata) : senddata();
  };

  useEffect(() => {
    if (!init) initData();
  }, [client.store]);

  const datosDeCuenta = (
    <>
      <Grid item xs={12} sm={12} md={6}>
        <DecorativeHeading>Datos de la cuenta</DecorativeHeading>
        <Grid container spacing={2} gap='8px'>
          <Grid item xs={6} sm={6} md={6}>
            {edit ? (
              <DecorativeText>Nombres y apellidos:</DecorativeText>
            ) : (
              <>
                <DecorativeText padding='0.6rem 0'>Nombres:</DecorativeText>
                <DecorativeText padding='0.6rem 0'>Apellidos:</DecorativeText>
              </>
            )}
            <DecorativeText padding={edit ? '0' : '0.6rem 0'}>
              E-mail:
            </DecorativeText>
            <DecorativeText padding={edit ? '0' : '0.6rem 0'}>
              DNI:
            </DecorativeText>
            <DecorativeText padding={edit ? '0' : '0.6rem 0'}>
              Celular:
            </DecorativeText>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {edit ? (
              <DataText>
                {client.first_name || '-'} {client.last_name || '-'}
              </DataText>
            ) : (
              <>
                <CVInput
                  errorMessage='Campo obligatorio.'
                  error={errors && editValue.first_name == ''}
                  value={editValue.first_name || ''}
                  onChange={(value) =>
                    setEditValue({ ...editValue, first_name: value })
                  }
                />
                <CVInput
                  marginTop='0.3rem'
                  errorMessage='Campo obligatorio.'
                  error={errors && editValue.last_name == ''}
                  value={editValue.last_name || ''}
                  onChange={(value) =>
                    setEditValue({ ...editValue, last_name: value })
                  }
                />
              </>
            )}
            {edit ? (
              <DataText>{client?.email || '-'}</DataText>
            ) : (
              <CVInput
                marginTop='0.3rem'
                errorMessage='Correo electrónico no válido (ejemplo@ejemplo.com)'
                error={
                  errors && (!isEmail(editValue.email) || editValue.email == '')
                }
                value={editValue.email || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, email: onlyEmail(value || '') })
                }
              />
            )}

            {edit ? (
              <DataText>{client.dni || '-'}</DataText>
            ) : (
              <CVInput
                marginTop='0.3rem'
                maxLength='8'
                errorMessage='Sólo caracteres numéricos, Debe tener al 8 caracteres.'
                error={
                  errors && (editValue.dni == '' || editValue.dni?.length !== 8)
                }
                value={editValue.dni || ''}
                onChange={(value) =>
                  setEditValue({ ...editValue, dni: onlyNumber(value || '') })
                }
              />
            )}

            {edit ? (
              <DataText>
                {(client?.phone || []).map((pho) => pho.number).join(', ')}
              </DataText>
            ) : (
              <CVInput
                maxLength='9'
                marginTop='0.3rem'
                errorMessage='Sólo caracteres numéricos. No es necesario anteponer +51'
                error={
                  errors &&
                  (!isPhone(editValue.phone) ||
                    editValue.phone === '' ||
                    editValue.phone?.length !== 9)
                }
                value={editValue.phone || ''}
                // type='number'
                onChange={(value) =>
                  setEditValue({ ...editValue, phone: onlyNumber(value || '') })
                }
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {init &&
          (loading ? (
            <Flex alignItems='center' justifyContent=' end'>
              <Spinner style={{ color: '#00ADF6', fontSize: '2rem' }} />
            </Flex>
          ) : edit ? (
            <Flex alignItems='center' justifyContent=' end'>
              <Tooltip label='Editar'>
                <Link
                  style={{ marginLeft: 0 }}
                  to='#'
                  onClick={() => setEdit(!edit)}>
                  <BsPencilSquare
                    style={{ color: '#17BF93', fontSize: '2rem' }}
                  />
                </Link>
              </Tooltip>
            </Flex>
          ) : (
            <Flex alignItems='center' justifyContent=' end'>
              <Tooltip label='Guardar'>
                <Link to='#' onClick={() => onSubmit()}>
                  <FiSave style={{ color: '#004574', fontSize: '2rem' }} />
                </Link>
              </Tooltip>
              <SizeBox />
              <Tooltip label='Cancelar'>
                <Link
                  style={{ marginLeft: 0 }}
                  to='#'
                  onClick={() => {
                    initData();
                    setEdit(true);
                  }}>
                  <MdCancel style={{ color: '#FF5454', fontSize: '2rem' }} />
                </Link>
              </Tooltip>
            </Flex>
          ))}
      </Grid>
    </>
  );

  const datosDelRepresentanteLegal = (
    <Grid item xs={12} sm={12} md={6}>
      <DecorativeHeading>Datos del representante legal</DecorativeHeading>
      <Box bg='#F2F2F2' w='100%' h='auto' p='10px 16px'>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <DecorativeText>Nombres y apellidos:</DecorativeText>
                <DecorativeText>Celular:</DecorativeText>
                <DecorativeText>Email:</DecorativeText>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <DataText2>
                  {DatosRepresentanteLegal?.fullname || '-'}
                </DataText2>
                <DataText2>{DatosRepresentanteLegal?.dni || '-'}</DataText2>
                <DataText2>{DatosRepresentanteLegal?.email || '-'}</DataText2>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <DecorativeText>DNI:</DecorativeText>
                &nbsp;
                <DecorativeText>Persona de contacto:</DecorativeText>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <DataText2>{DatosRepresentanteLegal?.dni || '-'}</DataText2>
                <Button
                  h='21.5px'
                  colorScheme='blue'
                  fontSize='10px'
                  fontStyle='normal'
                  fontWeight='400'
                  lineHeight='15px'
                  letterSpacing='0em'
                  textAlign='left'>
                  {DatosRepresentanteLegal?.file_dni || '-'}
                </Button>
                <DataText2>
                  {DatosRepresentanteLegal?.person_contact || '-'}
                </DataText2>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );

  const CustomTd = (props) => (
    <Td {...props}>
      <Tooltip
        isDisabled={!props.withtooltip}
        hasArrow
        label={props.children}
        bg='#004574'
        color='#ffffff'>
        <Text isTruncated>{props.children}</Text>
      </Tooltip>
    </Td>
  );

  const usuarioAsociados = (
    <Grid item xs={12} sm={12} md={12}>
      <DecorativeHeading>Usuario asociados a la cuenta</DecorativeHeading>
      <Table size='sm' variant='simple' bg='#F2F2F2'>
        <Thead background='#004574'>
          <Tr>
            <Th color='#F2F2F2'>N°</Th>
            <Th color='#F2F2F2'>Nombres</Th>
            <Th color='#F2F2F2'>Apellidos</Th>
            <Th color='#F2F2F2'>Rol</Th>
            <Th color='#F2F2F2'>Correo</Th>
            <Th color='#F2F2F2'>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {UsuariosAsociados?.map((user, index) => (
            <Tr key={index}>
              <CustomTd width='20px' textAlign='center'>
                {index + 1}
              </CustomTd>
              <CustomTd maxWidth='134px'>{user.first_name}</CustomTd>
              <CustomTd maxWidth='134px'>{user.last_name}</CustomTd>
              <CustomTd width='20px' textAlign='center'>
                {user.role}
              </CustomTd>
              <CustomTd maxWidth='134px'>{user.email}</CustomTd>
              <CustomTd width='20px' textAlign='center'>
                {user.status}
              </CustomTd>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      {datosDeCuenta}
      {DatosRepresentanteLegal ? datosDelRepresentanteLegal : ''}
      {usuarioAsociados.length ? usuarioAsociados : ''}
    </Grid>
  );
}

export default DatosGenerales;
