import React from 'react';
import { Fieldset as StyledFieldset } from './Fieldset.styles';

function Fieldset(props) {
  const { children } = props;
  return <StyledFieldset {...props}>{children}</StyledFieldset>;
}

export default Fieldset;
