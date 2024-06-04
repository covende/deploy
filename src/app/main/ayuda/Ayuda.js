import React, { useState, useEffect } from 'react';
// import QuestionsAnswer from './components/TabQuestions/QuestionsAnswer';
import QuestionsAnswer from '@/app/main/admin/faq/TabQuestions/QuestionsAnswer';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
 
import GuiaComprador from './components/GuiaComprador';
function Ayuda(props) {
  const [categoriaFaqdata, setcategoriaFaqdata] = useState([]);
  const { children, value, index, ...other } = props;
  window.scrollTo({top:0,behavior: 'smooth' });
  return (
    <>
      {/* <Box width='30%' padding='10px' ml='100px' display='flex' justifyContent='space-between' mt='10px'>
        <Link>Qué es CoVende</Link>
        <Link>¿Cómo compro?</Link>
        <Link>Ayuda</Link>
      </Box> */}
      <Container
        style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem'
        }}>
        <Box>
        <QuestionsAnswer type='buyer' formu = {false}/>
          {/* <QuestionsAnswer setFaqdata={setcategoriaFaqdata} /> */}
          {/* <div id={'section1'}>
            <Box mt={10} mx={20}>
              {categoriaFaqdata.length > 0 ? (
                <GuiaComprador data={categoriaFaqdata} />
              ) : (
                ''
              )}
            </Box>
          </div> */}
        </Box>
      </Container>
    </>
  );
}

export default Ayuda; 
