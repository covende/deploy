import {
  CVDateDifference,
  CVFormatDate,
  CVJsonFormat,
  CVMoneyFormat
} from '../CovendeTemplate/CVMethods';

/**
 *
 * @param {Array} data
 * @returns {String}
 */
export const json_format = (data = []) =>
  CVJsonFormat({
    data,
    variant: 'withoutKeys'
  });

/**
 *
 * @param {Number|String} money
 * @returns {String}
 *
 */
export const moneyformat = (money) =>
  CVMoneyFormat({ amount: money, currency: false });

/**
 * Calcula la diferencia entre una fecha hasta el momento actual
 * @param {Date} datetime
 * @returns {String}
 */
export const get_time_diff = (datetime) => {
  const { days, hours, minutes, seconds } = CVDateDifference({
    pastDate: datetime
  });

  if (days > 0) return `hace ${days} dias`;
  if (hours > 0) return `hace ${hours} horas`;
  if (minutes > 0) return `hace ${minutes} minutos`;
  if (seconds > 0) return `hace ${seconds} segundos`;
  return (
    days +
    ' Days ' +
    hours +
    ' Hours ' +
    minutes +
    ' Minutes ' +
    seconds +
    ' Seconds'
  );
};

/**
 * date => YYYY-MM-DD
 * @param {Date} fecha
 * @returns {String}
 */
export const formatFecha = (fecha) =>
  CVFormatDate({ date: fecha, format: 'YYYY-MM-DD' });

/**
 * Formato local YYYY-MM-DD => DD/MM/YYYY
 * @param {string} fecha
 * @returns {string}
 */
export const formatDate = (fecha) =>
  CVFormatDate({ date: fecha, format: 'DD/MM/YYYY' });

/**
 * Formato local date => DD/MM/YYYY
 * @param {Date} fecha
 * @returns {string}
 */
export const dateToFormat = (fecha) =>
  CVFormatDate({ date: fecha, format: 'DD/MM/YYYY' });

/**
 * Conviert pagination info a pagination mongoose v2 format
 * @param {{total:Number, itemsPage: Number, pages: Number, page:Number}} info
 * @returns {any}
 */
export const formatpaginate = (info) => {
  return {
    totalDocs: info.total,
    limit: info.itemsPage,
    totalPages: info.pages,
    page: info.page,
    pagingCounter: 1,
    hasPrevPage: info.page > 1,
    hasNextPage: info.page < info.pages,
    prevPage: info.page > 1 ? info.page - 1 : null,
    nextPage: info.page < info.pages ? info.page + 1 : null
  };
};
