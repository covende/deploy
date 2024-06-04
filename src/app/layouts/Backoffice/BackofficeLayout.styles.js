import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;

  & #page-wrapper {
    margin-top: 80px;
    width: 100%;
  }

  & #page-content-wrapper {
    display: grid;
    grid-gap: 0px;
    grid-template-rows: repeat(2, max-content);
    grid-template-areas:
      'main'
      'footer';
  }
`;

export const ContentPage = styled.main`
  padding: ${({ padding }) => padding || '15px'};
  margin-top: 0px;
  grid-area: main;
  min-height: calc(100vh - 96px);
  background-color: #f5f8f9;
  box-sizing: border-box;
  overflow: hidden;
`;
