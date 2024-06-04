import React from 'react';
import { Legend as StyledLegend } from './Legend.styles';

function Legend({ children, ...rest }) {
  return <StyledLegend {...rest}>{children}</StyledLegend>;
}

export default Legend;
