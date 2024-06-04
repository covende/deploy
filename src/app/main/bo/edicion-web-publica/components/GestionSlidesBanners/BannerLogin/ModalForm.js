import React, { useState, useEffect } from 'react';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import ImagePreview from '../../../ImagePreview';
import { Box } from '@chakra-ui/layout';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { Center } from '@chakra-ui/react';

function ModalForm({ state, setState, sizeimage, onSubmit }) {
  return (
    <Box>
      <ImagePreview sizeimage={sizeimage} state={state} setState={setState} />
      <SizeBox />
      <CVInput
        titleContent='start'
        titleOrientation='column'
        title='Título'
        onChange={(value) => setState({ ...state, title: value })}
        value={state.title || ''}
        placeholder='Ingrese titulo'
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
