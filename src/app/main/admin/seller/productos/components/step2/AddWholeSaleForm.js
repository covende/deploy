import React, { useState, useEffect } from 'react';
import {
  Center,
  Box,
  Flex,
  Spacer,
  Input,
  Text,
  Button,
  FormControl
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
/**
 * Formulario donde se ingresan los datos de la tabla precio por mayor.
 * @param {addWholeSale, onClose, wholeSaleslist}
 */
const AddWholeSaleForm = ({ addWholeSale, onClose, wholeSaleslist }) => {
  const [wholeSale, setWholeSale] = useState({});
  const addToast = useToast();
  const variant = false;
  const [editing, setEditing] = useState(variant ? true : false);
  const [lastpma, setlastpma] = useState('');
  variant ? true : false;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setWholeSale({ ...wholeSale, [name]: Number(value) });
  };

  useEffect(() => {
    if (wholeSaleslist[wholeSaleslist.length - 1] === undefined) {
      setEditing(true);
    } else {
      setlastpma(wholeSaleslist[wholeSaleslist.length - 1].minimum_order);
      setEditing(false);
      setWholeSale({
        ...wholeSale,
        minimum_order: wholeSaleslist[wholeSaleslist.length - 1].minimum_order
      });
    }
  }, []);

  const submit = () => {
    if (wholeSale.minimum_order > wholeSale.maximum_order) {
      CVAlertError({
        addToast,
        message: 'El pedido mínimo no debe ser mayor que el pedido máximo'
      });
      return;
      // setWholeSale({
      //   minimum_order: wholeSale.minimum_order,
      //   maximum_order: wholeSale.maximum_order,
      //   price: wholeSale.price
      // });
    } else {
      addWholeSale(wholeSale);
      setWholeSale({ minimum_order: 0, maximum_order: 0, price: 0 });
      onClose();
    }
  };

  return (
    <Box m={2}>
      <FormControl>
        <Flex>
          <Text pt={2} fontSize='1xl' fontWeight='bold'>
            Pedido Minimo:
          </Text>
          <Spacer />
          {editing ? (
            <Input
              w={242}
              py={17}
              type='number'
              name='minimum_order'
              defaultValue={wholeSale?.minimum_order}
              onChange={handleInputChange}
            />
          ) : (
            <React.Fragment>
              <Text pt={2} fontSize='1xl'>
                {lastpma}
              </Text>
              <Spacer />
            </React.Fragment>
          )}
        </Flex>

        <Flex my={5}>
          <Text pt={2} fontSize='1xl' fontWeight='bold'>
            Pedido Máximo :
          </Text>
          <Spacer />
          <Input
            w={242}
            py={17}
            float='right'
            type='number'
            name='maximum_order'
            defaultValue={wholeSale?.maximum_order}
            onChange={handleInputChange}
          />
        </Flex>
        <Flex my={5}>
          <Text pt={2} fontSize='1xl' fontWeight='bold'>
            Precio:
          </Text>
          <Spacer />
          <Input
            w={242}
            py={17}
            float='right'
            type='number'
            name='price'
            defaultValue={wholeSale?.price}
            onChange={handleInputChange}
          />
        </Flex>
        <Box mt={25} mb={2}>
          <Center>
            <Button
              onClick={() => submit()}
              className='button_hmtml'
              type='submit'
              p={13}>
              Añadir
            </Button>

            <Button
              bg='#E95558'
              borderRadius='40'
              colorScheme='blue'
              ml={3}
              w='100px'
              onClick={() => onClose()}
              p={13}>
              Salir
            </Button>
          </Center>
        </Box>
      </FormControl>
    </Box>
  );
};

export default AddWholeSaleForm;
