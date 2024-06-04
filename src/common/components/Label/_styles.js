import styled from '@emotion/styled';

export const Label = styled.label`
  margin: ${({ margin }) => margin || 'auto'};
  margin-right: ${({ marginRight }) => marginRight || ''};
  margin-left: ${({ marginLeft }) => marginLeft || ''};
  margin-top: ${({ marginTop }) => marginTop || ''};
  width: ${({ width }) => width || 'max-content'};
  height: 100%;
  color: #4d4d4d;
  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize || '12px'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  line-height: ${({ lineHeight }) => lineHeight || '18px'};
  display: ${({ display }) => display || 'initial'};
  justify-content: ${({ justifyContent }) => justifyContent || 'initial'};
  align-items: ${({ alignItems }) => alignItems || 'initial'};
  align-self: ${({ alignSelf }) => alignSelf || 'initial'};
`;
