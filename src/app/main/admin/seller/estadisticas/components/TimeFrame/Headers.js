import React from 'react'
import { Flex, Text } from '@chakra-ui/react/'

const Headers = ({days='-', date='-'}) => {
  return (
    <Flex
      justify='center'
      background='#FFFFFF'
      boxShadow='0px 2px 3px rgba(0, 0, 0, 0.15)'
      borderRadius='10px'
      w='7rem'
      flexDirection='column'
      align='center'>
      <Text color='#17BF93' fontWeight='600' fontSize='16px' mb='5px'>
        {days}
      </Text>
      <Text fontSize='9.5px' fontWeight='300' color='#004772' px='5px'>
        {date}
      </Text>
    </Flex>
  );
}

export default Headers