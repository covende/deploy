import React from 'react';

// Components
import {
  useDisclosure,
  AvatarBadge,
  Button,
  Heading,
  Lorem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box
} from '@chakra-ui/react';
import Table from './components/Table';

// Utils
import Utils from './CarteraClientesBo.utils';

// Mock
import {
  mockClientPortfolios,
  mockClientPortfoliosStats
} from './CarteraClientesBo.mock';
import { CVText, CVTotales } from '@/common/CovendeTemplate';

function CarteraClientesBo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      {/* <Heading
        marginBottom='16px'
        color='covende.default.main'
        fontSize='20px'
        fontWeight='700'
        lineHeight='28px'>
        CARTERA DE CLIENTES
      </Heading> */}

      {/* <CVTotales
        lista={mockClientPortfoliosStats.map((item) => ({
          color: item.bgColor,
          text: (
            <Flex justifyContent='space-between' width='100%'>
              <CVText fontWeight='bold' fontSize='2rem' color='white'>
                {item.quantity}
              </CVText>{' '}
              {item.type}
            </Flex>
          )
        }))}
      /> */}

      {/* <Table
        nameListCRUD=''
        inputData={Utils.inputDataProcessed(mockClientPortfolios(10))}
        inputColumns={Utils.columnsData}
      /> */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {/* <Heading
              width='80px'
              color='#4D4D4D'
              fontWeight='500'
              textOverflow='initial'
              whiteSpace='normal'>
              N° caso: DC384934749
            </Heading>
            <Button bg='covende.default.main'>Abierto</Button> */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Avatar>
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar> */}
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CarteraClientesBo;
