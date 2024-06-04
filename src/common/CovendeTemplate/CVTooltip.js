import { Box, Tag, Tooltip } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverAnchor,
  Portal
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import CVButton from './CVButton';
import { COLORS } from './CVThemes';
import { FaTimes } from 'react-icons/fa';

// const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
//   <Box width='100%'>
//     <Tag
//       width='100%'
//       margin='0'
//       padding='0'
//       backgroundColor='transparent'
//       ref={ref}
//       {...rest}>
//       {children}
//     </Tag>
//   </Box>
// ));

/**
 *
 * @param {Object} param0
 * @param {String} param0.title
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.titleColor
 * @param {React.ReactElement} param0.icon
 * @param {('start'|'center'|'end')} param0.titleAlign
 * @param {String} param0.height
 * @param {String} param0.width
 * @param {String} param0.widthIcon
 * @param {Boolean} param0.isOpen
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.colorIcon
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.bgIcon
 * @param {Boolean} param0.disabled
 * @returns
 */
function CVTooltip({
  children,
  title,
  titleColor = 'black',
  icon = false,
  titleAlign = 'start',
  height = '64px',
  width = '256px',
  widthIcon = '150px',
  isOpen = null,
  colorIcon = 'white',
  bgIcon = 'primary',
  disabled = false,
  onMouseEnter = true,
  onMouseLeave = true,
  onClose = () => {}
}) {
  const [open, setopen] = useState(false);
  useEffect(() => {
    setopen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!open) onClose(false);
  }, [open]);

  return (
    <Popover placement='top' isOpen={open} onClose={(e) => setopen(false)}>
      <PopoverTrigger>
        <Box
          width='100%'
          height='100%'
          {...(onMouseEnter
            ? {
                onMouseEnter: () =>
                  isOpen != null || disabled ? {} : setopen(true)
              }
            : {})}
          {...(onMouseLeave
            ? {
                onMouseEnter: () =>
                  (isOpen != null || !disabled
                    ? setopen(false)
                    : setopen(true))(
                    isOpen != null || disabled ? setopen(false) : setopen(true)
                  )
              }
            : {})}
          // onMouseEnter={() => (isOpen != null || disabled ? {} : setopen(true))}
          // onMouseLeave={() =>
          //   (isOpen != null || !disabled ? setopen(false) : setopen(true))(
          //     isOpen != null || disabled ? setopen(false) : setopen(true)
          //   )
          // }
        >
          {children}
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          bg='white'
          padding='0'
          rounded='1rem'
          boxShadow='0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
          height={height}
          width={width}>
          <PopoverArrow />
          <PopoverBody
            height={height}
            width={width}
            bg='white'
            padding='0'
            rounded='1rem'>
            <Box
              padding='0'
              height={height}
              width={width}
              display='flex'
              rounded='1rem'
              position='relative'>
              {icon && (
                <Box
                  rounded='1rem 0 0 1rem'
                  backgroundColor={COLORS[bgIcon]}
                  color={COLORS[colorIcon]}
                  height={height}
                  width={widthIcon}
                  flex={widthIcon}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'>
                  {icon}
                </Box>
              )}
              <SizeBox />
              <CVText color={titleColor} textAlign={titleAlign}>
                {title}
                {disabled && (
                  <span> ¡Haz crecer tu negocio!</span>
                  // <a href='./crea-tu-tienda'>¡Haz crecer tu negocio!</a>
                )}
              </CVText>
              <Box position='absolute' right='-10px' top='-10px'>
                <CVButton
                  onClick={() => setopen(!open)}
                  height='auto'
                  padding='5px'
                  backgroundColor={bgIcon}>
                  <FaTimes />
                </CVButton>
              </Box>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default CVTooltip;

{
  /* <Tooltip
zIndex={1801}
display={disabled}
isOpen={open}
hasArrow
placement='top'
bg='white'
padding='0'
rounded='1rem'
boxShadow='0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
label={
  <Box
    padding='0'
    height={height}
    width={width}
    display='flex'
    rounded='1rem'
    position='relative'>
    {icon && (
      <Box
        rounded='1rem 0 0 1rem'
        backgroundColor={COLORS[bgIcon]}
        color={COLORS[colorIcon]}
        height={height}
        width={widthIcon}
        flex={widthIcon}
        display='flex'
        justifyContent='center'
        alignItems='center'>
        {icon}
      </Box>
    )}
    <SizeBox />
    <CVText color={titleColor} textAlign={titleAlign}>
      {title}
    </CVText>
    <Box position='absolute' right='-10px' top='-10px' zIndex={1802}>
      <CVButton
        onClick={() => (isOpen != null || disabled ? {} : setopen(false))}
        height='auto'
        padding='5px'
        backgroundColor={bgIcon}>
        <FaTimes />
      </CVButton>
    </Box>
  </Box>
}>
<CustomCard
  onMouseEnter={() => (isOpen != null || disabled ? {} : setopen(true))}
  onMouseLeave={() => (isOpen != null || disabled ? {} : setopen(false))}>
  {children}
</CustomCard>
</Tooltip> */
}
