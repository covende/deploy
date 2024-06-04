import AxiosGQL from '@/app/api/rest/AxiosGQL';
import themeCovende from '@/themeCovende';
import { Flex } from '@chakra-ui/layout';
import {
  Box,
  Container,
  Grid,
  Typography,
  createTheme,
  ThemeProvider
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ALL_BRANDS } from '@/app/api/graphql/webseller/ProductService';
import Marcas from './Marcas';
import { CVInput, CVSelect, CVText } from '@/common/CovendeTemplate';
import { CONDICIONPROD, ORIGINPROD } from '@/common/CovendeTemplate/CVThemes';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { ProductSubTitle } from '../../ProductsStyle';

function Informacion({ information, brands, brand, setProducto, errors }) {
  const dispatch = useDispatch();
  const setInformation = (data) => setProducto({ information: data });
  const initdata = async () => {
    if (brands.length == 0) {
      const da = await AxiosGQL(ALL_BRANDS);
      setProducto({ brands: da.brands.brands || [] });
    }
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box>
      <ProductSubTitle>1.2. Información sobre el producto</ProductSubTitle>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <CVText color='blue' fontWeight='600' fontSize='16px'>
              {/* Nombre de producto */}
              Título o Nombre de producto
              <span style={{ color: themeCovende.colors.rojo }}>*</span>
            </CVText>
            <CVText color='boldGray'>
              {/* Ingresa el producto, marca, modelo y color. Ejemplo: Zapatillas
              Puma Shatter XT - Negro */}
              Ingresa un título o frase descriptiva para tu producto, ya sea incluyendo la marca,
              modelo, color o una combinación de estos elementos. Por ejemplo: "Zapatillas Puma Shatter
              XT - Negro".
            </CVText>
            <Flex alignItems='end'>
              <CVInput
                error={errors && information.name == ''}
                value={information.name}
                onChange={(value) =>
                  setInformation({ ...information, name: value.toUpperCase() })
                }
                width='100%'
                maxLength='100'
                textTransform=''
              />
              <SizeBox />
              <CVText fontSize='0.85rem'>{information.name.length}/100</CVText>
            </Flex>
          </Grid>
          <Marcas
            information={information}
            setInformation={setInformation}
            dispatch={dispatch}
            brands={brands}
            brand={brand}
          />
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CVText color='blue' fontWeight='600' fontSize='16px'>
                  {' '}
                  Modelo
                </CVText>
                <CVText color='boldGray'>
                  Es una especificación que ayuda al comprador a ubicar un
                  producto en concreto. Puedes ingresar números y letras. Puedes
                  incluir letras y números. Ejemplo: XT 88347
                </CVText>
                <CVInput
                  value={information.modelo}
                  onChange={(value) =>
                    setInformation({ ...information, modelo: value })
                  }
                />
                <SizeBox />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CVText color='blue' fontWeight='600' fontSize='16px'>
                  SKU
                </CVText>
                <CVText color='boldGray'>
                  Es el código que identifica tu producto en tus inventarios.
                  Esta información es interna y te servirá para llevar el
                  control de tu logística. Código que identifica tu producto en
                  tus inventarios. Puedes incluir letras y números.
                </CVText>
                <CVInput
                  value={information.sku}
                  onChange={(value) =>
                    setInformation({ ...information, sku: value })
                  }
                  errorMessage='SKU es obligatorio'
                />

                <SizeBox />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CVSelect
                  title='Procedencia'
                  signs='*'
                  titleOrientation='column'
                  options={ORIGINPROD}
                  value={information.procedencia}
                  onChange={(value) =>
                    setInformation({
                      ...information,
                      procedencia: value
                    })
                  }
                  error={errors && information.procedencia == ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CVSelect
                  titleOrientation='column'
                  title='Condición'
                  signs='*'
                  options={CONDICIONPROD}
                  value={information.condicion}
                  onChange={(value) =>
                    setInformation({
                      ...information,
                      condicion: value
                    })
                  }
                  error={errors && information.condicion == ''}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Informacion;
