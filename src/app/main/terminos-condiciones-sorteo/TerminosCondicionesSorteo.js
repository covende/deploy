import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useTab,
  Button,
  Link
} from '@chakra-ui/react';
import { Container } from '@material-ui/core';

import { COLORS } from '@CVTemplate/core/CVThemes';

import { CVText } from '@/common/CovendeTemplate';
import TermV1 from '../terminos-y-condiciones/termsVersions/TermV1';
import TermV2 from '../terminos-y-condiciones/termsVersions/TermV2';
import TermSorteo from './versions/TermSorteo';

const termsAndConditions = [
  {
    component: 'terminosV1',
    date: 'Del 9 de marzo de 2024 al 12 de mayo de 2024',
    nameTab: 'Actual'
  },

  /* {
    component: 'terminosV2',
    date: 'Vigente al 01/01/2022',
    nameTab: 'Vigente al 01/01/22'
  }

  Antigua Version Terminos y  Condiciones
   */

];

function TerminosCondicionesSorteo() {
  const CustomTab = forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps['aria-selected'];
    return (
      <Button
        {...tabProps}
        bg={isSelected && '#CBD3DA'}
        textAlign='start'
        borderRadius='none'
        py='8px'
        fontWeight={isSelected ? 700 : 400}
        color={COLORS['blue']}
        display='block'>
        {tabProps.children}
      </Button>
    );
  });

  const getComponent = (
    component,
    date,
    children = 'Términos y condiciones del sorteo por el día de la Madre'
  ) => {
    switch (component) {
      case 'terminosV1':
        return <TermSorteo date={date}>{children}</TermSorteo>;
      case 'terminosV2':
        return <TermV2 date={date}>{children}</TermV2>;
      default:
        return <TermSorteo date={date}>{children}</TermSorteo>;
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Container style={{ marginTop: '30px', background: '#fff', userSelect: 'none', height: '80vh'}}>
      <Heading margin='auto' fontSize='xlg' >
        <Text
          color='#004574'
          fontSize='20px'
          fontWeight={700}
          my='3.5rem'
          textAlign='center'
          >
          TÉRMINOS Y CONDICIONES DE SORTEOS
        </Text>
      </Heading>
      <Tabs orientation='vertical' variant='enclosed-colored'>
        <TabList bg='#F2F2F2' h='30rem' w='30%' py='0.8rem' borderRadius='10px'>
          <Text
            ml='15px'
            mb='7px'
            color='#00ADF6'
            fontSize='18px'
            fontWeight='bold'>
            Versiones
          </Text>
          {termsAndConditions.map(({ nameTab }, ndx) => (
            <CustomTab key={ndx}>{nameTab}</CustomTab>
          ))}
        </TabList>

        <TabPanels>
          {termsAndConditions.map(({ date, component }, ndx) => (
            <TabPanel key={ndx} py={0} pl='1rem'>
              <Box
                p='1.6rem 1.1rem'
                border={`1px solid ${COLORS['blue']}`}
                borderRadius='10px'
                overflow='auto'
                h='55vh'>
                {getComponent(component, date) }
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs> 


      
    </Container>
  );
}

export default TerminosCondicionesSorteo;


