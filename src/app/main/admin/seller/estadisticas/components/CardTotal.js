import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react/';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';

export const IconPending = ({show}) => {
  const styleIcon = {
    transform: `scale(${show})`,
    transition: 'transform 1s ease-in-out'
  }
  return (
    <svg style={styleIcon} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="20.5" fill="white" stroke="#FF5454"/>
    <path d="M32.5008 25.4917L24.0265 10.7849C23.3859 9.66738 22.2544 9 20.9999 9C19.7455 9 18.614 9.66738 17.9733 10.7849L9.49979 25.4917C8.84541 26.6326 8.83304 28.003 9.46609 29.1568C10.1006 30.3113 11.2437 31 12.5256 31H29.4742C30.7562 31 31.8993 30.3113 32.5338 29.1568C33.1669 28.003 33.1545 26.6326 32.5008 25.4917ZM21 13.4964C21.7775 13.4964 22.4077 14.1494 22.4077 14.955V20.7896C22.4077 21.5951 21.7775 22.2482 21 22.2482C20.2225 22.2482 19.5922 21.595 19.5922 20.7896V14.955C19.5922 14.1494 20.2225 13.4964 21 13.4964ZM21 28.0827C19.8355 28.0827 18.8883 27.1012 18.8883 25.8947C18.8883 24.6882 19.8355 23.7068 21 23.7068C22.1644 23.7068 23.1116 24.6882 23.1116 25.8947C23.1116 27.1013 22.1644 28.0827 21 28.0827Z" fill="#FF5454"/>
    </svg>
  )
}

function CardTotal({ title, value, backgroundColor, description='', pendings=false, children='' }) {
  const [show, setShow] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setShow(1)
    }, 500);
  }, [])
  return (
    <Grid item xs={6} sm={6} md={6}>
      <Box display='flex' position='relative' mr='10px'>
        <CVPanel
          itemJustify='space-between'
          itemDirection='column'
          backgroundColor={backgroundColor}
          useBackgroundClip={true}
          height='100px'>
          <CVText
            color='white'
            fontSize='20px'
            fontWeight={600}
            textAlign='start'>
            {title}
          </CVText>
          <CVText color='white' textAlign='start' fontWeight='300'>
            {description}
          </CVText>
          <Flex justifyContent='end' width='100%'>
            <CVText
              color='white'
              fontWeight='bold'
              fontSize='2rem'
              textAlign='end'>
              {value}
            </CVText>
          </Flex>
        </CVPanel>
        {pendings && (
          <Box marginTop='-2rem' marginLeft='-2rem' zIndex={1}>
            <IconPending {...{ show }} />
          </Box>
        )}
      </Box>
      {children != '' && (
        <Box px='1.5rem'>
          <CVText color='gray' fontSize='10px' fontWeight={300}>
            {children}
          </CVText>
        </Box>
      )}
    </Grid>
  );
}

export default CardTotal;
