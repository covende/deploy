import { Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import SizeBox from '../components/CustomComponent/SizeBox';
import { DateRangePicker } from 'react-dates';
import { v4 } from 'uuid';
import * as moment from 'moment';
import { defaultProps } from './CVDateRangePicker/CVDateRangePickerUtils';
import { DateRangeStyle } from './CVDateRangePicker/CVDateRangwStyle';

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
function CVDateRangePicker({
  titleColor = '#000000',
  title = '',
  titleOrientation = 'row' || 'column',
  titleContent = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  datestart = new Date(),
  dateend = new Date(),
  onChange = (range) => {},
  height = '2.5rem',
  fontSize = '1rem',
  borderRadius = '1rem',
  disabled = false,
  disabledDate = true,
  openDirection = 'down' || 'up',
  onDatesChange = () => {},
  maxWidth = '100%'
}) {
  const [focused, setfocused] = useState(null);

  return (
    <DateRangeStyle
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
        <DateRangePicker
          {...{
            ...defaultProps,
            disabled,
            ...(!disabledDate
              ? { isOutsideRange: () => false, enableOutsideDays: true }
              : {})
          }}
          openDirection={openDirection}
          startDate={datestart ? moment(datestart) : null}
          startDateId={v4()}
          endDate={dateend ? moment(dateend) : null}
          endDateId={v4()}
          onDatesChange={({ startDate, endDate }) => {
            onDatesChange({
              startDate: startDate ? new Date(startDate) : null,
              endDate: endDate ? new Date(endDate) : null
            });
            onChange([
              startDate ? new Date(startDate) : null,
              endDate ? new Date(endDate) : null
            ]);
          }}
          focusedInput={focused}
          onFocusChange={(focusedInput) => setfocused(focusedInput)}
        />
      </Flex>
    </DateRangeStyle>
  );
}

export default CVDateRangePicker;
