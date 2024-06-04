import React from 'react'
import { Flex, Box } from '@chakra-ui/react/'
import { v4 } from 'uuid';
import { dataTimeFrame, headersTimeFrame } from './MVendidosUtils';
import Headers from './TimeFrame/Headers';
import Rows from './TimeFrame/Rows';

const TimeFrame = ({ reputation30, reputation90, reputation180 }) => {
  return (
    <Box my='2rem'>
      <Flex w='100%' justify='end'>
        <Flex w='60%' justify='space-between'>
          {headersTimeFrame(reputation30, reputation90, reputation180).map(
            (header) => (
              <Headers key={v4()} date={header.date} days={header.days} />
            )
          )}
        </Flex>
      </Flex>
      <Box>
        {dataTimeFrame(reputation30, reputation90, reputation180).map(
          ({ startText, days30, days90, days180 }, ndx) => (
            <Rows
              key={v4()}
              {...{ startText, days30, days90, days180 }}
              fontWeight={ndx == 0 && '500'}
              color={ndx == 0 && '#004772'}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default TimeFrame