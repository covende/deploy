import { Select, MenuItem, ListSubheader } from '@material-ui/core';
import React from 'react';

const CVSelectBuyer = ({
  height,
  width,
  fontSize,
  borderRadius,
  color,
  groupOptions,
  onChange
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
      onChange={(e) => onChange(e?.target?.value)}
      defaultValue='none'>
      <ListSubheader>Mis Pedidos</ListSubheader>
      {groupOptions[0].map((option, index) => (
        <MenuItem value={index}>{option}</MenuItem>
      ))}
      <ListSubheader>Mis Devoluciones</ListSubheader>
      {groupOptions[1].map((option, index) => (
        <MenuItem value={index + 3}>{option}</MenuItem>
      ))}
    </Select>
  );
};

export default CVSelectBuyer;
