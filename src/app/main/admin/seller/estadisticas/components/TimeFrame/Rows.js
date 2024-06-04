import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react/'

const Rows = ({startText, days30, days90, days180, color='#4F4F4F', fontWeight='300'}) => {
  return (
    <Flex w='100%' bg='#F1F1F1' borderRadius='20px' justify='space-between' m='1rem' p='6px 25px'>
      <Text {...{color, fontWeight}}>{startText}</Text>
      <Flex 
        w='60%'
        justify='space-between'
      >
        <Text w='3rem' textAlign='center' {...{color, fontWeight}}>{days30}</Text>
        <Text w='3rem' textAlign='center' {...{color, fontWeight}}>{days90}</Text>
        <Text w='3rem' textAlign='center' {...{color, fontWeight}}>{days180}</Text>
      </Flex>
    </Flex>
  )
}

export default Rows