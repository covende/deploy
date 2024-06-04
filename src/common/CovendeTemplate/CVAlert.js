import { confirmAlert } from 'react-confirm-alert';

/**
 * @param {Object} param0
 * @param {Object} param0.addToast
 * @param {String} param0.message
 * @param {String} param0.title
 * @param {number} param0.duration
 */
export const CVAlertWarning = ({
  addToast,
  title = '',
  message = '',
  duration = 9000
}) => {
  addToast({
    position: 'top-right',
    title: title,
    description: message,
    status: 'warning',
    duration,
    isClosable: true
  });
};

/**
 * @param {Object} param0
 * @param {Object} param0.addToast
 * @param {String} param0.message
 * @param {String} param0.title
 */
export const CVAlertSuccess = ({ addToast, title = '', message = '' }) => {
  addToast({
    position: 'top-right',
    title: title,
    description: message,
    status: 'success',
    duration: 9000,
    isClosable: true
  });
};

/**
 * @param {Object} param0
 * @param {Object} param0.addToast
 * @param {String} param0.message
 * @param {String} param0.title
 */
export const CVAlertError = ({ addToast, title = '', message = '' }) => {
  addToast({
    position: 'top-right',
    title: title,
    description: message,
    status: 'error',
    duration: 9000,
    isClosable: true
  });
};

/**
 *
 * @param {Object} param0
 * @param {String} param0.title
 * @param {String} param0.message
 * @param {String} param0.okLabel
 * @param {Function} param0.okAction
 * @param {String} param0.noLabel
 * @param {Function} param0.noAction
 * @returns
 */
export const CVAlertConfirm = ({
  title = '',
  message = '',
  okLabel = 'Aceptar',
  okAction = () => {},
  noLabel = 'Cancelar',
  noAction = () => {}
}) => {
  return confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: okLabel,
        onClick: () => okAction()
      },
      {
        label: noLabel,
        onClick: () => noAction()
      }
    ],
    overlayClassName: 'overlay-custom-class-name'
  });
};
