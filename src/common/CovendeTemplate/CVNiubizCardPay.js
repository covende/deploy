import React, { useEffect, useState } from 'react';

// Components

import PaymentMethod from './CVNiubizCardPay/CVNiubizCardPayPayment';
import './CVNiubizCardPay/CVNiubizCardPay.css';

import NuibizCustom from './CVNiubizCardPay/CVNiubizCardPayNuibiz';
import { Box, useToast } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { GET_NIUBIZ_SESSIONID } from '@/app/api/graphql/webpublic/paycard/payniubizService';
import { useHistory } from 'react-router-dom';
import { CVErrorLabel } from './CVInput';
import CVUseStateCallback from './CVHooks/CVUseStateCallback';
import { CVErrorTags } from './CVValidation';
import { CVAlertError } from './CVAlert';

/**
 *
 * @param {Object} param0
 * @param {Object} param0.order
 * @param {Number} param0.order.amount
 * @param {String} param0.order.purchaseNumber
 * @param {[String]} param0.order.installment
 * @param {String} param0.order.productId
 * @param {Number} param0.order.periodo
 * @param {String} param0.order.currency
 * @param {Object} param0.customer
 * @param {String} param0.customer.name
 * @param {String} param0.customer.lastName
 * @param {String} param0.customer.email
 * @param {String} param0.customer.phoneNumber
 * @param {String} param0.customer.documentNumber
 * @param {String} param0.customer.documentType
 * @param {Function} param0.callback
 * @returns
 */
function CVNiubizCardPay({ order = false, customer, callback }) {
  const history = useHistory();

  const addToast = useToast();
  const [seeerror, setseeerror] = CVUseStateCallback(false);
  const { importFiles, payVisa, errors } = NuibizCustom();
  const [custom, setcustom] = useState(null);
  const [merchantID, setmerchantID] = useState('');
  const [doToken, setdoToken] = useState('');
  const [sessionID, setsessionID] = useState('');
  const [orden, setorden] = useState(order);
  /***************************************************/
  const [showForm, setshowForm] = useState(false);
  const [activePayment, setactivePayment] = useState(false);
  const [successPayment, setsuccessPayment] = useState(false);
  const [loadingPay, setloadingPay] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);

  /***************************************************/
  const initdata = async (order) => {
    const { getNiuBizSessionID } = await AxiosGQL(
      GET_NIUBIZ_SESSIONID(order.amount, {
        dni: customer.documentNumber,
        correo: customer.email,
        purchaseNumber: order.purchaseNumber,
        productId: order.productId
      })
    );

    setshowForm(false);
    setactivePayment(false);
    if (getNiuBizSessionID.status) {
      setmerchantID(getNiuBizSessionID.data.merchandID);
      setdoToken(getNiuBizSessionID.data.tokenID);
      setsessionID(getNiuBizSessionID.data.sessionID);

      await importFiles({
        sessionID: getNiuBizSessionID.data.sessionID,
        order,
        merchantID: getNiuBizSessionID.data.merchandID
      });
      setshowForm(true);
      setactivePayment(true);
    }
  };

  const senddata = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }

    if (errors?.cardNumber != '') {
      CVAlertError({
        addToast,
        message: errors?.cardNumber
      });
      return false;
    }
    if (errors?.cardExpiry != '') {
      CVAlertError({
        addToast,
        message: errors?.cardExpiry
      });
      return false;
    }
    if (errors?.cardCvv != '') {
      CVAlertError({
        addToast,
        message: errors?.cardCvv
      });
      return false;
    }

    setloadingPay(true);
    setshowSuccessModal(true);
    let result = await payVisa({ customer, merchantID, doToken, order });
    if (!result.status) {
      setorden({ ...order });
      CVAlertError({
        addToast,
        message: result?.message
      });
      //history.push(window.location.pathname);
    }
    window.payform = null;
    setshowSuccessModal(false);
    setloadingPay(false);
    callback(result);
  };

  const processPay = () =>
    !setseeerror ? setseeerror(true, senddata) : senddata();

  useEffect(() => {
    if (order?.amount != null) {
      window.payform = null;
      setorden(order);
      initdata(order);
    }
    if (customer) {
      setcustom(customer);
    }
  }, [order, customer]);

  return (
    <Box>
      <PaymentMethod
        customer={custom}
        payVisa={processPay}
        callback={callback}
        merchantID={merchantID}
        doToken={doToken}
        order={orden}
        showForm={showForm}
        activePayment={activePayment}
        successPayment={successPayment}
        loadingPay={loadingPay}
        showSuccessModal={showSuccessModal}
      />
      {errors?.cardNumber != '' && seeerror && (
        <CVErrorLabel errorMessage='cardNumber' />
      )}
      {errors?.cardExpiry != '' && seeerror && (
        <CVErrorLabel errorMessage='cardExpiry' />
      )}
      {errors?.cardCvv != '' && seeerror && (
        <CVErrorLabel errorMessage='cardCvv' />
      )}
    </Box>
  );
}

export default CVNiubizCardPay;
