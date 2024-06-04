import React, { useState, useEffect } from 'react';
import { Box, Text, Center } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { InvertedTriangle } from '../assets/svg';
import { FAQ_QUESTIONS_BY_ID } from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import { iconsFaq } from '@CVPages/core/bo/faq/components/assets/WarnIcon';
const QuestionsAnswer = ({
  title,
  answer,
  cod,
  setFaqdata,
  setShow,
  setHide,
  fondo,
  icon,
  type
}) => {
  const setCategoryFaq = async (codigo) => {
    const { faqQuestionsByFaqId } = await AxiosGQL(FAQ_QUESTIONS_BY_ID(codigo));
    setFaqdata(faqQuestionsByFaqId);
    setShow(true);
    setHide(false);
  };
  const [iconRender, setIconRender] = useState();
  useEffect(() => {
    if (icon != null) {
      let iconSVG = iconsFaq.find(({ code }) => code == icon);
      setIconRender(iconSVG?.svg(type));
    } else {
      setIconRender(iconsFaq[0].svg(type));
    }
  }, [icon]);

  return (
    <Box width={{base:'auto',md:'25%'}} mx={5}>
      <Box mt='15px' mb='10px'>
        <Center>{iconRender}</Center>
      </Box>
      <Box bg={fondo} px={9} py={2} borderRadius='10px'>
        <Text
          fontSize='15px'
          color='#fff'
          textAlign='center'
          fontWeight='bold'
          textTransform='uppercase'
          cursor='pointer'
          onClick={() => setCategoryFaq(cod)}>
          {title}
        </Text>
      </Box>
      <Box w='100%' display='flex' justifyContent='center' marginTop='-7px'>
        <InvertedTriangle color={type === 'buyer' ? '#FF5454' : '#00ADF6'} />
      </Box>
      <Box>
        {answer.map((item, i) => {
          return (
            <Box key={i}>
              <Text
                fontWeight='normal'
                cursor='pointer'
                onClick={() => setCategoryFaq(cod)}
                fontSize='16px'
                color='#4D4D4D'
                mb='10px'
                mt={2}>
                {item.faq_question}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuestionsAnswer;
