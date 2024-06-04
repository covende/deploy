import React from 'react';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';
import ImagePreview from '../../ImagePreview';
import { Box, Center } from '@chakra-ui/layout';

function ModalForm({ state, setState, onSubmit, dataDependency, sizeimage }) {
  return (
    <Box>
      <ImagePreview sizeimage={sizeimage} state={state} setState={setState} />
      <SizeBox />
      <CVSelect
        options={[
          { text: '-- Ninguna --', value: '' },
          ...dataDependency.map((category) => ({
            text: category.name,
            value: category._id
          }))
        ]}
        title={'Categoría: '}
        titleContent='start'
        titleOrientation='column'
        value={state.category_product_id || ''}
        onChange={(value) => setState({ ...state, category_product_id: value })}
      />

      <SizeBox />

      <CVInput
        titleContent='start'
        titleOrientation='column'
        title='Título'
        onChange={(value) => setState({ ...state, title: value })}
        value={state.title || ''}
        placeholder='Ingrese titulo de Oferta'
      />

      <SizeBox />

      <CVInput
        titleContent='start'
        titleOrientation='column'
        title='Descripción'
        onChange={(value) => setState({ ...state, description: value })}
        value={state.description || ''}
        multiline={true}
        height='100%'
      />

      <SizeBox />
      <Center>
        <CVButton onClick={() => onSubmit()}>Guardar</CVButton>
      </Center>
    </Box>
  );
}

export default ModalForm;
