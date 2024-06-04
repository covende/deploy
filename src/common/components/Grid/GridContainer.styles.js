import styled from '@emotion/styled';

export const GridContainerStyled = styled.div`
  width: ${({ widthContainer }) => widthContainer || '100%'};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  display: grid;
  grid-gap: ${({ glutter }) => glutter || '10px'};
  grid-template-columns: ${({ minWidthColumn }) =>
    minWidthColumn
      ? `repeat(auto-fill, minmax(${minWidthColumn}, 1fr))`
      : 'repeat(auto-fill, minmax(198px, 1fr))'};
  grid-template-rows: ${({ heightElement }) =>
    heightElement
      ? 'repeat(4,max-content)'
      : 'repeat(auto-fill, minmax(164px, 1fr))'};

  justify-items: center;
`;
