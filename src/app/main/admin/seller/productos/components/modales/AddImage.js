import { Text, Box, Flex } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import { HStack } from '@chakra-ui/react';
import { iconphotoservice } from '../../ProductoIcons';
import {
  CVButton,
  CVInputImageGallery,
  CVText
} from '@/common/CovendeTemplate';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function AddImage({ isOpen, onClose }) {
  const [size, setSize] = useState({ height: 240, width: 240, attr: 'image' });
  const { description } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();

  const updateImgs = (imgs) => {
    dispatch(
      A_PRODUCTVIEW({
        description: { ...description, fotografias: imgs }
      })
    );
  };

  const initdata = () => {
    let [width, height, attr] = IMAGESIZE['GALLERYPRODUCT'].split(',');
    setSize({ height, width, attr });
  };
  useEffect(() => {
    initdata();
  }, []);

  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxWidth='800px'>
        <ModalCloseButton style={{ color: '#000000' }} />
        <ModalBody maxWidth='800px'>
          <Text fontSize='2rem' fontWeight='bold'>
            Sube Tus Fotos
          </Text>
          <Text>
            Las imágenes deben tener fondo neutro. Resolución mínima 700 x 700
            píxeles. Tamaño máximo de archivo 1MB. Te recomendamos subir una
            foto frontal, de vista trasera, lateral derecho, lateral izquierdo y
            una o dos fotos donde se vean los detalles resaltantes de tu
            producto. click en la imagen a reemplazar
          </Text>
          <br />
          <CVInputImageGallery
            gallery={description.fotografias}
            setgallery={(imgs) => updateImgs(imgs)}
            size={size}
            limit={6}
            readOnly={false}
            isProduct={true}
            actions={true}>
            <Box style={{ maxWidth: '370px', maxHeight: 'auto' }}>
              <Flex padding='1rem' margin='1rem' alignItems='center'>
                <Box>{iconphotoservice}</Box>
                <SizeBox />
                <span>
                  <CVText color='primary'>
                    Solicita el Servicio de Fotografia
                  </CVText>
                  <CVText fontSize='0.85rem'>
                    Te ayudamos a obtener fotos de tus productos de una manera
                    profesional y al agrado de tus compradores
                  </CVText>
                  <CVText fontSize='0.85rem'>
                    <Flex>
                      Escríbenos a <SizeBox width='0.25rem' />
                      <a href='mailto:comercial@covende.com'>
                        comercial@covende.com
                      </a>
                    </Flex>
                  </CVText>
                </span>
              </Flex>
            </Box>
          </CVInputImageGallery>
        </ModalBody>
        <ModalFooter>
          <CVButton onClick={onClose}>Aceptar</CVButton>
          {/*<Button
            borderRadius='20px'
            marginLeft='10px'
            variant='solid'
            colorScheme='facebook'
            onClick={() => setCrop(!crop)}>
            Subir
          </Button>*/}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddImage;
