import { CVMessages, CVPanel } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

function Messages({ closeSala }) {
  const sala = useSelector((state) => state.sala);

  return (
    <Box>
      {sala.sala ? (
        <CVMessages sala={sala} closeSala={closeSala} />
      ) : (
        <CVPanel />
      )}
    </Box>
  );
}

export default Messages;
