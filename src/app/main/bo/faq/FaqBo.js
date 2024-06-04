import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TabStyles } from './TabStyles';
import { GlobalFilter } from './components/TableFilter';

import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Text,
  Stack,
  Skeleton,
  Flex,
  Box,
  Center,
  Button,
  Input
} from '@chakra-ui/react';
import themeCovende from '@/themeCovende';
import VendedorFaq from './components/tab1/VendedorFaq';
import VideosFaq from './components/VideosFaq'
import { useDispatch, useSelector } from 'react-redux';
import Utils from './FaqBo.utils';
import ComparadorFaq from './components/tab2/ComparadorFaq';
import useGetPermisions from '@/common/hooks/useGetPermisions';

function FaqBo(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState('');
  const faqPermisions = useGetPermisions('Backoffice', 'Preguntas Frecuentes');
  const [value, setValue] = useState([]);
  const [showValues, setShowValues] = useState([]);

  const CustomTab = ({ children }) => (
    <Tab
      rounded='16px 16px 0px 0px'
      bg={themeCovende.colors.celeste}
      display='vertical'
      marginRight='15px'
      color='#ffffff'
      textAlign='left'
      minW='200px'
      _selected={{
        color: themeCovende.colors.celeste,
        borderImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 25%, #00ADF6 25%, #00ADF6 75%, rgba(0,0,0,0) 75%)',
        borderImageSlice: '1',
        bg: '#FFFFFF'
      }}
      _focus={{ borderColor: 'transparent' }}>
      <div>{children}</div>
    </Tab>
  );

  const searchData = () => {
    const filterValue = showValues.map((value) => {
      let categ = value.category.toLowerCase();
      let fillter = search.toLowerCase();
      let exist = categ.indexOf(fillter);
      if (exist > -1) {
        return value;
      } else {
        return null;
      }
    });
    let data = filterValue.filter((element) => element != null);
    if (search == '') {
      setValue([]);
    } else {
      setValue(data);
    }
  };

  return (
    <Container position='relative'>
      <Flex>
        <Box>
          <TabStyles>
            <Tabs
              isLazy
              variant='unstyled'
              index={tabIndex}
              onChange={(v) => {
                setSearch('');
                setValue([]);
                setTabIndex(v);
              }}>
              <TabList>
                <Text
                  mt={3}
                  mr={3}
                  size='md'
                  c='#004772'
                  fontWeight='bold'
                  fontSize='22px'>
                  FAQ
                </Text>
                <CustomTab>
                  <Text fontSize='1.5rem' fontWeight='bold'>
                    FAQ Vendedor
                  </Text>
                </CustomTab>
                <CustomTab>
                  <Text fontSize='1.5rem' fontWeight='bold'>
                    FAQ Comprador
                  </Text>
                </CustomTab>
                {/* <CustomTab>
                  <Text fontSize='1.5rem' fontWeight='bold'>
                    videos de Capacitación
                  </Text>
                </CustomTab> */}
              </TabList>
              <TabPanels bg='white' rounded='0px 10px 10px 10px'>
                <TabPanel>
                  <VendedorFaq
                    faqPermisions={faqPermisions}
                    search={search}
                    {...{ value, setValue, showValues, setShowValues }}
                  />
                </TabPanel>
                <TabPanel>
                  <ComparadorFaq
                    faqPermisions={faqPermisions}
                    search={search}
                    {...{ value, setValue, showValues, setShowValues }}
                  />
                </TabPanel>
                <TabPanel>
                  <VideosFaq faqPermisions={faqPermisions} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabStyles>
        </Box>

        <Box
          bg='white'
          position='relative'
          mt='72px'
          ml='16px'
          maxH='663px'
          minW='35%'
          py='44px'
          borderRadius='10px'>
          <Box display='flex' position='absolute' right='0' mt='-110px'>
            <Input
              borderRadius='10px 0 0 10px'
              borderColor='#00ADF6'
              w='228px'
              h='28px'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Buscar preguntas frecuentes'
            />
            <Button
              w='88px'
              h='31px'
              bg='#00ADF6'
              color='#fff'
              borderRadius='0 10px 10px 0'
              onClick={() => searchData()}
              zIndex='1'>
              BUSCAR
            </Button>
          </Box>
          <Center position='relative'>
            <Box display='flex' position='absolute' zIndex='1'>
              {Utils.fondoLeftFaqicon}
            </Box>
            <Box position='relative' zIndex='2' mt='141px'>
              {' '}
              {tabIndex === 2 ? Utils.leftFaqicon2 : Utils.leftFaqicon}{' '}
            </Box>
          </Center>
        </Box>
      </Flex>
    </Container>
  );
}

export default FaqBo;
