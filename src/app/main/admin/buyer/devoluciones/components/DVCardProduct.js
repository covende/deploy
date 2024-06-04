import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVColumn,
  CVImage,
  CVPanel,
  CVRow,
  CVText
} from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

function DVCardProduct({ product }) {
  return (
    <Box>
      <CVPanel
        itemJustify='center'
        backgroundColor='red'
        borderRadius='1rem 1rem 0px 0px'
        style={{ maxWidth: '450px' }}>
        <CVText color='white' fontWeight='bold'>
          Estado de devolucion
        </CVText>
        <SizeBox />
        <CVText color='white'>{product.estado}</CVText>
      </CVPanel>
      <CVRow
        style={{ borderTop: '1px solid ' + COLORS['red'] }}
        wrap='nowrap'></CVRow>
      <SizeBox />

      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={2}>
          <CVRow justifyContent='center'>
            <CVColumn width='initial'>
              <SizeBox />
              <CVText color='blue' fontWeight='bold'>
                Fecha de solicitud
              </CVText>
              <CVText color='blue' fontWeight='bold'>
                ID Pedido
              </CVText>
              <CVText color='blue' fontWeight='bold'>
                Fecha de compra
              </CVText>
              <SizeBox />
              <Link
                to={
                  '/buyer/devoluciones/' +
                  product.pedido_id +
                  '/' +
                  product.devolucion_id +
                  '/consult'
                }>
                <CVButton variant='outlined' color='blue' width='100%'>
                  Ver Detalles
                </CVButton>
              </Link>
              <SizeBox />
              <CVButton backgroundColor='blue' width='100%'>
                Cancelar
              </CVButton>
            </CVColumn>
          </CVRow>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CVRow>
            <CVColumn width='initial'>
              <SizeBox />
              <CVText>{product.reject_date}</CVText>
              <CVText>{product.idpedido}</CVText>
              <CVText>{product.buy_date}</CVText>
            </CVColumn>
          </CVRow>
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <CVRow wrap='nowrap'>
            <CVImage
              width='200px'
              height='auto'
              borderRadius='1rem'
              image={product.product.image}
            />
            <SizeBox />
            <CVColumn>
              <SizeBox />
              <CVText color='blue' fontWeight='bold'>
                {product.product.name}
              </CVText>
              <CVText>{product.product.description}</CVText>
              <SizeBox />
              <CVText color='blue'>Tienda {product.store.name}</CVText>
            </CVColumn>
          </CVRow>
        </Grid>
      </Grid>
      <SizeBox />
    </Box>
  );
}

export default DVCardProduct;
