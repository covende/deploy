import React from 'react';
// Assets
import { PencilAltIcon, Trash } from '@/app/assets/icons';
import { Button } from '@chakra-ui/button';
import { CVText } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';

const inputDataFeedsProcessed = (data, actions) => {
  return (
    data &&
    data.map((item, index) => ({
      plan: item,
      id: item.custom_id,
      nombre: (
        <CVText
          fontWeight='semibold'
          textTransform='capitalize'
          fontSize='1.5rem'
          color='blue'>
          {item.name}
        </CVText>
      ),
      fecha: '    ',
      actions: (isOpen, onClose) => (
        <Flex justifyContent='center' alignItems='center'>
          <SizeBox />
          <Button
            variant='link'
            onClick={onClose}
            fontSize='1.02rem'
            color={COLORS['blue']}>
            {CVFormatDate({ date: item.fecha })}
          </Button>
        </Flex>
      )
    }))
  );
};

const columnsDataFeeds = [
  {
    label: 'DESCRIPCIÓN',
    data: 'nombre',
    align: 'center'
  },

  {
    label: 'PERIODOs',
    data: 'noses'
  },
  {
    label: 'PERIODO',
    data: 'fecha'
  },
  {
    label: 'ACCIÓN',
    data: 'actions',
    type: 'render',
    last: true,
    align: 'left'
  }
];
export default {
  inputDataFeedsProcessed,
  columnsDataFeeds
};
