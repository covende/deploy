import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { v4 } from 'uuid';
import { CVText } from '.';

const RadioStyle = styled.div`
  /* & .rs-radio-wrapper {
    top: calc(50% - 7px);
  } */
`;

/**
 *
 * @param {Object} param0
 * @param {String} param0.value
 * @param {Function} param0.onChange
 * @param {[{value:String, text:any}]} param0.options
 * @param {String} param0.name
 * @param {('row' | 'column')} param0.itemDirection
 * @param {('space-between' | 'end' | 'space-around' | 'start' ||)} param0.itemJustify
 * @returns
 */
function CVRadio({
  value,
  onChange,
  options = [],
  name = '',
  isDisabled = false,
  itemDirection = 'row' || 'column',
  itemJustify = 'space-between' ||
    'end' ||
    'space-around' ||
    'start' ||
    'center'
}) {
  return (
    <RadioStyle>
      <RadioGroup
        name={name == '' ? v4() : name}
        value={value}
        onChange={(v, e) => onChange(v)}
        {...(isDisabled ? { pointerEvents: 'none' } : {})}>
        <Stack direction={itemDirection} align={itemJustify}>
          {options.map((item) => (
            <Radio
              size='lg'
              key={v4()}
              value={item.value}
              disabled={isDisabled}>
              <CVText>{item.text}</CVText>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </RadioStyle>
  );
}

export default CVRadio;
