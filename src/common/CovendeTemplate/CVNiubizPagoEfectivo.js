import React, { useEffect, useRef, useState } from 'react';

// Components

import { Box, CircularProgress, Text } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { GET_NIUBIZ_SESSIONID } from '@/app/api/graphql/webpublic/paycard/payniubizService';
import { useHistory } from 'react-router-dom';
import NuibizCustom from './CVNiubizCardPay/CVNiubizCardPayNuibiz';

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
function CVNiubizPagoEfectivo({ order = false, customer, callback, seturl }) {
  const history = useHistory();

  const { importFilesPagoEfectivo } = NuibizCustom();
  const [custom, setcustom] = useState(null);
  const [merchantID, setmerchantID] = useState('');
  const [doToken, setdoToken] = useState('');
  const [sessionID, setsessionID] = useState('');
  const [orden, setorden] = useState(order);
  /***************************************************/
  const [showForm, setshowForm] = useState(false);
  const [activePayment, setactivePayment] = useState(true);
  const [successPayment, setsuccessPayment] = useState(false);
  const [loadingPay, setloadingPay] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);

  const [activeSend, setactiveSend] = useState(false);

  const mountedRef = useRef(true);
  /***************************************************/
  const initdata = async (order) => {
    try {
      const { getNiuBizSessionID } =
        mountedRef.current &&
        (await AxiosGQL(
          GET_NIUBIZ_SESSIONID(order.amount, {
            dni: customer.documentNumber,
            correo: customer.email,
            purchaseNumber: order.purchaseNumber,
            productId: order.productId
          })
        ));

      mountedRef.current && setshowForm(false);
      mountedRef.current && setactivePayment(false);
      // if (getNiuBizSessionID.status) {
      mountedRef.current && setmerchantID(getNiuBizSessionID.data.merchandID);
      mountedRef.current && setdoToken(getNiuBizSessionID.data.tokenID);
      mountedRef.current && setsessionID(getNiuBizSessionID.data.sessionID);

      const result =
        mountedRef.current &&
        (await importFilesPagoEfectivo({
          sessionID: getNiuBizSessionID.data.sessionID,
          order,
          merchantID: getNiuBizSessionID.data.merchandID,
          token: getNiuBizSessionID.data.tokenID
        }));
      mountedRef.current && callback(result);
      mountedRef.current && seturl(result.data.cipUrl);
      mountedRef.current && setshowForm(true);
      mountedRef.current && setactivePayment(true);
      // }
    } catch (error) {
      console.log({ error, message: 'unmounted newbiz pago efectivo' });
    }
  };

  const processPay = async () => {
    setloadingPay(true);
    setshowSuccessModal(true);
    setshowSuccessModal(false);
    setloadingPay(false);
  };

  useEffect(() => {
    // console.log({ order });
    if (order) {
      setorden(order);
      initdata(order);
    }
    if (customer) {
      setcustom(customer);
    }
    return () => {
      //initdata(order);
      mountedRef.current = false;
    };
  }, [order, customer]);

  return (
    <Box width='700px' height='0px' color='white' borderRadius='10px'>
      <Text
        py='4px'
        color='#004772'
        fontSize='30px'
        fontStyle='normal'
        fontWeight='700'
        lineHeight='45px'
        letterSpacing='0em'></Text>

      <CircularProgress
        isIndeterminate
        color='covende.default.main'
        display={activePayment ? 'none' : 'grid'}
        width='100%'
        height='calc(100% - 53px)'
        justifyItems='center'
        alignItems='center'
      />
    </Box>
  );
}

export default CVNiubizPagoEfectivo;
