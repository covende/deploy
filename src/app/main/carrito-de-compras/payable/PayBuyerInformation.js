import { DOCUMENT_TYPE_LIST } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import {
  USER_BY_ID,
  USER_UPDATE,
  USER_UPDATE_TOKEN
} from '@/app/api/graphql/webpublic/userData/UserService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser, setToken } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput, CVSelect, CVText } from '@/common/CovendeTemplate';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { Box, Flex, useToast } from '@chakra-ui/react';
import CVInputDNI from '@CVTemplate/core/CVInputDNI';
import { CVValidLogin } from '@CVTemplate/core/CVMethods';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';
import { _finddni } from '../../crea-tu-tienda/components/utils';

function PayBuyerInformation({ information, setinformation, setfactura }) {
  const [tipodoc, setTipodoc] = useState(0);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [loading, setloading] = useState(false);
  const [docs, setDocs] = useState([]);
  const { carrito_login } = useSelector((state) => state.CardProduct);
  const dispatch = useDispatch();
  const [edit, setedit] = useState(false);
  const addToast = useToast();
  const [person, setperson] = useState({
    dni: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    codVerifica: '',
    telefono: ''
  });

  const initdata = async () => {
    const isLogin = CVValidLogin(dispatch);
    if (!isLogin) return false;

    const us = getLoggedInUser();
    let result = await AxiosGQL(DOCUMENT_TYPE_LIST);
    setDocs(result.DocumentTypeList);

    let { userFind } = await AxiosGQL(USER_BY_ID(us.user_id));

    if (userFind.first_name != '' && userFind.last_name != '') {
      setedit(false);
      setperson({
        ...person,
        dni: userFind.dni,
        apellidoPaterno: userFind.last_name,
        nombres: userFind.first_name,
        telefono: userFind?.phone
          ? userFind?.phone?.length > 0
            ? userFind?.phone[0].number
            : ''
          : ''
      });

      docs.forEach((item, idx) => {
        if (item._id == userFind.tipodoc) setTipodoc(idx);
      });
    } else {
      setedit(true);
    }

    setinformation({
      ...userFind,
      phone: userFind?.phone
        ? userFind?.phone?.length > 0
          ? userFind?.phone[0].number
          : ''
        : ''
    });
    setfactura({
      ruc: userFind.dni,
      razon_social: userFind.first_name + ' ' + userFind.last_name
    });
  };

  const senddata = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    setloading(true);
    let us = getLoggedInUser() || information;
    let { editUserByToken } = await AxiosGQL(
      USER_UPDATE_TOKEN({
        first_name: person.nombres,
        last_name: person.apellidoPaterno + ' ' + person.apellidoMaterno,
        dni: person.dni,
        phone: person?.telefono,
        tipodoc: docs[tipodoc]._id
      })
    );
    let { userFind } = await AxiosGQL(USER_BY_ID(us.user_id));

    setinformation({
      ...userFind,
      phone: userFind?.phone
        ? userFind?.phone?.length > 0
          ? userFind?.phone[0].number
          : ''
        : ''
    });

    if (editUserByToken?.status) {
      setToken(editUserByToken.newToken);
      dispatch(
        ActionsAuth.BuyerSeller.updateUser({
          first_name: userFind?.first_name,
          last_name: userFind?.last_name
        })
      );
    }

    setfactura({
      ruc: userFind.dni,
      razon_social: userFind.first_name + ' ' + userFind.last_name
    });
    setloading(false);
    setedit(!edit);
  };

  const savedata = () => (!errors ? seterrors(true, senddata) : senddata());

  useEffect(() => {
    setTimeout(() => {
      initdata();
    }, 250);
  }, [carrito_login]);
  return (
    <Box backgroundColor='#FFFFFF' rounded='1rem' padding='1rem'>
      <CVText fontSize='1.25rem' fontWeight='bold' color='blue'>
        Información del Comprador
      </CVText>
      <SizeBox />
      <Grid container spacing={1}>
        {edit ? (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <CVText>Tipo de documento:</CVText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CVSelect
                value={tipodoc.toString()}
                onChange={(value) => setTipodoc(value)}
                options={(docs || []).map((item, idx) => ({
                  text: item.descripcion_corta,
                  value: idx.toString()
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={5}></Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CVText>Número de Documento:</CVText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CVInputDNI
                caracteres={
                  docs.length > 0
                    ? docs[tipodoc == '' ? 0 : tipodoc].caracteres
                    : 8
                }
                person={person}
                setperson={setperson}
                valid_dni={(value) =>
                  setperson({
                    ...person,
                    dni: value,
                    nombres: '',
                    apellidoPaterno: '',
                    apellidoMaterno: ''
                  })
                }
                iconFind={tipodoc == 0}
                error={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={5}></Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CVText>Nombres:</CVText>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CVInput
                error={errors && person.nombres == ''}
                value={person.nombres}
                onChange={(value) => setperson({ ...person, nombres: value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}></Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CVText>Apellidos:</CVText>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CVInput
                error={
                  errors &&
                  person.apellidoMaterno == '' &&
                  person.apellidoPaterno == ''
                }
                value={person.apellidoPaterno + ' ' + person.apellidoMaterno}
                onChange={(value) =>
                  setperson({ ...person, apellidoPaterno: value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}></Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CVText>Celular:</CVText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CVInput
                error={errors && person.telefono == ''}
                value={person.telefono}
                onChange={(value) => setperson({ ...person, telefono: value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={5}></Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={12} md={12}>
              <Flex flexDirection='column'>
                <CVText>{information?.last_name || ''}</CVText>
                <CVText>{information?.first_name || ''}</CVText>
                <CVText>Doc:{information?.dni || ''}</CVText>
                <CVText>
                  Cel:
                  {information?.phone || ''}
                </CVText>
              </Flex>
            </Grid>
          </>
        )}
        {edit && (
          <Grid item xs={12} sm={12} md={12}>
            <SizeBox />
            <Flex justifyContent='end'>
              <CVButton
                disabled={loading}
                isLoading={loading}
                variant={edit ? 'contained' : 'outlined'}
                onClick={() => (!edit ? setedit(!edit) : savedata())}>
                {edit ? 'Guardar' : 'Editar'}
              </CVButton>
            </Flex>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default PayBuyerInformation;
