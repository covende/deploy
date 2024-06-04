import { table_edit, table_save } from '@/app/api/graphql/webbo/BTablasService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVCheck,
  CVImage,
  CVInput,
  CVInputImage,
  CVSwitch,
  CVText
} from '@/common/CovendeTemplate';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import CVModal from '@/common/CovendeTemplate/CVModal';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import CVRadio from '@CVTemplate/core/CVRadio';
import CVInputFile from '@CVTemplate/core/CVInputFile';
import { Typography } from '@material-ui/core';
import CVLink from '@CVTemplate/core/CVLink';
import RemisionGuide from '@/app/components/OrderDetails/components/RemisionGuide/RemisionGuide';
import { COLORS } from '@CVTemplate/core/CVThemes';

const initialState = {
  code: '-',
  title: '',
  description: '-',
  status: true,
  idtablecategory: '',
  imagelink: '#!',
  image: '',
  typeFile: ''
};
function MAddTabla({
  isOpen,
  onClose,
  idtabla,
  setidtabla,
  idtablecategory,
  previusData,
  lista,
  setlista,
  fetchdata,
  categorys,
  cat
}) {
  const [size, setsize] = useState({});
  const [crop, setcrop] = useState(false);
  const [moredata, setmoredata] = useState(false);
  const [state, setstate] = useState(initialState);
  const [loading, setloading] = useState(false);
  const [typeFile, setTypeFile] = useState('IMAGE');
  const addToast = useToast();
  const savedata = async () => {
    if (CVErrorTags()) {
      CVAlertError({ addToast, message: 'Campos con Error' });
      return false;
    }
    setloading(true);
    let data = {
      ...state,
      idtablecategory,
      _id: idtabla,
      typeFile: state.image != '' ? typeFile : ''
    };

    if (idtabla == '') {
      await table_save(data);
    } else {
      await table_edit({ _id: idtabla, table: data });
    }
    await fetchdata();
    setidtabla('');
    setstate(initialState);
    setloading(false);
    onClose();
  };

  useEffect(() => {
    if (previusData) setstate({ ...previusData });
    else setstate({ ...initialState });

    const [width, height] = (cat?.imagesize || '100x100').split('x');
    setsize({ width, height, attr: 'image' });
  }, [previusData, cat]);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={() => {
        setstate({ ...initialState });
        setidtabla('');
        onClose();
      }}
      header={
        <CVText
          fontWeight='bold'
          fontSize='1.5rem'
          textAlign='center'
          color='blue'>
          Agregar a la Tabla de Datos
        </CVText>
      }
      footer={
        <CVButton
          onClick={() => savedata()}
          isLoading={loading}
          disabled={loading}>
          {idtabla ? 'Actualizar' : 'Guardar'}
        </CVButton>
      }>
      <SizeBox />
      <CVInput
        disabled={idtablecategory == '61a6fc4f42aee843fcd94e7a'}
        title='Código'
        titleOrientation='column'
        onChange={(value) => setstate({ ...state, code: value + '' })}
        value={state.code}
      />
      <SizeBox />
      <CVInput
        error={state.title == ''}
        title='Titulo'
        titleOrientation='column'
        onChange={(value) => setstate({ ...state, title: value })}
        value={state.title}
      />
      <SizeBox />
      <Flex alignItems='center'>
        <CVText color='blue'> Ver mas Opciones</CVText> <SizeBox />
        <CVSwitch
          onChange={(value) => {
            if (state.typeFile != '') setTypeFile(state.typeFile);
            setmoredata(value);
          }}
          value={moredata}
        />
      </Flex>
      <SizeBox />
      {moredata ? (
        <>
          <CVRadio
            value={typeFile}
            onChange={(value) => {
              setTypeFile(value);
              setstate({ ...state, image: '' });
            }}
            options={[
              { value: 'IMAGE', text: 'Imagen' },
              { value: 'DOCUMENT', text: 'Documento' }
            ]}
          />

          <SizeBox />
          {typeFile == 'IMAGE' ? (
            <>
              <CVInput
                title='Descripción'
                titleOrientation='column'
                onChange={(value) => setstate({ ...state, description: value })}
                value={state.description}
              />
              <SizeBox />
              <CVInput
                title='Enlace al hacer click en la Imagen'
                titleOrientation='column'
                onChange={(value) => setstate({ ...state, imagelink: value })}
                value={state.imagelink}
              />
              <SizeBox />
              <Box position='relative'>
                <CVImage height='150px' width='auto' image={state.image} />
                <Box position='absolute' top='0'>
                  <CVButton onClick={() => setcrop(true)}>
                    <FaUpload />
                  </CVButton>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box position='relative'>
                <CVInputFile
                  // validateName={true}
                  // name={state.code ? state.code + '.pdf' : ''}
                  callback={(res) => setstate({ ...state, image: res.data })}>
                  Elegir archivo
                </CVInputFile>
                <Typography variant='caption'>PDF {'<'} 10 mb </Typography>
              </Box>
              {state.image !== '' && (
                <>
                  <SizeBox />
                  <Flex width='100%' justifyContent='center'>
                    <Box>
                      <CVLink href={state.image} target='_blank' color='blue'>
                        <Flex>
                          <RemisionGuide />
                          <Heading ml='5px' color={COLORS['black']}>
                            archivo
                          </Heading>
                        </Flex>
                      </CVLink>
                    </Box>
                  </Flex>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}

      <SizeBox />

      <CVCheck
        title='Activo'
        titleAlign='left'
        value={state.status}
        onChange={(value) => setstate({ ...state, status: value })}
      />
      {crop && (
        <CVInputImage
          isOpen={crop}
          onClose={() => setcrop(false)}
          size={size}
          value={state.image}
          onChange={(image) => {
            setstate({ ...state, image: image });
            setcrop(false);
          }}
        />
      )}
    </CVModal>
  );
}

export default MAddTabla;
