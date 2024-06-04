import React from 'react';
import './WholeSale.css';
import { Grid, Box, Input, Flex, Spacer } from '@chakra-ui/react';

import DecorativeText from '@/app/main/bo/clientes/components/DecorativeText';
import { svgDeleteGray, svgEditGray, svgSeparateLine } from './svg';
/**
 * Funcion que genera la tabla venta mayor 
 * @param {updateWholeSale,
  deleteWholeSale,
  wholeSales,
  editRow} param0 
 */

const wholeSaleTable = ({ updateWholeSale, deleteWholeSale, wholeSales }) => {
  return (
    <Box mr={10}>
      <Box
        mb={2}
        bg='#004772'
        color='white'
        w='80%'
        h='auto'
        p='10px 16px'
        variant='bo-primary'
        borderRadius={16}>
        <Flex>
          <Grid ml={9}> Pedido Mimimo (PM)</Grid>
          <Spacer />
          <Grid ml={10}> Máximo de pedido </Grid>
          <Spacer />
          <Grid>Precio (S/)</Grid>
          <Spacer />
          <Grid></Grid>
          <Spacer />
        </Flex>
      </Box>
      <Grid
        templateRows='repeat(1, 0.1fr)'
        templateColumns='repeat(1, 1fr)'
        gap='6px'>
        {wholeSales.length > 0 ? (
          wholeSales.map((wholeSale, i) => (
            <Box
              bg='#00ADF620'
              w='80%'
              h='auto'
              p='10px 16px'
              color='#004772'
              borderRadius={6}
              key={wholeSale.id}
              className='row-whole-sale'>
              <Flex>
                <Spacer />
                <Grid>
                  <Box mt={2}>
                    <Input
                      w='20'
                      borderRadius={6}
                      type='number'
                      name='pma'
                      value={wholeSale.minimum_order}
                      onChange={(e) =>
                        updateWholeSale(wholeSale.id, {
                          ...wholeSale,
                          minimum_order: e.target.value
                        })
                      }
                      h='10'
                    />
                  </Box>
                </Grid>
                <Spacer />
                <Spacer />

                <Grid width='20%'>
                  <Box textAlign='left' mx={10} mt={2} borderRadius={8}>
                    {wholeSale.maximum_order_text}
                  </Box>
                </Grid>
                <Spacer />
                <Grid>
                  <Box mt={2}>
                    <Input
                      w='20'
                      type='number'
                      borderRadius={6}
                      name='price'
                      value={wholeSale.price}
                      onChange={(e) =>
                        updateWholeSale(wholeSale.id, {
                          ...wholeSale,
                          price: e.target.value
                        })
                      }
                      h='30'
                    />
                  </Box>
                </Grid>
                <Spacer />
                <Spacer />

                <Flex>
                  <Spacer />
                  <Box
                    ml={5}
                    onClick={() => deleteWholeSale(wholeSale.id)}
                    className='action-icons-whole-sale'>
                    {svgDeleteGray}
                  </Box>
                  <Box mx={2}>{svgSeparateLine}</Box>

                  <Spacer />
                  <Spacer />
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <Box>
            <Grid>Añade los parametros indicados</Grid>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
export default wholeSaleTable;
