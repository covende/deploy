import { Box } from '@material-ui/core';
import React from 'react';

function SizeBox({
  height = '1rem',
  width = '1rem',
  children,
  style,
  ...props
}) {
  return <Box style={{ width, height, ...props, ...style }}>{children}</Box>;
}

export default SizeBox;
