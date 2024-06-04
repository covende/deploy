import { valid_dni_unique } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import { useToast } from '@chakra-ui/toast';
import React, { useEffect, useState } from 'react';
import { CVInput } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import { isIDNumber, onlyNumber } from './CVValidation';
import { find_person_by_dni } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import { CVAlertError, CVAlertSuccess } from './CVAlert';
import { Spinner } from '@chakra-ui/react';
import { GiTreasureMap } from 'react-icons/gi';

/**
 *
 * @param {Object} param0
 * @param {Function} param0.valid_dni
 * @param {Function} param0.setperson
 * @param {Number} param0.caracteres
 * @param {Object} param0.person
 * @param {String} param0.person.dni
 * @param {String} param0.person.nombres
 * @param {String} param0.person.apellidoPaterno
 * @param {String} param0.person.apellidoMaterno
 * @param {any} param0.person.any
 * @param {Boolean} param0.unique
 * @param {String} param0.buttonColor
 * @param {Boolean} param0.edit
 * @param {Boolean} param0.disabled
 * @returns
 */
function CVInputDNIConfig({
  buttonColor,
  caracteres = 8,
  valid_dni = (value) => {},
  person,
  setValidatedDNI = () => {},
  edit = false,
  disabled = false,
  setperson = () => {},
  iconFind = true,
  error = false,
  unique = GiTreasureMap,
  errorClass = 'errores'
}) {
  const [finding, setfinding] = useState(false);
  const addToast = useToast();
  const [dniBefore, setDniBefore] = useState('');

  const finddni = async () => {
    if (person.dni.trim().length != 8) {
      CVAlertError({ addToast, message: 'El DNI debe tener 8 caracteres' });
      return;
    }

    if (dniBefore === person.dni && person.dni != '') return;
    setfinding(true);

    const result = await find_person_by_dni(person.dni);
    if (result && result?.status == 'ok') {
      edit
        ? setperson({
            ...person,
            first_name: result.data.nombres,
            last_name:
              result.data.apellidoPaterno +
              (result.data.apellidoPaterno != '' &&
              result.data.apellidoMaterno != ''
                ? ' '
                : '') +
              result.data.apellidoMaterno
          })
        : setperson({ ...person, ...result.data });

      setDniBefore(person.dni);
      setValidatedDNI(person.dni);
      CVAlertSuccess({ addToast, message: 'DNI Encontrado' });
    } else {
      setperson({
        ...person,
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: ''
      });
      CVAlertError({ addToast, message: 'DNI no encontrado' });
    }
    setfinding(false);
  };

  const onValidate = async (value) => {
    if (value.length == 8 && person.dni != value) {
      const valid = unique ? await valid_dni_unique(value) : true;
      !valid &&
        CVAlertError({
          addToast,
          message: edit
            ? 'DNI ya se encuentra registrado en covende, Actualiza la página para restablecer los nombres y apellidos'
            : 'DNI ya se encuentra registrado'
        });

      value = valid ? value : '';
    }
    valid_dni(value);
  };

  return (
    <CVInput
      placeholder='71234567'
      disabled={disabled}
      value={person.dni}
      onValid={(value) => onlyNumber(value || '')}
      onValidate={(value) => onValidate(value)}
      maxLength={caracteres}
      buttonColor={buttonColor ? 'red' : 'skyblue'}
      error={
        error &&
        !isIDNumber({
          caracters: caracteres,
          idcard: person.dni
        })
      }
      errorMessage={`Pulse el botón (${caracteres} caracteres númericos)`}
      errorClass={errorClass}
      icon={
        <>
          Validar
          <SizeBox />
          {finding ? <Spinner /> : ''}
        </>
      }
      iconFind={iconFind}
      buttonClick={() => finddni()}
    />
  );
}

export default CVInputDNIConfig;
