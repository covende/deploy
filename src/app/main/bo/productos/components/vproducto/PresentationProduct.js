import { Box, Flex, Text } from '@chakra-ui/react';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { condicion_producto, origin_producto } from '@/common/utils/index';

function PresentationProduct({ producto }) {
  const gridRow = (title, content) => (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={5} md={4}>
        <Typography style={{ color: '#294970' }}>{title}</Typography>
      </Grid>
      <Grid item xs={6} sm={7} md={8}>
        <Typography>{content}</Typography>
      </Grid>
    </Grid>
  );
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5}>
          <Flex wrap='wrap'></Flex>
          <ImageGallery
            items={producto.product_detail.photographs.map((photo, index) => ({
              original: photo,
              thumbnail: photo
            }))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Text fontSize='2rem' fontWeight='bold' color='#294970'>
            {producto.product_name}
          </Text>
          {gridRow(
            'Categoría:',
            producto.categories.map((it) => it.name).join('>')
          )}
          {gridRow('Categoría adicional:', '')}
          {gridRow('Tienda:', producto?.store?.comercial_name || '')}
          {gridRow('Marca Registrada:', producto.product_brand?.name || '')}
          {gridRow('Modelo:', producto?.model_product || '')}
          {gridRow(
            'Condición del producto:',
            condicion_producto(producto?.product_condition) || ''
          )}
          {gridRow(
            'Procedencia:',
            origin_producto(producto?.product_origin) || ''
          )}
          {gridRow(
            'Material principal:',
            producto?.product_detail?.main_material || ''
          )}
          {gridRow(
            'Peso del producto:',
            producto?.product_detail?.product_weight || ''
          )}

          {gridRow('SKU:', producto.sku || '')}
          {gridRow(
            'Dimensiones del producto:',
            `Largo ${producto?.product_detail?.product_dimensions?.long || ''},
            Ancho ${producto?.product_detail?.product_dimensions?.width || ''},
            Alto ${producto?.product_detail?.product_dimensions?.high || ''}`
          )}

          {gridRow(
            'Atributos del producto:',
            producto?.product_attributes.map((it) => it.name).join(',')
          )}

          <Grid container spacing={2}>
            <Grid item xs={6} sm={5} md={4}>
              <Typography style={{ color: '#294970' }}>Variaciones:</Typography>
            </Grid>
            <Grid item xs={6} sm={7} md={8}>
              {producto?.product_attributes.map((item) => (
                <Box key={v4()} style={{ border: '1px solid #EFEFEF' }}>
                  <Typography variant='caption' style={{ paddingLeft: '1rem' }}>
                    {item.name}
                  </Typography>
                  <br />
                  <Box
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap'
                    }}>
                    {item.attribute_details.map((ditem) => (
                      <Box
                        key={v4()}
                        style={{
                          height: '40px',
                          minWidth: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        {item.name
                          .toString()
                          .toLowerCase()
                          .includes('color') ? (
                          <Box
                            style={{
                              backgroundColor: ditem.color,
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px'
                            }}></Box>
                        ) : (
                          <Box>{ditem.name}</Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PresentationProduct;
