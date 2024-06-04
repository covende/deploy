import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const CountDownTime = ({ hours, minutes, seconds }) => {
  const [second, setSecond] = useState(seconds);
  const [minute, setMinute] = useState(minutes);
  const [hour, setHour] = useState(hours);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer =
      second >= -1 && setInterval(() => setSecond(second - 1), 1000);
    if (second === -1) {
      setMinute(minute - 1);
      setSecond(59);
    } else if (minute === -1) {
      setHour(hour - 1);
      setMinute(59);
    } else if (hour === 0 && minute === 0 && second === 0) {
      setSecond(0);
      setMinute(0);
      setHour(0);
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [second, minute]);

  return (
    <Box>
      {isFinished ? (
        <h1>El tiempo Culminó</h1>
      ) : (
        <Box display='flex' alignItems='center' my='15px'>
          <Box
            p='5px'
            fontWeight='900'
            borderRadius='4px'
            color='#fff'
            fontSize='25px'
            border='2px solid #fff'
            margin='0'
            w='55px'
            textAlign='center'>
            {hour < 10 ? '0' + hour : hour}
          </Box>
          <span style={{ fontSize: '50px', color: '#fff', marginLeft: '12px' }}>
            :
          </span>
          <Box
            p='5px'
            fontWeight='900'
            borderRadius='4px'
            color='#fff'
            fontSize='25px'
            border='2px solid #fff'
            margin='0'
            w='55px'
            textAlign='center'
            mx='12px'>
            {minute < 10 ? '0' + minute : minute}
          </Box>
          <span
            style={{ fontSize: '50px', color: '#fff', marginRight: '12px' }}>
            :
          </span>
          <Box
            p='5px'
            fontWeight='900'
            borderRadius='4px'
            color='#fff'
            fontSize='25px'
            border='2px solid #fff'
            margin='0'
            w='55px'
            textAlign='center'>
            {second < 10 ? '0' + second : second}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CountDownTime;
