import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { v4 } from 'uuid';

function SRetail({ variations, stock = 0, price, setprice }) {
  console.log({
    variations,
    stock,
    price
  });
  return (
    <Box>
      {variations.length > 0 ? (
        <Box>
          {variations.map((item) => (
            <Box key={v4()}>
              {item.custom_attributes.map((attr) => (
                <Flex key={v4()}>
                  <Text>{attr.name}</Text>
                  <Text>{attr.value}</Text>
                </Flex>
              ))}
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          {(stock || 0) != 0
            ? `Stock: ${stock}`
            : 'No tenemos mas de este producto'}
        </Box>
      )}
    </Box>
  );
}

export default SRetail;
