import React from 'react';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import ImagePreview from '../../../ImagePreview';
import { Box, Center } from '@chakra-ui/layout';
import { CVButton, CVInput } from '@/common/CovendeTemplate';

function ModalForm({ state, setState, onSubmit, sizeimage }) {
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
