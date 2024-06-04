import styled from '@emotion/styled';
import themeCovende from '@/themeCovende';

export const Fieldset = styled.fieldset`
  margin-bottom: 16px;
  padding: ${({ padding }) => padding || '8px'};
  border: 1px solid
    ${({ color }) => (color ? themeCovende.palette[color].main : '#cdcdcd')};
  border-radius: 10px;
`;
