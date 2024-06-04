import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { METHOD_PAYMENTDEF } from '@/app/helpers';
import { LocalStorageAdapter } from '@/app/infrastructure';
import { useState, useEffect } from 'react';
import { formatFecha } from '@/common/utils/methods';
import { PLAN_STORE_PAY } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
export const getTokenVisa = async () => {
  const salidaJson = {
    error: false,
    mensajeError: null,
    res: {}
  };
  try {
    const response = await fetch(process.env.URL_GET_TOKEN_VISA, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.AUTH_BASE64}`
      }
    });

    if (response.ok) {
      const res = await response.text();

      salidaJson.error = false;
      salidaJson.res = res;
      console.log('paso1:' + res);
    } else {
      salidaJson.error = true;
      salidaJson.res = response;
    }
  } catch (error) {
    console.error(error);
  }

  return salidaJson;
};

export const getTokenSessionVisa = async (
  idMercado,
  tokenVisa,
  monto,
  customer
) => {
  console.log('getTokenSessionVisa.monto', monto);
  const salidaJson = {
    error: false,
    mensajeError: null,
    res: {}
  };

  try {
    const response = await fetch(process.env.URL_GET_SESSION_VISA + idMercado, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenVisa
      },
      body: JSON.stringify({
        amount: monto,
        antifraud: {
          merchantDefineData: {
            MDD4: 'micorreo@mail.com',
            MDD21: '0',
            MDD32: '87654321',
            MDD75: 'Registrado',
            MDD77: '109'
          }
        },
        channel: 'web',
        recurrenceMaxAmount: monto
      })
    });

    if (response.ok) {
      const res = await response.json();

      salidaJson.error = false;
      salidaJson.res = res;
    } else {
      salidaJson.error = true;
      salidaJson.res = response;
    }
  } catch (error) {
    console.error(error);
  }

  return salidaJson;
};

export const sendTransaction = async (idMercado, token, json) => {
  const salidaJson = {
    error: false,
    mensajeError: null,
    res: {}
  };

  try {
    const response = await fetch(process.env.URL_TRANSACTION_VISA + idMercado, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(json)
    });

    if (response.ok) {
      const res = await response.json();
      salidaJson.error = false;
      salidaJson.res = res;
    } else {
      const res = await response.json();
      salidaJson.error = true;
      salidaJson.res = res;
    }
  } catch (error) {
    console.error(error);
  }

  return salidaJson;
};

export const sendTransactionRecurrent = async (idMercado, token, json) => {
  const salidaJson = {
    error: false,
    mensajeError: null,
    res: {}
  };

  try {
    const response = await fetch(
      `${process.env.URL_TRANSACTION_VISA}${idMercado}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(json)
      }
    );

    if (response.ok) {
      const res = await response.json();
      salidaJson.error = false;
      salidaJson.res = res;
    } else {
      salidaJson.error = true;
      salidaJson.res = response;
    }
  } catch (error) {
    console.error(error);
  }

  return salidaJson;
};

