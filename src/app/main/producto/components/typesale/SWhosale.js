import { Box } from '@chakra-ui/react';
import React from 'react';

function SWhosale({ wholesale }) {
  return (
    <Box>
      {JSON.stringify({
        wholesale
      })}
    </Box>
  );
}

export default SWhosale;
