import styled from '@emotion/styled';
import themeCovende from '@/themeCovende';

export const Legend = styled.legend`
  margin: ${({ margin }) => margin || '0px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '8px'};
  padding: ${({ padding }) => padding || '0 8px'};
  width: ${({ width }) => width || 'max-content'};
  height: fit-content;
  color: ${({ color }) => themeCovende.palette[color || 'primary'].main};
  font-style: ${({ fontStyle }) => fontStyle || 'normal'};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  line-height: ${({ lineHeight }) => lineHeight || '18px'};
  text-transform: ${({ upperCase }) => (upperCase ? 'uppercase' : 'initial')};
`;