const useNiubiz = () => {
  const [token, setToken] = useState('');
  const [session, setSession] = useState('');
  const [activePayment, setActivePayment] = useState(false);
  const [activeSend, setActiveSend] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [errors, setErrors] = useState({
    cardNumber: undefined,
    cardExpiry: undefined,
    cardCvv: undefined
  });
  const [order, setOrder] = useState(undefined);

  const elementStyles = {
    base: {
      color: '#666666',
      fontWeight: 400,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      placeholder: {
        color: '#999999'
      },
      autofill: {
        color: '#e39f48'
      }
    },
    invalid: {
      color: '#E25950',
      '::placeholder': {
        color: '#FFCCA5'
      }
    }
  };

  const createForm = () => {
    window.cardNumber = window.payform.createElement(
      'card-number',
      {
        style: elementStyles,
        placeholder: 'Número de Tarjeta'
      },
      'txtNumeroTarjeta'
    );
    cardNumber.then((element) => {
      element.on('change', function (data) {
        console.log('cardNumber.data', data);
        if (data && data.length) {
          setErrors({
            ...errors,
            cardNumber: data[0].es
          });
        }
      });
    });

    window.cardExpiry = window.payform.createElement(
      'card-expiry',
      {
        style: elementStyles,
        placeholder: 'MM/AA'
      },
      'txtFechaVencimiento'
    );
    cardExpiry.then((element) => {
      element.on('change', function (data) {
        console.log('cardExpiry.data', data);
        if (data && data.length) {
          setErrors({
            ...errors,
            cardExpiry: data[0].es
          });
        }
      });
    });

    window.cardCvv = window.payform.createElement(
      'card-cvc',
      {
        style: elementStyles,
        placeholder: 'CVV'
      },
      'txtCvv'
    );
    cardCvv.then((element) => {
      element.on('change', function (data) {
        console.log('cardCvv.data', data);
        if (data && data.length) {
          setErrors({
            ...errors,
            cardCvv: data[0].es
          });
        }
      });
    });

    setShowForm(true);
  };

  const setConfigurationScriptLoaded = () => {
    const configuration = {
      sessionkey: session,
      channel: 'web',
      merchantid: process.env.MERCHANT_ID,
      purchasenumber: `${order.purchaseNumber}`,
      amount: order.amount,
      language: 'es', // esto faltaba en su documentación de nibubiz
      merchantConfiguration: {
        recurrencyEnabled: false,
        tokenizationEnabled: false
      },
      font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap'
    };
    window.configuration = configuration;
    window.payform.setConfiguration(configuration);
    createForm();
  };

  const addCustomPayScript = () =>
    new Promise((resolve) => {
      if (window.payform) {
        setShowForm(true);
      } else {
        const script = document.createElement('script');
        script.src =
          'https://static-content.vnforapps.com/elements/v1/payform.min.js';
        script.async = true;
        script.onload = () => setConfigurationScriptLoaded();
        document.head.appendChild(script);
      }
      resolve();
    });

  const importFiles = async () => {
    try {
      await addCustomPayScript();

      console.log('Cargando servicio de pago');
    } catch (error) {
      alert('error import');
      console.log('Error al cargar el script de pago', error);
    }
  };

  const getTokenNiubizSecurity = async () => {
    try {
      const resToken = await getTokenVisa();
      if (resToken.error) {
        alert('error get token');
        return;
      }
      setToken(resToken.res);
      console.log(resToken.res);
    } catch (error) {
      alert('error al obtener token');
      console.log('Ocurrió un error al obtener el token', error);
    }
  };

  const getTokenNiubizSesion = async () => {
    try {
      const resToken = await getTokenSessionVisa(
        process.env.MERCHANT_ID,
        token,
        order.amount
      );
      console.log('aquie est el token de session');
      if (resToken.error) {
        alert('error en la data ');
        return;
      }
      setSession(resToken.res.sessionKey);
      setActivePayment(true);
    } catch (error) {
      alert('error en tel token de seccion ');
      console.log('Ocurrió un error al obtener el token de sesión', error);
    }
  };

  const doTransaction = async (MERCHANT_ID, doToken, obj, data) => {
    // document.getElementById("modalbox").innerHTML = 'cargando ...';
    try {
      var datos = await sendTransaction(MERCHANT_ID, doToken, obj);
      setSuccessPayment(true);
      setLoadingPay(false);
      setShowForm(false);

      if (datos.error) {
        setShowSuccessModal(true);
        setSuccessPayment(true);

        var miFechaActual;
        miFechaActual = new Date();
        var dia = miFechaActual.getDate();
        var mes = parseInt(miFechaActual.getMonth()) + 1;
        var ano = miFechaActual.getFullYear();

        var cliente = data.name + ' ' + data.lastName;
        var descripcion = 'comisiones y ventas';

        var tarjeta = JSON.stringify(datos.res.data.CARD);
        var marcaTarjeta = JSON.stringify(datos.res.data.BRAND);
        var ok = JSON.stringify(datos.res.data.ACTION_DESCRIPTION);

        document.getElementById('ResponseNiubiz').innerHTML =
          'Cliente: ' +
          cliente +
          '<br>' +
          'Tarjeta enmascarada: ' +
          tarjeta +
          '<br>' +
          'Marca de la tarjeta ' +
          marcaTarjeta +
          '<br>Fecha: ' +
          dia +
          '/' +
          mes +
          '/' +
          ano +
          ' <br>' +
          'Descripción de producto: ' +
          descripcion +
          '<br>' +
          ok;

        //  document.getElementById("ResponseNiubiz").innerHTML = JSON.stringify(datos.res.data);
      } else {
        let storedStates = LocalStorageAdapter.get('covendeCreateStore') || {};
        let store_id = storedStates.store_id || storedStates.store.store_id;

        console.log({ obj, data, datos });
        var e = new Date();
        let fecha_inicio = formatFecha(e);
        e.setMonth(e.getMonth() + order.periodo);
        let fecha_fin = formatFecha(e);

        let result = await AxiosGQL(
          PLAN_STORE_PAY({
            store_id: store_id,
            method: METHOD_PAYMENTDEF,
            details: window.btoa(JSON.stringify({ obj, data, datos, order })),
            user_id: storedStates.user.user_id,
            amount: order.amount,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin
          })
        );
        console.log(result);

        /*var miFechaActual;
        miFechaActual = new Date();
        var dia = miFechaActual.getDate();
        var mes = parseInt(miFechaActual.getMonth()) + 1;
        var ano = miFechaActual.getFullYear();

        var orden = JSON.stringify(datos.res.order.purchaseNumber);
        var moneda = JSON.stringify(datos.res.order.currency);
        var monto = JSON.stringify(datos.res.order.authorizedAmount);
        var cliente = data.name + ' ' + data.lastName;
        var descripcion = 'comisiones y ventas';

        var tarjeta = JSON.stringify(datos.res.dataMap.CARD);
        var marcaTarjeta = JSON.stringify(datos.res.dataMap.CARD_TYPE);
        var ok = JSON.stringify(datos.res.dataMap.ACTION_DESCRIPTION);
        var terminos =
          '<a href="/terminos-y-condiciones" target="_blank"> Ver los términos y condiciones</a>';
        var print =
          '<button onclick="window.print()">Imprima aquí la transacción</button>';

        document.getElementById('Payok').innerHTML =
          'Número de pedido: ' +
          orden +
          '<br> ' +
          'Cliente: ' +
          cliente +
          '<br>' +
          'Tarjeta enmascarada: ' +
          tarjeta +
          '<br>' +
          'Marca de la tarjeta ' +
          marcaTarjeta +
          '<br>Fecha: ' +
          dia +
          '/' +
          mes +
          '/' +
          ano +
          ' <br> ' +
          'Importe de la transacción:' +
          monto +
          '<br>' +
          'Tipo de moneda: ' +
          moneda +
          ' <br>' +
          'Descripción de producto: ' +
          descripcion +
          '<br>' +
          ok +
          '<br><br>' +
          terminos +
          '<br> <br>' +
          print;*/
      }

      //document.getElementById("Payok").innerHTML = JSON.stringify(data);
    } catch (error) {
      console.log('Ocurrió un error al realizar la transacción', error);
      //document.getElementById("ResponseNiubiz").innerHTML = error;
    }
  };

  const payVisa = (customer) => {
    setShowSuccessModal(true);
    setLoadingPay(true);

    const data = {
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      currencyConversion: false,
      recurrence: false,
      alias: 'mialias'
    };
    window.payform
      .createToken([window.cardNumber, window.cardExpiry, window.cardCvv], data)
      .then((res) => {
        const obj = {
          antifraud: null,
          channel: 'web',
          countable: true,
          captureType: 'manual',
          cardHolder: {
            documentNumber: customer.documentNumber,
            documentType: customer.documentType
          },
          order: {
            amount: order.amount,
            currency: 'PEN',
            productId: 1,
            purchaseNumber: `${order.purchaseNumber}`,
            tokenId: res.transactionToken,
            originalAmount: order.amount
          },
          sponsored: null
        };
        doTransaction(process.env.MERCHANT_ID, token, obj, data);
      })

      .catch((error) => {
        document.getElementById('ResponseNiubiz').innerHTML = error;
        console.log('Ocurrió un error', error);
        setLoadingPay(false);
      });
  };

  const onPayRecurrency = async (customer) => {
    const json = {
      antifraud: null,
      captureType: 'manual',
      channel: 'recurrent',
      countable: true,
      order: {
        amount: order.amount,
        currency: 'PEN',
        purchaseNumber: order.purchaseNumber
      },
      card: {
        tokenId: 7000010038732941 // Averiguar como se rellena
      },
      cardHolder: {
        email: customer.email
      }
    };
    try {
      const restoken = await await getTokenVisa();
      console.log(restoken.res);
      const res = await sendTransactionRecurrent(
        process.env.MERCHANT_ID,
        restoken.res,
        json
      );
      console.log(res);
    } catch (error) {
      alert('error');
      console.log('Ocurrió un error al realizar la transacción', error);
    }
  };

  const seeSentButton = () => {
    setActiveSend(true);
    setShowSuccessModal(false);
  };

  const resetPayment = () => {
    setToken('');
    setSession('');
    setActivePayment(false);
    setShowForm(false);
  };

  useEffect(() => {
    if (order) {
      if (activePayment) {
        // setTimeout(() => {
        importFiles();
        // }, 1000);
      } else {
        console.log('order', order);
        if (token === '') {
          getTokenNiubizSecurity();
        } else {
          getTokenNiubizSesion();
        }
      }
    }
  }, [activePayment, token, order]);

  return {
    showSuccessModal,
    activeSend,
    activePayment,
    showForm,
    loadingPay,
    successPayment,
    order,
    errors,
    event: { setOrder, resetPayment, payVisa, onPayRecurrency, seeSentButton }
  };
};

export default useNiubiz;
