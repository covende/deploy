import { Radio, Flex, Text, Checkbox } from '@chakra-ui/react';
import { Box, Grid, Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AtributeStock from './AtributeStock';
import WholesaleStock from './WholesaleStock';
import { useDispatch, useSelector } from 'react-redux';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_PRODUCT_STEP_SECOND } from '@/app/api/graphql/webseller/ProductService';
import { useToast } from '@chakra-ui/toast';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { TIPOSTORE } from '@/common/CovendeTemplate/CVThemes';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import themeCovende from '@/themeCovende';
import { useDisclosure } from '@chakra-ui/react';
import {
  CVErrorTags,
  isMoney,
  isOnlyNumber,
  onlyMoney,
  onlyNumber
} from '@/common/CovendeTemplate/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import AddAfter from '../modales/AddAfter';
import { useHistory, useLocation } from 'react-router-dom';
import { ProductUpdate } from '../../redux/ProductUpdate';
import PFActions from '../PFActions';

import { containsLowercase } from '@/app/helpers/utils';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { rolemenu } from '@/app/helpers/role';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';
/**
 * Funcion del tipo index
 * @param {*} props
 */
function StockProduct() {
  const history = useHistory();
  const addToast = useToast();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  // const [check, setCheck] = useState(false);
  const [alertStock, setAlertStock] = useState(true);
  const [errors, seterrors] = useState(false);

  const [sales_with_custom_attributes, setAtribute] = useState([]);
  const [wholeSales, setwholeSales] = useState([]);

  // const [openAtributte, SetOpenAtributte] = useState(false);
  const {
    precios,
    product,
    custom_id,
    in_draft,
    attributes,
    tabIndex,
    type_of_sale
  } = useSelector((state) => state.ProductView);

  const dispatch = useDispatch();
  const setprecios = (data) => dispatch(A_PRODUCTVIEW({ precios: data }));
  const setDateRange = (range) => {
    const [startDate, endDate] = range;
    setprecios({
      ...precios,
      offer_start_date: startDate,
      offer_end_date: endDate
    });
  };

  const savesiguiente = async ({ in_draft }) => {
    let size = wholeSales.length;
    let sales = [];
    if (size > 0) {
      sales = wholeSales.map((item) => {
        let data = {};
        for (const key in item) {
          if (key == 'preparation_time') {
            if (
              item.preparation_time == undefined ||
              item.preparation_time == null
            ) {
              continue;
            } else {
              data[key] = item[key];
            }
          } else {
            data[key] = item[key];
          }
        }

        return { ...data };
      });

      let price = sales[size - 1].price;
      if (price == 0) {
        CVAlertError({
          addToast,
          message:
            'Agrega el precio del ultimo registro de la tabla venta por mayor'
        });
        return;
      }

      console.log(sales[size - 1].maximum_order);
      if (sales[size - 1].maximum_order == Infinity) console.log('es infinity');
      sales[size - 1].maximum_order == Infinity
        ? (sales[size - 1].maximum_order = 1000000000)
        : sales[size - 1].maximum_order;
    }

    const attributes = sales_with_custom_attributes.map((it) => ({
      item_id: it.item_id,
      sku: it.sku,
      stock: parseInt(it.stock),
      price: parseFloat(it.price),
      attributes: it.attributes
    }));

    if (CVErrorTags('Mui-error')) {
      return {
        status: false,
        message: 'Completa y corrige los campos en rojo'
      };
    }

    setLoading(true);
    const { addProductStepSecond } = await AxiosGQL(
      ADD_PRODUCT_STEP_SECOND({
        precios,
        product,
        in_draft,
        sales,
        attributes
      })
    );
    setLoading(false);
    if (addProductStepSecond.status) {
      setprecios({
        ...precios,
        sale_with_custom_attributes: [...sales_with_custom_attributes],
        wholesales: [...sales]
      });
      ProductUpdate({
        dispatch,
        step: tabIndex,
        result: addProductStepSecond.product
      });
    }
    return addProductStepSecond;

    // setprecios({
    //   ...precios,
    //   sale_with_custom_attributes: [...sales_with_custom_attributes],
    //   wholesales: [...sales]
    // });
    // return false;
  };

  const saveborrador = async () => {
    const result = await savesiguiente({ in_draft: true });
    if (result.status) {
      CVAlertSuccess({
        addToast,
        message: 'Producto Creado en Borrador Correctamente'
      });
      if (rolemenu() !== '/bo/') {
        history.push('/seller/productos');
      } else {
        let position = location.pathname.indexOf('productos');
        history.push(location.pathname.substring(0, position) + 'productos');
      }
      return false;
    }
    CVAlertError({ addToast, message: result.message });
  };

  const savenext = async () => {
    const result = await savesiguiente({ in_draft });
    if (result.status) {
      dispatch(A_PRODUCTVIEW({ tabIndex: 2 }));
    }
    result.status
      ? CVAlertSuccess({ addToast, message: result.message })
      : CVAlertError({ addToast, message: result.message });
  };

  const ejecutar = (method) => {
    if (method == 1) saveborrador();
    if (method == 2) savenext();
  };

  return (
    <Container>
      <Box mt={2}>
        <Box mb={2} color='#004772'>
          <strong>2.1 Precio </strong>
          <span style={{ color: themeCovende.colors.rojo }}>*</span>
        </Box>
      </Box>
      <Text fontSize='14px'>Indica el tipo de venta de este producto.</Text>
      <Box mt={1.5} mr={35}>
        <CVRadio
          options={TIPOSTORE}
          // options={
          //   type_of_sale == 'RETAIL'
          //     ? [{ text: 'Venta por Menor', value: 'RETAIL' }]
          //     : TIPOSTORE
          // }
          onChange={(value) => {
            setprecios({ ...precios, type_of_sale: value });
          }}
          value={precios.type_of_sale}
        />
      </Box>
      {['RETAIL', 'BOTH'].includes(precios.type_of_sale) ? (
        <Box mt={3} mb={3}>
          <Box mb={2}>
            <Box color='#004772'>
              <strong>Venta por Menor</strong>
            </Box>
          </Box>
          <CVInput
            error={precios.price_unit == ''}
            width='350px'
            title='Precio'
            type={precios?.price_unit ? 'text' : 'number'}
            titleOrientation='column'
            value={
              (precios?.price_unit && precios?.price_unit.replace(/,/g, '')) ||
              'raro'
            }
            placeholder={
              (precios?.price_unit && precios?.price_unit.replace(/,/g, '')) ||
              '0'
            }
            onChange={(value) =>
              setprecios({ ...precios, price_unit: onlyMoney(value) })
            }
            buttonColor='white'
            iconFind={true}
            icon={
              <Text fontSize='1.3rem'>
                s/{' '}
                {(precios?.price_unit &&
                  precios?.price_unit.replace(/,/g, '')) ||
                  '0.00'}
              </Text>
            }
            iconColor='gray'
          />
        </Box>
      ) : (
        ''
      )}
      {['WHOLESALE', 'BOTH'].includes(precios.type_of_sale) ? (
        <Box mt={3}>
          <Box mb={2}>
            <Box color='#004772'>
              <strong>Venta por Mayor</strong>
            </Box>
          </Box>
          <Box mb={3} ml={9}>
            <Text fontSize='14'>
              Ingresa el pedido mínimo de cada intervalo y especifica el precio
              de cada uno.
            </Text>
          </Box>
          <WholesaleStock
            wholeSales={wholeSales}
            setwholeSales={setwholeSales}
            precios={precios}
            setprecios={setprecios}
          />
          {errors && wholeSales?.length == 0 && (
            <Box paddingBottom='2rem' marginTop='-0.5rem' paddingLeft='20px'>
              <CVErrorLabel
                errorClass={'errores'}
                errorMessage={
                  'Campo Obligatorio. Completa los datos de precios para venta al por mayor o cambia el tipo de venta al por menor.'
                }
              />
            </Box>
          )}
        </Box>
      ) : (
        ''
      )}
      <Box>
        {/*
        <Box component='span'>
          <Text color='#FF5454' fontSize='2xl'>
            ¿Se puede reservar?
          </Text>
        </Box>
        <Box component='span'>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
              <Radio color='#FF5454' colorScheme='red' value='si'>
                Si
              </Radio>
              <Radio color='#FF5454' colorScheme='red' value='no'>
                No
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        */}
      </Box>
      <Box>
        <Box mb={2} color='#004772'>
          <strong>2.2 Stock </strong>
          <span style={{ color: themeCovende.colors.rojo }}>*</span>
        </Box>
        <Text fontSize='14'>
          Indica la cantidad de este producto que dispone tu empresa.
        </Text>
        <Flex mt={2} alignItems='center'>
          <CVInput
            width='350px'
            value={precios.stock}
            onChange={(value) =>
              setprecios({ ...precios, stock: Number(onlyNumber(value)) })
            }
            error={errors.stock == 0 || false}
            type='number'
            placeholder='0'
            // onValidate={(value) =>
            //   seterrors({
            //     ...errors,
            //     stock: Number(precios.stock) != 0
            //   })
            // }
          />
          <Box ml={1} component='span'>
            unidades
          </Box>
        </Flex>
      </Box>

      {attributes?.length !== 0 && (
        <Box my={5}>
          <Radio
            fontSize='14'
            isChecked={precios.check_custom}
            mr={1}
            defaultChecked={precios.check_custom}
            onClick={() =>
              setprecios({ ...precios, check_custom: !precios.check_custom })
            }>
            Personalizar por atributo
          </Radio>
        </Box>
      )}
      {precios.check_custom && (
        <Box>
          <AtributeStock
            atributos={attributes}
            precios={precios}
            setprecios={setprecios}
            data={sales_with_custom_attributes}
            setdata={setAtribute}
            custom_id={custom_id}
          />
        </Box>
      )}

      <Box my={5}>
        <Radio
          defaultChecked={precios.stock_alert}
          isChecked={alertStock}
          onChange={() => {
            setprecios({ ...precios, stock_alert: !precios.stock_alert });
          }}
          onClick={() => setAlertStock(!alertStock)}>
          Activar alerta cuando el stock se encuentre en 3 unidades
        </Radio>
      </Box>
      <Box color='#004772' mt={2}>
        <strong>2.3.Oferta </strong>
      </Box>
      <Box my={3}>
        Ingresa la siguiente información si ofrecerás una oferta por este
        producto. El descuento que indiques se aplicará a todos los precios que
        hayas establecido: por menor, por mayor o los precios de las variaciones
        según atributos; según aplique.
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Radio
            isChecked={precios?.offer}
            onClick={() => {
              setprecios({
                ...precios,
                offer: !precios?.offer,
                ...(!precios?.offer
                  ? { offer_type: precios.offer_type || 'FIXED' }
                  : {
                      offer_value: precios.offer_value || '',
                      offer_start_date: precios.offer_start_date || '',
                      offer_end_date: precios.offer_end_date || '',
                      offer_type: precios.offer_type || ''
                    })
              });
            }}>
            Aplicar oferta
          </Radio>
        </Grid>

        {precios.offer && (
          <>
            <Grid item xs={12} sm={2} md={1}>
              <Text color='#004772'>Tipo: </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <CVRadio
                itemDirection='row'
                options={[
                  { text: 'Fijo', value: 'FIXED' },
                  { text: 'Porcentaje', value: 'PERCENT' }
                ]}
                value={precios.offer_type}
                onChange={(value) =>
                  setprecios({
                    ...precios,
                    offer_type: value,
                    offer_value:
                      value == 'PERCENT'
                        ? String(precios?.offer_value || '').substring(0, 2)
                        : precios?.offer_value || ''
                    // offer_value: precios?.offer_value
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9}></Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Text color='#004772'>Oferta:</Text>
              <CVInput
                // height='3rem'
                width='90%'
                title={
                  precios.offer_type == 'PERCENT'
                    ? 'Ingresa el porcentaje de descuento.'
                    : 'Ingresa el valor de descuento.'
                }
                titleOrientation='column'
                value={precios.offer_value || ''}
                onChange={(value) =>
                  setprecios({
                    ...precios,
                    offer_value: onlyMoney(value)
                  })
                }
                maxLength={precios.offer_type == 'PERCENT' ? '2' : ''}
                iconColor='gray'
                buttonColor='white'
                icon={
                  <Text fontSize='1.3rem'>
                    {precios.offer_type == 'PERCENT' ? '%' : 'Soles'}
                  </Text>
                }
                iconFind={true}
              />
            </Grid>

            {precios?.offer_value != undefined && precios.offer_value != 0 && (
              <Grid item xs={12} sm={6} md={5}>
                <Text color='#004772'>Inicio - Fin:</Text>
                <Box>
                  <CVDateRangePicker
                    title='Indica el periodo de la oferta.'
                    titleOrientation='column'
                    // height='3rem'
                    width='90%'
                    onChange={setDateRange}
                    datestart={precios?.offer_start_date}
                    dateend={precios?.offer_end_date}
                  />
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={2}></Grid>
          </>
        )}

        {/* 
        <Grid item xs={12} sm={5} md={5}>
          <Text>Oferta</Text>

          <CVInput
            height='3rem'
            width='90%'
            title='Ingresa el porcentaje de descuento.'
            titleOrientation='column'
            value={precios.offer_percentage || ''}
            onChange={(value) =>
              setprecios({ ...precios, offer_percentage: onlyMoney(value) })
            }
            maxLength='2'
            iconColor='gray'
            buttonColor='white'
            icon={<Text fontSize='1.3rem'>%</Text>}
            iconFind={true}
          />
        </Grid>
        {precios.offer_percentage != '' && (
          <Grid item xs={12} sm={5} md={5}>
            <Text>Inicio - Fin</Text>
            <Box>
              <CVDateRangePicker
                title='Indica el periodo de la ofert.'
                // titleOrientation='column'
                // height='3rem'
                width='90%'
                onChange={setDateRange}
                datestart={precios?.offer_start_date}
                dateend={precios?.offer_end_date}
              />
            </Box>
          </Grid>
        )} */}
        {/* <Box mb={10}>{JSON.stringify(precios.wholesales)}</Box> */}
      </Grid>
      <SizeBox />
      <PFActions
        ejecutar={ejecutar}
        errors={errors}
        loading={loading}
        seterrors={seterrors}
        in_draft={in_draft}
      />
    </Container>
  );
}

export default StockProduct;
