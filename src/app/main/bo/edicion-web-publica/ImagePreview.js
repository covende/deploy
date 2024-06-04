import React, { useEffect, useState } from 'react';
import { useDisclosure, Button, Text, Box, Flex } from '@chakra-ui/react';
import { CVButton, CVImage, CVInputImage } from '@/common/CovendeTemplate';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';

function ImagePreview({ state, setState, sizeimage }) {
  const [size, setsize] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    let [width, height, attr] = IMAGESIZE[sizeimage].split(',');
    setsize({ height, width, attr });
  }, [sizeimage]);

  const callback = (img) => {
    setState({
      ...state,
      image: img
    });
    if (img != '') {
      onClose();
    }
  };

  return (
    <Box>
      <Text>Imagen:</Text>
      <CVInputImage
        isOpen={isOpen}
        onClose={onClose}
        callback={(e) => callback(e)}
        size={size}
      />
      <Box position='relative'>
        <Box position='absolute'>
          <CVButton onClick={() => onOpen()}>Subir/Añadir imagen</CVButton>
        </Box>
        <Flex justifyContent='center'>
          <CVImage
            image={
              state.image != ''
                ? state.image
                : 'https://via.placeholder.com/' +
                  size.width +
                  'x' +
                  size.height
            }
            height='200px'
            width='auto'
          />
        </Flex>
      </Box>
    </Box>
  );
}

export default ImagePreview;
