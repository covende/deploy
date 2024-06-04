import { table_category_save } from '@/app/api/graphql/webbo/BTablasService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput, CVSwitch, CVText } from '@/common/CovendeTemplate';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVModal from '@/common/CovendeTemplate/CVModal';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { Flex } from '@chakra-ui/layout';

const initialState = {
  title: '',
  slug: '',
  imagesize: '100x100',
  limit: '0'
};
function MAddCategory({ isOpen, onClose, categorys, setcategorys }) {
  const [state, setstate] = useState(initialState);
  const [loading, setloading] = useState(false);
  const addToast = useToast();
  const [moredata, setmoredata] = useState(false);

  const savedata = async () => {
    setloading(true);
    const cts = await table_category_save(state);
    setcategorys([...categorys, cts]);
    setloading(false);
    CVAlertSuccess({ addToast, message: 'Tabla Agregado' });
    onClose();
  };
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <CVText
          fontWeight='bold'
          fontSize='1.5rem'
          textAlign='center'
          color='blue'>
          Agregar una Tabla de Datos
        </CVText>
      }
      footer={
        <CVButton
          disabled={loading}
          isLoading={loading}
          onClick={() => savedata()}>
          Guardar
        </CVButton>
      }>
      <SizeBox />
      <CVInput
        title='Titulo'
        titleOrientation='column'
        onChange={(value) => setstate({ ...state, title: value })}
        value={state.title}
      />
      <SizeBox />
      <CVInput
        title='Slug'
        titleOrientation='column'
        onChange={(value) => setstate({ ...state, slug: value })}
        value={state.slug}
      />
      <SizeBox />
      <Flex alignItems='center'>
        <CVText color='blue'> Ver mas Opciones</CVText> <SizeBox />
        <CVSwitch onChange={(value) => setmoredata(value)} value={moredata} />
      </Flex>
      <SizeBox />
      {moredata ? (
        <>
          <CVInput
            placeholder='Ancho x Alto'
            title='Tamaño de imágenes W x H'
            titleOrientation='column'
            onChange={(value) => setstate({ ...state, imagesize: value })}
            value={state.imagesize}
          />
          <SizeBox />
          <CVInput
            title='limit'
            titleOrientation='column'
            onChange={(value) => setstate({ ...state, limit: value })}
            value={state.limit}
          />
        </>
      ) : (
        <></>
      )}
    </CVModal>
  );
}

export default MAddCategory;
