import React from 'react';
import {
  Text,
  Box,
  Flex,
  Center,
  Button,
  Input,
  Spacer,
  Divider,
  Image,
  Badge,
  Stack
} from '@chakra-ui/react';

import {
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  OutlinedInput,
  FormLabel
} from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import imgMiniBannerHome1 from '@/app/assets/images/banners/home/mini-banner-home-1.png';
import imgMiniBannerHome2 from '@/app/assets/images/banners/home/mini-banner-home-2.png';
import { CVImage } from '@/common/CovendeTemplate';
const Filtros = (props) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box bg='white' padding='1rem' borderRadius='1rem'>
      <Box my={3}>
        <Flex my={2}>
          <Text color='#004574' fontWeight='bold' fontSize='2xl'>
            Filtros
          </Text>
          <Spacer />
          <Text color='#004574' fontSize='1md'>
            limpiar filtro
          </Text>
        </Flex>
      </Box>
      <Divider orientation='horizontal' />
      <Box>
        <Text color='#004574' fontSize='2xl'>
          Tipo de venta
        </Text>
        <Box>
          <FormControl component='fieldset'>
            <FormLabel component='legend'></FormLabel>
            <RadioGroup
              aria-label='mayor'
              name='mayor'
              value={value}
              onChange={handleChange}>
              <FormControlLabel
                value='mayor'
                control={<Radio />}
                label='Al por mayor'
              />
              <FormControlLabel
                value='menor'
                control={<Radio />}
                label='Al por menor'
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Divider orientation='horizontal' />
      <Box my={5} mb={45}>
        <SizeBox />
        <Flex px={15}>
          <Input
            width='7rem'
            type='number'
            required={true}
            placeholder='Desde'
          />
          <Spacer />
          --
          <Spacer />
          <Input
            width='7rem'
            type='number'
            required={true}
            placeholder='Hasta'
          />
        </Flex>
        <Center>
          <Button
            mt={5}
            borderRadius='24px'
            colorScheme='facebook'
            fontSize='1.4rem'
            height='2rem'
            onClick={() => redireccion()}>
            APLICAR
          </Button>
        </Center>
      </Box>
      <Divider orientation='horizontal' />
      <Box>
        <Text color='#004574' fontSize='2xl'>
          Marcas
        </Text>
        <FormControl component='fieldset'>
          <FormLabel component='legend'></FormLabel>
          <RadioGroup aria-label='marcas' name='marcas'>
            <FormControlLabel
              value='mayor'
              control={<Radio />}
              label='Al por mayor'
            />
            <FormControlLabel
              value='menor'
              control={<Radio />}
              label='Al por menor'
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Divider orientation='horizontal' />
      <Box>
        <Text color='#004574' fontSize='2xl'>
          Condición
        </Text>
        <FormControl component='fieldset'>
          <FormLabel component='legend'></FormLabel>
          <RadioGroup aria-label='marcas' name='marcas'>
            <FormControlLabel
              value='mayor'
              control={<Radio />}
              label='Al por mayor'
            />
            <FormControlLabel
              value='menor'
              control={<Radio />}
              label='Al por menor'
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mt={10}>
        <Box>
          <Center>
            <Text color='#004574' fontSize='2xl'>
              Espacio Publicitario
            </Text>
          </Center>
        </Box>

        <Box my={4}>
          <CVImage width='100%' height='100%' image={imgMiniBannerHome1} />
        </Box>
        <Box>
          <CVImage width='100%' height='100%' image={imgMiniBannerHome2} />
        </Box>
        <Box my={4}>
          <CVImage width='100%' height='100%' image={imgMiniBannerHome1} />
        </Box>
      </Box>
    </Box>
  );
};
export default Filtros;
