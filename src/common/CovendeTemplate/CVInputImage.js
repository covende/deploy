import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Flex } from '@chakra-ui/react';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/toast';
import { Spinner } from '@chakra-ui/spinner';
import Cropper from 'react-cropper';
import { COLORS } from './CVThemes';
import { uploadFile } from '@/app/api/graphql/upload/uploadservice';
//import { CVButton, CVText } from '.';
import { CVButton, CVText } from '@/common/CovendeTemplate';
import SizeBox from '../components/CustomComponent/SizeBox';
import { CVAlertError } from './CVAlert';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
//import 'cropperjs/dist/cropper.css';
const Filecontainer = styled.label`
  width: 100%;
  /* padding: 0px 0px 0px 10px; */
  /* border-radius: 12px; */
  /* box-shadow: -1px 1px 8px rgba(0, 0, 0, 0.2); */
  /* border: 1px solid #cdcccc; */
  display: flex;
  & input {
    display: none;
  }
  & > div {
    background: white;
    border: 1px solid ${COLORS['primary']};
    font-weight: bold;
    box-sizing: border-box;
    display: flex;
    padding: 5px;
    border-radius: 0 1rem 1rem 0;
    font-size: 1rem;
    width: 150px;
    color: ${COLORS['primary']};
    justify-content: center;
  }
  & > div:hover {
    background: ${COLORS['primary']};
    border: 1px solid #00adf6;
    color: white;
  }
  & p {
    display: flex;
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #ececec;
    border-radius: 1rem 0 0 1rem;
  }
`;

/**
 *
 * @param {Object} param0
 * @param {Function} param0.onClose
 * @param {Boolean} param0.isOpen
 * @param {Object} param0.size
 * @param {String} param0.size.height
 * @param {String} param0.size.width
 * @param {String} param0.size.attr
 * @param {Function} param0.callback
 * @param {Function} param0.onChange
 * @param {(1|2|3|0)} param0.viewMode
 * @returns
 */
export const CVInputImage = ({
  onClose,
  isOpen,
  size,
  callback = () => {},
  onChange = () => {},
  viewMode = 1
}) => {
  const addToast = useToast();
  const filedialog = useRef();
  const [loading, setLoading] = useState(false);
  const defaultSrc = '';
  const [image, setImage] = useState(defaultSrc);
  const [errors, seterrors] = useState(false);
  const [cropper, setCropper] = useState();
  const [filename, setfilename] = useState('');

  const onChangedFile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setfilename(files[0].name || '');
    seterrors(!files[0].type.includes('image'));
  };

  const getCropData = async () => {
    setLoading(true);
    try {
      if (typeof cropper !== 'undefined') {
        let result = await uploadFile({
          file: cropper
            .getCroppedCanvas({ fillColor: '#fff' })
            .toDataURL('image/jpeg', 1),
          type: 'image',
          mimetype: 'image/jpeg'
        });
        if (result.status == 'ok') {
          callback(result.data || '');
          onChange(result.data || '');
          setfilename('');
        } else {
          CVAlertError({ addToast, message: 'Error al subir imagen' });
        }
      }
    } catch (error) {
      console.log('Error al subir image');
      CVAlertError({
        message: 'Error al subir imagen, pruebe con otra',
        addToast
      });
    }
    setImage(defaultSrc);
    setLoading(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen && filedialog.current) {
      filedialog.current.click();
    }
  }, [isOpen, filedialog.current]);

  return (
    <Modal onClose={onClose} size='3xl' isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <SizeBox />
          <Flex width='100%' maxHeight='350px'>
            <Filecontainer>
              <input
                ref={filedialog}
                disabled={loading}
                type='file'
                onChange={onChangedFile}
                accept='image/*'
              />
              <p>{filename}</p>
              <div>ESCOGER</div>
            </Filecontainer>
          </Flex>
          <SizeBox />
          <Flex width='100%' justifyContent='space-between'>
            <Flex width='55%'>
              {filename == '' || errors ? (
                <Box
                  height='300px'
                  width='100%'
                  backgroundColor='gray.400'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'>
                  <CVText fontSize='3rem' fontFamily='Roboto'>
                    {size.width + ' x ' + size.height}
                  </CVText>
                </Box>
              ) : (
                <Cropper
                  style={{ height: 300, width: '100%' }}
                  aspectRatio={size.width / size.height}
                  src={image}
                  viewMode={viewMode}
                  guides={true}
                  minCropBoxHeight={size.height}
                  minCropBoxWidth={size.width}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              )}
            </Flex>
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              width='40%'>
              <CVText
                textAlign='start'
                fontWeight='bold'
                color={errors ? 'red' : 'black'}>
                Dimensión mínima{' '}
                {size.width + 'px: ancho - ' + size.height + 'px: alto'}
              </CVText>
              <CVText
                textAlign='start'
                fontWeight='bold'
                color={errors ? 'red' : 'black'}>
                Tamaño máximo de archivo 1MB
              </CVText>
              <CVText
                textAlign='start'
                fontWeight='bold'
                color={errors ? 'red' : 'black'}>
                En caso de ser mayor, recortaremos la imagen a las medidas
                mostradas
              </CVText>
              <Flex
                justifyContent='center'
                alignItems='center'
                width='center'
                height='100px'
                flexDirection='column'>
                {filename == '' ? (
                  <></>
                ) : (
                  <>
                    {errors ? (
                      <FaTimesCircle
                        style={{
                          color: COLORS['red'],
                          fontSize: '3rem'
                        }}
                      />
                    ) : (
                      <FaCheckCircle
                        style={{
                          color: COLORS['green'],
                          fontSize: '3rem'
                        }}
                      />
                    )}
                    <CVText
                      textAlign='center'
                      color={errors ? 'red' : 'green'}
                      fontWeight='bold'>
                      Imagen {errors ? 'Incorrecta' : 'Correcta'}
                    </CVText>
                  </>
                )}
              </Flex>
              <Flex width='100%'>
                <CVButton color='gray' variant='outlined' onClick={onClose}>
                  Cancelar
                </CVButton>
                <SizeBox />
                <CVButton
                  disabled={loading || errors || filename == ''}
                  backgroundColor={errors ? 'gray' : 'primary'}
                  onClick={getCropData}>
                  {loading ? <Spinner /> : 'Aceptar'}
                </CVButton>
              </Flex>
            </Flex>
          </Flex>
          <SizeBox />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CVInputImage;
