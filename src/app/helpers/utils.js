const isIntegerRE = /^\+?(0|[1-9]\d*)$/;
const numberRE = /^(?=.*[0-9]).+$/;
const twoWordsRE = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
const lowercaseRE = /^(?=.*[a-z]).+$/;
const uppercaseRE = /^(?=.*[A-Z]).+$/;
const specialCharRE = /^(?=.*[_\W]).+$/;
const emailRE =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rucRE = /^[1-2][0][0-9]{9}$/;
const dateRE =
  /^[0,1]?\d\/(([0-2]?\d)|([3][01]))\/((199\d)|([2-9]\d{3}))\s[0-2]?[0-9]:[0-5][0-9] (am|pm)?$/;
const celphoneRE = /(\d{0,3})(\d{0,3})(\d)(\d{0,2})/;

/**
 * @function join
 * @description Toma una colección de reglas de validación, uniéndose a un arreglo
 * @param [function] - un arreglo de funciones para validar
 * @param value - el valor a validar
 * @param data - los datos para validar
 * @return error - el primer error devuelto por la función de validación
 */
const join = (rules) => (value, data) =>
  rules.map((rule) => rule(value, data)).filter((error) => !!error)[0];

const noValue = (value) =>
  value === undefined || value === null || value === '';

/**
 * @function validateWithRE
 * @description - Toma una expresión regular y un mensaje y devuelve una función que devolverá
 * El mensaje si la expresión regular no pasa con el valor pasado a la función.
 * @param {RegExp} = la expresión regular será usada para probar el valor (value)
 * @param String - el valor del mensaje que se devolverá en caso de error
 * @return Function - una función que toma un valor y devuelve un mensaje de cadena si la expresión regular falla.
 */
const validateWithRE = (RE, message) => (value) => {
  if (!RE.test(value)) {
    return message;
  }
};

export const minLength = (minimum) => (value) => {
  if (!noValue(value) && value.length < minimum) {
    return `El valor debe contener al menos ${minimum} caracteres`;
  }
};

export const maxLength = (maximum) => (value) => {
  if (!noValue(value) && value.length > maximum) {
    return `El valor debe tener no más de ${maximum} caracteres`;
  }
};

export const valueRequired = (value) => {
  if (noValue(value)) {
    return 'Valor requerido';
  }
};

export const containsSpecialChar = (value) =>
  value &&
  validateWithRE(specialCharRE, 'Debe contener un caracter especial.')(value);

export const isInteger = (value) =>
  value && validateWithRE(isIntegerRE, 'Debe ser un valor entero.')(value);

export const containsNumber = (value) =>
  value && validateWithRE(numberRE, 'Debe contener al menos un número.')(value);

export const containsLowercase = (value) =>
  value &&
  validateWithRE(
    lowercaseRE,
    'Debe contener al menos una letra en minúsculas.'
  )(value);

export const containsUppercase = (value) =>
  value &&
  validateWithRE(
    uppercaseRE,
    'Debe contener al menos una letra en mayúsculas.'
  )(value);

export const containsTwoWords = (value) => {
  const lowercaseValue = value ? value.toLowerCase() : '';
  return (
    value &&
    validateWithRE(
      twoWordsRE,
      'Debe contener dos palabras, i.e. Nombre completo.'
    )(lowercaseValue)
  );
};

export const isEmail = (value) =>
  value &&
  validateWithRE(emailRE, 'Debe ser un correo electrónico válido.')(value);

export const isRUC = (value) =>
  value && validateWithRE(rucRE, 'Debe ser un RUC válido.')(value);

export const isValidDate = (value) =>
  value &&
  validateWithRE(dateRE, 'Debe ser un formato de fecha válido.')(value);

export const isInFuture = (value) => {
  const currentDate = new Date();
  const setDate = new Date(value);
  return setDate < currentDate
    ? 'Por favor, elija una fecha en el futuro'
    : null;
};

export const validateOneOf = (values, message) => (value) => {
  const isValid = values.filter((item) => item === value).length > 0;
  return isValid ? message : null;
};

export const matches = (matchVal) => (currentVal) =>
  matchVal === currentVal ? null : 'Los valores deben coincidir';

export const oneOf = (values) => (value) =>
  validateOneOf(
    values,
    `El valor debe ser uno de: ${values.join(', ')}`
  )(value);

export const noLaterThan = (field) => (value, data) => {
  const startDate = new Date(data[field]);
  const endDate = new Date(value);
  return endDate < startDate
    ? 'La fecha de finalización debe ser posterior a la fecha de inicio.'
    : null;
};

export const createValidator =
  (validationRules) =>
  (data = {}) => {
    const errors = {};
    Object.keys(validationRules).forEach((key) => {
      const rule = join([].concat(validationRules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };

export const isCelphone = (e) => {
  // Ejm: 999 999 999
  const x = e.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d)(\d{0,2})/);

  return !x[4] ? `${x[1]} ${x[2]}${x[3]}` : `${x[1]} ${x[2]} ${x[3]}${x[4]}`;
};

export const getErrorCatch = (error) => {
  //console.log('Error: ', error);
  switch (error.status) {
    case 500:
      return 'Internal Server Error';
    case 401:
      return 'Credenciales inválidas';
    default:
      return error;
  }
};

export const isExistValue = (valor) => {
  return valor && ['""', '"{}"', '"[]"'].includes(JSON.stringify(valor))
    ? false
    : !!valor;
};
