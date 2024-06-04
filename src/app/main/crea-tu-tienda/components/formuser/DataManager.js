import {
  CVInput,
  CVInputFile,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import {
  isOnlyText,
  isPhone,
  onlyEmail,
  onlyNumber,
  onlyText
} from '@/common/CovendeTemplate/CVValidation';
import { Flex } from '@chakra-ui/layout';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Title } from '../../CreaTuTienda.styles';

function DataManager({
  manager,
  setManager,
  docs,
  tipodoc,
  setTipodoc,
  errors
}) {
  const initTipoDoc = (value) => {
    if (!!!value) return;
    let index = docs.findIndex((doc) => doc._id == manager.tipodoc);
    if (index >= 0) setTipodoc(index);
  };

  useEffect(() => {
    initTipoDoc(manager?.tipodoc);
  }, [manager?.tipodoc]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Title>Nombres</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CVInput
          value={manager.first_name}
          onValid={(value) => onlyText(value)}
          onValidate={(value) => {
            setManager({ ...manager, first_name: value });
          }}
          placeholder='Ingrese nombres'
          error={
            errors &&
            (manager.first_name == '' || !isOnlyText(manager.first_name))
          }
          errorMessage='Campo Obligatorio, solo letras'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Apellidos</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CVInput
          value={manager.last_name}
          onValid={(value) => onlyText(value)}
          onValidate={(value) => setManager({ ...manager, last_name: value })}
          placeholder='Ingrese apellidos'
          error={
            errors &&
            (manager.last_name == '' || !isOnlyText(manager.last_name))
          }
          errorMessage='Campo Obligatorio, solo letras'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Tipo de documento:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CVSelect
          value={tipodoc.toString()}
          onChange={(value) => setTipodoc(value)}
          options={(docs || []).map((item, idx) => ({
            text: item.descripcion_corta,
            value: idx.toString()
          }))}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={1}>
        <Title>Número*:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {docs.length > 0 && (
          <CVInput
            value={manager.dni}
            maxLength={
              docs.length > 0
                ? docs[tipodoc == '' ? 0 : tipodoc].caracteres
                : '8'
            }
            onValidate={(value) => setManager({ ...manager, dni: value })}
            onValid={(value) => onlyNumber(value)}
            placeholder='Ingrese número de Documento'
            error={
              errors &&
              !new RegExp(
                `^[0-9]{${eval(docs[tipodoc].caracteres) || 8}}$`
              ).test(manager.dni)
            }
            errorMessage={`*Campo requerido. (
            ${docs.length > 0 ? docs[tipodoc].caracteres : '8'} caracteres
            númericos)`}
          />
        )}
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Adjuntar DNI:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInputFile
          accept='application/pdf,image/*'
          value={manager.file_dni}
          callback={(e) =>
            setManager({
              ...manager,
              file_dni: e.data
            })
          }>
          Subir archivo
        </CVInputFile>
        <Flex flexDirection='column'>
          <CVText color='gray' fontSize='0.85rem'>
            Ambas caras de su DNI.
          </CVText>
          <CVText color='gray' fontSize='0.85rem'>
            PDF, JPG, JPEG, PNG menor a 10 MB
          </CVText>
        </Flex>
        {errors && manager.file_dni == '' && (
          <CVErrorLabel errorMessage='Obligatorio cargar su documento' />
        )}
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Correo Electrónico:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={manager.correo}
          onChange={(value) => setManager({ ...manager, correo: value })}
          placeholder='Ingrese correo'
          error={errors && (manager.correo == '' || !onlyEmail(manager.correo))}
          errorMessage='Campo Obligatorio (ejm: example@example.com)'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Title>Celular:</Title>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <CVInput
          value={manager.phone}
          maxLength='9'
          onChange={(value) => setManager({ ...manager, phone: value })}
          placeholder='Ingrese número de celular'
          error={errors && (manager.phone == '' || !isPhone(manager.phone))}
          errorMessage='Campo Obligatorio ( 9 caracteres numéricos, no es necesario +51)'
        />
      </Grid>

      {/*<Grid item xs={12} sm={6} md={4}>
          <Title>El representante es la persona de contacto:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Opciones>
            <RadioGroup
              aria-label=''
              name=''
              value={manager.isContact}
              onChange={(value) =>
                setManager({ ...manager, isContact: value })
              }>
              <FormControlLabel
                value='SI'
                control={<Radio color='primary' />}
                label='SI'
              />
              <FormControlLabel
                value='NO'
                control={<Radio color='primary' />}
                label='NO'
              />
            </RadioGroup>
          </Opciones>
            </Grid>*/}
    </Grid>
  );
}

export default DataManager;
