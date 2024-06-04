import React, { useState } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Spinner,
  Grid,
  Box,
  Input,
  Textarea,
  Button
} from '@chakra-ui/react'
import { Label } from '@/common/components'
import { useSelector } from 'react-redux'

const ModalNewVideo = ({isOpen, onClose}) => {
  const [loading, setLoading] = useState(false)
  const { Faqs, faq } = useSelector((state) => state.Faq);
  const [textButton, setTextButton] = useState(()=>faq._id != ''?'Crear':'Actualizar')
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderTopRadius={10}
          style={{
            backgroundColor: '#00ADF6',
            color: '#ffffff',
            fontWeight: '700'
        }}
        >
          <Center ><span style={{fontWeight: '400', marginRight: '5px'}}>Subir</span>Video</Center>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody padding='21px 57px'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
            <br />
            <Grid templateColumns='repeat(2, 1fr)' gap='8px'>
              <Box display='flex' alignSelf='center' >
                <Label alignSelf='center' width='68px'>Nombre de Categoría:</Label>
                <Input
                  marginLeft='18px'
                  type='text'
                  maxW='196px'
                  name='category'
                  value=''
                  onChange={() => {}}
                  alignSelf='center'
                  required={true}
                />
              </Box>

              <Box display='flex' width='100%' alignSelf='center'  >
                <Label alignSelf='center'  >Posición:</Label>
                <Input
                  min={0}
                  name='position'
                  maxW='179px'
                  value={''}
                  onChange={() => {}}
                  required={true}
                  marginLeft='10px'
                />
              </Box>

              <Box
                width='100%'
                gridColumnStart='1'
                gridColumnEnd='3'
                display='flex'
                alignSelf='center'
              >
                <Label alignSelf='center'>Descripción:</Label>
                <Textarea
                  type='text'
                  name='description'
                  marginLeft='10px'
                  value=''
                  onChange={() => {}}
                  required={true}
                  borderRadius='12px'
                />
              </Box>

            </Grid>
            <br />
            <Center>
              <Button
                variant='bo-primary'
                type='submit'
                margin='auto'
                width='176px'
                height='27px'
                bg='#00adf6'
                color='#ffffff'
                borderRadius='14px'
                disabled={loading}
              >
                {loading && !error ? <Spinner /> : textButton}
              </Button>
            </Center>
            <br />
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalNewVideo