import { useEffect, useState } from 'react';

export const sendTransaction = async ({ idMercado, token, json }) => {
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

    console.log(response);

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

export const sendTransactionRecurrent = async ({ idMercado, token, json }) => {
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

const NuibizCustom = () => {
  const [errors, setErrors] = useState({
    cardCvv: 'Su número de CVV no es válido.',
    cardExpiry: 'El vencimiento de su tarjeta no es válido.',
    cardNumber: 'Su número de tarjeta no es válido.'
  });

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

  const validate = (data) => {
    let invalid_cvc = data.find((item) => item.code == 'invalid_cvc');
    let invalid_expiry = data.find((item) => item.code == 'invalid_expiry');
    let invalid_number = data.find((item) => item.code == 'invalid_number');

    setErrors({
      ...errors,
      cardNumber:
        invalid_number != null
          ? invalid_number?.message
          : document.getElementById('cc-number')?.value == ''
          ? 'Su número de tarjeta no es válido.'
          : '',
      cardExpiry:
        invalid_expiry != null
          ? invalid_expiry?.message
          : document.getElementById('cc-exp')?.value == ''
          ? 'El vencimiento de su tarjeta no es válido'
          : '',
      cardCvv:
        invalid_cvc != null
          ? invalid_cvc?.message
          : document.getElementById('cc-cvc')?.value == ''
          ? 'Su número de CVV no es válido.'
          : ''
    });
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
    window.cardNumber.then((element) => {
      element.on('change', validate);
    });

    window.cardExpiry = window.payform.createElement(
      'card-expiry',
      {
        style: elementStyles,
        placeholder: 'MM/AA'
      },
      'txtFechaVencimiento'
    );
    window.cardExpiry.then((element) => {
      element.on('change', validate);
    });

    window.cardCvv = window.payform.createElement(
      'card-cvc',
      {
        style: elementStyles,
        placeholder: 'CVV'
      },
      'txtCvv'
    );
    window.cardCvv.then((element) => {
      element.on('change', validate);
    });
  };

  const setConfigurationScriptLoaded = ({ sessionID, order, merchantID }) => {
    const configuration = {
      sessionkey: sessionID,
      channel: 'web',
      merchantid: `${merchantID}`,
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

  const setConfigurationScriptPagoEfectivo = async ({
    sessionID,
    order,
    merchantID,
    token
  }) => {
    const salidaJson = {
      error: false,
      mensajeError: null,
      status: false,
      data: {}
    };

    try {
      // console.log({ token });
      //https://apiprod.vnforapps.com/api.pagoefectivo/v1/create/650197668
      //https://apitestenv.vnforapps.com/api.pagoefectivo/v1/create/101183542
      const response = await fetch(
        `https://apiprod.vnforapps.com/api.pagoefectivo/v1/create/650185623`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            channel: 'web',
            email: 'test@test.com',
            amount: `${order.amount}`,
            externalTransactionId: `${order.purchaseNumber}`
          })
        }
      );

      if (response.ok) {
        const res = await response.json();
        salidaJson.error = false;
        salidaJson.data = res;
        salidaJson.status = true;
      } else {
        salidaJson.error = true;
        salidaJson.message = response;
        salidaJson.status = false;
      }

      // const { cipUrl } = await response.json();
      /*  const res = await response.json();
      console.log('print response');
      console.log(res); */
    } catch (error) {
      console.error(error);
    }

    return salidaJson;
  };

  const addCustomPagoEfectivoScript = ({ sessionID, order, merchantID }) => {
    new Promise((resolve) => {
      const script2 = document.createElement('script');
      script2.src = `https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true`;
      script2.async = true;
      script2.onload = function () {
        // alert(sessionID);
        VisanetCheckout.configure({
          sessiontoken: sessionID,
          channel: 'web',
          merchantid: merchantID,
          purchasenumber: order.purchaseNumber,
          amount: order.amount,
          expirationminutes: '20',
          timeouturl: 'about:blank',
          merchantlogo:
            'https://covende.com/wp-content/uploads/2020/08/cropped-CoVende-LOGO-2.png',
          formbuttoncolor: '#000000',
          action: 'paginaRespuesta',
          complete: function (params) {
            alert(JSON.stringify(params));
          }
        });

        VisanetCheckout.open();
      };

      document.head.appendChild(script2);

      resolve();
    });
  };

  const addCustomPayScript = ({ sessionID, order, merchantID }) =>
    new Promise((resolve) => {
      if (window.payform) {
        document.getElementById('txtNumeroTarjeta').innerHTML = '';
        document.getElementById('txtFechaVencimiento').innerHTML = '';
        document.getElementById('txtCvv').innerHTML = '';
        setConfigurationScriptLoaded({ sessionID, order, merchantID });
      } else {
        const script = document.createElement('script');
        script.src = `${process.env.URL_PAYFORM_GENERATE}`;
        script.async = true;
        script.onload = () =>
          setConfigurationScriptLoaded({ sessionID, order, merchantID });
        document.head.appendChild(script);
      }
      resolve();
    });

  const importFiles = async ({ sessionID, order, merchantID }) => {
    try {
      await addCustomPayScript({ sessionID, order, merchantID });
    } catch (error) {
      alert('error import el formulario');
      console.log('Error al cargar el script de pago', error);
    }
  };

  const importFilesPagoEfectivo = async ({
    sessionID,
    order,
    merchantID,
    token
  }) => {
    try {
      /*   await addCustomPagoEfectivoScript({
        sessionID,
        order,
        merchantID
      }); */

      let res = await setConfigurationScriptPagoEfectivo({
        sessionID,
        order,
        merchantID,
        token
      });
      return res;
    } catch (error) {
      alert('error import');
      console.log('Error al cargar el script de Pago efectivo', error);
    }
  };

  const doTransaction = async ({ merchantID, doToken, obj, data, order }) => {
    try {
      var datos = await sendTransaction({
        idMercado: merchantID,
        token: doToken,
        json: obj
      });
      console.log(datos);
      if (datos.error) {
        //datos.res.errorMessage
        return {
          status: false,
          message: 'Tarjeta errada o saldo insuficiente',
          data: datos
        };
      } else {
        return {
          status: true,
          message: datos.res.dataMap.ACTION_DESCRIPTION,
          data: {
            obj,
            data,
            datos,
            order
          }
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: error?.errorMessage || 'Exception',
        data: error
      };
    }
  };

  const payVisa = async ({ customer, merchantID, doToken, order }) => {
    let result = {
      status: false,
      message: '',
      data: {}
    };
    const data = {
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      currencyConversion: false,
      recurrence: false,
      alias: 'mialias'
    };
    try {
      await window.payform
        .createToken(
          [window.cardNumber, window.cardExpiry, window.cardCvv],
          data
        )
        .then(async (res) => {
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
              currency: order.currency,
              productId: order.productId,
              purchaseNumber: `${order.purchaseNumber}`,
              tokenId: res.transactionToken,
              originalAmount: order.amount
            },
            sponsored: null
          };

          result = await doTransaction({
            merchantID,
            doToken,
            obj,
            data,
            order
          });
        })
        .catch((error) => {
          document.getElementById('ResponseNiubiz').innerHTML = error;
          result = {
            status: false,
            message: error || 'Exception',
            data: error
          };
        });
    } catch (error) {
      result = {
        status: false,
        message: error || 'Exception',
        data: error
      };
    }
    return result;
  };

  const onPayRecurrency = async ({ customer, token, merchantID, order }) => {
    const json = {
      antifraud: null,
      captureType: 'manual',
      channel: 'recurrent',
      countable: true,
      order: {
        amount: order.amount,
        currency: order.currency,
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
      const res = await sendTransactionRecurrent({
        idMercado: merchantID,
        token,
        json
      });
      console.log(res);
    } catch (error) {
      alert('error');
      console.log('Ocurrió un error al realizar la transacción', error);
    }
  };

  return {
    errors,
    payVisa,
    importFiles,
    importFilesPagoEfectivo
  };
};

export default NuibizCustom;
