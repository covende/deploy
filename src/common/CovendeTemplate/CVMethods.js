import { getLoggedInUser } from '@/app/helpers/authUtils';
import React from 'react';
import { A_CARD_PRODUCT } from './CVCardProduct/CVCardProductRedux/Actions';

/**
 *
 * @param {Object} param0
 * @param {Date} param0.pastDate
 * @param {Date} param0.futureDate
 * @returns
 */
export const CVDateDifference = ({
  pastDate = new Date().getTime(),
  futureDate = new Date().getTime()
}) => {
  var pastDate = new Date(pastDate).getTime();
  var futureDate = new Date(futureDate).getTime();

  if (pastDate < futureDate) {
    var milisec_diff = futureDate - pastDate;
  } else {
    var milisec_diff = pastDate - futureDate;
  }
  var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  var date_diff = new Date(milisec_diff);
  return {
    years: Math.floor(days / 365),
    months: Math.floor(days / 30),
    days: days,
    hours: date_diff.getHours(),
    minutes: date_diff.getMinutes(),
    seconds: date_diff.getSeconds()
  };
};

/**
 *
 * @param {String} code
 * @returns {String}
 */
export const CVFormatCutCode = (code) => {
  code = String(code || '');
  let day = code.substring(2, 4) || '';
  let month = code.substring(4, 6) || '';
  let year = code.substring(6, 10) || '';

  if (!!day && !!month && !!year) {
    return day + '-' + month + '-' + year;
  } else {
    return CVFormatDate({ date: new Date(), format: 'DD-MM-YY' });
  }
};

/**
 *
 * @param {Object} param0
 * @param {('DD/MM/YYYY' | 'YYYY-MM-DD'|'DD-MM-YY')} param0.format
 * @param {Date|String} param0.date
 * @param {Boolean} param0.time
 * @returns
 */
export const CVFormatDate = ({
  format = 'DD/MM/YYYY' || 'YYYY-MM-DD',
  date = new Date(),
  time = false
}) => {
  let hours = 0;
  let minutes = 0;
  let secons = 0;
  let fecha = '';

  if (typeof date == 'string') {
    date = new Date(date);
  }

  hours = date.getHours().toString().padStart(2, '0');
  minutes = date.getMinutes().toString().padStart(2, '0');
  secons = date.getSeconds().toString().padStart(2, '0');

  if (typeof date == 'object')
    date = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  if (format == 'DD/MM/YYYY') fecha = date.split('-').reverse().join('/');
  if (format == 'YYYY-MM-DD') fecha = date;
  if (format == 'DD-MM-YY') {
    fecha = date.split('-');
    fecha[0] = fecha[0].toString().substring(2, 4);
    fecha = fecha.reverse().join('-');
  }

  return fecha + (time ? ` ${hours}:${minutes}:${secons}` : '');
};

/**
 *
 * @param {Object} param0
 * @param {String|Number} param0.amount
 * @param {String} param0.currency
 */
export const CVMoneyFormat = ({
  amount,
  currency = 'S/ ',
  decimals = 2,
  decimalseparator = '.',
  milesseparator = ','
}) => {
  try {
    amount += '';

    // console.log({ amount });

    let number = eval(amount);

    (decimals = isNaN((decimals = Math.abs(decimals))) ? 2 : decimals),
      (decimalseparator =
        typeof decimalseparator === 'undefined' ? '.' : decimalseparator);
    milesseparator =
      typeof milesseparator === 'undefined' ? ',' : milesseparator;
    var sign = number < 0 ? '-' : '';
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decimals)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;

    let result =
      sign +
      (j ? i.substr(0, j) + milesseparator : '') +
      i
        .substr(j)
        .replace(
          /(\decimalseparator{3})(?=\decimalseparator)/g,
          '$1' + milesseparator
        ) +
      (decimals
        ? decimalseparator +
          Math.abs(number - i)
            .toFixed(decimals)
            .slice(2)
        : '');

    return `${currency ? currency : ''}${result}`;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {Object} param0
 * @param {Object} param0.data
 * @param {('tostring' | 'parse')} param0.method
 * @param {('withKeys' | 'withoutKeys')} param0.variant
 * @returns
 */
export const CVJsonFormat = ({
  data,
  method = 'tostring' || 'parse',
  variant = 'withKeys' || 'withoutKeys'
}) => {
  let json = '';
  if (method == 'parse') return JSON.parse(data);
  if (method == 'tostring') {
    switch (variant) {
      case 'withKeys':
        json = JSON.stringify(data);
        break;
      case 'withoutKeys':
        json = JSON.stringify(data).replace(/"([^"]+)":/g, '$1:');
        break;
      default:
    }
  }
  return json;
};

/**
 *
 * @param {Number} length
 * @param {String} chars
 * @returns
 */
export const CVRandomString = (
  length,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) => {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

export const CVGoUp = (props) => {
  window.document.title = props?.match?.params?.slug || 'Covende';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const CVRenderHTML = ({ children }) => {
  return (
    <div
      style={{ fontSize: '1rem' }}
      dangerouslySetInnerHTML={{
        __html: children
      }}
    />
  );
};

export const CVValidLogin = (dispatch, url = '') => {
  let us = getLoggedInUser();
  if (us == null) {
    dispatch(A_CARD_PRODUCT({ carrito_login: true, url }));
    return false;
  }
  return true;
};

/**
 *
 * @param {Object} param0
 * @param {[Object]} param0.lista
 * @param {String} param0.key
 * @returns
 */
export const CVListSort = ({ lista, key }) => {
  lista.sort((a, b) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
  });
  return lista;
};

/**
 *
 * @param {String} word
 * @returns
 */
export const CVCapitalize = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};
