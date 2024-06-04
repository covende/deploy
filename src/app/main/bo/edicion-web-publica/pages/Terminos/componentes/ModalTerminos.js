import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { Box, Center } from '@/../node_modules/@material-ui/core/index';
import CVTextArea from '@CVTemplate/core/CVTextArea';

 function ModalTerminos({state, setState, onSubmit }){
    return (
        <Box>

            <SizeBox/>
            <CVInput
            title ='Titulo'
            titleOrientation='column'
            titleContent='start'
            onChage={(value)=> setState({...state,title:value})}
            value={state.title || ''}
            placeholder= 'ingrese titulo '
            />
         <SizeBox/>

         <CVInput
         titleContent='start'
         titleOrientation='column'
         title='descripcion'
         onChage={(value)=> setState({...state,descripcition:value})}
         value={state.descripcition || ''}
         multiline={true}
         />
     <SizeBox />
     <CVTextArea
                content={contents.contents}
                setContent={(value) =>
                  setState({
                    ...description,
                    contents: value
                  })
                }
              />
     <Center>
     <CVButton onClick={() => onSubmit()}>Guardar</CVButton>
     </Center>
        </Box>
    );
 }

 export default ModalTerminos;