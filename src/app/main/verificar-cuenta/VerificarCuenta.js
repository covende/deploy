import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Skeleton } from '@chakra-ui/skeleton';
import { fromBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { Flex, Box } from '@chakra-ui/layout';
import { useHistory } from 'react-router';

function VerificarCuenta() {
  let { code } = useParams();

  let data = code.split('ABCDE');
  const [loading, setloading] = useState(true);
  const [success, setsuccess] = useState(false);
  const [message, setmessage] = useState('');
  const [time, settime] = useState(5);
  const history = useHistory();
  const [uri, seturi] = useState();

  const goto = () => {
    let url = localStorage.getItem('redirectTo') || '/';
    localStorage.removeItem('redirectTo');
    window.location.href = url;
  };
  const initdata = async () => {
    setloading(true);
    try {
      let user = JSON.parse(fromBase64(data[1]));
      const { verifyEmailUser } = await AxiosGQL(`mutation{
      verifyEmailUser(code:"${code.replaceAll('ABCDE', '.')}",user_id:"${
        user.user_id
      }"){
        message
        url
      }
    }`);
      if (verifyEmailUser != null) {
        setsuccess(true);
        setmessage(verifyEmailUser.message);
        localStorage.setItem('redirectTo', verifyEmailUser.url);
        seturi(verifyEmailUser.url);
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem('redirectTo', '/');
      seturi('/');
    }
    setloading(false);
  };

  useEffect(() => {
    const tm = setInterval(() => {
      if (localStorage?.getItem('redirectTo')) {
        if (time <= 0) {
          goto();
        } else {
          settime(time - 1);
        }
      }
    }, 1000);
    return () => clearInterval(tm);
  }, [time, uri]);

  useEffect(() => {
    initdata();
  }, [code]);

  const ValidSuccess = () => (
    <>
      <Box height='5rem' width='5rem'>
        <FaCheckCircle style={{ color: COLORS['green'], fontSize: '5rem' }} />
      </Box>
      <SizeBox />
      <SizeBox />
      <CVText color='green' fontSize='1.25rem'>
        Bienvenido a Covende
      </CVText>
      <SizeBox height='3rem' />
      <CVText color='green' fontSize='1.25rem'>
        Has verificado tu Email Correctamente
      </CVText>
    </>
  );

  const ValidFailed = () => (
    <>
      <Box height='5rem' width='5rem'>
        <FaTimesCircle style={{ color: COLORS['red'], fontSize: '5rem' }} />
      </Box>
      <SizeBox />
      <SizeBox />
      <CVText color='red' fontSize='1.25rem'>
        Error de Vefificación
      </CVText>
      <SizeBox height='3rem' />
      <CVText color='red' fontSize='1.25rem'>
        No se ha verificado Correctamente
      </CVText>
    </>
  );

  return (
    <Container height='100%'>
      <CVPanel
        height='calc(100vh - 190px)'
        itemsAlign='center'
        itemJustify='center'
        itemDirection='column'>
        <SizeBox height='3rem' />
        {!loading ? (
          success ? (
            <ValidSuccess />
          ) : (
            <ValidFailed />
          )
        ) : (
          <Skeleton height='200px' width='100%' />
        )}
        <SizeBox height='3rem' />
        <Flex alignItems='center' flexDirection='column'>
          {/* <CVText color='yellow' fontSize='1.25rem'>
            
            {message}
          </CVText> */}
          {/* <SizeBox /> */}
          <Flex alignItems='center'>
            {/* <HiOutlineArrowNarrowLeft /> */}
            <SizeBox height='3rem' />
            <Box onClick={() => goto()}>
              <CVText color='primary' fontSize='1.25rem' fontWeight='bold'>
                <Flex alignItems='center'>
                  Serás redirigido en {time} segundos o
                  <SizeBox width='0.5rem' />
                  <span style={{ textDecoration: 'underline' }}>Ir Ahora</span>
                </Flex>
              </CVText>
            </Box>
          </Flex>
        </Flex>
      </CVPanel>
      <SizeBox />
    </Container>
  );
}

export default VerificarCuenta;
