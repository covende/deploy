import { Spinner } from '@chakra-ui/react';
import { Button } from '@material-ui/core';
import React from 'react';
import { COLORS } from './CVThemes';

/**
 * @param {Object} param0
 * @param {('primary' |'skyblue' |'blue' |'red' |'yellow' |'green' |'gray' |'white' |'black' |'shadowRed')} param0.backgroundColor
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.color
 * @param {String} param0.borderRadius
 * @param {String} param0.height
 * @param {String} param0.width
 * @param {String} param0.boxShadow
 * @param {('capitalize'|'lowercase'|'upercase')} param0.textTransform
 * @param {String} param0.fontSize
 * @param {String} param0.border
 * @param {('contained' | 'outlined')} param0.variant
 * @param {('normal' | 'bold')} param0.fontWeight
 * @param {('button' | 'submit')} param0.type
 * @param {Function} param0.onClick
 * @param {Boolean} param0.disabled
 * @param {Boolean} param0.isLoading
 * @param {String} param0.padding
 * @param {Function} param0.onHover
 * @param {String} param0.tabIndex
 * @param {String} param0.backgroundImage
 * @returns
 */
function CVButton({
  children,
  backgroundColor = 'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'white' ||
    'black' ||
    'shadowRed',
  color = 'white' ||
    'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'black',
  borderRadius = '2rem',
  height = '2.5rem',
  width = 'inherit',
  boxShadow = '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  textTransform = 'Unset' || 'lowercase' || 'upercase',
  fontSize = '1rem',
  border = '1px solid #00ADF6',
  variant = 'contained' || 'outlined',
  fontWeight = 'normal' || 'bold',
  type = 'button' || 'submit',
  onClick = () => {},
  disabled = false,
  isLoading = false,
  padding = '6px 16px',
  onHover = () => {},
  tabIndex = '0',
  backgroundImage = null
}) {
  const bordered = (theme) => {
    const [size, type, thm] = border.split(' ');
    return `${size} ${type} ${COLORS[theme]}`;
  };

  color = variant == 'outlined' && color == 'white' ? 'primary' : color;
  border = variant == 'outlined' && color != 'white' ? bordered(color) : border;

  let variants = {
    contained: {
      ...(!backgroundImage
        ? { backgroundColor: COLORS[backgroundColor] || '#00ADF6' }
        : {}),
      color: COLORS[color] || '#FFFFFF',
      ...(backgroundImage ? { backgroundImage } : {})
    },
    outlined: {
      color: COLORS[color] || '#00ADF6',
      border: border
    }
  };
  return (
    <Button
      tabIndex={tabIndex}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      type={type}
      disabled={disabled}
      variant={variant}
      onClick={() => onClick()}
      style={{
        padding: padding,
        minWidth: '1rem',
        borderRadius: borderRadius,
        height: height,
        textTransform: textTransform,
        fontSize: fontSize,
        fontWeight: fontWeight,
        opacity: disabled ? '0.75' : '1',
        width: width,
        boxShadow: boxShadow,
        ...variants[variant]
      }}>
      {isLoading ? (
        <Spinner
          style={{
            color: variants[variant].color
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
}

export default CVButton;
