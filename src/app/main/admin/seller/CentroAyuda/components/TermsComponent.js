import React, { forwardRef } from 'react';
import {
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useTab,
  Button
} from '@chakra-ui/react';
import { COLORS } from '@CVTemplate/core/CVThemes';

export function TermsComponent({ data = [] }) {
  const CustomTab = forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps['aria-selected'];

    return (
      <Button
        {...tabProps}
        bg={isSelected && '#CBD3DA'}
        textAlign='start'
        borderRadius='none'
        py='8px'
        fontWeight={isSelected ? 700 : 400}
        color={COLORS['blue']}
        display='block'>
        {tabProps.children}
      </Button>
    );
  });

  return (
    <Tabs orientation='vertical' variant='enclosed-colored'>
      <TabList bg='#F2F2F2' h='30rem' w='30%' py='0.8rem' borderRadius='10px'>
        <Text
          ml='15px'
          mb='7px'
          color='#17BF93'
          fontSize='18px'
          fontWeight='bold'>
          Versiones
        </Text>
        {data.map(({ nameTab }, ndx) => (
          <CustomTab key={ndx + nameTab}>{nameTab}</CustomTab>
        ))}
      </TabList>

      <TabPanels>
        {data.map(({ date, Component }, ndx) => (
          <TabPanel key={ndx} py={0} pl='1rem'>
            <Box
              p='1.6rem 1.1rem'
              border={`1px solid ${COLORS['blue']}`}
              borderRadius='10px'>
              <Box color={COLORS['blue']} textAlign='center' py='2rem'>
                <Text fontWeight={600} fontSize='18px'>
                  {date && `(${date})`}
                </Text>
              </Box>
              {Component}
            </Box>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
