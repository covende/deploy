import React, { useState, useEffect } from 'react';
import { Box, Text, Center } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { FAQ_QUESTIONS_BY_ID } from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import { InvertedTriangle } from '../../assets/icons';
import { iconsFaq } from '@CVPages/core/bo/faq/components/assets/WarnIcon';
//import GuiaComprador from '../../componetes/GuiaCompradors';
const QuestionsAnswer = ({
  title,
  answer,
  cod,
  setFaqdata,
  icon,
  type = 'buyer'
}) => {
  const setCategoryFaq = async (codigo) => {
    const { faqQuestionsByFaqId } = await AxiosGQL(FAQ_QUESTIONS_BY_ID(codigo));
    setFaqdata(faqQuestionsByFaqId);
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
    <Box width='25%' mx={5}>
      <Box mt='15px' mb='10px'>
        <Center>{iconRender}</Center>
      </Box>
      <Box bg='#FF5454' px={9} py={2} borderRadius='10px' cursor='pointer'>
        <Text
          fontSize='15px'
          color='#fff'
          textAlign='center'
          fontWeight='bold'
          textTransform='uppercase'
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
