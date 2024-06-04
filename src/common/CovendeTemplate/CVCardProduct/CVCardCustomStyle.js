import styled from '@emotion/styled';
import React from 'react';

const box = `background-color: #FFFFFF;
  margin: 5px;
  border-radius: 12px;
  color:#004772;
  // -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
  // -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
  // box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
  `;

const texto = `white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
//font-size: 0.75rem;`;

export const SmallProduct = styled.div`
  ${box}
  cursor: grab;
  width: 120px;
  & img {
    width: 100%;
    max-width: 120px;
    height: 100%;
    max-height: 120px;
    border-radius: 12px;
  }
  & .product-name {
    width: 110px;
    ${texto}
  }

  & > div {
    padding: 3px;
  }
`;
export const MediumProduct = styled.div`
  ${box}
  cursor: grab;
  width: ${({ width }) => (width ? width : '230px')};
  & img {
    width: 100%;
    max-width: ${({ width }) => (width ? width : '230px')};
    height: 100%;
    max-height: ${({ width }) => (width ? width : '230px')};
    border-radius: 12px;
  }
  & .product-name {
    width: 210px;
    ${texto}
  }
  & > div {
    padding: 10px;
  }
`;
export const LargeProduct = styled.div`
  ${box}
  cursor: grab;
  width: ${({ width }) => (width ? width : '100%')};
  max-height: ${({ imgWidth }) => (imgWidth ? imgWidth : '145px')};
  display: flex;
  justify-content: space-between;
  & img {
    width: 100%;
    max-width: ${({ imgWidth }) => (imgWidth ? imgWidth : '145px')};
    height: ${({ height }) => (height ? height : '100%')};
    max-height: ${({ imgWidth }) => (imgWidth ? imgWidth : '145px')};
    border-radius: 12px;
  }
  & .product-name {
    width: 120px;
    ${texto}
  }
  & > div {
    padding: 1rem;
  }
`;
