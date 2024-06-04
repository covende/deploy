import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { Box, Text, Flex } from '@chakra-ui/react';

import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { SEARCH_FILTER } from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CategoryQuestions from './CategoryQuestions';
import FormDoubts from './FormDoubts';
import icons from '../../buyer/centro-de-ayuda/assets/icons';
import LisTabQuestion from './LisTabQuestion';
import QuestionAcordeon from './QuestionAcordeon';
import CVText from '@CVTemplate/core/CVText';

const QuestionsAnswer = ({ type = 'seller' , formu = true }) => {
  const [FilterData, setFilterData] = useState([]);
  const [categoriaFaqdata, setcategoriaFaqdata] = useState([]);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  let fondo = '';
  let tipo = '';
  type == 'buyer'
    ? ((fondo = '#FF5454'), (tipo = 'BUYER'))
    : ((fondo = '#00ADF6'), (tipo = 'SELLER'));

  const fetchSearch = async (e = '') => {
    const pag = 1;
    const item = 10;
    const searh = e;
    const res = await AxiosGQL(SEARCH_FILTER(pag, item, tipo, searh));
    setFilterData([...res.findFrequentsQuestions.faqs]);
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  return (
    <>
      <Box
        bg={fondo}
        borderRadius='8'
        mt='17px'
        display='flex'
        h='126px'
        justifyContent='space-around'
        alignItems='center'
        w='100%'
        p='0'>
        <Box mt={10}>
          {type === 'buyer' ? icons.LeftFaqiconBuyer : icons.LeftFaqiconSeller}
        </Box>

        <Grid xs={12} sm={12} md={6}>
        {formu ?  (
          <Box mr={8} bg='#FFF' borderRadius='17px' mt='0'>
            <CVInput
              placeholder='Escribe lo que estás buscando'
              value=''
              iconFind={true}
              onChange={(e) => fetchSearch(e)}
              textFind='BUSCAR'
              buttonColor={type === 'buyer' ? 'shadowRed' : ''}
            />
          </Box>
          ):  <CVText 
          color ='white'
          fontSize = '1.8rem'
          
          >
            Centro de Ayuda para Compradores 
          </CVText>
          }
        </Grid>

      </Box>
      
     <Box>
      {hide && (
        <>
          <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-star", md: "space-between" }}
          alignItems={{ base: "stretch", md: "flex-start" }}
            mt={10}
            display='flex'
            w='100%'
            flexWrap={{base:"nowrap", md: "wrap"}}
            >
            {FilterData.length > 0 ? (
              FilterData.map((item, i) => {
                return (
                  <CategoryQuestions
                    key={i}
                    title={item.category}
                    answer={item.faqsQuestions}
                    cod={item._id}
                    setFaqdata={setcategoriaFaqdata}
                    setShow={setShow}
                    setHide={setHide}
                    fondo={fondo}
                    icon={item?.icon}
                    type={type}
                  />
                );
              })
            ) : (
              <Text mx='auto' fontWeight='bold' color='#004772' fontSize='15px'>
                No encontrado
              </Text>
            )}
          </Flex> 
          {formu && (
          <FormDoubts fondo={fondo} type={type} />
          )}
        </>
      )}
      </Box>
      <Flex bg='#FFF' w='100%'>
        {show && (
          <>
            <Box ml={10} mt='1rem'>
              <CVButton
                backgroundColor={type === 'buyer' ? 'shadowRed' : ''}
                onClick={() => {
                  setHide(true);
                  setShow(false);
                }}>
                Volver
              </CVButton>
              {FilterData &&
                FilterData.map((item, i) => {
                  return (
                    <LisTabQuestion
                      key={i}
                      title={item.category}
                      cod={item._id}
                      setFaqdata={setcategoriaFaqdata}
                      categoriaData={categoriaFaqdata}
                      fondo={fondo}
                    />
                  );
                })}
            </Box>
            <div id={'section1'}>
              <Box mt={10} mx={10}>
                {categoriaFaqdata.length > 0 ? (
                  <QuestionAcordeon data={categoriaFaqdata} />
                ) : (
                  ''
                )}
              </Box>
            </div>
          </>
        )}
      </Flex>
    </>
  );
};

export default QuestionsAnswer;
