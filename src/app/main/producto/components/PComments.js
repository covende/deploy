import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVLine, CVText } from '@/common/CovendeTemplate';
import { Flex, Text } from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import { FaStar } from 'react-icons/fa';
import { v4 } from 'uuid';
import CVImage from '@CVTemplate/core/CVImage';
import { COLORS } from '@CVTemplate/core/CVThemes';

const PComments = ({ lista, totalcomment }) => {
  return (
    <Box id='comments' mt='2.2rem'>
      <CVText color='primary' fontWeight='bold'>
        Opiniones de los compradores ({totalcomment})
      </CVText>
      {lista.map((item) => (
        <Box key={v4()} width='100%'>
          <SizeBox />
          <Flex width='100%'>
            <Box>
              <CVImage
                variant='avatar'
                name={item.name}
                image={item.image}
                width='34px'
                height='34px'
              />
            </Box>
            <SizeBox />
            <Box width='100%'>
              <Flex justifyContent='space-between'>
                <CVText color='blue' fontWeight='bold'>
                  {item.name}
                </CVText>
                <CVText
                  fontWeight='bold'
                  color={(() => {
                    let color = 'gray';
                    if (item.points <= 5) color = 'yellow';
                    if (item.points <= 3) color = 'green';
                    if (item.points <= 2) color = 'red';
                    if (item.points <= 0) color = 'gray';
                    return color;
                  })()}>
                  <FaStar />
                  <SizeBox width='0.25rem' />
                  {item.points}
                </CVText>
              </Flex>
              <Flex justifyContent='space-between'>
                <CVText color='blue'>{item.direction}</CVText>
                <CVText fontSize='12' color='gray'>
                  {item.date}
                </CVText>
              </Flex>
              <Flex>
                {item.tags.length > 0 &&
                  item.tags.map(({ title, _id }) => (
                    <Text
                      bg={COLORS['mediumGray']}
                      color='gray'
                      px='5px'
                      mr='5px'
                      key={_id}
                      borderRadius='10px'>
                      {title}
                    </Text>
                  ))}
              </Flex>
              <CVText textAlign='start'>{item.comment}</CVText>
            </Box>
          </Flex>
          <CVLine lineHeight='1px' color='gray' />
        </Box>
      ))}
    </Box>
  );
};

export default PComments;
