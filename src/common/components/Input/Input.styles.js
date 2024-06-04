import styled from '@emotion/styled';

export const Input = styled.input`
  padding: ${({ padding }) => padding || '8px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '8px'};
  min-width: 32px;
  width: ${({ width }) => width || 'max-content'};
  height: 32px;
  background: ${({ borderColor }) => borderColor || '#ffffff'};
  border: 1px solid ${({ borderColor }) => borderColor || '#e0e0e0'};
  box-shadow: ${({ boxShadow }) =>
    boxShadow || '-1px 1px 8px rgba(0, 0, 0, 0.2)'};
  border-radius: ${({ borderRadius }) => borderRadius || '12px'};
  box-sizing: border-box;

  &::placeholder {
    color: #c4c4c4;
  }

  &:disabled,
  &[readonly] {
    &::placeholder {
      color: #aaa;
      font-style: 'italic';
    }
    cursor: not-allowed;
    background-color: #e5e5e5;
  }
`;
