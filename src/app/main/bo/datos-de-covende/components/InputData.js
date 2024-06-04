import React from 'react';
import { Text, Input } from '@chakra-ui/react/';

function InputData({ label, placeholder, value, setValue }) {
  return (
    <>
      <Text variant='primary'>{label}</Text>
      <Input
        variant='outline'
        placeholder={placeholder}
        value={value.value}
        isInvalid={value.isValid}
        onChange={(e) =>
          setValue({
            ...value,
            value: e.target.value,
            isValid: e.target.value == '' ? true : false
          })
        }
        size='sm'
        width='325px'
      />
      {value.isValid && (
        <Text color='red' fontSize='8px'>
          Campo requerido*
        </Text>
      )}
    </>
  );
}

export default InputData;
