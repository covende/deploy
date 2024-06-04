import styled from '@emotion/styled';

export const StyledForm = styled.form`
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, max-content);
  justify-content: center;
`;

export const RowHalf = styled.div`
  width: 50%;
  float: left;
  height: fit-content;
`;
