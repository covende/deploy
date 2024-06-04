import React, { useState, useEffect } from 'react';
import CardPlan from './CardPlan';
import { iconHrGreh, StyledForm } from '../CreaTuTienda.styles';
import { listplanes } from '@/app/api/graphql/webpublic/createstore/Planservice';
import { MyLoader } from '@/common/components/Loaders/MyLoader';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Spacer,
  Spinner,
  Center
} from '@chakra-ui/react';
import { PLAN_STORE_PAY } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import { formatFecha } from '@/common/utils/methods';
import { METHOD_PAYMENTDEF } from '@/app/helpers';
import SuccessModal from './formuser/SuccessModal';
import {
  CVButton,
  CVNiubizCardPay,
  CVInput,
  CVNiubizPagoEfectivo,
  CVImage,
  CVLine
} from '@/common/CovendeTemplate';
import { method_payments } from '@/app/api/graphql/webbuy/TableAPIService';
import { Grid } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  validate_coupon,
  validate_coupon_for_plan
} from '@/app/api/graphql/webcoupon/WCouponService';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { v4 } from 'uuid';
import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import CVCajaHuancayo from '@/common/CovendeTemplate/CVCajaHuancayo';
import CVCouponPay from '@/common/CovendeTemplate/CVCoupon';

import { CVCouponValidate } from '@CVTemplate/core/CVValidationCoupon';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import { COMPANY_BY_ID } from '@CVApi/core/webpublic/userData/UserCompanyService';
import { FIND_USER_CHYO } from '@CVApi/core/coupons/cupons';
import { svgCoponHyo } from '@/app/assets/images/SVG';
// import CVCouponPay from '@CVTemplate/core/CVCoupon';

