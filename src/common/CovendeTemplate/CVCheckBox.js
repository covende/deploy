import React, { useEffect, useState } from 'react';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { v4 } from 'uuid';
import { CVText } from '.';

/**
 *
 * @param {Object} param0
 * @param {Function} param0.onChange
 * @param {String} param0.name
 * @param {[{value:String, text: any, }]} param0.options
 * @param {('row' | 'column')} param0.itemDirection
 * @param {('space-between' | 'end' | 'space-around' | 'start' | 'center')} param0.itemJustify
 * @param {[String]} param0.value
 * @returns
 */
function CVCheckBox({
  onChange,
  options = [],
  value = null,
  name = '',
  itemDirection = 'row' || 'column',
  itemJustify = 'space-between' ||
    'end' ||
    'space-around' ||
    'start' ||
    'center'
}) {
  const [optiones, setoptiones] = useState([]);
  // const [selected, setselected] = useState('');
  useEffect(() => {
    if (JSON.stringify(options) != JSON.stringify(optiones))
      setoptiones(options);
    // if (value != selected) setselected(value);
  }, [options]);
  return (
    <CheckboxGroup
      colorScheme='twitter'
      {...(value ? (value = { value }) : ``)}
      name={name == '' ? v4() : name}
      onChange={(v, e) => onChange(v)}>
      <Stack align={itemJustify} direction={itemDirection}>
        {optiones.map((item) => (
          <Checkbox size='lg' key={v4()} value={item.value}>
            <CVText>{item.text}</CVText>
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
}

export default CVCheckBox;
