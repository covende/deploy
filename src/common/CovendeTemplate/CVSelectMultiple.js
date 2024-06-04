import Select from 'react-select';
import { Flex, Text } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import SizeBox from '../components/CustomComponent/SizeBox';

const SelectStyle = styled.div`
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  border-radius: ${({ borderRadius }) => `${borderRadius}`};
  padding-top: 0px;
  padding-bottom: 0px;

  & .basic-multi-select,
  .select__control,
  &
    .MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth
    .MuiInputBase-root.MuiOutlinedInput-root.MuiAutocomplete-inputRoot.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiOutlinedInput-adornedEnd {
    height: ${({ height }) => `${height}`};
    width: ${({ width }) => `${width}`};
    border-radius: ${({ borderRadius }) => `${borderRadius}`};
    font-size: ${({ fontSize }) => `${fontSize}`};
    padding-top: 0px;
    padding-bottom: 0px;
  }
  & .select__control {
    overflow-y: auto;
  }
`;

/**
 *
 * @param {Object} param0
 * @param {String} param0.titleColor
 * @param {String} param0.title
 * @param {('row' | 'column')} param0.titleOrientation
 * @param {('start' | 'end' | 'space-around' | 'space-between' | 'center')} param0.titleContent
 * @param {(String|{value:String, label:String}|[{value:String, label:String}])} param0.value
 * @param {Function} param0.onChange
 * @param {[{value:String, text: any}]} param0.options
 * @param {String} param0.height
 * @param {String} param0.width
 * @param {String} param0.fontSize
 * @param {String} param0.borderRadius
 * @param {Boolean} param0.multiple
 * @param {String} param0.itemText
 * @param {String} param0.itemValue
 * @param {String} param0.onInputChange
 * @returns
 */
function CVSelectMultiple({
  titleColor = '#000000',
  title = '',
  titleOrientation = 'row' || 'column',
  titleContent = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  value,
  onChange,
  options = [],
  height = '2.5rem',
  width = '100%',
  fontSize = '1rem',
  placeholder = 'Selecciona una opción',
  borderRadius = '1rem',
  error = false,
  multiple = false,
  itemText = 'text',
  itemValue = 'value',
  noOptionsMessage = 'No hay opciones disponibles',
  onInputChange = (value) => value
}) {
  const [optiones, setoptiones] = useState([]);
  const [selected, setselected] = useState('');
  useEffect(() => {
    if (JSON.stringify(options) != JSON.stringify(optiones))
      setoptiones(options);
    if (JSON.stringify(value) != JSON.stringify(selected)) setselected(value);
  }, [options, value]);

  return (
    <SelectStyle
      height={height}
      borderRadius={borderRadius}
      width={width}
      fontSize={fontSize}>
      <Flex
        width={width}
        alignItems={titleOrientation == 'column' ? titleContent : 'center'}
        flexDirection={titleOrientation}
        justifyContent={titleContent}>
        <Text color={titleColor} fontSize={fontSize}>
          {title}
        </Text>
        {title != '' && titleOrientation == 'row' ? <SizeBox /> : ''}
        <Select
          onInputChange={onInputChange}
          placeholder={placeholder}
          formatOptionLabel={(option) => option[itemText]}
          getOptionValue={(item) => item[itemValue]}
          getOptionLabel={(item) => item[itemText]}
          value={value}
          isMulti={multiple}
          onChange={(e, v) => onChange(e)}
          name='colors'
          options={optiones}
          noOptionsMessage={() => noOptionsMessage}
          className='basic-multi-select'
          classNamePrefix='select'
          styles={{
            height,
            borderRadius,
            fontSize,
            width
          }}
        />
        {/* <Autocomplete
          onInputChange={(e, value) => onInputChange(value)}
          multiple={multiple}
          id={v4()}
          options={optiones}
          getOptionLabel={(option) => option[itemText]}
          getOptionSelected={(option, value) =>
            option[itemValue] === value[itemValue]
          }
          placeholder={placeholder}
          onChange={(e, values) => onChange(values != null ? values : {})}
          value={selected}
          style={{
            height,
            borderRadius,
            fontSize,
            width
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={null}
              variant='outlined'
              style={{
                height,
                borderRadius,
                fontSize,
                width
              }}
            />
          )}
        /> */}
      </Flex>
    </SelectStyle>
  );
}
export default CVSelectMultiple;
