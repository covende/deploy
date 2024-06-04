import React from 'react';

import { GridContainerStyled } from './GridContainer.styles';

function GridContainer(props) {
  const { children, widthContainer, height, glutter, minWidthColumn } = props;
  return (
    <GridContainerStyled
      widthContainer={widthContainer}
      height={height}
      glutter={glutter}
      minWidthColumn={minWidthColumn}
    >
      {children}
    </GridContainerStyled>
  );
}

export default GridContainer;
