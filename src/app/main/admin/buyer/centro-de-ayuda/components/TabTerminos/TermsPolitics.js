import React from 'react';
import icons from '../../../../buyer/centro-de-ayuda/assets/icons';
import { Grid } from '@chakra-ui/react';
import {
  Box,
  Text,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import { CVInput } from '@/common/CovendeTemplate';
const TermsPolitics = ({ type }) => {
  return (
    <>
      <Box
        bg={type === 'buyer' ? '#FF5454' : '#00ADF6'}
        borderRadius='8'
        mt='17px'
        display='flex'
        h='126px'
        justifyContent='space-around'
        alignItems='center'
        w='100%'
        p='0'>
        <Box mt={10}>{icons.LeftFaqiconBuyer}</Box>

        <Grid xs={12} sm={12} md={6}>
          <Box mt={20} mr={8} bg='#FFF' borderRadius='17px'>
            <CVInput
              placeholder='Escribe lo que estás buscando'
              iconFind={true}
              width='559px'
              onChange={(e) => fetchSearch(e)}
              textFind='BUSCAR'
              buttonColor='shadowRed'
              value=''
            />
          </Box>
        </Grid>
      </Box>
      <Box color='#FF5454' fontWeight='bold' mt='46px'>
        <Text fontSize='4xl' fontWeight='extrabold'>
          Términos y Políticas
        </Text>
      </Box>
      <Box flex='1' textAlign='left' borderRadius='full'>
        {/* <Text color='#004772' fontSize='2xl'>
          pasos para realisar una compra 
        </Text> */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra enim
          tempor tincidunt enim vel gravida dolor vel massa. Integer in lorem
          quis a quis. Congue volutpat convallis aliquam lectus leo id ultrices
          eu. Pretium tristique nulla quis ultricies viverra elementum, urna.
          Maecenas id at ullamcorper sed aliquet sed. At non mattis sit arcu
          cursus facilisis. Lacus, vitae lacus vel neque arcu cras consectetur
          aliquam, purus. Pretium quis sit turpis fringilla eget enim nulla
          volutpat ullamcorper. Laoreet pulvinar arcu est odio tincidunt. Vitae,
          nulla ultricies eu aliquam, integer vel nulla lectus massa. Eleifend
          ut dolor nunc tellus et massa ornare phasellus. Ut sed elit
          scelerisque pellentesque tempor dui duis ut est. Egestas consectetur
          velit aliquam phasellus varius volutpat in. Laoreet sagittis
          suspendisse tincidunt nunc, massa malesuada suscipit consectetur.
          Ultricies quam sit et egestas volutpat ante fermentum fermentum eu.
          Cursus vitae ac molestie pulvinar massa. Vitae, justo in suspendisse a
          tempus. Neque, suspendisse faucibus eget a ipsum sit tempor. Aliquam
          et consequat elementum porta sed. At convallis dignissim urna
          hendrerit malesuada ac purus imperdiet. Pellentesque volutpat
          elementum vitae accumsan elit cras id. Etiam et tortor semper facilisi
          dolor massa nam. Duis magna vivamus at auctor bibendum vel posuere.
          Nisl, faucibus purus neque fusce volutpat. Enim nibh in nisl, a.
          Semper nisi consequat sit molestie. Aliquet nec ante nulla et integer
          nec.
        </p>
        <p></p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra enim
          tempor tincidunt enim vel gravida dolor vel massa. Integer in lorem
          quis a quis. Congue volutpat convallis aliquam lectus leo id ultrices
          eu. Pretium tristique nulla quis ultricies viverra elementum, urna.
          Maecenas id at ullamcorper sed aliquet sed. At non mattis sit arcu
          cursus facilisis. Lacus, vitae lacus vel neque arcu cras consectetur
          aliquam, purus. Pretium quis sit turpis fringilla eget enim nulla
          volutpat ullamcorper. Laoreet pulvinar arcu est odio tincidunt. Vitae,
          nulla ultricies eu aliquam, integer vel nulla lectus massa. Eleifend
          ut dolor nunc tellus et massa ornare phasellus. Ut sed elit
          scelerisque pellentesque tempor dui duis ut est. Egestas consectetur
          velit aliquam phasellus varius volutpat in. Laoreet sagittis
          suspendisse tincidunt nunc, massa malesuada suscipit consectetur.
          Ultricies quam sit et egestas volutpat ante fermentum fermentum eu.
          Cursus vitae ac molestie pulvinar massa. Vitae, justo in suspendisse a
          tempus. Neque, suspendisse faucibus eget a ipsum sit tempor. Aliquam
          et consequat elementum porta sed. At convallis dignissim urna
          hendrerit malesuada ac purus imperdiet. Pellentesque volutpat
          elementum vitae accumsan elit cras id. Etiam et tortor semper facilisi
          dolor massa nam. Duis magna vivamus at auctor bibendum vel posuere.
          Nisl, faucibus purus neque fusce volutpat. Enim nibh in nisl, a.
          Semper nisi consequat sit molestie. Aliquet nec ante nulla et integer
          nec.
        </p>
      </Box>
    </>
  );
};

export default TermsPolitics;
