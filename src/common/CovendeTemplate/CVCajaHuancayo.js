import React, { useEffect, useRef, useState } from 'react';

// Components
import { Box, CircularProgress, Text } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

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
 * @param {String} param0.order.paymentConcept
 * @param {String} param0.order.additionalData
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
function CVCajaHuancayo({ order = false, customer, callback, seturl }) {
  const [activePayment, setactivePayment] = useState(true);
  const mountedRef = useRef(true);
  const [custom, setcustom] = useState(null);
  const [orden, setorden] = useState(order);

  /***************************************************/
  const initdata = async (order) => {
    try {
      mountedRef.current && setactivePayment(false);
      const { generateCodeHyo } =
        mountedRef.current &&
        (await AxiosGQL(`{
          generateCodeHyo(
            email:"${customer.email}",
            amount:${order.amount},
            currency:"${order.currency}",
            antifraude:{
              transactionCode:"${order.purchaseNumber}"
              paymentConcept:"""${order.paymentConcept}"""
              additionalData:"""${order.additionalData}"""
              userEmail:"${customer.email}"
              userName:"${customer.name}"
              userLastName:"${customer.lastName}"
              userUbigeo:"010101"
              userCountry:"PERU"
              userDocumentType:"${customer.documentType}"
              userDocumentNumber:"${customer.documentNumber}"
              userCodeCountry:"01"
              userPhone:"${customer.phoneNumber || ''}"
            }
          ){
            status
            message
            data{
              cip
              cipUrl
              currency
              amount
              transactionCode
              dateExpiry
            }
          }
        }`));
      mountedRef.current && callback(generateCodeHyo);
      mountedRef.current && seturl(generateCodeHyo.data.cipUrl);
      mountedRef.current && setactivePayment(true);
    } catch (error) {
      mountedRef.current && setactivePayment(false);
      mountedRef.current && callback({ status: false, message: error.message });
    }
  };

  useEffect(() => {
    if (order) {
      setorden(order);
      initdata(order);
    }
    if (customer) {
      setcustom(customer);
    }
    return () => {
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

export default CVCajaHuancayo;
