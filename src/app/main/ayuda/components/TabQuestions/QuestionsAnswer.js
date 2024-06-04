import React, { useState, useEffect } from 'react';
import { CVButton } from '@/common/CovendeTemplate';
import { Grid } from '@material-ui/core';
import { Box, Text, Flex, Link } from '@chakra-ui/react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CategoryQuestions from './CategoryQuestions';
import { SEARCH_FILTER } from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import HeadBoard from '@/app/main/ayuda/components/HeadBoard';

const QuestionsAnswer = ({ setFaqdata }) => {
  const [FilterData, setFilterData] = useState([]);

  const fetchSearch = async (e) => {
    const pag = 1;
    const item = 10;
    const searh = e;
    const res = await AxiosGQL(SEARCH_FILTER(pag, item, 'BUYER', searh));
    setFilterData([...res.findFrequentsQuestions.faqs]);
  };

  useEffect(() => {
    fetchSearch(' ');
  }, []);
  return (
    <>
      <HeadBoard fetchSearch={fetchSearch} />
      <Flex mt={10} flexWrap='wrap' justify='space-around'>
        {FilterData.map((item, i) => {
          return (
            <CategoryQuestions
              key={i}
              title={item.category}
              answer={item.faqsQuestions}
              cod={item._id}
              setFaqdata={setFaqdata}
              icon={item.icon}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default QuestionsAnswer;
