import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { CVDateDifference } from '../CVMethods';
import { COLORS } from '../CVThemes';

function CVCardProductOfferTime({ time }) {
  const [difference, setdifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const Cubito = React.memo(({ child }) => (
    <Box
      width='2rem'
      height='2rem'
      rounded='0.25rem'
      margin='0.25rem'
      display='flex'
      justifyContent='center'
      color='white'
      backgroundColor={COLORS['red']}
      alignItems='center'
    >
      {child.toString().padStart(2, '0')}
    </Box>
  ));

  useEffect(() => {
    let interval = setInterval(() => {
      let dif = CVDateDifference({ futureDate: time });
      setdifference(dif);
    }, 1000);

    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, [time]);
  return (
    <Flex justifyContent='space-around'>
      <Cubito child={difference.days} />
      <Cubito child={difference.hours} />
      <Cubito child={difference.minutes} />
      <Cubito child={difference.seconds} />
    </Flex>
  );
}

export default CVCardProductOfferTime;
