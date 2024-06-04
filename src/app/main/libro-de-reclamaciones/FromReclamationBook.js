import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVInput from '@CVTemplate/core/CVInput';
import {
  isEmail,
  isPhone,
  onlyNumber,
  onlyEmail
} from '@CVTemplate/core/CVValidation';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react/';
import CVSelect from '@CVTemplate/core/CVSelect';
import { Grid } from '@/../node_modules/@material-ui/core/index';

function FormReclamationBook({
  aclaim,
  setAclaim,
  errors,
  findprovincs,
  finddistrict,
  distritos,
  departamentos,
  provincias
}) {
  return (
    <Box>
      <Flex align='center'>
        <Text w='6rem'>Nombres</Text>
        <CVInput
          placeholder='Primer y segundo nombre'
          value={aclaim.names}
          onChange={(value) => setAclaim({ ...aclaim, names: value })}
          error={errors && aclaim.names == ''}
          errorMessage='Ingrese sus nombres*'
        />
      </Flex>

      <SizeBox />
      <Flex align='center'>
        <Text w='6rem'>Apellidos</Text>
        <CVInput
          placeholder='Primer y segundo apellido'
          value={aclaim.last_names}
          onChange={(value) => setAclaim({ ...aclaim, last_names: value })}
          error={errors && aclaim.last_names == ''}
          errorMessage='Ingrese sus apellidos*'
        />
      </Flex>

      <SizeBox />
      <Flex align='center'>
        <Text w='14rem' ml='-7.5rem' textAlign='end' mr='0.8rem'>
          Correo Electrónico
        </Text>
        <CVInput
          placeholder='micorreo@gmail.com'
          value={aclaim.email}
          onValidate={(value) => {
            return onlyEmail(value);
          }}
          onChange={(value) => setAclaim({ ...aclaim, email: value })}
          error={errors && (!isEmail(aclaim.email) || aclaim.email == '')}
          errorMessage='Correo electrónico no válido (ejemplo@ejemplo.com)*'
        />
      </Flex>

      <SizeBox />
      <Flex align='center' w='50%'>
        <Text w='6rem' mr='1rem' textAlign='end'>
          Celular
        </Text>
        <CVInput
          maxLength='9'
          placeholder='000 000 000'
          value={aclaim.phone}
          onValidate={(value) => {
            return isPhone(value);
          }}
          onChange={(value) => setAclaim({ ...aclaim, phone: value })}
          error={errors && (!isPhone(aclaim.phone) || aclaim.phone == '')}
          errorMessage='Sólo caracteres numéricos. No es necesario anteponer +51*'
        />
      </Flex>
      <SizeBox />

      <Flex w='100%'>
        <Flex align='center' w='25rem' ml='1rem'>
          <Text
            w='15rem'
            ml={aclaim.typeDocument == 'DNI' ? '-6.8rem' : '-8.8rem'}
            textAlign='end'
            mr='0.8rem'>
            Tipo de documento
          </Text>
          <CVSelect
            titleContent='space-between'
            value={aclaim.typeDocument}
            onChange={(value) => setAclaim({ ...aclaim, typeDocument: value })}
            options={[
              { text: 'DNI', value: 'DNI' },
              {
                text: 'Carnet de extranjeria',
                value: 'Carnet de extrangeria'
              }
            ]}
          />
        </Flex>
        <Flex align='center' w='33rem' mr='-6rem'>
          <Text w='24rem' mx='1rem' textAlign='end'>
            Número de documento
          </Text>
          <CVInput
            value={aclaim.dni}
            onValidate={(value) => onlyNumber(value)}
            placeholder='000000000'
            onChange={(value) => setAclaim({ ...aclaim, dni: value })}
            error={
              errors &&
              !(
                onlyNumber(aclaim.value) ||
                aclaim.value == '' ||
                `${aclaim.dni}`.length == 8
              )
            }
            errorMessage='Sólo 8 caracteres numéricos*'
          />
        </Flex>
      </Flex>

      <br />
      <Flex align='center'>
        <Text mr='1rem'>Dirección</Text>
        <Spacer />
        <CVInput
          placeholder='Dirección'
          value={aclaim.address}
          onChange={(value) => setAclaim({ ...aclaim, address: value })}
          error={errors && aclaim.address == ''}
          errorMessage='Ingrese sus apellidos*'
        />
      </Flex>
      <br />
      <Flex justify='space-between' w='100%'>
        <Box>
          <Flex align='center'>
            <Text mr='2rem'>Región</Text>
            <Spacer />
            <CVSelect
              options={(departamentos || []).map((item) => ({
                value: item._id,
                text: item.name
              }))}
              value={aclaim.departamento_id}
              onChange={(value) => findprovincs(value)}
            />
          </Flex>
        </Box>
        <Box ml='5px'>
          <CVSelect
            options={(provincias || []).map((item) => ({
              text: item.name,
              value: item._id
            }))}
            title='Provincia'
            value={aclaim.provincia_id}
            onChange={(value) => finddistrict(value)}
            error={errors && aclaim.provincia_id == ''}
            errorMessage='Seleccione la provincia*'
          />
        </Box>
        <Box ml='5px'>
          <CVSelect
            options={(distritos || []).map((item) => ({
              text: item.name,
              value: item._id
            }))}
            title='Distrito'
            value={aclaim.distrito_id}
            onChange={(value) => setAclaim({ ...aclaim, distrito_id: value })}
            error={errors && aclaim.distrito_id == ''}
            errorMessage='Seleccione el distrito*'
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default FormReclamationBook;
