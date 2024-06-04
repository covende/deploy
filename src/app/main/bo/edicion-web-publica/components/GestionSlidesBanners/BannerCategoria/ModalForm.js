import React, { useState, useEffect } from 'react';

import { Box, Center } from '@chakra-ui/layout';

import ImagePreview from '../../../ImagePreview';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';

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
        titleContent='start'
        titleOrientation='column'
        title={'Categoría: '}
        value={state.category_product_id || ''}
        onChange={(value) => setState({ ...state, category_product_id: value })}
      />
      <SizeBox />

      <CVInput
        titleContent='start'
        titleOrientation='column'
        title='Descripción'
        onChange={(value) => setState({ ...state, description: value })}
        value={state.description || ''}
        multiline={true}
      />
      <SizeBox />

      <Center>
        <CVButton onClick={() => onSubmit()}>Guardar</CVButton>
      </Center>
    </Box>
  );
}

export default ModalForm;
