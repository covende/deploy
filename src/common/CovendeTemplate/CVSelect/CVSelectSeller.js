import { Select, MenuItem, ListSubheader } from '@material-ui/core';
import React from 'react';

const CVSelectSeller = ({
  height,
  width,
  fontSize,
  borderRadius,
  color,
  name,
  onChange,
  groupOptions
}) => {
  return (
    <Select
      style={{
        height,
        width,
        fontSize,
        borderRadius,
        color
      }}
      name={name}
      defaultValue='none'
      onChange={(e) => {
        onChange(e.target.value);
      }}>
      <ListSubheader>Pedidos</ListSubheader>
      {groupOptions[0].map((option, index) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
      <ListSubheader>Mi cuenta</ListSubheader>
      {groupOptions[1].map((option, index) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}

      <ListSubheader>Productos</ListSubheader>
      {groupOptions[2].map((option, index) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  );
};

export default CVSelectSeller;
