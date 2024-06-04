import React, { useState } from 'react';

import { Box, Flex, Input } from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { CVButton } from '@/common/CovendeTemplate';
import { onlyNumber } from '@CVTemplate/core/CVValidation';

function PVActions({ quantity, stockmax, validprice, setquantity }) {
  const [ishover1, setishover1] = useState(false);
  const [ishover2, setishover2] = useState(false);

  return (
    <Box>
      <Flex width='100px'>
        <CVButton
          padding='0'
          onHover={(hover) => setishover1(hover)}
          boxShadow='none'
          borderRadius='10px 0px 0px 10px'
          border='1px solid #ECECEC'
          width='48px'
          variant={!ishover1 ? 'outlined' : 'contained'}
          backgroundColor={quantity <= 1 || !ishover1 ? 'gray' : 'primary'}
          color={
            !ishover1
              ? quantity <= 1 || stockmax == 0
                ? 'gray'
                : 'primary'
              : 'white'
          }
          disabled={quantity <= 1 || stockmax == 0}
          onClick={() => {
            validprice(quantity - 1);
            setquantity(quantity - 1);
          }}>
          <FaMinus />
        </CVButton>
        <Box
          minWidth='32px'
          border='1px solid #ECECEC'
          display='flex'
          width='100%'
          alignItems='center'
          justifyContent='center'>
          <Input
            borderRadius='0'
            height='100%'
            boxShadow='none'
            border='none'
            onBlur={(e) => {
              if (Number(e.target.value) == 0) {
                validprice(Number(1));
                setquantity(Number(1));
              }
            }}
            onChange={(e) => {
              let value = e.target.value;
              if (!isNaN(value.toString())) {
                if (value == '') {
                  validprice(value);
                  setquantity(value);
                } else {
                  if (!(value.toString().length > 4)) {
                    validprice(Number(value));
                    setquantity(Number(value));
                  }
                }
              }
            }}
            value={quantity}
          />
        </Box>
        <CVButton
          padding='0'
          onHover={(hover) => setishover2(hover)}
          variant={!ishover2 ? 'outlined' : 'contained'}
          boxShadow='none'
          borderRadius='0px 10px 10px 0px'
          border='1px solid #ECECEC'
          width='48px'
          backgroundColor={
            quantity == stockmax || stockmax == 0 || !ishover2
              ? 'gray'
              : 'primary'
          }
          color={
            !ishover2
              ? quantity == stockmax || stockmax == 0
                ? 'gray'
                : 'primary'
              : 'white'
          }
          disabled={quantity == stockmax || stockmax == 0}
          onClick={() => {
            validprice(Number(quantity) + 1);
            setquantity(Number(quantity) + 1);
          }}>
          <FaPlus />
        </CVButton>
      </Flex>
    </Box>
  );
}

export default PVActions;
