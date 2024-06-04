import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-rows: repeat(2, max-content);
  width: 255px;
`;

export const CategoryFilterStyle = styled.div`
  position: ${({ position }) => position};
  width: ${({ width }) => `${width}px`};
  ${({ top }) => `top: ${top}px`};
  bottom: 0px;
  animation: 500ms ease-in-out 0s normal none 1 running fadeInDown;
  padding-top: 0px;
  padding-bottom: 0px;
  max-height: calc(100vh - ${({ top }) => `${top}px`});
  // overflow-y: auto;
  // overflow-x: hidden;
`;
