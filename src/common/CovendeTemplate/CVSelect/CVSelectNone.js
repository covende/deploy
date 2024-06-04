import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';

const CVSelectNone = ({
  error,
  height,
  width,
  fontSize,
  borderRadius,
  color,
  placeholder,
  selected,
  onChange,
  optiones,
  disabled
}) => {
  return (
    <Select
      disabled={disabled}
      error={error}
      style={{
        height,
        width,
        fontSize,
        borderRadius,
        color
      }}
      placeholder={placeholder}
      value={selected || ''}
      onChange={(e) => {
        onChange(e.target.value);
      }}>
      {optiones.map((item) => (
        <MenuItem
          {...(selected == '' && item?.value == '' ? { selected: true } : {})}
          disabled={item?.disabled || false}
          key={v4()}
          value={item?.value || ''}>
          {item.text}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CVSelectNone;
