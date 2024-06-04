import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Flex, Text, Box, UnorderedList, ListItem } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVLine, CVPanel, CVText } from '@/common/CovendeTemplate';
import { CVRenderHTML } from '@/common/CovendeTemplate/CVMethods';
import { PRODUCT_DEVOLUTION_REASONS } from '@CVApi/core/webseller/ProductService';
import {
  comprobante_producto,
  condicion_producto,
  origin_producto,
  typeofsale_producto
} from '@/common/utils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

const TextDescription = ({ title, description }) => (
  <Flex>
    <Box w='15rem'>
      <CVText fontWeight='bold' color='textDescription'>
        {title}
      </CVText>
    </Box>
    <CVText width='300' color='textDescription'>
      {description}
    </CVText>
  </Flex>
);

function PDescrition({ product }) {
  const [reasons, setreasons] = useState([]);
  const initdata = async () => {
    const { productDevolutionReasons } = await AxiosGQL(
      PRODUCT_DEVOLUTION_REASONS()
    );
    setreasons(
      productDevolutionReasons?.filter((reason) =>
        product?.devolution_reasons_ids?.includes(reason._id)
      )
    );
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Grid item xs={12} sm={7} md={9} style={{ color: '#4E4E4E' }}>
      <CVPanel variant='box' height='100%' color=''>
        <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
          Información de producto
        </CVText>
        <CVLine color='gray' lineHeight='1px' />
        <CVText fontSize='18' fontWeight='600' color='textDescription'>
          Descripción Destacada
        </CVText>
        <SizeBox height='1rem' />
        {/* <CVText variant='maxtext' lines={3}> */}
        <CVRenderHTML>
          {product?.product_detail?.featured_description || ''}
        </CVRenderHTML>
        {/* </CVText> */}
        <CVLine color='gray' lineHeight='1px' />
        <SizeBox height='1rem' />
        <CVText fontSize='18' fontWeight='600' color='textDescription'>
          Datos Generales
        </CVText>
        <SizeBox height='1rem' />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <TextDescription
              title='Condición del producto:'
              description={condicion_producto(product?.product_condition || '')}
            />
            <TextDescription
              title='Tipo de venta:'
              description={typeofsale_producto(product?.type_of_sale || '')}
            />
            <TextDescription
              title='Tipo de comprobante:'
              description={comprobante_producto(product?.type_voucher)}
            />

            <TextDescription
              title='Procedencia:'
              description={origin_producto(product?.product_origin)}
            />
            <TextDescription
              title='Marca Registrada:'
              description={product?.product_brand?.name || ''}
            />
            <TextDescription
              title='Modelo:'
              description={product?.model_product || ''}
            />
            <TextDescription
              title='Material principal:'
              description={product?.product_detail?.main_material || ''}
            />
            <TextDescription
              title='Peso del producto:'
              description={product?.product_detail?.product_weight || ''}
            />

            <Flex position='relative'>
              <Box w='16rem'>
                <CVText color='textDescription' fontWeight='bold'>
                  Dimensiones del producto:
                </CVText>
              </Box>
              <Box position='absolute' right='-3.5rem'>
                <CVText color='textDescription' width='300'>{` Largo ${
                  product?.product_detail?.product_dimensions?.long || ''
                }, ancho ${
                  product?.product_detail?.product_dimensions?.width || ''
                }, alto ${
                  product?.product_detail?.product_dimensions?.high || ''
                }`}</CVText>
              </Box>
            </Flex>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            {product?.waranty || false ? (
              <>
                <TextDescription
                  title='Garantía:'
                  description={product?.warranty_period}
                />
                <TextDescription
                  title='Condiciones de la garantía:'
                  description={product?.warranty_detail}
                />
              </>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
        <SizeBox height='1rem' />
        <CVLine color='gray' lineHeight='1px' />
        <Text fontSize='18px' fontWeight='600' color='#4D4D4D'>
          Detalles de Producto
        </Text>
        <SizeBox height='1rem' />
        <CVRenderHTML>
          {product?.product_detail?.detailed_description || ''}
        </CVRenderHTML>
        <SizeBox height='1rem' />
        <CVLine color='gray' lineHeight='1px' />
        <Text fontSize='18px' fontWeight='600' color='#4D4D4D'>
          Condiciones de devolución
        </Text>
        <SizeBox height='1rem' />
        <Text>La tienda acepta devoluciones de este producto en caso de:</Text>
        <UnorderedList ml='3rem'>
          {reasons.map((res, i) => (
            <ListItem fontSize='12px' color='#4D4D4D' key={i}>
              {res.title}
            </ListItem>
          ))}
        </UnorderedList>
        <Text id='comment_id'>
          Revisa nuestras{' '}
          <Link to='/.'>
            <span style={{ color: '#09A1DB', fontSize: '12px' }}>
              {' '}
              Políticas de Devoluciones
            </span>
          </Link>{' '}
          para más información.
        </Text>
      </CVPanel>
    </Grid>
  );
}

export default PDescrition;
