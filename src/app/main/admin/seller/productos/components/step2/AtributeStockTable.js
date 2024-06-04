import React from 'react';
import './WholeSale.css';
import { v4 } from 'uuid';
import { Grid, Box, Flex, Spacer, Center, Input } from '@chakra-ui/react';
import { svgDeleteGray, svgEditGray, svgSeparateLine } from './svg';
import { event } from 'react-ga';

/**
 * Tabla para mostrar, actulizar y eliminar los atributos del producto
 * @param {updateAtribute,headerAtribute,atribute,deleteAtribute } props
 */
const AtributeStockTable = (props) => {
  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    props.updateAtribute(id, name, value);
  };

  return (
    <Box>
      <Box
        mb={2}
        bg='#004772'
        color='white'
        w='100%'
        h='auto'
        p='10px 16px'
        variant='bo-primary'
        borderRadius={16}>
        <Flex>
          <Grid>
            <Box mx={20}>
              <Center> ID</Center>
            </Box>
          </Grid>
          <Box w='10px' />
          {props.headerAtribute.map((item) => {
            return (
              <React.Fragment key={v4()}>
                <Box mx={5} />
                <Grid>
                  <Center>{item}</Center>
                </Grid>
                <Box mx={5} />
              </React.Fragment>
            );
          })}

          <Box mx={53} />
          <Grid>
            <Center>SKU</Center>
          </Grid>
          <Spacer />
          <Grid pl={20}>
            <Center>Stock</Center>
          </Grid>
          <Spacer />
          <Grid pl={20}>
            <Center>Precio(s/)</Center>
          </Grid>
          <Spacer />

          <Grid></Grid>
          <Spacer />
        </Flex>
      </Box>
      <Grid
        templateRows='repeat(1, 0.1fr)'
        templateColumns='repeat(1, 1fr)'
        gap='6px'>
        {props.atribute.length > 0 ? (
          props.atribute.map((Atributefile, i) => (
            <Box
              bg='#00ADF620'
              w='100%'
              h='auto'
              p='10px 1px'
              color='#004772'
              borderRadius={6}
              key={Atributefile.item_id}
              className='row-whole-sale'>
              <Flex>
                <Spacer />
                <Grid>
                  <Box borderRadius={6} px={2} py={3} mx={1}>
                    {Atributefile.item_id}
                  </Box>
                </Grid>

                {/* {Object.values(Atributefile.attributes).map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Spacer />
                      <Grid width='8%'>
                        <Box borderRadius={6} px={2} py={3} mx={1}>
                          {item}
                        </Box>
                      </Grid>
                    </React.Fragment>
                  );
                })} */}

                {Atributefile.attributes.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Spacer />
                      <Grid width='8%'>
                        <Box borderRadius={6} px={2} py={3} mx={1}>
                          {item.value}
                        </Box>
                      </Grid>
                    </React.Fragment>
                  );
                })}

                {/* <Spacer />
                <Spacer /> */}

                <Grid>
                  <Box borderRadius={6} p='5px 16px'>
                    <Input
                      w={98}
                      type='text'
                      name='sku'
                      value={Atributefile.sku}
                      onChange={(e) =>
                        handleInputChange(e, Atributefile.item_id)
                      }
                    />
                  </Box>
                </Grid>
                <Spacer />
                <Spacer />
                <Grid>
                  <Box borderRadius={6} p='5px 16px'>
                    <Input
                      w={98}
                      type='number'
                      name='stock'
                      value={Atributefile.stock}
                      onChange={(e) =>
                        handleInputChange(e, Atributefile.item_id)
                      }
                    />
                  </Box>
                </Grid>
                <Spacer />
                <Spacer />
                <Grid>
                  <Box borderRadius={6} p='5px 16px'>
                    <Input
                      key={Atributefile.id}
                      w={98}
                      type='text'
                      name='price'
                      value={Atributefile.price}
                      onChange={(e) =>
                        handleInputChange(e, Atributefile.item_id)
                      }
                    />
                  </Box>
                </Grid>
                <Spacer />
                <Spacer />

                <Flex>
                  <Spacer />
                  <Spacer />
                  <Box
                    ml={5}
                    onClick={() => props.deleteAtribute(Atributefile.item_id)}
                    className='action-icons-whole-sale'>
                    {svgDeleteGray}
                  </Box>
                  <Box mx={2}>{svgSeparateLine}</Box>
                </Flex>
                <Spacer />
              </Flex>
            </Box>
          ))
        ) : (
          <Box textAlign='center' fontWeight='semibold'>
            <Grid color='#004772'>Sin Variaciones</Grid>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
export default AtributeStockTable;
