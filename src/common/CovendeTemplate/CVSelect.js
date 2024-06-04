import themeCovende from '@/themeCovende';
import { Flex, Text } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { FormControl } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CVErrorLabel } from './CVInput';
import SizeBox from '../components/CustomComponent/SizeBox';
import CVSelectNone from './CVSelect/CVSelectNone';
import CVSelectBuyer from './CVSelect/CVSelectBuyer';
import CVSelectSeller from './CVSelect/CVSelectSeller';

const SelectStyle = styled.div`
  width: ${({ width }) => (width ? `${width}` : '')};
  & .MuiSelect-select:focus {
    border-radius: 0;
    background-color: transparent;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ color }) => color};
  }
  & .MuiSelect-icon {
    color: ${({ color }) => color};
  }
`;

/**
 *
 * @param {Object} param0
 * @param {String} param0.titleColor
 * @param {String} param0.title
 * @param {('row' | 'column')} param0.titleOrientation
 * @param {('start' | 'end' | 'space-around' | 'space-between' | 'center')} param0.titleContent
 * @param {String} param0.value
 * @param {Function} param0.onChange
 * @param {[{value:String, text: any, disabled?: Boolean}]} param0.options
 * @param {String} param0.height
 * @param {String} param0.width
 * @param {String} param0.fontSize
 * @param {String} param0.placeholder
 * @param {String} param0.borderRadius
 * @param {Boolean} param0.error
 * @param {Boolean} param0.required
 * @param {String} param0.errorMessage
 * @param {('column' | 'row')} param0.errorDirection
 * @param {String} param0.color
 * @param {String} param0.errorClass
 * @returns
 */
function CVSelect({
  titleColor = '#000000',
  title = '',
  signs = '',
  titleOrientation = 'row' || 'column',
  titleContent = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  value = '',
  onChange = () => {},
  options = [],
  height = '2.5rem',
  width = '100%',
  fontSize = '1rem',
  placeholder = '',
  borderRadius = '1rem',
  error = false,
  required = false,
  errorMessage = 'Seleccione una opción',
  errorDirection = 'column' || 'row',
  errorClass = 'errores',
  color = 'black',
  boxShadow = '',
  groupOptions,
  type = 'none',
  marginLeft,
  widthText,
  widthBox,
  marginLeftBox,
  name,
  disabled = false,
  defaultValue
}) {
  const [optiones, setoptiones] = useState([]);
  const [selected, setselected] = useState('');
  useEffect(() => {
    if (JSON.stringify(options) != JSON.stringify(optiones))
      setoptiones(options);
    if (value != selected) setselected(value);
  }, [options, value]);

  const variant = {
    none: (
      <CVSelectNone
        disabled={disabled}
        error={error}
        height={height}
        width={width}
        fontSize={fontSize}
        borderRadius={borderRadius}
        color={color}
        placeholder={placeholder}
        selected={selected}
        onChange={onChange}
        optiones={optiones}
      />
    ),
    buyer: (
      <CVSelectBuyer
        height={height}
        width={width}
        fontSize={fontSize}
        borderRadius={borderRadius}
        color={color}
        onChange={onChange}
        groupOptions={groupOptions}
      />
    ),
    seller: (
      <CVSelectSeller
        height={height}
        width={width}
        fontSize={fontSize}
        borderRadius={borderRadius}
        color={color}
        name={name}
        onChange={onChange}
        groupOptions={groupOptions}
      />
    )
  };

  return (
    <SelectStyle
      style={{ marginLeft: `${marginLeftBox ? marginLeftBox : marginLeft}` }}
      width={width}
      color={color}>
      <Flex
        boxShadow={boxShadow}
        borderRadius={borderRadius}
        width={widthBox ? widthBox : width}
        alignItems={titleOrientation == 'column' ? titleContent : 'center'}
        flexDirection={titleOrientation}
        justifyContent={titleContent}>
        <Text color={titleColor} fontSize={fontSize} width={widthText}>
          {title}
          <span style={{ color: themeCovende.colors.rojo }}>{signs}</span>
        </Text>
        {title != '' && titleOrientation == 'row' ? <SizeBox /> : ''}
        <Flex width={width} flexDirection={errorDirection}>
          <FormControl variant='outlined' style={{ width }}>
            {variant[type]}
          </FormControl>
          {(error || required) && errorDirection == 'row' ? <SizeBox /> : ''}
          {error || required ? (
            <CVErrorLabel errorClass={errorClass} errorMessage={errorMessage} />
          ) : (
            ''
          )}
        </Flex>
      </Flex>
    </SelectStyle>
  );
}

export default CVSelect;
