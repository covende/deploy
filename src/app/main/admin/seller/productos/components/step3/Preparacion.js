import React from 'react';
import { Fragment } from 'react';
import DespachoTable from './DespachoTable';
import { HStack, Text } from '@chakra-ui/layout';
import { Container, Grid } from '@material-ui/core';
import { CVCheck, CVInput, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import themeCovende from '@/themeCovende';
import { ProductSubTitle } from '../../ProductsStyle';
import { useSelector } from 'react-redux';

function Preparacion({ despacha, setDespacha, errors }) {
  const { precios } = useSelector((state) => state.ProductView);

  return (
    <Fragment>
      <ProductSubTitle>3.1. Tiempo de preparación</ProductSubTitle>
      <Container>
        <CVText color='boldGray'>
          Es el tiempo que te toma preparar un producto para que esté listo para
          ser recogido por el courier. El plazo máximo es de 7 días calendarios.
          Recuerda que este tiempo de preparación está sujeto a penalidad en
          caso de incumplimiento.
        </CVText>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <HStack>
              {/* despacha.dias.length == 0 */}
              <CVInput
                errorMessage='Campo obligatorio.Máximo 7 días(ingrese solo números enteros)'
                error={
                  errors &&
                  (despacha.dias > 7 || despacha.dias < 1 || despacha.dias % 1)
                }
                type='number'
                value={+despacha.dias}
                onChange={(value) => setDespacha({ ...despacha, dias: value })}
                max={7}
              />
              <Text>Días</Text>
            </HStack>
          </Grid>
          <Grid item md={3}></Grid>
          {/* <Grid item xs={12} sm={6} md={6}>
            {precios.type_of_sale == 'RETAIL' ? (
              <></>
            ) : (
              <CVCheck
                value={despacha.pormayor}
                onChange={(value) =>
                  setDespacha({
                    ...despacha,
                    pormayor: value
                  })
                }
                title='Personalizar para Venta al por Mayor'
                titleAlign='left'
              />
            )}
          </Grid> */}
        </Grid>
        <SizeBox />
        {despacha.pormayor && despacha.wholesales.length != 0 ? (
          <>
            <CVText color='blue' fontWeight='600' fontSize='16px'>
              Personalizar para Venta al por Mayor
              <span style={{ color: themeCovende.colors.rojo }}>*</span>
            </CVText>
            <DespachoTable despacha={despacha} setDespacha={setDespacha} />
          </>
        ) : (
          <></>
        )}
        <SizeBox />
        <Text>
          NOTA: El tiempo de entrega es igual al tiempo de preparación que
          ingresaste más el tiempo de envío. La web mostrará un tiempo de
          entrega estimado para tu producto.{' '}
        </Text>
      </Container>
    </Fragment>
  );
}

export default Preparacion;
