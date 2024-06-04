import React, { useState, useEffect } from 'react';
import { Opciones, Title } from '../../CreaTuTienda.styles';
import { Grid, Typography } from '@material-ui/core';
import { LocalStorageAdapter } from '@/app/infrastructure';
import { Flex, Spacer } from '@chakra-ui/layout';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  listdistrito,
  listprovincia
} from '@/app/api/graphql/webpublic/createstore/Planservice';
import { find_company_by_ruc } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import {
  CVInput,
  CVInputFile,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import SearchIcon from '@material-ui/icons/Search';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { TIPOSTORE } from '@/common/CovendeTemplate/CVThemes';
import { useToast } from '@chakra-ui/toast';
import { isPhone, onlyNumber } from '@/common/CovendeTemplate/CVValidation';
import { _findruc, _validateRUC } from '../utils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Spinner } from '@chakra-ui/react';
import { values } from 'lodash';
import CVLine from '@CVTemplate/core/CVLine';
import CVSelectMultiple from '@CVTemplate/core/CVSelectMultiple';
import CVSelectDistrict from '@CVTemplate/core/CVSelectDistrict';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';

function DataCompany({
  user_id,
  setisRegistered,
  tipos,
  departamentos,
  setIsOpen,
  store,
  setStore,
  sociedades,
  errors
}) {
  const [finding, setfinding] = useState(false);
  const addToast = useToast();

  const findruc = async () =>
    await _findruc({
      setfinding,
      find_company_by_ruc,
      sociedades,
      setStore,
      store,
      addToast
    });

  const inicio = async () => {
    setStore({ ...store });
  };

  const validateRUC = async (value) =>
    await _validateRUC({
      ruc: value,
      setIsOpen,
      setStore,
      store,
      user_id,
      setisRegistered
    });

  useEffect(() => {
    inicio();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={4} display='flex'>
        <Title>RUC</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          maxLength='11'
          value={store.ruc}
          onValid={(value) => onlyNumber(value || '')}
          onValidate={(value) => validateRUC(value)}
          placeholder='20123456789'
          // error={
          //   errors && (store.ruc == '' || !/^[1-2][0-9]{11}$/.test(store.ruc))
          // }
          errorMessage='RUC inválido ( 11 caracteres numéricos )'
          icon={
            <>
              Validar
              <SizeBox />
              {finding ? <Spinner /> : <SearchIcon />}
            </>
          }
          iconFind={true}
          buttonClick={() => findruc()}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Nombre comercial:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store.business_name}
          onChange={(value) => setStore({ ...store, business_name: value })}
          disabled={store.business_name != '-' && store.business_name != ''}
          placeholder='Mi Tienda'
          error={
            (errors && store.business_name == '') || store.business_name == '-'
          }
          errorMessage='Digite un nombre comercial para su negocio'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Razón social:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store.razon_social}
          onChange={
            (value) => {} //setStore({ ...store, razon_social: value })
          }
          disabled={true}
          placeholder='Nombre SAC'
          error={errors && store.razon_social == ''}
          errorMessage='Pulse el boton buscar en número RUC'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Adjuntar ficha RUC:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInputFile
          accept='application/pdf,image/*'
          value={store.ficha_ruc}
          callback={(value) =>
            setStore({
              ...store,
              ficha_ruc: value.data
            })
          }>
          Subir archivo
        </CVInputFile>
        <Flex>
          <Typography variant='caption' display='block' gutterBottom>
            Vigencia del documento menor a 30 días.
          </Typography>
          <Spacer />
          <Typography variant='caption' display='block' gutterBottom>
            PDF, JPG, JPEG, PNG menor a 10 MB
          </Typography>
        </Flex>
        {errors && store.ficha_ruc == '' && (
          <CVText
            className='errores'
            color='red'
            fontWeight='bold'
            fontSize='0.85rem'>
            Obligatorio cargar su documento
          </CVText>
        )}
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Tipo de Sociedad:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVSelect
          width='100%'
          value={store.sociedad}
          onChange={(value) => setStore({ ...store, sociedad: value })}
          options={[
            { value: '', text: '' },
            ...sociedades.map((item) => ({
              text: item.description,
              value: item.title
            }))
          ]}
          error={errors && store.sociedad == ''}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Dirección fiscal:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store.street_fiscal}
          onChange={(value) => setStore({ ...store, street_fiscal: value })}
          placeholder='Avenida mi calle 000'
          error={errors && store.street_fiscal == ''}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Distrito:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVSelectDistrict
          district={store?.distrito}
          setDistrict={(value) => {
            setStore({
              ...store,
              departamento: value[0]?._id || '',
              provincia: value[1]?._id || '',
              distrito: value[2]?._id || ''
            });
          }}
        />

        {errors && store?.distrito == '' && (
          <>
            <SizeBox height='0.7rem' />
            <CVErrorLabel
              errorClass={'errores'}
              errorMessage={'Debe ingresar un distrito válido.'}
            />
          </>
        )}
      </Grid>

      <Grid item xs={12}>
        <SizeBox height='0.5rem' />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Tipo de venta:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8} spacing='2'>
        <CVRadio
          onChange={(value) => setStore({ ...store, actividad: value })}
          value={store.actividad}
          options={TIPOSTORE}
        />
      </Grid>

      <Grid item xs={12}>
        <SizeBox height='1rem' />
      </Grid>

      <Grid item xs={12}>
        <CVLine
          lineHeight='1px'
          color='blue'
          backgroundColor='white'
          titles={['', ' Datos del Almacen', '']}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Dirección:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store.warehouse.street_fiscal}
          onChange={(value) =>
            setStore({
              ...store,
              warehouse: { ...store.warehouse, street_fiscal: value }
            })
          }
          placeholder='Ingrese una dirección'
          error={errors && store.warehouse.street_fiscal == ''}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Referencia:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store.warehouse.reference}
          onChange={(value) =>
            setStore({
              ...store,
              warehouse: { ...store.warehouse, reference: value }
            })
          }
          placeholder='Referencia para ubicar la dirección'
          error={errors && store.warehouse.reference == ''}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Distrito:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVSelectDistrict
          district={store?.warehouse?.district}
          setDistrict={(value) =>
            setStore({
              ...store,
              warehouse: {
                ...store.warehouse,
                state: value[0]?._id || '',
                province: value[1]?._id || '',
                district: value[2]?._id || ''
              }
            })
          }
        />

        {errors && store?.warehouse?.district == '' && (
          <>
            <SizeBox height='0.7rem' />
            <CVErrorLabel
              errorClass={'errores'}
              errorMessage={'Debe ingresar un distrito válido.'}
            />
          </>
        )}
      </Grid>
      <Grid item xs={12}></Grid>

      <Grid item xs={12} sm={6} md={4}>
        {/* <Title>Responsable de Pedidos:</Title> */}
        <Title>Encargado:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store?.warehouse?.supervisor}
          onChange={(value) =>
            setStore({
              ...store,
              warehouse: {
                ...store.warehouse,
                supervisor: value
              }
            })
          }
          placeholder='Ingreso el nombre completo del encargado'
          error={errors && store?.warehouse?.supervisor == ''}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Title>Teléfono:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={store?.warehouse?.phone}
          maxLength='9'
          onChange={(value) =>
            setStore({
              ...store,
              warehouse: {
                ...store.warehouse,
                phone: value
              }
            })
          }
          placeholder='Teléfono del almacen.'
          error={
            errors &&
            (store?.warehouse?.phone == '' || !isPhone(store?.warehouse?.phone))
          }
          errorMessage='Campo Obligatorio ( 9 caracteres numéricos, no es necesario +51)'
        />
      </Grid>
      {/*       
      <Grid item xs={12} sm={6} md={4}>
        <Title>País:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVSelect
          value={store.pais}
          onChange={(value) => setStore({ ...store, pais: value })}
          options={[{ text: 'PERU', value: 'PERU' }]}
        /> 
        <CVInput value={store.pais} onChange={(value) => {}} />
      </Grid> */}

      {/*
      <Grid item xs={12} sm={6} md={4}>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Código postal:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CVInput
          maxLength='5'
          value={store.zip_code}
          onChange={(value) => setStore({ ...store, zip_code: value })}
          placeholder='Ingrese su código postal'
          error={
            errors &&
            (store.zip_code == '' || !/^[0-9]{5}$/.test(store.zip_code))
          }
          errorMessage='ZIP Code inválido ( 5 caracteres numéricos )'
        />

        </Grid>
      </Grid> 
        */}
    </Grid>
  );
}

export default DataCompany;
