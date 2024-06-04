import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import ImagePreview from '../../../ImagePreview';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { Box, Center } from '@chakra-ui/layout';

function ModalForm({ state, setState, onSubmit, sizeimage }) {
  return (
    <Box>
      <ImagePreview sizeimage={sizeimage} state={state} setState={setState} />
      <SizeBox />
      <CVInput
        title='Título'
        titleOrientation='column'
        titleContent='start'
        onChange={(value) => setState({ ...state, title: value })}
        value={state.title || ''}
        placeholder='Ingrese titulo'
      />
      <SizeBox />
      <CVInput
        title='Link'
        titleOrientation='column'
        titleContent='start'
        onChange={(value) => setState({ ...state, link: value })}
        value={state.link || ''}
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