function FormPayment({
  user_id,
  store_id,
  plan_select,
  cuponEjem = 'VV8BTT6O'
}) {
  const addToast = useToast();
  const [planActive, setPlanActive] = useState(undefined);
  const [order, setOrder] = useState({});
  const [customer, setCustomer] = useState({});
  const [planes, setplanes] = useState([]);
  const [loading, setloading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paynow, setpaynow] = useState(true);
  const [paymethods, setpaymethods] = useState([]);
  const [tipopago, settipopago] = useState(null);
  const [cupon, setCupon] = useState('');
  const [idcupon, setIdcupon] = useState('');
  const [montocupon, setMontocupon] = useState();
  const [url, setUrl] = useState('');
  const [validing, setvaliding] = useState(false);
  const [neto, setneto] = useState(null);
  const [companyRUC, setCompanyRUC] = useState('');
  const [clientCH, setClientCH] = useState(false);
  const [validationCode, setValidationCode] = useState('');

  const setplan = (plan) => {
    if (planActive && plan._id === planActive._id) return;

    let numero = Date.now();
    setPlanActive(plan);
    setOrder({
      ...order,
      purchaseNumber: numero.toString().substr(0, 12),
      installment: [numero.toString().substr(12, 13)],
      productId: plan._id,
      periodo: eval(plan.periodo),
      currency: 'PEN'
    });

    if (Number(plan.price) === 0) {
      settipopago('Free');
    } else {
      if (tipopago && tipopago === 'Free') settipopago(null);
    }
    setIdcupon('');
    setneto(plan.price);
  };

  useEffect(() => {
    setCupon('');
    setMontocupon();
    setneto(null);
  }, [planActive?._id]);

  const validarCupon = async () => {
    setvaliding(true);

    const { status, message, coupon } = await validate_coupon_for_plan({
      name: cupon,
      plan: planActive?._id,
      user: user_id
    });

    if (status) {
      const { amount, valid, discount } = CVCouponValidate({
        aplicable: 'subscription',
        categories_id: '',
        coupon,
        monto: planActive?.price,
        product_id: '',
        product_offers: false,
        user_id
      });

      if (valid) {
        CVAlertSuccess({ addToast, message: 'Cupón Válido' });
        setMontocupon(discount);
        setIdcupon(coupon._id);
        setneto(amount);
        setPlanActive({ ...planActive, amount, discount });
        if (amount == 0) settipopago('Coupon');
      } else {
        CVAlertError({
          addToast,
          message:
            'No aplicable para ' +
            planActive?.name +
            ', porque el monto tiene que ser mayor que el cupon.'
        });
      }
    } else {
      CVAlertError({
        addToast,
        message: message || 'No aplicable para ' + planActive?.name
      });
    }
    setvaliding(false);
  };

  // const renderMethod = tipopago ? tipopago.split('|')[1] : 'Tarjeta';
  const renderMethod = tipopago || 'Tarjeta';
  const renderMethodId = tipopago ? tipopago.split('|')[0] : METHOD_PAYMENTDEF;

  const callback = async (response) => {
    if (response.status) {
      let planStorePay = await AxiosGQL(
        PLAN_STORE_PAY({
          store_id: store_id,
          method: renderMethod,
          details: toBase64(JSON.stringify(response.data)),
          user_id: user_id,
          amount: order.amount - montocupon,
          plan_id: planActive?._id,
          coupon: idcupon,
          payment_method_status: ['Tarjeta', 'Coupon', 'Free'].includes(
            renderMethod
          )
            ? 'online'
            : 'offline',
          code_CIP: response?.data?.cip
            ? {
                cip: response.data.cip,
                cipUrl: response.data.cipUrl,
                expiryDate:
                  response?.data?.expiryDate || response?.data?.dateExpiry
              }
            : null,
          into_aplication: plan_select ? true : false
        })
      );

      const response_set_plan = plan_select
        ? 'addPlanStorePay'
        : 'addPlanStorePayPublic';

      if (planStorePay[response_set_plan].status) {
        planStorePay[response_set_plan]?.code &&
          setValidationCode(planStorePay[response_set_plan]?.code);
        onOpen();
      } else {
        alert(planStorePay[response_set_plan].message);
      }
    } else {
      alert(response.message);
      setpaynow(true);
    }
  };

  const getAmountFinal = () => {
    let valor = 0;
    if (planActive) valor = Number(planActive?.price) - Number(montocupon || 0);
    return valor;
  };

  const setPlanDefault = (plans) => {
    if (plans || plans.length > 0) {
      let minor = { value: Number(plans[0]?.price), index: 0 };

      for (let index = 1; index < plans.length; index++) {
        let value = Number(plans[index].price);
        if (minor.value > value) {
          minor.value = value;
          minor.index = index;
        }
      }

      setplan(plans[minor.index]);
    }
  };

  const initdata = async () => {
    const { userFind, plansByRole } = await AxiosGQL(listplanes(user_id));
    let methods = await method_payments();
    setpaymethods(methods);

    if (plan_select) {
      setplanes(plan_select);
      setplan(plan_select);
    } else {
      setplanes(plansByRole);
      setPlanDefault(plansByRole);
    }

    setCustomer({
      name: userFind?.first_name || '',
      lastName: userFind?.last_name || '',
      email: userFind?.email || '',
      phoneNumber: '910102020',
      documentNumber: userFind?.dni || '',
      documentType: '0'
    });

    const { company } = await AxiosGQL(COMPANY_BY_ID(store_id));
    company && setCompanyRUC(company.ruc);

    setloading(false);
  };

  useEffect(() => {
    if (companyRUC != '') {
      AxiosGQL(FIND_USER_CHYO(companyRUC))
        .then(({ findUserCHYO }) => setClientCH(findUserCHYO.StatusUser))
        .catch((err) => console.log(err));
    }
  }, [companyRUC]);
  console.log({ companyRUC });
  const modopago = {
    Tarjeta: (
      <CVNiubizCardPay order={order} customer={customer} callback={callback} />
    ),
    PagoEfectivo: (
      <CVNiubizPagoEfectivo
        callback={callback}
        seturl={setUrl}
        order={order}
        customer={customer}
      />
    ),
    CajaHuancayo: (
      <CVCajaHuancayo
        callback={callback}
        seturl={setUrl}
        order={order}
        customer={customer}
      />
    ),
    Coupon: <CVCouponPay callback={callback} />,
    Free: <CVCouponPay callback={callback} />
  };

  useEffect(() => {
    initdata();
  }, []);

  const getAmount = () => {
    let price = eval(
      neto != undefined || null ? neto : planActive?.price || '0'
    ).toFixed(2);

    return setOrder({
      ...order,
      amount: price,
      productId: planActive?._id,
      periodo: eval(planActive?.periodo)
    });
  };
  useEffect(() => {
    getAmount();
  }, [neto, planActive]);
  return (
    <StyledForm submit={''}>
      <Grid container spacing={1}>
        {paynow ? (
          <>
            <Grid item xs={12} sm={5} md={plan_select ? 4 : 5}>
              <Flex color='#004772' fontSize='1.4rem' ml={7}>
                Elige un plan:
              </Flex>
              <div
                style={{
                  margin: 'auto',
                  display: 'block',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  width: '100%',
                  maxWidth: '100vw'
                }}>
                {loading ? (
                  Array(2)
                    .fill(0)
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: '#fff',
                          boxSizing: 'border-box',
                          borderRadius: '14px'
                        }}>
                        <MyLoader />
                      </div>
                    ))
                ) : plan_select ? (
                  <Box m='auto' w='60%' pt={30}>
                    <CardPlan
                      planActive={planActive}
                      setPlanActive={setplan}
                      plan={planes}
                    />
                  </Box>
                ) : (
                  <Box>
                    {planes.length > 0 &&
                      planes.map((item, index) => (
                        <CardPlan
                          key={index}
                          planActive={planActive}
                          setPlanActive={setplan}
                          plan={item}
                          width='400px'
                          order={order}
                        />
                      ))}
                  </Box>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={7} md={plan_select ? 8 : 7}>
              <Flex color='#004772' fontSize='1.4rem' ml={7}>
                Resumen de Pago:
              </Flex>
              <Flex justifyContent='center'>
                <Box ml={5} mr={15} mt={10}>
                  {iconHrGreh}
                </Box>
                <Box
                  ml={plan_select ? 10 : 0}
                  w={plan_select ? '60%' : 'unset'}>
                  <Box mt={12} mb={10}>
                    {!!clientCH && planActive?.price ? (
                      <>
                        {svgCoponHyo}

                        {/* <Text fontSize='18px'>Ingresa tu cupón de descuento</Text> */}
                        {/* <Text color='#17BF93' fontSize='16px' mb='10px'>
                          <span style={{ fontWeight: 'bold' }}>
                            ¡Exclusivo para clientes de Caja Huancayo!{' '}
                          </span>{' '}
                          <br /> Utiliza este cupón para obtener un increíble
                          descuento:
                        </Text>
                        <Text fontWeight='bold' color='#17BF93' fontSize='16px'>
                          {cuponEjem}
                        </Text> */}
                      </>
                    ) : (
                      <Box w='35rem' h='10px'></Box>
                    )}
                  </Box>

                  {tipopago !== 'Free' && (
                    <Box mb={5}>
                      <CVInput
                        disabled={!planActive || validing || !!montocupon}
                        value={cupon}
                        buttonColor='green'
                        icon={
                          validing ? (
                            <Spinner
                              style={{
                                color: 'white'
                              }}
                            />
                          ) : (
                            <>APLICAR CUPÓN</>
                          )
                        }
                        iconFind={true}
                        buttonClick={() => validarCupon()}
                        onChange={(value) => {
                          setCupon(value);
                        }}
                      />
                    </Box>
                  )}

                  {montocupon ? (
                    <>
                      <Box>
                        <Flex my={5} px={5}>
                          <Text fontSize='16px' fontStyle='normal'>
                            Suscripción
                          </Text>
                          <Spacer />
                          <Text fontSize='16px' fontStyle='normal'>
                            {planActive?.price
                              ? `S/${eval(planActive?.price || '0').toFixed(2)}`
                              : ' '}
                          </Text>
                        </Flex>

                        <Flex my={5} px={5}>
                          <Text fontSize='16px' fontStyle='normal'>
                            Descuento
                          </Text>
                          <Spacer />
                          <Text fontSize='16px' fontStyle='normal'>
                            - {CVMoneyFormat({ amount: planActive?.discount })}
                          </Text>
                        </Flex>
                      </Box>
                      <CVLine lineHeight='1px' height='1.5rem' color='gray' />
                      <Flex mt={5} mb={5} px={5}>
                        <Text fontSize='16px' fontStyle='normal'>
                          Total
                        </Text>
                        <Spacer />
                        <Text
                          fontSize='36px'
                          fontStyle='normal'
                          fontWeight='700'
                          lineHeight='54px'
                          letterSpacing='0em'
                          color='#00ADF6'>
                          {planActive?.price
                            ? `S/${eval(
                                planActive?.price - montocupon || '0'
                              ).toFixed(2)}`
                            : ' '}
                        </Text>
                      </Flex>
                    </>
                  ) : (
                    <Flex mt={5} mb={5} px={5}>
                      <Text fontSize='16px' fontStyle='normal'>
                        Total
                      </Text>
                      <Spacer />
                      <Text
                        fontSize='36px'
                        fontStyle='normal'
                        fontWeight='700'
                        lineHeight='54px'
                        letterSpacing='0em'
                        color='#00ADF6'>
                        {planActive?.price
                          ? `S/${eval(planActive?.price || '0').toFixed(2)}`
                          : ' '}
                      </Text>
                    </Flex>
                  )}
                  {getAmountFinal() !== 0 && (
                    <Box mt={12} mb={5}>
                      <Box mt={12} mb={5}>
                        <Text fontSize='15px'>Elige el metodo de Pago</Text>
                      </Box>
                      <Flex>
                        <Box>
                          <CVRadio
                            value={tipopago}
                            itemDirection='column'
                            onChange={(value) => settipopago(value)}
                            options={paymethods.map((item) => ({
                              value: item.code,
                              text: (
                                <Box
                                  key={v4()}
                                  display='flex'
                                  alignItems='center'>
                                  <Text>{item.title}</Text>
                                  <SizeBox />
                                  <CVImage
                                    height='2rem'
                                    width='auto'
                                    image={item.image}
                                  />
                                </Box>
                              )
                            }))}
                          />
                        </Box>
                      </Flex>
                    </Box>
                  )}
                  <Box>
                    {planActive && tipopago && (
                      <>
                        <Flex>
                          <Spacer />

                          <CVButton
                            width='100%'
                            onClick={() => setpaynow(!paynow)}>
                            {getAmountFinal() ? 'IR A PAGAR' : 'Finalizar'}
                          </CVButton>
                        </Flex>

                        <Text color='#ABABAB' textAlign={['center']}>
                          Pago 100% seguro, protegemos tus datos.
                        </Text>
                      </>
                    )}
                  </Box>
                </Box>
              </Flex>
            </Grid>
          </>
        ) : (
          <Flex justifyContent='center'>{modopago[renderMethod]}</Flex>
        )}

        {isOpen &&
          (plan_select ? (
            <SuccessModal
              planActive={planActive}
              isOpen={isOpen}
              url={url}
              code={validationCode}
            />
          ) : (
            <SuccessModal
              planActive={planActive}
              isOpen={isOpen}
              url={url}
              code={validationCode}
            />
          ))}
      </Grid>
    </StyledForm>
  );
}

export default FormPayment;
