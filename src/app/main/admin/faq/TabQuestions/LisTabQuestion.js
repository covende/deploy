import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FAQ_QUESTIONS_BY_ID } from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

const LisTabQuestion = ({ title, cod, setFaqdata, categoriaData, fondo }) => {
  const setCategoryFaq = async (codigo) => {
    const { faqQuestionsByFaqId } = await AxiosGQL(FAQ_QUESTIONS_BY_ID(codigo));
    setFaqdata(faqQuestionsByFaqId);
  };
  return (
    <>
      <Text
        textTransform='uppercase'
        borderRadius='12px'
        fontFamily='Poppins'
        fontWeight='bold'
        width='20rem'
        p={3}
        my={5}
        backgroundColor={
          cod == categoriaData[0]?.cotegory_faq.id ? fondo : '#FFF'
        }
        _hover={{
          background: fondo,
          color: 'white'
        }}
        fontSize='2xl'
        color={cod == categoriaData[0]?.cotegory_faq.id ? '#FFF' : fondo}
        onClick={() => setCategoryFaq(cod)}>
        {title}
      </Text>
    </>
  );
};

export default LisTabQuestion;
