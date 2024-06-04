import React from 'react';
import { Fragment } from 'react';
import { Text } from '@chakra-ui/layout';
import { Container, Grid } from '@material-ui/core';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { CVInput, CVText } from '@/common/CovendeTemplate';
import { onlyNumber } from '@/common/CovendeTemplate/CVValidation';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { ProductSubTitle } from '../../ProductsStyle';

function Garantia({ extra, setExtra, errors }) {
  return (
    <Fragment>
      <ProductSubTitle>4.2. Garantía</ProductSubTitle>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <CVText>¿Ofreces garantía por tu producto?</CVText>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CVRadio
              itemDirection='row'
              options={[
                { text: 'SI', value: 'si' },
                { text: 'NO', value: 'no' }
              ]}
              value={extra.garantia}
              onChange={(value) => setExtra({ ...extra, garantia: value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}></Grid>
          {extra.garantia == 'si' ? (
            <>
              <Grid item xs={12} sm={12} md={4}>
                <CVText>Periodo</CVText>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CVInput
                  error={
                    errors && (extra?.periodo == '' || extra?.periodo == 0)
                    // eval(onlyNumber(extra?.periodo)) > 24
                  }
                  onValid={(value) => onlyNumber(value)}
                  errorMessage='Periodo debe ser númerico'
                  value={extra?.periodo}
                  onValidate={(value) => {
                    setExtra({
                      ...extra,
                      periodo: value
                    });
                  }}
                  icon={<Text color='#000000'> días </Text>}
                  buttonColor='white'
                  iconFind={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}></Grid>

              <Grid item xs={12} sm={12} md={10}>
                <CVText>Indica las condiciones</CVText>
                <CVInput
                  height='100%'
                  multiline={true}
                  error={errors && extra.detalle.length == 0}
                  value={extra.detalle}
                  onChange={(value) =>
                    setExtra({
                      ...extra,
                      detalle: value
                    })
                  }
                />
                <SizeBox />
                <SizeBox />
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Garantia;
