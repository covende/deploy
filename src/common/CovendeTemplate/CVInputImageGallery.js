import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { v4 } from 'uuid';
import { CVButton, CVImage, CVInputImage, CVText } from '.';
import noimage from '@/app/assets/img/photo.png';

/**
 *
 * @param {Object} param0
 * @param {Boolean} param0.readOnly
 * @param {[String]} param0.gallery
 * @param {Function} param0.setgallery
 * @param {Boolean} param0.actions
 * @param {Object} param0.size
 * @param {String} param0.size.height
 * @param {String} param0.size.width
 * @param {String} param0.size.attr
 * @param {Number} param0.limit
 * @param {String} param0.imageWidth
 * @param {String} param0.imageHeight
 * @param {Function} param0.onClick
 * @param {('space-between'|'start'|'end')} param0.justifyContent
 * @param {Boolean} param0.mainText
 * @param {Boolean} param0.pointer
 * @returns
 */
function CVInputImageGallery({
  readOnly = false,
  gallery = [],
  setgallery = () => {},
  actions = false,
  size,
  limit = 1,
  children,
  imageWidth = '150px',
  imageHeight = '150px',
  onClick = null,
  justifyContent = 'space-between',
  disabled = false,
  isProduct = false,
  mainText = true,
  pointer = true
}) {
  const btnstyles = {
    padding: '0px',
    height: '20px',
    width: '30px',
    minWidth: '30px',
    fontSize: '0.75rem',
    marginRight: '1px'
  };
  const [crop, setCrop] = useState(false);
  const [index, setIndex] = useState('');

  const setimage = (img) => {
    if (index) {
      gallery[index] = img;
      setgallery([...gallery]);
    } else {
      setgallery([...gallery, img]);
    }

    setCrop(!crop);
  };

  const removeImg = (index) => {
    let imgs = [...gallery];
    imgs = imgs.filter((da, pos) => pos != index);
    setgallery(imgs);
  };

  const principalImg = (index) => {
    let imgs = [...gallery];
    let img = gallery[index];
    imgs = imgs.filter((da, pos) => pos != index);
    imgs = [img, ...imgs];
    setgallery(imgs);
  };
  return (
    <Box>
      <Flex justifyContent={justifyContent} flexWrap='wrap'>
        {gallery.map((it, index) => (
          <Box key={v4()} margin='1rem'>
            {actions && (
              <Box position='absolute' zIndex={1}>
                <Button
                  onClick={() => removeImg(index)}
                  title='Eliminar imagen'
                  style={{
                    ...btnstyles
                  }}>
                  <FaTrashAlt />
                </Button>
                <Button
                  onClick={() => principalImg(index)}
                  title={index == 0 ? 'Imagen Principal' : 'Hacer Principal'}
                  style={{
                    color: index == 0 ? '#00ADF6' : '#E0E0E0',
                    ...btnstyles
                  }}>
                  <FaStar />
                </Button>
              </Box>
            )}

            {readOnly ? (
              <CVImage
                cursor='default'
                width={imageWidth}
                height={imageHeight}
                image={it}
              />
            ) : (
              <CVButton
                backgroundColor='white'
                width={imageWidth}
                height={imageHeight}
                padding='0'
                borderRadius='0'
                onClick={() => {
                  setIndex(index);
                  readOnly ? {} : onClick ? onClick() : setCrop(!crop);
                }}>
                <CVImage width={imageWidth} height={imageHeight} image={it} />
              </CVButton>
            )}

            {mainText && (
              <CVText>{index == 0 ? 'Imagen Principal' : ''}</CVText>
            )}
          </Box>
        ))}

        {gallery.length < limit
          ? Array.from({ length: limit - gallery.length }, (v, i) => i).map(
              () => (
                <Box key={v4()} margin='1rem'>
                  {disabled && (
                    <Box
                      w='12.5rem'
                      h='12.66rem'
                      bg='black'
                      position='absolute'
                      borderRadius='3px'
                      opacity={0.2}
                      zIndex={4}
                    />
                  )}
                  <CVButton
                    onClick={() => {
                      setIndex('');
                      readOnly ? {} : onClick ? onClick() : setCrop(!crop);
                    }}
                    backgroundColor='white'
                    width={imageWidth}
                    height={imageHeight}
                    padding='0'
                    borderRadius='0'>
                    <CVImage
                      width={imageWidth}
                      height={imageHeight}
                      image={noimage}
                    />
                  </CVButton>
                  <CVText></CVText>
                </Box>
              )
            )
          : ''}
        {children}
      </Flex>
      {crop && (
        <CVInputImage
          size={size}
          isOpen={crop}
          onClose={() => setCrop(!crop)}
          callback={setimage}
          isProduct={isProduct}
        />
      )}
    </Box>
  );
}

export default CVInputImageGallery;
