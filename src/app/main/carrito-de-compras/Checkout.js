import { shortcutfindbyuri } from '@/app/api/graphql/shortcut/ShortCutService';
import {
  ADD_PEDIDO,
  PAY_SHOPPING_CART
} from '@/app/api/graphql/webpedido/PedidoType';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import {
  A_CARD_PRODUCT,
  set_number
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { CVValidLogin } from '@/common/CovendeTemplate/CVMethods';
import { useToast } from '@chakra-ui/toast';
import { Box, Text } from '@chakra-ui/react/';
import { toBase64 } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import { Container } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { initcheckout } from './CarritoMethods';
import Confirmacion from './components/Confirmacion';
import PayOffline from './payable/PayOffline';
import PayOnline from './payable/PayOnline';
import PayResume from './payable/PayResume';
import PayCoupon from './payable/PayCoupon';

function Checkout() {
  const [basket, setbasket] = useState([]);
  const [factura, setfactura] = useState({});
  const [infoenvio, setinfoenvio] = useState({});
  const [tipodoc, settipodoc] = useState('Boleta');
  const [mediopago, setmediopago] = useState('Tarjeta');
  const [method_payment, setmethod_payment] = useState('');
  const [itemsPrice, setitemsPrice] = useState(0);
  const [success, setsuccess] = useState(false);
  const [idcupon, setIdcupon] = useState('');
  const addToast = useToast();
  const [loading, setLoading] = useState(false);

  const { carrito_login, id_car_pay } = useSelector(
    (state) => state.CardProduct
  );
  const dispatch = useDispatch();
  const [antifraude, setantifraude] = useState({
    transactionCode: '',
    paymentConcept: '',
    additionalData: '',
    userEmail: '',
    userName: '',
    userLastName: '',
    userUbigeo: '',
    userCountry: '',
    userDocumentType: '',
    userDocumentNumber: '',
    userCodeCountry: '',
    userPhone: ''
  });
  const [order, setorder] = useState({});
  const [cliente, setcliente] = useState({});
  const mountedRef = useRef(true);
  const history = useHistory();

  const callback = async (result, medio_pago) => {
    // let userFind = getLoggedInUser();

    if (result?.status) {
      const { payShoppingCart } = await AxiosGQL(
        PAY_SHOPPING_CART({
          _id: id_car_pay ?? '',
          buy_type: 'compra',
          medio_pago,
          method_payment: mediopago,
          coin_type_code: 'PEN',
          billing_type: tipodoc,
          ruc_buyer: factura.ruc,
          buyer_social_razon: factura.razon_social,
          payment_method_status: ['Tarjeta', 'Coupon'].includes(mediopago)
            ? 'online'
            : 'offline',
          code_CIP: result?.data?.cip || '',
          url_CIP: result?.data?.cipUrl || '',
          expire_CIP: result?.data?.expiryDate || result?.data?.dateExpiry || ''
        })
      );

      setsuccess(payShoppingCart?.status || false);
      if (payShoppingCart?.status) {
        dispatch(set_number(0));
      } else {
        CVAlertError({ addToast, message: payShoppingCart?.message });
        history.push('/carrito-de-compras');
      }
    } else {
      CVAlertError({
        addToast,
        message:
          'Algo salió mal, por favor inténtalo más tarde.' ||
          'Ocurrieron Errores'
      });
    }
  };
  const { data } = useParams();

  const initdata = async () => {
    if (!CVValidLogin(dispatch)) return false;

    await initcheckout({
      data,
      setbasket,
      setinfoenvio,
      setfactura,
      settipodoc,
      setmediopago,
      setmethod_payment,
      setitemsPrice,
      setantifraude,
      setorder,
      setcliente,
      setIdcupon
    });
  };

  const modopago = {
    Tarjeta: (
      <PayOnline
        itemsPrice={itemsPrice}
        callback={callback}
        antifraude={{ order, customer: cliente }}
      />
    ),
    PagoEfectivo: (
      <PayOffline
        itemsPrice={itemsPrice}
        callback={callback}
        antifraude={{ order, customer: cliente }}
        mediopago='pagoefectivo'
        setsuccess={setsuccess}
      />
    ),
    CajaHuancayo: (
      <PayOffline
        itemsPrice={itemsPrice}
        callback={callback}
        antifraude={{ order, customer: cliente }}
        mediopago='cajahuancayo'
        setsuccess={setsuccess}
      />
    ),
    Coupon: (
      <PayCoupon
        itemsPrice={itemsPrice}
        callback={callback}
        antifraude={{ order, customer: cliente }}
        mediopago='coupon'
        setsuccess={setsuccess}
      />
    )
  };

  useEffect(() => {
    initdata();
    return () => {
      mountedRef.current = false;
    };
  }, [carrito_login]);

  return (
    <Container>
      <SizeBox height='80px' />
      {success ? <Confirmacion mediopago={mediopago} /> : <></>}
      {success ? <SizeBox height='2rem' /> : <></>}

      {mediopago == 'Tarjeta' && success ? <></> : modopago[mediopago]}

      <Box mt={4}>
        <Text color='#004772' fontSize='20px' fontWeight='bold'>
          Detalles de la compra
        </Text>
      </Box>

      <PayResume
        basket={basket}
        tipodoc={tipodoc}
        mediopago={mediopago}
        itemsPrice={itemsPrice}
        infoenvio={infoenvio}
        factura={factura}
      />
    </Container>
  );
}

export default Checkout;
