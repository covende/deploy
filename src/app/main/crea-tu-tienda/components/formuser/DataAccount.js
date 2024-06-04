import {
  CVCheckBox,
  CVInput,
  CVInputFile,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import { isOnlyText } from '@/common/CovendeTemplate/CVValidation';
import { Grid } from '@material-ui/core';
import React from 'react';
import { Title } from '../../CreaTuTienda.styles';
import { Flex } from '@chakra-ui/react';
function DataAccount({
  bancos,
  account,
  setAccount,
  termino,
  setTermino,
  errors
}) {
  const setCondicion = (values) => {
    let checks = {
      condiciones: values.includes('condiciones'),
      veridico: values.includes('veridico'),
      autorizacion: values.includes('autorizacion')
    };
    setTermino({ ...termino, ...checks });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Title>Titular de la cuenta bancaria</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={account.titular}
          onChange={(value) =>
            setAccount({ ...account, titular: String(value).trim() })
          }
          placeholder='Ingrese el nombre completo del titular'
          // error={
          //   errors && (!isOnlyText(account.titular) || account.titular == '')
          // }
          error={errors && account.titular == ''}
          errorMessage='Nombre y Apellido del titular de la cuenta'
        />
        <CVText color='gray' fontSize='0.85rem'>
          En caso de Persona Natural con Negocio, el titular de la cuenta
          bancaria debe ser el representante legal
        </CVText>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Title>Banco</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVSelect
          value={account.banco}
          onChange={(value) => setAccount({ ...account, banco: value })}
          options={bancos.map((item) => ({
            text: item.title,
            value: item._id
          }))}
          error={errors && account.banco == ''}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Title>Número de cuenta:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          type='number'
          value={account.numeroCC}
          onChange={(value) => setAccount({ ...account, numeroCC: value })}
          placeholder='Ingrese el número de cuenta'
          error={
            errors &&
            (!/^[\-0-9]/.test(account.numeroCC) || account.numeroCC == '')
          }
          errorMessage='Campo Obligatorio (solo caracteres númericos)'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>CCI:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          maxLength='20'
          value={account.numeroCCI}
          onChange={(value) => setAccount({ ...account, numeroCCI: value })}
          placeholder='Ingrese los 20 dígitos de su número de cuenta interbancaria'
          error={
            errors &&
            (!/^[\-0-9]{19}/.test(account.numeroCCI) || account.numeroCCI == '')
          }
          errorMessage='Campo Obligatorio (20 caracteres númericos con guiones)'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Title>Adjuntar estado de cuenta:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInputFile
          accept='application/pdf,image/*'
          value={account.fileCCI}
          callback={(e) =>
            setAccount({
              ...account,
              fileCCI: e.data
            })
          }>
          Subir archivo
        </CVInputFile>
        <Flex flexDirection='column'>
          <CVText fontSize='0.8rem' color='gray'>
            Imagen del encabezado de su Estado de Cuenta.
          </CVText>
          <CVText fontSize='0.8rem' color='gray'>
            No revele información personal.
          </CVText>
          <CVText fontSize='0.8rem' color='gray'>
            PDF, JPG, JPEG, PNG menor a 10 MB
          </CVText>
          <CVText fontSize='0.8rem' color='gray'>
            (Recuerde este campo no es obligatorio)
          </CVText>
        </Flex>

        {/* {errors && account.fileCCI == '' && (
          <CVText
            className='errores'
            color='red'
            fontWeight='bold'
            fontSize='0.85rem'>
            Obligatorio cargar su documento
          </CVText>
        )} */}
      </Grid>
      <Grid item xs={12} sm={6} md={4}></Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVCheckBox
          itemDirection='column'
          onChange={(values) => setCondicion(values)}
          options={[
            {
              value: 'condiciones',
              text: 'Tengo la capacidad de aceptar devoluciones y ofrecer garantías por mis productos en los casos en los que se apliquen.'
            },
            {
              value: 'veridico',
              text: 'Declaro que toda la información proporcionada es legal, verídica y disponible de verificación.'
            },
            {
              value: 'autorizacion',
              text: 'Acepto el uso de mis datos personales para fines publicitarios.'
            }
          ]}
        />
      </Grid>
    </Grid>
  );
}

export default DataAccount;
