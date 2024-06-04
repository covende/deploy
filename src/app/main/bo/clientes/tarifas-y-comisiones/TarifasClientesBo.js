// Page
import React from 'react';

// Components
// import { Box } from '@chakra-ui/react';
import OrderDetails from '@/app/components/OrderDetails';
import faker from 'faker';

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
// Utils
import Utils from './TarifasClientesBo.utils';
import Comisiones from './components/Comisiones';
// Mock
import {
  mockFeedsCommissions,
  mockFeedsCommissionsDetails
} from './TarifasClientesBo.mock';
import { GiPlayButton } from 'react-icons/gi';

const AccordionTitle = (props) => (
  <AccordionButton paddingLeft='8px'>
    <Box
      flex='1'
      display='flex'
      alignItems='center'
      textAlign='left'
      color='#004574'
      fontFamily='"Poppins"'
      fontSize='16px'
      fontWeight='bold'
      lineHeight='24px'>
      <GiPlayButton />
      &nbsp;
      {props.children}
    </Box>
    <AccordionIcon />
  </AccordionButton>
);

function TarifasClientesBo(props) {
  //console.log('TarifasClientesBo.props', props);
  const selectedCustomer = null;

  const renderRowSubComponent = React.useCallback(
    ({ row }) => <OrderDetails data={mockFeedsCommissionsDetails} />,
    []
  );

  const sectionsComponents = [
    {
      title: 'Tarifas y Comisiones',
      component: <Comisiones />,
      lorem: faker.lorem.paragraph
    }
  ];

  return (
    <>
      <Accordion bg='#FFFFFF' defaultIndex={[0]} allowMultiple>
        {sectionsComponents.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionTitle>{item.title}</AccordionTitle>
            <AccordionPanel p='16px 28px'>{item.component}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
    // <Box>
    //   {/* <Table
    //     nameListCRUD='Tarifas y comisiones'
    //     inputData={Utils.inputDataProcessed(mockFeedsCommissions(5), {
    //       delete: (item) => console.log('item.to.delete', item)
    //     })}
    //     inputColumns={Utils.columnsData}
    //     renderRowSubComponent={renderRowSubComponent}
    //   /> */}
    //   {/*<TableCustom columns={Utils.columns} data={Utils.data} />*/}
    // </Box>
  );
}

export default TarifasClientesBo;
