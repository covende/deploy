import React from 'react';
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
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';

const QuestionAcordeon = ({ data }) => {
  return (
    <>
      <Accordion bg='#FFF' defaultIndex={[0]} width='60rem' allowToggle>
        {data.map((item, i) => {
          return (
            <AccordionItem style={{ borderTopWidth: 0 }} key={i} mb={5}>
              <Box border='solid 2px #004772' borderRadius='20px'>
                <h2>
                  <AccordionButton style={{ boxShadow: 'none' }}>
                    <Box flex='1' textAlign='left' color='#004772'>
                      <Text fontSize='2xl'> {item.faq_question}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={5} mt={5}>
                  <CVRenderHTML>{item.answer}</CVRenderHTML>
                </AccordionPanel>
              </Box>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default QuestionAcordeon;
