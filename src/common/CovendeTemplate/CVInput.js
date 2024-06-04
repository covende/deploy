import { Flex, Text } from '@chakra-ui/layout';
import { OutlinedInput, InputAdornment } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { CVButton, CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import { COLORS, FONTSIZE_DEFAULT } from './CVThemes';
import styled from '@emotion/styled';

export const CVErrorLabel = ({ errorMessage, errorClass = 'errores' }) => (
  <CVText
    color='red'
    className={errorClass}
    fontWeight='bold'
    fontSize='0.85rem'>
    <Flex alignItems='center'>
      {errorMessage !== '' && <MdError />}
      {errorMessage !== '' && <SizeBox />}
      {errorMessage}
    </Flex>
  </CVText>
);

const InputStyled = styled.div`
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
  & .Mui-focused.Mui-focused fieldset {
    border-color: ${COLORS['primary']} !important;
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
 * @param {Function} param0.onKeyPress
 * @param {Function} param0.onValidate
 * @param {Boolean} param0.iconFind
 * @param {Boolean} param0.multiline
 * @param {Boolean} param0.disabled
 * @param {Boolean} param0.error
 * @param {Boolean} param0.required
 * @param {String} param0.errorMessage
 * @param {('column' | 'row')} param0.errorDirection
 * @param {any} param0.ref
 * @param {String} param0.rows
 * @param {('text' | 'password' | 'color' | 'number')} param0.type
 * @param {String} param0.minLength
 * @param {String} param0.maxLength
 * @param {Number} param0.max
 * @param {String} param0.height
 * @param {String} param0.width
 * @param {String} param0.fontSize
 * @param {('inherit' | 'initial' | 'capitalize' | 'lowercase' | 'uppercase')} param0.textTransform
 * @param {any} param0.icon
 * @param {('primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'white' | 'black')} param0.iconColor
 * @param {String} param0.placeholder
 * @param {String} param0.borderRadius
 * @param {String} param0.buttonClick
 * @param {String} param0.paddingLeft
 * @param {Function} param0.onFocus
 * @param {Function} param0.onEnter
 * @param {Function} param0.onValid
 * @param {('primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'white' | 'black' | 'shadowRed')} param0.buttonColor
 * @param {String} param0.errorClass
 * @returns
 */
function CVInput({
  titleColor = '#000000',
  title = '',
  titleOrientation = 'row' || 'column',
  titleContent = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  value,
  onChange = (value) => {},
  onBackspace = (value) => {},
  onKeyPress = (value) => {},
  onValidate = (value) => {},
  onValid = (value) => value,
  onPaste = (value) => value,
  onSpace = (value) => {},
  focusIn = false,
  iconFind = false,
  multiline = false,
  disabled = false,
  error = false,
  required = false,
  errorMessage = 'Campo obligatorio',
  errorDirection = 'column' || 'row',
  errorClass = 'errores',
  ref = null,
  rows = '5',
  type = 'text' || 'password' || 'color' || 'number',
  minLength = '',
  maxLength = '',
  max = 0,
  height = '2.5rem',
  width = '100%',
  fontSize = '1rem',
  textTransform = 'inherit',
  icon = <BsSearch />,
  iconColor = 'white',
  placeholder = '',
  borderRadius = '1rem',
  buttonClick = () => {},
  buttonColor = 'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'white' ||
    'black' ||
    'shadowRed',
  paddingLeft = '1rem',
  onFocus = () => {},
  onEnter = () => {},
  iconBorderRadius = null,
  boxShadow = '',
  textFind = '',
  marginLeft,
  name,
  marginTop,
  widthText,
  widthBox,
  marginLeftBox,
  submit
}) {
  const textInput = useRef();

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(textInput.current);
      } else {
        ref.current = textInput.current;
      }
    }
  }, [textInput]);

  useEffect(() => {
    let current = textInput?.current?.value;
    if (current !== onValid(value)) {
      textInput.current.value = onValid(value);
    }
  }, [value]);

  return (
    <Flex
      marginLeft={marginLeftBox ? marginLeftBox : marginLeft}
      marginTop={marginTop}
      boxShadow={boxShadow}
      width={widthBox ? widthBox : width}
      minHeight={height}
      alignItems={titleOrientation == 'column' ? titleContent : 'center'}
      flexDirection={titleOrientation}
      borderRadius={borderRadius}
      justifyContent={titleContent}>
      <Text width={widthText} color={titleColor} fontSize={fontSize}>
        {title}
      </Text>
      {title != '' && titleOrientation == 'row' ? <SizeBox /> : ''}
      <Flex width='100%' flexDirection={errorDirection}>
        <InputStyled>
          <OutlinedInput
            autoFocus={focusIn}
            onFocusCapture={onFocus}
            inputRef={textInput}
            onBlur={(e) => {
              onChange(e?.target?.value || '');
              onValidate(e?.target?.value || '');
            }}
            onKeyUp={(e) => {
              if (e?.keyCode === 13) {
                onEnter(e?.target?.value);
              } else if (e?.keyCode === 32) {
                onSpace(e?.target?.value);
              }
            }}
            onKeyDown={(e) => {
              var key = e.keyCode || e.charCode;
              if (key == 8 || key == 46) onBackspace(e?.target?.value);
            }}
            onKeyPress={(e) => {}}
            onPaste={(e) =>
              onPaste(e.clipboardData.getData('text/plain') || '')
            }
            onChange={(e) => onValidate(e?.target?.value || '')}
            required={required}
            disabled={disabled}
            name={name}
            type={type}
            error={error}
            multiline={multiline}
            rows={rows}
            fontSize={fontSize}
            style={{
              width: width,
              paddingRight: '0px',
              height: multiline
                ? (eval(rows) + 2) * parseFloat(FONTSIZE_DEFAULT) + 'px'
                : height,
              borderRadius: borderRadius,
              backgroundColor: disabled ? '#EFEFEF' : 'transparent'
            }}
            placeholder={placeholder}
            onFocus={() => onValidate(value || '')}
            endAdornment={
              iconFind ? (
                <InputAdornment position='end'>
                  <CVButton
                    disabled={disabled}
                    color={iconColor}
                    type={submit ? 'submit' : 'button'}
                    onClick={() => buttonClick()}
                    height={height}
                    fontSize={fontSize}
                    borderRadius={
                      iconBorderRadius
                        ? iconBorderRadius
                        : `0px ${borderRadius} ${borderRadius} 0px`
                    }
                    backgroundColor={buttonColor}
                    boxShadow='none'>
                    {icon}
                    <p
                      style={{
                        marginLeft: '16px',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                      {textFind}
                    </p>
                  </CVButton>
                </InputAdornment>
              ) : null
            }
            aria-describedby='outlined-weight-helper-text'
            inputProps={{
              style: { height: height, padding: 0, paddingLeft, fontSize },
              'aria-label': 'weight',
              ...(minLength != '' ? { minLength } : {}),
              ...(maxLength != '' ? { maxLength } : {}),
              ...(type == 'number' ? { step: '0.01' } : {}),
              ...(max > 0 ? { max } : {})
            }}
            labelWidth={0}
          />
          {(error || required) && errorDirection == 'row' ? <SizeBox /> : ''}
          {error || required ? (
            <CVErrorLabel errorClass={errorClass} errorMessage={errorMessage} />
          ) : (
            ''
          )}
        </InputStyled>
      </Flex>
    </Flex>
  );
}

export default CVInput;
