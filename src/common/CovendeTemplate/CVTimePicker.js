import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import styled from '@emotion/styled';
import { COLORS } from './CVThemes';

const StyledTimePicker = styled.div`
  & .rc-time-picker-panel-select-option-selected {
    background-color: #ff5454;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    font-size: 15px;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input,
  & .rc-time-picker-panel-input {
    font-family: 'Consolas', sans-serif;
    font-size: 16px;
    border-radius: 1rem;
    cursor: pointer;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  & .rc-time-picker-input:focus-within,
  & .rc-time-picker-input:focus,
  & .rc-time-picker-input:hover,
  & .rc-time-picker-input:focus-visible,
  & .rc-time-picker-panel-input:active,
  & .rc-time-picker-panel-input:focus,
  & .rc-time-picker-panel-input:focus-within,
  & .rc-time-picker-panel-select:active,
  & .rc-time-picker-panel-select:focus,
  & .rc-time-picker-panel-select:focus-within,
  & .rc-time-picker-input:blur,
  & .rc-time-picker-input:active {
    border-color: ${COLORS['primary'] + ' !important'};
    /* Cambia el color del borde cuando el input está seleccionado o activo */
  }
`;

/**
 *
 * @param {Object} param0
 * @param {Date} param0.value
 * @param {Number} param0.minuteStep
 * @param {Boolean} param0.showSecond
 * @param {Function} param0.onChange - retorna ([startDate, endDate])=>{}
 * @returns
 */
function CVTimePicker({
  value,
  minuteStep = 5,
  showSecond = false,
  onChange = () => {}
}) {
  return (
    <StyledTimePicker>
      <TimePicker
        style={{ width: '300px' }}
        showSecond={showSecond}
        onChange={onChange}
        hideDisabledOptions
        minuteStep={minuteStep}
        // {...others}
        allowEmpty
        value={value}
        use12Hours
      />
    </StyledTimePicker>
  );
}

export default CVTimePicker;
