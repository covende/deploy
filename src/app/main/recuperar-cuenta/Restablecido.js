import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { CVPanel, CVButton, CVText } from '@CVTemplate/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaCheckCircle } from 'react-icons/fa';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { useHistory } from 'react-router-dom';

function Restablecido() {
  const history = useHistory();
  return (
    <Flex justifyContent='center' minHeight='80vh' alignItems='center'>
      <CVPanel
        variant='box'
        style={{ maxWidth: '350px', height: 'auto', padding: '0px' }}>
        <Box maxWidth='350px' borderRadius='1rem' width='100%'>
          <Box
            backgroundColor={COLORS['blue']}
            borderRadius='1rem 1rem 0 0'
            padding='1rem'
            width='100%'>
            <CVText
              textAlign='center'
              fontSize='1.5rem'
              fontWeight='bold'
              color='white'>
              Restablecer Contraseña
            </CVText>
          </Box>
          <Flex
            flexDirection='column'
            alignItems='center'
            padding='1rem'
            width='100%'>
            <SizeBox />

            <FaCheckCircle
              style={{ fontSize: '2rem', color: COLORS['green'] }}
            />

            <SizeBox />

            <CVText color='blue' alignItems='center'>
              Tu contraseña ha sido restablecida con éxito. Sigue disfrutando de
              comprar online con Covende.
            </CVText>
            <SizeBox />

            <SizeBox />

            <Box>
              <CVButton
                backgroundColor='green'
                onClick={() => {
                  let previous_link = localStorage.getItem('previous_link');
                  if (previous_link) history.push(previous_link);
                  else history.push('/iniciar-sesion');
                }}>
                Regresar
              </CVButton>
            </Box>
            <SizeBox />
          </Flex>
        </Box>
      </CVPanel>
    </Flex>
  );
}

export default Restablecido;
