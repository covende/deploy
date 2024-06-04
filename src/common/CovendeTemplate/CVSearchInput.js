import React, { useEffect, useState } from 'react';

import {
  Input,
  Button,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react/';
import { BsSearch } from 'react-icons/bs';
import { COLORS } from './CVThemes';

function CVSearchInput({
  onSubmit = () => {},
  onChange = () => {},
  placeholder = '',
  bg = 'primary',
  width = 'auto',
  value
}) {
  return (
    <form
      style={{
        display: 'flex',
        width
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target[0].value);
      }}>
      <InputGroup size='md' border>
        <Input
          pr='4.5rem'
          type='text'
          border={`2px solid ${COLORS[bg]}`}
          borderColor={COLORS[bg]}
          boxShadow='-1px 1px -1px rgb(0 0 0 / 20%)'
          {...{ placeholder, value }}
          borderRadius='1rem'
          onChange={(e) => onChange(e?.target?.value)}
        />
        <InputRightElement width='4.5rem'>
          <Button
            type='submit'
            h='100%'
            w='100%'
            bg={COLORS['primary']}
            size='sm'
            borderRadius='0px 1rem 1rem 0px'>
            <BsSearch color='white' />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default CVSearchInput;
