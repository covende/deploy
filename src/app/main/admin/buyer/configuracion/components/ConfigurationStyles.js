import styled from '@emotion/styled';

export const CardStyle = styled.div`
  width: ${({width}) => width ? width : '100%'};
  height: 100%;
  display: ${({display}) => display ? display : ''};
  flex-wrap: ${({flexWrap}) => flexWrap ? flexWrap : ''};
  & .MuiPaper-outlined {
    border: none;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  & .MuiButton-root {
    border-radius: 20px !important;
  }
`;
