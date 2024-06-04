import CVText from '@CVTemplate/core/CVText';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import CVButton from '@CVTemplate/core/CVButton';
import { v4 } from 'uuid';
import { CFTYPE } from './customer/CFUtils';

const CFTtitle = ({ type, settype }) => {
  return (
    <Flex justifyContent='space-between'>
      <CVText color='primary' fontWeight='bold' fontSize='1.5rem'>
        CENTRO DE FACTURACIÓN
      </CVText>
      <Flex>
        {CFTYPE.map((item) => (
          <Box margin='0 0 0 1rem' key={v4()}>
            <CVButton
              backgroundColor={item.value == type ? 'primary' : 'white'}
              color={item.value == type ? 'white' : 'blue'}
              onClick={() => settype(item.value)}>
              {item.text}
            </CVButton>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default CFTtitle;
