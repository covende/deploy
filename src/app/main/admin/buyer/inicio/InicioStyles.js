import styled from '@emotion/styled';

export const BotonesStyle = styled.div`
  & .MuiButton-root {
    text-transform: initial;
  }
  & .MuiButton-label {
    display: flex;
    justify-content: center;
    color: white;
    flex-direction: column;
  }
  & .MuiButton-label > span:first-of-type {
    font-size: 64px;
    font-weight: bold;
    line-height: 1;
  }
  & .MuiButton-label > span::last-child {
    text-transform: capitalize;
  }
`;

export const StylesTabPanel = styled.div`
  & .rows:hover {
    background-color: rgba(255, 84, 84, 0.05);
  }
  & .rows {
    background-color: #ffffff;
    border-bottom: 1px solid #efefef;
    padding: 1rem;
  }
`;
