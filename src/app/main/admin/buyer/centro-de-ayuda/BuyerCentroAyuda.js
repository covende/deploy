import { Box, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PanelsAprendizaje from '../../seller/CentroAyuda/components/TabAprendizaje';
//import PendingActiveStore from '../PendingActiveStore';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Flex,
  Text,
  Stack,
  Skeleton
} from '@chakra-ui/react';
import QuestionsAnswer from '../../faq/TabQuestions/QuestionsAnswer';
import icons from './assets/icons';
import TermsPolitics from './components/TabTerminos/TermsPolitics';
import { Modal, useDisclosure, Button } from '@chakra-ui/react';

// import PanelsAprendizaje from './components/TabAprendizaje/PanelsAprendizaje';

function BuyerCentroAyuda(props) {
  const [isOpenFrequentQues, setIsOpenFrequentQues] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleTabsChange = (index) => {
    setIsOpenFrequentQues(index);
  };
  return (
    <Grid>
      <Box bg='#FFF' fontSize='4xl'>
        <Tabs
          isFitted
          variant='enclosed'
          margin='auto'
          height='100%'
          width='100%'
          padding='16px'
          onChange={handleTabsChange}>
          <TabList bg='#fff' pl={4} flexDirection='column'>
            <Box>
              <Box color='#FF5454' bg='#FFF' fontWeight='bold'>
                <Text fontSize='4xl' fontWeight='extrabold'>
                  Centro de Ayuda
                </Text>
              </Box>
              <Box bg='#FFF' color='#004772'>
                <Text fontSize='1xl'>
                  ¿Tienes algunas dudas o problemas en CoVende?. Aquí puedes
                  encontrar las soluciones.
                </Text>
              </Box>
            </Box>
            <Box>
              <Flex justifyContent='space-between' w='100%'>
                <Tab
                  height='65px'
                  mt={40}
                  mx={1}
                  border='2px'
                  borderColor='#FF5454'
                  color='#FF5454'
                  _selected={{ color: 'white', bg: '#FF5454', h: '97px' }}
                  h='82px'
                  rounded='16px 16px 0px 0px'
                  _focus={{ borderColor: '#FF5454' }}>
                  {props.children}{' '}
                  <Text fontSize='2xl'>Centro de Aprendizaje</Text>
                </Tab>
                <Tab
                  height='65px'
                  mt={40}
                  mx={1}
                  border='2px'
                  borderColor='#17BF93'
                  color='#17BF93'
                  h='82px'
                  _selected={{ color: 'white', bg: '#17BF93', h: '97px' }}
                  rounded='16px 16px 0px 0px'
                  _focus={{ borderColor: '#17BF93' }}>
                  <Text fontSize='2xl'>Preguntas Frecuentes </Text>
                </Tab>
                <Tab
                  height='65px'
                  mt={40}
                  mx={1}
                  border='2px'
                  borderColor='#FFB210'
                  color='#FFB210'
                  h='82px'
                  _selected={{ color: 'white', bg: '#FFB210', h: '97px' }}
                  rounded='16px 16px 0px 0px'
                  _focus={{ borderColor: '#FFB210' }}>
                  <Text fontSize='2xl'> Términos y políticas</Text>
                </Tab>
                <Box w='409px'>
                  {isOpenFrequentQues === 1
                    ? icons.frequentQues
                    : icons.imageRight}
                </Box>
              </Flex>
            </Box>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box mt={2}>
                <Box my={3}>
                  La mejor forma de vender tus productos en Covende con toda la
                  seguridad y de manera mas intuitiva
                </Box>
                <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                  <Box>
                    {icons.circlePink}
                    <Box align='center'>
                      <Text align='center' fontWeight='black'>
                        PASO 1
                      </Text>
                      <Text align='center' fontWeight='black' color='#00ADF6'>
                        Crea un producto
                      </Text>
                      Ingresa a nuestro Market Place y busca tu producto en
                      todas las categorías que contamos para ti.
                    </Box>
                  </Box>
                  <Box align='center'>
                    {icons.circlePurple}
                    <Box align='center'>
                      <Text align='center' fontWeight='black'>
                        PASO 2
                      </Text>
                      <Text align='center' fontWeight='black' color='#795DD7'>
                        Ajusta tu requerimiento
                      </Text>
                      Con tu pedido escogido, ajusta los detalles de pedido para
                      que obtengas tu producto tal como lo imaginas.
                    </Box>
                  </Box>

                  <Box>
                    {icons.circleGreen}
                    <Box align='center'>
                      <Text align='center' fontWeight='black'>
                        PASO 3
                      </Text>
                      <Text align='center' fontWeight='black' color='#17BF93'>
                        Ingresa los datos de tu producto
                      </Text>
                      Ingresa tus datos para tu compra o si eres nuevo crea una
                      cuenta de forma rápida en CoVende.
                    </Box>
                  </Box>

                  <Box>
                    {icons.circleYellow}
                    <Box align='center'>
                      <Text align='center' fontWeight='black'>
                        PASO 4
                      </Text>
                      <Text align='center' fontWeight='black' color='#FFB210'>
                        Realiza el pago
                      </Text>
                      CoVende cuenta con todos los métodos de pago que puedas
                      necesitar, recuerda que tu dinero estará resguardado hasta
                      que no confirmes la recepción satisfecha.
                    </Box>
                  </Box>

                  <Box>
                    {icons.circleSky}
                    <Box align='center'>
                      <Text align='center' fontWeight='black'>
                        PASO 5
                      </Text>
                      <Text align='center' fontWeight='black' color='#00ADF6'>
                        ¡Pedido en camino!
                      </Text>
                      No hay mejor momento que estar seguro que tu pedido estará
                      en camino. Tus compras con proveedores directos siempre es
                      con CoVende.
                    </Box>
                  </Box>
                </Grid>
                {/* <PanelsAprendizaje
                  title='¿Cómprar de manera segura en CoVende?'
                  colorBg='#FF5454'
                  icon={icons.YouTube}>
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum .
                </PanelsAprendizaje>
                <PanelsAprendizaje
                  title='¿Aprende como realizar una devolución de la mejor forma?'
                  colorBg='#8080E8'
                  icon={icons.YouTube}>
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum .
                </PanelsAprendizaje> */}
              </Box>
            </TabPanel>
            <TabPanel>
              <QuestionsAnswer type='buyer' />
            </TabPanel>
            <TabPanel>
              <TermsPolitics type='buyer' />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
}

export default BuyerCentroAyuda;
