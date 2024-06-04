import React, { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button
} from '@chakra-ui/react';

const GuiaComprador = ({ data }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1rem',
            padding: '2rem'
          }}>
          <Text
            style={{
              fontFamily: ' Poppins',
              fontStyle: ' normal'
            }}
            fontSize='30px'
            color='#FF5454'
            fontWeight='bold'
            textAlign={['center']}>
            GUÍA DEL COMPRADOR
          </Text>
          <Accordion bg='#FFF' defaultIndex={[0]} allowToggle mt={5}>
            {data.map((item, i) => {
              return (
                <AccordionItem key={i} mb={5}>
                  <Box border='solid 2px #004772' borderRadius='20px'>
                    <h2>
                      <AccordionButton>
                        <Box
                          flex='1'
                          textAlign='left'
                          color='#004772'
                          borderRadius='full'>
                          <Text fontSize='2xl'> {item.faq_question}</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={5} mt={5}>
                      <p>{item.answer}</p>
                    </AccordionPanel>
                  </Box>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Box>
      </Grid>
    </>
  );
};

export default GuiaComprador;
