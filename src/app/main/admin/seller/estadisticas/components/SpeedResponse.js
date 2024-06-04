import React, { useEffect, useState } from 'react'
import { Box, Center, Text, Flex } from '@chakra-ui/react/'
import CVText from '@CVTemplate/core/CVText'
import { BoxProgress } from '../../productos/ProductsStyle'
import { LinearProgress } from '@/../node_modules/@material-ui/core/index'
import { IconRabbit, IconTurtle } from './icons'

const Measurer = ({show, hour='5'}) => {
  const styleMeasurer = {
    marginBottom: '-2rem',
    zIndex: '100',
    position: 'relative',
    transform: show ? 'translate(175px)' : '',
    transition: 'all 0.4s ease-in-out'
  }
  const styleSpan = {
    color: 'white',
    marginTop: '0.8rem',
    position: 'absolute',
    marginLeft: '-0.5rem',
  }
  return (
  <Box {...styleMeasurer} >
    <Text 
      color='#00ADF6' 
      w='8.4rem' 
      fontSize='10px' 
      textAlign='center' 
      transition='all 1s ease-in-out' 
      transform={`scale(${show ? 1 : 0})`}
      ml='-2.8rem'
    >
      Tiempo promedio de respuesta:
      <br /> <span style={styleSpan}>{hour + 'hr'}</span>
    </Text>
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83501 27.165 0 17.5 0C7.83502 0 0 7.83501 0 17.5C0 27.165 7.83502 35 17.5 35Z" fill="url(#paint0_linear_13869_12065)"/>
    <path d="M17.5 31C24.9558 31 31 24.9558 31 17.5C31 10.0442 24.9558 4 17.5 4C10.0442 4 4 10.0442 4 17.5C4 24.9558 10.0442 31 17.5 31Z" fill="url(#paint1_linear_13869_12065)"/>
    <defs>
    <linearGradient id="paint0_linear_13869_12065" x1="-5.13388" y1="32.6801" x2="36.7675" y2="4.5815" gradientUnits="userSpaceOnUse">
    <stop stopColor="#D4F4FF"/>
    <stop offset="1" stopColor="#85D9FC"/>
    </linearGradient>
    5
    <linearGradient id="paint1_linear_13869_12065" x1="0.0395772" y1="29.2104" x2="32.3635" y2="7.5343" gradientUnits="userSpaceOnUse">
    <stop stopColor="#00ADF6"/>
    <stop offset="1" stopColor="#85D9FC"/>
    </linearGradient>
    </defs>
    </svg>

  </Box>
  )
} 

const SpeedResponse = ({children}) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 800);
  }, [])
  return (
    <Box w='21.2rem' h='9.4rem' mx='auto'>
      <Center  mb={10}>
        <CVText fontSize='20' color='skyblue' fontWeight='bold'>Velocidad de respuesta</CVText>
      </Center>
      <Box>
        <Measurer show={show}/>
        <BoxProgress>
          <LinearProgress
            style={{
              height: '16px',
              borderRadius: '8px',
              backgroundColor: '#D4F4FF'
            }}
            variant='determinate'
            value={show ? 80 : 0}
          />
        </BoxProgress>
        <Flex w='100%' justify='space-between' my={3}>
          <IconTurtle/>
          <IconRabbit/>
        </Flex>
      </Box>
      {children != '' &&
        <Box px='1.5rem'>
          <CVText color='gray' fontSize='10px' fontWeight={300}>{children}</CVText>
        </Box>
      }
    </Box>
  )
}

export default SpeedResponse