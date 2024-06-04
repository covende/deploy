import { Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import SizeBox from '../components/CustomComponent/SizeBox';

import { SingleDatePicker } from 'react-dates';
import { v4 } from 'uuid';
import * as moment from 'moment';
import { defaultProps } from './CVSingleDatePicker/CVSingleDatePickerUtils';
import { DateStyle } from './CVSingleDatePicker/CVSingleDateStyle';

/**
 *
 * @param {Object} param0
 * @param {String} param0.titleColor
 * @param {String} param0.title
 * @param {('row' | 'column')} param0.titleOrientation
 * @param {( 'start' | 'end' | 'space-around' | 'space-between' | 'center')} param0.titleContent
 * @param {Date} param0.datestart
 * @param {Date} param0.dateend
 * @param {Function} param0.onChange - retorna ([startDate, endDate])=>{}
 * @param {String} param0.height
 * @param {String} param0.fontSize
 * @param {String} param0.borderRadius
 * @param {Boolean} param0.disabledDate - desabilita fechas anteriores a hoy.
 * @param {Boolean} param0.disabled - Desahabilita el campo.
 * @param {Function} param0.onDatesChange - retorna ({ startDate, endDate })=>{}.
 * @param {String} param0.maxWidth
 * @returns
 */
function CVSingleDatePicker({
  titleColor = '#000000',
  title = '',
  titleOrientation = 'row' || 'column',
  titleContent = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  date = new Date(),
  onChange = (range) => {},
  height = '2.5rem',
  fontSize = '1rem',
  borderRadius = '1rem',
  disabled = false,
  openDirection = 'down' || 'up',
  maxWidth = '100%'
}) {
  const [focused, setfocused] = useState(null);

  return (
    <DateStyle
      maxWidth={maxWidth}
      height={height}
      fontSize={fontSize}
      borderRadius={borderRadius}>
      <Flex
        width='100%'
        minHeight={height}
        alignItems={titleOrientation == 'column' ? titleContent : 'center'}
        flexDirection={titleOrientation}
        justifyContent={titleContent}>
        <Text color={titleColor} fontSize={fontSize}>
          {title}
        </Text>
        {title != '' && titleOrientation == 'row' ? <SizeBox /> : ''}
        <SingleDatePicker
          {...{
            ...defaultProps,
            disabled
          }}
          id={v4()}
          openDirection={openDirection}
          date={date ? moment(date) : null}
          onDateChange={(date) => onChange(date)}
          focused={focused}
          onFocusChange={({ focused }) => setfocused(focused)}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </Flex>
    </DateStyle>
  );
}

export default CVSingleDatePicker;
