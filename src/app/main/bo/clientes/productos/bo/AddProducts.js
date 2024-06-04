import React, { useEffect, useState } from 'react';
import { LinearProgress, Typography, Container, Grid } from '@material-ui/core';
import { Box as MuiBox } from '@material-ui/core';
import { Stack, Skeleton, Box } from '@chakra-ui/react';
// import { BoxProgress, Circle } from './ProductsStyle';
import themeCovende from '@/themeCovende';
// import Product from './components/step1/Product';
import { useDispatch, useSelector } from 'react-redux';
// import Despacho from './components/step3/Despacho';
// import Otros from './components/step4/Otros';
// import StockProduct from './components/step2/StockProduct';
// import Cabecera from './components/modales/Cabecera';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { FIND_PRODUCT_INIT } from '@/app/api/graphql/webseller/ProductService';
// import { ProductUpdate, tienda } from './redux/ProductUpdate';
// import { productcreate } from './ProductoIcons';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
// import { A_PRODUCTVIEW } from './redux/ProductViewAction';
import { CVText } from '@/common/CovendeTemplate';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import CVPanel from '@CVTemplate/core/CVPanel';
import Product from '@CVPages/core/admin/seller/productos/components/step1/Product';
import StockProduct from '@CVPages/core/admin/seller/productos/components/step2/StockProduct';
import Despacho from '@CVPages/core/admin/seller/productos/components/step3/Despacho';
import Otros from '@CVPages/core/admin/seller/productos/components/step4/Otros';
import {
  ProductUpdate,
  tienda,
  tiendaAdmin
} from '@CVPages/core/admin/seller/productos/redux/ProductUpdate';
import { A_PRODUCTVIEW } from '@CVPages/core/admin/seller/productos/redux/ProductViewAction';
import Cabecera from '@CVPages/core/admin/seller/productos/components/modales/Cabecera';
import { productcreate } from '@CVPages/core/admin/seller/productos/ProductoIcons';
import {
  BoxProgress,
  Circle
} from '@CVPages/core/admin/seller/productos/ProductsStyle';

function AddProducts({ action, id, step, store }) {
  const { tabIndex, product, in_draft } = useSelector(
    (state) => state.ProductView
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  //   const { action, id, step } = useParams();
  const [loading, setLoading] = useState(true);
  const [porcentaje, Setporcentaje] = useState(0);

  const findproduct = async (id) => {
    var store_id = await tiendaAdmin(dispatch, { product, store });
    let result = await AxiosGQL(
      FIND_PRODUCT_INIT({ product_id: id, store_id: store_id })
    );

    const total = Object.entries(result.productById.product).length;
    const filtered = Object.entries(result.productById.product).filter(
      ([key, value]) => value === null || value === '' || value === 0
    ).length;
    const cant = total - filtered + 3;
    const percentaje = (cant * 100) / total;
    Setporcentaje(Math.round(percentaje));

    setLoading(false);
    if (result?.productById?.status) {
      ProductUpdate({
        dispatch,
        step: action !== 'update' ? tabIndex : step,
        result: result.productById.product
      });
      // setTabIndex(action !== 'update' ? tabIndex : step);
    }
  };

  const setTabIndex = (value) => {
    value = value < tabIndex || !in_draft ? value : tabIndex;
    dispatch(A_PRODUCTVIEW({ step: value, tabIndex: value }));

    let position = location.pathname.indexOf('productos');

    if (id && id != 'new') {
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=update&id=' +
          id +
          '&step=' +
          value
      );
    } else {
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=create&id=new&step=' +
          value
      );
    }
  };

  const steps = {
    0: <Product />,
    1: <StockProduct />,
    2: <Despacho />,
    3: <Otros />
  };

  useEffect(() => {
    let position = location.pathname.indexOf('productos');
    if (id && id != 'new') {
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=update&id=' +
          id +
          '&step=' +
          tabIndex
      );
    } else {
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=create&id=new&step=' +
          tabIndex
      );
    }
  }, [tabIndex]);

  useEffect(() => {
    if (action == 'update') {
      findproduct(id);
      dispatch(A_PRODUCTVIEW({ step: step, tabIndex: step }));
    } else {
      setLoading(false);
    }
  }, [id]);

  const selectedstyle = {
    color: themeCovende.colors.celeste,
    borderImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 25%, #00ADF6 25%, #00ADF6 75%, rgba(0,0,0,0) 75%)',
    borderImageSlice: '1',
    borderLeft: '8px solid #00ADF6',
    backgroundColor: '#FFFFFF'
  };
  const style = {
    borderRadius: '16px 16px 0px 0px',
    display: 'block',
    marginRight: '15px',
    color: '#ffffff',
    textAlign: 'left',
    width: '100%',
    padding: '1rem'
  };

  const CustomTab = ({ value, backgroundColor, children }) => (
    <Box
      onClick={() => setTabIndex(value)}
      style={{
        ...style,
        backgroundColor,
        ...(value + '' == step + '' ? { ...selectedstyle } : {})
      }}>
      {children}
    </Box>
  );

  const title = ({ data, value }) => (
    <CVText
      fontSize='1.5rem'
      fontWeight='bold'
      color={value == tabIndex ? 'blue' : 'white'}>
      {data}
    </CVText>
  );

  return loading ? (
    <Stack>
      <Skeleton height='100px' />
      <Skeleton height='100px' />
      <Skeleton height='100px' />
    </Stack>
  ) : (
    <Container>
      {action == 'create' ? (
        <> </>
      ) : (
        <div>
          <Cabecera />
        </div>
      )}
      <SizeBox />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={2}>
          <CustomTab value={0} backgroundColor='rgba(0, 173, 246, 1)'>
            {title({ data: '1', value: 0 })}
            Mi Producto
          </CustomTab>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <CustomTab value={1} backgroundColor='rgba(0, 173, 246, 0.8)'>
            {title({ data: '2', value: 1 })}
            Precio y Stock
          </CustomTab>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <CustomTab value={2} backgroundColor='rgba(0, 173, 246, 0.6)'>
            {title({ data: '3', value: 2 })}
            Despacho
          </CustomTab>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <CustomTab value={3} backgroundColor='rgba(0, 173, 246, 0.4)'>
            {title({ data: '4', value: 3 })}
            Otros
          </CustomTab>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <MuiBox width='100%' display='flex' alignItems='center'>
            <MuiBox height='100%' style={{ maxHeight: 70 }}>
              {productcreate}
            </MuiBox>
            <BoxProgress>
              <LinearProgress
                style={{
                  height: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#D4F4FF'
                }}
                variant='determinate'
                value={porcentaje}
              />
            </BoxProgress>
            <MuiBox minWidth={64} zIndex={1}>
              <Circle>
                <Typography variant='body2'>{`${porcentaje}%`}</Typography>
              </Circle>
            </MuiBox>
          </MuiBox>
        </Grid>
      </Grid>
      <CVPanel variant='box' height='100%' borderRadius='0 0 1rem 1rem'>
        {steps[step]}
        <SizeBox height='3rem' />
      </CVPanel>
    </Container>
  );
}

export default AddProducts;
